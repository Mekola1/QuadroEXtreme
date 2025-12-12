const { body } = require('express-validator');

const registerSchema = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('full_name')
    .notEmpty()
    .withMessage('Full name is required')
];

const loginSchema = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const createBookingSchema = [
  body('tour_id').notEmpty().withMessage('tour_id is required'),
  body('date').isISO8601().withMessage('date must be a valid date'),
  body('participants_count')
    .isInt({ min: 1 })
    .withMessage('participants_count must be >= 1')
];

module.exports = {
  registerSchema,
  loginSchema,
  createBookingSchema
};
