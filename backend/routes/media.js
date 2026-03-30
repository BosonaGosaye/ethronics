const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { cloudinary, uploadImage, uploadVideo, uploadFile } = require('../config/cloudinary');

// @route   POST /api/media/upload
// @desc    Public upload endpoint for contact form resumes
// @access  Public
router.post('/upload', uploadFile.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        format: req.file.format,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/media/upload-image
// @desc    Upload single image to Cloudinary
// @access  Private
router.post('/upload-image', protect, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        format: req.file.format,
        size: req.file.size,
        width: req.file.width,
        height: req.file.height
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/media/upload-images
// @desc    Upload multiple images to Cloudinary
// @access  Private
router.post('/upload-images', protect, uploadImage.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const files = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      format: file.format,
      size: file.size,
      width: file.width,
      height: file.height
    }));

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      count: files.length,
      data: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/media/upload-video
// @desc    Upload video to Cloudinary
// @access  Private
router.post('/upload-video', protect, uploadVideo.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        format: req.file.format,
        size: req.file.size,
        duration: req.file.duration
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/media/upload-file
// @desc    Upload document/file to Cloudinary
// @access  Private
router.post('/upload-file', protect, uploadFile.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        format: req.file.format,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/media/view/:publicId
// @desc    Proxy endpoint to view files in browser with proper headers
// @access  Public (for viewing uploaded CVs)
router.get('/view/*', async (req, res) => {
  try {
    const publicId = req.params[0];
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    // Get the file URL from Cloudinary
    const fileUrl = cloudinary.url(publicId, {
      resource_type: 'raw',
      type: 'upload',
      secure: true
    });

    // Fetch the file from Cloudinary using https
    const https = require('https');
    const url = require('url');
    const parsedUrl = url.parse(fileUrl);

    https.get({
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (response) => {
      // Determine content type based on file extension
      let extension = 'pdf'; // Default to PDF
      if (publicId.includes('.')) {
        extension = publicId.split('.').pop().toLowerCase();
      }
      
      const contentTypes = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'txt': 'text/plain'
      };

      const contentType = contentTypes[extension] || 'application/pdf'; // Default to PDF

      console.log('View endpoint - Public ID:', publicId);
      console.log('View endpoint - Extension:', extension);
      console.log('View endpoint - Content-Type:', contentType);
      console.log('View endpoint - File URL:', fileUrl);

      // Set headers to display in browser instead of downloading
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      // Pipe the response
      response.pipe(res);
    }).on('error', (error) => {
      console.error('Error fetching file:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to load file'
      });
    });
  } catch (error) {
    console.error('Error viewing file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load file'
    });
  }
});

// @route   GET /api/media/download/:publicId
// @desc    Download file with proper filename
// @access  Public (for downloading CVs)
router.get('/download/*', async (req, res) => {
  try {
    const publicId = req.params[0];
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    // Get the file URL from Cloudinary
    const fileUrl = cloudinary.url(publicId, {
      resource_type: 'raw',
      type: 'upload',
      secure: true
    });

    // Extract filename from publicId
    const pathParts = publicId.split('/');
    const filenameWithoutExt = pathParts[pathParts.length - 1];
    const extension = publicId.includes('.') ? publicId.split('.').pop().toLowerCase() : 'pdf';
    const filename = `CV_${filenameWithoutExt}.${extension}`;

    // Fetch the file from Cloudinary using https
    const https = require('https');
    const url = require('url');
    const parsedUrl = url.parse(fileUrl);

    https.get({
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (response) => {
      // Determine content type based on file extension
      const contentTypes = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'txt': 'text/plain'
      };

      const contentType = contentTypes[extension] || 'application/pdf'; // Default to PDF

      console.log('Download endpoint - Public ID:', publicId);
      console.log('Download endpoint - Filename:', filename);
      console.log('Download endpoint - Content-Type:', contentType);

      // Set headers to force download with proper filename
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      // Pipe the response
      response.pipe(res);
    }).on('error', (error) => {
      console.error('Error downloading file:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to download file'
      });
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download file'
    });
  }
});

// @route   DELETE /api/media/delete/:publicId
// @desc    Delete media from Cloudinary
// @access  Private
router.delete('/delete/:publicId(*)', protect, async (req, res) => {
  try {
    const publicId = req.params.publicId;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    // Try to delete as image first, then video, then raw file
    let result;
    try {
      result = await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      try {
        result = await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
      } catch (err2) {
        result = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      }
    }

    if (result.result === 'ok' || result.result === 'not found') {
      res.json({
        success: true,
        message: 'Media deleted successfully',
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete media',
        data: result
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/media/list
// @desc    List all media from Cloudinary folder
// @access  Private
router.get('/list', protect, async (req, res) => {
  try {
    const { type = 'image', folder = process.env.CLOUDINARY_FOLDER } = req.query;
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: type,
      prefix: folder,
      max_results: 500
    });

    res.json({
      success: true,
      count: result.resources.length,
      data: result.resources.map(resource => ({
        url: resource.secure_url,
        publicId: resource.public_id,
        format: resource.format,
        size: resource.bytes,
        width: resource.width,
        height: resource.height,
        createdAt: resource.created_at
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
