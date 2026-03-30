const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function testManufacturingAPI() {
  console.log('🧪 Testing Manufacturing API...\n');

  try {
    // Test hero section
    console.log('📝 Testing Hero Section:');
    const heroResponse = await axios.get(`${API_URL}/manufacturing/en/hero`);
    console.log('✅ Hero EN:', heroResponse.data.success ? 'Success' : 'Failed');
    console.log('   Data keys:', Object.keys(heroResponse.data.data.content || {}));
    
    // Test capabilities section
    console.log('\n📝 Testing Capabilities Section:');
    const capResponse = await axios.get(`${API_URL}/manufacturing/en/capabilities`);
    console.log('✅ Capabilities EN:', capResponse.data.success ? 'Success' : 'Failed');
    console.log('   Data keys:', Object.keys(capResponse.data.data.content || {}));
    console.log('   Items count:', capResponse.data.data.content?.items?.length || 0);
    
    if (capResponse.data.data.content?.items?.length > 0) {
      const firstItem = capResponse.data.data.content.items[0];
      console.log('   First item:', firstItem.title);
      console.log('   Details count:', firstItem.details?.length || 0);
    }

    // Test all languages
    console.log('\n📝 Testing All Languages:');
    for (const lang of ['en', 'am', 'om']) {
      const response = await axios.get(`${API_URL}/manufacturing/${lang}/hero`);
      console.log(`✅ ${lang.toUpperCase()}: ${response.data.success ? 'Success' : 'Failed'}`);
    }

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testManufacturingAPI();
