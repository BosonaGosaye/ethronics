const mongoose = require('mongoose');

const faqQuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  question: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'replied', 'converted', 'archived'],
    default: 'pending'
  },
  reply: {
    type: String,
    default: ''
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  repliedAt: {
    type: Date
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  convertedToFAQ: {
    type: Boolean,
    default: false
  },
  faqItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FAQItem'
  },
  language: {
    type: String,
    enum: ['en', 'am', 'om'],
    default: 'en'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for searching and filtering
faqQuestionSchema.index({ status: 1, createdAt: -1 });
faqQuestionSchema.index({ email: 1 });
faqQuestionSchema.index({ isImportant: 1 });

module.exports = mongoose.model('FAQQuestion', faqQuestionSchema);
