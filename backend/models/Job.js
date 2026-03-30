const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  // Company Information
  company: {
    type: String,
    required: true,
    trim: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  companyWebsite: {
    type: String,
    default: ''
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+', ''],
    default: ''
  },
  companyIndustry: {
    type: String,
    default: ''
  },
  
  // Job Basic Info
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance']
  },
  workMode: {
    type: String,
    enum: ['remote', 'hybrid', 'onsite'],
    default: 'onsite'
  },
  category: {
    type: String,
    required: false
  },
  
  // Experience & Education
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
    default: 'mid'
  },
  yearsOfExperience: {
    type: String,
    default: ''
  },
  educationLevel: {
    type: String,
    enum: ['high-school', 'diploma', 'bachelor', 'master', 'phd', 'any'],
    default: 'bachelor'
  },
  
  // Compensation
  salary: {
    type: String,
    required: true
  },
  salaryMin: {
    type: Number,
    default: 0
  },
  salaryMax: {
    type: Number,
    default: 0
  },
  salaryCurrency: {
    type: String,
    enum: ['USD', 'ETB', 'EUR', 'GBP'],
    default: 'USD'
  },
  salaryPeriod: {
    type: String,
    enum: ['hourly', 'monthly', 'yearly'],
    default: 'yearly'
  },
  
  // Job Details
  numberOfPositions: {
    type: Number,
    default: 1,
    min: 1
  },
  startDate: {
    type: Date,
    default: null
  },
  duration: {
    type: String,
    default: ''
  },
  
  // Benefits & Perks
  travelRequired: {
    type: Boolean,
    default: false
  },
  relocationAssistance: {
    type: Boolean,
    default: false
  },
  visaSponsorship: {
    type: Boolean,
    default: false
  },
  
  // Contact Information
  contactEmail: {
    type: String,
    default: ''
  },
  contactPhone: {
    type: String,
    default: ''
  },
  contactPerson: {
    type: String,
    default: ''
  },
  
  // Status & Metadata
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  deadline: {
    type: Date,
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  applicantCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  
  // Multi-language content
  translations: {
    en: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      requirements: [{ type: String }],
      responsibilities: [{ type: String }],
      qualifications: [{ type: String }],
      benefits: [{ type: String }],
      niceToHave: [{ type: String }],
      tags: [{ type: String }],
      companyDescription: { type: String, default: '' },
      applicationProcess: { type: String, default: '' },
      interviewProcess: { type: String, default: '' },
      bonusInfo: { type: String, default: '' }
    },
    am: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      requirements: [{ type: String }],
      responsibilities: [{ type: String }],
      qualifications: [{ type: String }],
      benefits: [{ type: String }],
      niceToHave: [{ type: String }],
      tags: [{ type: String }],
      companyDescription: { type: String, default: '' },
      applicationProcess: { type: String, default: '' },
      interviewProcess: { type: String, default: '' },
      bonusInfo: { type: String, default: '' }
    },
    om: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      requirements: [{ type: String }],
      responsibilities: [{ type: String }],
      qualifications: [{ type: String }],
      benefits: [{ type: String }],
      niceToHave: [{ type: String }],
      tags: [{ type: String }],
      companyDescription: { type: String, default: '' },
      applicationProcess: { type: String, default: '' },
      interviewProcess: { type: String, default: '' },
      bonusInfo: { type: String, default: '' }
    }
  }
}, {
  timestamps: true
});

// Index for searching
jobSchema.index({ 'translations.en.title': 'text', 'translations.en.description': 'text', company: 'text' });
jobSchema.index({ status: 1, deadline: 1 });
jobSchema.index({ category: 1, type: 1 });

module.exports = mongoose.model('Job', jobSchema);
