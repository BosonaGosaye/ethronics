require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Import all translation files
const { homeTranslations } = require('./translations/home');
const { aboutTranslations } = require('./translations/about');
const { academicTranslations } = require('./translations/academic');
const { blogTranslations } = require('./translations/blog');
const { blogUITranslations } = require('./translations/blogUI');
const { careersTranslations } = require('./translations/careers');
const { contactTranslations } = require('./translations/contact');
const { faqTranslations } = require('./translations/faq');
const { libraryTranslations } = require('./translations/library');
const { manufacturingTranslations } = require('./translations/manufacturing');
const { navigationTranslations } = require('./translations/navigation');
const { newsEventsTranslations } = require('./translations/newsEvents');
const { registerTranslations } = require('./translations/register');
const { researchTranslations } = require('./translations/research');

// Import models
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

// Seed functions for each content type
async function seedHomeContent() {
  console.log('\n📝 Seeding Home Content...');
  
  for (const [language, content] of Object.entries(homeTranslations)) {
    try {
      // Seed each section
      for (const [section, data] of Object.entries(content)) {
        await HomeContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Home - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding home content for ${language}:`, error.message);
    }
  }
}

async function seedAboutContent() {
  console.log('\n📝 Seeding About Content...');
  
  for (const [language, content] of Object.entries(aboutTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await AboutContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ About - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding about content for ${language}:`, error.message);
    }
  }
}

async function seedAcademicContent() {
  console.log('\n📝 Seeding Academic Content...');
  
  for (const [language, content] of Object.entries(academicTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await AcademicSection.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Academic - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding academic content for ${language}:`, error.message);
    }
  }
}

async function seedBlogContent() {
  console.log('\n📝 Seeding Blog Content...');
  
  for (const [language, content] of Object.entries(blogTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await BlogContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Blog - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding blog content for ${language}:`, error.message);
    }
  }
}

async function seedCareersContent() {
  console.log('\n📝 Seeding Careers Content...');
  
  for (const [language, content] of Object.entries(careersTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await CareersContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Careers - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding careers content for ${language}:`, error.message);
    }
  }
}

async function seedContactContent() {
  console.log('\n📝 Seeding Contact Content...');
  
  for (const [language, content] of Object.entries(contactTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await ContactContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Contact - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding contact content for ${language}:`, error.message);
    }
  }
}

async function seedFAQContent() {
  console.log('\n📝 Seeding FAQ Content...');
  
  for (const [language, content] of Object.entries(faqTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await FAQContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ FAQ - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding FAQ content for ${language}:`, error.message);
    }
  }
}

async function seedLibraryContent() {
  console.log('\n📝 Seeding Library Content...');
  
  for (const [language, content] of Object.entries(libraryTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await LibraryContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Library - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding library content for ${language}:`, error.message);
    }
  }
}

async function seedManufacturingContent() {
  console.log('\n📝 Seeding Manufacturing Content...');
  
  for (const [language, content] of Object.entries(manufacturingTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await ManufacturingContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Manufacturing - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding manufacturing content for ${language}:`, error.message);
    }
  }
}

async function seedNewsEventsContent() {
  console.log('\n📝 Seeding News & Events Content...');
  
  for (const [language, content] of Object.entries(newsEventsTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await NewsEventsContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ News & Events - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding news & events content for ${language}:`, error.message);
    }
  }
}

async function seedRegisterContent() {
  console.log('\n📝 Seeding Register Content...');
  
  for (const [language, content] of Object.entries(registerTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await RegisterContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Register - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding register content for ${language}:`, error.message);
    }
  }
}

async function seedResearchContent() {
  console.log('\n📝 Seeding Research Content...');
  
  for (const [language, content] of Object.entries(researchTranslations)) {
    try {
      for (const [section, data] of Object.entries(content)) {
        await ResearchContent.findOneAndUpdate(
          { language, section },
          { language, section, content: data, isPublished: true },
          { upsert: true, new: true }
        );
        console.log(`  ✅ Research - ${language}/${section}`);
      }
    } catch (error) {
      console.error(`  ❌ Error seeding research content for ${language}:`, error.message);
    }
  }
}

// Main seeding function
async function seedAllTranslations() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully\n');
    console.log('=' .repeat(60));
    console.log('🌱 Starting Translation Seeding Process');
    console.log('='.repeat(60));

    // Seed all content types one by one
    await seedHomeContent();
    await seedAboutContent();
    await seedAcademicContent();
    await seedBlogContent();
    await seedCareersContent();
    await seedContactContent();
    await seedFAQContent();
    await seedLibraryContent();
    await seedManufacturingContent();
    await seedNewsEventsContent();
    await seedRegisterContent();
    await seedResearchContent();

    console.log('\n' + '='.repeat(60));
    console.log('✅ All translations seeded successfully!');
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding translations:', error);
    process.exit(1);
  }
}

// Run the seeding
seedAllTranslations();
