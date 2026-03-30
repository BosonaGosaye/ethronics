import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Default content from seeded data
const DEFAULT_CONTENT = {
  en: {
    registrationTitle: "Registration for Summer Training",
    registrationDescription: "Please fill out the form below to register for our Summer Robotics & AI Training. We look forward to seeing you!",
    formTitleStudent: "Student Information",
    formTitleGuardian: "Parent/Guardian Information",
    studentName: "Student Name",
    studentAge: "Student Age",
    studentGender: "Student Gender",
    grade: "Grade Level",
    school: "School Name",
    studentEmail: "Student Email",
    experience: "Robotics Experience",
    session: "Preferred Session",
    guardianName: "Parent/Guardian Name",
    guardianEmail: "Parent/Guardian Email",
    emergency: "Emergency Contact Number",
    nextButton: "Next: Guardian Info",
    backButton: "Back",
    submitButton: "Submit Registration",
    submitting: "Submitting...",
    selectGrade: "Select Grade",
    selectExperience: "Select Experience",
    selectSession: "Select Session",
    placeholderName: "Enter student name",
    placeholderStudentEmail: "student@example.com",
    placeholderSchool: "School name",
    placeholderGuardianName: "Parent/Guardian name",
    placeholderGuardianEmail: "parent@example.com",
    placeholderEmergency: "+251912345678",
    male: "Male",
    female: "Female",
    noExperience: "No Experience",
    beginner: "Beginner",
    intermediate: "Intermediate",
    morning: "Morning (8:00 AM - 12:00 PM)",
    afternoon: "Afternoon (2:00 PM - 6:00 PM)",
    parentEmailOk: "parent's email OK",
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
    step1: "Step 1: Student Info",
    step2: "Step 2: Guardian Info",
    nextSteps: "Next Steps",
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
    contactUsButton: "Contact Us"
  },
  am: {
    registrationTitle: "ለክረምት ስልጠና ምዝገባ",
    registrationDescription: "እባክዎ ለክረምት የሮቦቲክስ እና AI ስልጠናችን ለመመዝገብ ከዚህ በታች ያለውን ቅጽ ይሙሉ። እርስዎን ለማየት እንጠብቃለን!",
    formTitleStudent: "የተማሪ መረጃ",
    formTitleGuardian: "የወላጅ/አሳዳጊ መረጃ",
    studentName: "የተማሪ ስም",
    studentAge: "የተማሪ እድሜ",
    studentGender: "የተማሪ ጾታ",
    grade: "የክፍል ደረጃ",
    school: "የትምህርት ቤት ስም",
    studentEmail: "የተማሪ ኢሜይል",
    experience: "የሮቦቲክስ ልምድ",
    session: "የተመረጠ ክፍለ ጊዜ",
    guardianName: "የወላጅ/አሳዳጊ ስም",
    guardianEmail: "የወላጅ/አሳዳጊ ኢሜይል",
    emergency: "የአደጋ ጊዜ ስልክ ቁጥር",
    nextButton: "ቀጣይ፡ የወላጅ መረጃ",
    backButton: "ተመለስ",
    submitButton: "ምዝገባ አስገባ",
    submitting: "በማስገባት ላይ...",
    selectGrade: "ክፍል ይምረጡ",
    selectExperience: "ልምድ ይምረጡ",
    selectSession: "ክፍለ ጊዜ ይምረጡ",
    male: "ወንድ",
    female: "ሴት",
    noExperience: "ምንም ልምድ የለም",
    beginner: "ጀማሪ",
    intermediate: "መካከለኛ",
    morning: "ጠዋት (8:00 ጠዋት - 12:00 ከሰዓት)",
    afternoon: "ከሰዓት በኋላ (2:00 ከሰዓት - 6:00 ምሽት)",
    parentEmailOk: "የወላጅ ኢሜይል ይቻላል",
    step1: "ደረጃ 1፡ የተማሪ መረጃ",
    step2: "ደረጃ 2፡ የወላጅ መረጃ",
    nextSteps: "ቀጣይ ደረጃዎች",
    registrationSuccessful: "ምዝገባ ተሳክቷል!",
    congratulations: "እንኳን ደስ አለዎት",
    registrationComplete: "ምዝገባ ተጠናቅቋል! ቦታዎን ለማስጠበቅ እነዚህን ደረጃዎች ይከተሉ።",
    important: "አስፈላጊ",
    paymentInstructions: "እባክዎ 200 ብር ቅድመ-ምዝገባ ክፍያ ወደ ሚከተለው የCBE ሂሳብ ይክፈሉ፡ 1000535286942 (ፍሬው አበራ ቢሩ)። ከክፍያ በኋላ የግብይት ቅጽበታዊ ገጽ እይታን ወደ ቴሌግራም መለያችን ይላኩ። ኦፊሴላዊ ደረሰኝዎን ከEthronics በፈተና ቀን ይቀበላሉ።",
    registrationFee: "የምዝገባ ክፍያ",
    registrationFeeDetails: "200 ብር (ተመላሽ የማይደረግ ቅድመ-ምዝገባ ክፍያ) በEthronics Robotics፣ AMG 9ኛ ፎቅ፣ መብራት ሃይል፣ አዳማ፣ ኢትዮጵያ ይክፈሉ። ሰኞ-ቅዳሜ፣ 9 ጠዋት-5 ከሰዓት። 1,000 ብር የምዝገባ ክፍያ የሚከፈለው የምርመራ ፈተናን ካለፉ በኋላ ነው። ወርሃዊ ክፍያ፡ 6,800 ብር።",
    sessionPreference: "የክፍለ ጊዜ ምርጫ",
    sessionPreferenceDetails: "የክፍለ ጊዜ ምርጫዎ በብዛት ድምጽ ላይ በመመስረት ሊለወጥ ይችላል።",
    paymentDeadline: "የክፍያ ቀነ-ገደብ",
    paymentDeadlineDetails: "ከምርመራ ፈተናው በፊት ክፍያ ያጠናቅቁ፣ ሰኔ 30 - ሐምሌ 4፣ 2017 ዓ.ም.።",
    diagnosticExam: "የምርመራ ፈተና",
    diagnosticExamDetails: "ከክፍያ በኋላ፣ የመጨረሻ ተቀባይነትን ለማስጠበቅ የምርመራ ፈተናውን ይውሰዱ።",
    contactUs: "ያግኙን",
    contactUsDetails: "ለጥያቄዎች 0978467467/0955414045 ይደውሉ።",
    registerAnotherStudent: "ሌላ ተማሪ ይመዝግቡ",
    contactUsButton: "ያግኙን"
  },
  om: {
    registrationTitle: "Galmee Leenjii Gannaa",
    registrationDescription: "Maaloo leenjii Roobooliksiifi AI Gannaa keenyaaf galmaa'uuf unka armaan gadii guuti. Isin arguuf eegganna!",
    formTitleStudent: "Odeeffannoo Barattootaa",
    formTitleGuardian: "Odeeffannoo Abbaa/Haadha Manaa",
    studentName: "Maqaa Barattootaa",
    studentAge: "Umurii Barattootaa",
    studentGender: "Saala Barattootaa",
    grade: "Sadarkaa Kutaa",
    school: "Maqaa Mana Barumsaa",
    studentEmail: "Imeelii Barattootaa",
    experience: "Muuxannoo Roobooliksiis",
    session: "Yeroo Filatamaa",
    guardianName: "Maqaa Abbaa/Haadha Manaa",
    guardianEmail: "Imeelii Abbaa/Haadha Manaa",
    emergency: "Lakkoofsa Bilbilaa Yeroo Balaa",
    nextButton: "Itti Aanuu: Odeeffannoo Abbaa Manaa",
    backButton: "Duubatti Deebi'i",
    submitButton: "Galmee Galchi",
    submitting: "Galchuutti jira...",
    selectGrade: "Kutaa Filadhu",
    selectExperience: "Muuxannoo Filadhu",
    selectSession: "Yeroo Filadhu",
    male: "Dhiira",
    female: "Dhalaa",
    noExperience: "Muuxannoo Hin Qabu",
    beginner: "Jalqabaa",
    intermediate: "Giddu Galeessa",
    morning: "Ganama (8:00 - 12:00)",
    afternoon: "Galgala (2:00 - 6:00)",
    parentEmailOk: "imeelii abbaa manaa ni danda'ama",
    step1: "Tarkaanfii 1: Odeeffannoo Barattootaa",
    step2: "Tarkaanfii 2: Odeeffannoo Abbaa Manaa",
    nextSteps: "Tarkaanfiilee Itti Aanan",
    registrationSuccessful: "Galmeen Milkaa'eera!",
    congratulations: "Baga Gammaddan",
    registrationComplete: "Galmeen xumurameera! Bakka kee mirkaneessuuf tarkaanfiilee kana hordofi.",
    important: "Barbaachisaa",
    paymentInstructions: "Maaloo kaffaltii dursee galmaa'uu ETB 200 gara herrega CBE armaan gadiitti kaffalaa: 1000535286942 (FIREW ABERA BIRU). Kaffaltii booda, suuraa daldalaa gara herrega Telegram keenyaatti ergaa. Ragaa ofiisaalaa Ethronics irraa guyyaa qormaataa argatta.",
    registrationFee: "Kaffaltii Galmaa'uu",
    registrationFeeDetails: "ETB 200 (kaffaltii dursee galmaa'uu hin deebifamne) Ethronics Robotics, AMG sadarkaa 9ffaa, Mabrat Hayl, Adaamaa, Itoophiyaatti kaffalaa. Wiixata-Dilbata, 9 ganama-5 galgala. Kaffaltii galmaa'uu ETB 1,000 qormaata xiinxala erga darbanii booda kaffalama. Kaffaltii ji'aa: ETB 6,800.",
    sessionPreference: "Filannoo Yeroo",
    sessionPreferenceDetails: "Filannoo yeroo keetii sagalee baay'inaan jijjiiramuu danda'a.",
    paymentDeadline: "Guyyaa Xumuraa Kaffaltii",
    paymentDeadlineDetails: "Qormaata xiinxala dura kaffaltii xumuri, Waxabajjii 30 - Adoolessa 4, 2017 A.L.",
    diagnosticExam: "Qormaata Xiinxala",
    diagnosticExamDetails: "Kaffaltii booda, fudhatama dhumaa mirkaneessuuf qormaata xiinxala fudhadhu.",
    contactUs: "Nu Quunnamaa",
    contactUsDetails: "Gaaffii qabdaniif 0978467467/0955414045 bilbilaa.",
    registerAnotherStudent: "Barattootaa Biraa Galmaa'i",
    contactUsButton: "Nu Quunnamaa"
  }
};

const RegisterFormEditor = ({ contentByLanguage, onContentChange, currentLanguage }) => {
  const [expandedSection, setExpandedSection] = useState('basic');
  const [content, setContent] = useState({});

  // Initialize content from contentByLanguage with defaults
  useEffect(() => {
    const currentContent = contentByLanguage[currentLanguage] || {};
    const defaultContent = DEFAULT_CONTENT[currentLanguage] || DEFAULT_CONTENT.en;
    
    // Merge with defaults - use fetched content if available, otherwise use defaults
    const mergedContent = { ...defaultContent, ...currentContent };
    setContent(mergedContent);
  }, [currentLanguage, contentByLanguage]);

  const handleChange = (field, value) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
    onContentChange(currentLanguage, updatedContent);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formSections = {
    basic: {
      title: 'Basic Form Labels',
      fields: [
        { key: 'registrationTitle', label: 'Registration Title', placeholder: 'e.g., Registration for Summer Training' },
        { key: 'registrationDescription', label: 'Registration Description', placeholder: 'e.g., Please fill out the form below' },
        { key: 'formTitleStudent', label: 'Form Title - Student Info', placeholder: 'e.g., Student Information' },
        { key: 'formTitleGuardian', label: 'Form Title - Guardian Info', placeholder: 'e.g., Guardian Information' },
        { key: 'step1', label: 'Step 1 Label', placeholder: 'e.g., Student Info' },
        { key: 'step2', label: 'Step 2 Label', placeholder: 'e.g., Guardian Info' },
        { key: 'nextSteps', label: 'Next Steps Label', placeholder: 'e.g., Next Steps' }
      ]
    },
    studentFields: {
      title: 'Student Form Fields',
      fields: [
        { key: 'studentName', label: 'Student Name Label', placeholder: 'e.g., Student Name' },
        { key: 'studentAge', label: 'Student Age Label', placeholder: 'e.g., Age' },
        { key: 'studentGender', label: 'Gender Label', placeholder: 'e.g., Gender' },
        { key: 'male', label: 'Male Option', placeholder: 'e.g., Male' },
        { key: 'female', label: 'Female Option', placeholder: 'e.g., Female' },
        { key: 'grade', label: 'Grade Label', placeholder: 'e.g., Grade' },
        { key: 'selectGrade', label: 'Select Grade Placeholder', placeholder: 'e.g., Select Grade' },
        { key: 'studentEmail', label: 'Student Email Label', placeholder: 'e.g., Student Email' },
        { key: 'parentEmailOk', label: 'Parent Email Note', placeholder: 'e.g., (Parent email is okay)' },
        { key: 'school', label: 'School Label', placeholder: 'e.g., School Name' },
        { key: 'experience', label: 'Experience Label', placeholder: 'e.g., Programming Experience' },
        { key: 'selectExperience', label: 'Select Experience Placeholder', placeholder: 'e.g., Select Experience Level' },
        { key: 'noExperience', label: 'No Experience Option', placeholder: 'e.g., No Experience' },
        { key: 'beginner', label: 'Beginner Option', placeholder: 'e.g., Beginner' },
        { key: 'intermediate', label: 'Intermediate Option', placeholder: 'e.g., Intermediate' },
        { key: 'session', label: 'Session Label', placeholder: 'e.g., Preferred Session' }
      ]
    },
    guardianFields: {
      title: 'Guardian Form Fields',
      fields: [
        { key: 'guardianName', label: 'Guardian Name Label', placeholder: 'e.g., Parent/Guardian Name' },
        { key: 'guardianEmail', label: 'Guardian Email Label', placeholder: 'e.g., Guardian Email' },
        { key: 'emergency', label: 'Emergency Contact Label', placeholder: 'e.g., Emergency Phone Number' }
      ]
    },
    buttons: {
      title: 'Form Buttons',
      fields: [
        { key: 'nextButton', label: 'Next Button Text', placeholder: 'e.g., Next' },
        { key: 'backButton', label: 'Back Button Text', placeholder: 'e.g., Back' },
        { key: 'submitButton', label: 'Submit Button Text', placeholder: 'e.g., Submit Registration' },
        { key: 'submitting', label: 'Submitting Text', placeholder: 'e.g., Submitting...' }
      ]
    },
    errors: {
      title: 'Error Messages',
      fields: [
        { key: 'errorStudentName', label: 'Student Name Error', placeholder: 'e.g., Please enter student name' },
        { key: 'errorStudentAge', label: 'Student Age Error', placeholder: 'e.g., Age must be between 6 and 25' },
        { key: 'errorStudentGender', label: 'Gender Error', placeholder: 'e.g., Please select gender' },
        { key: 'errorGrade', label: 'Grade Error', placeholder: 'e.g., Please select grade' },
        { key: 'errorStudentEmail', label: 'Student Email Error', placeholder: 'e.g., Please enter valid email' },
        { key: 'errorSchool', label: 'School Error', placeholder: 'e.g., Please enter school name' },
        { key: 'errorExperience', label: 'Experience Error', placeholder: 'e.g., Please select experience level' },
        { key: 'errorGuardianName', label: 'Guardian Name Error', placeholder: 'e.g., Please enter guardian name' },
        { key: 'errorGuardianEmail', label: 'Guardian Email Error', placeholder: 'e.g., Please enter valid guardian email' },
        { key: 'errorEmergency', label: 'Emergency Contact Error', placeholder: 'e.g., Please enter valid phone number' },
        { key: 'apiError', label: 'API Error Message', placeholder: 'e.g., Failed to submit. Please try again.' }
      ]
    },
    success: {
      title: 'Success Page Content',
      fields: [
        { key: 'registrationSuccessful', label: 'Success Title', placeholder: 'e.g., Registration Successful!' },
        { key: 'congratulations', label: 'Congratulations Text', placeholder: 'e.g., Congratulations' },
        { key: 'registrationComplete', label: 'Completion Message', placeholder: 'e.g., Your registration has been received', textarea: true },
        { key: 'important', label: 'Important Label', placeholder: 'e.g., Important' },
        { key: 'paymentInstructions', label: 'Payment Instructions', placeholder: 'e.g., Please complete payment to confirm', textarea: true },
        { key: 'registrationFee', label: 'Registration Fee Title', placeholder: 'e.g., Registration Fee' },
        { key: 'registrationFeeDetails', label: 'Fee Details', placeholder: 'e.g., 2000 ETB per student', textarea: true },
        { key: 'sessionPreference', label: 'Session Preference Title', placeholder: 'e.g., Session Preference' },
        { key: 'sessionPreferenceDetails', label: 'Session Details', placeholder: 'e.g., Your selected session will be confirmed', textarea: true },
        { key: 'paymentDeadline', label: 'Payment Deadline Title', placeholder: 'e.g., Payment Deadline' },
        { key: 'paymentDeadlineDetails', label: 'Deadline Details', placeholder: 'e.g., Payment must be completed within 3 days', textarea: true },
        { key: 'diagnosticExam', label: 'Diagnostic Exam Title', placeholder: 'e.g., Diagnostic Exam' },
        { key: 'diagnosticExamDetails', label: 'Exam Details', placeholder: 'e.g., A placement test will be conducted', textarea: true },
        { key: 'contactUs', label: 'Contact Us Title', placeholder: 'e.g., Contact Us' },
        { key: 'contactUsDetails', label: 'Contact Details', placeholder: 'e.g., For questions, call +251...', textarea: true },
        { key: 'registerAnotherStudent', label: 'Register Another Button', placeholder: 'e.g., Register Another Student' },
        { key: 'contactUsButton', label: 'Contact Us Button', placeholder: 'e.g., Contact Us' }
      ]
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>Form Section:</strong> Configure all form labels, error messages, and success page content. 
          These fields control the registration form experience.
        </p>
      </div>

      {Object.entries(formSections).map(([sectionKey, section]) => (
        <div key={sectionKey} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <button
            onClick={() => toggleSection(sectionKey)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            {expandedSection === sectionKey ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Section Content */}
          {expandedSection === sectionKey && (
            <div className="p-4 space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.textarea ? (
                    <textarea
                      value={content[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RegisterFormEditor;
