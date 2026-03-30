const mongoose = require('mongoose');
const LibraryResource = require('../models/LibraryResource');
require('dotenv').config();

async function migrateResources() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const resources = await LibraryResource.find({});
    console.log(`\nFound ${resources.length} resources to migrate\n`);

    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (const resource of resources) {
      try {
        // Check if already migrated (has multilingual structure)
        if (resource.title && typeof resource.title === 'object' && resource.title.en) {
          console.log(`⊘ Skipped: ${resource.title.en} (already migrated)`);
          skipped++;
          continue;
        }

        // Convert old structure to new multilingual structure
        const oldTitle = resource.title || 'Untitled';
        const oldDescription = resource.description || '';
        const oldAbstract = resource.abstract || '';

        const updated = {
          // Multilingual fields - duplicate content for all languages
          title: {
            en: oldTitle,
            am: oldTitle,
            om: oldTitle
          },
          description: {
            en: oldDescription,
            am: oldDescription,
            om: oldDescription
          },
          abstract: {
            en: oldAbstract,
            am: oldAbstract,
            om: oldAbstract
          },
          // Table of contents - common for all languages
          tableOfContents: [],
          // New fields with defaults
          fileType: resource.fileType || 'pdf',
          edition: resource.edition || '',
          allowOnlineReading: resource.allowOnlineReading !== undefined ? resource.allowOnlineReading : true
        };

        await LibraryResource.findByIdAndUpdate(resource._id, updated);
        console.log(`✓ Migrated: ${oldTitle}`);
        migrated++;
      } catch (error) {
        console.error(`✗ Error migrating ${resource._id}:`, error.message);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('Migration Summary:');
    console.log('='.repeat(50));
    console.log(`✓ Migrated: ${migrated}`);
    console.log(`⊘ Skipped: ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    console.log(`Total: ${resources.length}`);
    console.log('='.repeat(50) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  }
}

migrateResources();
