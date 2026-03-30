const express = require('express');
const router = express.Router();
const manufacturingController = require('../controllers/manufacturingController');
const { protect } = require('../middleware/auth');

// Admin routes (must come first)
router.get('/admin/statistics', protect, manufacturingController.getStatistics);
router.get('/admin/:language', protect, manufacturingController.getAdminContent);
router.get('/admin/:language/:section', protect, manufacturingController.getAdminSection);
router.post('/admin', protect, manufacturingController.upsertSection);
router.patch('/admin/:language/:section/publish', protect, manufacturingController.togglePublish);

// Public routes
router.get('/:language', manufacturingController.getPublicContent);
router.get('/:language/:section', manufacturingController.getPublicSection);

module.exports = router;
