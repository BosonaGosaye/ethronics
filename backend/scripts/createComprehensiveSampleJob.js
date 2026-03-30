const mongoose = require('mongoose');
const Job = require('../models/Job');
require('dotenv').config();

const comprehensiveSampleJob = {
  // Company Information
  company: "Ethronics Technology Solutions",
  companyLogo: "https://via.placeholder.com/200x200/0891b2/ffffff?text=Ethronics",
  companyWebsite: "https://ethronics.com",
  companySize: "51-200",
  companyIndustry: "Technology & Software Development",
  
  // Job Basic Info
  location: "Addis Ababa, Ethiopia (Hybrid)",
  type: "full-time",
  workMode: "hybrid",
  category: "engineering",
  
  // Experience & Education
  experienceLevel: "senior",
  yearsOfExperience: "5-7 years",
  educationLevel: "bachelor",
  
  // Compensation
  salary: "$60,000 - $80,000 per year",
  salaryMin: 60000,
  salaryMax: 80000,
  salaryCurrency: "USD",
  salaryPeriod: "yearly",
  
  // Job Details
  numberOfPositions: 2,
  startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  duration: "Permanent",
  
  // Benefits & Perks
  travelRequired: false,
  relocationAssistance: true,
  visaSponsorship: true,
  
  // Contact Information
  contactEmail: "careers@ethronics.com",
  contactPhone: "+251-11-123-4567",
  contactPerson: "Sarah Johnson, HR Manager",
  
  // Status & Metadata
  featured: true,
  status: "active",
  deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  
  // Multi-language content
  translations: {
    // ========== ENGLISH ==========
    en: {
      title: "Senior Full-Stack Software Engineer",
      description: `Join Ethronics Technology Solutions as a Senior Full-Stack Software Engineer and help us build innovative solutions that transform African businesses.

We're looking for a passionate engineer who thrives in a collaborative environment and wants to make a real impact. You'll work on cutting-edge projects using modern technologies while mentoring junior developers and contributing to architectural decisions.

This is an excellent opportunity to grow your career with a fast-growing tech company that values innovation, quality, and work-life balance.`,
      
      responsibilities: [
        "Design and develop scalable web applications using React and Node.js",
        "Lead technical discussions and contribute to architectural decisions",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with product managers and designers to deliver features",
        "Optimize application performance and ensure code quality",
        "Participate in agile ceremonies and sprint planning",
        "Write comprehensive technical documentation",
        "Stay updated with latest technology trends and best practices"
      ],
      
      qualifications: [
        "5+ years of professional software development experience",
        "Strong proficiency in JavaScript/TypeScript, React, and Node.js",
        "Experience with RESTful APIs and microservices architecture",
        "Solid understanding of database design (MongoDB, PostgreSQL)",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Proficiency with Git and CI/CD pipelines",
        "Bachelor's degree in Computer Science or related field",
        "Excellent problem-solving and communication skills"
      ],
      
      requirements: [
        "Must be legally authorized to work in Ethiopia",
        "Fluent in English (written and spoken)",
        "Available to work hybrid (3 days office, 2 days remote)",
        "Willing to occasionally travel for team meetings"
      ],
      
      benefits: [
        "Competitive salary package ($60,000 - $80,000/year)",
        "Comprehensive health insurance for you and family",
        "Annual performance bonuses",
        "Professional development budget ($2,000/year)",
        "Flexible working hours",
        "Hybrid work model (3 days office, 2 days remote)",
        "Modern office with latest equipment",
        "Free lunch and snacks",
        "Gym membership",
        "25 days paid vacation plus public holidays",
        "Parental leave",
        "Team building activities and events"
      ],
      
      niceToHave: [
        "Experience with TypeScript and modern frontend frameworks",
        "Knowledge of Docker and Kubernetes",
        "Contributions to open-source projects",
        "Experience with GraphQL",
        "Understanding of DevOps practices",
        "Technical blog writing or public speaking experience",
        "Experience working in agile/scrum environments",
        "Knowledge of Ethiopian market and local languages"
      ],
      
      tags: [
        "React", "Node.js", "TypeScript", "MongoDB", "AWS", 
        "Docker", "Kubernetes", "GraphQL", "REST API", "Microservices"
      ],
      
      companyDescription: `Ethronics Technology Solutions is a leading software development company based in Addis Ababa, Ethiopia. We specialize in building innovative digital solutions for African businesses.

Founded in 2018, we've grown to a team of 150+ talented professionals working on exciting projects across fintech, e-commerce, and enterprise software. Our mission is to empower African businesses through technology.

We pride ourselves on our collaborative culture, commitment to quality, and focus on employee growth. Join us and be part of something special!`,
      
      applicationProcess: `Our hiring process is designed to be thorough yet respectful of your time:

1. **Application Review** (2-3 days)
   Submit your CV and cover letter through our portal.

2. **Phone Screening** (30 minutes)
   Brief call with our HR team to discuss your background and expectations.

3. **Technical Assessment** (1-2 hours)
   Take-home coding challenge to demonstrate your skills.

4. **Technical Interview** (1.5 hours)
   Deep dive into your technical experience with our engineering team.

5. **Cultural Fit Interview** (45 minutes)
   Meet with team members to ensure mutual fit.

6. **Final Interview** (30 minutes)
   Discussion with hiring manager about role details and expectations.

7. **Offer** (2-3 days)
   If successful, we'll extend an offer within 2-3 business days.

Total timeline: 2-3 weeks from application to offer.`,
      
      interviewProcess: `**What to Expect:**

- **Technical Assessment:** You'll build a small full-stack application demonstrating your skills in React and Node.js. We'll provide clear requirements and you'll have 48 hours to complete it.

- **Technical Interview:** We'll discuss your assessment solution, dive into your past projects, and explore technical concepts. This is a conversation, not an interrogation!

- **Cultural Fit:** We'll discuss our values, team dynamics, and what you're looking for in your next role. This is your chance to interview us too!

**Interview Tips:**
- Be prepared to discuss your past projects in detail
- Think about questions you have for us
- Be yourself - we value authenticity
- Ask about anything that's important to you`,
      
      bonusInfo: `**Why Join Ethronics?**

🚀 **Innovation:** Work on cutting-edge projects using latest technologies
👥 **Team:** Collaborate with talented, passionate professionals
📈 **Growth:** Clear career progression path with regular reviews
🌍 **Impact:** Build solutions that make a difference in Africa
⚖️ **Balance:** We respect your time and promote work-life balance
🎓 **Learning:** Continuous learning opportunities and conference attendance

**Our Tech Stack:**
Frontend: React, TypeScript, Next.js, Tailwind CSS
Backend: Node.js, Express, NestJS
Database: MongoDB, PostgreSQL, Redis
Cloud: AWS (EC2, S3, Lambda, RDS)
DevOps: Docker, Kubernetes, GitHub Actions, Terraform

**Diversity & Inclusion:**
We're committed to building a diverse team and creating an inclusive workplace where everyone can thrive. We encourage applications from all backgrounds.`
    },

    // ========== AMHARIC ==========
    am: {
      title: "ከፍተኛ ሙሉ-ስታክ የሶፍትዌር ኢንጂነር",
      description: `እንደ ከፍተኛ ሙሉ-ስታክ የሶፍትዌር ኢንጂነር ኢትሮኒክስ ቴክኖሎጂ ሶሉሽንስን ይቀላቀሉ እና የአፍሪካ ንግዶችን የሚቀይሩ ፈጠራ መፍትሄዎችን እንድንገነባ ይርዱን።

በትብብር አካባቢ የሚበለጽግ እና እውነተኛ ተጽእኖ ማድረግ የሚፈልግ ጠንካራ ኢንጂነር እንፈልጋለን። ወጣት ገንቢዎችን እያሰለጠኑ እና ለስነ-ህንፃ ውሳኔዎች አስተዋፅዖ እያደረጉ ዘመናዊ ቴክኖሎጂዎችን በመጠቀም በዘመናዊ ፕሮጀክቶች ላይ ይሰራሉ።

ይህ ፈጠራን፣ ጥራትን እና የስራ-ህይወት ሚዛንን የሚያከብር በፍጥነት እያደገ ካለ የቴክኖሎጂ ኩባንያ ጋር ስራዎን ለማሳደግ እጅግ በጣም ጥሩ እድል ነው።`,
      
      responsibilities: [
        "React እና Node.js በመጠቀም ሊመዘኑ የሚችሉ የድር መተግበሪያዎችን ንድፍ እና ማዳበር",
        "የቴክኒክ ውይይቶችን መምራት እና ለስነ-ህንፃ ውሳኔዎች አስተዋፅዖ ማድረግ",
        "ወጣት ገንቢዎችን ማሰልጠን እና የኮድ ግምገማዎችን ማካሄድ",
        "ባህሪያትን ለማቅረብ ከምርት አስተዳዳሪዎች እና ዲዛይነሮች ጋር መተባበር",
        "የመተግበሪያ አፈጻጸምን ማሻሻል እና የኮድ ጥራትን ማረጋገጥ",
        "በቀላል ሥነ ሥርዓቶች እና የስፕሪንት እቅድ ውስጥ መሳተፍ",
        "አጠቃላይ የቴክኒክ ሰነዶችን መፃፍ",
        "ከቅርብ ቴክኖሎጂ አዝማሚያዎች እና ምርጥ ልምዶች ጋር መዘመን"
      ],
      
      qualifications: [
        "5+ ዓመታት የሙያ የሶፍትዌር ልማት ልምድ",
        "በ JavaScript/TypeScript፣ React እና Node.js ውስጥ ጠንካራ ብቃት",
        "ከ RESTful APIs እና microservices አርክቴክቸር ጋር ልምድ",
        "ጠንካራ የውሂብ ጎታ ዲዛይን ግንዛቤ (MongoDB፣ PostgreSQL)",
        "ከክላውድ መድረኮች ጋር ልምድ (AWS፣ Azure ወይም GCP)",
        "በ Git እና CI/CD pipelines ውስጥ ብቃት",
        "በኮምፒውተር ሳይንስ ወይም ተዛማጅ መስክ የመጀመሪያ ዲግሪ",
        "እጅግ በጣም ጥሩ የችግር መፍቻ እና የመግባቢያ ክህሎቶች"
      ],
      
      requirements: [
        "በኢትዮጵያ ውስጥ ለመስራት በህጋዊ መንገድ ፈቃድ ሊኖረው ይገባል",
        "በእንግሊዝኛ ቀላል (የተፃፈ እና የተነገረ)",
        "ሃይብሪድ ለመስራት ዝግጁ (3 ቀናት ቢሮ፣ 2 ቀናት ርቀት)",
        "አልፎ አልፎ ለቡድን ስብሰባዎች ለመጓዝ ፈቃደኛ"
      ],
      
      benefits: [
        "ተወዳዳሪ የደመወዝ ፓኬጅ ($60,000 - $80,000/ዓመት)",
        "ለእርስዎ እና ለቤተሰብዎ አጠቃላይ የጤና መድን",
        "ዓመታዊ የአፈጻጸም ጉርሻዎች",
        "የሙያ እድገት በጀት ($2,000/ዓመት)",
        "ተለዋዋጭ የስራ ሰዓቶች",
        "ሃይብሪድ የስራ ሞዴል (3 ቀናት ቢሮ፣ 2 ቀናት ርቀት)",
        "ከቅርብ ዘመን መሳሪያዎች ጋር ዘመናዊ ቢሮ",
        "ነፃ ምሳ እና መክሰስ",
        "የጂም አባልነት",
        "25 ቀናት የተከፈለ ዕረፍት ከሕዝብ በዓላት በተጨማሪ",
        "የወላጅ ፈቃድ",
        "የቡድን ግንባታ እንቅስቃሴዎች እና ዝግጅቶች"
      ],
      
      niceToHave: [
        "ከ TypeScript እና ዘመናዊ የፊት-መጨረሻ ማዕቀፎች ጋር ልምድ",
        "የ Docker እና Kubernetes እውቀት",
        "ለክፍት ምንጭ ፕሮጀክቶች አስተዋፅዖዎች",
        "ከ GraphQL ጋር ልምድ",
        "የ DevOps ልምዶች ግንዛቤ",
        "የቴክኒክ ብሎግ መፃፍ ወይም በይፋ የመናገር ልምድ",
        "በቀላል/scrum አካባቢዎች ውስጥ የመስራት ልምድ",
        "የኢትዮጵያ ገበያ እና የአካባቢ ቋንቋዎች እውቀት"
      ],
      
      tags: [
        "React", "Node.js", "TypeScript", "MongoDB", "AWS", 
        "Docker", "Kubernetes", "GraphQL", "REST API", "Microservices"
      ],
      
      companyDescription: `ኢትሮኒክስ ቴክኖሎጂ ሶሉሽንስ በአዲስ አበባ፣ ኢትዮጵያ የሚገኝ ግንባር ቀደም የሶፍትዌር ልማት ኩባንያ ነው። ለአፍሪካ ንግዶች ፈጠራ ዲጂታል መፍትሄዎችን በመገንባት ላይ ልዩ ነን።

በ2018 የተመሰረትን፣ በፋይናንስ ቴክኖሎጂ፣ ኢ-ኮሜርስ እና ኢንተርፕራይዝ ሶፍትዌር ላይ በሚያስደንቁ ፕሮጀክቶች ላይ የሚሰሩ 150+ ተሰጥኦ ያላቸው ባለሙያዎች ቡድን አድገናል። ተልእኳችን የአፍሪካ ንግዶችን በቴክኖሎጂ ማብቃት ነው።

በትብብር ባህላችን፣ ለጥራት ባለን ቁርጠኝነት እና በሰራተኛ እድገት ላይ ባለን ትኩረት እንኮራለን። ይቀላቀሉን እና የአንድ ልዩ ነገር አካል ይሁኑ!`,
      
      applicationProcess: `የቅጥር ሂደታችን ሁሉን አቀፍ ሆኖ ግን ለጊዜዎ አክብሮት የሚያሳይ ሆኖ ተዘጋጅቷል፡

1. **የማመልከቻ ግምገማ** (2-3 ቀናት)
   CV እና የሽፋን ደብዳቤዎን በእኛ መግቢያ በኩል ያስገቡ።

2. **የስልክ ምርመራ** (30 ደቂቃዎች)
   ስለ ዳራዎ እና ተስፋዎች ለመወያየት ከ HR ቡድናችን ጋር አጭር ጥሪ።

3. **የቴክኒክ ግምገማ** (1-2 ሰዓታት)
   ክህሎቶችዎን ለማሳየት የቤት ውስጥ የኮድ ፈተና ይውሰዱ።

4. **የቴክኒክ ቃለ መጠይቅ** (1.5 ሰዓታት)
   ከኢንጂነሪንግ ቡድናችን ጋር ስለ ቴክኒክ ልምድዎ ጥልቅ ውይይት።

5. **የባህል ተስማሚነት ቃለ መጠይቅ** (45 ደቂቃዎች)
   የጋራ ተስማሚነትን ለማረጋገጥ ከቡድን አባላት ጋር ይገናኙ።

6. **የመጨረሻ ቃለ መጠይቅ** (30 ደቂቃዎች)
   ስለ ሚና ዝርዝሮች እና ተስፋዎች ከቅጥር አስተዳዳሪ ጋር ውይይት።

7. **ቅናሽ** (2-3 ቀናት)
   ስኬታማ ከሆነ በ2-3 የስራ ቀናት ውስጥ ቅናሽ እናራዝማለን።

አጠቃላይ የጊዜ መስመር፡ ከማመልከቻ እስከ ቅናሽ 2-3 ሳምንታት።`,
      
      interviewProcess: `**ምን መጠበቅ እንዳለብዎ፡**

- **የቴክኒክ ግምገማ፡** በ React እና Node.js ውስጥ ክህሎቶችዎን የሚያሳይ ትንሽ ሙሉ-ስታክ መተግበሪያ ይገነባሉ። ግልጽ መስፈርቶችን እናቀርባለን እና ለማጠናቀቅ 48 ሰዓታት ይኖርዎታል።

- **የቴክኒክ ቃለ መጠይቅ፡** የግምገማ መፍትሄዎን እንወያያለን፣ ያለፉ ፕሮጀክቶችዎን እንመረምራለን እና የቴክኒክ ፅንሰ-ሀሳቦችን እንመረምራለን። ይህ ውይይት ነው፣ ጥያቄ አይደለም!

- **የባህል ተስማሚነት፡** ስለ እሴቶቻችን፣ የቡድን ተለዋዋጭነት እና በሚቀጥለው ሚናዎ ውስጥ ምን እንደሚፈልጉ እንወያያለን። ይህ እኛንም ለመጠየቅ እድልዎ ነው!

**የቃለ መጠይቅ ምክሮች፡**
- ያለፉ ፕሮጀክቶችዎን በዝርዝር ለመወያየት ዝግጁ ይሁኑ
- ለእኛ ስላሉዎት ጥያቄዎች ያስቡ
- እራስዎ ይሁኑ - እውነተኝነትን እናከብራለን
- ለእርስዎ አስፈላጊ ስለሆነ ማንኛውም ነገር ይጠይቁ`,
      
      bonusInfo: `**ለምን ኢትሮኒክስን ይቀላቀላሉ?**

🚀 **ፈጠራ፡** ቅርብ ቴክኖሎጂዎችን በመጠቀም በዘመናዊ ፕሮጀክቶች ላይ ይስሩ
👥 **ቡድን፡** ከተሰጥኦ ያላቸው፣ ጠንካራ ባለሙያዎች ጋር ይተባበሩ
📈 **እድገት፡** ከመደበኛ ግምገማዎች ጋር ግልጽ የስራ እድገት መንገድ
🌍 **ተጽእኖ፡** በአፍሪካ ውስጥ ለውጥ የሚያመጡ መፍትሄዎችን ይገንቡ
⚖️ **ሚዛን፡** ጊዜዎን እናከብራለን እና የስራ-ህይወት ሚዛንን እናበረታታለን
🎓 **መማር፡** ቀጣይ የመማር እድሎች እና የኮንፈረንስ ተሳትፎ

**የእኛ የቴክ ስታክ፡**
ፊት-መጨረሻ፡ React፣ TypeScript፣ Next.js፣ Tailwind CSS
ኋላ-መጨረሻ፡ Node.js፣ Express፣ NestJS
ውሂብ ጎታ፡ MongoDB፣ PostgreSQL፣ Redis
ክላውድ፡ AWS (EC2፣ S3፣ Lambda፣ RDS)
DevOps: Docker፣ Kubernetes፣ GitHub Actions፣ Terraform

**ልዩነት እና ማካተት፡**
የተለያየ ቡድን ለመገንባት እና ሁሉም ሰው የሚበለጽግበት አካታች የስራ ቦታ ለመፍጠር ቁርጠኞች ነን። ከሁሉም ዳራዎች ማመልከቻዎችን እናበረታታለን።`
    },

    // ========== OROMO ==========
    om: {
      title: "Injinara Sooftiweerii Guutuu-Staakii Olaanaa",
      description: `Akka Injinara Sooftiweerii Guutuu-Staakii Olaanaa Ethronics Technology Solutions waliin makamaa fi furmaata kalaqaa daldala Afrikaa jijjiiru ijaaruuf nu gargaara.

Naannoo walta'iinsaa keessatti guddatuu fi dhiibbaa dhugaa uumuu barbaadu injinara ciccimaa barbaadna. Teknooloojii ammayyaa fayyadamuun pirojektii ammayyaa irratti hojjechaa osoo jirtanii, guddistota dargaggoo leenjiftee fi murtoo ijaarsa irratti gumaacha gootaa.

Kun dhaabbata teknooloojii saffisaan guddachaa jiru kan kalaqaa, qulqullina, fi madaallii hojii-jireenyaa kabaju waliin carraa kee guddisuu carraa gaarii dha.`,
      
      responsibilities: [
        "React fi Node.js fayyadamuun aplikeeshinii weebii madaaluu danda'u dizaayinii fi guddisuu",
        "Marii teeknikaa hoogganuu fi murtoo ijaarsa irratti gumaacha gochuu",
        "Guddistota dargaggoo leenjisuu fi gamaaggama koodii gaggeessuu",
        "Amaloota dhiyeessuuf bulchitoota oomishaa fi dizaayinaroota waliin hojjechuu",
        "Raawwii aplikeeshinii fooyyessuu fi qulqullina koodii mirkaneessuu",
        "Ayyaana sirrii fi karoora ispirintii keessatti hirmaachuu",
        "Sanada teeknikaa bal'aa barreessuu",
        "Adeemsa teknooloojii yeroo ammaa fi muuxannoo gaarii waliin haaromfamuu"
      ],
      
      qualifications: [
        "Muuxannoo misoomaa sooftiweerii ogummaa waggaa 5+",
        "Dandeettii cimaa JavaScript/TypeScript, React fi Node.js keessatti",
        "Muuxannoo RESTful APIs fi microservices architecture waliin",
        "Hubannoo cimaa dizaayinii kuusaa deetaa (MongoDB, PostgreSQL)",
        "Muuxannoo waltajjiiwwan duumessaa (AWS, Azure ykn GCP) waliin",
        "Dandeettii Git fi CI/CD pipelines keessatti",
        "Digrii jalqabaa Saayinsii Kompiitaraa ykn damee walqabataa",
        "Dandeettii furmaata rakkoo fi qunnamtii gaarii"
      ],
      
      requirements: [
        "Itoophiyaa keessatti hojjechuuf haala seeraan eeyyamameen dirqama",
        "Afaan Ingilizii keessatti sirrii (barreeffamaa fi dubbatamaa)",
        "Haayibriidii hojjechuuf qophaa'uu (guyyaa 3 waajjira, guyyaa 2 fagoo)",
        "Yeroo yeroon walgahii garee dhaquu fedhii qabaachuu"
      ],
      
      benefits: [
        "Paakeejii mindaa dorgommii qabu ($60,000 - $80,000/waggaa)",
        "Inshuraansii fayyaa bal'aa siif fi maatii keetiif",
        "Bonaasii raawwii waggaa",
        "Baajata guddina ogummaa ($2,000/waggaa)",
        "Sa'aatii hojii jijjiiramaa",
        "Moodeela hojii haayibriidii (guyyaa 3 waajjira, guyyaa 2 fagoo)",
        "Waajjira ammayyaa meeshaalee ammayyaa waliin",
        "Laaqana fi nyaata salphaa bilisaa",
        "Miseensummaa jiimii",
        "Guyyaa 25 boqonnaa kaffaltii ayyaana uummata dabalatee",
        "Hayyama maatii",
        "Sochiiwwan ijaarsa garee fi taateewwan"
      ],
      
      niceToHave: [
        "Muuxannoo TypeScript fi waltajjiiwwan fuula-dhumaa ammayyaa waliin",
        "Beekumsa Docker fi Kubernetes",
        "Gumaacha pirojektii madda banaa",
        "Muuxannoo GraphQL waliin",
        "Hubannoo muuxannoo DevOps",
        "Muuxannoo barreeffama biloogii teeknikaa ykn haasawa uummataa",
        "Muuxannoo naannoo agile/scrum keessatti hojjechuu",
        "Beekumsa gabaa Itoophiyaa fi afaanota naannoo"
      ],
      
      tags: [
        "React", "Node.js", "TypeScript", "MongoDB", "AWS", 
        "Docker", "Kubernetes", "GraphQL", "REST API", "Microservices"
      ],
      
      companyDescription: `Ethronics Technology Solutions dhaabbata misoomaa sooftiweerii durfamaa Finfinnee, Itoophiyaa keessa argamu dha. Furmaata dijitaalaa kalaqaa daldala Afrikaa ijaaruu irratti addaan baafamneerra.

Bara 2018 hundeeffamee, gara garee ogeeyyii dandeettii qaban 150+ pirojektii hawwataa fintech, e-commerce, fi sooftiweerii dhaabbataa irratti hojjetan guddanneerra. Ergamni keenya daldala Afrikaa teknooloojiin humneessuu dha.

Aadaa walta'iinsaa keenya, kutannoo qulqullina, fi xiyyeeffannoo guddina hojjetaa irratti qabnu of tuulna. Nu waliin makamaa fi waan addaa keessaa qaama ta'aa!`,
      
      applicationProcess: `Adeemsi qaxaraa keenyaa bal'aa ta'ee garuu yeroo kee kabajuuf qophaa'e:

1. **Gamaaggama Iyyannoo** (guyyaa 2-3)
   CV fi xalayaa haguuggii kee karaa geejjiba keenya dhiyeessi.

2. **Sakatta'iinsa Bilbilaa** (daqiiqaa 30)
   Seenaa fi abdii kee irratti mari'achuuf garee HR keenya waliin bilbila gabaabaa.

3. **Madaallii Teeknikaa** (sa'aatii 1-2)
   Dandeettii kee agarsiisuf qormaata koodii mana fudhachuu.

4. **Af-gaaffii Teeknikaa** (sa'aatii 1.5)
   Muuxannoo teeknikaa kee irratti garee injinariingii keenya waliin mari'ii gadi fagoo.

5. **Af-gaaffii Walsimsiisaa Aadaa** (daqiiqaa 45)
   Walsimsiisaa walii mirkaneessuuf miseensota garee waliin wal arguu.

6. **Af-gaaffii Dhumaa** (daqiiqaa 30)
   Bal'ina gahee fi abdii irratti bulchaa qaxaraa waliin mari'ii.

7. **Dhiyeessii** (guyyaa 2-3)
   Yoo milkaa'e, guyyaa hojii 2-3 keessatti dhiyeessii ni bal'ifna.

Sarara yeroo waliigalaa: Iyyannoo irraa gara dhiyeessii torban 2-3.`,
      
      interviewProcess: `**Maal Eeguu Akka Qabdu:**

- **Madaallii Teeknikaa:** Aplikeeshinii guutuu-staakii xixiqqaa dandeettii kee React fi Node.js keessatti agarsiisu ni ijaarta. Ulaagaalee ifa ta'an ni kennina akkasumas xumuruu sa'aatii 48 ni qabaatta.

- **Af-gaaffii Teeknikaa:** Furmaata madaallii kee ni mari'anna, pirojektii darbe kee ni qorata, fi yaad-rimee teeknikaa ni qorata. Kun haasawa, gaafii miti!

- **Walsimsiisaa Aadaa:** Gatii keenya, daayinamikii garee, fi gahee itti aanu kee keessatti waan barbaaddu ni mari'anna. Kun carraa kee nuuf gaafachuuf!

**Gorsawwan Af-gaaffii:**
- Pirojektii darbe kee bal'inaan mari'achuuf qophaa'i
- Gaaffii nuuf qabdu yaadi
- Ofii kee ta'i - dhugummaa ni kabajina
- Waan siif barbaachisaa ta'e kamiyyuu gaafadhu`,
      
      bonusInfo: `**Maaliif Ethronics Waliin Makamta?**

🚀 **Kalaqaa:** Teknooloojii yeroo ammaa fayyadamuun pirojektii ammayyaa irratti hojjedhu
👥 **Garee:** Ogeeyyii dandeettii qaban, ciccimoo waliin hojjedhu
📈 **Guddina:** Karaa guddina carraa ifa ta'e gamaaggama idilee waliin
🌍 **Dhiibbaa:** Furmaata Afrikaa keessatti jijjiirama fidu ijaari
⚖️ **Madaallii:** Yeroo kee ni kabajina akkasumas madaallii hojii-jireenyaa ni jajjabeessina
🎓 **Barnoota:** Carraa barumsaa itti fufiinsaa fi hirmaannaa konfiraansii

**Staakii Teekii Keenya:**
Fuula-dhumaa: React, TypeScript, Next.js, Tailwind CSS
Duuba-dhumaa: Node.js, Express, NestJS
Kuusaa Deetaa: MongoDB, PostgreSQL, Redis
Duumessa: AWS (EC2, S3, Lambda, RDS)
DevOps: Docker, Kubernetes, GitHub Actions, Terraform

**Garaagarummaa fi Dabalataa:**
Garee garaagaraa ijaaruu fi bakka hojii dabalataa namni hundi itti guddatu uumuuf kutannoo qabna. Iyyannoo seenaa hundaa irraa ni jajjabeessina.`
    }
  }
};

async function createComprehensiveSampleJob() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if job already exists
    const existingJob = await Job.findOne({ 
      'translations.en.title': comprehensiveSampleJob.translations.en.title 
    });
    
    if (existingJob) {
      console.log('📝 Sample job already exists. Deleting old one...');
      await Job.deleteOne({ _id: existingJob._id });
      console.log('✅ Old job deleted\n');
    }

    // Create new comprehensive job
    console.log('🚀 Creating comprehensive sample job with ALL fields...');
    const job = new Job(comprehensiveSampleJob);
    await job.save();

    console.log('\n✅ COMPREHENSIVE SAMPLE JOB CREATED SUCCESSFULLY!\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 JOB DETAILS:');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('🌍 MULTILINGUAL TITLES:');
    console.log(`   English:  ${job.translations.en.title}`);
    console.log(`   Amharic:  ${job.translations.am.title}`);
    console.log(`   Oromo:    ${job.translations.om.title}\n`);
    
    console.log('🏢 COMPANY INFORMATION:');
    console.log(`   Company:  ${job.company}`);
    console.log(`   Website:  ${job.companyWebsite}`);
    console.log(`   Size:     ${job.companySize} employees`);
    console.log(`   Industry: ${job.companyIndustry}\n`);
    
    console.log('📍 JOB DETAILS:');
    console.log(`   Location: ${job.location}`);
    console.log(`   Type:     ${job.type}`);
    console.log(`   Mode:     ${job.workMode}`);
    console.log(`   Level:    ${job.experienceLevel}`);
    console.log(`   Education: ${job.educationLevel}\n`);
    
    console.log('💰 COMPENSATION:');
    console.log(`   Range:    ${job.salary}`);
    console.log(`   Min:      ${job.salaryCurrency} ${job.salaryMin}`);
    console.log(`   Max:      ${job.salaryCurrency} ${job.salaryMax}`);
    console.log(`   Period:   ${job.salaryPeriod}\n`);
    
    console.log('📅 DATES & STATUS:');
    console.log(`   Posted:   ${job.postedDate.toLocaleDateString()}`);
    console.log(`   Deadline: ${job.deadline.toLocaleDateString()}`);
    console.log(`   Start:    ${job.startDate.toLocaleDateString()}`);
    console.log(`   Status:   ${job.status}`);
    console.log(`   Featured: ${job.featured ? 'Yes' : 'No'}\n`);
    
    console.log('👥 CONTACT:');
    console.log(`   Person:   ${job.contactPerson}`);
    console.log(`   Email:    ${job.contactEmail}`);
    console.log(`   Phone:    ${job.contactPhone}\n`);
    
    console.log('🎁 BENEFITS:');
    console.log(`   Positions:  ${job.numberOfPositions}`);
    console.log(`   Travel:     ${job.travelRequired ? 'Required' : 'Not required'}`);
    console.log(`   Relocation: ${job.relocationAssistance ? 'Available' : 'Not available'}`);
    console.log(`   Visa:       ${job.visaSponsorship ? 'Available' : 'Not available'}\n`);
    
    console.log('📝 CONTENT SECTIONS (English):');
    console.log(`   Responsibilities: ${job.translations.en.responsibilities.length} items`);
    console.log(`   Qualifications:   ${job.translations.en.qualifications.length} items`);
    console.log(`   Requirements:     ${job.translations.en.requirements.length} items`);
    console.log(`   Benefits:         ${job.translations.en.benefits.length} items`);
    console.log(`   Nice to Have:     ${job.translations.en.niceToHave.length} items`);
    console.log(`   Tags:             ${job.translations.en.tags.length} items\n`);
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔗 VIEW JOB:');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`   Admin Panel: http://localhost:5173/jobs/${job._id}/edit`);
    console.log(`   Public Site: http://localhost:3000/careers`);
    console.log(`   Job ID:      ${job._id}\n`);
    
    console.log('✨ This job includes ALL 68 fields with comprehensive content!');
    console.log('   Test the enhanced JobDetailModal to see all sections.\n');

  } catch (error) {
    console.error('❌ Error creating comprehensive sample job:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the script
createComprehensiveSampleJob();
