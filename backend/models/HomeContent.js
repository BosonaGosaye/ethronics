const mongoose = require('mongoose');

const homeContentSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ['en', 'am', 'om'],
    required: true
  },
  section: {
    type: String,
    required: true
    // Removed enum to allow custom section names
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound index for language and section
homeContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('HomeContent', homeContentSchema);
