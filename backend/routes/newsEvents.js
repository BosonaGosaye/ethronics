const express = require('express');
const router = express.Router();
const newsEventsController = require('../controllers/newsEventsController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public/:language', newsEventsController.getPublicContent);
router.get('/public/:language/:section', newsEventsController.getPublicSection);

// Admin routes
router.get('/admin/:language', protect, authorize('admin'), newsEventsController.getAdminContent);
router.get('/admin/:language/:section', protect, authorize('admin'), newsEventsController.getAdminSection);
router.post('/admin', protect, authorize('admin'), newsEventsController.upsertSection);
router.patch('/admin/:language/:section/publish', protect, authorize('admin'), newsEventsController.togglePublish);
router.get('/admin/stats/all', protect, authorize('admin'), newsEventsController.getStatistics);

module.exports = router;
