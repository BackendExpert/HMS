const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    enrolmentNo: { type: String, unique: true },
    indexNo: { type: String, required: true, unique: true },
    nic: { type: String, required: true, unique: true },
    title: { type: String },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    initials: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    email: { type: String, required: true, unique: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    alDistrict: { type: String },
    zScore: { type: Number },
    medium: { type: String },
    generalEnglish: { type: String },
    intake: { type: String },
    dateOfEnrolment: { type: Date },
    address1: { type: String },
    address2: { type: String },
    distance: { type: Number },
    eligible: { type: Boolean, default: false}
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
