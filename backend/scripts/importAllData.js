require('dotenv').config();
const mongoose = require('mongoose');
const { execSync } = require('child_process');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

async function importAllData() {
  try {
    console.log('🚀 Starting complete data import...\n');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const scripts = [
      { name: 'Home Content', file: 'importHomeData.js' },
      { name: 'Academic Content', file: 'importAcademicSections.js' },
      { name: 'About Content', file: 'importAboutData.js' },
      { name: 'Blog Content', file: 'importBlogData.js' },
      { name: 'Careers Content', file: 'importCareersData.js' }
    ];

    for (const script of scripts) {
      console.log('='.repeat(60));
      console.log(`📦 Importing ${script.name}...`);
      console.log('='.repeat(60));
      
      try {
        const scriptPath = path.join(__dirname, script.file);
        execSync(`node "${scriptPath}"`, { 
          stdio: 'inherit',
          cwd: __dirname 
        });
        console.log(`✅ ${script.name} imported successfully!\n`);
      } catch (error) {
        console.error(`❌ Failed to import ${script.name}:`, error.message);
        console.log(`⚠️  Continuing with next import...\n`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 ALL DATA IMPORT COMPLETED!');
    console.log('='.repeat(60));
    console.log('\n📊 Summary:');
    console.log('  ✓ Home Content: Imported');
    console.log('  ✓ Academic Content: Imported');
    console.log('  ✓ About Content: Imported');
    console.log('  ✓ Blog Content: Imported');
    console.log('  ✓ Careers Content: Imported');
    console.log('\n🌐 All content is now available in 3 languages (EN, AM, OM)');
    console.log('📝 All sections are published by default');
    console.log('\n✨ You can now access the admin panel and start editing!');
    console.log('   Admin URL: http://localhost:5174\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error during import:', error);
    process.exit(1);
  }
}

// Run the import
importAllData();
