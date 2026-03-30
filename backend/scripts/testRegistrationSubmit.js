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
    console.log('📤 Submitting registration with data:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('');

    const response = await axios.post(`${API_URL}/registrations/submit`, testData);

    console.log('✅ Registration submitted successfully!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    console.log('');
    console.log('Registration ID:', response.data.data._id);
  } catch (error) {
    console.error('❌ Registration submission failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

testRegistrationSubmit();
