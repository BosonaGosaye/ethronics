const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  title: {
    type: Map,
    of: String,
    required: true
  },
  description: {
    type: Map,
    of: String
  },
  type: {
    type: String,
    enum: ['video', 'photo', 'press', 'podcast'],
    required: true
  },
  category: {
    type: String,
    enum: ['videos', 'photos', 'press', 'podcasts'],
    required: true
  },
  mediaUrl: {
    type: String,
    required: function() {
      // Required if mediaUrls is empty
      return !this.mediaUrls || this.mediaUrls.length === 0;
    }
  },
  mediaUrls: [{
    type: String
  }],
  thumbnailUrl: {
    type: String
  },
  duration: {
    type: String // For videos and podcasts (e.g., "5:32", "45:20")
  },
  views: {
    type: Number,
    default: 0
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  metadata: {
    fileSize: String,
    format: String,
    resolution: String
  }
}, {
  timestamps: true
});

// Indexes
mediaItemSchema.index({ type: 1, published: 1 });
mediaItemSchema.index({ category: 1, published: 1 });
mediaItemSchema.index({ publishDate: -1 });
mediaItemSchema.index({ featured: 1, published: 1 });

module.exports = mongoose.model('MediaItem', mediaItemSchema);
