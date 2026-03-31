require('dotenv').config();
const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

async function verifySeededData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('═══════════════════════════════════════');
    console.log('📊 VERIFYING SEEDED FEATURES DATA');
    console.log('═══════════════════════════════════════\n');

    const languages = ['en', 'am', 'om'];
    const languageNames = {
      en: 'English',
      am: 'Amharic (አማርኛ)',
      om: 'Oromifa (Afaan Oromoo)'
    };

    for (const lang of languages) {
      console.log(`\n📝 ${languageNames[lang]} (${lang}):`);
      console.log('─────────────────────────────────────');

      const content = await HomeContent.findOne({ 
        language: lang, 
        section: 'features' 
      });

      if (!content) {
        console.log('❌ No content found!');
        continue;
      }

      console.log(`✅ Content found`);
      console.log(`   Published: ${content.isPublished ? 'Yes' : 'No'}`);
      console.log(`   Title: ${content.content.title}`);
      console.log(`   Subtitle: ${content.content.subtitle.substring(0, 80)}...`);
      console.log(`   Total Features: ${content.content.items.length}`);
      console.log('');

      content.content.items.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.title}`);
        console.log(`      Icon: ${item.icon || 'N/A'}`);
        console.log(`      Category: ${item.category || 'N/A'}`);
        console.log(`      Status: ${item.status || 'N/A'}`);
        console.log(`      Has Image: ${item.image ? 'Yes' : 'No'}`);
        console.log(`      Has Detailed Description: ${item.detailedDescription ? 'Yes' : 'No'}`);
        console.log(`      Benefits Count: ${item.benefits?.length || 0}`);
        console.log(`      Applications Count: ${item.applications?.length || 0}`);
        console.log(`      Has Technical Details: ${item.technicalDetails ? 'Yes' : 'No'}`);
        console.log('');
      });
    }

    console.log('═══════════════════════════════════════');
    console.log('✅ VERIFICATION COMPLETE!');
    console.log('═══════════════════════════════════════\n');

    // Check data integrity
    console.log('🔍 DATA INTEGRITY CHECK:');
    console.log('─────────────────────────────────────');

    const enContent = await HomeContent.findOne({ language: 'en', section: 'features' });
    const amContent = await HomeContent.findOne({ language: 'am', section: 'features' });
    const omContent = await HomeContent.findOne({ language: 'om', section: 'features' });

    const checks = {
      'All languages have content': !!(enContent && amContent && omContent),
      'Same number of features': enContent?.content.items.length === amContent?.content.items.length && 
                                  amContent?.content.items.length === omContent?.content.items.length,
      'All features have icons': enContent?.content.items.every(item => item.icon),
      'All features have categories': enContent?.content.items.every(item => item.category),
      'All features have status': enContent?.content.items.every(item => item.status),
      'All features have benefits': enContent?.content.items.every(item => item.benefits?.length > 0),
      'All features have applications': enContent?.content.items.every(item => item.applications?.length > 0),
      'All features have technical details': enContent?.content.items.every(item => item.technicalDetails),
      'All features have detailed descriptions': enContent?.content.items.every(item => item.detailedDescription)
    };

    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`${passed ? '✅' : '❌'} ${check}`);
    });

    const allPassed = Object.values(checks).every(v => v === true);
    console.log('');
    console.log(allPassed ? '🎉 All integrity checks passed!' : '⚠️  Some checks failed');

    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verifySeededData();
