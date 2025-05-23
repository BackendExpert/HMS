const axios = require('axios');
const Student = require("../models/Student");
const XLSX = require('xlsx');
const path = require('path');
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
        return result ? { lat: result.geometry.lat, lng: result.geometry.lng } : null;
    } catch (error) {
        console.error(`OpenCage error for "${address}":`, error.message);
        return null;
    }
}

// Function to calculate road distance using OSRM
async function getRoadDistanceOSRM(start, end) {
    try {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false&alternatives=false&steps=false`;

        const response = await axios.get(osrmUrl);
        const distance = response.data.routes[0].legs[0].distance;
        return distance / 1000; // km
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

            const universityAddress = "University of Peradeniya, Peradeniya, Kandy, Sri Lanka";
            const universityCoords = await geocodeWithOpenCage(universityAddress);

            const insertedStudents = [];
            const duplicateStudents = [];

            for (const s of studentsFromExcel) {
                const exists = await Student.findOne({
                    $or: [
                        { enrolmentNo: s['Enrolment_No.'] },
                        { indexNo: s['Index_No'] },
                        { nic: s['NIC'] },
                        { email: s['email'] }
                    ]
                });

                if (exists) {
                    duplicateStudents.push(s['Enrolment_No.']);
                    continue;
                }

                const studentData = {
                    no: s['No'],
                    enrolmentNo: s['Enrolment_No.'],
                    indexNo: s['Index_No'],
                    name: s['Name'],
                    title: s['Title'],
                    lastName: s['L_Name'],
                    initials: s['Initials'],
                    fullName: s['Full_Name'],
                    alDistrict: s['alDistrict'],
                    sex: s['Sex'],
                    zScore: parseFloat(s['Z_Score']),
                    medium: s['Medium'],
                    nic: s['NIC'],
                    address1: s['ADD1'],
                    address2: s['ADD2'],
                    address3: s['ADD3'],
                    fullAddress: s['Address'],
                    email: s['email'],
                    phone1: s['Phone_No'],
                    phone2: s['Phone_No_2'] || '',
                    genEnglishMarks: s['Gen_English_Marks'] ? parseInt(s['Gen_English_Marks']) : null,
                    intake: s['Intake'],
                    dateOfEnrolment: s['Date_of_Enollment'],
                    distance: null
                };

                // Use only ADD3 to get distance
                const add3 = s['ADD3'];
                if (add3 && universityCoords) {
                    const studentCoords = await geocodeWithOpenCage(add3);
                    if (studentCoords) {
                        const distanceKm = await getRoadDistanceOSRM(studentCoords, universityCoords);
                        if (distanceKm !== null) {
                            studentData.distance = parseFloat(distanceKm.toFixed(2));
                        }
                    }
                }

                insertedStudents.push(studentData);
            }

            await Student.insertMany(insertedStudents);

            res.status(200).json({
                Status: "Success",
                message: 'Upload complete',
                insertedCount: insertedStudents.length,
                duplicateCount: duplicateStudents.length,
                duplicates: duplicateStudents
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
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

            if (!student) {
                return res.json({ Error: "Student Not Found..." });
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
                return res.json({ Error: "NO warden Found..." });
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
