const ActivityLog = require('../models/ActivityLog');

// Helper function to log activity
const logActivity = async ({
  userId,
  action,
  resource,
  resourceId = null,
  details = {},
  ipAddress = null,
  userAgent = null,
  status = 'success',
  errorMessage = null
}) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      resource,
      resourceId,
      details,
      ipAddress,
      userAgent,
      status,
      errorMessage
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Middleware to automatically log activities
const activityLogger = (action, resource) => {
  return async (req, res, next) => {
    // Store original send function
    const originalSend = res.send;
    
    // Override send function to log after response
    res.send = function(data) {
      // Restore original send
      res.send = originalSend;
      
      // Log activity
      const status = res.statusCode >= 200 && res.statusCode < 300 ? 'success' : 'failure';
      
      logActivity({
        userId: req.user?._id,
        action,
        resource,
        resourceId: req.params.id || req.body._id || null,
        details: {
          method: req.method,
          path: req.path,
          body: req.body,
          query: req.query
        },
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
        status,
        errorMessage: status === 'failure' ? data : null
      }).catch(err => console.error('Activity logging error:', err));
      
      // Send response
      return originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = { logActivity, activityLogger };
