const express = require('express');
const router = express.Router();
const libraryUserController = require('../controllers/libraryUserController');
const { protectLibraryUser } = require('../middleware/libraryAuth');

// Public routes
router.post('/register', libraryUserController.register);
router.post('/login', libraryUserController.login);

// Protected routes
router.get('/profile', protectLibraryUser, libraryUserController.getProfile);
router.put('/profile', protectLibraryUser, libraryUserController.updateProfile);
router.get('/dashboard', protectLibraryUser, libraryUserController.getDashboard);
router.get('/downloads', protectLibraryUser, libraryUserController.getDownloads);
router.get('/saved', protectLibraryUser, libraryUserController.getSaved);
router.post('/save/:resourceId', protectLibraryUser, libraryUserController.saveResource);
router.delete('/save/:resourceId', protectLibraryUser, libraryUserController.unsaveResource);
router.get('/history', protectLibraryUser, libraryUserController.getHistory);
router.post('/history/:resourceId', protectLibraryUser, libraryUserController.addToHistory);

module.exports = router;
