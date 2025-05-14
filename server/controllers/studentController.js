const Student = require("../models/Student");
const RoomAllocation = require('../models/RoomAllocation');
const jwt = require('jsonwebtoken');
const Warden = require('../models/Warden');
const User = require('../models/User');
const StudentWaiting = require('../models/StudentWaiting');
const { model } = require("mongoose");

const StudentController = {
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

            return res.json({ Stundet: student, roomhostel: stdroomwithhostel });

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

            const varden = await User.findOne({ email: email });

            if (!varden) {
                return res.json({ Error: "NO warden Found..." });
            }

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
    },

    getallstdwaiting: async (req, res) => {
        try {
            const allwaitingstds = await StudentWaiting.find();
            return res.json({ Result: allwaitingstds });
        } catch (err) {
            console.log(err);
        }
    },

    approveAndCreateAccount: async (req, res) => {
        try {
            const email = req.params.email;

            const getstudentwaiting = await StudentWaiting.findOne({ email });

            if (!getstudentwaiting) {
                return res.json({ Error: "Student not found" });
            }

            const rawDistance = getstudentwaiting.homeDistance;
            const distanceInt = parseInt(rawDistance.replace(' km', ''), 10);
            console.log("Distance:", distanceInt);

            const approvestd = await StudentWaiting.findOneAndUpdate(
                { email },
                { $set: { isApprove: true } },
                { new: true }
            );

            if (!approvestd) {
                return res.json({ Error: "Student approval failed" });
            }

            const eligibleStatus = distanceInt > 50;

            const newstudent = new Student({
                indexNo: getstudentwaiting.indexNo,
                email: getstudentwaiting.email,
                nic: getstudentwaiting.nic || '',
                title: getstudentwaiting.title || '',
                firstName: getstudentwaiting.firstName || '',
                surname: getstudentwaiting.surname || '',
                initials: getstudentwaiting.initials || '',
                gender: getstudentwaiting.gender || '',
                phone: getstudentwaiting.phone1 || '',
                address: getstudentwaiting.address || '',
                distance: distanceInt,
                eligible: eligibleStatus
            });

            const resultnewstudent = await newstudent.save();
            if (!resultnewstudent) {
                return res.json({ Error: "Failed to save student data" });
            }

            const createStdAccount = new User({
                indexNo: getstudentwaiting.indexNo,
                username: getstudentwaiting.username,
                email: getstudentwaiting.email,
                role: 'student',
                faculty: getstudentwaiting.faculty,
                password: getstudentwaiting.password,
                isActive: true
            });

            const resultstdacc = await createStdAccount.save();
            if (!resultstdacc) {
                return res.json({ Error: "Failed to create student account" });
            }

            return res.json({ Status: "Success", Message: "Student approved and account created successfully" });

        } catch (err) {
            console.log(err);
            return res.json({ Error: "Internal Server Error" });
        }
    },

    currentstudetdata: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;

            const email = decoded.user.email

            // console.log(email)

            const user = await User.findOne({ email: email });
            const student = await Student.findOne({ email: email });
            const stdwaiting = await StudentWaiting.findOne({ email: email })

            const getstddata = {
                ...user._doc,
                student: student,
                waitstd: stdwaiting
            };

            if (getstddata) {
                return res.json({ Status: "Success", Result: getstddata })
            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    updatestdpersonaldata: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;

            const email = decoded.user.email;

            // console.log(email)

            const {
                nic,
                title,
                firstName,
                surname,
                initials,
                phone
            } = req.body;

            const checkstd = await Student.findOne({ email: email });

            if (!checkstd) {
                return res.json({ Error: "Student not found" });
            }

            const updatedStdData = await Student.findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        nic: nic,
                        title: title,
                        firstName: firstName,
                        surname: surname,
                        initials: initials,
                        phone: phone
                    }
                },
                { new: true }
            );

            if (updatedStdData) {
                return res.json({ Status: "Success", Message: "Student data updated successfully" });
            } else {
                return res.json({ Error: "Internal server error while updating student data" });
            }
        }
        catch (err) {
            console.log(err);
            return res.json({ Error: "An error occurred" });
        }
    },

    getcurrentstdhostlroom: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token) {
                return res.status(401).json({ Error: "No token provided" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const email = decoded?.user?.email;

            if (!email) {
                return res.status(401).json({ Error: "Invalid token data" });
            }

            const student = await Student.findOne({ email });
            if (!student) {
                return res.status(404).json({ Error: "Student not found" });
            }

            const roomAllocation = await RoomAllocation.findOne({ studentId: student._id })
                .populate({
                    path: 'studentId',
                    model: 'Student'
                })
                .populate({
                    path: 'roomId',
                    model: 'Room',
                    populate: {
                        path: 'hostel',
                        model: 'Hostel'
                    }
                });

            if (!roomAllocation) {
                return res.status(404).json({ Error: "Room allocation not found" });
            }

            return res.status(200).json({ Result: roomAllocation });
        } catch (err) {
            console.error("Error in getcurrentstdhostlroom:", err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }

};

module.exports = StudentController;
