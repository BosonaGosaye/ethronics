const mongoose = require('mongoose');
const User = require('../models/User');
const HomeContent = require('../models/HomeContent');
require('dotenv').config();



const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await HomeContent.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@ethronics.org',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      name: 'Admin User',
      role: 'admin',
      isActive: true
    });
    console.log('👤 Created admin user:', adminUser.email);

    // Create sample editor user
    const editorUser = await User.create({
      email: 'editor@ethronics.org',
      password: 'Editor@123456',
      name: 'Editor User',
      role: 'editor',
      isActive: true
    });
    console.log('👤 Created editor user:', editorUser.email);

    // Seed home content
    for (const [language, sections] of Object.entries(sampleHomeContent)) {
      for (const [section, content] of Object.entries(sections)) {
        await HomeContent.create({
          language,
          section,
          content,
          isPublished: true,
          publishedAt: new Date(),
          updatedBy: adminUser._id
        });
        console.log(`📄 Created ${language}/${section} content`);
      }
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@ethronics.org / Admin@123456');
    console.log('   Editor: editor@ethronics.org / Editor@123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
