require('dotenv').config();
const mongoose = require('mongoose');
const HomeContent = require('../models/HomeContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethronics';

// Feature content data for all 3 languages
const featuresContentData = [
  // ==================== ENGLISH ====================
  {
    language: 'en',
    section: 'features',
    content: {
      title: "Research & Innovation",
      subtitle: "At Ethronics, we're pushing the boundaries of technology through groundbreaking research and development. Our focus spans robotics, AI, cybersecurity, quantum computing, and blockchain—innovations designed to solve real-world problems with Ethiopian ingenuity.",
      learnMore: "Learn More",
      modalDescription: "Our team is dedicated to advancing this field with innovative solutions tailored to global challenges.",
      items: [
        {
          icon: "Bot",
          title: "Robotics",
          description: "Developing advanced automation systems to enhance manufacturing efficiency and precision.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/robotics-hero.jpg",
          detailedDescription: `Our robotics division is at the forefront of automation technology, developing intelligent systems that transform manufacturing processes. We combine cutting-edge hardware with sophisticated AI algorithms to create robots that can adapt to complex environments and perform tasks with unprecedented precision.

Our research focuses on collaborative robotics (cobots) that work safely alongside humans, autonomous mobile robots for logistics, and specialized industrial robots for precision manufacturing. We're committed to making advanced robotics accessible and practical for Ethiopian industries.`,
          benefits: [
            "Increased manufacturing efficiency by up to 40%",
            "Enhanced precision and quality control",
            "Reduced operational costs and waste",
            "Improved workplace safety through automation of hazardous tasks",
            "24/7 production capabilities",
            "Scalable solutions for businesses of all sizes"
          ],
          applications: [
            "Automotive assembly and manufacturing",
            "Electronics production and testing",
            "Pharmaceutical packaging and quality control",
            "Food processing and packaging",
            "Warehouse automation and logistics",
            "Agricultural automation"
          ],
          technicalDetails: `Our robotics systems utilize advanced sensors, computer vision, and machine learning algorithms. Key technologies include:
- 6-axis articulated robot arms with payload capacity up to 50kg
- Real-time object detection and tracking using deep learning
- Force-torque sensors for delicate manipulation tasks
- ROS (Robot Operating System) based control architecture
- Integration with Industry 4.0 standards and IoT platforms
- Safety-certified collaborative operation modes`,
          category: "Automation & Robotics",
          status: "Active"
        },
        {
          icon: "Brain",
          title: "AI & ML",
          description: "Creating solutions in speech recognition, computer vision, and automation for real-world impact.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/ai-ml-hero.jpg",
          detailedDescription: `Our AI and Machine Learning division develops intelligent systems that understand, learn, and adapt. We specialize in natural language processing for Ethiopian languages, computer vision applications, and predictive analytics that drive business decisions.

We're pioneering AI solutions tailored to the Ethiopian context, including Amharic and Oromifa speech recognition, agricultural yield prediction, and healthcare diagnostics. Our models are trained on diverse datasets to ensure accuracy and fairness across different demographics.`,
          benefits: [
            "Automated decision-making processes",
            "Enhanced customer experience through personalization",
            "Predictive maintenance reducing downtime by 30%",
            "Real-time data analysis and insights",
            "Support for Ethiopian languages (Amharic, Oromifa, Tigrinya)",
            "Continuous learning and improvement"
          ],
          applications: [
            "Speech recognition for Ethiopian languages",
            "Medical image analysis and diagnostics",
            "Fraud detection in financial services",
            "Agricultural crop disease detection",
            "Customer service chatbots and virtual assistants",
            "Predictive maintenance for industrial equipment"
          ],
          technicalDetails: `Our AI/ML platform leverages state-of-the-art technologies:
- Deep learning frameworks: TensorFlow, PyTorch, JAX
- Natural Language Processing with transformer models (BERT, GPT)
- Computer vision using CNNs and Vision Transformers
- Reinforcement learning for optimization problems
- Federated learning for privacy-preserving AI
- MLOps pipeline for continuous model deployment and monitoring
- Custom models trained on Ethiopian language corpora`,
          category: "Artificial Intelligence",
          status: "Active"
        },
        {
          icon: "Shield",
          title: "Cybersecurity",
          description: "Building secure digital frameworks to protect data and systems in an interconnected world.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/cybersecurity-hero.jpg",
          detailedDescription: `In an increasingly connected world, cybersecurity is paramount. Our cybersecurity division provides comprehensive protection for digital assets, from network security to application security and threat intelligence.

We develop advanced security solutions that protect against evolving cyber threats, including ransomware, phishing, and advanced persistent threats (APTs). Our team of certified security experts conducts penetration testing, security audits, and implements defense-in-depth strategies tailored to each organization's needs.`,
          benefits: [
            "Comprehensive threat detection and prevention",
            "24/7 security monitoring and incident response",
            "Compliance with international security standards (ISO 27001, NIST)",
            "Protection against ransomware and malware",
            "Secure cloud infrastructure and data encryption",
            "Regular security audits and vulnerability assessments"
          ],
          applications: [
            "Financial services security and fraud prevention",
            "Healthcare data protection (HIPAA compliance)",
            "Government and critical infrastructure protection",
            "E-commerce platform security",
            "Mobile application security",
            "IoT device security and network protection"
          ],
          technicalDetails: `Our cybersecurity solutions incorporate multiple layers of protection:
- Next-generation firewalls with deep packet inspection
- Intrusion Detection and Prevention Systems (IDS/IPS)
- Security Information and Event Management (SIEM)
- Endpoint Detection and Response (EDR)
- Zero Trust Architecture implementation
- Advanced encryption: AES-256, RSA-4096, elliptic curve cryptography
- Blockchain-based identity management
- AI-powered threat intelligence and anomaly detection`,
          category: "Security & Privacy",
          status: "Active"
        },
        {
          icon: "Atom",
          title: "Quantum Computing",
          description: "Exploring next-generation processing power to solve complex global problems.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/quantum-hero.jpg",
          detailedDescription: `Quantum computing represents the future of computational power. Our quantum research team explores quantum algorithms and applications that can solve problems impossible for classical computers.

While still in the research phase, we're developing quantum algorithms for optimization, cryptography, and simulation. We collaborate with international quantum computing platforms and are preparing Ethiopian industries for the quantum revolution through education and proof-of-concept projects.`,
          benefits: [
            "Exponential speedup for specific computational problems",
            "Enhanced cryptographic security through quantum key distribution",
            "Optimization of complex logistics and supply chains",
            "Drug discovery and molecular simulation",
            "Financial portfolio optimization",
            "Climate modeling and weather prediction"
          ],
          applications: [
            "Cryptography and secure communications",
            "Drug discovery and molecular modeling",
            "Financial modeling and risk analysis",
            "Supply chain and logistics optimization",
            "Materials science and chemistry simulations",
            "Machine learning algorithm acceleration"
          ],
          technicalDetails: `Our quantum computing research focuses on:
- Quantum algorithm development (Shor's, Grover's, VQE, QAOA)
- Quantum simulation using platforms like IBM Qiskit, Google Cirq
- Quantum machine learning and optimization
- Quantum error correction and noise mitigation
- Hybrid quantum-classical algorithms
- Quantum cryptography and quantum key distribution (QKD)
- Collaboration with cloud quantum computing providers
- Research partnerships with international quantum research institutions`,
          category: "Emerging Technologies",
          status: "In Development"
        },
        {
          icon: "Link",
          title: "Blockchain",
          description: "Innovating secure, transparent transaction systems for industries worldwide.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/blockchain-hero.jpg",
          detailedDescription: `Blockchain technology offers unprecedented transparency, security, and decentralization. Our blockchain division develops distributed ledger solutions for supply chain management, digital identity, and financial services.

We're building blockchain infrastructure tailored to Ethiopian needs, including solutions for land registry, agricultural supply chains, and cross-border payments. Our platforms support both public and private blockchain deployments with enterprise-grade security and scalability.`,
          benefits: [
            "Immutable and transparent transaction records",
            "Reduced fraud and counterfeiting",
            "Elimination of intermediaries and reduced costs",
            "Enhanced traceability in supply chains",
            "Secure digital identity management",
            "Smart contracts for automated agreements"
          ],
          applications: [
            "Supply chain tracking and provenance",
            "Digital identity and credential verification",
            "Cross-border payments and remittances",
            "Land registry and property rights",
            "Agricultural product certification",
            "Healthcare records management"
          ],
          technicalDetails: `Our blockchain solutions utilize:
- Multiple blockchain platforms: Ethereum, Hyperledger Fabric, Polygon
- Smart contract development in Solidity and Chaincode
- Consensus mechanisms: Proof of Stake, Practical Byzantine Fault Tolerance
- IPFS for decentralized storage
- Web3 integration and dApp development
- Layer 2 scaling solutions for high throughput
- Cross-chain interoperability protocols
- Enterprise blockchain with permissioned networks`,
          category: "Distributed Systems",
          status: "Active"
        }
      ]
    },
    isPublished: true
  },

  // ==================== AMHARIC ====================
  {
    language: 'am',
    section: 'features',
    content: {
      title: "ምርምር እና ፈጠራ",
      subtitle: "በኢትሮኒክስ፣ በአዲስ ምርምር እና ልማት በኩል የቴክኖሎጂ ድንበሮችን እያስፋፋን ነው። ትኩረታችን ሮቦቲክስ፣ AI፣ ሳይበር ደህንነት፣ ኳንተም ኮምፒውቲንግ እና ብሎክቼይን ላይ ያተኮረ ሲሆን - በኢትዮጵያ ብልሃት የተነደፉ እውነተኛ ችግሮችን ለመፍታት የተነደፉ ፈጠራዎች ናቸው።",
      learnMore: "ተጨማሪ ይወቁ",
      modalDescription: "ቡድናችን ለአለም አቀፍ ፈተናዎች የተበጁ ፈጠራ መፍትሄዎችን በማቅረብ ይህንን መስክ ለማሳደግ ቁርጠኛ ነው።",
      items: [
        {
          icon: "Bot",
          title: "ሮቦቲክስ",
          description: "የማምረቻ ቅልጥፍናን እና ትክክለኛነትን ለማሳደግ የላቀ የራስ ሰር ስርዓቶችን በማዳበር ላይ።",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/robotics-hero.jpg",
          detailedDescription: `የሮቦቲክስ ክፍላችን የራስ ሰር ቴክኖሎጂ ግንባር ቀደም ሲሆን የማምረቻ ሂደቶችን የሚቀይሩ ብልህ ስርዓቶችን በማዳበር ላይ ነው። ለውስብስብ አካባቢዎች መላመድ እና ተግባራትን በታይቶ በማይታወቅ ትክክለኛነት ማከናወን የሚችሉ ሮቦቶችን ለመፍጠር የላቀ ሃርድዌርን ከተራቀቀ AI ስልተ ቀመሮች ጋር እናጣምራለን።

ምርምራችን ከሰዎች ጋር በደህንነት የሚሰሩ የትብብር ሮቦቲክስ (cobots)፣ ለሎጂስቲክስ ራሳቸውን የቻሉ ተንቀሳቃሽ ሮቦቶች እና ለትክክለኛ ማምረቻ ልዩ የኢንዱስትሪ ሮቦቶች ላይ ያተኩራል። የላቀ ሮቦቲክስን ለኢትዮጵያ ኢንዱስትሪዎች ተደራሽ እና ተግባራዊ ለማድረግ ቁርጠኞች ነን።`,
          benefits: [
            "የማምረቻ ቅልጥፍናን እስከ 40% ድረስ መጨመር",
            "የተሻሻለ ትክክለኛነት እና የጥራት ቁጥጥር",
            "የተቀነሰ የአሰራር ወጪ እና ብክነት",
            "አደገኛ ስራዎችን በራስ ሰር በማድረግ የተሻሻለ የስራ ቦታ ደህንነት",
            "24/7 የምርት አቅም",
            "ለሁሉም መጠን ንግዶች ሊስፋፉ የሚችሉ መፍትሄዎች"
          ],
          applications: [
            "የአውቶሞቲቭ ስብሰባ እና ማምረቻ",
            "የኤሌክትሮኒክስ ምርት እና ሙከራ",
            "የፋርማሲዩቲካል ማሸጊያ እና የጥራት ቁጥጥር",
            "የምግብ ማቀነባበሪያ እና ማሸጊያ",
            "የመጋዘን ራስ ሰር እና ሎጂስቲክስ",
            "የግብርና ራስ ሰር"
          ],
          technicalDetails: `የሮቦቲክስ ስርዓቶቻችን የላቀ ሴንሰሮችን፣ የኮምፒውተር እይታን እና የማሽን መማሪያ ስልተ ቀመሮችን ይጠቀማሉ። ቁልፍ ቴክኖሎጂዎች የሚከተሉትን ያካትታሉ:
- እስከ 50 ኪ.ግ የሚደርስ የጭነት አቅም ያለው 6-አክሲስ የተጣመረ የሮቦት ክንዶች
- ጥልቅ ትምህርትን በመጠቀም የእውነተኛ ጊዜ ነገር ማወቂያ እና ክትትል
- ለስለስ ያሉ የማጠናቀቂያ ስራዎች የኃይል-ቶርክ ሴንሰሮች
- ROS (Robot Operating System) ላይ የተመሰረተ የቁጥጥር አርክቴክቸር
- ከኢንዱስትሪ 4.0 ደረጃዎች እና IoT መድረኮች ጋር ውህደት
- ደህንነት-የተረጋገጠ የትብብር የአሰራር ሁነታዎች`,
          category: "ራስ ሰር እና ሮቦቲክስ",
          status: "Active"
        },
        {
          icon: "Brain",
          title: "AI እና ML",
          description: "በንግግር ማወቂያ፣ በኮምፒውተር እይታ እና በራስ ሰር ለእውነተኛ ዓለም ተፅእኖ መፍትሄዎችን በመፍጠር ላይ።",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/ai-ml-hero.jpg",
          detailedDescription: `የAI እና የማሽን መማሪያ ክፍላችን የሚረዱ፣ የሚማሩ እና የሚላመዱ ብልህ ስርዓቶችን ያዳብራል። ለኢትዮጵያ ቋንቋዎች በተፈጥሮ ቋንቋ ማቀነባበር፣ የኮምፒውተር እይታ መተግበሪያዎች እና የንግድ ውሳኔዎችን የሚመሩ ትንበያ ትንታኔዎች ላይ ልዩ ችሎታ አለን።

የአማርኛ እና የኦሮሚፋ ንግግር ማወቂያ፣ የግብርና ምርት ትንበያ እና የጤና እንክብካቤ ምርመራን ጨምሮ ለኢትዮጵያ አውድ የተበጁ AI መፍትሄዎችን እንቀድማለን። ሞዴሎቻችን በተለያዩ የህዝብ ስብስቦች ላይ ትክክለኛነትን እና ፍትሃዊነትን ለማረጋገጥ በተለያዩ የውሂብ ስብስቦች ላይ የሰለጠኑ ናቸው።`,
          benefits: [
            "የራስ ሰር የውሳኔ አሰጣጥ ሂደቶች",
            "በግላዊነት በኩል የተሻሻለ የደንበኛ ተሞክሮ",
            "የመቆም ጊዜን በ30% የሚቀንስ ትንበያ ጥገና",
            "የእውነተኛ ጊዜ የውሂብ ትንተና እና ግንዛቤዎች",
            "ለኢትዮጵያ ቋንቋዎች ድጋፍ (አማርኛ፣ ኦሮሚፋ፣ ትግርኛ)",
            "ቀጣይነት ያለው ትምህርት እና መሻሻል"
          ],
          applications: [
            "ለኢትዮጵያ ቋንቋዎች የንግግር ማወቂያ",
            "የሕክምና ምስል ትንተና እና ምርመራ",
            "በፋይናንስ አገልግሎቶች ውስጥ የማጭበርበር ማወቂያ",
            "የግብርና ሰብል በሽታ ማወቂያ",
            "የደንበኛ አገልግሎት ቻትቦቶች እና ምናባዊ ረዳቶች",
            "ለኢንዱስትሪ መሳሪያዎች ትንበያ ጥገና"
          ],
          technicalDetails: `የAI/ML መድረካችን የላቀ ቴክኖሎጂዎችን ይጠቀማል:
- የጥልቅ ትምህርት ማዕቀፎች: TensorFlow, PyTorch, JAX
- ከትራንስፎርመር ሞዴሎች (BERT, GPT) ጋር የተፈጥሮ ቋንቋ ማቀነባበር
- CNNs እና Vision Transformers በመጠቀም የኮምፒውተር እይታ
- ለማመቻቸት ችግሮች የማጠናከሪያ ትምህርት
- ግላዊነትን ለመጠበቅ የፌደራል ትምህርት
- ለቀጣይነት ያለው ሞዴል ማሰማራት እና ክትትል MLOps ቧንቧ
- በኢትዮጵያ ቋንቋ ኮርፖራ ላይ የሰለጠኑ ብጁ ሞዴሎች`,
          category: "አርቴፊሻል ኢንተለጀንስ",
          status: "Active"
        },
        {
          icon: "Shield",
          title: "ሳይበር ደህንነት",
          description: "በተገናኘ ዓለም ውስጥ መረጃን እና ስርዓቶችን ለመጠበቅ ደህንነቱ የተጠበቀ ዲጂታል ማዕቀፎችን በመገንባት ላይ።",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/cybersecurity-hero.jpg",
          detailedDescription: `በተጨማሪ በተገናኘ ዓለም ውስጥ ሳይበር ደህንነት ወሳኝ ነው። የሳይበር ደህንነት ክፍላችን ከአውታረ መረብ ደህንነት እስከ የመተግበሪያ ደህንነት እና የስጋት መረጃ ድረስ ለዲጂታል ንብረቶች አጠቃላይ ጥበቃ ይሰጣል።

ransomware፣ phishing እና የላቀ ቀጣይነት ያላቸው ስጋቶችን (APTs) ጨምሮ እየተሻሻሉ ካሉ የሳይበር ስጋቶች የሚጠብቁ የላቀ የደህንነት መፍትሄዎችን እናዳብራለን። የተረጋገጡ የደህንነት ባለሙያዎች ቡድናችን የመግባት ሙከራ፣ የደህንነት ኦዲቶች ያካሂዳል እና ለእያንዳንዱ ድርጅት ፍላጎት የተበጁ የመከላከያ-በ-ጥልቀት ስልቶችን ይተገብራል።`,
          benefits: [
            "አጠቃላይ የስጋት ማወቂያ እና መከላከያ",
            "24/7 የደህንነት ክትትል እና የክስተት ምላሽ",
            "ከአለም አቀፍ የደህንነት ደረጃዎች ጋር መጣጣም (ISO 27001, NIST)",
            "ከransomware እና malware ጥበቃ",
            "ደህንነቱ የተጠበቀ የክላውድ መሠረተ ልማት እና የውሂብ ምስጠራ",
            "መደበኛ የደህንነት ኦዲቶች እና የተጋላጭነት ግምገማዎች"
          ],
          applications: [
            "የፋይናንስ አገልግሎቶች ደህንነት እና የማጭበርበር መከላከያ",
            "የጤና እንክብካቤ መረጃ ጥበቃ (HIPAA ተገዢነት)",
            "የመንግስት እና ወሳኝ መሠረተ ልማት ጥበቃ",
            "የኢ-ኮሜርስ መድረክ ደህንነት",
            "የሞባይል መተግበሪያ ደህንነት",
            "የIoT መሳሪያ ደህንነት እና የአውታረ መረብ ጥበቃ"
          ],
          technicalDetails: `የሳይበር ደህንነት መፍትሄዎቻችን በርካታ የጥበቃ ንብርብሮችን ያካትታሉ:
- ጥልቅ ፓኬት ፍተሻ ያለው የሚቀጥለው ትውልድ ፋየርዎሎች
- የመግባት ማወቂያ እና መከላከያ ስርዓቶች (IDS/IPS)
- የደህንነት መረጃ እና የክስተት አስተዳደር (SIEM)
- የመጨረሻ ነጥብ ማወቂያ እና ምላሽ (EDR)
- ዜሮ ትረስት አርክቴክቸር ትግበራ
- የላቀ ምስጠራ: AES-256, RSA-4096, elliptic curve cryptography
- በብሎክቼይን ላይ የተመሰረተ የማንነት አስተዳደር
- AI-ተጎታች የስጋት መረጃ እና የመደበኛ ያልሆነ ማወቂያ`,
          category: "ደህንነት እና ግላዊነት",
          status: "Active"
        },
        {
          icon: "Atom",
          title: "ኳንተም ኮምፒውቲንግ",
          description: "ውስብስብ የአለም ችግሮችን ለመፍታት የሚቀጥለው ትውልድ የማቀነባበሪያ ኃይልን በማሰስ ላይ።",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/quantum-hero.jpg",
          detailedDescription: `ኳንተም ኮምፒውቲንግ የወደፊቱን የስሌት ኃይል ይወክላል። የኳንተም ምርምር ቡድናችን ለክላሲካል ኮምፒውተሮች የማይቻሉ ችግሮችን መፍታት የሚችሉ የኳንተም ስልተ ቀመሮችን እና መተግበሪያዎችን ያስሱ።

አሁንም በምርምር ደረጃ ላይ እያለ፣ ለማመቻቸት፣ ለክሪፕቶግራፊ እና ለማስመሰል የኳንተም ስልተ ቀመሮችን እያዳበርን ነው። ከአለም አቀፍ የኳንተም ኮምፒውቲንግ መድረኮች ጋር እንተባበራለን እና የኢትዮጵያ ኢንዱስትሪዎችን በትምህርት እና በማስረጃ-ጽንሰ-ሀሳብ ፕሮጀክቶች ለኳንተም አብዮት እያዘጋጀን ነው።`,
          benefits: [
            "ለተወሰኑ የስሌት ችግሮች ኤክስፖኔንሺያል ፍጥነት መጨመር",
            "በኳንተም ቁልፍ ስርጭት በኩል የተሻሻለ የክሪፕቶግራፊክ ደህንነት",
            "የውስብስብ ሎጂስቲክስ እና የአቅርቦት ሰንሰለቶች ማመቻቸት",
            "የመድኃኒት ግኝት እና የሞለኪውል ማስመሰል",
            "የፋይናንስ ፖርትፎሊዮ ማመቻቸት",
            "የአየር ንብረት ሞዴሊንግ እና የአየር ሁኔታ ትንበያ"
          ],
          applications: [
            "ክሪፕቶግራፊ እና ደህንነቱ የተጠበቀ ግንኙነቶች",
            "የመድኃኒት ግኝት እና የሞለኪውል ሞዴሊንግ",
            "የፋይናንስ ሞዴሊንግ እና የአደጋ ትንተና",
            "የአቅርቦት ሰንሰለት እና የሎጂስቲክስ ማመቻቸት",
            "የቁሳቁስ ሳይንስ እና የኬሚስትሪ ማስመሰያዎች",
            "የማሽን መማሪያ ስልተ ቀመር ማፋጠን"
          ],
          technicalDetails: `የኳንተም ኮምፒውቲንግ ምርምራችን የሚያተኩረው:
- የኳንተም ስልተ ቀመር ልማት (Shor's, Grover's, VQE, QAOA)
- እንደ IBM Qiskit, Google Cirq ያሉ መድረኮችን በመጠቀም የኳንተም ማስመሰል
- የኳንተም ማሽን መማር እና ማመቻቸት
- የኳንተም ስህተት ማስተካከያ እና የድምፅ ማቃለል
- ድብልቅ የኳንተም-ክላሲካል ስልተ ቀመሮች
- የኳንተም ክሪፕቶግራፊ እና የኳንተም ቁልፍ ስርጭት (QKD)
- ከክላውድ የኳንተም ኮምፒውቲንግ አቅራቢዎች ጋር ትብብር
- ከአለም አቀፍ የኳንተም ምርምር ተቋማት ጋር የምርምር ሽርክና`,
          category: "አዳዲስ ቴክኖሎጂዎች",
          status: "In Development"
        },
        {
          icon: "Link",
          title: "ብሎክቼይን",
          description: "በዓለም ዙሪያ ላሉ ኢንዱስትሪዎች ደህንነቱ የተጠበቀ፣ ግልጽ የግብይት ስርዓቶችን በመፍጠር ላይ።",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/blockchain-hero.jpg",
          detailedDescription: `የብሎክቼይን ቴክኖሎጂ ታይቶ የማይታወቅ ግልጽነት፣ ደህንነት እና ያለማዕከላዊነት ይሰጣል። የብሎክቼይን ክፍላችን ለአቅርቦት ሰንሰለት አስተዳደር፣ ዲጂታል ማንነት እና የፋይናንስ አገልግሎቶች የተሰራጨ የመዝገብ መፍትሄዎችን ያዳብራል።

የመሬት መዝገብ፣ የግብርና አቅርቦት ሰንሰለቶች እና የድንበር ተሻጋሪ ክፍያዎችን ጨምሮ ለኢትዮጵያ ፍላጎቶች የተበጁ የብሎክቼይን መሠረተ ልማቶችን እየገነባን ነው። መድረኮቻችን ከኢንተርፕራይዝ-ደረጃ ደህንነት እና ሊስፋፉ የሚችሉ ሁለቱንም ህዝባዊ እና የግል የብሎክቼይን ማሰማራቶችን ይደግፋሉ።`,
          benefits: [
            "የማይለወጥ እና ግልጽ የግብይት መዝገቦች",
            "የተቀነሰ ማጭበርበር እና ማስመሰል",
            "የመካከለኛ ሰዎችን ማስወገድ እና የተቀነሰ ወጪ",
            "በአቅርቦት ሰንሰለቶች ውስጥ የተሻሻለ ተከታታይነት",
            "ደህንነቱ የተጠበቀ ዲጂታል ማንነት አስተዳደር",
            "ለራስ ሰር ስምምነቶች ብልህ ኮንትራቶች"
          ],
          applications: [
            "የአቅርቦት ሰንሰለት ክትትል እና አመጣጥ",
            "ዲጂታል ማንነት እና ምስክርነት ማረጋገጫ",
            "የድንበር ተሻጋሪ ክፍያዎች እና ገንዘብ መላክ",
            "የመሬት መዝገብ እና የንብረት መብቶች",
            "የግብርና ምርት ማረጋገጫ",
            "የጤና እንክብካቤ መዝገቦች አስተዳደር"
          ],
          technicalDetails: `የብሎክቼይን መፍትሄዎቻችን የሚከተሉትን ይጠቀማሉ:
- በርካታ የብሎክቼይን መድረኮች: Ethereum, Hyperledger Fabric, Polygon
- በSolidity እና Chaincode ውስጥ ብልህ ኮንትራት ልማት
- የስምምነት ዘዴዎች: Proof of Stake, Practical Byzantine Fault Tolerance
- ለተሰራጨ ማከማቻ IPFS
- Web3 ውህደት እና dApp ልማት
- ለከፍተኛ ውጤታማነት የንብርብር 2 የመለኪያ መፍትሄዎች
- የመስቀለኛ-ሰንሰለት መስተጋብር ፕሮቶኮሎች
- ከፈቃድ ያላቸው አውታረ መረቦች ጋር የኢንተርፕራይዝ ብሎክቼይን`,
          category: "የተሰራጩ ስርዓቶች",
          status: "Active"
        }
      ]
    },
    isPublished: true
  },

  // ==================== OROMIFA ====================
  {
    language: 'om',
    section: 'features',
    content: {
      title: "Qorannoo fi Kalaqaa",
      subtitle: "Ethronics keessatti, qorannoo fi misooma haaraa ta'een daangaa teeknooloojii bal'isaa jirra. Xiyyeeffannoon keenya robootiksi, AI, nageenyaa saayibarii, quantum computing, fi blockchain irratti kan xiyyeeffate yoo ta'u - kalaqoota rakkoolee dhugaa furuu danda'an ogummaa Itoophiyaatiin qophaa'an dha.",
      learnMore: "Dabalataa Beekaa",
      modalDescription: "Gareen keenya qormaata addunyaa irratti xiyyeeffatee furmaata kalaqaa dhiyeessuuf kutannoo qaba.",
      items: [
        {
          icon: "Bot",
          title: "Robootiksi",
          description: "Gahumsa oomishaa fi sirrii ta'uu guddisuu danda'an sirna ofumaan hojjetu sadarkaa olaanaa qopheessaa jirra.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/robotics-hero.jpg",
          detailedDescription: `Kutaan robootiksi keenyaa fuuldura teeknooloojii ofumaan hojjetuu irratti argama, sirna sammuu qabu adeemsa oomishaa jijjiiran qopheessaa jira. Robootota naannoo walxaxaa waliin madaquu fi hojiiwwan sirrii ta'een hin beekamne raawwachuu danda'an uumuuf hardware sadarkaa olaanaa fi algorithms AI sadarkaa olaanaa walitti makuuna.

Qorannoon keenya robootiksi walta'iinsaa (cobots) namoota waliin nageenyaan hojjetan, robootota socho'oo ofumaan hojjetan loojistiksiif, fi robootota industirii addaa oomisha sirrii ta'eef irratti xiyyeeffata. Robootiksi sadarkaa olaanaa industirii Itoophiyaatiif argamaa fi hojiirra ooluu danda'u gochuuf kutannoo qabna.`,
          benefits: [
            "Gahumsa oomishaa hanga %40tti guddisuu",
            "Sirrii ta'uu fi to'annoo qulqullina fooyya'e",
            "Baasii hojii fi balfa hir'ate",
            "Hojiiwwan balaa qaban ofumaan hojjechuun nageenyaa bakka hojii fooyya'e",
            "Dandeettii oomishaa 24/7",
            "Furmaata bal'achuu danda'an daldala hunda hammataaf"
          ],
          applications: [
            "Walitti qabuu fi oomisha awutoomootivii",
            "Oomisha fi qorannoo elektirooniksii",
            "Qaphxii faarmaasuutikaalii fi to'annoo qulqullina",
            "Qopheessuu fi qaphxii nyaataa",
            "Ofumaan hojjechuu kuusaa fi loojistiksi",
            "Ofumaan hojjechuu qonnaa"
          ],
          technicalDetails: `Sirni robootiksi keenyaa sensaroota sadarkaa olaanaa, mul'ata kompiitaraa, fi algorithms barumsa maashinii fayyadama. Teeknooloojiiwwan ijoo kanneen armaan gadii of keessaa qaba:
- Irree robootii walxaxaa axis-6 dandeettii fe'umsaa hanga 50kg qabu
- Wanta yeroo qabatamaa adda baasuu fi hordofuu barumsa gadi fagoo fayyadamuun
- Sensaroota humna-torque hojiiwwan lallaafaa xumuruu danda'aniif
- Caasaa to'annoo ROS (Robot Operating System) irratti hundaa'e
- Walitti makamuu sadarkaa Industirii 4.0 fi waltajjiiwwan IoT waliin
- Haalota hojii walta'iinsaa nageenyaan mirkaneeffame`,
          category: "Ofumaan Hojjechuu fi Robootiksi",
          status: "Active"
        },
        {
          icon: "Brain",
          title: "AI fi ML",
          description: "Adda baasuu dubbii, mul'ata kompiitaraa, fi ofumaan hojjechuun dhiibbaa addunyaa dhugaatiif furmaata uumaa jirra.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/ai-ml-hero.jpg",
          detailedDescription: `Kutaan AI fi Barumsa Maashinii keenyaa sirna sammuu qabu hubatu, baratan, fi madaqan qopheessa. Qopheessuu afaan uumamaa afaanota Itoophiyaatiif, aplikeeshiniiwwan mul'ata kompiitaraa, fi xiinxala tilmaama murtoo daldalaa oofan irratti ogummaa addaa qabna.

Furmaata AI haala Itoophiyaatiif mijatu, adda baasuu dubbii Amaariffaa fi Oromiffaa, tilmaama oomisha qonnaa, fi qorannoo eegumsa fayyaa dabalatee fuuldura deemaa jirra. Moodeelonni keenya kuusaa deetaa adda addaa irratti leenjifaman sirrii ta'uu fi haqummaa uummata adda addaa irratti mirkaneessuuf.`,
          benefits: [
            "Adeemsa murtoo ofumaan kennu",
            "Muuxannoo maamiltootaa dhuunfachiisuu danda'uun fooyya'e",
            "Suphaa tilmaama dhaabbii %30n hir'isu",
            "Xiinxala deetaa yeroo qabatamaa fi hubannoo",
            "Deeggarsa afaanota Itoophiyaa (Amaariffaa, Oromiffaa, Tigiriffaa)",
            "Barumsa fi fooyya'iinsa itti fufiinsa qabu"
          ],
          applications: [
            "Adda baasuu dubbii afaanota Itoophiyaatiif",
            "Xiinxala suuraa yaalaa fi qorannoo",
            "Adda baasuu gowwoomsaa tajaajila maallaqaa keessatti",
            "Adda baasuu dhukkuba midhaan qonnaa",
            "Chaatbootota tajaajila maamiltootaa fi gargaartota vaartuwalii",
            "Suphaa tilmaama meeshaalee industirii"
          ],
          technicalDetails: `Waltajjiin AI/ML keenyaa teeknooloojiiwwan sadarkaa olaanaa fayyadama:
- Caasaa barumsa gadi fagoo: TensorFlow, PyTorch, JAX
- Qopheessuu Afaan Uumamaa moodeelota transformer (BERT, GPT) waliin
- Mul'ata kompiitaraa CNNs fi Vision Transformers fayyadamuun
- Barumsa cimsuu rakkoolee mijjeessuuf
- Barumsa federaalaa AI dhuunfaa eeguuf
- Paayipii MLOps bobbii moodeelii itti fufiinsa qabuu fi hordofuuf
- Moodeelota haala addaa corpora afaan Itoophiyaa irratti leenjifaman`,
          category: "Sammuu Namtolchee",
          status: "Active"
        },
        {
          icon: "Shield",
          title: "Nageenyaa Saayibarii",
          description: "Addunyaa walitti hidhamte keessatti deetaa fi sirna eeguuf caasaa dijitaalaa nageenya qabu ijaaraa jirra.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/cybersecurity-hero.jpg",
          detailedDescription: `Addunyaa dabalataan walitti hidhamte keessatti nageenyaan saayibarii murteessaa dha. Kutaan nageenyaa saayibarii keenyaa eegumsa bal'aa qabeenya dijitaalaatiif, nageenyaa networkii irraa kaasee hanga nageenyaa aplikeeshinii fi odeeffannoo doorsisaatti ni kenna.

Furmaata nageenyaa sadarkaa olaanaa doorsisa saayibarii jijjiiramaa jiru, ransomware, phishing, fi doorsisa itti fufiinsa sadarkaa olaanaa (APTs) dabalatee irraa eegan qopheessina. Gareen ogeeyyii nageenyaa ragaa qaban keenyaa qorannoo seensaa, oodittii nageenyaa raawwata, fi tooftaalee ittisa-gadi-fageenya dhaabbata hundaaf mijatan hojiirra oolcha.`,
          benefits: [
            "Adda baasuu fi ittisuu doorsisaa bal'aa",
            "Hordoffii nageenyaa 24/7 fi deebii taateewwaa",
            "Walsimsiisuu sadarkaa nageenyaa addunyaa (ISO 27001, NIST)",
            "Eegumsa ransomware fi malware irraa",
            "Bu'uura duumessaa nageenya qabu fi icciitii deetaa",
            "Oodittii nageenyaa idilee fi madaallii saaxilamummaa"
          ],
          applications: [
            "Nageenyaa tajaajila maallaqaa fi ittisuu gowwoomsaa",
            "Eegumsa deetaa eegumsa fayyaa (walsimsiisuu HIPAA)",
            "Eegumsa mootummaa fi bu'uura bu'uuraa murteessaa",
            "Nageenyaa waltajjii e-commerce",
            "Nageenyaa aplikeeshinii mobaayilaa",
            "Nageenyaa meeshaa IoT fi eegumsa networkii"
          ],
          technicalDetails: `Furmaatni nageenyaa saayibarii keenyaa laayibarota eegumsa hedduu of keessaa qaba:
- Faayarwoolota dhaloota itti aanu qorannoo paakeejii gadi fagoo qabu
- Sirna Adda Baasuu fi Ittisuu Seensaa (IDS/IPS)
- Bulchiinsa Odeeffannoo Nageenyaa fi Taateewwaa (SIEM)
- Adda Baasuu fi Deebii Qabxii Xumuraa (EDR)
- Hojiirra oolmaa Caasaa Amanamummaa Zeeroo
- Icciitii sadarkaa olaanaa: AES-256, RSA-4096, elliptic curve cryptography
- Bulchiinsa eenyummaa blockchain irratti hundaa'e
- Odeeffannoo doorsisaa fi adda baasuu hin idilee AI-powered`,
          category: "Nageenyaa fi Dhuunfaa",
          status: "Active"
        },
        {
          icon: "Atom",
          title: "Quantum Computing",
          description: "Rakkoolee addunyaa walxaxaa furuu danda'u humna qopheessuu dhaloota itti aanu sakatta'aa jirra.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/quantum-hero.jpg",
          detailedDescription: `Quantum computing egeree humna shallaggii bakka bu'a. Gareen qorannoo quantum keenyaa algorithms quantum fi aplikeeshiniiwwan rakkoolee kompiitarota kalaasikaa hin danda'amne furuu danda'an sakatta'a.

Ammallee sadarkaa qorannoo irratti yoo jiraatus, algorithms quantum mijjeessuu, cryptography, fi fakkeessuu danda'aniif qopheessaa jirra. Waltajjiiwwan quantum computing addunyaa waliin hojjenna, fi industirii Itoophiyaa pirojektoota barnoota fi ragaa-yaada-bu'uuraa danda'uun abyootii quantum qopheessaa jirra.`,
          benefits: [
            "Saffisa eksipoonenshiyaalii rakkoolee shallaggii murtaa'oo ta'aniif",
            "Nageenyaa kiriiptoograafikii fooyya'e raabsa furtuu quantum danda'uun",
            "Mijjeessuu loojistiksi walxaxaa fi sansalata dhiyeessii",
            "Argannoo qoricha fi fakkeessuu moolekiyuulaa",
            "Mijjeessuu poortfooliyoo maallaqaa",
            "Moodeelii haala qilleensaa fi tilmaama haala qilleensaa"
          ],
          applications: [
            "Kiriiptoograafikii fi qunnamtii nageenya qabu",
            "Argannoo qoricha fi moodeelii moolekiyuulaa",
            "Moodeelii maallaqaa fi xiinxala balaa",
            "Mijjeessuu sansalata dhiyeessii fi loojistiksi",
            "Fakkeessuu saayinsii meeshaalee fi keemistrii",
            "Saffisiisuu algorithm barumsa maashinii"
          ],
          technicalDetails: `Qorannoon quantum computing keenyaa kanneen armaan gadii irratti xiyyeeffata:
- Misooma algorithm quantum (Shor's, Grover's, VQE, QAOA)
- Fakkeessuu quantum waltajjiiwwan akka IBM Qiskit, Google Cirq fayyadamuun
- Barumsa maashinii quantum fi mijjeessuu
- Sirreessuu dogongora quantum fi hir'isuu sagalee
- Algorithms makaa quantum-kalaasikaa
- Kiriiptoograafikii quantum fi raabsa furtuu quantum (QKD)
- Walta'iinsa dhiyeessitootaa quantum computing duumessaa waliin
- Hirmaannaa qorannoo dhaabbilee qorannoo quantum addunyaa waliin`,
          category: "Teeknooloojiiwwan Haaraa",
          status: "In Development"
        },
        {
          icon: "Link",
          title: "Blockchain",
          description: "Sirna daldalaa nageenya qabu, ifa ta'e industirii addunyaa hundaaf kalaqaa jirra.",
          image: "https://res.cloudinary.com/demo/image/upload/v1234567890/blockchain-hero.jpg",
          detailedDescription: `Teeknooloojiin blockchain ifa ta'uu, nageenyaa, fi giddugaleessummaa hin beekamne kenna. Kutaan blockchain keenyaa furmaata leejarii raabsamee bulchiinsa sansalata dhiyeessii, eenyummaa dijitaalaa, fi tajaajila maallaqaatiif qopheessa.

Bu'uura blockchain fedhii Itoophiyaatiif mijatu, furmaata galmee lafaa, sansalata dhiyeessii qonnaa, fi kaffaltii daangaa cehuuf dabalatee ijaaraa jirra. Waltajjiiwwan keenyaa bobbii blockchain uummataa fi dhuunfaa lamaan nageenyaa sadarkaa dhaabbataa fi bal'achuu danda'u deeggaruu.`,
          benefits: [
            "Galmee daldalaa hin jijjiiramne fi ifa ta'e",
            "Gowwoomsaa fi fakkeessuu hir'ate",
            "Giddugaleessitootaa balleessuu fi baasii hir'ate",
            "Hordoffii fooyya'e sansalata dhiyeessii keessatti",
            "Bulchiinsa eenyummaa dijitaalaa nageenya qabu",
            "Kontraatota sammuu waliigaltee ofumaan ta'aniif"
          ],
          applications: [
            "Hordoffii sansalata dhiyeessii fi madda",
            "Eenyummaa dijitaalaa fi mirkaneessuu ragaa",
            "Kaffaltii daangaa cehu fi ergaa maallaqaa",
            "Galmee lafaa fi mirga qabeenyaa",
            "Ragaa sirritti oomisha qonnaa",
            "Bulchiinsa galmee eegumsa fayyaa"
          ],
          technicalDetails: `Furmaatni blockchain keenyaa kanneen armaan gadii fayyadama:
- Waltajjiiwwan blockchain hedduu: Ethereum, Hyperledger Fabric, Polygon
- Misooma kontraata sammuu Solidity fi Chaincode keessatti
- Mala waliigaltee: Proof of Stake, Practical Byzantine Fault Tolerance
- IPFS kuusaa raabsamee ta'eef
- Walitti makamuu Web3 fi misooma dApp
- Furmaata safaraa laayibara 2 bu'aa olaanaatiif
- Pirootookoolota walqunnamtii sansalata-cehumsaa
- Blockchain dhaabbataa networkii hayyamaa qabu waliin`,
          category: "Sirna Raabsamee",
          status: "Active"
        }
      ]
    },
    isPublished: true
  }
];

async function seedFeaturesContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update or insert features content for each language
    for (const featureData of featuresContentData) {
      await HomeContent.findOneAndUpdate(
        { language: featureData.language, section: featureData.section },
        featureData,
        { upsert: true, new: true }
      );
      console.log(`Updated features content for language: ${featureData.language}`);
    }

    console.log('Features content seeding completed successfully!');
    console.log(`Total features per language: ${featuresContentData[0].content.items.length}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding features content:', error);
    process.exit(1);
  }
}

seedFeaturesContent();
