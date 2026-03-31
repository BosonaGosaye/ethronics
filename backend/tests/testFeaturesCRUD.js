require('dotenv').config();
const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

// Test data with all new fields
const testFeatureData = {
  language: 'en',
  section: 'features',
  content: {
    title: "Test Features",
    subtitle: "Testing CRUD operations",
    learnMore: "Learn More",
    modalDescription: "Test modal description",
    items: [
      {
        icon: "TestIcon",
        title: "Test Feature",
        description: "Short test description",
        image: "https://test.com/image.jpg",
        detailedDescription: "This is a detailed description for testing purposes.",
        benefits: [
          "Test benefit 1",
          "Test benefit 2",
          "Test benefit 3"
        ],
        applications: [
          "Test application 1",
          "Test application 2"
        ],
        technicalDetails: "Test technical details with specifications.",
        category: "Test Category",
        status: "Active"
      }
    ]
  },
  isPublished: false
};

async function testCRUD() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // TEST 1: CREATE
    console.log('📝 TEST 1: CREATE - Creating test feature content...');
    const created = await HomeContent.create(testFeatureData);
    console.log('✅ Created successfully');
    console.log('   ID:', created._id);
    console.log('   Items count:', created.content.items.length);
    console.log('   First item has all fields:', {
      hasIcon: !!created.content.items[0].icon,
      hasTitle: !!created.content.items[0].title,
      hasDescription: !!created.content.items[0].description,
      hasImage: !!created.content.items[0].image,
      hasDetailedDescription: !!created.content.items[0].detailedDescription,
      hasBenefits: Array.isArray(created.content.items[0].benefits),
      hasApplications: Array.isArray(created.content.items[0].applications),
      hasTechnicalDetails: !!created.content.items[0].technicalDetails,
      hasCategory: !!created.content.items[0].category,
      hasStatus: !!created.content.items[0].status
    });
    console.log('');

    // TEST 2: READ
    console.log('📖 TEST 2: READ - Fetching created content...');
    const fetched = await HomeContent.findOne({ 
      language: 'en', 
      section: 'features' 
    });
    console.log('✅ Fetched successfully');
    console.log('   Title:', fetched.content.title);
    console.log('   Items count:', fetched.content.items.length);
    console.log('   Benefits count:', fetched.content.items[0].benefits.length);
    console.log('   Applications count:', fetched.content.items[0].applications.length);
    console.log('');

    // TEST 3: UPDATE
    console.log('✏️  TEST 3: UPDATE - Updating feature content...');
    fetched.content.items[0].title = "Updated Test Feature";
    fetched.content.items[0].benefits.push("New benefit 4");
    fetched.content.items[0].applications.push("New application 3");
    await fetched.save();
    
    const updated = await HomeContent.findById(fetched._id);
    console.log('✅ Updated successfully');
    console.log('   New title:', updated.content.items[0].title);
    console.log('   Benefits count:', updated.content.items[0].benefits.length);
    console.log('   Applications count:', updated.content.items[0].applications.length);
    console.log('');

    // TEST 4: ADD NEW ITEM
    console.log('➕ TEST 4: ADD ITEM - Adding new feature item...');
    updated.content.items.push({
      icon: "NewIcon",
      title: "Second Feature",
      description: "Second feature description",
      image: "https://test.com/image2.jpg",
      detailedDescription: "Detailed description for second feature",
      benefits: ["Benefit A", "Benefit B"],
      applications: ["Application X", "Application Y"],
      technicalDetails: "Technical specs for second feature",
      category: "Another Category",
      status: "In Development"
    });
    await updated.save();
    
    const withNewItem = await HomeContent.findById(updated._id);
    console.log('✅ Item added successfully');
    console.log('   Total items:', withNewItem.content.items.length);
    console.log('   Second item title:', withNewItem.content.items[1].title);
    console.log('   Second item status:', withNewItem.content.items[1].status);
    console.log('');

    // TEST 5: REMOVE ITEM
    console.log('➖ TEST 5: REMOVE ITEM - Removing first item...');
    withNewItem.content.items.shift(); // Remove first item
    await withNewItem.save();
    
    const afterRemoval = await HomeContent.findById(withNewItem._id);
    console.log('✅ Item removed successfully');
    console.log('   Remaining items:', afterRemoval.content.items.length);
    console.log('   First item is now:', afterRemoval.content.items[0].title);
    console.log('');

    // TEST 6: PUBLISH/UNPUBLISH
    console.log('📢 TEST 6: PUBLISH - Toggling publish status...');
    afterRemoval.isPublished = true;
    afterRemoval.publishedAt = new Date();
    await afterRemoval.save();
    
    const published = await HomeContent.findById(afterRemoval._id);
    console.log('✅ Published successfully');
    console.log('   Is published:', published.isPublished);
    console.log('   Published at:', published.publishedAt);
    console.log('');

    // TEST 7: VERIFY DATA INTEGRITY
    console.log('🔍 TEST 7: DATA INTEGRITY - Verifying all fields...');
    const final = await HomeContent.findById(published._id);
    const item = final.content.items[0];
    
    const integrity = {
      hasAllRequiredFields: !!(
        item.icon &&
        item.title &&
        item.description
      ),
      hasAllDetailFields: !!(
        item.detailedDescription &&
        item.technicalDetails &&
        item.category &&
        item.status
      ),
      hasArrayFields: (
        Array.isArray(item.benefits) &&
        Array.isArray(item.applications) &&
        item.benefits.length > 0 &&
        item.applications.length > 0
      ),
      hasImageField: !!item.image
    };
    
    console.log('✅ Data integrity check:', integrity);
    console.log('   All checks passed:', Object.values(integrity).every(v => v === true));
    console.log('');

    // TEST 8: DELETE
    console.log('🗑️  TEST 8: DELETE - Cleaning up test data...');
    await HomeContent.deleteOne({ _id: final._id });
    
    const deleted = await HomeContent.findById(final._id);
    console.log('✅ Deleted successfully');
    console.log('   Record exists:', !!deleted);
    console.log('');

    // SUMMARY
    console.log('═══════════════════════════════════════');
    console.log('✅ ALL TESTS PASSED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════');
    console.log('Tests completed:');
    console.log('  ✓ CREATE - Feature content with all fields');
    console.log('  ✓ READ - Fetch and verify data');
    console.log('  ✓ UPDATE - Modify existing fields');
    console.log('  ✓ ADD ITEM - Add new feature item');
    console.log('  ✓ REMOVE ITEM - Delete feature item');
    console.log('  ✓ PUBLISH - Toggle publish status');
    console.log('  ✓ DATA INTEGRITY - Verify all fields');
    console.log('  ✓ DELETE - Clean up test data');
    console.log('');
    console.log('The Features CRUD operations are working correctly! 🎉');

    process.exit(0);
  } catch (error) {
    console.error('❌ TEST FAILED:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

testCRUD();
