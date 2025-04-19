const Room = require('../models/Room');
const Student = require('../models/Student');
const RoomAllocation = require('../models/RoomAllocation')

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
            const eligiblestds = await Student.find({ eligible: true })

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

                    await RoomAllocation.create({
                        studentId: student._id,
                        roomId: room._id
                    });


                    room.currentOccupants += 1;

                    if (room.currentOccupants >= room.capacity) {
                        room.status = 'Full';
                    }

                    await room.save();
                }
            }

            res.json({ Status: "Success" });

        }
        catch (err) {
            console.log(err)
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
    }
};

module.exports = RoomController;