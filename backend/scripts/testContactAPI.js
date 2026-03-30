require('dotenv').config();
const mongoose = require('mongoose');
const ContactContent = require('../models/ContactContent');
const ContactMessage = require('../models/ContactMessage');

async function testContactAPI() {
  try {
    console.log('🧪 Testing Contact API Integration...\n');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test 1: Check Contact Content
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Test 1: Contact Content');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const languages = ['en', 'am', 'om'];
    const sections = ['hero', 'form', 'details', 'location', 'categories'];
    
    for (const lang of languages) {
      console.log(`🌐 ${lang.toUpperCase()}:`);
      for (const section of sections) {
        const content = await ContactContent.findOne({ 
          language: lang, 
          section,
          isPublished: true 
        });
        
        if (content) {
          console.log(`   ✅ ${section}: Found`);
        } else {
          console.log(`   ❌ ${section}: Missing or not published`);
        }
      }
      console.log('');
    }

    // Test 2: Check Contact Messages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Test 2: Contact Messages');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const totalMessages = await ContactMessage.countDocuments();
    console.log(`Total Messages: ${totalMessages}`);
    
    const messagesByStatus = await ContactMessage.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    console.log('\nBy Status:');
    messagesByStatus.forEach(item => {
      console.log(`   ${item._id}: ${item.count}`);
    });
    
    const messagesByCategory = await ContactMessage.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    console.log('\nBy Category:');
    messagesByCategory.forEach(item => {
      console.log(`   ${item._id}: ${item.count}`);
    });

    // Test 3: Sample Content Structure
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Test 3: Sample Content Structure');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const sampleHero = await ContactContent.findOne({ 
      language: 'en', 
      section: 'hero',
      isPublished: true 
    });
    
    if (sampleHero) {
      console.log('Hero Section (EN):');
      console.log(JSON.stringify(sampleHero.content, null, 2));
    }
    
    console.log('\n');
    
    const sampleCategories = await ContactContent.findOne({ 
      language: 'en', 
      section: 'categories',
      isPublished: true 
    });
    
    if (sampleCategories) {
      console.log('Categories (EN):');
      console.log(`   Total categories: ${sampleCategories.content.length}`);
      sampleCategories.content.forEach(cat => {
        console.log(`   - ${cat.label} (${cat.value})`);
      });
    }

    // Test 4: Recent Messages
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📬 Test 4: Recent Messages');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email category status priority createdAt');
    
    if (recentMessages.length > 0) {
      console.log(`Showing ${recentMessages.length} most recent messages:\n`);
      recentMessages.forEach((msg, index) => {
        console.log(`${index + 1}. ${msg.name} (${msg.email})`);
        console.log(`   Category: ${msg.category} | Status: ${msg.status} | Priority: ${msg.priority}`);
        console.log(`   Date: ${msg.createdAt.toLocaleString()}\n`);
      });
    } else {
      console.log('No messages found. Submit a test message from the contact form.\n');
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const totalContent = await ContactContent.countDocuments();
    const publishedContent = await ContactContent.countDocuments({ isPublished: true });
    
    console.log(`✅ Contact Content Sections: ${totalContent}`);
    console.log(`✅ Published Sections: ${publishedContent}`);
    console.log(`✅ Contact Messages: ${totalMessages}`);
    
    if (publishedContent >= 15) { // 5 sections × 3 languages
      console.log('\n🎉 All contact content is properly imported!');
    } else {
      console.log('\n⚠️  Some content may be missing. Run: node scripts/importContactData.js');
    }
    
    console.log('\n✅ Contact API integration test completed!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing contact API:', error);
    process.exit(1);
  }
}

testContactAPI();
