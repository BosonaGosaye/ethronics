require('dotenv').config();
const mongoose = require('mongoose');
const FAQContent = require('../models/FAQContent');
const { faqTranslations } = require('../../src/translations/faq');

async function importFAQData() {
  try {
    console.log('🚀 Starting FAQ content import...\n');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const languages = ['en', 'am', 'om'];
    let imported = 0;
    let updated = 0;

    for (const lang of languages) {
      console.log(`📝 Processing ${lang.toUpperCase()} content...`);
      
      const translation = faqTranslations[lang];
      
      // Import each section
      const sections = ['hero', 'search', 'categories', 'faqData', 'contact'];
      
      for (const section of sections) {
        const content = translation[section];
        
        const result = await FAQContent.findOneAndUpdate(
          { language: lang, section },
          {
            language: lang,
            section,
            content,
            isPublished: true
          },
          { upsert: true, new: true, runValidators: true }
        );
        
        if (result.isNew) {
          imported++;
          console.log(`   ✅ Imported: ${section}`);
        } else {
          updated++;
          console.log(`   🔄 Updated: ${section}`);
        }
      }
      
      console.log('');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Import completed successfully!`);
    console.log(`   📊 Total sections: ${imported + updated}`);
    console.log(`   ➕ New imports: ${imported}`);
    console.log(`   🔄 Updates: ${updated}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verify the import
    const totalCount = await FAQContent.countDocuments();
    const publishedCount = await FAQContent.countDocuments({ isPublished: true });
    
    console.log('📊 Database Statistics:');
    console.log(`   Total sections: ${totalCount}`);
    console.log(`   Published: ${publishedCount}`);
    console.log(`   Draft: ${totalCount - publishedCount}\n`);

    // Show breakdown by language
    console.log('🌐 By Language:');
    for (const lang of languages) {
      const count = await FAQContent.countDocuments({ language: lang });
      console.log(`   ${lang.toUpperCase()}: ${count} sections`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing FAQ data:', error);
    process.exit(1);
  }
}

importFAQData();
