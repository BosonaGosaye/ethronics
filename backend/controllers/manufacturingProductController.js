const ManufacturingProduct = require('../models/ManufacturingProduct');

// Get all products (public - only published)
exports.getPublicProducts = async (req, res) => {
  try {
    const { 
      language, 
      category, 
      search,
      featured,
      page = 1, 
      limit = 20,
      sort = 'order'
    } = req.query;

    const query = { isPublished: true };

    if (language) query.language = language;
    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await ManufacturingProduct.find(query)
      .select('-uploadedBy -lastModifiedBy')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ManufacturingProduct.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
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

// Get single product (public)
exports.getPublicProduct = async (req, res) => {
  try {
    const product = await ManufacturingProduct.findOne({
      _id: req.params.id,
      isPublished: true
    }).populate('relatedProducts', 'name description image category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all products (admin)
exports.getAllProducts = async (req, res) => {
  try {
    const { 
      language, 
      category, 
      search, 
      isPublished,
      isFeatured,
      page = 1, 
      limit = 20,
      sort = 'order'
    } = req.query;

    const query = {};

    if (language) query.language = language;
    if (category && category !== 'all') query.category = category;
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await ManufacturingProduct.find(query)
      .populate('uploadedBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ManufacturingProduct.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
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

// Get single product (admin)
exports.getProduct = async (req, res) => {
  try {
    const product = await ManufacturingProduct.findById(req.params.id)
      .populate('uploadedBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .populate('relatedProducts', 'name description image category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      uploadedBy: req.user._id,
      lastModifiedBy: req.user._id
    };

    const product = await ManufacturingProduct.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await ManufacturingProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updateData = {
      ...req.body,
      lastModifiedBy: req.user._id
    };

    const updatedProduct = await ManufacturingProduct.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await ManufacturingProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Toggle publish status
exports.togglePublish = async (req, res) => {
  try {
    const product = await ManufacturingProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isPublished = !product.isPublished;
    product.lastModifiedBy = req.user._id;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isPublished ? 'published' : 'unpublished'} successfully`,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Toggle featured status
exports.toggleFeatured = async (req, res) => {
  try {
    const product = await ManufacturingProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isFeatured = !product.isFeatured;
    product.lastModifiedBy = req.user._id;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const total = await ManufacturingProduct.countDocuments();
    const published = await ManufacturingProduct.countDocuments({ isPublished: true });
    const draft = await ManufacturingProduct.countDocuments({ isPublished: false });
    const featured = await ManufacturingProduct.countDocuments({ isFeatured: true });

    const byCategory = await ManufacturingProduct.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const byLanguage = await ManufacturingProduct.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        published,
        draft,
        featured,
        byCategory,
        byLanguage
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
