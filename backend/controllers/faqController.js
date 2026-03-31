const FAQContent = require('../models/FAQContent');
const { getSectionWithImageFallback } = require('../utils/imageFallback');

// Get FAQ content by language and section (public)
exports.getFAQContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const result = await getSectionWithImageFallback(FAQContent, language, section);
    
    res.json({
      success: true,
      data: result.data,
      ...(result.fallback && { fallback: true, message: 'Using English content as fallback' })
    });
  } catch (error) {
    console.error('Error in getFAQContent:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: {},
      error: error.message
    });
  }
};

// Get all FAQ content for a language (admin)
exports.getAllFAQContent = async (req, res) => {
  try {
    const { language } = req.params;
    
    const contents = await FAQContent.find({ language })
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

// Create or update FAQ content
exports.upsertFAQContent = async (req, res) => {
  try {
    const { language, section, content } = req.body;
    
    if (!language || !section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Language, section, and content are required'
      });
    }
    
    const faqContent = await FAQContent.findOneAndUpdate(
      { language, section },
      { content, language, section },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Content saved successfully',
      data: faqContent
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
    
    const content = await FAQContent.findOne({ language, section });
    
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

// Delete FAQ content
exports.deleteFAQContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await FAQContent.findOneAndDelete({ language, section });
    
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
