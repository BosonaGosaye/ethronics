const mongoose = require('mongoose');

const libraryContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['quickAccess', 'hero', 'search', 'categories', 'resources', 'stats', 'digitalServices', 'modal', 'sampleResources']
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

// Create compound index for language and section
libraryContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('LibraryContent', libraryContentSchema);
