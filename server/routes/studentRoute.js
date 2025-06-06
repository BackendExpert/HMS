const express = require('express');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const StudentController = require('../controllers/studentController');
const upload = require('../middleware/UploadMiddleware');


const router = express.Router();

router.post('/uploadsheet', authMiddleware, accessMiddleware(['admin', 'director']), upload.single('file'), StudentController.createStudent)
router.get('/allstudents', authMiddleware, accessMiddleware(['admin', 'director']), StudentController.getallStudents)
router.get('/getstudent/:id', authMiddleware, accessMiddleware(['admin', 'director']), StudentController.getstdbyID)
router.get('/vardenstd', authMiddleware, accessMiddleware(['admin', 'director', 'warden']), StudentController.getvardenstd)

module.exports = router;