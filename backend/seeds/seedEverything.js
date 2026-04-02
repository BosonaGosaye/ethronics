require('dotenv').config();
const mongoose = require('mongoose');
const { execSync } = require('child_process');

async function seedEverything() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🌱 ETHRONICS DATABASE SEEDING - COMPLETE SETUP');
    console.log('='.repeat(70));
    
    console.log('\n🔍 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully\n');
    
    // Close the connection before running child processes
    await mongoose.connection.close();
    console.log('📋 Starting seeding process...\n');
    
    // Step 1: Seed Admin User
    console.log('=' .repeat(70));
    console.log('STEP 1: Creating Admin User');
    console.log('='.repeat(70));
    try {
      execSync('node seeds/seedAdminUser.js', { stdio: 'inherit' });
      console.log('✅ Admin user seeded successfully\n');
    } catch (error) {
      console.error('❌ Failed to seed admin user\n');
      throw error;
    }
    
    // Step 2: Seed All Translations
    console.log('=' .repeat(70));
    console.log('STEP 2: Seeding All Translations');
    console.log('='.repeat(70));
    try {
      execSync('node seeds/seedAllTranslations.js', { stdio: 'inherit' });
      console.log('✅ All translations seeded successfully\n');
    } catch (error) {
      console.error('❌ Failed to seed translations\n');
      throw error;
    }
    
    // Final Summary
    console.log('\n' + '='.repeat(70));
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(70));
    
    console.log('\n📊 Summary:');
    console.log('  ✅ Admin user created');
    console.log('  ✅ All translations seeded (12 content types × 3 languages)');
    console.log('  ✅ Database is ready for use');
    
    console.log('\n🔐 Admin Login Credentials:');
    console.log('  Email:    admin@ethronics.org');
    console.log('  Password: Admin@123456');
    
    console.log('\n🚀 Next Steps:');
    console.log('  1. Start the backend server: npm run dev');
    console.log('  2. Login to admin panel with credentials above');
    console.log('  3. Verify content is loaded in all languages');
    console.log('  4. Deploy to Render when ready');
    
    console.log('\n' + '='.repeat(70));
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding process:', error.message);
    process.exit(1);
  }
}

// Run the complete seeding
seedEverything();
