const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogPostController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/public', blogPostController.getAllBlogPosts);
router.get('/public/slug/:slug', blogPostController.getBlogPostBySlug);
router.get('/public/stats', blogPostController.getPublicBlogStats);
router.post('/public/:id/like', blogPostController.likeBlogPost);
router.post('/public/:id/unlike', blogPostController.unlikeBlogPost);

// Protected routes (admin only)
router.get('/stats', protect, blogPostController.getBlogStats);
router.get('/', protect, blogPostController.getAllBlogPosts);
router.get('/:id', protect, blogPostController.getBlogPostById);
router.post('/', protect, blogPostController.createBlogPost);
router.put('/:id', protect, blogPostController.updateBlogPost);
router.delete('/:id', protect, blogPostController.deleteBlogPost);
router.patch('/:id/publish', protect, blogPostController.togglePublishStatus);
router.patch('/:id/featured', protect, blogPostController.toggleFeaturedStatus);

module.exports = router;
