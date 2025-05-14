const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nic: { type: String },
    title: { type: String },
    firstName: { type: String },
    surname: { type: String },
    initials: { type: String },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    phone: { type: String },
    address: { type: String, required: true },
    distance: { type: Number, required: true },
    eligible: { type: Boolean, default: false }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
