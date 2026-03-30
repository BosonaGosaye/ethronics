const mongoose = require('mongoose');
const path = require('path');
const ResearchContent = require('../models/ResearchContent');
const ResearchProject = require('../models/ResearchProject');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Import translations from frontend
const { researchTranslations, researchProjectsData } = require('../../src/translations/research');

const importResearchData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await ResearchContent.deleteMany({});
    await ResearchProject.deleteMany({});
    console.log('Cleared existing research data');

    // Import content for each language and section
    const sections = ['hero', 'focus', 'projects', 'whateverYouNeed', 'collaborate', 'cta'];
    const languages = ['en', 'am', 'om'];
    
    for (const language of languages) {
      for (const section of sections) {
        const content = researchTranslations[language][section];
        
        if (content) {
          await ResearchContent.create({
            language,
            section,
            content,
            isPublished: true
          });
          console.log(`✓ Imported ${language}/${section}`);
        }
      }
    }

    // Import research projects
    const projectsToImport = [];
    
    for (let i = 0; i < researchProjectsData.en.length; i++) {
      const enProject = researchProjectsData.en[i];
      const amProject = researchProjectsData.am[i];
      const omProject = researchProjectsData.om[i];
      
      projectsToImport.push({
        translations: {
          en: {
            title: enProject.title,
            description: enProject.description,
            objectives: enProject.objectives,
            methodology: enProject.methodology,
            expectedOutcomes: enProject.expectedOutcomes,
            publications: enProject.publications,
            funding: enProject.funding,
            collaborators: enProject.collaborators
          },
          am: {
            title: amProject.title,
            description: amProject.description,
            objectives: amProject.objectives,
            methodology: amProject.methodology,
            expectedOutcomes: amProject.expectedOutcomes,
            publications: amProject.publications,
            funding: amProject.funding,
            collaborators: amProject.collaborators
          },
          om: {
            title: omProject.title,
            description: omProject.description,
            objectives: omProject.objectives,
            methodology: omProject.methodology,
            expectedOutcomes: omProject.expectedOutcomes,
            publications: omProject.publications,
            funding: omProject.funding,
            collaborators: omProject.collaborators
          }
        },
        category: enProject.category,
        status: 'Active',
        isPublished: true,
        displayOrder: i + 1
      });
    }
    
    await ResearchProject.insertMany(projectsToImport);
    console.log(`✓ Imported ${projectsToImport.length} research projects`);

    console.log('\n✅ Research data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing research data:', error);
    process.exit(1);
  }
};

importResearchData();
