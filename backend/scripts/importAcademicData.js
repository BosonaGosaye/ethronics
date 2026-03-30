const mongoose = require('mongoose');
const AcademicContent = require('../models/AcademicContent');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the academic.js file from frontend
const academicFilePath = path.join(__dirname, '../../src/translations/academic.js');

async function importAcademicData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read the academic.js file
    console.log('📖 Reading academic.js file...');
    let fileContent = fs.readFileSync(academicFilePath, 'utf8');
    
    // Remove the export statement to make it valid JavaScript
    fileContent = fileContent.replace('export const academicTranslations = ', 'const academicTranslations = ');
    
    // Add a return statement at the end
    fileContent += '\nacademicTranslations;';
    
    // Evaluate the file content to get the data
    const academicTranslations = eval(fileContent);
    
    console.log('✅ Successfully parsed academic.js');
    console.log(`📊 Found ${Object.keys(academicTranslations).length} languages: ${Object.keys(academicTranslations).join(', ')}`);

    // Clear existing data
    await AcademicContent.deleteMany({});
    console.log('🗑️  Cleared existing academic content');

    // Prepare the data structure for MongoDB
    const academicData = {
      en: academicTranslations.en || {},
      am: academicTranslations.am || {},
      om: academicTranslations.om || {}
    };

    // Insert new data
    const content = new AcademicContent(academicData);
    await content.save();
    
    console.log('✅ Academic content imported successfully!');
    console.log('📝 Summary:');
    console.log(`   - English sections: ${Object.keys(academicData.en).length}`);
    console.log(`   - Amharic sections: ${Object.keys(academicData.am).length}`);
    console.log(`   - Oromo sections: ${Object.keys(academicData.om).length}`);

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error importing academic data:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

importAcademicData();
