const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  // Student Information
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentAge: {
    type: Number,
    required: true,
    min: 6,
    max: 25
  },
  studentGender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  grade: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true,
    trim: true
  },
  studentEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  experience: {
    type: String,
    required: true,
    enum: ['noExperience', 'beginner', 'intermediate']
  },
  session: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon']
  },
  
  // Guardian Information
  guardianName: {
    type: String,
    required: true,
    trim: true
  },
  guardianEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  emergency: {
    type: String,
    required: true,
    trim: true
  },
  
  // Status and Tracking
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'waitlist'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid'
  },
  examStatus: {
    type: String,
    enum: ['not_taken', 'scheduled', 'passed', 'failed'],
    default: 'not_taken'
  },
  examScore: {
    type: Number,
    min: 0,
    max: 100
  },
  
  // Communication
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  emailsSent: [{
    subject: String,
    body: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Metadata
  language: {
    type: String,
    enum: ['en', 'am', 'om'],
    default: 'en'
  },
  source: {
    type: String,
    default: 'website'
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Indexes
registrationSchema.index({ studentEmail: 1 });
registrationSchema.index({ guardianEmail: 1 });
registrationSchema.index({ status: 1 });
registrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Registration', registrationSchema);
