const LibraryResource = require('../models/LibraryResource');

// Get all resources (public - only published)
exports.getPublicResources = async (req, res) => {
  try {
    const { 
      type, 
      category, 
      language, 
      search, 
      accessType,
      featured,
      page = 1, 
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    const query = { isPublished: true };

    if (type && type !== 'all') query.type = type;
    if (category && category !== 'all') query.category = category;
    // Note: language parameter is used for frontend display, not for filtering
    // Resources have multilingual fields (title.en, title.am, title.om) not a language field
    if (accessType) query.accessType = accessType;
    if (featured === 'true') query.isFeatured = true;

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const resources = await LibraryResource.find(query)
      .select('-uploadedBy -lastModifiedBy')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await LibraryResource.countDocuments(query);

    res.json({
      success: true,
      data: resources,
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

// Get single resource (public)
exports.getPublicResource = async (req, res) => {
  try {
    const resource = await LibraryResource.findOne({
      _id: req.params.id,
      isPublished: true
    }).populate('relatedResources', 'title author type category coverImage');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Track view
exports.trackView = async (req, res) => {
  try {
    await LibraryResource.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Increment download count (public - no auth required)
exports.incrementDownload = async (req, res) => {
  try {
    const resource = await LibraryResource.findOne({
      _id: req.params.id,
      isPublished: true
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Increment resource download count
    resource.downloads += 1;
    await resource.save();

    res.json({
      success: true,
      message: 'Download count updated',
      fileUrl: resource.fileUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all resources (admin)
exports.getAllResources = async (req, res) => {
  try {
    const { 
      type, 
      category, 
      language, 
      search, 
      isPublished,
      isFeatured,
      page = 1, 
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    const query = {};

    if (type && type !== 'all') query.type = type;
    if (category && category !== 'all') query.category = category;
    if (language) query.language = language;
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const resources = await LibraryResource.find(query)
      .populate('uploadedBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await LibraryResource.countDocuments(query);

    res.json({
      success: true,
      data: resources,
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

// Get single resource (admin)
exports.getResource = async (req, res) => {
  try {
    const resource = await LibraryResource.findById(req.params.id)
      .populate('uploadedBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .populate('relatedResources', 'title author type category coverImage');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create resource
exports.createResource = async (req, res) => {
  try {
    const resourceData = {
      ...req.body,
      uploadedBy: req.user._id,
      lastModifiedBy: req.user._id
    };

    const resource = await LibraryResource.create(resourceData);

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update resource
exports.updateResource = async (req, res) => {
  try {
    const resource = await LibraryResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    const updateData = {
      ...req.body,
      lastModifiedBy: req.user._id
    };

    const updatedResource = await LibraryResource.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: updatedResource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete resource
exports.deleteResource = async (req, res) => {
  try {
    const resource = await LibraryResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await resource.deleteOne();

    res.json({
      success: true,
      message: 'Resource deleted successfully'
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
    const resource = await LibraryResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    resource.isPublished = !resource.isPublished;
    resource.lastModifiedBy = req.user._id;
    await resource.save();

    res.json({
      success: true,
      message: `Resource ${resource.isPublished ? 'published' : 'unpublished'} successfully`,
      data: resource
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
    const resource = await LibraryResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    resource.isFeatured = !resource.isFeatured;
    resource.lastModifiedBy = req.user._id;
    await resource.save();

    res.json({
      success: true,
      message: `Resource ${resource.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: resource
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
    const total = await LibraryResource.countDocuments();
    const published = await LibraryResource.countDocuments({ isPublished: true });
    const draft = await LibraryResource.countDocuments({ isPublished: false });
    const featured = await LibraryResource.countDocuments({ isFeatured: true });

    const byType = await LibraryResource.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const byCategory = await LibraryResource.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const totalViews = await LibraryResource.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const totalDownloads = await LibraryResource.aggregate([
      { $group: { _id: null, total: { $sum: '$downloads' } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        published,
        draft,
        featured,
        byType,
        byCategory,
        totalViews: totalViews[0]?.total || 0,
        totalDownloads: totalDownloads[0]?.total || 0
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
