require('dotenv').config();
const mongoose = require('mongoose');
const AboutContent = require('../models/AboutContent');
const BlogContent = require('../models/BlogContent');
const CareersContent = require('../models/CareersContent');

async function checkContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const aboutCount = await AboutContent.countDocuments();
    const blogCount = await BlogContent.countDocuments();
    const careersCount = await CareersContent.countDocuments();

    console.log('📊 Content Statistics:');
    console.log(`   About: ${aboutCount} sections`);
    console.log(`   Blog: ${blogCount} sections`);
    console.log(`   Careers: ${careersCount} sections`);

    if (aboutCount === 0 || blogCount === 0 || careersCount === 0) {
      console.log('\n⚠️  Some content is missing. Run importAllData.js to import all content.');
    } else {
      console.log('\n✅ All content types have data!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkContent();
