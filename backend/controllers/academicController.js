const AcademicContent = require('../models/AcademicContent');

// Get academic content (all languages or specific language)
exports.getAcademicContent = async (req, res) => {
  try {
    const { language } = req.query; // Optional language parameter
    
    let content = await AcademicContent.findOne();
    
    if (!content) {
      // Return default structure if no content exists
      const defaultStructure = {
        hero: { slides: [], buttons: {} },
        whyChooseUs: { features: [] },
        vision: {},
        programs: { levels: [] },
        admissions: { steps: [] },
        faculty: {},
        cta: { buttons: {} }
      };
      
      content = {
        en: defaultStructure,
        am: defaultStructure,
        om: defaultStructure,
        publishStatus: { en: true, am: true, om: true }
      };
    }
    
    // If language is specified, return only that language
    if (language && ['en', 'am', 'om'].includes(language)) {
      return res.json(content[language] || {});
    }
    
    // Return all languages with publish status
    res.json({
      en: content.en || {},
      am: content.am || {},
      om: content.om || {},
      publishStatus: content.publishStatus || { en: true, am: true, om: true }
    });
  } catch (error) {
    console.error('Error fetching academic content:', error);
    res.status(500).json({ message: 'Error fetching academic content', error: error.message });
  }
};

// Update academic content (all languages or specific language)
exports.updateAcademicContent = async (req, res) => {
  try {
    const { language } = req.query; // Optional language parameter
    const updates = req.body;
    
    let content = await AcademicContent.findOne();
    
    if (!content) {
      // Create new content if none exists
      content = new AcademicContent();
    }
    
    // If language is specified, update only that language
    if (language && ['en', 'am', 'om'].includes(language)) {
      content[language] = updates;
    } else {
      // Update all languages
      if (updates.en) content.en = updates.en;
      if (updates.am) content.am = updates.am;
      if (updates.om) content.om = updates.om;
    }
    
    await content.save();
    
    res.json({ 
      message: 'Academic content updated successfully', 
      content: language ? content[language] : {
        en: content.en,
        am: content.am,
        om: content.om
      }
    });
  } catch (error) {
    console.error('Error updating academic content:', error);
    res.status(500).json({ message: 'Error updating academic content', error: error.message });
  }
};

// Toggle publish status for a language
exports.togglePublish = async (req, res) => {
  try {
    const { language } = req.query;
    
    if (!language || !['en', 'am', 'om'].includes(language)) {
      return res.status(400).json({ message: 'Valid language parameter (en, am, om) is required' });
    }
    
    let content = await AcademicContent.findOne();
    
    if (!content) {
      return res.status(404).json({ message: 'Academic content not found' });
    }
    
    // Initialize publishStatus if it doesn't exist
    if (!content.publishStatus) {
      content.publishStatus = { en: true, am: true, om: true };
    }
    
    // Toggle the publish status
    content.publishStatus[language] = !content.publishStatus[language];
    
    await content.save();
    
    res.json({ 
      message: `Academic content ${content.publishStatus[language] ? 'published' : 'unpublished'} for ${language}`,
      publishStatus: content.publishStatus
    });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({ message: 'Error toggling publish status', error: error.message });
  }
};

// Update specific section for a specific language
exports.updateSection = async (req, res) => {
  try {
    const { section } = req.params;
    const { language } = req.query; // Required language parameter
    const updates = req.body;
    
    if (!language || !['en', 'am', 'om'].includes(language)) {
      return res.status(400).json({ message: 'Valid language parameter (en, am, om) is required' });
    }
    
    let content = await AcademicContent.findOne();
    
    if (!content) {
      content = new AcademicContent();
    }
    
    // Initialize language object if it doesn't exist
    if (!content[language]) {
      content[language] = {};
    }
    
    content[language][section] = updates;
    await content.save();
    
    res.json({ 
      message: `${section} section updated successfully for ${language}`, 
      content: content[language]
    });
  } catch (error) {
    console.error(`Error updating ${req.params.section} section:`, error);
    res.status(500).json({ message: 'Error updating section', error: error.message });
  }
};
