const TrainingVideo = require('../models/TrainingVideo');

// Get all published videos (public)
exports.getPublicVideos = async (req, res) => {
  try {
    const videos = await TrainingVideo.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-createdBy -__v');

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all videos (admin)
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await TrainingVideo.find()
      .sort({ order: 1, createdAt: -1 })
      .populate('createdBy', 'name email');

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single video (admin)
exports.getVideo = async (req, res) => {
  try {
    const video = await TrainingVideo.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create video (admin)
exports.createVideo = async (req, res) => {
  try {
    const videoData = {
      ...req.body,
      createdBy: req.user._id
    };

    const video = await TrainingVideo.create(videoData);

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update video (admin)
exports.updateVideo = async (req, res) => {
  try {
    const video = await TrainingVideo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete video (admin)
exports.deleteVideo = async (req, res) => {
  try {
    const video = await TrainingVideo.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video deleted successfully'
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
    const video = await TrainingVideo.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    video.isPublished = !video.isPublished;
    await video.save();

    res.json({
      success: true,
      message: `Video ${video.isPublished ? 'published' : 'unpublished'} successfully`,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
