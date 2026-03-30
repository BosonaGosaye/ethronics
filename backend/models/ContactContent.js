const mongoose = require('mongoose');

const contactContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'categories', 'form', 'details', 'location']
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
contactContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('ContactContent', contactContentSchema);
