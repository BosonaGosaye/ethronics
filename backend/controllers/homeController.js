const HomeContent = require('../models/HomeContent');
const { validateLanguage, validateSection, validateContent } = require('../utils/validators');
const { logActivity } = require('../middleware/activityLogger');

// @desc    Get all published content for a language
// @route   GET /api/home/:language
// @access  Public
exports.getPublishedContent = async (req, res, next) => {
  try {
    const { language } = req.params;

    // Validate language
    const langValidation = validateLanguage(language);
    if (!langValidation.valid) {
      return res.status(400).json({
        success: false,
        message: langValidation.error
      });
    }

    const content = await HomeContent.find({
      language,
      isPublished: true
    }).select('-__v -updatedBy');

    // Transform array to object with sections as keys (matching home.js structure)
    const contentObj = {};
    content.forEach(item => {
      contentObj[item.section] = item.content;
    });

    res.json({
      success: true,
      language,
      data: contentObj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get specific section
// @route   GET /api/home/:language/:section
// @access  Public
exports.getSection = async (req, res, next) => {
  try {
    const { language, section } = req.params;

    // Validate language and section
    const langValidation = validateLanguage(language);
    if (!langValidation.valid) {
      return res.status(400).json({
        success: false,
        message: langValidation.error
      });
    }

    const sectionValidation = validateSection(section);
    if (!sectionValidation.valid) {
      return res.status(400).json({
        success: false,
        message: sectionValidation.error
      });
    }

    const content = await HomeContent.findOne({
      language,
      section,
      isPublished: true
    }).select('-__v -updatedBy');

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
    next(error);
  }
};

// @desc    Get all content (including unpublished)
// @route   GET /api/home/admin/:language
// @access  Private
exports.getAllContent = async (req, res, next) => {
  try {
    const { language } = req.params;

    const content = await HomeContent.find({ language })
      .populate('updatedBy', 'name email')
      .sort({ section: 1 });

    // Log activity
    await logActivity({
      userId: req.user._id,
      action: 'content_view',
      resource: 'HomeContent',
      details: { language, count: content.length },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update content
// @route   POST /api/home
// @access  Private (Admin/Editor)
exports.upsertContent = async (req, res, next) => {
  try {
    const { language, section, content } = req.body;

    // Validation
    if (!language || !section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Language, section, and content are required'
      });
    }

    // Validate language
    const langValidation = validateLanguage(language);
    if (!langValidation.valid) {
      return res.status(400).json({
        success: false,
        message: langValidation.error
      });
    }

    // Validate section
    const sectionValidation = validateSection(section);
    if (!sectionValidation.valid) {
      return res.status(400).json({
        success: false,
        message: sectionValidation.error
      });
    }

    // Validate content structure (optional - can be disabled for flexibility)
    const contentValidation = validateContent(section, content);
    if (!contentValidation.valid) {
      console.warn(`Content validation warning for ${section}:`, contentValidation.error);
      // Don't fail - just warn, to allow flexibility
    }

    // Find existing or create new
    let homeContent = await HomeContent.findOne({ language, section });
    const isNew = !homeContent;

    if (homeContent) {
      // Update existing
      homeContent.content = content;
      homeContent.updatedBy = req.user.id;
      await homeContent.save();
    } else {
      // Create new
      homeContent = await HomeContent.create({
        language,
        section,
        content,
        updatedBy: req.user.id,
        isPublished: false
      });
    }

    // Log activity
    await logActivity({
      userId: req.user._id,
      action: isNew ? 'content_create' : 'content_update',
      resource: 'HomeContent',
      resourceId: homeContent._id,
      details: { language, section },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      success: true,
      message: isNew ? 'Content created' : 'Content updated',
      data: homeContent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle publish status
// @route   PUT /api/home/:id/publish
// @access  Private/Admin
exports.togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const content = await HomeContent.findById(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    content.isPublished = isPublished;
    if (isPublished) {
      content.publishedAt = new Date();
    }
    content.updatedBy = req.user.id;
    
    await content.save();

    // Log activity
    await logActivity({
      userId: req.user._id,
      action: isPublished ? 'content_publish' : 'content_unpublish',
      resource: 'HomeContent',
      resourceId: content._id,
      details: { language: content.language, section: content.section },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      success: true,
      message: `Content ${isPublished ? 'published' : 'unpublished'}`,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete content
// @route   DELETE /api/home/:id
// @access  Private/Admin
exports.deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const content = await HomeContent.findById(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const contentDetails = {
      language: content.language,
      section: content.section
    };

    await content.deleteOne();

    // Log activity
    await logActivity({
      userId: req.user._id,
      action: 'content_delete',
      resource: 'HomeContent',
      resourceId: id,
      details: contentDetails,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get content history
// @route   GET /api/home/history/:language/:section
// @access  Private
exports.getHistory = async (req, res, next) => {
  try {
    const { language, section } = req.params;

    // This would require a separate ContentHistory model
    // For now, return the current content with timestamps
    const content = await HomeContent.findOne({ language, section })
      .populate('updatedBy', 'name email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      data: {
        current: content,
        history: [] // Implement version history if needed
      }
    });
  } catch (error) {
    next(error);
  }
};
