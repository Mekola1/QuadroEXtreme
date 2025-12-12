const express = require('express');
const router = express.Router();

const { getAllTours, getTourById, createTour } = require('../controllers/tourController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', authMiddleware, createTour);

module.exports = router;
