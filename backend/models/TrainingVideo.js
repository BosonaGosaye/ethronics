const mongoose = require('mongoose');

const trainingVideoSchema = new mongoose.Schema({
  // Media (shared across all languages)
  thumbnail: {
    type: String,
    required: true
  },
  embedUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  
  // Multi-language content
  title: {
    en: { type: String, required: true },
    am: { type: String, required: true },
    om: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    am: { type: String, required: true },
    om: { type: String, required: true }
  },
  
  // Metadata
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TrainingVideo', trainingVideoSchema);
