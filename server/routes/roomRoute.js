const express = require('express');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const RoomController = require('../controllers/roomController');

const router = express.Router();

router.get('/allrooms', authMiddleware, accessMiddleware(['admin', 'director']), RoomController.getallrooms)

module.exports = router;