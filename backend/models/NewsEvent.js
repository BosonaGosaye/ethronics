const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
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
  language: {
    type: String,
    required: true,
    enum: ['en', 'am', 'om']
  },
  author: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String
  },
  images: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  readTime: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  // Event-specific fields
  eventDate: {
    type: Date
  },
  eventEndDate: {
    type: Date
  },
  location: {
    type: String
  },
  registrationLink: {
    type: String
  },
  maxAttendees: {
    type: Number
  },
  currentAttendees: {
    type: Number,
    default: 0
  },
  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishDate: {
    type: Date
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
newsEventSchema.index({ slug: 1 }, { unique: true });
newsEventSchema.index({ type: 1, status: 1 });
newsEventSchema.index({ category: 1, status: 1 });
newsEventSchema.index({ language: 1, status: 1 });
newsEventSchema.index({ publishDate: -1 });
newsEventSchema.index({ eventDate: 1 });

module.exports = mongoose.model('NewsEvent', newsEventSchema);
