const express = require('express');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const RoomController = require('../controllers/roomController');

const router = express.Router();

router.get('/allrooms', authMiddleware, accessMiddleware(['admin', 'director']), RoomController.getallrooms)
router.post('/roomallocation', authMiddleware, accessMiddleware(['admin', 'director']), RoomController.roomAllocationStd)
router.get('/roomallocationData', authMiddleware, accessMiddleware(['admin', 'director']), RoomController.roomAllcationData)

module.exports = router;