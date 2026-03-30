const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.get('/', userController.getAllUsers);
router.get('/stats', userController.getUserStats);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/reset-password', userController.resetUserPassword);

// Activity logs routes
router.get('/:userId/activities', userController.getUserActivities);
router.get('/activities/all', userController.getAllActivities);
router.get('/activities/stats', userController.getActivityStats);

module.exports = router;
