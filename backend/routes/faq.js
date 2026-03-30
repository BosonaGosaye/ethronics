const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, faqController.getAllFAQContent);
router.post('/', protect, faqController.upsertFAQContent);
router.patch('/admin/:language/:section/publish', protect, faqController.togglePublishStatus);
router.delete('/:language/:section', protect, faqController.deleteFAQContent);

// Public routes - MUST come after admin routes
router.get('/:language/:section', faqController.getFAQContent);

module.exports = router;
