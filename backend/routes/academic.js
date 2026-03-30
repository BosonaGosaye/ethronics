const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/content', academicController.getAcademicContent);

// Protected routes (require authentication)
router.put('/content', protect, academicController.updateAcademicContent);
router.put('/content/:section', protect, academicController.updateSection);
router.put('/publish', protect, academicController.togglePublish);

module.exports = router;
