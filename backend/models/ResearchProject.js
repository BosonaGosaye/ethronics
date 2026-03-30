const mongoose = require('mongoose');

const researchProjectSchema = new mongoose.Schema({
  // Multi-language support
  translations: {
    en: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      objectives: [String],
      methodology: String,
      expectedOutcomes: [String],
      publications: [String],
      funding: String,
      collaborators: [String]
    },
    am: {
      title: String,
      description: String,
      objectives: [String],
      methodology: String,
      expectedOutcomes: [String],
      publications: [String],
      funding: String,
      collaborators: [String]
    },
    om: {
      title: String,
      description: String,
      objectives: [String],
      methodology: String,
      expectedOutcomes: [String],
      publications: [String],
      funding: String,
      collaborators: [String]
    }
  },
  
  // Project metadata
  category: {
    type: String,
    required: true,
    enum: [
      'Robotics & AI',
      'AI & Machine Learning',
      'Quantum Computing & Security',
      'Industrial IoT & Automation',
      'Blockchain & Distributed Systems',
      'Healthcare AI'
    ]
  },
  
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Research Phase', 'Pilot Phase', 'Development', 'Completed', 'On Hold'],
    default: 'Active'
  },
  
  // Team information
  teamMembers: [{
    name: String,
    role: String,
    image: String
  }],
  
  // Images
  images: [String],
  featuredImage: String,
  
  // Dates
  startDate: Date,
  endDate: Date,
  
  // Visibility
  isPublished: {
    type: Boolean,
    default: false
  },
  
  // Order for display
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
researchProjectSchema.index({ category: 1, status: 1, isPublished: 1 });
researchProjectSchema.index({ displayOrder: 1 });

module.exports = mongoose.model('ResearchProject', researchProjectSchema);
