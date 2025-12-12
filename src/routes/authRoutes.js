const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const handleValidationErrors = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../utils/validationSchemas');

router.post('/register', registerSchema, handleValidationErrors, register);
router.post('/login', loginSchema, handleValidationErrors, login);

module.exports = router;
