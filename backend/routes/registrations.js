const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/submit', registrationController.submitRegistration);

// Admin routes
router.get('/admin', protect, authorize('admin'), registrationController.getAllRegistrations);
router.get('/admin/stats', protect, authorize('admin'), registrationController.getStatistics);
router.get('/admin/:id', protect, authorize('admin'), registrationController.getRegistrationById);
router.put('/admin/:id', protect, authorize('admin'), registrationController.updateRegistration);
router.delete('/admin/:id', protect, authorize('admin'), registrationController.deleteRegistration);
router.post('/admin/:id/note', protect, authorize('admin'), registrationController.addNote);
router.post('/admin/:id/email', protect, authorize('admin'), registrationController.sendEmail);

module.exports = router;
