require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function seedAdminUser() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully\n');
    
    console.log('=' .repeat(60));
    console.log('👤 Creating Admin User');
    console.log('='.repeat(60));

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ethronics.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`\n⚠️  Admin user already exists: ${adminEmail}`);
      console.log('   Updating password...');
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      // Update the user
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      existingAdmin.isActive = true;
      await existingAdmin.save();
      
      console.log('✅ Admin user updated successfully!');
    } else {
      console.log(`\n📝 Creating new admin user: ${adminEmail}`);
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      // Create admin user
      const adminUser = new User({
        name: 'System Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        permissions: {
          canManageUsers: true,
          canManageContent: true,
          canManageMedia: true,
          canViewAnalytics: true,
          canManageSettings: true
        }
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n' + '='.repeat(60));
    console.log('📋 Admin User Details:');
    console.log('='.repeat(60));
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Role:     admin`);
    console.log(`Status:   Active`);
    console.log('='.repeat(60));
    
    console.log('\n✅ Admin user seeding completed!');
    console.log('\n💡 You can now login to the admin panel with these credentials.');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

// Run the seeding
seedAdminUser();
