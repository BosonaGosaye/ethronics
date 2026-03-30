const AboutContent = require('../models/AboutContent');

// @desc    Get all published sections for a language
// @route   GET /api/about/:language
// @access  Public
exports.getPublishedContent = async (req, res, next) => {
  try {
    const { language } = req.params;

    if (!['en', 'am', 'om'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Must be en, am, or om'
      });
    }

    const content = await AboutContent.find({
      language,
      isPublished: true
    }).select('-__v -updatedBy');

    // Transform array to object with sections as keys
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
// @route   GET /api/about/:language/:section
// @access  Public
exports.getSection = async (req, res, next) => {
  try {
    const { language, section } = req.params;

    const content = await AboutContent.findOne({
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
// @route   GET /api/about/admin/:language
// @access  Private
exports.getAllContent = async (req, res, next) => {
  try {
    const { language } = req.params;

    const content = await AboutContent.find({ language })
      .populate('updatedBy', 'name email')
      .sort({ section: 1 });

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
// @route   POST /api/about
// @access  Private
exports.upsertContent = async (req, res, next) => {
  try {
    const { language, section, content } = req.body;

    if (!language || !section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Language, section, and content are required'
      });
    }

    if (!['en', 'am', 'om'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language'
      });
    }

    let aboutContent = await AboutContent.findOne({ language, section });

    if (aboutContent) {
      aboutContent.content = content;
      aboutContent.updatedBy = req.user.id;
      await aboutContent.save();
    } else {
      aboutContent = await AboutContent.create({
        language,
        section,
        content,
        updatedBy: req.user.id,
        isPublished: false
      });
    }

    res.json({
      success: true,
      message: aboutContent.isNew ? 'Content created' : 'Content updated',
      data: aboutContent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle publish status
// @route   PUT /api/about/:id/publish
// @access  Private
exports.togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const content = await AboutContent.findById(id);

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
// @route   DELETE /api/about/:id
// @access  Private
exports.deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const content = await AboutContent.findById(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    await content.deleteOne();

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
