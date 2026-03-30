// @ts-nocheck
const BlogContent = require('../models/BlogContent');

// Get blog content by language and section
exports.getBlogContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await BlogContent.findOne({ 
      language, 
      section,
      isPublished: true 
    });
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      data: content.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all blog content for a language (for admin)
exports.getAllBlogContent = async (req, res) => {
  try {
    const { language } = req.params;
    
    const contents = await BlogContent.find({ language })
      .sort({ section: 1 });
    
    res.json({
      success: true,
      data: contents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create or update blog content
exports.upsertBlogContent = async (req, res) => {
  try {
    const { language, section, content } = req.body;
    
    if (!language || !section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Language, section, and content are required'
      });
    }
    
    const blogContent = await BlogContent.findOneAndUpdate(
      { language, section },
      { content, language, section },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Content saved successfully',
      data: blogContent
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
    const { language, section } = req.params;
    
    const content = await BlogContent.findOne({ language, section });
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    content.isPublished = !content.isPublished;
    await content.save();
    
    res.json({
      success: true,
      message: `Content ${content.isPublished ? 'published' : 'unpublished'} successfully`,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete blog content
exports.deleteBlogContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await BlogContent.findOneAndDelete({ language, section });
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
