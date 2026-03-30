const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  // Shared fields (language-independent)
  slug: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  gallery: [{
    url: { type: String, required: true },
    caption: { type: String, default: '' },
    alt: { type: String, default: '' }
  }],
  author: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, default: '' }
  },
  category: {
    type: String,
    required: true,
    enum: ['all', 'technology', 'ai-ml', 'research', 'education', 'innovation', 'sustainability', 'entrepreneurship', 'partnerships', 'community']
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
  stats: {
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  featured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
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

// Index for faster queries
blogPostSchema.index({ slug: 1 }, { unique: true });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ publishDate: -1 });
blogPostSchema.index({ featured: 1 });
blogPostSchema.index({ isPublished: 1 });
blogPostSchema.index({ 'translations.en.title': 'text', 'translations.en.excerpt': 'text', 'translations.en.content': 'text' });

module.exports = mongoose.model('BlogPost', blogPostSchema);
