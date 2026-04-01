require('dotenv').config();
const mongoose = require('mongoose');

async function checkDatabase() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully\n');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Collections in database:');
    
    for (const collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      console.log(`  - ${collection.name}: ${count} documents`);
    }
    
    console.log('\n✅ Database check complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
