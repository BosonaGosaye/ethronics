require('dotenv').config();
const mongoose = require('mongoose');
const ManufacturingProduct = require('../models/ManufacturingProduct');

const testManufacturingProductsAPI = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test 1: Count products
    console.log('📊 Test 1: Counting products...');
    const totalCount = await ManufacturingProduct.countDocuments();
    const publishedCount = await ManufacturingProduct.countDocuments({ isPublished: true });
    const draftCount = await ManufacturingProduct.countDocuments({ isPublished: false });
    console.log(`   Total products: ${totalCount}`);
    console.log(`   Published: ${publishedCount}`);
    console.log(`   Draft: ${draftCount}\n`);

    // Test 2: Fetch all products
    console.log('📋 Test 2: Fetching all products...');
    const allProducts = await ManufacturingProduct.find().select('translations.en.name category status isPublished');
    allProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.translations.en.name} (${product.category}) - ${product.isPublished ? 'Published' : 'Draft'}`);
    });
    console.log('');

    // Test 3: Fetch published products only
    console.log('🌐 Test 3: Fetching published products...');
    const publishedProducts = await ManufacturingProduct.find({ isPublished: true })
      .select('translations image category status progress')
      .sort('order');
    
    console.log(`   Found ${publishedProducts.length} published products:`);
    publishedProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.translations.en.name}`);
      console.log(`      - Category: ${product.category}`);
      console.log(`      - Status: ${product.status}`);
      console.log(`      - Progress: ${product.progress}%`);
      console.log(`      - Has Image: ${product.image ? 'Yes' : 'No'}`);
      console.log(`      - Features: ${product.translations.en.features?.length || 0}`);
      console.log(`      - Applications: ${product.translations.en.applications?.length || 0}`);
    });
    console.log('');

    // Test 4: Check translations
    console.log('🌍 Test 4: Checking translations...');
    const sampleProduct = await ManufacturingProduct.findOne();
    if (sampleProduct) {
      console.log(`   Sample product: ${sampleProduct.translations.en.name}`);
      console.log(`   English: ${sampleProduct.translations.en.name ? '✅' : '❌'}`);
      console.log(`   Amharic: ${sampleProduct.translations.am.name ? '✅' : '❌'}`);
      console.log(`   Oromo: ${sampleProduct.translations.om.name ? '✅' : '❌'}`);
    } else {
      console.log('   No products found to test translations');
    }
    console.log('');

    // Test 5: Create a test product
    console.log('➕ Test 5: Creating a test product...');
    const testProduct = new ManufacturingProduct({
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      category: 'iot',
      status: 'In Development',
      progress: 45,
      expectedLaunch: 'Q3 2024',
      isPublished: true,
      isFeatured: false,
      order: 999,
      translations: {
        en: {
          name: 'Test IoT Device',
          description: 'A test IoT device for demonstration',
          detailedDescription: 'This is a detailed description of the test IoT device with all its capabilities and features.',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          applications: ['Smart Home', 'Industrial Automation'],
          tags: ['IoT', 'Smart', 'Connected']
        },
        am: {
          name: 'የሙከራ IoT መሳሪያ',
          description: 'ለማሳያ የሙከራ IoT መሳሪያ',
          detailedDescription: 'ይህ የሙከራ IoT መሳሪያ ዝርዝር መግለጫ ነው።',
          features: ['ባህሪ 1', 'ባህሪ 2', 'ባህሪ 3'],
          applications: ['ስማርት ቤት', 'የኢንዱስትሪ አውቶሜሽን'],
          tags: ['IoT', 'ስማርት', 'የተገናኘ']
        },
        om: {
          name: 'Meeshaa IoT Qorannoo',
          description: 'Meeshaa IoT qorannoo agarsiisaaf',
          detailedDescription: 'Kun ibsa bal\'aa meeshaa IoT qorannoo ti.',
          features: ['Amala 1', 'Amala 2', 'Amala 3'],
          applications: ['Mana Ismaartii', 'Automation Industirii'],
          tags: ['IoT', 'Ismaartii', 'Walitti hidhamuu']
        }
      },
      specifications: {
        'Connectivity': 'WiFi, Bluetooth 5.0',
        'Power': '5V DC',
        'Dimensions': '10x10x5 cm'
      }
    });

    await testProduct.save();
    console.log(`   ✅ Test product created: ${testProduct.translations.en.name}`);
    console.log(`   ID: ${testProduct._id}\n`);

    // Test 6: Update the test product
    console.log('✏️  Test 6: Updating test product...');
    testProduct.progress = 60;
    testProduct.translations.en.description = 'Updated test description';
    await testProduct.save();
    console.log('   ✅ Test product updated\n');

    // Test 7: Delete the test product
    console.log('🗑️  Test 7: Deleting test product...');
    await testProduct.deleteOne();
    console.log('   ✅ Test product deleted\n');

    console.log('✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

testManufacturingProductsAPI();
