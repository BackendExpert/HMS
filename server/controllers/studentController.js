const axios = require('axios');
const Student = require("../models/Student");
const XLSX = require('xlsx');
const path = require('path');
const { model } = require('mongoose');
const RoomAllocation = require('../models/RoomAllocation');
const jwt = require('jsonwebtoken')

// Geocoding function using OpenCage API with the direct URL
async function geocodeWithOpenCage(address) {
    try {
        const apiKey = process.env.OPENCAGE_API_KEY; // Ensure this is correctly set in your environment variables
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        console.log('Request URL:', url); // Log the full request URL

        const response = await axios.get(url);
        console.log('OpenCage API response:', response.data);

        const result = response.data.results[0];
        if (result) {
            const { lat, lng } = result.geometry;
            return { lat, lng };
        } else {
            console.error("No results found for the address.");
            return null;
        }
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
        const distance = response.data.routes[0].legs[0].distance; // Distance in meters

        // Convert distance from meters to kilometers
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

            // Directly call OpenCage API for University of Peradeniya's address
            const universityAddress = "University of Peradeniya, Peradeniya, Kandy, Sri Lanka";
            const apiKey = process.env.OPENCAGE_API_KEY;  // Ensure you have your OpenCage API key in environment variables

            const universityCoords = await geocodeWithOpenCage(universityAddress);

            if (!universityCoords) {
                console.error("Unable to geocode university address.");
                return res.json({ Error: "Unable to get university coordinates" });
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
                    skippedStudents.push(student); // Duplicate found
                } else {
                    insertedStudents.push(student); // No conflict

                    const fullAddress = [student.address1, student.address2].filter(Boolean).join(', ');

                    if (fullAddress && universityCoords) {
                        const studentCoords = await geocodeWithOpenCage(fullAddress);
                        if (studentCoords) {
                            const distanceKm = await getRoadDistanceOSRM(studentCoords, universityCoords);
                            if (distanceKm !== null) {
                                console.log(`${fullAddress} ➜ ${universityAddress}: ${distanceKm.toFixed(2)} km (Road Distance)`);

                                // Set distance in kilometers
                                student.distance = distanceKm;

                                // Set eligibility based on road distance
                                student.eligible = distanceKm > 50; // If road distance is greater than 50 km, set eligible to true
                            }
                        }
                    }
                }
            }

            const savedStudents = await Student.insertMany(insertedStudents);

            if (savedStudents) {
                return res.json({ Status: "Success" });
            } else {
                return res.json({ Error: "Internal Server Error" });
            }

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
            const stdID = req.params.id

            const student = await Student.findById(stdID)

            if (!student) {
                return res.json({ Error: "Student Not Found..." })
            }

            const stdroomwithhostel = await RoomAllocation.findOne({ studentId: stdID })
                .populate({
                    path: 'roomId',
                    model: 'Room',
                    populate: {
                        path: 'hostel',
                        model: 'Hostel'
                    }
                })

            return res.json({ Stundet: student, roomhostel: stdroomwithhostel })

        }
        catch (err) {
            console.log(err)
        }
    },

    getvardenstd: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;
            const email = req.user.email;

            console.log(email)

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = StudentController;
