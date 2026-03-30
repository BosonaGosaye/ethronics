const mongoose = require('mongoose');
require('dotenv').config();

const MediaItem = require('../models/MediaItem');

async function checkMediaItems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all media items
    const allItems = await MediaItem.find({});
    console.log(`\n📊 Total media items in database: ${allItems.length}`);

    if (allItems.length === 0) {
      console.log('\n⚠️  No media items found in database!');
      console.log('Please upload media items through the admin panel at http://localhost:5174/media-items');
      process.exit(0);
    }

    // Check published vs unpublished
    const publishedItems = allItems.filter(item => item.published);
    const unpublishedItems = allItems.filter(item => !item.published);

    console.log(`\n✅ Published items: ${publishedItems.length}`);
    console.log(`❌ Unpublished items: ${unpublishedItems.length}`);

    // Show breakdown by type
    console.log('\n📋 Breakdown by type:');
    const types = ['photo', 'video', 'press', 'podcast'];
    types.forEach(type => {
      const total = allItems.filter(item => item.type === type).length;
      const published = publishedItems.filter(item => item.type === type).length;
      console.log(`  ${type}: ${published}/${total} published`);
    });

    // Show sample items
    console.log('\n📝 Sample media items:');
    allItems.slice(0, 3).forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.title.get('en') || 'No title'}`);
      console.log(`   Type: ${item.type}`);
      console.log(`   Published: ${item.published ? '✅ Yes' : '❌ No'}`);
      console.log(`   Media URL: ${item.mediaUrl || 'None'}`);
      console.log(`   Media URLs: ${item.mediaUrls?.length || 0} files`);
      console.log(`   Created: ${item.createdAt}`);
    });

    // Check for unpublished items
    if (unpublishedItems.length > 0) {
      console.log('\n⚠️  WARNING: You have unpublished media items!');
      console.log('These items will NOT appear on the public website.');
      console.log('To publish them:');
      console.log('1. Go to http://localhost:5174/media-items');
      console.log('2. Edit each item');
      console.log('3. Check the "Published" checkbox');
      console.log('4. Save');
    }

    if (publishedItems.length === 0) {
      console.log('\n❌ ERROR: No published media items found!');
      console.log('Please publish at least one media item to see it on the website.');
    } else {
      console.log('\n✅ SUCCESS: You have published media items!');
      console.log(`They should appear at: http://localhost:3000/news-events`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

checkMediaItems();
