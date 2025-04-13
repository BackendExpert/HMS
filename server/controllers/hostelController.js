const Hostel = require("../models/Hostel");
const User = require("../models/User");

const HostelController = {
    getWarden: async(req, res) => {
        try{
            const Wardenget = await User.find({ role: 'warden' })
            return res.json({ Result: Wardenget })
        }
        catch(err){
            console.log(err)
        }
    },

    createHostel: async(req, res) => {
        try{
            const {
                hostalName,
                hostelLocation,
                hostelType,
                hostelwarden,
                roomCapacity
            } = req.body

            console.log(req.body)

        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = HostelController;