const express = require('express');
const router = express.Router();
const researchController = require('../controllers/researchController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public/:language/:section', researchController.getPublicContent);

// Admin routes (protected)
router.get('/admin', protect, authorize('admin', 'editor'), researchController.getAllContent);
router.get('/admin/:language', protect, authorize('admin', 'editor'), researchController.getAllSectionsByLanguage);
router.get('/:language/:section', protect, authorize('admin', 'editor'), researchController.getContentByLanguageSection);
router.post('/', protect, authorize('admin', 'editor'), researchController.upsertContent);
router.patch('/:language/:section/publish', protect, authorize('admin'), researchController.togglePublish);
router.get('/admin/stats', protect, authorize('admin'), researchController.getStats);

module.exports = router;
