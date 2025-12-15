const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const handleValidationErrors = require('../middlewares/validationMiddleware');

const {
  createBookingSchema,
  updateBookingStatusSchema
} = require('../utils/validationSchemas');

const {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');

/**
 * CREATE booking
 */
router.post(
  '/',
  authMiddleware,
  createBookingSchema,
  handleValidationErrors,
  createBooking
);

/**
 * GET current user's bookings
 */
router.get('/me', authMiddleware, getMyBookings);

/**
 * UPDATE booking status (cancel / confirm)
 */
router.put(
  '/:id/status',
  authMiddleware,
  updateBookingStatusSchema,
  handleValidationErrors,
  updateBookingStatus
);

/**
 * DELETE booking
 */
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;

