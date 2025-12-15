const { Booking, Tour } = require('../models');

async function createBooking(req, res) {
  try {
    const { tour_id, date, participants_count } = req.body;

    const tour = await Tour.findByPk(tour_id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const total_price =
      Number(tour.price) * Number(participants_count || 1);

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

/**
 * UPDATE booking status (cancel / confirm)
 */
async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error('updateBookingStatus error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * DELETE booking
 */
async function deleteBooking(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Booking.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('deleteBooking error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  deleteBooking
};

