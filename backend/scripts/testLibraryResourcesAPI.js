const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

// Test credentials
const TEST_ADMIN = {
  email: 'admin@ethronics.org',
  password: 'Admin@123456'
};

async function testLibraryResourcesAPI() {
  console.log('='.repeat(60));
  console.log('LIBRARY RESOURCES API TEST');
  console.log('='.repeat(60));

  let token = null;

  try {
    // Step 1: Login
    console.log('\n1. Logging in as admin...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, TEST_ADMIN);
    
    if (loginResponse.data.success) {
      token = loginResponse.data.token;
      console.log('✓ Login successful');
      console.log('Token:', token.substring(0, 20) + '...');
    } else {
      console.log('✗ Login failed');
      return;
    }

    // Step 2: Test admin endpoint
    console.log('\n2. Fetching resources from admin endpoint...');
    const adminResponse = await axios.get(`${API_URL}/library-resources/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Status:', adminResponse.status);
    console.log('Success:', adminResponse.data.success);
    console.log('Total resources:', adminResponse.data.pagination?.total || 0);
    console.log('Resources returned:', adminResponse.data.data?.length || 0);
    
    if (adminResponse.data.data && adminResponse.data.data.length > 0) {
      console.log('\nFirst resource:');
      const first = adminResponse.data.data[0];
      console.log('  - ID:', first._id);
      console.log('  - Title:', first.title);
      console.log('  - Author:', first.author);
      console.log('  - Published:', first.isPublished);
      console.log('  - Featured:', first.isFeatured);
    }

    // Step 3: Test public endpoint
    console.log('\n3. Fetching resources from public endpoint...');
    const publicResponse = await axios.get(`${API_URL}/library-resources/public`);
    
    console.log('Status:', publicResponse.status);
    console.log('Success:', publicResponse.data.success);
    console.log('Total resources:', publicResponse.data.pagination?.total || 0);
    console.log('Resources returned:', publicResponse.data.data?.length || 0);

    // Step 4: Test statistics
    console.log('\n4. Fetching statistics...');
    const statsResponse = await axios.get(`${API_URL}/library-resources/admin/statistics`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Status:', statsResponse.status);
    console.log('Success:', statsResponse.data.success);
    console.log('Statistics:', JSON.stringify(statsResponse.data.data, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('TEST COMPLETED SUCCESSFULLY');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n✗ ERROR:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run the test
testLibraryResourcesAPI();
