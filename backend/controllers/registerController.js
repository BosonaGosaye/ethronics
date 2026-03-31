const RegisterContent = require('../models/RegisterContent');
const { getSectionWithImageFallback } = require('../utils/imageFallback');

// Get content for a specific section and language (public - only published)
exports.getPublicContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const result = await getSectionWithImageFallback(RegisterContent, language, section);

    res.json({
      success: true,
      data: result.data,
      ...(result.fallback && { fallback: true, message: 'Using English content as fallback' })
    });
  } catch (error) {
    console.error('Error in getPublicContent:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: {},
      error: error.message
    });
  }
};

// Get content for a specific section and language (admin)
exports.getAdminContent = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await RegisterContent.findOne({ language, section })
      .populate('lastModifiedBy', 'name email');

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

// Get all sections for a language (admin)
exports.getAllSectionsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    
    const content = await RegisterContent.find({ language })
      .populate('lastModifiedBy', 'name email')
      .sort({ section: 1 });

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

// Get all content (admin)
exports.getAllContent = async (req, res) => {
  try {
    const content = await RegisterContent.find()
      .populate('lastModifiedBy', 'name email')
      .sort({ language: 1, section: 1 });

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

    if (!language || !section) {
      return res.status(400).json({
        success: false,
        message: 'Language and section are required'
      });
    }

    const updatedContent = await RegisterContent.findOneAndUpdate(
      { language, section },
      {
        content,
        isPublished: isPublished !== undefined ? isPublished : false,
        lastModifiedBy: req.user._id
      },
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

    const content = await RegisterContent.findOne({ language, section });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    content.isPublished = !content.isPublished;
    content.lastModifiedBy = req.user._id;
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

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const total = await RegisterContent.countDocuments();
    const published = await RegisterContent.countDocuments({ isPublished: true });
    const draft = await RegisterContent.countDocuments({ isPublished: false });

    res.json({
      success: true,
      data: {
        total,
        published,
        draft
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
