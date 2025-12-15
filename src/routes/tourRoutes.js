const express = require('express');
const router = express.Router();

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Public routes
 */
router.get('/', getAllTours);
router.get('/:id', getTourById);

/**
 * Protected routes
 * (create / update / delete)
 */
router.post('/', authMiddleware, createTour);
router.put('/:id', authMiddleware, updateTour);
router.delete('/:id', authMiddleware, deleteTour);

module.exports = router;

