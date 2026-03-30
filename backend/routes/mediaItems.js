const express = require('express');
const router = express.Router();
const mediaItemController = require('../controllers/mediaItemController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/public', mediaItemController.getPublicMediaItems);
router.post('/public/:id/view', mediaItemController.incrementViews);

// Admin routes (protected)
router.get('/admin', protect, mediaItemController.getAllMediaItems);
router.get('/admin/stats', protect, mediaItemController.getMediaStats);
router.get('/admin/:id', protect, mediaItemController.getMediaItem);
router.post('/admin', protect, mediaItemController.createMediaItem);
router.put('/admin/:id', protect, mediaItemController.updateMediaItem);
router.delete('/admin/:id', protect, mediaItemController.deleteMediaItem);

module.exports = router;
