const mongoose = require('mongoose');
require('dotenv').config();

const RegisterContent = require('../models/RegisterContent');

async function testRegisterIntegration() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test data for form section
    const formContent = {
      registrationTitle: 'Registration for Summer Training',
      registrationDescription: 'Please fill out the form below',
      formTitleStudent: 'Student Information',
      formTitleGuardian: 'Guardian Information',
      step1: 'Student Info',
      step2: 'Guardian Info',
      nextSteps: 'Next Steps',
      studentName: 'Student Name',
      studentAge: 'Age',
      studentGender: 'Gender',
      male: 'Male',
      female: 'Female',
      grade: 'Grade',
      selectGrade: 'Select Grade',
      studentEmail: 'Student Email (Optional)',
      parentEmailOk: '(Parent email is okay)',
      school: 'School Name',
      experience: 'Programming Experience',
      selectExperience: 'Select Experience Level',
      noExperience: 'No Experience',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      session: 'Preferred Session',
      guardianName: 'Parent/Guardian Name',
      guardianEmail: 'Guardian Email',
      emergency: 'Emergency Phone Number',
      nextButton: 'Next',
      backButton: 'Back',
      submitButton: 'Submit Registration',
      submitting: 'Submitting...',
      errorStudentName: 'Please enter student name',
      errorStudentAge: 'Age must be between 6 and 25',
      errorStudentGender: 'Please select gender',
      errorGrade: 'Please select grade',
      errorStudentEmail: 'Please enter valid email',
      errorSchool: 'Please enter school name',
      errorExperience: 'Please select experience level',
      errorGuardianName: 'Please enter guardian name',
      errorGuardianEmail: 'Please enter valid guardian email',
      errorEmergency: 'Please enter valid phone number (9-15 digits)',
      apiError: 'Failed to submit registration. Please try again.',
      registrationSuccessful: 'Registration Successful!',
      congratulations: 'Congratulations',
      registrationComplete: 'Your registration has been received successfully. We will contact you soon with further details.',
      important: 'Important',
      paymentInstructions: 'Please complete payment within 3 days to confirm your registration.',
      registrationFee: 'Registration Fee',
      registrationFeeDetails: '2000 ETB per student (includes materials and certificate)',
      sessionPreference: 'Session Preference',
      sessionPreferenceDetails: 'Your selected session will be confirmed via email',
      paymentDeadline: 'Payment Deadline',
      paymentDeadlineDetails: 'Payment must be completed within 3 days of registration',
      diagnosticExam: 'Diagnostic Exam',
      diagnosticExamDetails: 'A placement test will be conducted on the first day',
      contactUs: 'Contact Us',
      contactUsDetails: 'For questions, call +251-911-234567 or email info@ethronics.com',
      registerAnotherStudent: 'Register Another Student',
      contactUsButton: 'Contact Us'
    };

    // Test data for gallery section
    const galleryContent = {
      galleryTitle: 'See Our Learning in Action',
      galleryDescription: 'Watch our training videos and explore amazing student projects',
      trainingVideos: 'Training Videos',
      studentProjects: 'Student Projects',
      byStudent: 'By'
    };

    console.log('📝 Creating/Updating Form Section Content...\n');

    // Create/Update form section for all languages
    for (const lang of ['en', 'am', 'om']) {
      const formDoc = await RegisterContent.findOneAndUpdate(
        { language: lang, section: 'form' },
        {
          language: lang,
          section: 'form',
          content: formContent,
          isPublished: true
        },
        { upsert: true, new: true }
      );
      console.log(`✅ Form section (${lang}): ${formDoc._id}`);
    }

    console.log('\n📝 Creating/Updating Gallery Section Content...\n');

    // Create/Update gallery section for all languages
    for (const lang of ['en', 'am', 'om']) {
      const galleryDoc = await RegisterContent.findOneAndUpdate(
        { language: lang, section: 'gallery' },
        {
          language: lang,
          section: 'gallery',
          content: galleryContent,
          isPublished: true
        },
        { upsert: true, new: true }
      );
      console.log(`✅ Gallery section (${lang}): ${galleryDoc._id}`);
    }

    console.log('\n🔍 Verifying Content...\n');

    // Verify form section
    const formEn = await RegisterContent.findOne({ language: 'en', section: 'form' });
    console.log('Form Section (EN) Fields:', Object.keys(formEn.content).length);
    console.log('Sample Fields:', {
      registrationTitle: formEn.content.registrationTitle,
      studentName: formEn.content.studentName,
      submitButton: formEn.content.submitButton
    });

    // Verify gallery section
    const galleryEn = await RegisterContent.findOne({ language: 'en', section: 'gallery' });
    console.log('\nGallery Section (EN) Fields:', Object.keys(galleryEn.content).length);
    console.log('Sample Fields:', {
      galleryTitle: galleryEn.content.galleryTitle,
      trainingVideos: galleryEn.content.trainingVideos,
      studentProjects: galleryEn.content.studentProjects
    });

    console.log('\n✅ All Register sections created and published successfully!');
    console.log('\n📋 Summary:');
    console.log('- Form section: 50+ fields for complete form experience');
    console.log('- Gallery section: 5 fields for gallery labels');
    console.log('- All sections published for en, am, om languages');
    console.log('\n🌐 Test the public page at: http://localhost:3000/register');
    console.log('🔧 Test the admin panel at: http://localhost:5174/register-dashboard');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

testRegisterIntegration();
