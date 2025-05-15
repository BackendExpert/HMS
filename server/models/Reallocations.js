const mongoose = require('mongoose');

const ReallocationsSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    currentRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    currentHostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    reqeusthostl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    reqeustroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    reson: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    }
}, { timestamps: true });

const Reallocations = mongoose.model('Reallocations', ReallocationsSchema);

module.exports = Reallocations;