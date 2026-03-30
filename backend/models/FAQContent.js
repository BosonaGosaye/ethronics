const mongoose = require('mongoose');

const faqContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'search', 'categories', 'faqData', 'contact']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create compound index for language and section
faqContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('FAQContent', faqContentSchema);
