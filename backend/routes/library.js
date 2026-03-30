const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, libraryController.getAllLibraryContent);
router.post('/', protect, libraryController.upsertLibraryContent);
router.patch('/admin/:language/:section/publish', protect, libraryController.togglePublishStatus);
router.delete('/:language/:section', protect, libraryController.deleteLibraryContent);

// Public routes - MUST come after admin routes
router.get('/:language/:section', libraryController.getLibraryContent);

module.exports = router;
