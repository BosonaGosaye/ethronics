const mongoose = require('mongoose');

const researchContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'focus', 'projects', 'whateverYouNeed', 'collaborate', 'cta']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for language and section
researchContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('ResearchContent', researchContentSchema);
