const express = require('express');
const router = express.Router();
const faqItemController = require('../controllers/faqItemController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/public', faqItemController.getPublishedFAQItems);
router.post('/:id/view', faqItemController.incrementViews);
router.post('/:id/feedback', faqItemController.recordFeedback);

// Protected routes (admin only)
router.use(protect);

router.get('/', faqItemController.getAllFAQItems);
router.get('/statistics', faqItemController.getStatistics);
router.get('/:id', faqItemController.getFAQItem);
router.post('/', faqItemController.createFAQItem);
router.put('/:id', faqItemController.updateFAQItem);
router.delete('/:id', faqItemController.deleteFAQItem);
router.patch('/:id/publish', faqItemController.togglePublish);
router.patch('/:id/feature', faqItemController.toggleFeatured);

module.exports = router;
