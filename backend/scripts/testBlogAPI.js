require('dotenv').config();
const mongoose = require('mongoose');
const BlogContent = require('../models/BlogContent');

async function testBlogAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test: Find all blog content for 'en' language
    const enContent = await BlogContent.find({ language: 'en' }).sort({ section: 1 });
    console.log(`📊 Blog Content for 'en': ${enContent.length} sections`);
    
    if (enContent.length > 0) {
      console.log('\n📋 Sections found:');
      enContent.forEach(item => {
        console.log(`   - ${item.section} (${item.isPublished ? 'Published' : 'Draft'})`);
      });
    } else {
      console.log('⚠️  No blog content found for language "en"');
    }

    // Check all languages
    const allContent = await BlogContent.find({});
    console.log(`\n📊 Total blog content in database: ${allContent.length}`);
    
    const byLanguage = {};
    allContent.forEach(item => {
      byLanguage[item.language] = (byLanguage[item.language] || 0) + 1;
    });
    
    console.log('\n🌐 By Language:');
    Object.entries(byLanguage).forEach(([lang, count]) => {
      console.log(`   ${lang}: ${count} sections`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testBlogAPI();
