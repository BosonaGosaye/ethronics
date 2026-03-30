const mongoose = require('mongoose');

const manufacturingContentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'capabilities', 'products', 'sustainability', 'cta']
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

// Compound index for language and section
manufacturingContentSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('ManufacturingContent', manufacturingContentSchema);
