const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJob);
router.post('/public-submit', jobController.publicSubmitJob); // Public job submission

// Protected routes (admin only)
router.get('/admin/all', protect, jobController.getAllJobs);
router.get('/admin/stats', protect, jobController.getJobStats);
router.post('/', protect, jobController.createJob);
router.put('/:id', protect, jobController.updateJob);
router.put('/:id/approve', protect, jobController.approveJob); // Approve draft job
router.put('/:id/reject', protect, jobController.rejectJob); // Reject draft job
router.delete('/:id', protect, jobController.deleteJob);

module.exports = router;
