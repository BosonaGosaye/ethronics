const express = require('express');
const router = express.Router();
const siteSettingsController = require('../controllers/siteSettingsController');
const { protect, authorize } = require('../middleware/auth');

// Public route - get settings
router.get('/', siteSettingsController.getSettings);

// Protected routes - admin only
router.put('/', protect, authorize('admin', 'editor'), siteSettingsController.updateSettings);

module.exports = router;
