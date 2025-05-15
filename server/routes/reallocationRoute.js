const express = require('express');
const { accessMiddleware } = require('../middleware/AccessMiddleware');
const ReallocationsController = require('../controllers/reallocationController');
const { authMiddleware } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/createReallocation', authMiddleware, accessMiddleware(['student', 'admin', 'director']), ReallocationsController.createReAllocation)
router.get('/allreqeusts', authMiddleware, accessMiddleware(['admin', 'director']), ReallocationsController.getallreqeusts)
router.get('/getmyreqeusts', authMiddleware. accessMiddleware(['student', 'admin', 'director']), ReallocationsController.getmyreqeusts)
router.get('/onerequst/:id', authMiddleware, accessMiddleware(['admin', 'director']), ReallocationsController.getReqeustOne)

module.exports = router;