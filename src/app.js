const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'QuadXtreme API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;
