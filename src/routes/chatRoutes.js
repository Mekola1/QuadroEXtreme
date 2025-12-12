const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { sendMessage, getMessagesByBooking } = require('../controllers/chatController');

router.post('/', authMiddleware, sendMessage);
router.get('/booking/:bookingId', authMiddleware, getMessagesByBooking);

module.exports = router;
