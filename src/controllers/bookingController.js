const { Booking, Tour } = require('../models');

async function createBooking(req, res) {
  try {
    const { tour_id, date, participants_count } = req.body;

    const tour = await Tour.findByPk(tour_id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const total_price = Number(tour.price) * Number(participants_count || 1);

    const booking = await Booking.create({
      user_id: req.user.id,
      tour_id,
      date,
      participants_count,
      total_price
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('createBooking error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: req.user.id },
      include: [Tour]
    });
    res.json(bookings);
  } catch (err) {
    console.error('getMyBookings error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createBooking,
  getMyBookings
};
