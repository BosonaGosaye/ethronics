const LibraryUser = require('../models/LibraryUser');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id, type: 'library' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/library-users/register
// @desc    Register new library user
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, institution, role } = req.body;

    // Check if user exists
    const userExists = await LibraryUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await LibraryUser.create({
      name,
      email,
      password,
      institution,
      role
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        institution: user.institution,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// @route   POST /api/library-users/login
// @desc    Login library user
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await LibraryUser.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        institution: user.institution,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// @route   GET /api/library-users/profile
// @desc    Get user profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await LibraryUser.findById(req.user._id);

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        institution: user.institution,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

// @route   PUT /api/library-users/profile
// @desc    Update user profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, institution, role } = req.body;

    const user = await LibraryUser.findById(req.user._id);

    if (name) user.name = name;
    if (institution !== undefined) user.institution = institution;
    if (role) user.role = role;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        institution: user.institution,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// @route   GET /api/library-users/dashboard
// @desc    Get user dashboard statistics
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    const user = await LibraryUser.findById(req.user._id)
      .populate('downloads.resource', 'title author type category coverImage')
      .populate('savedResources.resource', 'title author type category coverImage')
      .populate('readingHistory.resource', 'title author type category coverImage');

    const stats = {
      totalDownloads: user.downloads.length,
      totalSaved: user.savedResources.length,
      totalViewed: user.readingHistory.length,
      recentDownloads: user.downloads.slice(-5).reverse(),
      recentSaved: user.savedResources.slice(-5).reverse(),
      recentViewed: user.readingHistory.slice(-5).reverse()
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard',
      error: error.message
    });
  }
};

// @route   GET /api/library-users/downloads
// @desc    Get user download history
// @access  Private
exports.getDownloads = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const user = await LibraryUser.findById(req.user._id)
      .populate('downloads.resource', 'title author type category coverImage fileSize');

    const downloads = user.downloads
      .sort((a, b) => b.downloadedAt - a.downloadedAt)
      .slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      data: downloads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: user.downloads.length,
        pages: Math.ceil(user.downloads.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch downloads',
      error: error.message
    });
  }
};

// @route   GET /api/library-users/saved
// @desc    Get user saved resources
// @access  Private
exports.getSaved = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const user = await LibraryUser.findById(req.user._id)
      .populate('savedResources.resource', 'title author type category coverImage description');

    const saved = user.savedResources
      .sort((a, b) => b.savedAt - a.savedAt)
      .slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      data: saved,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: user.savedResources.length,
        pages: Math.ceil(user.savedResources.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch saved resources',
      error: error.message
    });
  }
};

// @route   POST /api/library-users/save/:resourceId
// @desc    Save/bookmark a resource
// @access  Private
exports.saveResource = async (req, res) => {
  try {
    const user = await LibraryUser.findById(req.user._id);
    await user.saveResource(req.params.resourceId);

    res.json({
      success: true,
      message: 'Resource saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save resource',
      error: error.message
    });
  }
};

// @route   DELETE /api/library-users/save/:resourceId
// @desc    Remove saved resource
// @access  Private
exports.unsaveResource = async (req, res) => {
  try {
    const user = await LibraryUser.findById(req.user._id);
    await user.unsaveResource(req.params.resourceId);

    res.json({
      success: true,
      message: 'Resource removed from saved'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove resource',
      error: error.message
    });
  }
};

// @route   GET /api/library-users/history
// @desc    Get reading history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const user = await LibraryUser.findById(req.user._id)
      .populate('readingHistory.resource', 'title author type category coverImage');

    const history = user.readingHistory
      .sort((a, b) => b.viewedAt - a.viewedAt)
      .slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      data: history,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: user.readingHistory.length,
        pages: Math.ceil(user.readingHistory.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
      error: error.message
    });
  }
};

// @route   POST /api/library-users/history/:resourceId
// @desc    Add to reading history
// @access  Private
exports.addToHistory = async (req, res) => {
  try {
    const { position = 0 } = req.body;
    const user = await LibraryUser.findById(req.user._id);
    await user.addToHistory(req.params.resourceId, position);

    res.json({
      success: true,
      message: 'Added to history'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add to history',
      error: error.message
    });
  }
};
