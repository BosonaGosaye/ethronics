// @ts-nocheck
const CareersContent = require('../models/CareersContent');
const { getSectionWithImageFallback } = require('../utils/imageFallback');

// Get careers content by language and section
exports.getCareersContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const result = await getSectionWithImageFallback(CareersContent, language, section);
    
    res.json({
      success: true,
      data: result.data,
      ...(result.fallback && { fallback: true, message: 'Using English content as fallback' })
    });
  } catch (error) {
    console.error('Error in getCareersContent:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: {},
      error: error.message
    });
  }
};

// Get all careers content for a language (for admin)
exports.getAllCareersContent = async (req, res) => {
  try {
    const { language } = req.params;
    
    const contents = await CareersContent.find({ language })
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

// Create or update careers content
exports.upsertCareersContent = async (req, res) => {
  try {
    const { language, section, content } = req.body;
    
    if (!language || !section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Language, section, and content are required'
      });
    }
    
    const careersContent = await CareersContent.findOneAndUpdate(
      { language, section },
      { content, language, section },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Content saved successfully',
      data: careersContent
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
    
    const content = await CareersContent.findOne({ language, section });
    
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

// Delete careers content
exports.deleteCareersContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await CareersContent.findOneAndDelete({ language, section });
    
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
