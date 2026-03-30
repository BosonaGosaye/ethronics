const NewsEventItem = require('../models/NewsEventItem');

// Get all news/events (public - only published)
exports.getPublicNewsEvents = async (req, res) => {
  try {
    const { 
      language = 'en',
      type, 
      category, 
      search, 
      page = 1, 
      limit = 12,
      sort = '-publishDate'
    } = req.query;

    const query = { status: 'published' };
    
    if (type) query.type = type;
    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [
        { [`translations.${language}.title`]: { $regex: search, $options: 'i' } },
        { [`translations.${language}.excerpt`]: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const newsEvents = await NewsEventItem.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await NewsEventItem.countDocuments(query);

    // Transform to include only requested language
    const transformedData = newsEvents.map(item => ({
      _id: item._id,
      slug: item.slug,
      type: item.type,
      category: item.category,
      featuredImage: item.featuredImage,
      author: item.author,
      publishDate: item.publishDate,
      readTime: item.readTime,
      tags: item.tags,
      eventDate: item.eventDate,
      eventEndDate: item.eventEndDate,
      location: item.location,
      registrationLink: item.registrationLink,
      maxAttendees: item.maxAttendees,
      status: item.status,
      isFeatured: item.isFeatured,
      views: item.views,
      title: item.translations[language]?.title || item.translations.en.title,
      excerpt: item.translations[language]?.excerpt || item.translations.en.excerpt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.json({
      success: true,
      data: transformedData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single news/event by slug (public)
exports.getPublicNewsEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'en' } = req.query;
    
    const newsEvent = await NewsEventItem.findOneAndUpdate(
      { slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    // Transform to include only requested language
    const transformedData = {
      _id: newsEvent._id,
      slug: newsEvent.slug,
      type: newsEvent.type,
      category: newsEvent.category,
      featuredImage: newsEvent.featuredImage,
      author: newsEvent.author,
      publishDate: newsEvent.publishDate,
      readTime: newsEvent.readTime,
      tags: newsEvent.tags,
      eventDate: newsEvent.eventDate,
      eventEndDate: newsEvent.eventEndDate,
      location: newsEvent.location,
      registrationLink: newsEvent.registrationLink,
      maxAttendees: newsEvent.maxAttendees,
      status: newsEvent.status,
      isFeatured: newsEvent.isFeatured,
      views: newsEvent.views,
      title: newsEvent.translations[language]?.title || newsEvent.translations.en.title,
      excerpt: newsEvent.translations[language]?.excerpt || newsEvent.translations.en.excerpt,
      content: newsEvent.translations[language]?.content || newsEvent.translations.en.content,
      createdAt: newsEvent.createdAt,
      updatedAt: newsEvent.updatedAt
    };

    res.json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get featured news/events (public)
exports.getFeaturedNewsEvents = async (req, res) => {
  try {
    const { language = 'en', limit = 3 } = req.query;
    
    const query = { status: 'published', isFeatured: true };

    const newsEvents = await NewsEventItem.find(query)
      .sort('-publishDate')
      .limit(parseInt(limit));

    // Transform to include only requested language
    const transformedData = newsEvents.map(item => ({
      _id: item._id,
      slug: item.slug,
      type: item.type,
      category: item.category,
      featuredImage: item.featuredImage,
      author: item.author,
      publishDate: item.publishDate,
      readTime: item.readTime,
      tags: item.tags,
      eventDate: item.eventDate,
      eventEndDate: item.eventEndDate,
      location: item.location,
      status: item.status,
      isFeatured: item.isFeatured,
      views: item.views,
      title: item.translations[language]?.title || item.translations.en.title,
      excerpt: item.translations[language]?.excerpt || item.translations.en.excerpt,
      createdAt: item.createdAt
    }));

    res.json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all news/events (admin)
exports.getAllNewsEvents = async (req, res) => {
  try {
    const { 
      type, 
      category, 
      status,
      search, 
      page = 1, 
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    const query = {};
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { 'translations.en.title': { $regex: search, $options: 'i' } },
        { 'translations.en.excerpt': { $regex: search, $options: 'i' } },
        { 'translations.am.title': { $regex: search, $options: 'i' } },
        { 'translations.om.title': { $regex: search, $options: 'i' } }
      ];
    }

    const newsEvents = await NewsEventItem.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await NewsEventItem.countDocuments(query);

    res.json({
      success: true,
      data: newsEvents,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single news/event by ID (admin)
exports.getNewsEventById = async (req, res) => {
  try {
    const newsEvent = await NewsEventItem.findById(req.params.id);

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    res.json({
      success: true,
      data: newsEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create news/event
exports.createNewsEvent = async (req, res) => {
  try {
    const newsEventData = req.body;

    // Generate slug if not provided
    if (!newsEventData.slug && newsEventData.translations?.en?.title) {
      newsEventData.slug = newsEventData.translations.en.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const newsEvent = await NewsEventItem.create(newsEventData);

    res.status(201).json({
      success: true,
      message: 'News/Event created successfully',
      data: newsEvent
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A news/event with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update news/event
exports.updateNewsEvent = async (req, res) => {
  try {
    const updateData = req.body;

    const newsEvent = await NewsEventItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    res.json({
      success: true,
      message: 'News/Event updated successfully',
      data: newsEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete news/event
exports.deleteNewsEvent = async (req, res) => {
  try {
    const newsEvent = await NewsEventItem.findByIdAndDelete(req.params.id);

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    res.json({
      success: true,
      message: 'News/Event deleted successfully'
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
    const total = await NewsEventItem.countDocuments();
    const published = await NewsEventItem.countDocuments({ status: 'published' });
    const draft = await NewsEventItem.countDocuments({ status: 'draft' });
    const archived = await NewsEventItem.countDocuments({ status: 'archived' });

    const byType = await NewsEventItem.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const byCategory = await NewsEventItem.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        published,
        draft,
        archived,
        byType,
        byCategory
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
