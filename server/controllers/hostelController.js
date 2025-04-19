const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const User = require("../models/User");
const Warden = require("../models/Warden");

const HostelController = {
    getWarden: async (req, res) => {
        try {
            const wardens = await Warden.find({}, 'email');
            const wardenEmails = wardens.map(w => w.email);

            const usersNotInWardenModel = await User.find({
                role: 'warden',
                email: { $nin: wardenEmails }
            });

            return res.json({ Result: usersNotInWardenModel })
        }
        catch (err) {
            console.log(err)
        }
    },

    createHostel: async (req, res) => {
        try {
            const {
                hostalName,
                hostelID,
                hostelLocation,
                hostelType,
                hostelwarden,
                roomCapacity
            } = req.body;
    
            const checkhostel = await Hostel.findOne({
                $or: [
                    { name: hostalName },
                    { hostelID: hostelID },
                ]
            });
    
            if (checkhostel) {
                return res.json({ Error: "The Hostal Already Exists" });
            }
    
            const wardenget = await User.findOne({ email: hostelwarden });
    
            const newhostel = new Hostel({
                name: hostalName,
                hostelID: hostelID,
                location: hostelLocation,
                gender: hostelType,
                room_capacity: roomCapacity,
                warden: wardenget._id,
            });
    
            const resultnewhost = await newhostel.save();
    
            if (!resultnewhost) {
                return res.json({ Error: "Internal Server Error While creating Hostel" });
            }
    
            const assignwarden = await Warden.findOne({ email: hostelwarden });
    
            if (assignwarden) {
                return res.json({ Error: 'This Warden Already Assigned' });
            }
    
            const WardenAssign = new Warden({
                email: hostelwarden,
                hostelID: resultnewhost._id
            });
    
            const resultassignWarden = await WardenAssign.save();
    
            if (!resultassignWarden) {
                return res.json({ Error: "Internal Server Error while Assigning Warden" });
            }
    
            const roomtosave = [];
    
            for (let i = 1; i <= roomCapacity; i++) {
                const newRoom = new Room({
                    roomNumber: `${hostelID}/${i}`,
                    hostel: resultnewhost._id,
                    gender: hostelType,
                });
                roomtosave.push(newRoom.save());
            }
    
            const resultrooma = await Promise.all(roomtosave);
    
            if (!resultrooma) {
                return res.json({ Error: "Internal Server Error while assigning rooms" });
            }
    
            // ✅ Add room IDs to the hostel document
            resultnewhost.rooms = resultrooma.map(room => room._id);
            await resultnewhost.save();
    
            return res.json({ Status: "Success" });
    
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: "Server Error" });
        }
    },
    
    getallhostel: async (req, res) => {
        try {
            const hostels = await Hostel.find().populate('warden', 'email');
            return res.json({ Result: hostels });
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = HostelController;