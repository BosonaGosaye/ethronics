const mongoose = require('mongoose');

const libraryResourceSchema = new mongoose.Schema({
  // Multilingual fields - translated for each language
  title: {
    en: { type: String, required: true, trim: true },
    am: { type: String, required: true, trim: true },
    om: { type: String, required: true, trim: true }
  },
  description: {
    en: { type: String, required: true },
    am: { type: String, required: true },
    om: { type: String, required: true }
  },
  abstract: {
    en: { type: String, default: '' },
    am: { type: String, default: '' },
    om: { type: String, default: '' }
  },
  
  // Common fields - same for all languages
  tableOfContents: [{
    chapter: { type: String },
    page: { type: Number }
  }],
  author: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['book', 'paper', 'journal', 'video', 'dataset', 'software', 'thesis', 'manual', 'guide', 'other']
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'power', 'automation', 'research', 'mathematics', 'programming', 'business', 'education', 'innovation', 'engineering', 'science', 'other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // File information - uploaded once for all languages
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'doc', 'docx', 'epub', 'txt', 'video', 'audio', 'other'],
    default: 'pdf'
  },
  fileSize: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  
  // Publication details
  publisher: {
    type: String,
    default: ''
  },
  publishedDate: {
    type: Date
  },
  isbn: {
    type: String,
    default: ''
  },
  doi: {
    type: String,
    default: ''
  },
  pages: {
    type: Number,
    default: 0
  },
  edition: {
    type: String,
    default: ''
  },
  
  // Access control
  accessType: {
    type: String,
    enum: ['free', 'premium', 'openSource', 'restricted'],
    default: 'free'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  allowOnlineReading: {
    type: Boolean,
    default: true
  },
  
  // Statistics
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  
  // Additional metadata
  keywords: [{
    type: String,
    trim: true
  }],
  relatedResources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LibraryResource'
  }],
  
  // Admin tracking
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for search and filtering
libraryResourceSchema.index({ 
  'title.en': 'text', 
  'title.am': 'text', 
  'title.om': 'text',
  'description.en': 'text', 
  'description.am': 'text', 
  'description.om': 'text',
  tags: 'text', 
  keywords: 'text' 
});
libraryResourceSchema.index({ type: 1, category: 1 });
libraryResourceSchema.index({ isPublished: 1, isFeatured: 1 });
libraryResourceSchema.index({ createdAt: -1 });

module.exports = mongoose.model('LibraryResource', libraryResourceSchema);
