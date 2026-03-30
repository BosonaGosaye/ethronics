const express = require('express');
const router = express.Router();
const multer = require('multer');
const applicationController = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

// Configure multer for memory storage (better for Cloudinary)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept PDF and DOC/DOCX files only
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.post('/job/:jobId', applicationController.submitApplication);
router.post('/upload-resume', upload.single('resume'), applicationController.uploadResume);

// Protected routes (admin only)
router.get('/admin/all', protect, applicationController.getAllApplications);
router.get('/admin/stats', protect, applicationController.getApplicationStats);
router.get('/admin/export', protect, applicationController.exportApplications);
router.get('/admin/job/:jobId', protect, applicationController.getJobApplications);
router.get('/admin/:id', protect, applicationController.getApplication);
router.get('/admin/:id/download-resume', protect, applicationController.downloadResume);
router.patch('/admin/:id', protect, applicationController.updateApplicationStatus);
router.delete('/admin/:id', protect, applicationController.deleteApplication);

module.exports = router;
