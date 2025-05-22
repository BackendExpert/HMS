const axios = require('axios');
const Student = require("../models/Student");
const XLSX = require('xlsx');
const RoomAllocation = require('../models/RoomAllocation');
const jwt = require('jsonwebtoken');
const Warden = require('../models/Warden');
const User = require('../models/User');

// Geocode address using OpenCage
async function geocodeWithOpenCage(address) {
    try {
        const apiKey = process.env.OPENCAGE_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await axios.get(url);
        const result = response.data.results[0];
        if (result) {
            const { lat, lng } = result.geometry;
            return { lat, lng };
        } else {
            return null;
        }
    } catch (error) {
        console.error(`OpenCage error for "${address}":`, error.message);
        return null;
    }
}

// Calculate road distance using OSRM
async function getRoadDistanceOSRM(start, end) {
    try {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false&alternatives=false&steps=false`;
        const response = await axios.get(osrmUrl);
        const distance = response.data.routes[0].legs[0].distance;
        return distance / 1000;
    } catch (error) {
        console.error('Error getting road distance from OSRM:', error.message);
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

            let insertedStudents = [];
            let skippedStudents = [];

            const universityAddress = "University of Peradeniya, Peradeniya, Kandy, Sri Lanka";
            const universityCoords = await geocodeWithOpenCage(universityAddress);

            if (!universityCoords) {
                return res.status(500).json({ Error: "Unable to get university coordinates" });
            }

            for (const student of studentsFromExcel) {
                const existingStudent = await Student.findOne({
                    $or: [
                        { enrolmentNo: student.enrolmentNo },
                        { indexNo: student.indexNo },
                        { nic: student.nic },
                        { email: student.email }
                    ]
                });

                if (existingStudent) {
                    skippedStudents.push(student);
                    continue;
                }

                const fullAddress = [student.address1, student.address2, student.address3].filter(Boolean).join(', ');
                if (fullAddress) {
                    const studentCoords = await geocodeWithOpenCage(fullAddress);
                    if (studentCoords) {
                        const distanceKm = await getRoadDistanceOSRM(studentCoords, universityCoords);
                        if (distanceKm !== null) {
                            student.distance = distanceKm;
                            student.eligible = distanceKm > 50;
                        }
                    }
                }

                insertedStudents.push(student);
            }

            const savedStudents = await Student.insertMany(insertedStudents);

            return res.json({
                Status: "Success",
                Inserted: savedStudents.length,
                Skipped: skippedStudents.length
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    },

    getallStudents: async (req, res) => {
        try {
            const getallstd = await Student.find();
            return res.json({ Result: getallstd });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: "Failed to fetch students" });
        }
    },

    getstdbyID: async (req, res) => {
        try {
            const stdID = req.params.id;
            const student = await Student.findById(stdID);

            if (!student) {
                return res.status(404).json({ Error: "Student Not Found..." });
            }

            const stdroomwithhostel = await RoomAllocation.findOne({ studentId: stdID })
                .populate({
                    path: 'roomId',
                    model: 'Room',
                    populate: {
                        path: 'hostel',
                        model: 'Hostel'
                    }
                });

            return res.json({ Student: student, roomhostel: stdroomwithhostel });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    },

    getvardenstd: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;

            const email = req.user.user.email;
            const varden = await User.findOne({ email });

            if (!varden) {
                return res.status(404).json({ Error: "No warden found." });
            }

            const wardenData = await Warden.findOne({ email })
                .populate({
                    path: 'hostelID',
                    model: 'Hostel',
                    populate: {
                        path: 'rooms',
                        model: 'Room'
                    }
                });

            if (!wardenData || !wardenData.hostelID) {
                return res.status(404).json({ Error: "Warden has no hostel assigned." });
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
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }
};

module.exports = StudentController;
