const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const ManufacturingContent = require('../models/ManufacturingContent');

// Import the translations directly (Node.js will handle the ES6 export)
const translationsPath = require('path').join(__dirname, '../../src/translations/manufacturing.js');

async function importManufacturingData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('📂 Loading translations...');
    
    // Use dynamic import for ES6 modules
    const { manufacturingTranslations } = await import('file://' + translationsPath.replace(/\\/g, '/'));
    console.log('✅ Translations loaded successfully');

    console.log('🗑️  Clearing existing manufacturing content...');
    await ManufacturingContent.deleteMany({});
    console.log('✅ Cleared existing content');

    const sections = ['hero', 'capabilities', 'products', 'sustainability', 'cta'];
    const languages = ['en', 'am', 'om'];
    let importedCount = 0;

    console.log('📥 Importing manufacturing content...');

    for (const language of languages) {
      console.log(`\n📝 Processing ${language.toUpperCase()} content...`);
      
      for (const section of sections) {
        const sectionData = manufacturingTranslations[language][section];
        
        if (sectionData) {
          await ManufacturingContent.create({
            language,
            section,
            content: sectionData,
            isPublished: true // Publish all sections by default
          });
          
          importedCount++;
          console.log(`  ✓ Imported ${section} section`);
        } else {
          console.log(`  ⚠ No data found for ${section} section`);
        }
      }
    }

    console.log(`\n✅ Successfully imported ${importedCount} sections`);
    console.log(`📊 Total: ${importedCount} sections across ${languages.length} languages`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the import
importManufacturingData();
