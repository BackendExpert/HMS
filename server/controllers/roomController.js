const Room = require('../models/Room');
const Student = require('../models/Student');
const RoomAllocation = require('../models/RoomAllocation');
const User = require('../models/User');
const Warden = require('../models/Warden');
const jwt = require('jsonwebtoken')

const RoomController = {
    getallrooms: async (req, res) => {
        try {
            const allrooms = await Room.find()

            return res.json({ Result: allrooms })
        }
        catch (err) {
            console.log(err)
        }
    },

    roomAllocationStd: async (req, res) => {
        try {
            const eligiblestds = await Student.find({ eligible: true });

            if (!eligiblestds || eligiblestds.length === 0) {
                return res.json({ error: "No eligible students found" });
            }

            const availableRooms = await Room.find({ status: 'Availabe' });

            const genderGroupedRooms = {
                Male: availableRooms.filter(room => room.gender === 'Male'),
                Female: availableRooms.filter(room => room.gender === 'Female')
            };

            for (const student of eligiblestds) {
                const studentGender = student.gender;

                const room = genderGroupedRooms[studentGender].find(r => r.currentOccupants < r.capacity);

                if (room) {
                    // Create RoomAllocation
                    await RoomAllocation.create({
                        studentId: student._id,
                        roomId: room._id
                    });

                    // Update room info
                    room.currentOccupants += 1;
                    room.students.push(student._id); // Push student to room

                    if (room.currentOccupants >= room.capacity) {
                        room.status = 'Full';
                    }

                    await room.save();
                }
            }

            res.json({ Status: "Success" });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    roomAllcationData: async (req, res) => {
        try {
            const DataRoomAllocation = await RoomAllocation.find()
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

            return res.json({ Result: DataRoomAllocation });
        }
        catch (err) {
            console.log(err)
        }
    },

    ViewRoom: async (req, res) => {
        try {
            const roomID = req.params.id

            const findRoom = await Room.findById(roomID)
                .populate({
                    path: "hostel",
                    model: "Hostel"
                })

            if (!findRoom) {
                return res.json({ Error: 'Room not Found...' })
            }

            return res.json({ Result: findRoom })

        }
        catch (err) {
            console.log(err)
        }
    },

    wardenroom: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;
            const email = req.user.user.email;

            const varden = await User.findOne({ email: email })

            if (!varden) {
                return res.json({ Error: "NO warden Found..." })
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

            const rooms = wardenData.hostelID.rooms;

            return res.json({ Result: rooms });
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = RoomController;