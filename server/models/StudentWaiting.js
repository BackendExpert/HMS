const mongoose = require('mongoose');

const StudentWaitingSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    indexNo: { type: String, required: true, unique: true },
    faculty: { type: String, required: true },
    address: { type: String, required: true },
    homeDistance: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }, 
    isVerifyEmail: { type: Boolean, required: true, default: false },
    isApprove: { type: Boolean, required: true, default: false },
}, { timestamps: true }); 

const StudentWaiting = mongoose.model('StudentWaiting', StudentWaitingSchema);

module.exports = StudentWaiting;