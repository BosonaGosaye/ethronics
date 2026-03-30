const express = require('express');
const router = express.Router();
const contactMessageController = require('../controllers/contactMessageController');
const { protect } = require('../middleware/auth');

// Public route - submit contact message
router.post('/submit', contactMessageController.submitMessage);

// Protected routes (admin only)
router.get('/statistics', protect, contactMessageController.getStatistics);
router.get('/', protect, contactMessageController.getAllMessages);
router.get('/:id', protect, contactMessageController.getMessageById);
router.patch('/:id/read', protect, contactMessageController.markAsRead);
router.patch('/:id/status', protect, contactMessageController.updateStatus);
router.post('/:id/reply', protect, contactMessageController.replyToMessage);
router.delete('/:id', protect, contactMessageController.deleteMessage);

module.exports = router;
