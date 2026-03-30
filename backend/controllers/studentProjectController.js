const StudentProject = require('../models/StudentProject');

// Get all published projects (public)
exports.getPublicProjects = async (req, res) => {
  try {
    const projects = await StudentProject.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-createdBy -__v');

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

// Get all projects (admin)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await StudentProject.find()
      .sort({ order: 1, createdAt: -1 })
      .populate('createdBy', 'name email');

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

// Get single project (admin)
exports.getProject = async (req, res) => {
  try {
    const project = await StudentProject.findById(req.params.id)
      .populate('createdBy', 'name email');

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

// Create project (admin)
exports.createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      createdBy: req.user._id
    };

    const project = await StudentProject.create(projectData);

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

// Update project (admin)
exports.updateProject = async (req, res) => {
  try {
    const project = await StudentProject.findByIdAndUpdate(
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

// Delete project (admin)
exports.deleteProject = async (req, res) => {
  try {
    const project = await StudentProject.findByIdAndDelete(req.params.id);

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

// Toggle publish status (admin)
exports.togglePublish = async (req, res) => {
  try {
    const project = await StudentProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.isPublished = !project.isPublished;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.isPublished ? 'published' : 'unpublished'} successfully`,
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
