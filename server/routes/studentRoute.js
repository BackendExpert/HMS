const express = require('express');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const StudentController = require('../controllers/studentController');
const { fileupload } = require('../middleware/UploadMiddleware');


const router = express.Router();

router.post('/uploadsheet', authMiddleware, accessMiddleware(['admin', 'director']), fileupload.single('sheet'), StudentController.createStudent)

module.exports = router;