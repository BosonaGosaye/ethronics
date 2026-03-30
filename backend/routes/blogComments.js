const express = require('express');
const router = express.Router();
const blogCommentController = require('../controllers/blogCommentController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/post/:postId', blogCommentController.getPostComments);
router.get('/post/:postId/count', blogCommentController.getPostCommentCount);
router.post('/', blogCommentController.createComment);

// Protected routes (admin only)
router.get('/admin/all', protect, blogCommentController.getAllComments);
router.get('/admin/stats', protect, blogCommentController.getCommentStats);
router.patch('/:id/approve', protect, blogCommentController.toggleApproval);
router.delete('/:id', protect, blogCommentController.deleteComment);

module.exports = router;
