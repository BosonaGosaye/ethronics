const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const HomeContent = require('../models/HomeContent');
require('dotenv').config();

/**
 * This script imports home page content from the frontend translations file
 * It reads the home.js file directly and seeds the database with all content
 */

const importHomeData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Path to the home.js translations file
    // Use absolute path as specified by user
    let homeFilePath = path.resolve('C:/Users/rooba/Desktop/ethronics.com (1)/ethronics.com (1)/src/translations/home.js');
    
    if (!fs.existsSync(homeFilePath)) {
      console.error(`❌ Home translations file not found at: ${homeFilePath}`);
      console.log('💡 Trying relative path...');
      
      // Fallback to relative path
      const relativePath = path.join(__dirname, '../../src/translations/home.js');
      if (fs.existsSync(relativePath)) {
        console.log(`✅ Found file at relative path: ${relativePath}`);
        homeFilePath = relativePath;
      } else {
        console.error('❌ File not found at relative path either');
        process.exit(1);
      }
    }

    // Read the home.js file
    console.log('📖 Reading home.js file...');
    const fileContent = fs.readFileSync(homeFilePath, 'utf8');
    
    // Remove the export statement and extract the object
    const cleanedContent = fileContent
      .replace(/export\s+const\s+homeTranslations\s*=\s*/, '')
      .replace(/;?\s*$/, '');
    
    // Parse the JavaScript object
    let homeTranslations;
    try {
      // Use Function constructor to safely evaluate the object
      homeTranslations = new Function(`return ${cleanedContent}`)();
    } catch (parseError) {
      console.error('❌ Error parsing home.js:', parseError.message);
      process.exit(1);
    }

    console.log('✅ Successfully parsed home translations');
    console.log(`📊 Found ${Object.keys(homeTranslations).length} languages: ${Object.keys(homeTranslations).join(', ')}`);

    // Get or create admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@ethronics.org',
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        name: 'Admin User',
        role: 'admin',
        isActive: true
      });
      console.log('👤 Created admin user:', adminUser.email);
    } else {
      console.log('👤 Using existing admin user:', adminUser.email);
    }

    // Clear existing home content
    const deletedCount = await HomeContent.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount.deletedCount} existing home content documents`);

    // Import content for each language
    let totalImported = 0;
    const errors = [];
    
    for (const [language, sections] of Object.entries(homeTranslations)) {
      console.log(`\n📝 Importing ${language.toUpperCase()} content...`);
      
      for (const [section, content] of Object.entries(sections)) {
        try {
          await HomeContent.create({
            language,
            section,
            content,
            isPublished: true,
            publishedAt: new Date(),
            updatedBy: adminUser._id
          });
          
          console.log(`   ✓ ${section} (${JSON.stringify(content).length} bytes)`);
          totalImported++;
        } catch (error) {
          const errorMsg = `${language}/${section}: ${error.message}`;
          console.error(`   ✗ ${errorMsg}`);
          errors.push(errorMsg);
        }
      }
    }

    console.log(`\n✅ Successfully imported ${totalImported} content sections`);
    
    if (errors.length > 0) {
      console.log(`\n⚠️  ${errors.length} errors occurred:`);
      errors.forEach(err => console.log(`   - ${err}`));
    }

    console.log('\n📊 Summary:');
    const contentByLanguage = await HomeContent.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 }, sections: { $push: '$section' } } },
      { $sort: { _id: 1 } }
    ]);
    
    contentByLanguage.forEach(item => {
      console.log(`   ${item._id.toUpperCase()}: ${item.count} sections - ${item.sections.join(', ')}`);
    });

    console.log('\n🎉 Import completed successfully!');
    console.log('\n📝 You can now access the content via:');
    console.log(`   GET http://localhost:${process.env.PORT || 5000}/api/home/en`);
    console.log(`   GET http://localhost:${process.env.PORT || 5000}/api/home/am`);
    console.log(`   GET http://localhost:${process.env.PORT || 5000}/api/home/om`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error importing home data:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

importHomeData();
