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

            const availableRooms = await Room.find({ status: 'Available' });

            if (!availableRooms || availableRooms.length === 0) {
                return res.json({ error: "No rooms found in the database. Please add rooms before allocating." });
            }

            const genderGroupedRooms = {
                Male: availableRooms.filter(room => room.gender === 'Male'),
                Female: availableRooms.filter(room => room.gender === 'Female')
            };

            let allocations = [];
            let studentsAssigned = 0;

            const isAllFieldsFilled = (student) => {
                const requiredFields = [
                    'email', 'nic', 'title', 'firstName', 'surname',
                    'initials', 'gender', 'phone', 'address', 'distance'
                ];
                return requiredFields.every(field => {
                    const value = student[field];
                    return value !== null && value !== undefined && value !== '';
                });
            };

            for (const student of eligiblestds) {
                if (!isAllFieldsFilled(student)) {
                    console.warn(`Student ${student._id} skipped due to incomplete data.`);
                    continue;
                }

                const studentGender = student.gender?.trim().charAt(0).toUpperCase() + student.gender?.slice(1).toLowerCase();
                const roomsForGender = genderGroupedRooms[studentGender];

                if (!roomsForGender || roomsForGender.length === 0) {
                    console.warn(`No rooms available for gender: ${studentGender}`);
                    continue;
                }

                const alreadyAllocated = await RoomAllocation.findOne({ studentId: student._id });
                if (alreadyAllocated) {
                    console.warn(`Student ${student._id} already allocated`);
                    continue;
                }

                let roomAllocated = false;

                for (let room of roomsForGender) {
                    if (room.currentOccupants < room.capacity) {
                        await RoomAllocation.create({
                            studentId: student._id,
                            roomId: room._id
                        });

                        room.currentOccupants += 1;
                        room.students.push(student._id);

                        if (room.currentOccupants >= room.capacity) {
                            room.status = 'Full';
                        }

                        await room.save();

                        allocations.push({
                            student: {
                                id: student._id,
                                name: student.firstName + ' ' + student.surname,
                                gender: student.gender,
                                email: student.email,
                                phone: student.phone,
                                address: student.address,
                                distance: student.distance
                            },
                            room: room.roomNumber
                        });

                        studentsAssigned++;
                        roomAllocated = true;
                        break;
                    }
                }

                if (!roomAllocated) {
                    console.warn(`No available room for student ${student._id}`);
                }
            }

            if (studentsAssigned === eligiblestds.length) {
                res.json({ Status: "Success", Allocated: allocations });
            } else {
                res.json({
                    Status: "Partial Success",
                    Allocated: allocations,
                    Message: `${studentsAssigned} out of ${eligiblestds.length} students were allocated rooms.`
                });
            }

        } catch (err) {
            console.log("❌ Allocation Error:", err);
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
                        model: 'Room',
                        populate: {
                            path: 'hostel',
                            model: 'Hostel'
                        }
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