const BlogPost = require('../models/BlogPost');

// Get all blog posts (with filters)
exports.getAllBlogPosts = async (req, res) => {
  try {
    const { category, featured, search, limit, skip } = req.query;
    const isPublicRoute = req.path.includes('/public');
    
    const query = {};
    
    // For public routes, only show published posts
    if (isPublicRoute) {
      query.isPublished = true;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const posts = await BlogPost.find(query)
      .sort({ publishDate: -1 })
      .limit(parseInt(limit) || 100)
      .skip(parseInt(skip) || 0);
    
    const total = await BlogPost.countDocuments(query);
    
    // For public routes, return array directly (not wrapped in object)
    if (isPublicRoute) {
      return res.json(posts);
    }
    
    // For admin routes, return with metadata
    res.json({
      success: true,
      data: posts,
      total,
      page: Math.floor((parseInt(skip) || 0) / (parseInt(limit) || 100)) + 1,
      pages: Math.ceil(total / (parseInt(limit) || 100))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single blog post by slug
exports.getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({ slug, isPublished: true });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Increment views
    post.stats.views += 1;
    await post.save();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const postData = req.body;
    
    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug: postData.slug });
    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this slug already exists'
      });
    }
    
    const post = new BlogPost(postData);
    await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If slug is being updated, check if it's unique
    if (updateData.slug) {
      const existingPost = await BlogPost.findOne({ 
        slug: updateData.slug,
        _id: { $ne: id }
      });
      
      if (existingPost) {
        return res.status(400).json({
          success: false,
          message: 'A blog post with this slug already exists'
        });
      }
    }
    
    const post = await BlogPost.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findByIdAndDelete(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Toggle publish status
exports.togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    post.isPublished = !post.isPublished;
    await post.save();
    
    res.json({
      success: true,
      message: `Blog post ${post.isPublished ? 'published' : 'unpublished'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Toggle featured status
exports.toggleFeaturedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    post.featured = !post.featured;
    await post.save();
    
    res.json({
      success: true,
      message: `Blog post ${post.featured ? 'marked as featured' : 'unmarked as featured'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Like a blog post
exports.likeBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    post.stats.likes += 1;
    await post.save();
    
    res.json({
      success: true,
      message: 'Post liked successfully',
      data: {
        likes: post.stats.likes
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

// Unlike a blog post
exports.unlikeBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    if (post.stats.likes > 0) {
      post.stats.likes -= 1;
      await post.save();
    }
    
    res.json({
      success: true,
      message: 'Post unliked successfully',
      data: {
        likes: post.stats.likes
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

// Get blog stats
exports.getBlogStats = async (req, res) => {
  try {
    const total = await BlogPost.countDocuments();
    const published = await BlogPost.countDocuments({ isPublished: true });
    const draft = await BlogPost.countDocuments({ isPublished: false });
    const featured = await BlogPost.countDocuments({ featured: true });
    
    const categoryStats = await BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        published,
        draft,
        featured,
        categories: categoryStats
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

// Get public blog statistics (for hero, filter, sidebar)
exports.getPublicBlogStats = async (req, res) => {
  try {
    // Total published posts
    const totalPosts = await BlogPost.countDocuments({ isPublished: true });
    
    // Total views across all posts
    const viewsResult = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, totalViews: { $sum: '$stats.views' } } }
    ]);
    const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0;
    
    // Category counts (only published posts)
    const categoryStats = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Tag counts (only published posts)
    const tagStats = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    // Calculate monthly readers (views in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentPosts = await BlogPost.find({
      isPublished: true,
      publishDate: { $gte: thirtyDaysAgo }
    });
    
    const monthlyReaders = recentPosts.reduce((sum, post) => sum + post.stats.views, 0);
    
    res.json({
      success: true,
      data: {
        totalPosts,
        totalViews,
        monthlyReaders,
        categories: categoryStats,
        tags: tagStats
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
