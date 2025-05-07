const mongoose = require('mongoose');

const StudentWaitingSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    indexNo: { type: String, required: true, unique: true },
    faculty: { type: String, required: true },
    address: { type: String, required: true },
    homeDistance: { type: Number, required: true },
    isApprove: { type: String, required: true },
}, { timestamps: true });

const StudentWaiting = mongoose.model('StudentWaiting', StudentWaitingSchema);

module.exports = StudentWaiting;