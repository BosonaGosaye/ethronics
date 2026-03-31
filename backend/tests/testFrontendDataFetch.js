require('dotenv').config();
const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

async function testDataFetch() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('═══════════════════════════════════════');
    console.log('🧪 TESTING DATA FETCH SIMULATION');
    console.log('═══════════════════════════════════════\n');

    // Test 1: Fetch English features
    console.log('📝 Test 1: Fetching English features...');
    const enContent = await HomeContent.findOne({ 
      language: 'en', 
      section: 'features',
      isPublished: true 
    });

    if (enContent) {
      console.log('✅ English content found');
      console.log(`   Title: ${enContent.content.title}`);
      console.log(`   Items: ${enContent.content.items?.length || 0}`);
      console.log(`   Published: ${enContent.isPublished}`);
      
      if (enContent.content.items && enContent.content.items.length > 0) {
        console.log('\n   First Feature:');
        const first = enContent.content.items[0];
        console.log(`   - Title: ${first.title}`);
        console.log(`   - Icon: ${first.icon}`);
        console.log(`   - Has Image: ${!!first.image}`);
        console.log(`   - Has Detailed Description: ${!!first.detailedDescription}`);
        console.log(`   - Benefits: ${first.benefits?.length || 0}`);
        console.log(`   - Applications: ${first.applications?.length || 0}`);
      }
    } else {
      console.log('❌ No English content found or not published');
    }

    // Test 2: Fetch Amharic features
    console.log('\n📝 Test 2: Fetching Amharic features...');
    const amContent = await HomeContent.findOne({ 
      language: 'am', 
      section: 'features',
      isPublished: true 
    });

    if (amContent) {
      console.log('✅ Amharic content found');
      console.log(`   Title: ${amContent.content.title}`);
      console.log(`   Items: ${amContent.content.items?.length || 0}`);
      console.log(`   Published: ${amContent.isPublished}`);
    } else {
      console.log('❌ No Amharic content found or not published');
    }

    // Test 3: Fetch Oromifa features
    console.log('\n📝 Test 3: Fetching Oromifa features...');
    const omContent = await HomeContent.findOne({ 
      language: 'om', 
      section: 'features',
      isPublished: true 
    });

    if (omContent) {
      console.log('✅ Oromifa content found');
      console.log(`   Title: ${omContent.content.title}`);
      console.log(`   Items: ${omContent.content.items?.length || 0}`);
      console.log(`   Published: ${omContent.isPublished}`);
    } else {
      console.log('❌ No Oromifa content found or not published');
    }

    // Test 4: Simulate API response structure
    console.log('\n📝 Test 4: Simulating API response structure...');
    if (enContent) {
      const apiResponse = {
        success: true,
        data: enContent.content
      };
      
      console.log('✅ API Response Structure:');
      console.log(`   response.data.title = "${apiResponse.data.title}"`);
      console.log(`   response.data.items.length = ${apiResponse.data.items?.length || 0}`);
      console.log('\n   Frontend should access:');
      console.log(`   - content.title (from response.data)`);
      console.log(`   - content.items (from response.data)`);
    }

    // Test 5: Check admin panel data structure
    console.log('\n📝 Test 5: Simulating Admin Panel fetch...');
    const adminContent = await HomeContent.findOne({ 
      language: 'en', 
      section: 'features'
    });

    if (adminContent) {
      const adminApiResponse = {
        success: true,
        data: {
          _id: adminContent._id,
          language: adminContent.language,
          section: adminContent.section,
          content: adminContent.content,
          isPublished: adminContent.isPublished,
          createdAt: adminContent.createdAt,
          updatedAt: adminContent.updatedAt
        }
      };
      
      console.log('✅ Admin API Response Structure:');
      console.log(`   response.data.data._id = "${adminApiResponse.data._id}"`);
      console.log(`   response.data.data.content.title = "${adminApiResponse.data.content.title}"`);
      console.log(`   response.data.data.content.items.length = ${adminApiResponse.data.content.items?.length || 0}`);
      console.log('\n   Admin Panel should access:');
      console.log(`   - response.data.data (full document)`);
      console.log(`   - response.data.data.content (content object)`);
    }

    console.log('\n═══════════════════════════════════════');
    console.log('✅ DATA FETCH TEST COMPLETE!');
    console.log('═══════════════════════════════════════');

    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testDataFetch();
