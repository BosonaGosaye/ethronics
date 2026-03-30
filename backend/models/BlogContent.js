const mongoose = require('mongoose');

const blogContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'filter', 'featured', 'blogGrid', 'sidebar']
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

// Compound index for language and section
blogContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('BlogContent', blogContentSchema);
