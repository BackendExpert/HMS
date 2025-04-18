const mongoose = require('mongoose');

const RoomAllocationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    allocatedOn: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const RoomAllocation = mongoose.model('RoomAllocation', RoomAllocationSchema);

module.exports = RoomAllocation;