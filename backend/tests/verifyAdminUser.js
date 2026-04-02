require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function verifyAdminUser() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected successfully\n');
    
    console.log('👤 Checking for admin user...\n');
    
    const adminEmail = 'admin@ethronics.org';
    const admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      console.log('✅ Admin user found!');
      console.log('\n📋 User Details:');
      console.log('   Name:', admin.name);
      console.log('   Email:', admin.email);
      console.log('   Role:', admin.role);
      console.log('   Active:', admin.isActive);
      console.log('   Created:', admin.createdAt);
      console.log('\n✅ Admin user exists in this database');
    } else {
      console.log('❌ Admin user NOT found in this database!');
      console.log('\n💡 This means:');
      console.log('   - This database has not been seeded');
      console.log('   - Or you\'re connected to the wrong database');
      console.log('\n🔧 To fix:');
      console.log('   1. Run: npm run seed-production');
      console.log('   2. Or check your MONGODB_URI');
    }
    
    // Check total users
    const totalUsers = await User.countDocuments();
    console.log(`\n📊 Total users in database: ${totalUsers}`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

verifyAdminUser();
