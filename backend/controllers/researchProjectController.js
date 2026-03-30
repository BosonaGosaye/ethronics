const ResearchProject = require('../models/ResearchProject');

// Get all published projects (Public)
exports.getPublicProjects = async (req, res) => {
  try {
    const { category, status, language = 'en' } = req.query;
    
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    const projects = await ResearchProject.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select(`translations.${language} category status images featuredImage startDate endDate displayOrder`);
    
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single project by ID (Public)
exports.getPublicProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'en' } = req.query;
    
    const project = await ResearchProject.findOne({
      _id: id,
      isPublished: true
    }).select(`translations.${language} category status images featuredImage teamMembers startDate endDate`);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all projects (Admin)
exports.getAllProjects = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { 'translations.en.title': { $regex: search, $options: 'i' } },
        { 'translations.am.title': { $regex: search, $options: 'i' } },
        { 'translations.om.title': { $regex: search, $options: 'i' } }
      ];
    }
    
    const total = await ResearchProject.countDocuments(filter);
    const projects = await ResearchProject.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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

// Get single project (Admin)
exports.getProjectById = async (req, res) => {
  try {
    const project = await ResearchProject.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const project = new ResearchProject(req.body);
    await project.save();
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await ResearchProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await ResearchProject.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
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
    const { isPublished } = req.body;
    
    const project = await ResearchProject.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: `Project ${isPublished ? 'published' : 'unpublished'} successfully`,
      data: project
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
exports.getStats = async (req, res) => {
  try {
    const total = await ResearchProject.countDocuments();
    const published = await ResearchProject.countDocuments({ isPublished: true });
    const draft = total - published;
    
    const byCategory = await ResearchProject.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const byStatus = await ResearchProject.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        published,
        draft,
        byCategory,
        byStatus
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
