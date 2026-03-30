const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load the Cloudinary URLs mapping
const urlsPath = path.join(__dirname, 'cloudinary-urls.json');

// Image mapping for different sections
const imageMapping = {
  gallery: {
    items: [
      { 
        image: 'bootcamp-4gbqmUw9.jpg',
        titleKey: 'bootcamp'
      },
      { 
        image: 'training-xgzfTKXW.jpg',
        titleKey: 'training'
      },
      { 
        image: 'mentor-Cib0Zqml.jpg',
        titleKey: 'mentor'
      },
      { 
        image: 'scholarship-BmBDMus7.jpg',
        titleKey: 'scholarship'
      },
      { 
        image: 'highschool_certificate-ClogWnnI.jpg',
        titleKey: 'certificate'
      },
      { 
        image: 'kids_certificate-H-BCaQps.jpg',
        titleKey: 'kids'
      }
    ]
  },
  partnerships: {
    keyPartnerships: [
      {
        image: 'memorandum-BW4Tf9jE.jpg',
        nameKey: 'memorandum'
      },
      {
        image: 'agreed_memorandum-BI6NHFfY.jpg',
        nameKey: 'agreement'
      },
      {
        image: 'joe_conference-3IZA4Mw3.jpg',
        nameKey: 'conference'
      }
    ]
  }
};

async function addImagesToContent() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if URLs file exists
    if (!fs.existsSync(urlsPath)) {
      console.error('❌ cloudinary-urls.json not found!');
      console.log('Please run: npm run upload-images');
      process.exit(1);
    }

    const cloudinaryUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));
    console.log(`📋 Loaded ${Object.keys(cloudinaryUrls).length} Cloudinary URLs\n`);

    const languages = ['en', 'am', 'om'];
    let updatedCount = 0;

    for (const language of languages) {
      console.log(`🔄 Processing ${language.toUpperCase()} content...\n`);
      
      // Update Gallery section
      const galleryContent = await HomeContent.findOne({ 
        language, 
        sectionName: 'gallery' 
      });

      if (galleryContent && galleryContent.content.items) {
        console.log(`  📸 Updating Gallery section...`);
        let galleryUpdated = false;

        galleryContent.content.items.forEach((item, index) => {
          if (imageMapping.gallery.items[index]) {
            const imageFile = imageMapping.gallery.items[index].image;
            if (cloudinaryUrls[imageFile]) {
              item.image = cloudinaryUrls[imageFile];
              console.log(`    ✓ Added image to gallery item ${index + 1}`);
              galleryUpdated = true;
            }
          }
        });

        if (galleryUpdated) {
          await galleryContent.save();
          updatedCount++;
          console.log(`  ✅ Gallery section updated\n`);
        }
      }

      // Update Partnerships section
      const partnershipsContent = await HomeContent.findOne({ 
        language, 
        sectionName: 'partnerships' 
      });

      if (partnershipsContent && partnershipsContent.content.keyPartnerships) {
        console.log(`  🤝 Updating Partnerships section...`);
        let partnershipsUpdated = false;

        partnershipsContent.content.keyPartnerships.forEach((item, index) => {
          if (imageMapping.partnerships.keyPartnerships[index]) {
            const imageFile = imageMapping.partnerships.keyPartnerships[index].image;
            if (cloudinaryUrls[imageFile]) {
              item.logo = cloudinaryUrls[imageFile];
              console.log(`    ✓ Added logo to partnership ${index + 1}`);
              partnershipsUpdated = true;
            }
          }
        });

        if (partnershipsUpdated) {
          await partnershipsContent.save();
          updatedCount++;
          console.log(`  ✅ Partnerships section updated\n`);
        }
      }
    }

    console.log(`\n✨ Update complete! Updated ${updatedCount} content sections.`);
    console.log('\n📝 Summary:');
    console.log('- Gallery sections: Added images to gallery items');
    console.log('- Partnerships sections: Added logos to key partnerships');
    console.log('\n💡 You can now use the admin dashboard to:');
    console.log('- Upload more images');
    console.log('- Add images to other sections');
    console.log('- Browse the media library');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

addImagesToContent();
