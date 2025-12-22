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
  getGuideBookings,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');

/**
 * ================================
 * CREATE BOOKING (USER)
 * POST /api/bookings
 * ================================
 */
router.post(
  '/',
  authMiddleware,
  createBookingSchema,
  handleValidationErrors,
  createBooking
);

/**
 * ================================
 * GET MY BOOKINGS (USER)
 * GET /api/bookings/me
 * ================================
 */
router.get(
  '/me',
  authMiddleware,
  getMyBookings
);

/**
 * ================================
 * GET BOOKINGS FOR GUIDE
 * GET /api/bookings/guide
 * ================================
 */
router.get(
  '/guide',
  authMiddleware,
  getGuideBookings
);

/**
 * ================================
 * UPDATE BOOKING STATUS
 * PUT /api/bookings/:id/status
 * ================================
 */
router.put(
  '/:id/status',
  authMiddleware,
  updateBookingStatusSchema,
  handleValidationErrors,
  updateBookingStatus
);

/**
 * ================================
 * DELETE BOOKING
 * DELETE /api/bookings/:id
 * ================================
 */
router.delete(
  '/:id',
  authMiddleware,
  deleteBooking
);

module.exports = router;

