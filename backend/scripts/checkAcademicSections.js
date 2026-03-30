const mongoose = require('mongoose');
const AcademicSection = require('../models/AcademicSection');
require('dotenv').config();

async function checkAcademicSections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all sections
    const allSections = await AcademicSection.find();
    console.log(`📊 Total sections in database: ${allSections.length}\n`);

    // Count by language
    const languages = ['en', 'am', 'om'];
    for (const lang of languages) {
      const langSections = await AcademicSection.find({ language: lang });
      const published = langSections.filter(s => s.isPublished).length;
      const draft = langSections.filter(s => !s.isPublished).length;
      
      console.log(`🌐 ${lang.toUpperCase()}:`);
      console.log(`   Total: ${langSections.length}`);
      console.log(`   Published: ${published}`);
      console.log(`   Draft: ${draft}`);
      
      if (langSections.length > 0) {
        console.log(`   Sections: ${langSections.map(s => s.section).join(', ')}`);
      }
      console.log('');
    }

    // List all sections with details
    if (allSections.length > 0) {
      console.log('📋 All sections:');
      allSections.forEach(section => {
        console.log(`   ${section.language}/${section.section} - ${section.isPublished ? '✅ Published' : '❌ Draft'}`);
      });
    } else {
      console.log('⚠️  No sections found in database!');
      console.log('\n💡 Run migration script: npm run migrate-academic');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAcademicSections();
