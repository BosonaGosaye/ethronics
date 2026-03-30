const express = require('express');
const router = express.Router();
const studentProjectController = require('../controllers/studentProjectController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/public', studentProjectController.getPublicProjects);

// Admin routes (protected)
router.use(protect);
router.get('/', studentProjectController.getAllProjects);
router.get('/:id', studentProjectController.getProject);
router.post('/', studentProjectController.createProject);
router.put('/:id', studentProjectController.updateProject);
router.delete('/:id', studentProjectController.deleteProject);
router.put('/:id/publish', studentProjectController.togglePublish);

module.exports = router;
