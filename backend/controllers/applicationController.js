// @ts-nocheck
const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');
const { cloudinary } = require('../config/cloudinary');
const nodemailer = require('nodemailer');
const emailTemplates = require('../utils/emailTemplates');

// Helper function to create email transporter with Gmail defaults
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Helper function to send email
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('Email not configured. Skipping email send.');
      return;
    }

    const fromName = process.env.EMAIL_FROM_NAME || 'Ethronics Careers';
    const fromEmail = process.env.EMAIL_USER;
    
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email send error:', error.message);
  }
};

// Submit job application (public)
exports.submitApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer accepting applications'
      });
    }
    
    if (new Date() > job.deadline) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed'
      });
    }
    
    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      job: jobId,
      email: req.body.email
    });
    
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }
    
    // Create application
    const application = await JobApplication.create({
      ...req.body,
      job: jobId
    });
    
    // Increment applicant count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicantCount: 1 }
    });
    
    // Send confirmation email to applicant
    const applicantName = `${req.body.firstName} ${req.body.lastName}`;
    const jobTitle = job.translations?.en?.title || 'the position';
    const confirmationEmail = emailTemplates.applicationConfirmation(
      applicantName,
      jobTitle,
      job.company
    );
    await sendEmail(req.body.email, confirmationEmail.subject, confirmationEmail.html);
    
    // Send notification to admin
    if (process.env.ADMIN_EMAIL) {
      const adminEmail = emailTemplates.newApplicationNotification(
        applicantName,
        jobTitle,
        application._id
      );
      await sendEmail(process.env.ADMIN_EMAIL, adminEmail.subject, adminEmail.html);
    }
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Upload resume to Cloudinary
exports.uploadResume = async (req, res) => {
  try {
    console.log('Upload resume endpoint hit');
    console.log('File received:', req.file ? 'Yes' : 'No');
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    console.log('File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer ? req.file.buffer.length : 0
    });
    
    // Upload buffer to Cloudinary using upload_stream
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'resumes',
          resource_type: 'raw',
          public_id: `resume_${Date.now()}_${Math.random().toString(36).substring(7)}`
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload success:', result.secure_url);
            resolve(result);
          }
        }
      );
      
      // Write buffer to stream
      uploadStream.end(req.file.buffer);
    });
    
    const result = await uploadPromise;
    
    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: req.file.originalname
      }
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to upload resume',
      error: error.message
    });
  }
};

// Get all applications for a job (admin)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.query;
    
    const query = { job: jobId };
    if (status) {
      query.status = status;
    }
    
    const applications = await JobApplication.find(query)
      .populate('job', 'translations company')
      .sort('-createdAt');
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all applications (admin)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, jobId } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (jobId) {
      query.job = jobId;
    }
    
    const applications = await JobApplication.find(query)
      .populate('job', 'translations company location type')
      .populate('viewedBy', 'name')
      .sort('-createdAt');
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single application (admin)
exports.getApplication = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id)
      .populate('job')
      .populate('viewedBy', 'name');
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Mark as viewed
    if (!application.viewedAt) {
      application.viewedAt = new Date();
      application.viewedBy = req.user._id;
      await application.save();
    }
    
    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update application status (admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes, rating } = req.body;
    
    // Get current application to check old status
    const currentApplication = await JobApplication.findById(req.params.id).populate('job', 'translations company');
    if (!currentApplication) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    const oldStatus = currentApplication.status;
    
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status, notes, rating },
      { new: true, runValidators: true }
    ).populate('job', 'translations company');
    
    // Send status update email if status changed
    if (status && status !== oldStatus) {
      const applicantName = `${application.firstName} ${application.lastName}`;
      const jobTitle = application.job?.translations?.en?.title || 'the position';
      const statusEmail = emailTemplates.statusUpdateNotification(
        applicantName,
        jobTitle,
        oldStatus,
        status
      );
      await sendEmail(application.email, statusEmail.subject, statusEmail.html);
    }
    
    res.json({
      success: true,
      message: 'Application updated successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete application (admin)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Delete resume from Cloudinary
    if (application.resume?.publicId) {
      await cloudinary.uploader.destroy(application.resume.publicId, {
        resource_type: 'raw'
      });
    }
    
    await application.deleteOne();
    
    // Decrement applicant count
    await Job.findByIdAndUpdate(application.job, {
      $inc: { applicantCount: -1 }
    });
    
    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get application statistics (admin)
exports.getApplicationStats = async (req, res) => {
  try {
    const stats = await JobApplication.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const recentApplications = await JobApplication.find()
      .populate('job', 'translations company')
      .sort('-createdAt')
      .limit(10);
    
    res.json({
      success: true,
      data: {
        byStatus: stats,
        recent: recentApplications
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


// Export applications to CSV/Excel (admin)
const { generateCSV, generateExcel } = require('../utils/exportApplications');

exports.exportApplications = async (req, res) => {
  try {
    const { format = 'csv', status, jobId, company, startDate, endDate } = req.query;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (jobId) query.job = jobId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    // Get applications
    let applications = await JobApplication.find(query)
      .populate('job', 'translations company')
      .sort({ createdAt: -1 })
      .lean();
    
    // Filter by company if specified (case-insensitive)
    if (company) {
      applications = applications.filter(app => 
        app.job?.company?.toLowerCase().includes(company.toLowerCase())
      );
    }
    
    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No applications found'
      });
    }
    
    // Generate export based on format
    if (format === 'excel' || format === 'xls') {
      const html = generateExcel(applications);
      res.header('Content-Type', 'application/vnd.ms-excel');
      res.header('Content-Disposition', `attachment; filename=applications_${Date.now()}.xls`);
      res.send(html);
    } else {
      const csv = generateCSV(applications);
      res.header('Content-Type', 'text/csv');
      res.header('Content-Disposition', `attachment; filename=applications_${Date.now()}.csv`);
      res.send(csv);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Download resume (admin)
exports.downloadResume = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    if (!application.resume?.url) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Fetch file from Cloudinary and stream to client
    const https = require('https');
    const http = require('http');
    const url = require('url');
    
    const parsedUrl = url.parse(application.resume.url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    // Set response headers for download
    const filename = application.resume.filename || 'resume.pdf';
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    
    // Stream file from Cloudinary to client
    protocol.get(application.resume.url, (fileStream) => {
      fileStream.pipe(res);
    }).on('error', (error) => {
      console.error('Download error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to download file',
        error: error.message
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
