const express = require('express');
const router = express.Router();
const faqQuestionController = require('../controllers/faqQuestionController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/submit', faqQuestionController.submitQuestion);

// Protected routes (admin only)
router.use(protect);

router.get('/', faqQuestionController.getAllQuestions);
router.get('/statistics', faqQuestionController.getStatistics);
router.get('/:id', faqQuestionController.getQuestion);
router.post('/:id/reply', faqQuestionController.replyToQuestion);
router.patch('/:id/important', faqQuestionController.toggleImportant);
router.post('/:id/convert-to-faq', faqQuestionController.convertToFAQ);
router.patch('/:id/status', faqQuestionController.updateStatus);
router.delete('/:id', faqQuestionController.deleteQuestion);

module.exports = router;
