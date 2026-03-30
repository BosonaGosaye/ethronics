const mongoose = require('mongoose');
require('dotenv').config();

async function fixRegisterIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('registercontents');

    // Get existing indexes
    console.log('\n📋 Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`  - ${JSON.stringify(index.key)}: ${index.name}`);
    });

    // Drop the old language_1 index if it exists
    try {
      await collection.dropIndex('language_1');
      console.log('\n✓ Dropped old index: language_1');
    } catch (error) {
      if (error.code === 27) {
        console.log('\n⚠️  Index language_1 does not exist (already dropped)');
      } else {
        throw error;
      }
    }

    // Create new compound index
    await collection.createIndex({ language: 1, section: 1 }, { unique: true });
    console.log('✓ Created new compound index: { language: 1, section: 1 }');

    // Verify new indexes
    console.log('\n📋 Updated indexes:');
    const newIndexes = await collection.indexes();
    newIndexes.forEach(index => {
      console.log(`  - ${JSON.stringify(index.key)}: ${index.name}`);
    });

    console.log('\n✅ Index fix complete!');
    console.log('\nYou can now run: node scripts/importRegisterSections.js');

  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  }
}

fixRegisterIndexes();
