const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
    email: { type: String, required: true },
    activity: { type: String, required: true },
}, {timestamps: true});

const UserActivity = mongoose.model('UserActivity', UserActivitySchema);

module.exports = UserActivity;