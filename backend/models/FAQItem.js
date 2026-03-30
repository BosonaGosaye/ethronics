const mongoose = require('mongoose');

const faqItemSchema = new mongoose.Schema({
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  translations: {
    en: {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      tags: [String]
    },
    am: {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      tags: [String]
    },
    om: {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      tags: [String]
    }
  },
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for searching and filtering
faqItemSchema.index({ order: 1 });
faqItemSchema.index({ isPublished: 1 });
faqItemSchema.index({ 'translations.en.question': 'text', 'translations.en.answer': 'text' });

module.exports = mongoose.model('FAQItem', faqItemSchema);
