const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hostelID: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    room_capacity: {
        type: Number,
        required: true,
    },
    warden: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
}, {timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);