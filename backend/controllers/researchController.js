const ResearchContent = require('../models/ResearchContent');

// Get published content by language and section (Public)
exports.getPublicContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await ResearchContent.findOne({
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

// Get all content for admin
exports.getAllContent = async (req, res) => {
  try {
    const content = await ResearchContent.find().sort({ language: 1, section: 1 });
    
    res.json({
      success: true,
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

// Get all sections for a specific language (Admin)
exports.getAllSectionsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    
    const content = await ResearchContent.find({ language }).sort({ section: 1 });
    
    res.json({
      success: true,
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

// Get content by language and section (Admin)
exports.getContentByLanguageSection = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await ResearchContent.findOne({ language, section });
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
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

// Create or update content
exports.upsertContent = async (req, res) => {
  try {
    const { language, section, content, isPublished } = req.body;
    
    const updatedContent = await ResearchContent.findOneAndUpdate(
      { language, section },
      { content, isPublished },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Content saved successfully',
      data: updatedContent
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
exports.togglePublish = async (req, res) => {
  try {
    const { language, section } = req.params;
    const { isPublished } = req.body;
    
    const content = await ResearchContent.findOneAndUpdate(
      { language, section },
      { isPublished },
      { new: true }
    );
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: `Content ${isPublished ? 'published' : 'unpublished'} successfully`,
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

// Get statistics
exports.getStats = async (req, res) => {
  try {
    const total = await ResearchContent.countDocuments();
    const published = await ResearchContent.countDocuments({ isPublished: true });
    const draft = total - published;
    
    const byLanguage = await ResearchContent.aggregate([
      {
        $group: {
          _id: '$language',
          total: { $sum: 1 },
          published: {
            $sum: { $cond: ['$isPublished', 1, 0] }
          }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        published,
        draft,
        byLanguage
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
