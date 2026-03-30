const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load the Cloudinary URLs mapping
const urlsPath = path.join(__dirname, 'cloudinary-urls.json');

async function updateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if URLs file exists
    if (!fs.existsSync(urlsPath)) {
      console.error('❌ cloudinary-urls.json not found!');
      console.log('Please run uploadImagesToCloudinary.js first');
      process.exit(1);
    }

    const cloudinaryUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));
    console.log(`📋 Loaded ${Object.keys(cloudinaryUrls).length} Cloudinary URLs\n`);

    // Get all content for all languages
    const languages = ['en', 'am', 'om'];
    let updatedCount = 0;

    for (const language of languages) {
      console.log(`\n🔄 Processing ${language.toUpperCase()} content...`);
      
      const contents = await HomeContent.find({ language });
      
      for (const content of contents) {
        let updated = false;
        const contentData = content.content;

        // Helper function to replace local paths with Cloudinary URLs
        const replaceImagePath = (obj) => {
          if (!obj || typeof obj !== 'object') return;

          for (const key in obj) {
            if (typeof obj[key] === 'string') {
              // Check if it's an image path
              if (obj[key].includes('/assets/') || obj[key].includes('src/assets/')) {
                const filename = obj[key].split('/').pop();
                if (cloudinaryUrls[filename]) {
                  console.log(`  ✓ Replacing: ${filename}`);
                  obj[key] = cloudinaryUrls[filename];
                  updated = true;
                }
              }
            } else if (typeof obj[key] === 'object') {
              replaceImagePath(obj[key]);
            }
          }
        };

        // Process the content
        replaceImagePath(contentData);

        // Save if updated
        if (updated) {
          content.content = contentData;
          await content.save();
          updatedCount++;
          console.log(`  ✅ Updated ${content.sectionName} (${language})`);
        }
      }
    }

    console.log(`\n✨ Update complete! Updated ${updatedCount} content sections.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

updateDatabase();
