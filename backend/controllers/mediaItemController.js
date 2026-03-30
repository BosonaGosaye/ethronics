const MediaItem = require('../models/MediaItem');
const cloudinary = require('../config/cloudinary');

// Get all media items (admin)
exports.getAllMediaItems = async (req, res) => {
  try {
    const { 
      type, 
      category, 
      search, 
      published, 
      featured,
      page = 1, 
      limit = 20 
    } = req.query;

    const query = {};
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (published !== undefined) query.published = published === 'true';
    if (featured !== undefined) query.featured = featured === 'true';
    
    if (search) {
      query.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.am': { $regex: search, $options: 'i' } },
        { 'title.om': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } }
      ];
    }

    const items = await MediaItem.find(query)
      .sort({ publishDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await MediaItem.countDocuments(query);

    res.json({
      success: true,
      data: items,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Error fetching media items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media items',
      error: error.message
    });
  }
};

// Get public media items
exports.getPublicMediaItems = async (req, res) => {
  try {
    const { 
      type, 
      category, 
      language = 'en',
      page = 1, 
      limit = 12 
    } = req.query;

    const query = { published: true };
    
    if (type) query.type = type;
    if (category) query.category = category;

    const items = await MediaItem.find(query)
      .sort({ publishDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Transform for frontend
    const transformedItems = items.map(item => {
      // Handle Map fields when using .lean()
      const getMapValue = (mapField, lang) => {
        if (!mapField) return '';
        // If it's already a plain object (from .lean())
        if (typeof mapField === 'object' && !mapField.get) {
          return mapField[lang] || mapField['en'] || '';
        }
        // If it's still a Map
        return mapField.get ? (mapField.get(lang) || mapField.get('en')) : '';
      };

      return {
        id: item._id,
        title: getMapValue(item.title, language),
        description: getMapValue(item.description, language),
        type: item.type,
        category: item.category,
        mediaUrl: item.mediaUrl,
        mediaUrls: item.mediaUrls || [],
        thumbnailUrl: item.thumbnailUrl,
        duration: item.duration,
        views: item.views,
        date: item.publishDate,
        tags: item.tags,
        metadata: item.metadata
      };
    });

    const count = await MediaItem.countDocuments(query);

    res.json({
      success: true,
      data: transformedItems,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Error fetching public media items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media items',
      error: error.message
    });
  }
};

// Get single media item
exports.getMediaItem = async (req, res) => {
  try {
    const item = await MediaItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching media item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media item',
      error: error.message
    });
  }
};

// Create media item
exports.createMediaItem = async (req, res) => {
  try {
    const item = new MediaItem(req.body);
    await item.save();

    res.status(201).json({
      success: true,
      message: 'Media item created successfully',
      data: item
    });
  } catch (error) {
    console.error('Error creating media item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create media item',
      error: error.message
    });
  }
};

// Update media item
exports.updateMediaItem = async (req, res) => {
  try {
    const item = await MediaItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    res.json({
      success: true,
      message: 'Media item updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Error updating media item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update media item',
      error: error.message
    });
  }
};

// Delete media item
exports.deleteMediaItem = async (req, res) => {
  try {
    const item = await MediaItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    // Delete from Cloudinary if it's a Cloudinary URL
    if (item.mediaUrl && item.mediaUrl.includes('cloudinary.com')) {
      try {
        const publicId = item.mediaUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
      }
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: 'Media item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting media item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media item',
      error: error.message
    });
  }
};

// Get media stats
exports.getMediaStats = async (req, res) => {
  try {
    const stats = await MediaItem.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          published: {
            $sum: { $cond: ['$published', 1, 0] }
          }
        }
      }
    ]);

    const totalViews = await MediaItem.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    res.json({
      success: true,
      data: {
        byType: stats,
        totalViews: totalViews[0]?.total || 0,
        total: await MediaItem.countDocuments()
      }
    });
  } catch (error) {
    console.error('Error fetching media stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message
    });
  }
};

// Increment views
exports.incrementViews = async (req, res) => {
  try {
    const item = await MediaItem.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      });
    }

    res.json({
      success: true,
      data: { views: item.views }
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to increment views',
      error: error.message
    });
  }
};
