const express = require('express');
const router = express.Router();
const academicSectionController = require('../controllers/academicSectionController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, academicSectionController.getAllSections);
router.post('/section', protect, academicSectionController.upsertSection);
router.put('/section/:id/publish', protect, academicSectionController.togglePublish);
router.delete('/section/:id', protect, academicSectionController.deleteSection);

// Public routes - MUST come after admin routes
router.get('/:language', academicSectionController.getPublishedSections);
router.get('/:language/:section', academicSectionController.getSection);

module.exports = router;
