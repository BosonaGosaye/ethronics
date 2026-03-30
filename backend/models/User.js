const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'editor'
  },
  permissions: {
    content: {
      create: { type: Boolean, default: true },
      edit: { type: Boolean, default: true },
      delete: { type: Boolean, default: false },
      publish: { type: Boolean, default: false }
    },
    jobs: {
      create: { type: Boolean, default: true },
      edit: { type: Boolean, default: true },
      delete: { type: Boolean, default: false },
      approve: { type: Boolean, default: false }
    },
    applications: {
      view: { type: Boolean, default: true },
      edit: { type: Boolean, default: true },
      delete: { type: Boolean, default: false },
      export: { type: Boolean, default: false }
    },
    media: {
      upload: { type: Boolean, default: true },
      delete: { type: Boolean, default: false }
    },
    users: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Set default permissions based on role
userSchema.pre('save', function(next) {
  if (this.isModified('role') && !this.isModified('permissions')) {
    if (this.role === 'admin') {
      this.permissions = {
        content: { create: true, edit: true, delete: true, publish: true },
        jobs: { create: true, edit: true, delete: true, approve: true },
        applications: { view: true, edit: true, delete: true, export: true },
        media: { upload: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true }
      };
    } else if (this.role === 'editor') {
      this.permissions = {
        content: { create: true, edit: true, delete: false, publish: false },
        jobs: { create: true, edit: true, delete: false, approve: false },
        applications: { view: true, edit: true, delete: false, export: false },
        media: { upload: true, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      };
    } else if (this.role === 'viewer') {
      this.permissions = {
        content: { create: false, edit: false, delete: false, publish: false },
        jobs: { create: false, edit: false, delete: false, approve: false },
        applications: { view: true, edit: false, delete: false, export: false },
        media: { upload: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      };
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
