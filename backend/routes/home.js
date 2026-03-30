const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (Admin/Editor) - Must come BEFORE public routes to avoid conflicts
// @route   GET /api/home/admin/:language
// @desc    Get all home content (including unpublished)
// @access  Private
router.get('/admin/:language', protect, homeController.getAllContent);

// @route   GET /api/home/history/:language/:section
// @desc    Get content history
// @access  Private
router.get('/history/:language/:section', protect, homeController.getHistory);

// Public routes
// @route   GET /api/home/:language
// @desc    Get all published home content for a language
// @access  Public
router.get('/:language', homeController.getPublishedContent);

// @route   GET /api/home/:language/:section
// @desc    Get specific section content
// @access  Public
router.get('/:language/:section', homeController.getSection);

// @route   POST /api/home
// @desc    Create or update home content section
// @access  Private
router.post('/', protect, authorize('admin', 'editor'), homeController.upsertContent);

// @route   PUT /api/home/:id/publish
// @desc    Publish/unpublish content
// @access  Private/Admin
router.put('/:id/publish', protect, authorize('admin'), homeController.togglePublish);

// @route   DELETE /api/home/:id
// @desc    Delete content section
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), homeController.deleteContent);

// @route   GET /api/home/history/:language/:section
// @desc    Get content history
// @access  Private
router.get('/history/:language/:section', protect, homeController.getHistory);

module.exports = router;
