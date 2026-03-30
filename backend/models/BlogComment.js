const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true,
    index: true
  },
  author: {
    name: {
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
    avatar: {
      type: String,
      default: ''
    }
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  replies: [{
    author: {
      name: String,
      email: String,
      avatar: String
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes
blogCommentSchema.index({ postId: 1, isApproved: 1 });
blogCommentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('BlogComment', blogCommentSchema);
