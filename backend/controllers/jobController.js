// @ts-nocheck
const Job = require('../models/Job');
const { logActivity } = require('../middleware/activityLogger');

// Get all active jobs (public) - only show active jobs
exports.getJobs = async (req, res) => {
  try {
    const { category, type, location, search, sort = '-postedDate' } = req.query;
    
    // IMPORTANT: Only show active jobs to public
    const query = { status: 'active', deadline: { $gte: new Date() } };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (location && location !== 'all') {
      query.location = new RegExp(location, 'i');
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const jobs = await Job.find(query).sort(sort);
    
    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single job (public)
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all jobs for admin
exports.getAllJobs = async (req, res) => {
  try {
    const { status, category } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const jobs = await Job.find(query).sort('-createdAt');
    
    // Log activity
    if (req.user) {
      await logActivity({
        userId: req.user._id,
        action: 'content_view',
        resource: 'Job',
        details: { status, category, count: jobs.length },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    
    // Log activity
    if (req.user) {
      await logActivity({
        userId: req.user._id,
        action: 'job_create',
        resource: 'Job',
        resourceId: job._id,
        details: { 
          company: job.company, 
          title: job.translations?.en?.title || 'N/A',
          status: job.status 
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const oldJob = await Job.findById(req.params.id);
    const statusChanged = oldJob && oldJob.status !== req.body.status;
    
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Log activity
    if (req.user) {
      let action = 'job_update';
      if (statusChanged) {
        if (req.body.status === 'active') action = 'job_approve';
        else if (req.body.status === 'closed') action = 'job_reject';
      }
      
      await logActivity({
        userId: req.user._id,
        action,
        resource: 'Job',
        resourceId: job._id,
        details: { 
          company: job.company, 
          title: job.translations?.en?.title || 'N/A',
          oldStatus: oldJob?.status,
          newStatus: job.status 
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    const jobDetails = {
      company: job.company,
      title: job.translations?.en?.title || 'N/A'
    };
    
    await job.deleteOne();
    
    // Log activity
    if (req.user) {
      await logActivity({
        userId: req.user._id,
        action: 'job_delete',
        resource: 'Job',
        resourceId: req.params.id,
        details: jobDetails,
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get job statistics
exports.getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const categoryStats = await Job.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalApplications = await Job.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$applicantCount' }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        byStatus: stats,
        byCategory: categoryStats,
        totalApplications: totalApplications[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Public job submission (no auth required)
exports.publicSubmitJob = async (req, res) => {
  try {
    // Force status to draft for public submissions
    const jobData = {
      ...req.body,
      status: 'draft',
      featured: false,
      postedDate: new Date()
    };
    
    const job = await Job.create(jobData);
    
    // TODO: Send email notification to admin
    console.log('New job submission pending approval:', job._id);
    
    res.status(201).json({
      success: true,
      message: 'Job submitted successfully. It will be reviewed by our team within 24-48 hours.',
      data: job
    });
  } catch (error) {
    console.error('Public job submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit job',
      error: error.message
    });
  }
};

// Approve draft job (admin only)
exports.approveJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // TODO: Send email notification to job poster
    console.log('Job approved:', job._id);
    
    res.json({
      success: true,
      message: 'Job approved and published successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Reject draft job (admin only)
exports.rejectJob = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'closed',
        rejectionReason: reason || 'Does not meet our guidelines'
      },
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // TODO: Send email notification to job poster with reason
    console.log('Job rejected:', job._id, 'Reason:', reason);
    
    res.json({
      success: true,
      message: 'Job rejected',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
