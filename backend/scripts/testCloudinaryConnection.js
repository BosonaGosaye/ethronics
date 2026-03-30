const cloudinary = require('cloudinary').v2;
require('dotenv').config();

console.log('Testing Cloudinary Connection...\n');

// Display credentials (masked)
console.log('Configuration:');
console.log('- Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('- API Key:', process.env.CLOUDINARY_API_KEY?.substring(0, 4) + '...');
console.log('- API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' : 'NOT SET');
console.log('- Folder:', process.env.CLOUDINARY_FOLDER);
console.log('');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test connection by fetching account info
async function testConnection() {
  try {
    console.log('Attempting to connect to Cloudinary...\n');
    
    // Try to get usage info (this will fail if credentials are wrong)
    const result = await cloudinary.api.usage();
    
    console.log('✅ SUCCESS! Connected to Cloudinary\n');
    console.log('Account Info:');
    console.log('- Plan:', result.plan);
    console.log('- Credits Used:', result.credits?.usage || 0);
    console.log('- Credits Limit:', result.credits?.limit || 'N/A');
    console.log('- Storage Used:', Math.round(result.storage?.usage / 1024 / 1024) + ' MB');
    console.log('- Bandwidth Used:', Math.round(result.bandwidth?.usage / 1024 / 1024) + ' MB');
    console.log('\n✨ Your Cloudinary account is working correctly!');
    
  } catch (error) {
    console.error('❌ FAILED to connect to Cloudinary\n');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Cloud name is incorrect');
    console.error('2. API key is incorrect');
    console.error('3. API secret is incorrect');
    console.error('4. Cloudinary account does not exist');
    console.error('\nPlease verify your credentials at: https://console.cloudinary.com/settings/c-');
    console.error('\nYou can find your credentials in:');
    console.error('- Dashboard > Settings > Account');
    console.error('- Look for "Cloud name", "API Key", and "API Secret"');
  }
}

testConnection();
