require('dotenv').config();
const mongoose = require('mongoose');
const ManufacturingProduct = require('../models/ManufacturingProduct');

const debugManufacturingProducts = async () => {
  try {
    console.log('🔍 Manufacturing Products Debug Tool\n');
    console.log('🔌 Connecting to MongoDB...');
    console.log('   URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('📚 Available collections:', collectionNames.join(', '));
    
    const hasProductsCollection = collectionNames.includes('manufacturingproducts');
    console.log(`   Manufacturing products collection exists: ${hasProductsCollection ? '✅' : '❌'}\n`);

    if (!hasProductsCollection) {
      console.log('⚠️  No manufacturing products collection found!');
      console.log('   Run: node scripts/seedManufacturingProducts.js\n');
      return;
    }

    // Count documents
    console.log('📊 Document Counts:');
    const total = await ManufacturingProduct.countDocuments();
    const published = await ManufacturingProduct.countDocuments({ isPublished: true });
    const draft = await ManufacturingProduct.countDocuments({ isPublished: false });
    const featured = await ManufacturingProduct.countDocuments({ isFeatured: true });
    
    console.log(`   Total: ${total}`);
    console.log(`   Published: ${published}`);
    console.log(`   Draft: ${draft}`);
    console.log(`   Featured: ${featured}\n`);

    if (total === 0) {
      console.log('⚠️  No products found in database!');
      console.log('   Run: node scripts/seedManufacturingProducts.js\n');
      return;
    }

    // List all products
    console.log('📋 All Products:');
    const products = await ManufacturingProduct.find()
      .select('translations.en.name category status isPublished isFeatured order createdAt')
      .sort('order');
    
    products.forEach((product, index) => {
      const name = product.translations?.en?.name || 'UNNAMED';
      const status = product.isPublished ? '✅ Published' : '📝 Draft';
      const featured = product.isFeatured ? '⭐' : '  ';
      console.log(`   ${index + 1}. ${featured} ${name}`);
      console.log(`      Category: ${product.category} | Status: ${status} | Order: ${product.order}`);
      console.log(`      ID: ${product._id}`);
    });
    console.log('');

    // Check data structure
    console.log('🔍 Data Structure Check:');
    const sampleProduct = await ManufacturingProduct.findOne();
    if (sampleProduct) {
      console.log(`   Sample Product: ${sampleProduct.translations?.en?.name || 'UNNAMED'}`);
      console.log(`   Has translations: ${sampleProduct.translations ? '✅' : '❌'}`);
      console.log(`   Has translations.en: ${sampleProduct.translations?.en ? '✅' : '❌'}`);
      console.log(`   Has translations.en.name: ${sampleProduct.translations?.en?.name ? '✅' : '❌'}`);
      console.log(`   Has image: ${sampleProduct.image ? '✅' : '❌'}`);
      console.log(`   Has category: ${sampleProduct.category ? '✅' : '❌'}`);
      console.log(`   Has status: ${sampleProduct.status ? '✅' : '❌'}`);
      console.log('');
      
      // Show full structure
      console.log('📄 Sample Product Structure:');
      console.log(JSON.stringify({
        _id: sampleProduct._id,
        image: sampleProduct.image ? 'present' : 'missing',
        category: sampleProduct.category,
        status: sampleProduct.status,
        progress: sampleProduct.progress,
        isPublished: sampleProduct.isPublished,
        isFeatured: sampleProduct.isFeatured,
        order: sampleProduct.order,
        translations: {
          en: {
            name: sampleProduct.translations?.en?.name || 'missing',
            description: sampleProduct.translations?.en?.description ? 'present' : 'missing',
            features: sampleProduct.translations?.en?.features?.length || 0,
            applications: sampleProduct.translations?.en?.applications?.length || 0
          }
        }
      }, null, 2));
      console.log('');
    }

    // Test API query simulation
    console.log('🧪 Simulating Admin API Query:');
    const adminQuery = await ManufacturingProduct.find()
      .select('translations image category status progress isPublished isFeatured order')
      .sort('order')
      .limit(20);
    
    console.log(`   Found ${adminQuery.length} products`);
    console.log(`   First product name: ${adminQuery[0]?.translations?.en?.name || 'UNNAMED'}\n`);

    // Check indexes
    console.log('📇 Indexes:');
    const indexes = await ManufacturingProduct.collection.getIndexes();
    Object.keys(indexes).forEach(indexName => {
      console.log(`   ${indexName}:`, JSON.stringify(indexes[indexName]));
    });
    console.log('');

    console.log('✅ Debug complete!\n');
    console.log('💡 Next Steps:');
    console.log('   1. Check admin panel browser console for errors');
    console.log('   2. Verify backend is running on http://localhost:5001');
    console.log('   3. Test API endpoint: curl http://localhost:5001/api/manufacturing-products/admin');
    console.log('   4. Check if auth token is valid in admin panel');

  } catch (error) {
    console.error('❌ Error during debug:', error);
    console.error('   Message:', error.message);
    if (error.stack) {
      console.error('   Stack:', error.stack);
    }
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

debugManufacturingProducts();
