const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication) - MUST come before public routes
router.get('/admin/:language', protect, blogController.getAllBlogContent);
router.post('/', protect, blogController.upsertBlogContent);
router.patch('/:language/:section/publish', protect, blogController.togglePublishStatus);
router.delete('/:language/:section', protect, blogController.deleteBlogContent);

// Public routes - MUST come after admin routes
router.get('/:language/:section', blogController.getBlogContent);

module.exports = router;
