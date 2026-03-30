const mongoose = require('mongoose');

const studentProjectSchema = new mongoose.Schema({
  // Media (shared across all languages)
  image: {
    type: String,
    required: true
  },
  
  // Year
  year: {
    type: String
  },
  
  // Multi-language content
  title: {
    en: { type: String, required: true },
    am: { type: String, required: true },
    om: { type: String, required: true }
  },
  studentName: {
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

module.exports = mongoose.model('StudentProject', studentProjectSchema);
