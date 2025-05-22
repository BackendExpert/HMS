const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Enrolment_No: { type: String, required: true, unique: true },
    Index_No: { type: String, required: true, unique: true },
    Name: { type: String },
    Title: { type: String }, 
    L_Name: { type: String },
    Initials: { type: String },
    Full_Name: { type: String },
    alDistrict: { type: String },
    Sex: { type: String, enum: ['Male', 'Female', 'Other'] },
    Z_Score: { type: Number },
    Medium: { type: String },
    NIC: { type: String, unique: true },
    ADD1: { type: String },
    ADD2: { type: String },
    ADD3: { type: String },
    Address: { type: String },
    email: { type: String, unique: true },
    Phone_No: { type: String },
    Phone_No_1: { type: String },
    Gen_English_Marks: { type: Number },
    Intake: { type: String },
    Date_of_Enollment: { type: Date },
    faculty: { type: String }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
