const mongoose = require('mongoose');

const WardenSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    hostelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Warden = mongoose.model('Warden', WardenSchema);

module.exports = Warden;