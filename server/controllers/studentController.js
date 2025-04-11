const Student = require("../models/Student");
const XLSX = require('xlsx');

const StudentController = {
    createStudent: async(req, res) => {
        try{
            const filePath = req.file.path;

            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const studentsFromExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
            let insertedStudents = [];
            let skippedStudents = [];
        
            for (const student of studentsFromExcel) {
              const existingStudent = await Student.findOne({
                $or: [
                  { enrolmentNo: student.enrolmentNo },
                  { indexNo: student.indexNo },
                  { nic: student.nic },
                  { email: student.email }
                ]
              });
        
              if (existingStudent) {
                skippedStudents.push(student); // Duplicate found
              } else {
                insertedStudents.push(student); // No conflict
              }
            }
        
            const savedStudents = await Student.insertMany(insertedStudents);

            if(savedStudents){
                return res.json({ Status: "Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
            

        }
        catch(err){
            console.log(err)
        }
    },

    getallStudents: async(req, res) => {
        try{
            const getallstd = await Student.find()

            return res.json({ Result: getallstd})
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = StudentController;