#!/usr/bin/env node

/**
 * Environment Variables Checker
 * Run this before deploying to verify all required variables are set
 */

require('dotenv').config();

const requiredVars = {
  'MONGODB_URI': 'MongoDB connection string',
  'JWT_SECRET': 'JWT secret key for authentication'
};

const recommendedVars = {
  'NODE_ENV': 'Environment (production/development)',
  'CLIENT_URL': 'Frontend URL',
  'ADMIN_URL': 'Admin panel URL',
  'CLOUDINARY_CLOUD_NAME': 'Cloudinary cloud name',
  'CLOUDINARY_API_KEY': 'Cloudinary API key',
  'CLOUDINARY_API_SECRET': 'Cloudinary API secret'
};

const optionalVars = {
  'JWT_EXPIRE': 'JWT expiration time',
  'EMAIL_HOST': 'Email SMTP host',
  'EMAIL_PORT': 'Email SMTP port',
  'EMAIL_USER': 'Email username',
  'EMAIL_PASS': 'Email password',
  'EMAIL_FROM': 'Email from address',
  'MAX_FILE_SIZE': 'Maximum file upload size'
};

console.log('🔍 Checking Environment Variables...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('📋 Required Variables:');
for (const [key, description] of Object.entries(requiredVars)) {
  if (process.env[key]) {
    console.log(`  ✅ ${key}: Set (${description})`);
  } else {
    console.log(`  ❌ ${key}: MISSING (${description})`);
    hasErrors = true;
  }
}

// Check recommended variables
console.log('\n📋 Recommended Variables:');
for (const [key, description] of Object.entries(recommendedVars)) {
  if (process.env[key]) {
    console.log(`  ✅ ${key}: Set (${description})`);
  } else {
    console.log(`  ⚠️  ${key}: Not set (${description})`);
    hasWarnings = true;
  }
}

// Check optional variables
console.log('\n📋 Optional Variables:');
for (const [key, description] of Object.entries(optionalVars)) {
  if (process.env[key]) {
    console.log(`  ✅ ${key}: Set (${description})`);
  } else {
    console.log(`  ℹ️  ${key}: Not set (${description})`);
  }
}

// Test MongoDB connection string format
console.log('\n🔍 MongoDB Connection String Check:');
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  if (uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://')) {
    console.log('  ✅ Format looks correct');
    
    // Hide password in display
    const displayUri = uri.replace(/:[^:@]+@/, ':****@');
    console.log(`  📝 URI: ${displayUri}`);
  } else {
    console.log('  ❌ Invalid format. Should start with mongodb:// or mongodb+srv://');
    hasErrors = true;
  }
} else {
  console.log('  ❌ MONGODB_URI not set');
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log('❌ ERRORS FOUND: Please fix required variables before deploying');
  console.log('\nTo fix:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Fill in all required values');
  console.log('3. Add the same values to Render Environment Variables');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  WARNINGS: Some recommended variables are missing');
  console.log('The app will work but some features may not function properly');
  process.exit(0);
} else {
  console.log('✅ ALL CHECKS PASSED: Ready to deploy!');
  process.exit(0);
}
