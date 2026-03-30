const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, aboutController.getAllContent);
router.post('/', protect, aboutController.upsertContent);
router.put('/:id/publish', protect, aboutController.togglePublish);
router.delete('/:id', protect, aboutController.deleteContent);

// Public routes - MUST come after admin routes
router.get('/:language', aboutController.getPublishedContent);
router.get('/:language/:section', aboutController.getSection);

module.exports = router;
