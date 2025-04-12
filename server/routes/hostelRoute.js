const express = require('express');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const HostelController = require('../controllers/hostelController');

const router = express.Router();

router.get('/getwardens', accessMiddleware, accessMiddleware(['admin', 'director']), HostelController.getWarden)

module.exports = router;