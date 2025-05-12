const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    indexNo: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "student", enum: ['student', 'warden', 'admin', 'director'] },
    faculty: { type: String },
    isActive: { type: Boolean, default: false }
}, {timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;