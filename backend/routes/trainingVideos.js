const express = require('express');
const router = express.Router();
const trainingVideoController = require('../controllers/trainingVideoController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/public', trainingVideoController.getPublicVideos);

// Admin routes (protected)
router.use(protect);
router.get('/', trainingVideoController.getAllVideos);
router.get('/:id', trainingVideoController.getVideo);
router.post('/', trainingVideoController.createVideo);
router.put('/:id', trainingVideoController.updateVideo);
router.delete('/:id', trainingVideoController.deleteVideo);
router.put('/:id/publish', trainingVideoController.togglePublish);

module.exports = router;
