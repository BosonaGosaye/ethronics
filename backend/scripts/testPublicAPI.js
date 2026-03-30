const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testPublicAPI() {
  console.log('Testing Library Resources Public API\n');
  console.log('===========================================\n');

  try {
    // Test 1: Get all resources
    console.log('Test 1: GET /library-resources/public');
    const response1 = await axios.get(`${API_URL}/library-resources/public`);
    console.log(`Status: ${response1.status}`);
    console.log(`Success: ${response1.data.success}`);
    console.log(`Total resources: ${response1.data.pagination.total}`);
    console.log(`Resources returned: ${response1.data.data.length}`);
    
    if (response1.data.data.length > 0) {
      const resource = response1.data.data[0];
      console.log(`\nFirst resource:`);
      console.log(`  ID: ${resource._id}`);
      console.log(`  Title (EN): ${resource.title?.en}`);
      console.log(`  Type: ${resource.type}`);
      console.log(`  Category: ${resource.category}`);
    }
    console.log('\n-------------------------------------------\n');

    // Test 2: Get with language parameter
    console.log('Test 2: GET /library-resources/public?language=en');
    const response2 = await axios.get(`${API_URL}/library-resources/public?language=en`);
    console.log(`Status: ${response2.status}`);
    console.log(`Resources returned: ${response2.data.data.length}`);
    console.log('\n-------------------------------------------\n');

    // Test 3: Get with category filter
    console.log('Test 3: GET /library-resources/public?category=science');
    const response3 = await axios.get(`${API_URL}/library-resources/public?category=science`);
    console.log(`Status: ${response3.status}`);
    console.log(`Resources returned: ${response3.data.data.length}`);
    console.log('\n-------------------------------------------\n');

    // Test 4: Get with type filter
    console.log('Test 4: GET /library-resources/public?type=book');
    const response4 = await axios.get(`${API_URL}/library-resources/public?type=book`);
    console.log(`Status: ${response4.status}`);
    console.log(`Resources returned: ${response4.data.data.length}`);
    console.log('\n-------------------------------------------\n');

    // Test 5: Get with all filters
    console.log('Test 5: GET /library-resources/public?language=en&type=book&category=science');
    const response5 = await axios.get(`${API_URL}/library-resources/public?language=en&type=book&category=science`);
    console.log(`Status: ${response5.status}`);
    console.log(`Resources returned: ${response5.data.data.length}`);
    console.log('\n-------------------------------------------\n');

    console.log('✓ All tests completed successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testPublicAPI();
