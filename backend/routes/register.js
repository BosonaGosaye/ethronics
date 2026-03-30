const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public/:language/:section', registerController.getPublicContent);

// Admin routes
router.get('/admin', protect, authorize('admin'), registerController.getAllContent);
router.get('/admin/:language', protect, authorize('admin'), registerController.getAllSectionsByLanguage);
router.get('/:language/:section', registerController.getAdminContent);
router.post('/', protect, authorize('admin'), registerController.upsertContent);
router.patch('/:language/:section/publish', protect, authorize('admin'), registerController.togglePublish);
router.get('/admin/stats/all', protect, authorize('admin'), registerController.getStatistics);

module.exports = router;
