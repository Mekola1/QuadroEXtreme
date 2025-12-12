const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const handleValidationErrors = require('../middlewares/validationMiddleware');
const { createBookingSchema } = require('../utils/validationSchemas');
const { createBooking, getMyBookings } = require('../controllers/bookingController');

router.post('/', authMiddleware, createBookingSchema, handleValidationErrors, createBooking);
router.get('/me', authMiddleware, getMyBookings);

module.exports = router;
