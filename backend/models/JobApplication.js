const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  // Applicant Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  // Resume and Documents
  resume: {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    }
  },
  coverLetter: {
    type: String,
    required: true
  },
  // Additional Information
  linkedIn: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    min: 0
  },
  currentCompany: {
    type: String,
    trim: true
  },
  expectedSalary: {
    type: String,
    trim: true
  },
  availableFrom: {
    type: Date
  },
  // Education Information
  educationLevel: {
    type: String,
    enum: ['high-school', 'diploma', 'bachelor', 'master', 'phd', 'other'],
    required: true
  },
  department: {
    type: String,
    trim: true
  },
  fieldOfStudy: {
    type: String,
    trim: true
  },
  university: {
    type: String,
    trim: true
  },
  graduationYear: {
    type: Number,
    min: 1950,
    max: 2050
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 4.0
  },
  exitExamScore: {
    type: Number,
    min: 0,
    max: 100
  },
  // Additional Education Details
  certifications: [{
    name: String,
    issuer: String,
    year: Number
  }],
  languages: [{
    language: String,
    proficiency: {
      type: String,
      enum: ['basic', 'intermediate', 'advanced', 'native']
    }
  }],
  skills: [String],
  // References
  references: [{
    name: String,
    position: String,
    company: String,
    email: String,
    phone: String
  }],
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  // Admin Notes
  notes: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  // Tracking
  viewedAt: {
    type: Date
  },
  viewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
jobApplicationSchema.index({ job: 1, status: 1 });
jobApplicationSchema.index({ email: 1 });
jobApplicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
