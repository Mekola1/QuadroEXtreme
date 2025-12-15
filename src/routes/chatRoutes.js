const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
  sendMessage,
  getMessagesByBooking,
  deleteMessage
} = require('../controllers/chatController');

/**
 * CREATE message
 */
router.post('/', authMiddleware, sendMessage);

/**
 * GET messages by booking
 */
router.get('/booking/:bookingId', authMiddleware, getMessagesByBooking);

/**
 * DELETE message
 */
router.delete('/:id', authMiddleware, deleteMessage);

module.exports = router;

