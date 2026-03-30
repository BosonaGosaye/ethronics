const mongoose = require('mongoose');
const Job = require('../models/Job');
require('dotenv').config();

const sampleJob = {
  // Common fields (not language-specific)
  company: "Ethronics",
  location: "Addis Ababa, Ethiopia",
  type: "full-time",
  salary: "$60,000 - $80,000",
  deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  status: "active",
  featured: true,
  postedDate: new Date(),
  
  // Multi-language content
  translations: {
    // English Content
    en: {
      title: "Senior Software Engineer",
      description: "We are looking for an experienced Senior Software Engineer to join our innovative team. You will be responsible for designing, developing, and maintaining cutting-edge software solutions that serve African markets.",
      requirements: [
        "5+ years of professional software development experience",
        "Strong proficiency in React.js and Node.js",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Excellent problem-solving and communication skills",
        "Bachelor's degree in Computer Science or related field"
      ],
      benefits: [
        "Competitive salary package",
        "Health insurance coverage",
        "Professional development opportunities",
        "Flexible working hours",
        "Remote work options"
      ],
      tags: ["React", "Node.js", "AWS", "Leadership"]
    },

    // Amharic Content
    am: {
      title: "ከፍተኛ የሶፍትዌር ኢንጂነር",
      description: "ፈጠራ ያለውን ቡድናችንን ለመቀላቀል ልምድ ያለው ከፍተኛ የሶፍትዌር ኢንጂነር እንፈልጋለን። ለአፍሪካ ገበያዎች የሚያገለግሉ ዘመናዊ የሶፍትዌር መፍትሄዎችን ለመንደፍ፣ ለማዳበር እና ለመጠበቅ ኃላፊነት ይኖርብዎታል።",
      requirements: [
        "5+ ዓመታት የሙያ የሶፍትዌር ልማት ልምድ",
        "በ React.js እና Node.js ውስጥ ጠንካራ ብቃት",
        "በክላውድ መድረኮች ልምድ (AWS፣ Azure ወይም GCP)",
        "እጅግ በጣም ጥሩ የችግር መፍቻ እና የመግባቢያ ክህሎቶች",
        "በኮምፒውተር ሳይንስ ወይም ተዛማጅ መስክ የመጀመሪያ ዲግሪ"
      ],
      benefits: [
        "ተወዳዳሪ የደመወዝ ፓኬጅ",
        "የጤና መድን ሽፋን",
        "የሙያ እድገት እድሎች",
        "ተለዋዋጭ የስራ ሰዓቶች",
        "የርቀት የስራ አማራጮች"
      ],
      tags: ["React", "Node.js", "AWS", "አመራር"]
    },

    // Oromo Content
    om: {
      title: "Injinara Sooftiweerii Olaanaa",
      description: "Garee keenya kalaqaa ta'e keessatti makamuu akka dandeessan Injinara Sooftiweerii Olaanaa muuxannoo qabu barbaadna. Furmaata sooftiweerii ammayyaa gabaa Afrikaa tajaajilu dizaayinii gochuu, guddisuu fi kunuunsuuf itti gaafatamummaa ni qabaattu.",
      requirements: [
        "Muuxannoo misoomaa sooftiweerii ogummaa waggaa 5+",
        "Dandeettii cimaa React.js fi Node.js keessatti",
        "Muuxannoo waltajjiiwwan duumessaa (AWS, Azure ykn GCP) waliin",
        "Dandeettii furmaata rakkoo fi qunnamtii gaarii",
        "Digrii jalqabaa Saayinsii Kompiitaraa ykn damee walqabataa"
      ],
      benefits: [
        "Paakeejii mindaa dorgommii qabu",
        "Inshuraansii fayyaa",
        "Carraa guddina ogummaa",
        "Sa'aatii hojii jijjiiramaa",
        "Filannoo hojii fagoo"
      ],
      tags: ["React", "Node.js", "AWS", "Hoogganummaa"]
    }
  }
};

async function createSampleJob() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if job already exists
    const existingJob = await Job.findOne({ 'translations.en.title': sampleJob.translations.en.title });
    if (existingJob) {
      console.log('Sample job already exists. Deleting old one...');
      await Job.deleteOne({ _id: existingJob._id });
    }

    // Create new job
    const job = new Job(sampleJob);
    await job.save();

    console.log('\n✅ Sample job created successfully!');
    console.log('\nJob Details:');
    console.log('- English Title:', job.translations.en.title);
    console.log('- Amharic Title:', job.translations.am.title);
    console.log('- Oromo Title:', job.translations.om.title);
    console.log('- Company:', job.company);
    console.log('- Location:', job.location);
    console.log('- Type:', job.type);
    console.log('- Salary:', job.salary);
    console.log('- Deadline:', job.deadline.toLocaleDateString());
    console.log('- Status:', job.status);
    console.log('- Job ID:', job._id);

    console.log('\n📝 You can now view this job in:');
    console.log('- Admin Panel: http://localhost:5173/jobs');
    console.log('- Public Site: http://localhost:3000/careers');

  } catch (error) {
    console.error('Error creating sample job:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the script
createSampleJob();
