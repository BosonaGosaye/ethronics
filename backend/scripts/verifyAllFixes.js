require('dotenv').config();
const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');
const AcademicSection = require('../models/AcademicSection');
const AboutContent = require('../models/AboutContent');
const BlogContent = require('../models/BlogContent');
const CareersContent = require('../models/CareersContent');

async function verifyAllFixes() {
  try {
    console.log('🔍 Verifying All Fixes...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    // Check all content counts
    const homeSections = await HomeContent.countDocuments();
    const academicSections = await AcademicSection.countDocuments();
    const aboutSections = await AboutContent.countDocuments();
    const blogSections = await BlogContent.countDocuments();
    const careersSections = await CareersContent.countDocuments();
    
    const total = homeSections + academicSections + aboutSections + blogSections + careersSections;

    console.log('📊 Content Statistics:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Home:     ${homeSections} sections ${homeSections === 18 ? '✅' : '❌ Expected 18'}`);
    console.log(`   Academic: ${academicSections} sections ${academicSections === 21 ? '✅' : '❌ Expected 21'}`);
    console.log(`   About:    ${aboutSections} sections ${aboutSections === 15 ? '✅' : '❌ Expected 15'}`);
    console.log(`   Blog:     ${blogSections} sections ${blogSections === 21 ? '✅' : '❌ Expected 21'}`);
    console.log(`   Careers:  ${careersSections} sections ${careersSections === 24 ? '✅' : '❌ Expected 24'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   TOTAL:    ${total} sections ${total === 99 ? '✅' : '❌ Expected 99'}\n`);

    // Check published vs draft
    const homePublished = await HomeContent.countDocuments({ isPublished: true });
    const academicPublished = await AcademicSection.countDocuments({ isPublished: true });
    const aboutPublished = await AboutContent.countDocuments({ isPublished: true });
    const blogPublished = await BlogContent.countDocuments({ isPublished: true });
    const careersPublished = await CareersContent.countDocuments({ isPublished: true });

    console.log('📢 Published Content:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Home:     ${homePublished}/${homeSections} published`);
    console.log(`   Academic: ${academicPublished}/${academicSections} published`);
    console.log(`   About:    ${aboutPublished}/${aboutSections} published`);
    console.log(`   Blog:     ${blogPublished}/${blogSections} published`);
    console.log(`   Careers:  ${careersPublished}/${careersSections} published`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Check languages
    const languages = ['en', 'am', 'om'];
    console.log('🌐 Language Distribution:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    for (const lang of languages) {
      const homeCount = await HomeContent.countDocuments({ language: lang });
      const academicCount = await AcademicSection.countDocuments({ language: lang });
      const aboutCount = await AboutContent.countDocuments({ language: lang });
      const blogCount = await BlogContent.countDocuments({ language: lang });
      const careersCount = await CareersContent.countDocuments({ language: lang });
      const langTotal = homeCount + academicCount + aboutCount + blogCount + careersCount;
      
      console.log(`   ${lang.toUpperCase()}: ${langTotal} sections (H:${homeCount} A:${academicCount} Ab:${aboutCount} B:${blogCount} C:${careersCount})`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Final verdict
    console.log('🎯 Verification Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const allCorrect = total === 99 && 
                       homeSections === 18 && 
                       academicSections === 21 && 
                       aboutSections === 15 && 
                       blogSections === 21 && 
                       careersSections === 24;

    if (allCorrect) {
      console.log('   ✅ All content counts are correct!');
      console.log('   ✅ Database is properly populated');
      console.log('   ✅ Ready for testing\n');
      
      console.log('📝 Next Steps:');
      console.log('   1. Restart backend server (if not already done)');
      console.log('   2. Open admin panel: http://localhost:5174');
      console.log('   3. Login and verify dashboards load correctly');
      console.log('   4. Check browser console for errors\n');
    } else {
      console.log('   ⚠️  Content counts are incorrect');
      console.log('   ℹ️  Run: node scripts/importAllData.js\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyAllFixes();
