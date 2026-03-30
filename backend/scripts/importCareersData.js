require('dotenv').config();
const mongoose = require('mongoose');
const CareersContent = require('../models/CareersContent');

// Import careers translations
const careersTranslations = {
  en: require('../../src/translations/careers').careersTranslations.en,
  am: require('../../src/translations/careers').careersTranslations.am,
  om: require('../../src/translations/careers').careersTranslations.om
};

const importCareersData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing careers content
    await CareersContent.deleteMany({});
    console.log('Cleared existing careers content');

    const sections = ['hero', 'search', 'categories', 'listings', 'benefits', 'growth', 'process', 'partners'];
    const languages = ['en', 'am', 'om'];
    
    let importedCount = 0;

    for (const language of languages) {
      console.log(`\nImporting ${language.toUpperCase()} content...`);
      
      for (const section of sections) {
        const content = careersTranslations[language][section];
        
        if (content) {
          await CareersContent.create({
            language,
            section,
            content,
            isPublished: true
          });
          
          importedCount++;
          console.log(`✓ Imported ${language}/${section}`);
        } else {
          console.log(`✗ Missing ${language}/${section}`);
        }
      }
    }

    console.log(`\n✅ Successfully imported ${importedCount} careers sections`);
    console.log(`   Total: ${importedCount} sections (${sections.length} sections × ${languages.length} languages)`);
    
    // Display summary
    const summary = await CareersContent.aggregate([
      {
        $group: {
          _id: '$language',
          total: { $sum: 1 },
          published: {
            $sum: { $cond: ['$isPublished', 1, 0] }
          }
        }
      }
    ]);
    
    console.log('\nSummary by language:');
    summary.forEach(lang => {
      console.log(`  ${lang._id}: ${lang.total} sections (${lang.published} published)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error importing careers data:', error);
    process.exit(1);
  }
};

importCareersData();
