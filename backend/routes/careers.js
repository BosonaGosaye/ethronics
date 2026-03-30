const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careersController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, careersController.getAllCareersContent);
router.post('/', protect, careersController.upsertCareersContent);
router.patch('/:language/:section/publish', protect, careersController.togglePublishStatus);
router.delete('/:language/:section', protect, careersController.deleteCareersContent);

// Public routes - MUST come after admin routes
router.get('/:language/:section', careersController.getCareersContent);

module.exports = router;
