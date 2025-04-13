const Hostel = require("../models/Hostel");
const User = require("../models/User");
const Warden = require("../models/Warden");

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

            const checkhostel = await Hostel.findOne({ name: hostalName })

            if(checkhostel){
                return res.json({ Error: "The Hostal Already Exists"})
            }

            const wardenget = await User.findOne({ email: hostelwarden })

            const newhostel = new Hostel({
                name: hostalName,
                location: hostelLocation,
                gender: hostelType,
                room_capacity: roomCapacity,
                warden: wardenget._id,
            })

            const resultnewhost = await newhostel.save()

            if(resultnewhost){
                const assignwarden = await Warden.findOne({ email: hostelwarden })

                if(assignwarden){
                    return res.json({ Error: 'This Warden Already Assigned'})
                }

                const WardenAssign = new Warden({ 
                    email: hostelwarden,
                    hostelID: resultnewhost._id
                })

                const resultassignWarden = await WardenAssign.save()

                if(resultassignWarden){
                    return res.json({ Status: "Success"})
                }
                else{
                    return res.json({ Error: "Internal Server Error whilte Assign Warden"})
                }                
            }
            else{
                return res.json({ Error: "Internal Server Error While creating Hostel"})
            }

        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = HostelController;