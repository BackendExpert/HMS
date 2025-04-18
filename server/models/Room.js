const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true,
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    currentOccupants: {
        type: Number,
        default: 0,
    },
    capacity: {
        type: Number,
        default: 4,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Availabe', 'Repair', 'Full'],
    }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;