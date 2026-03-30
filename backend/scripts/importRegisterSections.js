const mongoose = require('mongoose');
const RegisterContent = require('../models/RegisterContent');
require('dotenv').config();

// Import translations
const registerTranslations = {
  en: require('../../src/translations/register').registerTranslations.en,
  am: require('../../src/translations/register').registerTranslations.am,
  om: require('../../src/translations/register').registerTranslations.om
};

// Section mapping - maps content keys to sections
const sectionMapping = {
  hero: ['heroTitle', 'heroDescription', 'heroButton'],
  objective: ['objectiveTitle', 'objectiveDescription', 'objectivePoint1', 'objectivePoint2', 'objectivePoint3', 'objectivePoint4'],
  highlights: ['highlightsTitle', 'roboticsTitle', 'roboticsDescription', 'codingTitle', 'codingDescription', 'autonomousTitle', 'autonomousDescription'],
  form: [
    'formTitleStudent', 'formTitleGuardian', 'studentName', 'studentAge', 'studentGender', 
    'grade', 'school', 'studentEmail', 'experience', 'session', 'guardianName', 
    'guardianEmail', 'emergency', 'nextButton', 'backButton', 'submitButton', 'submitting',
    'selectGrade', 'placeholderName', 'errorStudentName', 'errorStudentAge', 'errorStudentGender',
    'errorGrade', 'errorSchool', 'errorStudentEmail', 'errorExperience', 'errorSession',
    'errorGuardianName', 'errorGuardianEmail', 'errorEmergency', 'apiError', 'successMessage',
    'step1', 'step2', 'registrationTitle', 'registrationDescription', 'male', 'female',
    'selectExperience', 'noExperience', 'beginner', 'intermediate', 'morning', 'afternoon',
    'parentEmailOk'
  ],
  faq: ['faqTitle', 'faqQuestion1', 'faqAnswer1', 'faqQuestion2', 'faqAnswer2', 'faqQuestion3', 'faqAnswer3'],
  gallery: ['galleryTitle', 'galleryDescription', 'trainingVideos', 'studentProjects', 'byStudent'],
  cta: ['ctaTitle', 'ctaDescription', 'ctaButton'],
  nextSteps: [
    'nextSteps', 'registrationSuccessful', 'congratulations', 'registrationComplete',
    'important', 'paymentInstructions', 'registrationFee', 'registrationFeeDetails',
    'sessionPreference', 'sessionPreferenceDetails', 'paymentDeadline', 'paymentDeadlineDetails',
    'diagnosticExam', 'diagnosticExamDetails', 'contactUs', 'contactUsDetails',
    'registerAnotherStudent', 'contactUsButton'
  ]
};

async function importRegisterSections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing register content
    await RegisterContent.deleteMany({});
    console.log('✓ Cleared existing register content');

    let importedCount = 0;

    // Process each language
    for (const [langCode, translations] of Object.entries(registerTranslations)) {
      console.log(`\n📝 Importing ${langCode.toUpperCase()} content...`);

      // Create a document for each section
      for (const [sectionName, keys] of Object.entries(sectionMapping)) {
        const sectionContent = {};
        
        // Extract relevant keys for this section
        keys.forEach(key => {
          if (translations[key] !== undefined) {
            sectionContent[key] = translations[key];
          }
        });

        // Only create section if it has content
        if (Object.keys(sectionContent).length > 0) {
          await RegisterContent.create({
            language: langCode,
            section: sectionName,
            content: sectionContent,
            isPublished: true // Set to published by default
          });
          
          importedCount++;
          console.log(`  ✓ ${sectionName}: ${Object.keys(sectionContent).length} fields`);
        }
      }
    }

    console.log(`\n✅ Successfully imported ${importedCount} register sections!`);
    console.log('\nBreakdown:');
    console.log('  - 3 languages (en, am, om)');
    console.log('  - 7 sections per language');
    console.log('  - All sections set to published');

    // Verify import
    const allContent = await RegisterContent.find().sort({ language: 1, section: 1 });
    console.log('\n📊 Verification:');
    allContent.forEach(doc => {
      console.log(`  ${doc.language} - ${doc.section}: ${Object.keys(doc.content).length} fields, ${doc.isPublished ? 'Published' : 'Draft'}`);
    });

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  }
}

// Run import
importRegisterSections();
