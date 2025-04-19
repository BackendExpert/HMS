const express = require('express');
const AuthController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/AuthMiddleware');
const { accessMiddleware } = require('../middleware/AccessMiddleware');

const router = express.Router();

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.post('/updatepass', authMiddleware, accessMiddleware(['admin', 'director', 'warden']), AuthController.updatepassviadash)

module.exports = router;