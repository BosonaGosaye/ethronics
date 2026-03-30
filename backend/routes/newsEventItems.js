const express = require('express');
const router = express.Router();
const newsEventController = require('../controllers/newsEventController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public', newsEventController.getPublicNewsEvents);
router.get('/public/featured', newsEventController.getFeaturedNewsEvents);
router.get('/public/:slug', newsEventController.getPublicNewsEventBySlug);

// Admin routes
router.get('/admin', protect, authorize('admin'), newsEventController.getAllNewsEvents);
router.get('/admin/stats', protect, authorize('admin'), newsEventController.getStatistics);
router.get('/admin/:id', protect, authorize('admin'), newsEventController.getNewsEventById);
router.post('/admin', protect, authorize('admin'), newsEventController.createNewsEvent);
router.put('/admin/:id', protect, authorize('admin'), newsEventController.updateNewsEvent);
router.delete('/admin/:id', protect, authorize('admin'), newsEventController.deleteNewsEvent);

module.exports = router;
