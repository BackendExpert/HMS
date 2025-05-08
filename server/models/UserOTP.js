const mongoose = require('mongoose');

const UserOTPSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }
}, {timestamps: true});

const UserOTP = mongoose.model('UserOTP', UserOTPSchema);

module.exports = UserOTP;