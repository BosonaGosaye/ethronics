const mongoose = require('mongoose');
const AcademicSection = require('../models/AcademicSection');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function importAcademicSections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Read the academic translations file
    const translationsPath = path.join(__dirname, '../../src/translations/academic.js');
    const translationsContent = fs.readFileSync(translationsPath, 'utf8');
    
    // Extract the data object using regex (simple approach)
    const dataMatch = translationsContent.match(/export const academicTranslations = ({[\s\S]*});/);
    if (!dataMatch) {
      throw new Error('Could not parse academic translations file');
    }

    // Use eval to parse the object (in a controlled environment)
    const academicTranslations = eval('(' + dataMatch[1] + ')');

    const languages = ['en', 'am', 'om'];
    const sections = ['hero', 'whyChooseUs', 'vision', 'programs', 'admissions', 'faculty', 'cta'];
    
    let importedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const language of languages) {
      console.log(`\n🌐 Processing ${language.toUpperCase()}...`);
      
      for (const section of sections) {
        try {
          const content = academicTranslations[language]?.[section];
          
          if (!content || Object.keys(content).length === 0) {
            console.log(`  ⏭️  Skipping ${section} (no content)`);
            skippedCount++;
            continue;
          }

          // Check if section already exists
          const existing = await AcademicSection.findOne({ language, section });
          
          if (existing) {
            // Update existing section
            existing.content = content;
            existing.isPublished = true;
            existing.publishedAt = new Date();
            await existing.save();
            console.log(`  ✅ Updated ${section}`);
            updatedCount++;
          } else {
            // Create new section
            await AcademicSection.create({
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

importAcademicSections();
