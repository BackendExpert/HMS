const express = require('express');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const StudentController = require('../controllers/studentController');
const upload = require('../middleware/UploadMiddleware');


const router = express.Router();

router.get('/allstudents', authMiddleware, accessMiddleware(['admin', 'director']), StudentController.getallStudents)
router.get('/getstudent/:id', authMiddleware, accessMiddleware(['admin', 'director']), StudentController.getstdbyID)
router.get('/vardenstd', authMiddleware, accessMiddleware(['admin', 'director', 'warden']), StudentController.getvardenstd)

router.get('/waitinglist', authMiddleware, accessMiddleware(['admin', 'director']), StudentController.getallstdwaiting)
router.post('/accessstd/:email', authMiddleware, accessMiddleware(['admin', 'director']), StudentController.approveAndCreateAccount)

router.get('/currentstudetdata', authMiddleware, accessMiddleware(['admin', 'director','student']), StudentController.currentstudetdata)

router.post('/updatemydata', authMiddleware, accessMiddleware(['admin', 'director','student']), StudentController.updatestdpersonaldata)

module.exports = router;