const express = require('express');
const router = express.Router();
const libraryResourceController = require('../controllers/libraryResourceController');
const { protect } = require('../middleware/auth');
const { optionalLibraryAuth } = require('../middleware/libraryAuth');

// Public routes (with optional library user auth)
router.get('/public', libraryResourceController.getPublicResources);
router.get('/public/:id', libraryResourceController.getPublicResource);
router.post('/public/:id/view', libraryResourceController.trackView);
router.post('/public/:id/download', libraryResourceController.incrementDownload);

// Admin routes (protected)
router.get('/admin/statistics', protect, libraryResourceController.getStatistics);
router.get('/admin', protect, libraryResourceController.getAllResources);
router.get('/admin/:id', protect, libraryResourceController.getResource);
router.post('/admin', protect, libraryResourceController.createResource);
router.put('/admin/:id', protect, libraryResourceController.updateResource);
router.delete('/admin/:id', protect, libraryResourceController.deleteResource);
router.patch('/admin/:id/publish', protect, libraryResourceController.togglePublish);
router.patch('/admin/:id/featured', protect, libraryResourceController.toggleFeatured);

module.exports = router;
