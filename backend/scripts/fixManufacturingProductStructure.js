require('dotenv').config();
const mongoose = require('mongoose');
const ManufacturingProduct = require('../models/ManufacturingProduct');

const fixManufacturingProductStructure = async () => {
  try {
    console.log('🔧 Manufacturing Products Structure Fix Tool\n');
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all products
    const products = await ManufacturingProduct.find();
    console.log(`📊 Found ${products.length} products to check\n`);

    if (products.length === 0) {
      console.log('⚠️  No products found. Run seedManufacturingProducts.js first.\n');
      return;
    }

    let fixedCount = 0;
    let alreadyCorrect = 0;

    for (const product of products) {
      let needsUpdate = false;
      const updates = {};

      // Check if translations structure exists
      if (!product.translations) {
        console.log(`❌ Product ${product._id} missing translations structure`);
        needsUpdate = true;
        updates.translations = {
          en: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] },
          am: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] },
          om: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] }
        };
      } else {
        // Check each language
        ['en', 'am', 'om'].forEach(lang => {
          if (!product.translations[lang]) {
            console.log(`⚠️  Product ${product._id} missing ${lang} translation`);
            needsUpdate = true;
            if (!updates.translations) updates.translations = { ...product.translations };
            updates.translations[lang] = {
              name: '',
              description: '',
              detailedDescription: '',
              features: [],
              applications: [],
              tags: []
            };
          } else {
            // Ensure all fields exist
            const requiredFields = ['name', 'description', 'detailedDescription', 'features', 'applications', 'tags'];
            requiredFields.forEach(field => {
              if (product.translations[lang][field] === undefined) {
                console.log(`⚠️  Product ${product._id} missing ${lang}.${field}`);
                needsUpdate = true;
                if (!updates.translations) updates.translations = { ...product.translations };
                if (!updates.translations[lang]) updates.translations[lang] = { ...product.translations[lang] };
                updates.translations[lang][field] = ['features', 'applications', 'tags'].includes(field) ? [] : '';
              }
            });
          }
        });
      }

      // Check other required fields
      if (product.category === undefined) {
        needsUpdate = true;
        updates.category = 'other';
      }
      if (product.status === undefined) {
        needsUpdate = true;
        updates.status = 'In Development';
      }
      if (product.progress === undefined) {
        needsUpdate = true;
        updates.progress = 0;
      }
      if (product.isPublished === undefined) {
        needsUpdate = true;
        updates.isPublished = false;
      }
      if (product.isFeatured === undefined) {
        needsUpdate = true;
        updates.isFeatured = false;
      }
      if (product.order === undefined) {
        needsUpdate = true;
        updates.order = 0;
      }
      if (!product.specifications) {
        needsUpdate = true;
        updates.specifications = {};
      }

      if (needsUpdate) {
        console.log(`🔧 Fixing product: ${product.translations?.en?.name || product._id}`);
        await ManufacturingProduct.updateOne({ _id: product._id }, { $set: updates });
        fixedCount++;
      } else {
        alreadyCorrect++;
      }
    }

    console.log('\n✅ Structure fix complete!');
    console.log(`   Fixed: ${fixedCount} products`);
    console.log(`   Already correct: ${alreadyCorrect} products`);
    console.log(`   Total: ${products.length} products\n`);

    // Verify all products now
    console.log('🔍 Verifying all products...');
    const verifyProducts = await ManufacturingProduct.find();
    let allValid = true;

    for (const product of verifyProducts) {
      const issues = [];

      if (!product.translations?.en?.name) issues.push('Missing English name');
      if (!product.translations?.en?.description) issues.push('Missing English description');
      if (!product.category) issues.push('Missing category');
      if (product.isPublished === undefined) issues.push('Missing isPublished');

      if (issues.length > 0) {
        console.log(`❌ Product ${product._id} still has issues:`);
        issues.forEach(issue => console.log(`   - ${issue}`));
        allValid = false;
      }
    }

    if (allValid) {
      console.log('✅ All products are now valid!\n');
    } else {
      console.log('⚠️  Some products still have issues. Manual intervention may be needed.\n');
    }

  } catch (error) {
    console.error('❌ Error fixing structure:', error);
    console.error('   Message:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
};

fixManufacturingProductStructure();
