const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, contactController.getAllContactContent);
router.post('/', protect, contactController.upsertContactContent);
router.patch('/admin/:language/:section/publish', protect, contactController.togglePublishStatus);
router.delete('/:language/:section', protect, contactController.deleteContactContent);

// Public routes - MUST come after admin routes
router.get('/:language/:section', contactController.getContactContent);

module.exports = router;
