const NewsEventsContent = require('../models/NewsEventsContent');

// Get all sections for a language (public - only published)
exports.getPublicContent = async (req, res) => {
  try {
    const { language } = req.params;
    
    const content = await NewsEventsContent.find({
      language,
      isPublished: true
    }).select('-lastModifiedBy -__v');

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

// Get specific section for a language (public - only if published)
exports.getPublicSection = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await NewsEventsContent.findOne({
      language,
      section,
      isPublished: true
    }).select('-lastModifiedBy -__v');

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
exports.getAdminContent = async (req, res) => {
  try {
    const { language } = req.params;
    
    const content = await NewsEventsContent.find({ language })
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

// Get specific section (admin)
exports.getAdminSection = async (req, res) => {
  try {
    const { language, section } = req.params;
    
    const content = await NewsEventsContent.findOne({
      language,
      section
    }).populate('lastModifiedBy', 'name email');

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

// Create or update section
exports.upsertSection = async (req, res) => {
  try {
    const { language, section, content, isPublished } = req.body;

    const updatedContent = await NewsEventsContent.findOneAndUpdate(
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
    const { isPublished } = req.body;

    const content = await NewsEventsContent.findOneAndUpdate(
      { language, section },
      {
        isPublished,
        lastModifiedBy: req.user._id
      },
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
exports.getStatistics = async (req, res) => {
  try {
    const total = await NewsEventsContent.countDocuments();
    const published = await NewsEventsContent.countDocuments({ isPublished: true });
    const draft = await NewsEventsContent.countDocuments({ isPublished: false });

    const byLanguage = await NewsEventsContent.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 } } }
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
