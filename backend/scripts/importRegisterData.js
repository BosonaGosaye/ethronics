const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const RegisterContent = require('../models/RegisterContent');

// Import the translations directly
const translationsPath = require('path').join(__dirname, '../../src/translations/register.js');

async function importRegisterData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('📂 Loading translations...');
    
    // Use dynamic import for ES6 modules
    const { registerTranslations } = await import('file://' + translationsPath.replace(/\\/g, '/'));
    console.log('✅ Translations loaded successfully');

    console.log('🗑️  Clearing existing register content...');
    await RegisterContent.deleteMany({});
    console.log('✅ Cleared existing content');

    const languages = ['en', 'am', 'om'];
    let importedCount = 0;

    console.log('📥 Importing register content...');

    for (const language of languages) {
      console.log(`\n📝 Processing ${language.toUpperCase()} content...`);
      
      const contentData = registerTranslations[language];
      
      if (contentData) {
        // Import each section separately
        const sections = ['hero', 'objective', 'highlights', 'form', 'faq', 'gallery', 'nextSteps', 'cta'];
        
        for (const section of sections) {
          if (contentData[section]) {
            await RegisterContent.create({
              language,
              section,
              content: contentData[section],
              isPublished: true
            });
            console.log(`  ✓ Imported ${language}/${section}`);
            importedCount++;
          } else {
            console.log(`  ⚠ No data found for ${language}/${section}`);
          }
        }
      } else {
        console.log(`  ⚠ No data found for ${language}`);
      }
    }

    console.log(`\n✅ Successfully imported ${importedCount} sections`);
    console.log(`📊 Total: ${importedCount} language/section combinations`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the import
importRegisterData();
