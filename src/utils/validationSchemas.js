const { body } = require('express-validator');

/**
 * AUTH
 */
const registerSchema = [
  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('full_name')
    .notEmpty()
    .withMessage('Full name is required')
];

const loginSchema = [
  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * BOOKINGS
 */
const createBookingSchema = [
  body('tour_id')
    .notEmpty()
    .withMessage('tour_id is required'),

  body('date')
    .isISO8601()
    .withMessage('date must be a valid date'),

  body('participants_count')
    .optional()
    .isInt({ min: 1 })
    .withMessage('participants_count must be >= 1')
];

/**
 * UPDATE booking status
 */
const updateBookingStatusSchema = [
  body('status')
    .notEmpty()
    .withMessage('status is required')
    .isIn(['pending', 'confirmed', 'cancelled'])
    .withMessage('status must be pending, confirmed or cancelled')
];

module.exports = {
  registerSchema,
  loginSchema,
  createBookingSchema,
  updateBookingStatusSchema
};

