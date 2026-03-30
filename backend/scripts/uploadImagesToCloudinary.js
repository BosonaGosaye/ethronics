const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Images to upload from src/assets
const imagesToUpload = [
  'agreed_memorandum-BI6NHFfY.jpg',
  'ai-curriculum-DbYJIUnh.jpg',
  'bootcamp-4gbqmUw9.jpg',
  'CEO-IzCm-iny.jpg',
  'ethronics-CWA0oynF.png',
  'highschool_certificate-ClogWnnI.jpg',
  'joe_conference-3IZA4Mw3.jpg',
  'joe_presentation-qDcMLdVA.png',
  'kids_certificate-H-BCaQps.jpg',
  'memorandum-BW4Tf9jE.jpg',
  'mentor-Cib0Zqml.jpg',
  'postgrad-CcZrrGEe.jpg',
  'Robot-replace-D--cWneY.jpg',
  'scholarship-BmBDMus7.jpg',
  'smart-gate-BuGtJWux.jpg',
  'training-xgzfTKXW.jpg',
  'tvet-BNPvddQq.jpg',
  'undergrad-DPtNxD2n.jpg'
];

const assetsPath = path.join(__dirname, '../../src/assets');
const uploadedUrls = {};

async function uploadImage(filename) {
  const filePath = path.join(assetsPath, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filename}`);
    return null;
  }

  try {
    // Create a clean public_id from filename
    const publicId = filename.replace(/\.[^/.]+$/, '').replace(/-[A-Za-z0-9_-]+$/, '');
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `${process.env.CLOUDINARY_FOLDER}/images`,
      public_id: publicId,
      overwrite: true,
      resource_type: 'image'
    });

    console.log(`✅ Uploaded: ${filename} -> ${result.secure_url}`);
    return {
      filename,
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting image upload to Cloudinary...\n');
  
  for (const filename of imagesToUpload) {
    const result = await uploadImage(filename);
    if (result) {
      uploadedUrls[result.filename] = result.url;
    }
  }

  console.log('\n✨ Upload complete!\n');
  console.log('📋 Uploaded URLs:');
  console.log(JSON.stringify(uploadedUrls, null, 2));
  
  // Save URLs to a file for reference
  const outputPath = path.join(__dirname, 'cloudinary-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadedUrls, null, 2));
  console.log(`\n💾 URLs saved to: ${outputPath}`);
}

uploadAllImages().catch(console.error);
