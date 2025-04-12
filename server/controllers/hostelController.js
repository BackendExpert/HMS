const Hostel = require("../models/Hostel");

const HostelController = {
    createHostel: async(req, res) => {
        try{
            const {
                hostalName,
                hostelLocation,
                hostelType,
                roomCapacity
            } = req.body

            const checkhostel = await Hostel.findOne({ name: hostalName })

            if(checkhostel){
                return res.json({ Error: "Hostel Already Exists"})
            }
            
            const newhostel = new Hostel({
                name: hostalName,
                location: hostelLocation,
                room_capacity: roomCapacity,
                gender: hostelType
            })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = HostelController;