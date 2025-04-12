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

            
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = HostelController;