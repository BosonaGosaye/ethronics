const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: `${process.env.CLOUDINARY_FOLDER}/images`,
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  }
});

// Create storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: `${process.env.CLOUDINARY_FOLDER}/videos`,
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm']
  }
});

// Create storage for documents/files
const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: `${process.env.CLOUDINARY_FOLDER}/files`,
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip']
  }
});

// Create multer upload instances
const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for images
  }
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for videos
  }
});

const uploadFile = multer({
  storage: fileStorage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit for files
  }
});

module.exports = {
  cloudinary,
  uploadImage,
  uploadVideo,
  uploadFile
};
