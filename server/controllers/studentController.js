const StudentController = {
    createStudent: async(req, res) => {
        try{
            return res.json({ Status: "Success"})
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = StudentController;