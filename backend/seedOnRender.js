/**
 * Simple seeding script that works on Render
 * Run this in Render Shell: node seedOnRender.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple User model inline
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  permissions: {
    canManageUsers: Boolean,
    canManageContent: Boolean,
    canManageMedia: Boolean,
    canViewAnalytics: Boolean,
    canManageSettings: Boolean
  },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    console.log('🌱 Seeding Admin User on Render\n');
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    console.log('📋 Database:', mongoUri.replace(/:[^:@]+@/, ':****@'));
    console.log('🔍 Connecting...\n');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    console.log('📦 Database:', mongoose.connection.db.databaseName);
    
    const adminEmail = 'admin@ethronics.org';
    const adminPassword = 'Admin@123456';
    
    // Check if admin exists
    let admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      console.log('\n⚠️  Admin user already exists');
      console.log('   Updating password...');
      
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(adminPassword, salt);
      admin.role = 'admin';
      admin.isActive = true;
      await admin.save();
      
      console.log('✅ Admin user updated');
    } else {
      console.log('\n📝 Creating new admin user...');
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      admin = new User({
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
      
      await admin.save();
      console.log('✅ Admin user created');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ SEEDING COMPLETE');
    console.log('='.repeat(60));
    console.log('\n🔐 Login Credentials:');
    console.log('   Email:    admin@ethronics.org');
    console.log('   Password: Admin@123456');
    console.log('\n' + '='.repeat(60));
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();
