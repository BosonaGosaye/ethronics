require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const BlogContent = require('../models/BlogContent');

// Import blog translations
const blogTranslationsPath = path.join(__dirname, '../../src/translations/blog.js');
let blogTranslations;

try {
  // Read the file content
  const fs = require('fs');
  const fileContent = fs.readFileSync(blogTranslationsPath, 'utf8');
  
  // Extract the blogTranslations object using regex
  const match = fileContent.match(/export const blogTranslations = ({[\s\S]*});/);
  if (match && match[1]) {
    // Use eval to parse the object (in a controlled environment)
    blogTranslations = eval(`(${match[1]})`);
  } else {
    throw new Error('Could not parse blogTranslations from file');
  }
} catch (error) {
  console.error('Error loading blog translations:', error.message);
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

async function importBlogData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blog content
    await BlogContent.deleteMany({});
    console.log('Cleared existing blog content');

    const languages = ['en', 'am', 'om'];
    const sections = ['hero', 'filter', 'featured', 'blogGrid', 'sidebar', 'authorSpotlight', 'newsletter'];
    
    let importedCount = 0;
    let publishedCount = 0;

    // Import content for each language and section
    for (const language of languages) {
      console.log(`\nImporting ${language.toUpperCase()} content...`);
      
      if (!blogTranslations[language]) {
        console.log(`  ⚠️  No translations found for ${language}`);
        continue;
      }

      for (const section of sections) {
        if (!blogTranslations[language][section]) {
          console.log(`  ⚠️  Section '${section}' not found for ${language}`);
          continue;
        }

        try {
          const blogContent = await BlogContent.create({
            language,
            section,
            content: blogTranslations[language][section],
            isPublished: true // Publish all sections by default
          });

          importedCount++;
          publishedCount++;
          console.log(`  ✓ Imported and published: ${section}`);
        } catch (error) {
          console.error(`  ✗ Error importing ${section}:`, error.message);
        }
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('Import Summary:');
    console.log('='.repeat(50));
    console.log(`Total sections imported: ${importedCount}`);
    console.log(`Total sections published: ${publishedCount}`);
    console.log(`Languages: ${languages.join(', ')}`);
    console.log(`Sections per language: ${sections.join(', ')}`);
    console.log('='.repeat(50));

    // Verify the import
    const allContent = await BlogContent.find({});
    console.log(`\nVerification: ${allContent.length} documents in database`);
    
    // Show breakdown by language
    for (const language of languages) {
      const count = await BlogContent.countDocuments({ language });
      const published = await BlogContent.countDocuments({ language, isPublished: true });
      console.log(`  ${language.toUpperCase()}: ${count} sections (${published} published)`);
    }

    console.log('\n✅ Blog data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing blog data:', error);
    process.exit(1);
  }
}

// Run the import
importBlogData();
