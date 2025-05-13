const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    indexNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    nic: { type: String },
    title: { type: String },
    firstName: { type: String, },
    surname: { type: String, },
    initials: { type: String },
    gender: { type: String, enum: ['Male', 'Female'], },
    phone1: { type: String, },
    livein: { type: String },
    distance: { type: Number },
    eligible: { type: Boolean, default: false}
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
