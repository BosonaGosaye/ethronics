const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const RegisterContent = require('../models/RegisterContent');

// Organized register content by section
const registerContentData = {
  en: {
    hero: {
      title: "Summer Robotic Engineering and AI Training",
      description: "Join our 8-week training (July 2 - September 4, 2017/18) for grades 4-12. Build robots, learn to code, and have fun with cool projects. No experience needed—start your STEM adventure!",
      button: "Register Now",
      image: "/src/assets/training-xgzfTKXW.jpg"
    },
    objective: {
      title: "Discover the Fun of Robotics",
      description: "Get ready for an awesome summer training where you'll build robots, code fun projects, and make new friends. Learn cool stuff and create things you'll love to show off!",
      points: [
        "Build Robots: Create your own robots with fun tools and see them move!",
        "Learn to Code: Use Python and Arduino to make your robots do cool things.",
        "Make Smart Projects: Build projects that use sensors to act on their own.",
        "Have Fun Creating: Work on exciting challenges and show off your ideas."
      ]
    },
    highlights: {
      title: "Training Highlights",
      roboticsTitle: "Robotics",
      roboticsDescription: "Build and program robots with fun tools. Learn how to make them move and work.",
      codingTitle: "Coding",
      codingDescription: "Learn Python and Arduino coding. Make your robots do awesome things.",
      autonomousTitle: "Smart Projects",
      autonomousDescription: "Use sensors to create projects that move and think on their own."
    },
    form: {
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
      registrationTitle: "Registration for Summer Training",
      registrationDescription: "Please fill out the form below to register for our Summer Robotics & AI Training. We look forward to seeing you!"
    },
    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          question: "What will I learn at training?",
          answer: "You'll learn to build and program robots, code with Python and Arduino, and make cool projects that move and sense things!"
        },
        {
          question: "Do I need to know coding or robotics already?",
          answer: "Nope! Our training is for beginners and kids with some experience. We'll teach you everything you need to know."
        },
        {
          question: "What should I bring to training?",
          answer: "Just bring a water bottle, a snack, and your excitement! We provide all the robots, computers, and tools."
        }
      ]
    },
    gallery: {
      galleryTitle: "See Our Learning in Action",
      galleryDescription: "Watch our training videos and explore amazing projects created by our students. These projects showcase the skills they've developed through our program.",
      trainingVideos: "Training Videos",
      studentProjects: "Student Projects",
      byStudent: "By"
    },
    nextSteps: {
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
    cta: {
      ctaTitle: "Hurry! Limited Spots Available",
      ctaDescription: "Don't miss out on this exciting opportunity to join our Summer Robotics & Coding training. Spots are filling up fast, so register now to secure your place!",
      ctaButton: "Register Now"
    }
  },
  am: {
    hero: {
      title: "የክረምት የሮቦቲክስ ምህንድስና እና AI ስልጠና",
      description: "ለ4-12ኛ ክፍል ተማሪዎች የ8 ሳምንት ስልጠና (ጁላይ 2 - ሴፕቴምበር 4, 2017/18) ይቀላቀሉ። ሮቦቶችን ይገንቡ፣ ኮድ ማድረግ ይማሩ እና በጥሩ ፕሮጀክቶች ይዝናኑ። ምንም ልምድ አያስፈልግም—የSTEM ጀብዱዎን ይጀምሩ!",
      button: "አሁን ይመዝገቡ",
      image: "/src/assets/training-xgzfTKXW.jpg"
    },
    objective: {
      title: "የሮቦቲክስ ደስታን ያግኙ",
      description: "ሮቦቶችን የሚገነቡበት፣ አስደሳች ፕሮጀክቶችን የሚያስተካክሉበት እና አዳዲስ ጓደኞችን የሚያገኙበት አስደሳች የክረምት ስልጠና ለመጀመር ዝግጁ ይሁኑ። አስደሳች ነገሮችን ይማሩ እና ለማሳየት የሚወዱትን ነገሮች ይፍጠሩ!",
      points: [
        "ሮቦቶችን ይገንቡ፡ በአስደሳች መሳሪያዎች የራስዎን ሮቦቶች ይፍጠሩ እና እንዴት እንደሚንቀሳቀሱ ይመልከቱ!",
        "ኮድ ማድረግ ይማሩ፡ ሮቦቶችዎ አስደሳች ነገሮችን እንዲያደርጉ Python እና Arduino ይጠቀሙ።",
        "ብልህ ፕሮጀክቶችን ይፍጠሩ፡ በራሳቸው የሚሰሩ ሴንሰሮችን የሚጠቀሙ ፕሮጀክቶችን ይገንቡ።",
        "በመፍጠር ይዝናኑ፡ አስደሳች ፈተናዎች ላይ ይስሩ እና ሀሳቦችዎን ያሳዩ።"
      ]
    },
    highlights: {
      title: "የስልጠና ዋና ነጥቦች",
      roboticsTitle: "ሮቦቲክስ",
      roboticsDescription: "በአስደሳች መሳሪያዎች ሮቦቶችን ይገንቡ እና ፕሮግራም ያድርጉ። እንዴት እንደሚንቀሳቀሱ እና እንደሚሰሩ ይማሩ።",
      codingTitle: "ኮዲንግ",
      codingDescription: "Python እና Arduino ኮዲንግ ይማሩ። ሮቦቶችዎ አስደሳች ነገሮችን እንዲያደርጉ ያድርጉ።",
      autonomousTitle: "ብልህ ፕሮጀክቶች",
      autonomousDescription: "በራሳቸው የሚንቀሳቀሱ እና የሚያስቡ ፕሮጀክቶችን ለመፍጠር ሴንሰሮችን ይጠቀሙ።"
    },
    form: {
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
      placeholderName: "የተማሪ ስም ያስገቡ",
      placeholderStudentEmail: "student@example.com",
      placeholderSchool: "የትምህርት ቤት ስም",
      placeholderGuardianName: "የወላጅ/አሳዳጊ ስም",
      placeholderGuardianEmail: "parent@example.com",
      placeholderEmergency: "+251912345678",
      male: "ወንድ",
      female: "ሴት",
      noExperience: "ምንም ልምድ የለም",
      beginner: "ጀማሪ",
      intermediate: "መካከለኛ",
      morning: "ጠዋት (8:00 ጠዋት - 12:00 ከሰዓት)",
      afternoon: "ከሰዓት በኋላ (2:00 ከሰዓት - 6:00 ምሽት)",
      parentEmailOk: "የወላጅ ኢሜይል ይቻላል",
      errorStudentName: "የተማሪ ስም ያስፈልጋል።",
      errorStudentAge: "የተማሪ እድሜ ያስፈልጋል እና ከ6 እስከ 25 መሆን አለበት።",
      errorStudentGender: "የተማሪ ጾታ ያስፈልጋል።",
      errorGrade: "የክፍል ደረጃ ያስፈልጋል።",
      errorSchool: "የትምህርት ቤት ስም ያስፈልጋል።",
      errorStudentEmail: "የተማሪ ኢሜይል ልክ አይደለም።",
      errorExperience: "የሮቦቲክስ ልምድ ያስፈልጋል።",
      errorSession: "የተመረጠ ክፍለ ጊዜ ያስፈልጋል።",
      errorGuardianName: "የወላጅ/አሳዳጊ ስም ያስፈልጋል።",
      errorGuardianEmail: "የወላጅ/አሳዳጊ ኢሜይል ያስፈልጋል።",
      errorEmergency: "የአደጋ ጊዜ ስልክ ቁጥር ያስፈልጋል።",
      apiError: "ምዝገባ ማስገባት አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
      step1: "ደረጃ 1፡ የተማሪ መረጃ",
      step2: "ደረጃ 2፡ የወላጅ መረጃ",
      registrationTitle: "ለክረምት ስልጠና ምዝገባ",
      registrationDescription: "እባክዎ ለክረምት የሮቦቲክስ እና AI ስልጠናችን ለመመዝገብ ከዚህ በታች ያለውን ቅጽ ይሙሉ። እርስዎን ለማየት እንጠብቃለን!"
    },
    faq: {
      title: "በተደጋጋሚ የሚጠየቁ ጥያቄዎች",
      questions: [
        {
          question: "በስልጠናው ላይ ምን እማራለሁ?",
          answer: "ሮቦቶችን መገንባት እና ፕሮግራም ማድረግ፣ በPython እና Arduino ኮድ ማድረግ እና የሚንቀሳቀሱ እና ነገሮችን የሚሰማቸው አስደሳች ፕሮጀክቶችን መፍጠር ይማራሉ!"
        },
        {
          question: "ቀድሞውኑ ኮዲንግ ወይም ሮቦቲክስ ማወቅ አለብኝ?",
          answer: "አይ! ስልጠናችን ለጀማሪዎች እና የተወሰነ ልምድ ላላቸው ልጆች ነው። ማወቅ የሚያስፈልግዎትን ሁሉ እናስተምርዎታለን።"
        },
        {
          question: "ወደ ስልጠናው ምን ማምጣት አለብኝ?",
          answer: "የውሃ ጠርሙስ፣ መክሰስ እና ደስታዎን ብቻ ያምጡ! ሁሉንም ሮቦቶች፣ ኮምፒውተሮች እና መሳሪያዎች እኛ እናቀርባለን።"
        }
      ]
    },
    gallery: {
      galleryTitle: "የእኛን ትምህርት በተግባር ይመልከቱ",
      galleryDescription: "የስልጠና ቪዲዮዎቻችንን ይመልከቱ እና በተማሪዎቻችን የተፈጠሩ አስደናቂ ፕሮጀክቶችን ያስሱ። እነዚህ ፕሮጀክቶች በፕሮግራማችን የተገነቡትን ክህሎቶች ያሳያሉ።",
      trainingVideos: "የስልጠና ቪዲዮዎች",
      studentProjects: "የተማሪ ፕሮጀክቶች",
      byStudent: "በ"
    },
    nextSteps: {
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
    cta: {
      ctaTitle: "ቸኩሉ! የተወሰኑ ቦታዎች ይገኛሉ",
      ctaDescription: "ለክረምት የሮቦቲክስ እና ኮዲንግ ስልጠናችን የመቀላቀል ይህን አስደሳች እድል አያመልጥዎት። ቦታዎች በፍጥነት እየተሞሉ ነው፣ ስለዚህ ቦታዎን ለማስጠበቅ አሁን ይመዝገቡ!",
      ctaButton: "አሁን ይመዝገቡ"
    }
  },
  om: {
    hero: {
      title: "Leenjii Injinariingii Roobooliksiifi AI Gannaa",
      description: "Leenjii torban 8 (Adoolessa 2 - Fulbaana 4, 2017/18) kutaa 4-12f qopheeffame kana hirmaadha. Roobota ijaari, koodii barbaadi, fi pirojektii gaarii waliin gammadi. Muuxannoon hin barbaachisu—imala STEM kee jalqabi!",
      button: "Amma Galmaa'i",
      image: "/src/assets/training-xgzfTKXW.jpg"
    },
    objective: {
      title: "Gammachuu Roobooliksiitiin Argadhu",
      description: "Leenjii gannaa ajaa'ibaa roobota ijaartu, pirojektii gaarii koodii godhu, fi hiriyyoota haaraa argadhu qopheeffameef qophaa'i. Waan gaarii barbaadi fi waan agarsiisuu jaallattuu uumi!",
      points: [
        "Roobota Ijaari: Meeshaalee gaarii fayyadamuun roobota kee ofii keetii uumiitii akkamitti akka socho'an ilaali!",
        "Koodii Barbaadi: Python fi Arduino fayyadamuun roobota kee waan ajaa'ibaa akka hojjetan godhi.",
        "Pirojektii Ogummaa Uumi: Seensaroota fayyadamuun pirojektii ofuma isaaniitiin hojjatan ijaari.",
        "Uumuun Gammadi: Qormaata gammachiisaa irratti hojjedhu fi yaada kee agarsiisi."
      ]
    },
    highlights: {
      title: "Qabxiilee Leenjii",
      roboticsTitle: "Roobooliksiis",
      roboticsDescription: "Meeshaalee gaarii fayyadamuun roobota ijaariitii sagantaa godhi. Akkamitti akka socho'anii fi hojjetan barbaadi.",
      codingTitle: "Koodiingii",
      codingDescription: "Koodii Python fi Arduino barbaadi. Roobota kee waan ajaa'ibaa akka hojjetan godhi.",
      autonomousTitle: "Pirojektii Ogummaa",
      autonomousDescription: "Pirojektii ofuma isaaniitiin socho'anii fi yaadan uumuuf seensaroota fayyadami."
    },
    form: {
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
      placeholderName: "Maqaa barattootaa galchi",
      placeholderStudentEmail: "student@example.com",
      placeholderSchool: "Maqaa mana barumsaa",
      placeholderGuardianName: "Maqaa abbaa/haadha manaa",
      placeholderGuardianEmail: "parent@example.com",
      placeholderEmergency: "+251912345678",
      male: "Dhiira",
      female: "Dhalaa",
      noExperience: "Muuxannoo Hin Qabu",
      beginner: "Jalqabaa",
      intermediate: "Giddu Galeessa",
      morning: "Ganama (8:00 - 12:00)",
      afternoon: "Galgala (2:00 - 6:00)",
      parentEmailOk: "imeelii abbaa manaa ni danda'ama",
      errorStudentName: "Maqaan barattootaa barbaachisaadha.",
      errorStudentAge: "Umurii barattootaa barbaachisaa fi 6 hanga 25 ta'uu qaba.",
      errorStudentGender: "Saalli barattootaa barbaachisaadha.",
      errorGrade: "Sadarkaan kutaa barbaachisaadha.",
      errorSchool: "Maqaan mana barumsaa barbaachisaadha.",
      errorStudentEmail: "Imeeliin barattootaa sirrii miti.",
      errorExperience: "Muuxannoon roobooliksiis barbaachisaadha.",
      errorSession: "Yeroon filatamaa barbaachisaadha.",
      errorGuardianName: "Maqaan abbaa/haadha manaa barbaachisaadha.",
      errorGuardianEmail: "Imeeliin abbaa/haadha manaa barbaachisaadha.",
      errorEmergency: "Lakkoofsi bilbilaa yeroo balaa barbaachisaadha.",
      apiError: "Galmee galchuun hin milkoofne. Maaloo irra deebi'ii yaali.",
      step1: "Tarkaanfii 1: Odeeffannoo Barattootaa",
      step2: "Tarkaanfii 2: Odeeffannoo Abbaa Manaa",
      registrationTitle: "Galmee Leenjii Gannaa",
      registrationDescription: "Maaloo leenjii Roobooliksiifi AI Gannaa keenyaaf galmaa'uuf unka armaan gadii guuti. Isin arguuf eegganna!"
    },
    faq: {
      title: "Gaaffilee Yeroo Baay'ee Gaafataman",
      questions: [
        {
          question: "Leenjii kana irratti maal nan barbaada?",
          answer: "Roobota ijaaruu fi sagantaa gochuu, Python fi Arduino waliin koodii gochuu, fi pirojektii ajaa'ibaa socho'anii fi waan qaban qaban uumuu barbaadda!"
        }
      ]
    },
    gallery: {
      galleryTitle: "Barnoota Keenya Hojii Irratti Ilaali",
      galleryDescription: "Viidiyoo leenjii keenyaa ilaalii fi pirojektii ajaa'ibaa barattoota keenyaan uumaman qoradhu.",
      trainingVideos: "Viidiyoo Leenjii",
      studentProjects: "Pirojektii Barattootaa",
      byStudent: "Kanaan"
    },
    nextSteps: {
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
    },
    cta: {
      ctaTitle: "Ariifadhaa! Bakki Muraasa Jira",
      ctaDescription: "Carraa ajaa'ibaa kana hin dhabinaa! Amma galmaa'aa.",
      ctaButton: "Amma Galmaa'i"
    }
  }
};

async function seedRegisterContent() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🗑️  Clearing existing register content...');
    await RegisterContent.deleteMany({});
    console.log('✅ Cleared existing content\n');

    const languages = ['en', 'am', 'om'];
    const sections = ['hero', 'objective', 'highlights', 'form', 'faq', 'gallery', 'nextSteps', 'cta'];
    let importedCount = 0;

    console.log('📥 Importing register content sections...\n');

    for (const language of languages) {
      console.log(`📝 Processing ${language.toUpperCase()} content...`);
      
      const langData = registerContentData[language];
      
      if (langData) {
        for (const section of sections) {
          if (langData[section]) {
            await RegisterContent.create({
              language,
              section,
              content: langData[section],
              isPublished: true
            });
            console.log(`  ✓ Imported ${language}/${section}`);
            importedCount++;
          } else {
            console.log(`  ⚠ No data for ${language}/${section}`);
          }
        }
      }
      console.log('');
    }

    console.log(`✅ Successfully imported ${importedCount} sections`);
    console.log(`📊 Total: ${importedCount} language/section combinations\n`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seed
seedRegisterContent();
