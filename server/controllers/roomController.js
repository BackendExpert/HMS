const RoomController = {
    getallrooms: async(req, res) => {
        try{
            const allrooms = await Room.find()

            return res.json({ Result: allrooms })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = RoomController;