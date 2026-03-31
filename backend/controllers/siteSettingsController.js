const SiteSettings = require('../models/SiteSettings');

// Get site settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch site settings'
    });
  }
};

// Update site settings
exports.updateSettings = async (req, res) => {
  try {
    const { logo, siteName } = req.body;
    
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
    }
    
    if (logo !== undefined) settings.logo = logo;
    if (siteName !== undefined) settings.siteName = siteName;
    settings.updatedAt = Date.now();
    
    await settings.save();
    
    res.json({
      success: true,
      data: settings,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update site settings'
    });
  }
};
