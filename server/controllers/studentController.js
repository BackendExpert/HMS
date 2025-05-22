const axios = require('axios');
const Student = require("../models/Student");
const XLSX = require('xlsx');
const RoomAllocation = require('../models/RoomAllocation');
const jwt = require('jsonwebtoken');
const Warden = require('../models/Warden');
const User = require('../models/User');

// Geocoding function using OpenCage API
async function geocodeWithOpenCage(address) {
    try {
        const apiKey = process.env.OPENCAGE_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await axios.get(url);
        const result = response.data.results[0];
        if (result) {
            const { lat, lng } = result.geometry;
            return { lat, lng };
        }
        return null;
    } catch (error) {
        console.error(`Geocoding error for "${address}":`, error.message);
        return null;
    }
}

// OSRM distance calculation
async function getRoadDistanceOSRM(start, end) {
    try {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`;
        const response = await axios.get(osrmUrl);
        const distance = response.data.routes[0].legs[0].distance;
        return distance / 1000; // km
    } catch (error) {
        console.error('OSRM distance error:', error.message);
        return null;
    }
}

const StudentController = {
    createStudent: async (req, res) => {
        try {
            const filePath = req.file.path;
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const studentsFromExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const universityCoords = await geocodeWithOpenCage("University of Peradeniya, Peradeniya, Kandy, Sri Lanka");

            if (!universityCoords) {
                return res.json({ Error: "Unable to geocode university address" });
            }

            let insertedStudents = [];
            let skippedStudents = [];

            for (const student of studentsFromExcel) {
                const existing = await Student.findOne({
                    $or: [
                        { Enrolment_No: student.Enrolment_No },
                        { Index_No: student.Index_No },
                        { NIC: student.NIC },
                        { email: student.email }
                    ]
                });

                if (existing) {
                    skippedStudents.push(student);
                    continue;
                }

                let geocodeAddress = student.Address?.trim();

                // If Address is missing or fails to geocode, try ADD3
                let studentCoords = geocodeAddress ? await geocodeWithOpenCage(geocodeAddress) : null;

                if (!studentCoords && student.ADD3?.trim()) {
                    studentCoords = await geocodeWithOpenCage(student.ADD3.trim());
                    geocodeAddress = student.ADD3;
                }

                if (studentCoords) {
                    const distanceKm = await getRoadDistanceOSRM(studentCoords, universityCoords);
                    if (distanceKm !== null) {
                        student.distance = distanceKm;
                        student.eligible = distanceKm > 50;
                    }
                }

                insertedStudents.push(student);
            }

            const savedStudents = await Student.insertMany(insertedStudents);
            return res.json({ Status: "Success", Inserted: savedStudents.length, Skipped: skippedStudents.length });
        } catch (err) {
            console.log(err);
            return res.json({ Error: "Internal Server Error" });
        }
    },

    getallStudents: async (req, res) => {
        try {
            const getallstd = await Student.find();
            return res.json({ Result: getallstd });
        } catch (err) {
            console.log(err);
            return res.json({ Error: "Failed to fetch students" });
        }
    },

    getstdbyID: async (req, res) => {
        try {
            const stdID = req.params.id;
            const student = await Student.findById(stdID);
            if (!student) return res.json({ Error: "Student Not Found..." });

            const stdroomwithhostel = await RoomAllocation.findOne({ studentId: stdID })
                .populate({
                    path: 'roomId',
                    model: 'Room',
                    populate: { path: 'hostel', model: 'Hostel' }
                });

            return res.json({ Stundet: student, roomhostel: stdroomwithhostel });
        } catch (err) {
            console.log(err);
        }
    },

    getvardenstd: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const email = decoded.user.email;

            const varden = await User.findOne({ email: email });
            if (!varden) return res.json({ Error: "NO warden Found..." });

            const wardenData = await Warden.findOne({ email: email })
                .populate({
                    path: 'hostelID',
                    model: 'Hostel',
                    populate: {
                        path: 'rooms',
                        model: 'Room'
                    }
                });

            if (!wardenData || !wardenData.hostelID) {
                return res.json({ error: "Warden has no hostel assigned." });
            }

            const hostelRooms = wardenData.hostelID.rooms.map(room => room._id);

            const allocations = await RoomAllocation.find({
                roomId: { $in: hostelRooms },
                isActive: true
            }).populate({
                path: 'studentId',
                model: 'Student'
            });

            const students = allocations.map(allocation => allocation.studentId);
            res.json({ Result: students });

        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = StudentController;
