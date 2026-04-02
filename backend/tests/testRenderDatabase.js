/**
 * Test script to check Render's database
 * This will help us understand what database Render is actually using
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const HomeContent = require('../models/HomeContent');

async function testDatabase() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🔍 TESTING RENDER DATABASE CONNECTION');
    console.log('='.repeat(70));
    
    console.log('\n📋 Connection Details:');
    console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    console.log('Connecting...\n');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected successfully');
    
    // Get database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('📦 Database Name:', dbName);
    
    // Check collections
    console.log('\n📚 Checking Collections:');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`   Found ${collections.length} collections`);
    
    // Check for users
    console.log('\n👤 Checking Users Collection:');
    const userCount = await User.countDocuments();
    console.log(`   Total users: ${userCount}`);
    
    if (userCount > 0) {
      const users = await User.find().select('email name role isActive');
      console.log('\n   Users found:');
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.role}) ${user.isActive ? '✅' : '❌'}`);
      });
      
      // Check for admin
      const admin = await User.findOne({ email: 'admin@ethronics.org' });
      if (admin) {
        console.log('\n   ✅ Admin user EXISTS');
        console.log(`      Email: ${admin.email}`);
        console.log(`      Role: ${admin.role}`);
        console.log(`      Active: ${admin.isActive}`);
      } else {
        console.log('\n   ❌ Admin user NOT FOUND');
        console.log('   📝 Available users:');
        users.forEach(user => {
          console.log(`      - ${user.email}`);
        });
      }
    } else {
      console.log('   ❌ No users found in database');
      console.log('\n   💡 This means the database is empty or not seeded');
    }
    
    // Check for content
    console.log('\n📄 Checking Content:');
    const homeContentCount = await HomeContent.countDocuments();
    console.log(`   Home content records: ${homeContentCount}`);
    
    if (homeContentCount > 0) {
      console.log('   ✅ Content exists');
    } else {
      console.log('   ❌ No content found');
    }
    
    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 SUMMARY');
    console.log('='.repeat(70));
    
    if (userCount === 0) {
      console.log('❌ DATABASE IS EMPTY - NEEDS SEEDING');
      console.log('\n🔧 To fix:');
      console.log('   1. Make sure this .env MONGODB_URI matches Render');
      console.log('   2. Run: npm run seed-production');
      console.log('   3. Or update Render environment variables');
    } else if (!await User.findOne({ email: 'admin@ethronics.org' })) {
      console.log('❌ ADMIN USER MISSING');
      console.log('\n🔧 To fix:');
      console.log('   Run: npm run seed-admin');
    } else {
      console.log('✅ DATABASE IS PROPERLY SEEDED');
      console.log('   - Admin user exists');
      console.log('   - Content exists');
      console.log('\n💡 If login still fails, check:');
      console.log('   1. Render environment variables match this database');
      console.log('   2. JWT_SECRET is set in Render');
      console.log('   3. Password is correct: Admin@123456');
    }
    
    console.log('\n' + '='.repeat(70));
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

testDatabase();
