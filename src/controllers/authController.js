const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { email, password, full_name } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email,
      password_hash,
      full_name
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      full_name: user.full_name
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
  login
};
