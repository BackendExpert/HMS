const express = require('express');
const AuthController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');

const router = express.Router();

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.post('/stdEmailVerfy', AuthController.stdemailverify)
router.post('/updatepass', authMiddleware, accessMiddleware(['admin', 'director', 'warden']), AuthController.updatepassviadash)
router.post('/createuser', authMiddleware, accessMiddleware(['director']), AuthController.createnewuser)
router.get('/allusers', authMiddleware, accessMiddleware(['admin','director']), AuthController.getallusers)
router.put('/togglestatus/:id', authMiddleware, accessMiddleware(['director']), AuthController.toggleUserstatus)

module.exports = router;