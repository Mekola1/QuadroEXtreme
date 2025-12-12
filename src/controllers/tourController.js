const { Tour } = require('../models');

async function getAllTours(req, res) {
  try {
    const tours = await Tour.findAll();
    res.json(tours);
  } catch (err) {
    console.error('getAllTours error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getTourById(req, res) {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    console.error('getTourById error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function createTour(req, res) {
  try {
    const { title, description, difficulty, duration_hours, price, location, gps_track_url } = req.body;
    const tour = await Tour.create({
      title,
      description,
      difficulty,
      duration_hours,
      price,
      location,
      gps_track_url
    });
    res.status(201).json(tour);
  } catch (err) {
    console.error('createTour error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour
};
