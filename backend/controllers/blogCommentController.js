const BlogComment = require('../models/BlogComment');
const BlogPost = require('../models/BlogPost');

// Get comments for a blog post (public - only approved)
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await BlogComment.find({
      postId,
      isApproved: true,
      isDeleted: false
    }).sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get comment count for a blog post (public - includes pending)
exports.getPostCommentCount = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const approvedCount = await BlogComment.countDocuments({
      postId,
      isApproved: true,
      isDeleted: false
    });
    
    const totalCount = await BlogComment.countDocuments({
      postId,
      isDeleted: false
    });
    
    res.json({
      approved: approvedCount,
      total: totalCount,
      pending: totalCount - approvedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all comments (admin)
exports.getAllComments = async (req, res) => {
  try {
    const { postId, approved } = req.query;
    
    const query = { isDeleted: false };
    
    if (postId) {
      query.postId = postId;
    }
    
    if (approved !== undefined) {
      query.isApproved = approved === 'true';
    }
    
    const comments = await BlogComment.find(query)
      .populate('postId', 'translations.en.title slug')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create a comment
exports.createComment = async (req, res) => {
  try {
    const { postId, author, content } = req.body;
    
    if (!postId || !author?.name || !author?.email || !content) {
      return res.status(400).json({
        success: false,
        message: 'Post ID, author name, author email, and content are required'
      });
    }
    
    // Check if post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Generate avatar if not provided
    if (!author.avatar) {
      author.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`;
    }
    
    const comment = new BlogComment({
      postId,
      author,
      content,
      isApproved: false // Requires admin approval
    });
    
    await comment.save();
    
    // Update post comment count
    post.stats.comments = await BlogComment.countDocuments({ 
      postId, 
      isApproved: true,
      isDeleted: false 
    });
    await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Comment submitted successfully. It will be visible after admin approval.',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Approve/unapprove comment (admin)
exports.toggleApproval = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await BlogComment.findById(id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    comment.isApproved = !comment.isApproved;
    await comment.save();
    
    // Update post comment count
    const post = await BlogPost.findById(comment.postId);
    if (post) {
      post.stats.comments = await BlogComment.countDocuments({ 
        postId: comment.postId, 
        isApproved: true,
        isDeleted: false 
      });
      await post.save();
    }
    
    res.json({
      success: true,
      message: `Comment ${comment.isApproved ? 'approved' : 'unapproved'} successfully`,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete comment (admin)
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await BlogComment.findById(id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    comment.isDeleted = true;
    await comment.save();
    
    // Update post comment count
    const post = await BlogPost.findById(comment.postId);
    if (post) {
      post.stats.comments = await BlogComment.countDocuments({ 
        postId: comment.postId, 
        isApproved: true,
        isDeleted: false 
      });
      await post.save();
    }
    
    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get comment stats (admin)
exports.getCommentStats = async (req, res) => {
  try {
    const total = await BlogComment.countDocuments({ isDeleted: false });
    const approved = await BlogComment.countDocuments({ isApproved: true, isDeleted: false });
    const pending = await BlogComment.countDocuments({ isApproved: false, isDeleted: false });
    
    res.json({
      success: true,
      data: {
        total,
        approved,
        pending
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
