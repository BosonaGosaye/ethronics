require('dotenv').config();
const mongoose = require('mongoose');
const CareersContent = require('../models/CareersContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

const careersContentData = [
  // Hero Section
  {
    language: 'en',
    section: 'hero',
    content: {
      title: 'Join Our Team',
      description: 'Build your career with innovative projects and talented people',
      buttons: {
        browse: 'Browse Opportunities',
        post: 'Post a Job'
      }
    },
    isPublished: true
  },
  {
    language: 'am',
    section: 'hero',
    content: {
      title: 'ቡድናችንን ይቀላቀሉ',
      description: 'ከፈጠራ ፕሮጀክቶች እና ከተሰጥኦ ያላቸው ሰዎች ጋር የስራ ህይወትዎን ይገንቡ',
      buttons: {
        browse: 'እድሎችን ያስሱ',
        post: 'ስራ ያስተዋውቁ'
      }
    },
    isPublished: true
  },
  {
    language: 'om',
    section: 'hero',
    content: {
      title: 'Garee Keenyatti Makamaa',
      description: 'Pirojektii kalaqaa fi namoota dandeettii qaban waliin hojii kee ijaarradhu',
      buttons: {
        browse: 'Carraa Sakattaa\'i',
        post: 'Hojii Beeksisi'
      }
    },
    isPublished: true
  },
  // Job Search Section
  {
    language: 'en',
    section: 'search',
    content: {
      labels: {
        title: 'Job Title or Keywords',
        location: 'Location',
        type: 'Job Type',
        company: 'Company'
      },
      placeholders: {
        search: 'e.g. Software Engineer',
        location: 'Select location',
        type: 'Select type',
        company: 'Select company'
      },
      button: 'Search Jobs',
      popularSearches: 'Popular Searches:',
      quickFilters: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer'],
      locations: [
        { value: 'all', label: 'All Locations' },
        { value: 'addis-ababa', label: 'Addis Ababa' },
        { value: 'dire-dawa', label: 'Dire Dawa' }
      ],
      jobTypes: [
        { value: 'all', label: 'All Types' },
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' }
      ],
      companies: [
        { value: 'all', label: 'All Companies' }
      ]
    },
    isPublished: true
  },
  {
    language: 'am',
    section: 'search',
    content: {
      labels: {
        title: 'የስራ ርዕስ ወይም ቁልፍ ቃላት',
        location: 'አካባቢ',
        type: 'የስራ አይነት',
        company: 'ኩባንያ'
      },
      placeholders: {
        search: 'ለምሳሌ ሶፍትዌር ኢንጂነር',
        location: 'አካባቢ ይምረጡ',
        type: 'አይነት ይምረጡ',
        company: 'ኩባንያ ይምረጡ'
      },
      button: 'ስራዎችን ይፈልጉ',
      popularSearches: 'ታዋቂ ፍለጋዎች:',
      quickFilters: ['ሶፍትዌር ኢንጂነር', 'ዳታ ሳይንቲስት', 'ምርት አስተዳዳሪ', 'ዲዛይነር'],
      locations: [
        { value: 'all', label: 'ሁሉም አካባቢዎች' },
        { value: 'addis-ababa', label: 'አዲስ አበባ' },
        { value: 'dire-dawa', label: 'ድሬዳዋ' }
      ],
      jobTypes: [
        { value: 'all', label: 'ሁሉም አይነቶች' },
        { value: 'full-time', label: 'ሙሉ ጊዜ' },
        { value: 'part-time', label: 'ከፊል ጊዜ' },
        { value: 'contract', label: 'ኮንትራት' },
        { value: 'internship', label: 'ኢንተርንሺፕ' }
      ],
      companies: [
        { value: 'all', label: 'ሁሉም ኩባንያዎች' }
      ]
    },
    isPublished: true
  },
  {
    language: 'om',
    section: 'search',
    content: {
      labels: {
        title: 'Mataduree Hojii ykn Jecha Ijoo',
        location: 'Bakka',
        type: 'Gosa Hojii',
        company: 'Dhaabbata'
      },
      placeholders: {
        search: 'Fkf. Injinara Sooftiweerii',
        location: 'Bakka filadhu',
        type: 'Gosa filadhu',
        company: 'Dhaabbata filadhu'
      },
      button: 'Hojii Barbaadi',
      popularSearches: 'Barbaacha Beekamoo:',
      quickFilters: ['Injinara Sooftiweerii', 'Saayintistii Daataa', 'Bulchaa Oomishaa', 'Dizaayinara'],
      locations: [
        { value: 'all', label: 'Bakka Hunda' },
        { value: 'addis-ababa', label: 'Finfinnee' },
        { value: 'dire-dawa', label: 'Dirree Dhawaa' }
      ],
      jobTypes: [
        { value: 'all', label: 'Gosa Hunda' },
        { value: 'full-time', label: 'Yeroo Guutuu' },
        { value: 'part-time', label: 'Yeroo Muraasa' },
        { value: 'contract', label: 'Kontiraatii' },
        { value: 'internship', label: 'Leenjii Hojii' }
      ],
      companies: [
        { value: 'all', label: 'Dhaabbata Hunda' }
      ]
    },
    isPublished: true
  },
  // Job Listings Section
  {
    language: 'en',
    section: 'listings',
    content: {
      title: 'Available Positions',
      found: 'Found',
      jobsMatching: 'jobs matching your criteria',
      loading: 'Loading jobs...',
      error: 'Error loading jobs',
      featured: 'Featured',
      applicants: 'applicants',
      deadline: 'Deadline',
      loadMore: 'Load More',
      showing: 'Showing',
      of: 'of',
      noResults: {
        title: 'No jobs found',
        description: 'Try adjusting your search criteria'
      },
      sortBy: {
        label: 'Sort by:',
        newest: 'Newest First',
        salary: 'Salary',
        company: 'Company',
        deadline: 'Deadline'
      }
    },
    isPublished: true
  },
  {
    language: 'am',
    section: 'listings',
    content: {
      title: 'ክፍት የስራ ቦታዎች',
      found: 'ተገኝተዋል',
      jobsMatching: 'ከመስፈርትዎ ጋር የሚዛመዱ ስራዎች',
      loading: 'ስራዎች በመጫን ላይ...',
      error: 'ስራዎችን በመጫን ላይ ስህተት',
      featured: 'ተለይቶ የቀረበ',
      applicants: 'አመልካቾች',
      deadline: 'የመጨረሻ ቀን',
      loadMore: 'ተጨማሪ ጫን',
      showing: 'በማሳየት ላይ',
      of: 'ከ',
      noResults: {
        title: 'ምንም ስራ አልተገኘም',
        description: 'የፍለጋ መስፈርቶችዎን ማስተካከል ይሞክሩ'
      },
      sortBy: {
        label: 'ደርድር በ:',
        newest: 'አዲስ መጀመሪያ',
        salary: 'ደመወዝ',
        company: 'ኩባንያ',
        deadline: 'የመጨረሻ ቀን'
      }
    },
    isPublished: true
  },
  {
    language: 'om',
    section: 'listings',
    content: {
      title: 'Hojii Jiru',
      found: 'Argame',
      jobsMatching: 'hojii ulaagaa kee waliin walsimuu',
      loading: 'Hojii fe\'aa jira...',
      error: 'Hojii fe\'uutti dogoggora',
      featured: 'Adda Ba\'e',
      applicants: 'iyyattoota',
      deadline: 'Guyyaa Xumuraa',
      loadMore: 'Dabalataa Fe\'i',
      showing: 'Agarsiisaa jira',
      of: 'irraa',
      noResults: {
        title: 'Hojiin hin argamne',
        description: 'Ulaagaa barbaacha keetii sirreessuu yaali'
      },
      sortBy: {
        label: 'Tartiiba:',
        newest: 'Haaraa Jalqaba',
        salary: 'Mindaa',
        company: 'Dhaabbata',
        deadline: 'Guyyaa Xumuraa'
      }
    },
    isPublished: true
  },
  // Application Process Section
  {
    language: 'en',
    section: 'process',
    content: {
      title: 'Application Process',
      description: 'How to apply and what to expect',
      steps: [
        {
          title: 'Submit Application',
          duration: '5-10 minutes',
          description: 'Complete our online application form',
          details: ['Fill in your personal information', 'Upload your resume/CV', 'Add a cover letter']
        },
        {
          title: 'Initial Screening',
          duration: '1-2 days',
          description: 'Our team reviews your application',
          details: ['Resume review', 'Qualification check', 'Initial assessment']
        },
        {
          title: 'Interview',
          duration: '1-2 weeks',
          description: 'Meet with our team',
          details: ['Technical interview', 'Cultural fit assessment', 'Q&A session']
        }
      ],
      tips: {
        title: 'Application Tips',
        items: [
          {
            title: 'Resume Tips',
            tips: ['Keep it concise and relevant', 'Highlight your achievements', 'Use action verbs']
          }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: [
          {
            question: 'How long does the process take?',
            answer: 'Typically 2-4 weeks from application to offer'
          }
        ]
      },
      support: {
        title: 'Need Help?',
        description: 'Contact our recruitment team',
        buttons: {
          contact: 'Contact Us',
          support: 'Support Center'
        }
      }
    },
    isPublished: true
  },
  {
    language: 'am',
    section: 'process',
    content: {
      title: 'የማመልከቻ ሂደት',
      description: 'እንዴት እንደሚያመለክቱ እና ምን እንደሚጠበቅ',
      steps: [
        {
          title: 'ማመልከቻ ያስገቡ',
          duration: '5-10 ደቂቃዎች',
          description: 'የመስመር ላይ ማመልከቻ ቅጹን ይሙሉ',
          details: ['የግል መረጃዎን ይሙሉ', 'ሪዙሜዎን/ሲቪዎን ይስቀሉ', 'የሽፋን ደብዳቤ ያክሉ']
        },
        {
          title: 'የመጀመሪያ ምርመራ',
          duration: '1-2 ቀናት',
          description: 'ቡድናችን ማመልከቻዎን ይገመግማል',
          details: ['የሪዙሜ ግምገማ', 'የብቃት ፍተሻ', 'የመጀመሪያ ግምገማ']
        },
        {
          title: 'ቃለ መጠይቅ',
          duration: '1-2 ሳምንታት',
          description: 'ከቡድናችን ጋር ይገናኙ',
          details: ['ቴክኒካል ቃለ መጠይቅ', 'የባህል ተስማሚነት ግምገማ', 'የጥያቄ እና መልስ ክፍለ ጊዜ']
        }
      ],
      tips: {
        title: 'የማመልከቻ ምክሮች',
        items: [
          {
            title: 'የሪዙሜ ምክሮች',
            tips: ['አጭር እና ተዛማጅ ያድርጉት', 'ስኬቶችዎን አጉልተው ያሳዩ', 'የድርጊት ግሶችን ይጠቀሙ']
          }
        ]
      },
      faq: {
        title: 'በተደጋጋሚ የሚጠየቁ ጥያቄዎች',
        questions: [
          {
            question: 'ሂደቱ ምን ያህል ጊዜ ይወስዳል?',
            answer: 'በተለምዶ ከማመልከቻ እስከ ቅናሽ 2-4 ሳምንታት'
          }
        ]
      },
      support: {
        title: 'እገዛ ይፈልጋሉ?',
        description: 'የምልመላ ቡድናችንን ያነጋግሩ',
        buttons: {
          contact: 'ያግኙን',
          support: 'የድጋፍ ማዕከል'
        }
      }
    },
    isPublished: true
  },
  {
    language: 'om',
    section: 'process',
    content: {
      title: 'Adeemsa Iyyannoo',
      description: 'Akkamitti akka iyyattan fi maal akka eegamu',
      steps: [
        {
          title: 'Iyyannoo Galchi',
          duration: 'Daqiiqaa 5-10',
          description: 'Unka iyyannoo toora interneetii guuti',
          details: ['Odeeffannoo dhuunfaa kee guuti', 'Rizyumee/CV kee olkaa\'i', 'Xalayaa haguuggii dabali']
        },
        {
          title: 'Sakatta\'iinsa Jalqabaa',
          duration: 'Guyyaa 1-2',
          description: 'Gareen keenya iyyannoo kee ni ilaala',
          details: ['Gamaaggama rizyumee', 'Mirkaneessa dandeettii', 'Madaallii jalqabaa']
        },
        {
          title: 'Af-gaaffii',
          duration: 'Torban 1-2',
          description: 'Garee keenya waliin wal argi',
          details: ['Af-gaaffii teeknikaa', 'Madaallii walsimsiisaa aadaa', 'Kutaa gaaffii fi deebii']
        }
      ],
      tips: {
        title: 'Gorsaawwan Iyyannoo',
        items: [
          {
            title: 'Gorsaawwan Rizyumee',
            tips: ['Gabaabaa fi barbaachisaa ta\'e godhi', 'Milkaa\'ina kee calaqqisiisi', 'Gochawwan gocha fayyadami']
          }
        ]
      },
      faq: {
        title: 'Gaaffilee Yeroo Baay\'ee Gaafataman',
        questions: [
          {
            question: 'Adeemsi kun yeroo hammam fudhata?',
            answer: 'Akkaataa idileetti iyyannoo irraa hanga dhiyeessitti torban 2-4'
          }
        ]
      },
      support: {
        title: 'Gargaarsa Barbaaddaa?',
        description: 'Garee qaxaraa keenya quunnamaa',
        buttons: {
          contact: 'Nu Quunnamaa',
          support: 'Giddugala Deeggarsa'
        }
      }
    },
    isPublished: true
  }
];

async function seedCareersContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing careers content
    await CareersContent.deleteMany({});
    console.log('Cleared existing careers content');

    // Insert new content
    await CareersContent.insertMany(careersContentData);
    console.log(`Inserted ${careersContentData.length} careers content sections`);

    console.log('Careers content seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding careers content:', error);
    process.exit(1);
  }
}

seedCareersContent();
