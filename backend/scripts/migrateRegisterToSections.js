const mongoose = require('mongoose');
require('dotenv').config();

// Old schema (for reading existing data)
const oldRegisterContentSchema = new mongoose.Schema({
  language: String,
  content: mongoose.Schema.Types.Mixed,
  isPublished: Boolean,
  lastModifiedBy: mongoose.Schema.Types.ObjectId
}, { timestamps: true, collection: 'registercontents' });

const OldRegisterContent = mongoose.model('OldRegisterContent', oldRegisterContentSchema);

// New schema (for writing new data)
const newRegisterContentSchema = new mongoose.Schema({
  language: String,
  section: String,
  content: mongoose.Schema.Types.Mixed,
  isPublished: Boolean,
  lastModifiedBy: mongoose.Schema.Types.ObjectId
}, { timestamps: true, collection: 'registercontents_new' });

const NewRegisterContent = mongoose.model('NewRegisterContent', newRegisterContentSchema);

// Section mapping - maps old content keys to new sections
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
  gallery: ['galleryTitle', 'galleryDescription', 'trainingVideos', 'studentProjects', 'byStudent', 'ctaButton'],
  nextSteps: [
    'nextSteps', 'registrationSuccessful', 'congratulations', 'registrationComplete',
    'important', 'paymentInstructions', 'registrationFee', 'registrationFeeDetails',
    'sessionPreference', 'sessionPreferenceDetails', 'paymentDeadline', 'paymentDeadlineDetails',
    'diagnosticExam', 'diagnosticExamDetails', 'contactUs', 'contactUsDetails',
    'registerAnotherStudent', 'contactUsButton'
  ]
};

async function migrateRegisterData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all old register content
    const oldContent = await OldRegisterContent.find();
    console.log(`Found ${oldContent.length} register content documents to migrate`);

    if (oldContent.length === 0) {
      console.log('No data to migrate. Exiting...');
      process.exit(0);
    }

    // Clear new collection
    await NewRegisterContent.deleteMany({});
    console.log('Cleared new collection');

    let migratedCount = 0;

    // Process each language
    for (const doc of oldContent) {
      console.log(`\nMigrating ${doc.language} content...`);
      
      // Create a document for each section
      for (const [sectionName, keys] of Object.entries(sectionMapping)) {
        const sectionContent = {};
        
        // Extract relevant keys for this section
        keys.forEach(key => {
          if (doc.content[key] !== undefined) {
            sectionContent[key] = doc.content[key];
          }
        });

        // Only create section if it has content
        if (Object.keys(sectionContent).length > 0) {
          await NewRegisterContent.create({
            language: doc.language,
            section: sectionName,
            content: sectionContent,
            isPublished: doc.isPublished || false,
            lastModifiedBy: doc.lastModifiedBy,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
          });
          
          migratedCount++;
          console.log(`  ✓ Created ${sectionName} section (${Object.keys(sectionContent).length} fields)`);
        }
      }
    }

    console.log(`\n✅ Migration complete! Created ${migratedCount} section documents`);
    
    // Show what was created
    const newDocs = await NewRegisterContent.find().sort({ language: 1, section: 1 });
    console.log('\nNew structure:');
    newDocs.forEach(doc => {
      console.log(`  ${doc.language} - ${doc.section}: ${Object.keys(doc.content).length} fields, ${doc.isPublished ? 'Published' : 'Draft'}`);
    });

    console.log('\n⚠️  IMPORTANT: Review the migration above.');
    console.log('If everything looks good, run the following commands in MongoDB:');
    console.log('  1. db.registercontents.renameCollection("registercontents_backup")');
    console.log('  2. db.registercontents_new.renameCollection("registercontents")');
    console.log('\nOr use this script to do it automatically (uncomment the code below)');

    // Uncomment to automatically swap collections
    /*
    await mongoose.connection.db.collection('registercontents').rename('registercontents_backup');
    await mongoose.connection.db.collection('registercontents_new').rename('registercontents');
    console.log('\n✅ Collections swapped! Old data backed up to registercontents_backup');
    */

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

migrateRegisterData();
