const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    enrolmentNo: { type: String, required: true, unique: true },
    indexNo: { type: String, required: true, unique: true },
    nic: { type: String, required: true, unique: true },
    title: { type: String },
    initials: { type: String },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    fullName: { type: String },  // Added for complete name
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    email: { type: String, required: true, unique: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    alDistrict: { type: String },
    zScore: { type: Number },  // Decimal is okay with Number
    medium: { type: String },
    generalEnglish: { type: Number },  // Changed to Number
    intake: { type: String },
    dateOfEnrolment: { type: Date },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },  // Optional third line in image
    eligible: { type: Boolean, default: false }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
