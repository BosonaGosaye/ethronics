const express = require('express');
const router = express.Router();
const researchProjectController = require('../controllers/researchProjectController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public', researchProjectController.getPublicProjects);
router.get('/public/:id', researchProjectController.getPublicProjectById);

// Admin routes (protected)
router.get('/admin', protect, authorize('admin', 'editor'), researchProjectController.getAllProjects);
router.get('/admin/stats', protect, authorize('admin'), researchProjectController.getStats);
router.get('/admin/:id', protect, authorize('admin', 'editor'), researchProjectController.getProjectById);
router.post('/admin', protect, authorize('admin', 'editor'), researchProjectController.createProject);
router.put('/admin/:id', protect, authorize('admin', 'editor'), researchProjectController.updateProject);
router.delete('/admin/:id', protect, authorize('admin'), researchProjectController.deleteProject);
router.patch('/admin/:id/publish', protect, authorize('admin'), researchProjectController.togglePublish);

module.exports = router;
