const mongoose = require('mongoose');

const registerContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'objective', 'highlights', 'form', 'faq', 'gallery', 'nextSteps', 'cta']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Unique index for language and section combination
registerContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('RegisterContent', registerContentSchema);
