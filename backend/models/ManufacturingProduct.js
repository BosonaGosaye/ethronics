const mongoose = require('mongoose');

const manufacturingProductSchema = new mongoose.Schema({
  // Shared fields (not translated)
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['iot', 'automation', 'smart-city', 'security', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    required: true,
    default: 'In Development'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  expectedLaunch: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  
  // Multi-language translations
  translations: {
    en: {
      name: { type: String, default: '', trim: true },
      description: { type: String, default: '' },
      detailedDescription: { type: String, default: '' },
      features: [{ type: String, trim: true }],
      applications: [{ type: String, trim: true }],
      tags: [{ type: String, trim: true }]
    },
    am: {
      name: { type: String, default: '', trim: true },
      description: { type: String, default: '' },
      detailedDescription: { type: String, default: '' },
      features: [{ type: String, trim: true }],
      applications: [{ type: String, trim: true }],
      tags: [{ type: String, trim: true }]
    },
    om: {
      name: { type: String, default: '', trim: true },
      description: { type: String, default: '' },
      detailedDescription: { type: String, default: '' },
      features: [{ type: String, trim: true }],
      applications: [{ type: String, trim: true }],
      tags: [{ type: String, trim: true }]
    }
  },
  
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ManufacturingProduct'
  }],
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

// Indexes
manufacturingProductSchema.index({ 'translations.en.name': 'text', 'translations.en.description': 'text', 'translations.en.tags': 'text' });
manufacturingProductSchema.index({ category: 1 });
manufacturingProductSchema.index({ isPublished: 1, isFeatured: 1 });
manufacturingProductSchema.index({ order: 1 });

// Validation: Ensure at least English translation has required fields
manufacturingProductSchema.pre('save', function(next) {
  if (!this.translations.en.name || !this.translations.en.description) {
    return next(new Error('English name and description are required'));
  }
  next();
});

module.exports = mongoose.model('ManufacturingProduct', manufacturingProductSchema);
