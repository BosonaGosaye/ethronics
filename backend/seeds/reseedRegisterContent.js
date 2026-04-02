const mongoose = require('mongoose');
const RegisterContent = require('../models/RegisterContent');
const { registerTranslations } = require('./translations/register');
require('dotenv').config();

const reseedRegisterContent = async () => {
  try {
    console.log('🌱 Reseeding Register Content with Correct Structure\n');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    console.log('📋 Database:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    console.log('🔍 Connecting...\n');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    console.log(`📦 Database: ${mongoose.connection.db.databaseName}\n`);

    // Delete existing register content
    const deleteResult = await RegisterContent.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing register content records\n`);

    let totalSeeded = 0;

    // Seed for each language
    for (const [lang, translations] of Object.entries(registerTranslations)) {
      console.log(`\n📝 Seeding ${lang.toUpperCase()} content...`);
      
      const sections = ['hero', 'objective', 'highlights', 'faq', 'form', 'gallery', 'nextSteps', 'cta'];
      
      for (const section of sections) {
        if (translations[section]) {
          try {
            await RegisterContent.create({
              language: lang,
              section: section,
              content: translations[section],
              isPublished: true
            });
            console.log(`   ✅ ${section}`);
            totalSeeded++;
          } catch (error) {
            console.error(`   ❌ ${section}: ${error.message}`);
          }
        }
      }
    }

    console.log(`\n============================================================`);
    console.log(`✅ RESEEDING COMPLETE`);
    console.log(`============================================================`);
    console.log(`📊 Total sections seeded: ${totalSeeded}`);
    console.log(`📊 Languages: 3 (en, am, om)`);
    console.log(`📊 Sections per language: 8`);
    console.log(`============================================================\n`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

reseedRegisterContent();
