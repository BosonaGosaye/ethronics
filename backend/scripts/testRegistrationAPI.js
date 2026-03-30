const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function testRegistrationSubmit() {
  console.log('🧪 Testing Registration Submission...\n');

  const testData = {
    studentName: "Test Student",
    studentAge: 12,
    studentGender: "male",
    grade: "7",
    school: "Test School",
    studentEmail: "student@test.com",
    experience: "noExperience",
    session: "morning",
    guardianName: "Test Guardian",
    guardianEmail: "guardian@test.com",
    emergency: "+251912345678",
    language: "en"
  };

  try {
    console.log('📤 Sending registration data:', JSON.stringify(testData, null, 2));
    
    const response = await axios.post(`${API_URL}/registrations/submit`, testData);
    
    console.log('\n✅ Registration submitted successfully!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    return response.data.data._id;
  } catch (error) {
    console.error('\n❌ Registration failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

async function testGetRegistrations() {
  console.log('\n🧪 Testing Get All Registrations...\n');

  try {
    // First, login as admin to get token
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@ethronics.org',
      password: 'Admin@123456'
    });

    const token = loginResponse.data.token;
    console.log('✅ Admin login successful');

    // Get registrations
    const response = await axios.get(`${API_URL}/registrations/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('\n✅ Registrations fetched successfully!');
    console.log(`Total registrations: ${response.data.total}`);
    console.log(`Current page: ${response.data.currentPage}`);
    console.log(`Total pages: ${response.data.totalPages}`);
    console.log('\nFirst registration:', JSON.stringify(response.data.data[0], null, 2));
  } catch (error) {
    console.error('\n❌ Failed to fetch registrations!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

async function runTests() {
  try {
    await testRegistrationSubmit();
    await testGetRegistrations();
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.log('\n❌ Tests failed!');
    process.exit(1);
  }
}

runTests();
