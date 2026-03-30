const mongoose = require('mongoose');
const AcademicContent = require('../models/AcademicContent');
const AcademicSection = require('../models/AcademicSection');
require('dotenv').config();

async function migrateAcademicContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get existing academic content
    const existingContent = await AcademicContent.findOne();
    
    if (!existingContent) {
      console.log('⚠️  No existing academic content found');
      process.exit(0);
    }

    console.log('📦 Found existing academic content');

    const languages = ['en', 'am', 'om'];
    const sections = ['hero', 'whyChooseUs', 'vision', 'programs', 'admissions', 'faculty', 'cta'];
    
    let migratedCount = 0;
    let skippedCount = 0;

    for (const language of languages) {
      console.log(`\n🌐 Processing ${language.toUpperCase()}...`);
      
      for (const section of sections) {
        try {
          const content = existingContent[language]?.[section];
          
          if (!content || Object.keys(content).length === 0) {
            console.log(`  ⏭️  Skipping ${section} (no content)`);
            skippedCount++;
            continue;
          }

          // Check if section already exists
          const existing = await AcademicSection.findOne({ language, section });
          
          if (existing) {
            console.log(`  ⚠️  ${section} already exists, skipping`);
            skippedCount++;
            continue;
          }

          // Create new section
          await AcademicSection.create({
            language,
            section,
            content,
            isPublished: true, // Publish all by default
            publishedAt: new Date()
          });

          console.log(`  ✅ Migrated ${section}`);
          migratedCount++;
        } catch (error) {
          console.error(`  ❌ Error migrating ${section}:`, error.message);
        }
      }
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Migrated: ${migratedCount} sections`);
    console.log(`   ⏭️  Skipped: ${skippedCount} sections`);
    console.log(`\n✨ Migration complete!`);

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateAcademicContent();
