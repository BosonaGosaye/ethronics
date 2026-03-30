const AcademicSection = require('../models/AcademicSection');

// @desc    Get all published sections for a language
// @route   GET /api/academic/:language
// @access  Public
exports.getPublishedSections = async (req, res) => {
  try {
    const { language } = req.params;

    if (!['en', 'am', 'om'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Must be en, am, or om'
      });
    }

    const sections = await AcademicSection.find({
      language,
      isPublished: true
    }).select('-__v -updatedBy');

    // Transform array to object with sections as keys
    const contentObj = {};
    sections.forEach(item => {
      contentObj[item.section] = item.content;
    });

    res.json({
      success: true,
      language,
      data: contentObj
    });
  } catch (error) {
    console.error('Error fetching published sections:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching academic content',
      error: error.message
    });
  }
};

// @desc    Get all sections (including unpublished) for admin
// @route   GET /api/academic/admin/:language
// @access  Private
exports.getAllSections = async (req, res) => {
  try {
    const { language } = req.params;

    const sections = await AcademicSection.find({ language })
      .populate('updatedBy', 'name email')
      .sort({ section: 1 });

    res.json({
      success: true,
      count: sections.length,
      data: sections
    });
  } catch (error) {
    console.error('Error fetching all sections:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching academic sections',
      error: error.message
    });
  }
};

// @desc    Get specific section
// @route   GET /api/academic/:language/:section
// @access  Public
exports.getSection = async (req, res) => {
  try {
    const { language, section } = req.params;

    const content = await AcademicSection.findOne({
      language,
      section,
      isPublished: true
    }).select('-__v -updatedBy');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Section not found or not published'
      });
    }

    res.json({
      success: true,
      data: content.content
    });
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching section',
      error: error.message
    });
  }
};

// @desc    Create or update section
// @route   POST /api/academic/section
// @access  Private
exports.upsertSection = async (req, res) => {
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

    const validSections = ['hero', 'whyChooseUs', 'vision', 'programs', 'admissions', 'faculty', 'cta'];
    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid section'
      });
    }

    let academicSection = await AcademicSection.findOne({ language, section });

    if (academicSection) {
      academicSection.content = content;
      academicSection.updatedBy = req.user.id;
      await academicSection.save();
    } else {
      academicSection = await AcademicSection.create({
        language,
        section,
        content,
        updatedBy: req.user.id,
        isPublished: false
      });
    }

    res.json({
      success: true,
      message: academicSection.isNew ? 'Section created' : 'Section updated',
      data: academicSection
    });
  } catch (error) {
    console.error('Error upserting section:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving section',
      error: error.message
    });
  }
};

// @desc    Toggle publish status
// @route   PUT /api/academic/section/:id/publish
// @access  Private
exports.togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const section = await AcademicSection.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    section.isPublished = isPublished;
    if (isPublished) {
      section.publishedAt = new Date();
    }
    section.updatedBy = req.user.id;
    
    await section.save();

    res.json({
      success: true,
      message: `Section ${isPublished ? 'published' : 'unpublished'}`,
      data: section
    });
  } catch (error) {
    console.error('Error toggling publish:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating publish status',
      error: error.message
    });
  }
};

// @desc    Delete section
// @route   DELETE /api/academic/section/:id
// @access  Private
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await AcademicSection.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    await section.deleteOne();

    res.json({
      success: true,
      message: 'Section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting section',
      error: error.message
    });
  }
};
