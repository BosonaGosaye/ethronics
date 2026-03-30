const mongoose = require('mongoose');

const academicSectionSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  section: {
    type: String,
    required: true,
    enum: ['hero', 'whyChooseUs', 'vision', 'programs', 'admissions', 'faculty', 'cta']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound index to ensure unique language-section combinations
academicSectionSchema.index({ language: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('AcademicSection', academicSectionSchema);
