const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const LibraryResource = require('../models/LibraryResource');

async function checkResources() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Get all resources
    const allResources = await LibraryResource.find({});
    console.log(`Total resources in database: ${allResources.length}\n`);

    if (allResources.length === 0) {
      console.log('❌ No resources found in database!');
      console.log('Please add a resource through the admin panel first.\n');
      process.exit(0);
    }

    // Check each resource
    allResources.forEach((resource, index) => {
      console.log(`\n--- Resource ${index + 1} ---`);
      console.log(`ID: ${resource._id}`);
      console.log(`Title (EN): ${resource.title?.en || 'N/A'}`);
      console.log(`Title (AM): ${resource.title?.am || 'N/A'}`);
      console.log(`Title (OM): ${resource.title?.om || 'N/A'}`);
      console.log(`Author: ${resource.author}`);
      console.log(`Type: ${resource.type}`);
      console.log(`Category: ${resource.category}`);
      console.log(`isPublished: ${resource.isPublished ? '✓ YES' : '✗ NO'}`);
      console.log(`isFeatured: ${resource.isFeatured ? '✓ YES' : '✗ NO'}`);
      console.log(`allowOnlineReading: ${resource.allowOnlineReading ? '✓ YES' : '✗ NO'}`);
      console.log(`File URL: ${resource.fileUrl || 'N/A'}`);
      console.log(`Cover Image: ${resource.coverImage || 'N/A'}`);
      console.log(`Views: ${resource.views}`);
      console.log(`Downloads: ${resource.downloads}`);
    });

    // Check published resources
    const publishedResources = await LibraryResource.find({ isPublished: true });
    console.log(`\n\n===========================================`);
    console.log(`Published resources: ${publishedResources.length}`);
    console.log(`Unpublished resources: ${allResources.length - publishedResources.length}`);
    console.log(`===========================================\n`);

    if (publishedResources.length === 0) {
      console.log('⚠️  WARNING: No published resources found!');
      console.log('The public library page only shows published resources.');
      console.log('\nTo fix this:');
      console.log('1. Go to admin panel: http://localhost:5173/library/resources');
      console.log('2. Edit your resource');
      console.log('3. Check the "Published" checkbox');
      console.log('4. Click "Update Resource"\n');
    } else {
      console.log('✓ Published resources are available for public viewing\n');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkResources();
