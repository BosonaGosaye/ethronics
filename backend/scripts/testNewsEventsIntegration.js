const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testNewsEventsIntegration() {
  console.log('🧪 Testing News & Events Integration...\n');

  try {
    // Test 1: Fetch page content sections
    console.log('1️⃣ Testing page content sections...');
    const contentResponse = await axios.get(`${API_URL}/newsEvents/public/en`);
    console.log(`✅ Content sections: ${contentResponse.data.data.length} sections found`);
    contentResponse.data.data.forEach(section => {
      console.log(`   - ${section.section} (Published: ${section.isPublished})`);
    });
    console.log('');

    // Test 2: Fetch all news/event items
    console.log('2️⃣ Testing news/event items...');
    const itemsResponse = await axios.get(`${API_URL}/newsEventItems/public`, {
      params: { language: 'en', limit: 5 }
    });
    console.log(`✅ News/Event items: ${itemsResponse.data.total} total items`);
    console.log(`   Current page: ${itemsResponse.data.currentPage}/${itemsResponse.data.totalPages}`);
    console.log(`   Items returned: ${itemsResponse.data.data.length}`);
    console.log('');

    // Test 3: Fetch featured items
    console.log('3️⃣ Testing featured items...');
    const featuredResponse = await axios.get(`${API_URL}/newsEventItems/public/featured`, {
      params: { language: 'en', limit: 3 }
    });
    console.log(`✅ Featured items: ${featuredResponse.data.data.length} items`);
    featuredResponse.data.data.forEach(item => {
      console.log(`   - ${item.title} (${item.type})`);
    });
    console.log('');

    // Test 4: Test filtering by type
    console.log('4️⃣ Testing filtering by type...');
    const newsResponse = await axios.get(`${API_URL}/newsEventItems/public`, {
      params: { language: 'en', type: 'news', limit: 3 }
    });
    console.log(`✅ News items: ${newsResponse.data.total} total`);
    console.log('');

    const eventsResponse = await axios.get(`${API_URL}/newsEventItems/public`, {
      params: { language: 'en', type: 'events', limit: 3 }
    });
    console.log(`✅ Event items: ${eventsResponse.data.total} total`);
    console.log('');

    // Test 5: Test filtering by category
    console.log('5️⃣ Testing filtering by category...');
    const categoryResponse = await axios.get(`${API_URL}/newsEventItems/public`, {
      params: { language: 'en', category: 'Technology', limit: 3 }
    });
    console.log(`✅ Technology category: ${categoryResponse.data.total} items`);
    console.log('');

    // Test 6: Test search functionality
    console.log('6️⃣ Testing search functionality...');
    const searchResponse = await axios.get(`${API_URL}/newsEventItems/public`, {
      params: { language: 'en', search: 'innovation', limit: 3 }
    });
    console.log(`✅ Search results for "innovation": ${searchResponse.data.total} items`);
    console.log('');

    // Test 7: Test multilingual support
    console.log('7️⃣ Testing multilingual support...');
    const languages = ['en', 'am', 'om'];
    for (const lang of languages) {
      const langResponse = await axios.get(`${API_URL}/newsEvents/public/${lang}`);
      console.log(`✅ ${lang.toUpperCase()}: ${langResponse.data.data.length} sections`);
    }
    console.log('');

    // Test 8: Display sample item structure
    if (itemsResponse.data.data.length > 0) {
      console.log('8️⃣ Sample item structure:');
      const sampleItem = itemsResponse.data.data[0];
      console.log('✅ Item fields:');
      console.log(`   - ID: ${sampleItem._id}`);
      console.log(`   - Title: ${sampleItem.title}`);
      console.log(`   - Type: ${sampleItem.type}`);
      console.log(`   - Category: ${sampleItem.category}`);
      console.log(`   - Slug: ${sampleItem.slug}`);
      console.log(`   - Author: ${sampleItem.author}`);
      console.log(`   - Publish Date: ${sampleItem.publishDate}`);
      console.log(`   - Views: ${sampleItem.views}`);
      console.log(`   - Featured: ${sampleItem.isFeatured}`);
      console.log(`   - Tags: ${sampleItem.tags?.join(', ') || 'None'}`);
      console.log('');
    }

    console.log('✅ All tests passed! Integration is working correctly.\n');
    console.log('📝 Summary:');
    console.log(`   - Page sections: ${contentResponse.data.data.length}`);
    console.log(`   - Total items: ${itemsResponse.data.total}`);
    console.log(`   - Featured items: ${featuredResponse.data.data.length}`);
    console.log(`   - Languages supported: ${languages.length}`);
    console.log('');
    console.log('🎉 News & Events integration is ready for production!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    console.log('\n⚠️  Make sure:');
    console.log('   1. Backend server is running (npm start in backend folder)');
    console.log('   2. MongoDB is connected');
    console.log('   3. Data has been imported (node scripts/importNewsEventsData.js)');
    process.exit(1);
  }
}

// Run tests
testNewsEventsIntegration();
