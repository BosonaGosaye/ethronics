const express = require('express');
const router = express.Router();
const manufacturingProductController = require('../controllers/manufacturingProductController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/public', manufacturingProductController.getPublicProducts);
router.get('/public/:id', manufacturingProductController.getPublicProduct);

// Admin routes (protected)
router.get('/admin/statistics', protect, manufacturingProductController.getStatistics);
router.get('/admin', protect, manufacturingProductController.getAllProducts);
router.get('/admin/:id', protect, manufacturingProductController.getProduct);
router.post('/admin', protect, manufacturingProductController.createProduct);
router.put('/admin/:id', protect, manufacturingProductController.updateProduct);
router.delete('/admin/:id', protect, manufacturingProductController.deleteProduct);
router.patch('/admin/:id/publish', protect, manufacturingProductController.togglePublish);
router.patch('/admin/:id/featured', protect, manufacturingProductController.toggleFeatured);

module.exports = router;
