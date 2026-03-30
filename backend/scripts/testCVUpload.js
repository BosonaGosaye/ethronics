const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5001/api';

async function testCVUpload() {
  try {
    console.log('🧪 Testing CV Upload Endpoint...\n');

    // Create a test PDF file
    const testFilePath = path.join(__dirname, 'test-resume.pdf');
    const testContent = '%PDF-1.4\n%Test Resume\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources <<\n/Font <<\n/F1 <<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\n>>\n>>\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Test Resume) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000015 00000 n\n0000000068 00000 n\n0000000125 00000 n\n0000000317 00000 n\ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n408\n%%EOF';
    
    fs.writeFileSync(testFilePath, testContent);
    console.log('✓ Created test PDF file');

    // Create form data
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(testFilePath));

    console.log('📤 Uploading test resume...');

    // Upload the file
    const response = await axios.post(`${API_URL}/applications/upload-resume`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    console.log('\n✅ Upload Successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));

    // Clean up test file
    fs.unlinkSync(testFilePath);
    console.log('\n✓ Cleaned up test file');

    console.log('\n🎉 CV Upload Test PASSED!');
    console.log('\nYou can now test the full application flow in the browser.');

  } catch (error) {
    console.error('\n❌ CV Upload Test FAILED!');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Is the backend running on port 5001?');
    } else {
      console.error('Error:', error.message);
    }

    // Clean up test file if it exists
    const testFilePath = path.join(__dirname, 'test-resume.pdf');
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }

    process.exit(1);
  }
}

// Run the test
testCVUpload();
