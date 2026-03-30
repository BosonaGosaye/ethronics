const LibraryContent = require('../models/LibraryContent');

// Get library content by language and section (public)
exports.getLibraryContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await LibraryContent.findOne({ 
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

// Get all library content for a language (admin)
exports.getAllLibraryContent = async (req, res) => {
  try {
    const { language } = req.params;
    
    const contents = await LibraryContent.find({ language })
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

// Create or update library content
exports.upsertLibraryContent = async (req, res) => {
  try {
    const { language, section, content } = req.body;
    
    if (!language || !section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Language, section, and content are required'
      });
    }
    
    const libraryContent = await LibraryContent.findOneAndUpdate(
      { language, section },
      { content, language, section },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Content saved successfully',
      data: libraryContent
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
    const { isPublished } = req.body;
    
    const content = await LibraryContent.findOne({ language, section });
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    content.isPublished = isPublished !== undefined ? isPublished : !content.isPublished;
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

// Delete library content
exports.deleteLibraryContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await LibraryContent.findOneAndDelete({ language, section });
    
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
