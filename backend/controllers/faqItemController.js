const FAQItem = require('../models/FAQItem');

// Get all FAQ items (admin)
exports.getAllFAQItems = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { 'translations.en.question': { $regex: search, $options: 'i' } },
        { 'translations.en.answer': { $regex: search, $options: 'i' } }
      ];
    }

    const items = await FAQItem.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQ items'
    });
  }
};

// Get published FAQ items (public)
exports.getPublishedFAQItems = async (req, res) => {
  try {
    let query = { isPublished: true };

    const items = await FAQItem.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error fetching published FAQ items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQ items'
    });
  }
};

// Get single FAQ item
exports.getFAQItem = async (req, res) => {
  try {
    const item = await FAQItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching FAQ item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQ item'
    });
  }
};

// Create FAQ item
exports.createFAQItem = async (req, res) => {
  try {
    const item = new FAQItem(req.body);
    await item.save();

    res.status(201).json({
      success: true,
      data: item,
      message: 'FAQ item created successfully'
    });
  } catch (error) {
    console.error('Error creating FAQ item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create FAQ item'
    });
  }
};

// Update FAQ item
exports.updateFAQItem = async (req, res) => {
  try {
    const item = await FAQItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    res.json({
      success: true,
      data: item,
      message: 'FAQ item updated successfully'
    });
  } catch (error) {
    console.error('Error updating FAQ item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FAQ item'
    });
  }
};

// Delete FAQ item
exports.deleteFAQItem = async (req, res) => {
  try {
    const item = await FAQItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    res.json({
      success: true,
      message: 'FAQ item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting FAQ item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete FAQ item'
    });
  }
};

// Toggle publish status
exports.togglePublish = async (req, res) => {
  try {
    const item = await FAQItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    item.isPublished = !item.isPublished;
    await item.save();

    res.json({
      success: true,
      data: item,
      message: `FAQ item ${item.isPublished ? 'published' : 'unpublished'} successfully`
    });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle publish status'
    });
  }
};

// Toggle featured status
exports.toggleFeatured = async (req, res) => {
  try {
    const item = await FAQItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    item.isFeatured = !item.isFeatured;
    await item.save();

    res.json({
      success: true,
      data: item,
      message: `FAQ item ${item.isFeatured ? 'featured' : 'unfeatured'} successfully`
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle featured status'
    });
  }
};

// Increment view count
exports.incrementViews = async (req, res) => {
  try {
    const item = await FAQItem.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to increment views'
    });
  }
};

// Record feedback
exports.recordFeedback = async (req, res) => {
  try {
    const { helpful } = req.body;
    const updateField = helpful ? 'helpful' : 'notHelpful';

    const item = await FAQItem.findByIdAndUpdate(
      req.params.id,
      { $inc: { [updateField]: 1 } },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'FAQ item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error recording feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record feedback'
    });
  }
};

// Get FAQ statistics
exports.getStatistics = async (req, res) => {
  try {
    const total = await FAQItem.countDocuments();
    const published = await FAQItem.countDocuments({ isPublished: true });
    const featured = await FAQItem.countDocuments({ isFeatured: true });
    
    const topViewed = await FAQItem.find({ isPublished: true })
      .sort({ views: -1 })
      .limit(5)
      .select('translations.en.question views');

    res.json({
      success: true,
      data: {
        total,
        published,
        draft: total - published,
        featured,
        topViewed
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};
