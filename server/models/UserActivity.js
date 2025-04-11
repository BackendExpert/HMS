const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    activity: { type: String, required: true },
}, {timestamps: true});

const UserActivity = mongoose.model('UserActivity', UserActivitySchema);

module.exports = UserActivity;