const fs = require('fs');
const path = require('path');

/**
 * Test script to verify home.js data structure matches backend expectations
 * This helps ensure the import will work correctly
 */

const testDataStructure = () => {
  console.log('🧪 Testing home.js data structure...\n');

  try {
    // Path to the home.js translations file
    const homeFilePath = path.resolve('C:/Users/rooba/Desktop/ethronics.com (1)/ethronics.com (1)/src/translations/home.js');
    
    if (!fs.existsSync(homeFilePath)) {
      console.error(`❌ File not found: ${homeFilePath}`);
      process.exit(1);
    }

    console.log(`✅ Found file: ${homeFilePath}\n`);

    // Read and parse the file
    const fileContent = fs.readFileSync(homeFilePath, 'utf8');
    const cleanedContent = fileContent
      .replace(/export\s+const\s+homeTranslations\s*=\s*/, '')
      .replace(/;?\s*$/, '');
    
    const homeTranslations = new Function(`return ${cleanedContent}`)();

    console.log('📊 Data Structure Analysis:\n');

    // Check languages
    const languages = Object.keys(homeTranslations);
    console.log(`Languages found: ${languages.join(', ')}`);
    
    const expectedLanguages = ['en', 'am', 'om'];
    const missingLanguages = expectedLanguages.filter(lang => !languages.includes(lang));
    if (missingLanguages.length > 0) {
      console.log(`⚠️  Missing languages: ${missingLanguages.join(', ')}`);
    } else {
      console.log('✅ All expected languages present\n');
    }

    // Check sections for each language
    const expectedSections = ['hero', 'features', 'solutions', 'gallery', 'partnerships', 'cta'];
    
    languages.forEach(lang => {
      console.log(`\n📝 ${lang.toUpperCase()} Language:`);
      const sections = Object.keys(homeTranslations[lang]);
      console.log(`   Sections: ${sections.join(', ')}`);
      
      const missingSections = expectedSections.filter(sec => !sections.includes(sec));
      if (missingSections.length > 0) {
        console.log(`   ⚠️  Missing sections: ${missingSections.join(', ')}`);
      } else {
        console.log(`   ✅ All sections present`);
      }

      // Check structure of each section
      sections.forEach(section => {
        const content = homeTranslations[lang][section];
        const size = JSON.stringify(content).length;
        console.log(`   - ${section}: ${size} bytes`);

        // Validate specific section structures
        switch (section) {
          case 'hero':
            if (!content.badge || !content.slide1 || !content.buttons) {
              console.log(`     ⚠️  Hero missing required fields`);
            }
            break;
          case 'features':
            if (!content.title || !content.items || !Array.isArray(content.items)) {
              console.log(`     ⚠️  Features missing required fields or items not array`);
            } else {
              console.log(`     ✓ ${content.items.length} feature items`);
            }
            break;
          case 'solutions':
            if (!content.categories || !content.items) {
              console.log(`     ⚠️  Solutions missing categories or items`);
            } else {
              const itemCount = Object.keys(content.items).length;
              console.log(`     ✓ ${itemCount} solution items`);
            }
            break;
          case 'gallery':
            if (!content.items || !Array.isArray(content.items)) {
              console.log(`     ⚠️  Gallery items not array`);
            } else {
              console.log(`     ✓ ${content.items.length} gallery items`);
            }
            break;
          case 'partnerships':
            if (!content.types || !content.keyPartnerships) {
              console.log(`     ⚠️  Partnerships missing types or keyPartnerships`);
            } else {
              console.log(`     ✓ ${content.types.length} types, ${content.keyPartnerships.length} key partnerships`);
            }
            break;
          case 'cta':
            if (!content.buttons || !content.features) {
              console.log(`     ⚠️  CTA missing buttons or features`);
            } else {
              console.log(`     ✓ ${content.features.length} features`);
            }
            break;
        }
      });
    });

    // Summary
    console.log('\n\n📊 Summary:');
    const totalSections = languages.reduce((sum, lang) => {
      return sum + Object.keys(homeTranslations[lang]).length;
    }, 0);
    console.log(`   Total sections across all languages: ${totalSections}`);
    console.log(`   Expected sections: ${languages.length * expectedSections.length}`);
    
    if (totalSections === languages.length * expectedSections.length) {
      console.log('\n✅ Data structure is complete and ready for import!');
      console.log('\n📝 Run the import with:');
      console.log('   npm run import-home');
    } else {
      console.log('\n⚠️  Some sections may be missing. Review the output above.');
    }

  } catch (error) {
    console.error('\n❌ Error testing data structure:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

testDataStructure();
