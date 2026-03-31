const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  logo: {
    type: String,
    default: ''
  },
  siteName: {
    type: String,
    default: 'Ethronics'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure only one settings document exists
siteSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
