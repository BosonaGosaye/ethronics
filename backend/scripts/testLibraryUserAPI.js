const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';

async function testLibraryUserAPI() {
  console.log('🧪 Testing Library User API...\n');

  try {
    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:5001/health');
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Register a test user
    console.log('2️⃣ Testing user registration...');
    const registerData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      role: 'student',
      institution: 'Test University'
    };
    
    try {
      const registerResponse = await axios.post(`${API_URL}/library-users/register`, registerData);
      console.log('✅ Registration successful:', {
        success: registerResponse.data.success,
        user: registerResponse.data.data.user.name,
        email: registerResponse.data.data.user.email
      });
      console.log('Token received:', registerResponse.data.data.token ? 'Yes' : 'No');
      console.log('');

      const token = registerResponse.data.data.token;

      // Test 3: Get profile
      console.log('3️⃣ Testing get profile...');
      const profileResponse = await axios.get(`${API_URL}/library-users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Profile retrieved:', {
        name: profileResponse.data.data.name,
        email: profileResponse.data.data.email,
        role: profileResponse.data.data.role
      });
      console.log('');

      // Test 4: Get dashboard
      console.log('4️⃣ Testing dashboard...');
      const dashboardResponse = await axios.get(`${API_URL}/library-users/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Dashboard data:', dashboardResponse.data.data);
      console.log('');

      // Test 5: Login
      console.log('5️⃣ Testing login...');
      const loginResponse = await axios.post(`${API_URL}/library-users/login`, {
        email: registerData.email,
        password: registerData.password
      });
      console.log('✅ Login successful:', {
        success: loginResponse.data.success,
        user: loginResponse.data.data.user.name
      });
      console.log('');

      console.log('🎉 All tests passed!');
    } catch (error) {
      if (error.response) {
        console.error('❌ API Error:', {
          status: error.response.status,
          message: error.response.data.message || error.response.data
        });
      } else {
        console.error('❌ Error:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    console.error('Make sure the backend server is running on port 5001');
  }
}

testLibraryUserAPI();
