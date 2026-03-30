const mongoose = require('mongoose');
const AboutContent = require('../models/AboutContent');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function importAboutData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Read the about translations file
    const translationsPath = path.join(__dirname, '../../src/translations/about.js');
    const translationsContent = fs.readFileSync(translationsPath, 'utf8');
    
    // Extract the data object
    const dataMatch = translationsContent.match(/export const aboutTranslations = ({[\s\S]*});/);
    if (!dataMatch) {
      throw new Error('Could not parse about translations file');
    }

    const aboutTranslations = eval('(' + dataMatch[1] + ')');

    const languages = ['en', 'am', 'om'];
    const sections = ['hero', 'purpose', 'leaders', 'threeFronts', 'journey'];
    
    let importedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const language of languages) {
      console.log(`\n🌐 Processing ${language.toUpperCase()}...`);
      
      for (const section of sections) {
        try {
          const content = aboutTranslations[language]?.[section];
          
          if (!content || Object.keys(content).length === 0) {
            console.log(`  ⏭️  Skipping ${section} (no content)`);
            skippedCount++;
            continue;
          }

          const existing = await AboutContent.findOne({ language, section });
          
          if (existing) {
            existing.content = content;
            existing.isPublished = true;
            existing.publishedAt = new Date();
            await existing.save();
            console.log(`  ✅ Updated ${section}`);
            updatedCount++;
          } else {
            await AboutContent.create({
              language,
              section,
              content,
              isPublished: true,
              publishedAt: new Date()
            });
            console.log(`  ✅ Imported ${section}`);
            importedCount++;
          }
        } catch (error) {
          console.error(`  ❌ Error processing ${section}:`, error.message);
        }
      }
    }

    console.log(`\n📊 Import Summary:`);
    console.log(`   ✅ Imported: ${importedCount} sections`);
    console.log(`   🔄 Updated: ${updatedCount} sections`);
    console.log(`   ⏭️  Skipped: ${skippedCount} sections`);
    console.log(`\n✨ Import complete!`);

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importAboutData();
