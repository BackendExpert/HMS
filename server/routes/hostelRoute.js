const express = require('express');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const HostelController = require('../controllers/hostelController');
const { authMiddleware } = require('../middleware/AuthMiddleware');


const router = express.Router();

router.get('/getwardens', authMiddleware, accessMiddleware(['admin', 'director']), HostelController.getWarden)
router.post('/createhostel', authMiddleware, accessMiddleware(['admin', 'director']), HostelController.createHostel)
router.get('/hostels', authMiddleware, accessMiddleware(['admin', 'director']), HostelController.getallhostel)

module.exports = router;