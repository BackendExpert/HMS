const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({

});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;