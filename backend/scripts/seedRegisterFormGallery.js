const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const RegisterContent = require('../models/RegisterContent');

// Translation data from register.js
const translations = {
  en: {
    // Form section fields
    registrationTitle: "Registration for Summer Training",
    registrationDescription: "Please fill out the form below to register for our Summer Robotics & AI Training. We look forward to seeing you!",
    formTitleStudent: "Student Information",
    formTitleGuardian: "Parent/Guardian Information",
    step1: "Step 1: Student Info",
    step2: "Step 2: Guardian Info",
    nextSteps: "Next Steps",
    
    // Student fields
    studentName: "Student Name",
    placeholderStudentName: "Enter full name",
    studentAge: "Student Age",
    studentGender: "Student Gender",
    male: "Male",
    female: "Female",
    grade: "Grade Level",
    selectGrade: "Select Grade",
    studentEmail: "Student Email",
    placeholderStudentEmail: "Enter email",
    parentEmailOk: "parent's email OK",
    school: "School Name",
    placeholderSchool: "Enter school name",
    experience: "Robotics Experience",
    selectExperience: "Select Experience",
    noExperience: "No Experience",
    beginner: "Beginner",
    intermediate: "Intermediate",
    session: "Preferred Session",
    selectSession: "Select session",
    morning: "Morning (8:00 AM - 12:00 PM)",
    afternoon: "Afternoon (2:00 PM - 6:00 PM)",
    
    // Guardian fields
    guardianName: "Parent/Guardian Name",
    placeholderGuardianName: "Enter parent/guardian name",
    guardianEmail: "Parent/Guardian Email",
    placeholderGuardianEmail: "Enter parent/guardian email",
    emergency: "Emergency Contact Number",
    placeholderEmergency: "Enter emergency contact number",
    
    // Buttons
    nextButton: "Next: Guardian Info",
    backButton: "Back",
    submitButton: "Submit Registration",
    submitting: "Submitting...",
    
    // Error messages
    errorStudentName: "Student Name is required.",
    errorStudentAge: "Student Age is required and must be between 6 and 25.",
    errorStudentGender: "Student Gender is required.",
    errorGrade: "Grade Level is required.",
    errorSchool: "School Name is required.",
    errorStudentEmail: "Student Email is invalid.",
    errorExperience: "Robotics Experience is required.",
    errorSession: "Preferred Session is required.",
    errorGuardianName: "Parent/Guardian Name is required.",
    errorGuardianEmail: "Parent/Guardian Email is required.",
    errorEmergency: "Emergency Contact Number is required.",
    apiError: "Failed to submit registration. Please try again.",
    
    // Success page
    registrationSuccessful: "Registration Successful!",
    congratulations: "Congratulations",
    registrationComplete: "Registration complete! Follow these steps to secure your spot.",
    important: "Important",
    paymentInstructions: "Please pay the 200 ETB pre-registration fee to the following CBE account: 1000535286942 (FIREW ABERA BIRU). After payment, send the transaction screenshot to our Telegram account. You will receive your official receipt from Ethronics on the exam day.",
    registrationFee: "Registration Fee",
    registrationFeeDetails: "Pay 200 ETB (non-refundable pre-registration fee) at Ethronics Robotics, AMG 9th Floor, Mebrat Hail, Adama, Ethiopia. Mon–Sat, 9 AM–5 PM. 1,000 ETB registration fee is paid after passing the diagnostic exam. Monthly fee: 6,800 ETB.",
    sessionPreference: "Session Preference",
    sessionPreferenceDetails: "Your session choice is subject to change based on majority vote.",
    paymentDeadline: "Payment Deadline",
    paymentDeadlineDetails: "Complete payment before the diagnostic exam, June 30 – July 4, 2017 E.C.",
    diagnosticExam: "Diagnostic Exam",
    diagnosticExamDetails: "Post-payment, take the diagnostic exam to secure final admission.",
    contactUs: "Contact Us",
    contactUsDetails: "Call 0978467467/0955414045 for inquiries.",
    registerAnotherStudent: "Register Another Student",
    contactUsButton: "Contact Us",
    
    // Gallery section
    galleryTitle: "See Our Learning in Action",
    galleryDescription: "Watch our training videos and explore amazing projects created by our students. These projects showcase the skills they've developed through our program.",
    trainingVideos: "Training Videos",
    studentProjects: "Student Projects",
    byStudent: "By"
  },
  am: {
    // Form section fields
    registrationTitle: "የክረምት ስልጠና ምዝገባ",
    registrationDescription: "ለክረምት ሮቦቲክስ እና AI ስልጠና ለመመዝገብ እባክዎን ከዚህ በታች ያለውን ቅጽ ይሙሉ። እርስዎን ለማየት በጉጉት እንጠባበቃለን!",
    formTitleStudent: "የተማሪ መረጃ",
    formTitleGuardian: "የወላጅ/ተጠንቃቂ መረጃ",
    step1: "ደረጃ 1፡ የተማሪ መረጃ",
    step2: "ደረጃ 2፡ የወላጅ መረጃ",
    nextSteps: "ቀጣይ ደረጃዎች",
    
    // Student fields
    studentName: "የተማሪ ስም",
    placeholderStudentName: "ሙሉ ስም ያስገቡ",
    studentAge: "የተማሪ ዕድሜ",
    studentGender: "የተማሪ ጾታ",
    male: "ወንድ",
    female: "ሴት",
    grade: "የክፍል ደረጃ",
    selectGrade: "ክፍል ይምረጡ",
    studentEmail: "የተማሪ ኢሜል",
    placeholderStudentEmail: "ኢሜል ያስገቡ",
    parentEmailOk: "የወላጅ ኢሜይል መጠቀም ይቻላል",
    school: "የትምህርት ቤት ስም",
    placeholderSchool: "የትምህርት ቤት ስም ያስገቡ",
    experience: "የሮቦቲክስ ልምድ",
    selectExperience: "ልምድ ይምረጡ",
    noExperience: "ምንም ልምድ የለም",
    beginner: "ጀማሪ",
    intermediate: "መካከለኛ",
    session: "ተመራጭ ክፍለ ጊዜ",
    selectSession: "ክፍለ ጊዜ ይምረጡ",
    morning: "ጠዋት (8:00 ጠዋት - 12:00 ከሰዓት)",
    afternoon: "ከሰዓት በኋላ (2:00 ከሰዓት - 6:00 ምሽት)",
    
    // Guardian fields
    guardianName: "የወላጅ/ተጠንቃቂ ስም",
    placeholderGuardianName: "የወላጅ/ተጠንቃቂ ስም ያስገቡ",
    guardianEmail: "የወላጅ/ተጠንቃቂ ኢሜል",
    placeholderGuardianEmail: "የወላጅ/ተጠንቃቂ ኢሜል ያስገቡ",
    emergency: "የድንገተኛ ግንኙነት ቁጥር",
    placeholderEmergency: "የድንገተኛ ግንኙነት ቁጥር ያስገቡ",
    
    // Buttons
    nextButton: "ቀጣይ፡ የወላጅ መረጃ",
    backButton: "ተመለስ",
    submitButton: "ምዝገባ አስገባ",
    submitting: "በማስገባት ላይ...",
    
    // Error messages
    errorStudentName: "የተማሪ ስም ያስፈልጋል።",
    errorStudentAge: "የተማሪ ዕድሜ ያስፈልጋል እና 6 እስከ 25 መካከል መሆን አለበት።",
    errorStudentGender: "የተማሪ ጾታ ያስፈልጋል።",
    errorGrade: "የክፍል ደረጃ ያስፈልጋል።",
    errorSchool: "የትምህርት ቤት ስም ያስፈልጋል።",
    errorStudentEmail: "የተማሪ ኢሜል ትክክል አይደለም።",
    errorExperience: "የሮቦቲክስ ልምድ ያስፈልጋል።",
    errorSession: "ተመራጭ ክፍለ ጊዜ ያስፈልጋል።",
    errorGuardianName: "የወላጅ/ተጠንቃቂ ስም ያስፈልጋል።",
    errorGuardianEmail: "የወላጅ/ተጠንቃቂ ኢሜል ያሸፈልጋል።",
    errorEmergency: "የድንገተኛ ግንኙነት ቁጥር ያስፈልጋል።",
    apiError: "ምዝገባን ለማስገባት አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
    
    // Success page
    registrationSuccessful: "ምዝገባ ተሳክቷል!",
    congratulations: "እንኳን ደስ ያለዎት",
    registrationComplete: "ምዝገባዎ ተጠናቋል! ቦታዎን ለመጠበቅ እነዚህን ደረጃዎች ይከተሉ።",
    important: "አስፈላጊ",
    paymentInstructions: "200 ብር የቅድመ-ምዝገባ ክፍያዎን ወደዚህ የCBE መለያ ቁጥር ይክፈሉ፡ 1000535286942 (FIREW ABERA BIRU)። ክፍያውን ካከናወኑ በኋላ የግብይት ስክሪንሾትን ወደ Telegram አካውንታችን ይላኩ። የኢትሮኒክስ ደረሰኙን በፈተናው ቀን ያገኛሉ።",
    registrationFee: "የምዝገባ ክፍያ",
    registrationFeeDetails: "200 ብር (የቅድመ-ምዝገባ ክፍያ፣ ተመላሽ የማይደረግ) በEthronics Robotics, AMG 9ኛ ፎቅ, መብራት ኃይል, አዳማ ይክፈሉ። ሰኞ–ቅዳሜ፣ 3፡00–11፡00 ሰዓት። 1,000 ብር የምዝገባ ክፍያ ከማጣሪያ ፈተና በኋላ ይክፈላል። ወርሃዊ ክፍያ፡ 6,800 ብር።",
    sessionPreference: "የስልጠና ሰዓት ምርጫ",
    sessionPreferenceDetails: "የመረጡት የስልጠና ሰዓት በብዙሃኑ ድምፅ መሰረት ሊለወጥ ይችላል።",
    paymentDeadline: "የክፍያ ገደብ",
    paymentDeadlineDetails: "ክፍያዎን ከሰኔ 30– ሀምሌ 4፣ 2017 ዓ.ም ማጣሪያ ፈተና በፊት ይጠንቀቁ።",
    diagnosticExam: "ማጣሪያ ፈተና",
    diagnosticExamDetails: "ክፍያ በኋላ፣ የመጨረሻ ተቀባይነት ለማግኘት ማጣሪያ ፈተና ይውሰዱ።",
    contactUs: "ያግኙን",
    contactUsDetails: "ለጥያቄ 0978467467/0955414045 ይደውሉ።",
    registerAnotherStudent: "ሌላ ተማሪ መመዝገብ",
    contactUsButton: "ያግኙን",
    
    // Gallery section
    galleryTitle: "ትምህርታችንን በተግባር ይመልከቱ",
    galleryDescription: "የስልጠና ቪዲዎቻችንን ይመልከቱ እና ተማሪዎቻችን የፈጠሩትን አስደናቂ ፕሮጀክቶች ያስሱ። እነዚህ ፕሮጀክቶች በፕሮግራማችን ውስጥ ያዳበሩትን ችሎታዎች ያሳያሉ።",
    trainingVideos: "የስልጠና ቪዲዮዎች",
    studentProjects: "የተማሪ ፕሮጀክቶች",
    byStudent: "በ"
  },
  om: {
    // Form section fields
    registrationTitle: "Galmee Leenjii Gannaa",
    registrationDescription: "Leenjii Robotics & AI Gannaa keenyaaf galmaa'uuf unka armaan gadii guutaa. Isin arguuf hawwii guddaan eegganna!",
    formTitleStudent: "Odeeffannoo Barataa",
    formTitleGuardian: "Odeeffannoo Maatii",
    step1: "Kutaa 1: Odeeffannoo Barataa",
    step2: "Kutaa 2: Odeeffannoo Maatii",
    nextSteps: "Sadarkaawwan ittaanu",
    
    // Student fields
    studentName: "Maqaa Barataa",
    placeholderStudentName: "Maqaa guutuu galchi",
    studentAge: "Umurii Barataa",
    studentGender: "Koorniyaa Barataa",
    male: "Dhiira",
    female: "Dhala",
    grade: "Sadarkaa Kutaa",
    selectGrade: "Kutaa Filadhu",
    studentEmail: "Imeelii Barataa",
    placeholderStudentEmail: "Imeelii galchi",
    parentEmailOk: "Email maatii fayyadamuu dandeessa",
    school: "Maqaa Mana Barumsaa",
    placeholderSchool: "Maqaa mana barumsaa galchi",
    experience: "Muuxannoo Robootiksii",
    selectExperience: "Muuxannoo Filadhu",
    noExperience: "Muuxannoo Hin Qabu",
    beginner: "Jalqabaa",
    intermediate: "Giddu Galeessa",
    session: "Yeroo Filatamaa",
    selectSession: "Yeroo filadhu",
    morning: "Ganama (8:00 - 12:00)",
    afternoon: "Galgala (2:00 - 6:00)",
    
    // Guardian fields
    guardianName: "Maqaa Maatii",
    placeholderGuardianName: "Maqaa maatii galchi",
    guardianEmail: "Imeelii Maatii",
    placeholderGuardianEmail: "Imeelii maatii galchi",
    emergency: "Lakkoofsa Bilbila Ariifachiisaa",
    placeholderEmergency: "Lakkoofsa bilbila ariifachiisaa galchi",
    
    // Buttons
    nextButton: "Itti Fufi: Odeeffannoo Maatii",
    backButton: "Deebi'i",
    submitButton: "Galmee Galchi",
    submitting: "Galchuutti...",
    
    // Error messages
    errorStudentName: "Maqaan Barataa barbaachisaa dha.",
    errorStudentAge: "Umuriin Barataa barbaachisaa fi 6 hanga 25 gidduutti ta'uu qaba.",
    errorStudentGender: "Koorniyaan Barataa barbaachisaa dha.",
    errorGrade: "Sadarkaan Kutaa barbaachisaa dha.",
    errorSchool: "Maqaan Mana Barumsaa barbaachisaa dha.",
    errorStudentEmail: "Imeeliin Barataa sirrii miti.",
    errorExperience: "Muuxannoon Robootiksii barbaachisaa dha.",
    errorSession: "Yeroon Filatamaa barbaachisaa dha.",
    errorGuardianName: "Maqaan Maatii barbaachisaa dha.",
    errorGuardianEmail: "Imeeliin Maatii barbaachisaa dha.",
    errorEmergency: "Lakkoofsi Bilbila Ariifachiisaa barbaachisaa dha.",
    apiError: "Galmeen hin milkoofne. Mee irra deebi'aa.",
    
    // Success page
    registrationSuccessful: "Galmeen milkaa'e!",
    congratulations: "Baga gammade",
    registrationComplete: "Galmeen xumurame! Bakka keessan eeguuf sadarkaawwanan hordofaa.",
    important: "Murteessaa",
    paymentInstructions: "Kaffaltii 200 Qarshii pre-registration gara lakkoofsa CBE kanaatti raawwachiisaa: 1000535286942 (FIREW ABERA BIRU). Erga kaffaltanii booda, suuraa ragaa tajaajila Telegram keenya irratti nuuf ergaa.",
    registrationFee: "Kaffaltii galmee",
    registrationFeeDetails: "200 Qarshii (pre-registration, hin deebi'amne) Ethronics Robotics, AMG 9ffaa, Mebrat Hail, Adama, Itoophiyaa keessatti kaffalaa. Wiixii–Ji'oolii, 3:00–11:00. 1,000 Qarshii galmee booda, maqa filannoo darbanii booda kaffalama. Kaffaltii ji'aa: 6,800 Qarshii.",
    sessionPreference: "Filannoo Sa'aatii",
    sessionPreferenceDetails: "Filannoon sa'aatii keessan sagantaa dhaabbataa irratti hundaa'ee jijjiiramuu danda'a.",
    paymentDeadline: "Baka kaffaltii",
    paymentDeadlineDetails: "Kaffaltii Waxabajjii 30– Adoolessa 4, 2017 A.L.I. dura xumuraa.",
    diagnosticExam: "Roomii Filannoo",
    diagnosticExamDetails: "Kaffaltii booda, bakka itti galuuf roomii filannoo fudhachaa.",
    contactUs: "Nu qunnamaa",
    contactUsDetails: "Gaaffii yoo qabaattan 0978467467/0955414045 bilbilaa.",
    registerAnotherStudent: "Barataa biraa galchaa",
    contactUsButton: "Nu qunnamaa",
    
    // Gallery section
    galleryTitle: "Barnoota Keenya Gocha Keessatti Ilaalaa",
    galleryDescription: "Viidiyoo barbaachisoo keenya ilaalaa fi proojektoota barattoota keenyaan uumaman kan ajaa'ibsiisoo ta'an saagaa. Proojektoonni kun dandeettii barattoonni keenya prograama keenya keessatti dagaagsan argisiisu.",
    trainingVideos: "Viidiyoowwan Leenjii",
    studentProjects: "Pirojektoota Barattoota",
    byStudent: "Kan"
  }
};

async function seedRegisterFormGallery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('📝 Seeding Form and Gallery Sections...\n');

    // Seed for all languages
    for (const [langCode, content] of Object.entries(translations)) {
      console.log(`\n🌐 Processing ${langCode.toUpperCase()} language...`);

      // Create Form Section
      const formDoc = await RegisterContent.findOneAndUpdate(
        { language: langCode, section: 'form' },
        {
          language: langCode,
          section: 'form',
          content: content,
          isPublished: true
        },
        { upsert: true, new: true }
      );
      console.log(`  ✅ Form section created/updated: ${formDoc._id}`);

      // Create Gallery Section
      const galleryContent = {
        galleryTitle: content.galleryTitle,
        galleryDescription: content.galleryDescription,
        trainingVideos: content.trainingVideos,
        studentProjects: content.studentProjects,
        byStudent: content.byStudent
      };

      const galleryDoc = await RegisterContent.findOneAndUpdate(
        { language: langCode, section: 'gallery' },
        {
          language: langCode,
          section: 'gallery',
          content: galleryContent,
          isPublished: true
        },
        { upsert: true, new: true }
      );
      console.log(`  ✅ Gallery section created/updated: ${galleryDoc._id}`);
    }

    console.log('\n\n🔍 Verification...\n');

    // Verify Form Section
    const formEn = await RegisterContent.findOne({ language: 'en', section: 'form' });
    console.log('📋 Form Section (EN):');
    console.log(`  - Total fields: ${Object.keys(formEn.content).length}`);
    console.log(`  - Published: ${formEn.isPublished ? 'Yes ✓' : 'No ✗'}`);
    console.log(`  - Sample fields:`, {
      registrationTitle: formEn.content.registrationTitle,
      studentName: formEn.content.studentName,
      submitButton: formEn.content.submitButton
    });

    // Verify Gallery Section
    const galleryEn = await RegisterContent.findOne({ language: 'en', section: 'gallery' });
    console.log('\n🖼️  Gallery Section (EN):');
    console.log(`  - Total fields: ${Object.keys(galleryEn.content).length}`);
    console.log(`  - Published: ${galleryEn.isPublished ? 'Yes ✓' : 'No ✗'}`);
    console.log(`  - Fields:`, galleryEn.content);

    console.log('\n\n✅ SUCCESS! All sections seeded and published!\n');
    console.log('📊 Summary:');
    console.log('  - Form section: 50+ fields for complete registration form');
    console.log('  - Gallery section: 5 fields for gallery labels');
    console.log('  - Languages: English (en), Amharic (am), Oromo (om)');
    console.log('  - Status: All published ✓\n');
    console.log('🌐 Test URLs:');
    console.log('  - Public page: http://localhost:3000/register');
    console.log('  - Admin panel: http://localhost:5174/register-dashboard\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the seed function
seedRegisterFormGallery();
