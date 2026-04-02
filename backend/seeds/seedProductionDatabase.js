#!/usr/bin/env node

/**
 * Production Database Seeding Script
 * 
 * This script can be run on Render to seed the production database.
 * 
 * Usage:
 * 1. Deploy backend to Render
 * 2. Open Render Shell for your service
 * 3. Run: node seeds/seedProductionDatabase.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Import models
const User = require('../models/User');

// Import all translation files
const { homeTranslations } = require('./translations/home');
const { aboutTranslations } = require('./translations/about');
const { academicTranslations } = require('./translations/academic');
const { blogTranslations } = require('./translations/blog');
const { careersTranslations } = require('./translations/careers');
const { contactTranslations } = require('./translations/contact');
const { faqTranslations } = require('./translations/faq');
const { libraryTranslations } = require('./translations/library');
const { manufacturingTranslations } = require('./translations/manufacturing');
const { newsEventsTranslations } = require('./translations/newsEvents');
const { registerTranslations } = require('./translations/register');
const { researchTranslations } = require('./translations/research');

// Import content models
const HomeContent = require('../models/HomeContent');
const AboutContent = require('../models/AboutContent');
const AcademicSection = require('../models/AcademicSection');
const BlogContent = require('../models/BlogContent');
const CareersContent = require('../models/CareersContent');
const ContactContent = require('../models/ContactContent');
const FAQContent = require('../models/FAQContent');
const LibraryContent = require('../models/LibraryContent');
const ManufacturingContent = require('../models/ManufacturingContent');
const NewsEventsContent = require('../models/NewsEventsContent');
const RegisterContent = require('../models/RegisterContent');
const ResearchContent = require('../models/ResearchContent');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function seedAdminUser() {
  console.log('\n👤 Creating Admin User...');
  
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ethronics.org';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

  const existingAdmin = await User.findOne({ email: adminEmail });
  
  if (existingAdmin) {
    console.log(`  ⚠️  Admin user already exists: ${adminEmail}`);
    console.log('  Updating password...');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    existingAdmin.password = hashedPassword;
    existingAdmin.role = 'admin';
    existingAdmin.isActive = true;
    await existingAdmin.save();
    
    console.log('  ✅ Admin user updated');
  } else {
    console.log(`  📝 Creating new admin user: ${adminEmail}`);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
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
    console.log('  ✅ Admin user created');
  }
  
  console.log(`\n  📋 Credentials:`);
  console.log(`     Email:    ${adminEmail}`);
  console.log(`     Password: ${adminPassword}`);
}

async function seedAllContent() {
  console.log('\n📝 Seeding All Content...');
  
  const contentTypes = [
    { name: 'Home', model: HomeContent, data: homeTranslations },
    { name: 'About', model: AboutContent, data: aboutTranslations },
    { name: 'Academic', model: AcademicSection, data: academicTranslations },
    { name: 'Blog', model: BlogContent, data: blogTranslations },
    { name: 'Careers', model: CareersContent, data: careersTranslations },
    { name: 'Contact', model: ContactContent, data: contactTranslations },
    { name: 'FAQ', model: FAQContent, data: faqTranslations },
    { name: 'Library', model: LibraryContent, data: libraryTranslations },
    { name: 'Manufacturing', model: ManufacturingContent, data: manufacturingTranslations },
    { name: 'News & Events', model: NewsEventsContent, data: newsEventsTranslations },
    { name: 'Register', model: RegisterContent, data: registerTranslations },
    { name: 'Research', model: ResearchContent, data: researchTranslations }
  ];
  
  let totalSeeded = 0;
  
  for (const contentType of contentTypes) {
    console.log(`\n  📦 ${contentType.name}...`);
    let count = 0;
    
    for (const [language, content] of Object.entries(contentType.data)) {
      for (const [section, data] of Object.entries(content)) {
        await contentType.model.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        count++;
      }
    }
    
    console.log(`     ✅ ${count} sections seeded`);
    totalSeeded += count;
  }
  
  console.log(`\n  ✅ Total: ${totalSeeded} content sections seeded`);
}

async function main() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🌱 PRODUCTION DATABASE SEEDING');
    console.log('='.repeat(70));
    
    console.log('\n⚠️  WARNING: This will seed the PRODUCTION database!');
    console.log('Database:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    
    const answer = await question('\nAre you sure you want to continue? (yes/no): ');
    
    if (answer.toLowerCase() !== 'yes') {
      console.log('\n❌ Seeding cancelled.');
      rl.close();
      process.exit(0);
    }
    
    console.log('\n🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to production database');
    
    // Seed admin user
    await seedAdminUser();
    
    // Seed all content
    await seedAllContent();
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ PRODUCTION DATABASE SEEDING COMPLETED!');
    console.log('='.repeat(70));
    
    console.log('\n📊 Summary:');
    console.log('  ✅ Admin user created/updated');
    console.log('  ✅ All translations seeded');
    console.log('  ✅ Production database ready');
    
    console.log('\n🔐 Admin Login:');
    console.log(`  URL:      https://ethronics-admin.vercel.app`);
    console.log(`  Email:    ${process.env.ADMIN_EMAIL || 'admin@ethronics.org'}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);
    
    console.log('\n' + '='.repeat(70));
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding production database:', error);
    rl.close();
    process.exit(1);
  }
}

main();
