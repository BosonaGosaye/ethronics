const mongoose = require('mongoose');

const newsEventItemSchema = new mongoose.Schema({
  // Shared fields (language-independent)
  slug: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['news', 'events', 'awards', 'community']
  },
  category: {
    type: String,
    required: true,
    enum: ['technology', 'research', 'education', 'partnerships', 'innovation', 'sustainability', 'community', 'awards']
  },
  featuredImage: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  tags: [{
    type: String
  }],
  
  // Event-specific fields
  eventDate: {
    type: Date
  },
  eventEndDate: {
    type: Date
  },
  location: {
    type: String,
    default: ''
  },
  registrationLink: {
    type: String,
    default: ''
  },
  maxAttendees: {
    type: Number
  },
  
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  
  // Multi-language content
  translations: {
    en: {
      title: { type: String, required: true },
      excerpt: { type: String, required: true },
      content: { type: String, required: true }
    },
    am: {
      title: { type: String, default: '' },
      excerpt: { type: String, default: '' },
      content: { type: String, default: '' }
    },
    om: {
      title: { type: String, default: '' },
      excerpt: { type: String, default: '' },
      content: { type: String, default: '' }
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
newsEventItemSchema.index({ slug: 1 }, { unique: true });
newsEventItemSchema.index({ type: 1 });
newsEventItemSchema.index({ category: 1 });
newsEventItemSchema.index({ status: 1 });
newsEventItemSchema.index({ publishDate: -1 });
newsEventItemSchema.index({ eventDate: 1 });
newsEventItemSchema.index({ isFeatured: 1 });
newsEventItemSchema.index({ 'translations.en.title': 'text', 'translations.en.excerpt': 'text', 'translations.en.content': 'text' });

module.exports = mongoose.model('NewsEventItem', newsEventItemSchema);
