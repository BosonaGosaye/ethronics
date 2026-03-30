const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      // Auth actions
      'login', 'logout', 'password_change',
      // Content actions
      'content_view', 'content_create', 'content_update', 'content_delete', 'content_publish', 'content_unpublish',
      // Job actions
      'job_create', 'job_update', 'job_delete', 'job_approve', 'job_reject',
      // Application actions
      'application_view', 'application_update', 'application_delete', 'application_export',
      // User management
      'user_create', 'user_update', 'user_delete', 'user_activate', 'user_deactivate',
      // Media actions
      'media_upload', 'media_delete',
      // Other
      'other'
    ]
  },
  resource: {
    type: String,
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  status: {
    type: String,
    enum: ['success', 'failure', 'warning'],
    default: 'success'
  },
  errorMessage: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });
activityLogSchema.index({ resource: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
