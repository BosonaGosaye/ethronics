const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const libraryUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  institution: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['student', 'researcher', 'professional', 'other'],
    default: 'other'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  downloads: [{
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LibraryResource'
    },
    downloadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  savedResources: [{
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LibraryResource'
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  readingHistory: [{
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LibraryResource'
    },
    viewedAt: {
      type: Date,
      default: Date.now
    },
    lastPosition: {
      type: Number,
      default: 0
    }
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
libraryUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
libraryUserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add download to history
libraryUserSchema.methods.addDownload = function(resourceId) {
  const existingDownload = this.downloads.find(
    d => d.resource.toString() === resourceId.toString()
  );
  
  if (!existingDownload) {
    this.downloads.push({ resource: resourceId });
  } else {
    existingDownload.downloadedAt = Date.now();
  }
  
  return this.save();
};

// Save/bookmark resource
libraryUserSchema.methods.saveResource = function(resourceId) {
  const alreadySaved = this.savedResources.find(
    s => s.resource.toString() === resourceId.toString()
  );
  
  if (!alreadySaved) {
    this.savedResources.push({ resource: resourceId });
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Remove saved resource
libraryUserSchema.methods.unsaveResource = function(resourceId) {
  this.savedResources = this.savedResources.filter(
    s => s.resource.toString() !== resourceId.toString()
  );
  return this.save();
};

// Add to reading history
libraryUserSchema.methods.addToHistory = function(resourceId, position = 0) {
  const existingHistory = this.readingHistory.find(
    h => h.resource.toString() === resourceId.toString()
  );
  
  if (!existingHistory) {
    this.readingHistory.push({ resource: resourceId, lastPosition: position });
  } else {
    existingHistory.viewedAt = Date.now();
    existingHistory.lastPosition = position;
  }
  
  return this.save();
};

module.exports = mongoose.model('LibraryUser', libraryUserSchema);
