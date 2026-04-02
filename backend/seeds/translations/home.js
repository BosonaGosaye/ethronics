export const homeTranslations = {
  en: {
    // Hero Section
    hero: {
      badge: "New Collection",
      slide1: {
        line1: "A technology that is",
        line2: "taught, researched, made, and perfected",
        line3: "in Ethiopia and Applied worldwide",
        description: "Empowering the next generation of innovators and leaders through cutting-edge education, research, and manufacturing excellence."
      },
      slide2: {
        line1: "Pioneering the Future of",
        line2: "Technology Education",
        line3: "in Africa",
        description: "Join us in shaping tomorrow's technological landscape through innovative learning and hands-on experience."
      },
      slide3: {
        line1: "Building Tomorrow's",
        line2: "Technology Leaders",
        line3: "Today",
        description: "Experience world-class education and research opportunities in robotics, AI, and advanced manufacturing."
      },
      buttons: {
        summerTraining: "Join Summer Training",
        explorePrograms: "Explore Programs",
        viewResearch: "View Research"
      },
      floatingPromo: {
        title: "Join the Robotic Engineering and AI Training!",
        description: "Build robots and code the future in our Summer Training for 4th-12th graders!",
        button: "Register Now"
      }
    },
    // Features Section
    features: {
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
    // Solutions Section
    solutions: {
      title: "Solutions",
      titleSuffix: "We're Building",
      subtitle: "Ethronics is pioneering transformative solutions across education, manufacturing, and global technology, rooted in Ethiopian innovation for worldwide impact.",
      categories: {
        education: {
          title: "Education",
          description: "Empowering Ethiopia's youth with cutting-edge skills in robotics, AI, and technology to lead globally."
        },
        research: {
          title: "Research & Development",
          description: "Developing scalable technologies from Ethiopia to address global challenges."
        },
        manufacturing: {
          title: "Manufacturing",
          description: "Revolutionizing production with smart, IoT-driven solutions for Ethiopia's industrial future."
        }
      },
      items: {
        roboticsBootcamp: { title: "Robotics Bootcamp", description: "Dive into automation with hands-on robotics skills.", action: "Join Now" },
        aiCurriculum: { title: "AI Curriculum", description: "Learn machine learning and data science.", action: "Explore Courses" },
        mentorship: { title: "Student Mentorship", description: "Get guidance from industry experts.", action: "Apply for Mentorship" },
        scholarships: { title: "Tech Scholarships", description: "Funding for tech education.", action: "Apply Now" },
        tvet: { title: "TVET Programs", description: "Practical skills in robotics and AI.", action: "Learn More" },
        undergrad: { title: "Undergraduate Programs", description: "Foundation in tech and innovation.", action: "Explore Programs" },
        postgrad: { title: "Postgraduate Studies", description: "Advance your tech expertise.", action: "Apply Now" },
        training: { title: "Professional Training", description: "Upskill in AI and robotics.", action: "Get Trained" },
        gateBarrier: { title: "Gate Barrier Tech", description: "Automated access control for security.", action: "Request Demo" },
        smartFactory: { title: "Smart Factory Systems", description: "IoT-enabled manufacturing solutions.", action: "Learn More" },
        blockchain: { title: "Blockchain Platforms", description: "Secure transaction systems.", action: "Discover More" },
        trafficControl: { title: "AI Traffic Control", description: "Optimize urban traffic flow.", action: "Learn How" },
        quantum: { title: "Quantum Research", description: "Next-gen computing solutions.", action: "Join Research" },
        cybersecurity: { title: "Cybersecurity Innovations", description: "Advanced data protection.", action: "Explore Solutions" },
        partnerships: { title: "Global Tech Partnerships", description: "Collaborate for innovation.", action: "Partner With Us" }
      }
    },
    // Gallery Section
    gallery: {
      title: "Our Journey in Pictures",
      subtitle: "Explore the moments that define Ethronics—where education inspires, research innovates, and manufacturing transforms.",
      showMore: "Show More",
      showLess: "Show Less",
      categories: {
        education: "Education",
        research: "Research"
      },
      items: [
        {
          title: "Memorandum with Arsi University",
          description: "Ethronics signed a memorandum of understanding with Arsi University to collaborate on innovative research and educational programs. This partnership aims to foster advancements in technology and education, bringing together academic expertise and industry innovation to create impactful solutions. Through this collaboration, we are committed to developing new curricula, conducting joint research projects, and providing students with hands-on opportunities to engage with cutting-edge technologies like robotics and AI."
        },
        {
          title: "Robotics in AI: Redefining Human Potential",
          description: "Our CEO presented groundbreaking insights on how robotics in AI is reshaping the future and redefining human potential at the conference. The presentation highlighted the integration of intelligent systems into everyday life, exploring how these technologies can enhance productivity, creativity, and problem-solving across industries. The discussion also covered the ethical implications and the need for inclusive innovation to ensure these advancements benefit society as a whole."
        },
        {
          title: "Artificial Perception: Exploring the Senses of Sight and Perception",
          description: "Our CTO shared innovative research on artificial perception, delving into the senses of sight and perception at the conference. This research explores how machines can mimic human sensory capabilities, with a focus on visual processing and cognitive understanding. The presentation included detailed case studies, technical demonstrations, and future applications in fields like autonomous systems, healthcare, and urban planning, showcasing Ethiopia's growing role in global tech innovation."
        },
        {
          title: "Empowering Future Innovators, summer camp",
          description: "Ethronics is committed to empowering future innovators through hands-on education and training. We believe in nurturing creativity, critical thinking, and problem-solving skills in students. Our programs are designed to inspire the next generation of leaders in technology, equipping them with the knowledge and tools they need to thrive in a rapidly evolving world. By fostering a culture of innovation and collaboration, we aim to create a brighter future for Ethiopia and beyond."
        }
      ]
    },
    // Partnerships Section
    partnerships: {
      title: "Our Partnerships",
      subtitle: "Collaboration drives our success. Ethronics is forging powerful partnerships with academic institutions, industry leaders, and local innovators to amplify our impact and bring transformative technology to life.",
      featured: "Featured Partnerships",
      featuredSubtitle: "Highlighting some of our most impactful collaborations that are shaping the future of technology education.",
      cta: {
        title: "Partner With Us",
        description: "Join our network of partners and collaborate with us to drive innovation, advance education, and create meaningful impact in technology.",
        becomePartner: "Become a Partner",
        learnMore: "Learn More"
      },
      types: [
        { title: "Academic Institutions", description: "Collaborating with universities to advance tech education and research." },
        { title: "Industry Leaders", description: "Partnering with technology companies to bridge academia and industry." },
        { title: "Research Organizations", description: "Collaborating on cutting-edge research in robotics and AI." },
        { title: "Government Agencies", description: "Working with government to develop national technology initiatives." },
        { title: "International Organizations", description: "Global partnerships to expand our reach and impact worldwide." },
        { title: "Startup Ecosystem", description: "Supporting and collaborating with innovative startups and entrepreneurs." }
      ],
      keyPartnerships: [
        {
          name: "Arsi University",
          description: "Strategic partnership for curriculum development and research collaboration",
          type: "Academic"
        },
        {
          name: "Ethiopian Ministry of Education",
          description: "Collaboration on national STEM education initiatives",
          type: "Government"
        },
        {
          name: "International Tech Partners",
          description: "Global technology partnerships for knowledge exchange",
          type: "Industry"
        }
      ]
    },
    // CTA Section
    cta: {
      title: "Join the Robotics Revolution",
      description: "Ready to build robots and code the future? Sign up for our Summer Robotics & Autonomous Systems Training for 4th-12th graders. Or explore other ways to engage with Ethronics' cutting-edge programs and research.",
      buttons: {
        register: "Register for Summer Training",
        explore: "Explore Opportunities"
      },
      features: [
        { title: "Fast Track", description: "Quick enrollment and immediate access to programs" },
        { title: "Expert Guidance", description: "Learn from industry professionals and researchers" },
        { title: "Proven Results", description: "Join thousands of successful graduates worldwide" }
      ]
    }
  },
  am: {
    // Hero Section
    hero: {
      badge: "አዲስ ስብስብ",
      slide1: {
        line1: "በኢትዮጵያ የሚማር፣ የሚመረመር፣",
        line2: "የሚመረትና የሚፈጸም",
        line3: "በዓለም ላይ የሚተገበር ቴክኖሎጂ",
        description: "በዘመናዊ ትምህርት፣ ምርምር እና የማምረት ብቃት አዲሱን ትውልድ ፈጠራ ሰሪዎችና መሪዎች በማብቃት ላይ።"
      },
      slide2: {
        line1: "የቴክኖሎጂ ትምህርትን",
        line2: "የወደፊት መንገድ",
        line3: "በአፍሪካ በመክፈት ላይ",
        description: "በፈጠራ ትምህርት እና በተግባራዊ ልምድ የነገን የቴክኖሎጂ መልክዓ ምድር በመቅረጽ ይቀላቀሉን።"
      },
      slide3: {
        line1: "የነገን የቴክኖሎጂ",
        line2: "መሪዎችን",
        line3: "ዛሬ እየገነባን ነው",
        description: "በሮቦቲክስ፣ AI እና የላቀ ማምረቻ ውስጥ የዓለም ደረጃ ትምህርት እና የምርምር እድሎችን ይለማመዱ።"
      },
      buttons: {
        summerTraining: "የበጋ ስልጠና ይቀላቀሉ",
        explorePrograms: "ፕሮግራሞችን ያስሱ",
        viewResearch: "ምርምር ይመልከቱ"
      },
      floatingPromo: {
        title: "የሮቦቲክ ምህንድስና እና AI ስልጠና ይቀላቀሉ!",
        description: "ከ4ኛ-12ኛ ክፍል ተማሪዎች ለሆኑ በበጋ ስልጠናችን ሮቦቶችን ይገንቡ እና የወደፊቱን ይፍጠሩ!",
        button: "አሁን ይመዝገቡ"
      }
    },
    // Features Section
    features: {
      title: "ምርምር እና ፈጠራ",
      subtitle: "በኢትሮኒክስ የቴክኖሎጂ ድንበሮችን በምርምር እና ልማት እየገፋን ነው። ትኩረታችን ሮቦቲክስ፣ AI፣ ሳይበር ደህንነት፣ ኳንተም ኮምፒውቲንግ እና ብሎክቼይን ላይ ነው—በኢትዮጵያ ብልሃት የእውነተኛ ዓለም ችግሮችን ለመፍታት የተነደፉ ፈጠራዎች።",
      learnMore: "ተጨማሪ ይወቁ",
      modalDescription: "ቡድናችን ይህንን መስክ ለዓለም አቀፍ ፈተናዎች በተዘጋጁ ፈጠራ መፍትሄዎች ለማሳደግ ቁርጠኛ ነው።",
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
    // Solutions Section
    solutions: {
      title: "መፍትሄዎች",
      titleSuffix: "እየገነባን ያለነው",
      subtitle: "ኢትሮኒክስ በትምህርት፣ በማምረት እና በዓለም አቀፍ ቴክኖሎጂ ላይ በኢትዮጵያ ፈጠራ ላይ የተመሰረተ ለዓለም አቀፍ ተፅእኖ የሚቀይሩ መፍትሄዎችን እየመራ ነው።",
      categories: {
        education: {
          title: "ትምህርት",
          description: "የኢትዮጵያን ወጣቶች በሮቦቲክስ፣ AI እና ቴክኖሎጂ ውስጥ በዘመናዊ ክህሎቶች በማብቃት በዓለም አቀፍ ደረጃ እንዲመሩ።"
        },
        research: {
          title: "ምርምር እና ልማት",
          description: "ከኢትዮጵያ የዓለም አቀፍ ችግሮችን ለመፍታት ሊስፋፉ የሚችሉ ቴክኖሎጂዎችን በማዳበር ላይ።"
        },
        manufacturing: {
          title: "ማምረት",
          description: "ለኢትዮጵያ የኢንዱስትሪ ወደፊት በስማርት፣ በIoT የሚመራ መፍትሄዎች ምርትን በመቀየር ላይ።"
        }
      },
      items: {
        roboticsBootcamp: { title: "የሮቦቲክስ ቡትካምፕ", description: "በተግባራዊ የሮቦቲክስ ክህሎቶች ወደ ራስ ገዝ ስርዓት ይግቡ።", action: "አሁን ይቀላቀሉ" },
        aiCurriculum: { title: "የAI ስርዓተ ትምህርት", description: "የማሽን ለርኒንግ እና የመረጃ ሳይንስ ይማሩ።", action: "ኮርሶችን ያስሱ" },
        mentorship: { title: "የተማሪ መመሪያ", description: "ከኢንዱስትሪ ባለሙያዎች መመሪያ ያግኙ።", action: "ለመመሪያ ያመልክቱ" },
        scholarships: { title: "የቴክኖሎጂ ስኮላርሺፕ", description: "ለቴክኖሎጂ ትምህርት የገንዘብ ድጋፍ።", action: "አሁን ያመልክቱ" },
        tvet: { title: "የTVET ፕሮግራሞች", description: "በሮቦቲክስ እና AI ውስጥ ተግባራዊ ክህሎቶች።", action: "ተጨማሪ ይወቁ" },
        undergrad: { title: "የመጀመሪያ ዲግሪ ፕሮግራሞች", description: "በቴክኖሎጂ እና ፈጠራ መሰረት።", action: "ፕሮግራሞችን ያስሱ" },
        postgrad: { title: "የድህረ ምረቃ ጥናቶች", description: "የቴክኖሎጂ እውቀትዎን ያሳድጉ።", action: "አሁን ያመልክቱ" },
        training: { title: "ሙያዊ ስልጠና", description: "በAI እና ሮቦቲክስ ክህሎት ያሳድጉ።", action: "ስልጠና ያግኙ" },
        gateBarrier: { title: "የጌት ባሪየር ቴክኖሎጂ", description: "ለደህንነት ራስ ገዝ የመዳረሻ ቁጥጥር።", action: "ማሳያ ይጠይቁ" },
        smartFactory: { title: "ስማርት ፋብሪካ ስርዓቶች", description: "በIoT የሚነቃቁ የማምረት መፍትሄዎች።", action: "ተጨማሪ ይወቁ" },
        blockchain: { title: "የብሎክቼይን መድረኮች", description: "ደህንነቱ የተጠበቀ የግብይት ስርዓቶች።", action: "ተጨማሪ ያግኙ" },
        trafficControl: { title: "የAI ትራፊክ ቁጥጥር", description: "የከተማ ትራፊክ ፍሰትን ያሳድጉ።", action: "እንዴት እንደሆነ ይወቁ" },
        quantum: { title: "የኳንተም ምርምር", description: "የሚቀጥለው ትውልድ የኮምፒውቲንግ መፍትሄዎች።", action: "ምርምር ይቀላቀሉ" },
        cybersecurity: { title: "የሳይበር ደህንነት ፈጠራዎች", description: "የላቀ የመረጃ ጥበቃ።", action: "መፍትሄዎችን ያስሱ" },
        partnerships: { title: "የዓለም አቀፍ ቴክኖሎጂ አጋርነቶች", description: "ለፈጠራ ይተባበሩ።", action: "ከእኛ ጋር አጋር ይሁኑ" }
      }
    },
    // Gallery Section
    gallery: {
      title: "በምስሎች የእኛ ጉዞ",
      subtitle: "ኢትሮኒክስን የሚገልጹ ጊዜያትን ያስሱ—ትምህርት የሚያነሳሳበት፣ ምርምር የሚፈጥርበት እና ማምረት የሚቀይርበት።",
      showMore: "ተጨማሪ አሳይ",
      showLess: "ያነሰ አሳይ",
      categories: {
        education: "ትምህርት",
        research: "ምርምር"
      },
      items: [
        {
          title: "ከአርሲ ዩኒቨርሲቲ ጋር የስምምነት ማስታወሻ",
          description: "ኢትሮኒክስ ከአርሲ ዩኒቨርሲቲ ጋር በፈጠራ ምርምር እና የትምህርት ፕሮግራሞች ላይ ለመተባበር የስምምነት ማስታወሻ ፈርሟል። ይህ አጋርነት በቴክኖሎጂ እና ትምህርት ውስጥ እድገቶችን ለማሳደግ፣ የአካዳሚክ እውቀትና የኢንዱስትሪ ፈጠራን አንድ በማድረግ ተፅዕኖ ፈጣሪ መፍትሄዎችን ለመፍጠር ያለመ ነው። በዚህ ትብብር አዲስ ስርዓተ ትምህርት ማዳበር፣ የጋራ የምርምር ፕሮጀክቶችን ማካሄድ እና ተማሪዎች እንደ ሮቦቲክስ እና AI ባሉ ዘመናዊ ቴክኖሎጂዎች ጋር በተግባር እንዲሳተፉ እድሎችን ለመስጠት ቁርጠኞች ነን።"
        },
        {
          title: "በAI ውስጥ ሮቦቲክስ፡ የሰውን አቅም እንደገና መገለጽ",
          description: "ዋና ሥራ አስፈፃሚያችን በAI ውስጥ ሮቦቲክስ የወደፊቱን እንዴት እንደሚቀርጽ እና የሰውን አቅም እንደገና እንደሚገልጽ በኮንፈረንሱ ላይ አዲስ ግንዛቤዎችን አቅርበዋል። አቀራረቡ የማሰብ ስርዓቶችን ወደ ዕለታዊ ሕይወት ውህደት አጉልቶ አሳይቷል፣ እነዚህ ቴክኖሎጂዎች በኢንዱስትሪዎች ውስጥ ምርታማነትን፣ ፈጠራን እና ችግር መፍታትን እንዴት ማሳደግ እንደሚችሉ ያሰሱ። ውይይቱ የሥነ ምግባር አንድምታዎችን እና እነዚህ እድገቶች ለህብረተሰቡ ጥቅም እንዲሆኑ አካታች ፈጠራ አስፈላጊነትን ይሸፍናል።"
        },
        {
          title: "ሰው ሰራሽ ግንዛቤ፡ የእይታና የግንዛቤ ስሜቶችን ማሰስ",
          description: "የቴክኖሎጂ ዋና ሥራ አስፈፃሚያችን በኮንፈረንሱ ላይ ስለ ሰው ሰራሽ ግንዛቤ፣ የእይታና የግንዛቤ ስሜቶችን በመዳሰስ ላይ ፈጠራ ምርምር አጋርተዋል። ይህ ምርምር ማሽኖች የሰውን የስሜት ችሎታዎች እንዴት እንደሚመስሉ ያሰሱ፣ በእይታ ማቀናበር እና በእውቀት ግንዛቤ ላይ በማተኮር። አቀራረቡ ዝርዝር የጉዳይ ጥናቶችን፣ ቴክኒካዊ ማሳያዎችን እና እንደ ራስ ገዝ ስርዓቶች፣ ጤና እንክብካቤ እና የከተማ እቅድ ባሉ መስኮች ውስጥ የወደፊት አፕሊኬሽኖችን ያካትታል፣ የኢትዮጵያን በዓለም አቀፍ የቴክኖሎጂ ፈጠራ ውስጥ እያደገ ያለውን ሚና ያሳያል።"
        },
        {
          title: "የወደፊቱን ፈጠራ ሰሪዎች ማብቃት፣ የበጋ ካምፕ",
          description: "ኢትሮኒክስ የወደፊቱን ፈጠራ ሰሪዎች በተግባራዊ ትምህርት እና ስልጠና ለማብቃት ቁርጠኛ ነው። በተማሪዎች ውስጥ ፈጠራን፣ ወሳኝ አስተሳሰብን እና የችግር መፍታት ክህሎቶችን በማሳደግ እናምናለን። ፕሮግራሞቻችን የሚቀጥለውን ትውልድ የቴክኖሎጂ መሪዎችን ለማነሳሳት የተነደፉ ናቸው፣ በፍጥነት በሚለዋወጥ ዓለም ውስጥ ለመበልጸግ የሚያስፈልጋቸውን እውቀትና መሳሪያዎች በማስታጠቅ። የፈጠራና የትብብር ባህልን በማሳደግ ለኢትዮጵያ እና ከዚያ በላይ ብሩህ ወደፊት ለመፍጠር እንጥራለን።"
        }
      ]
    },
    // Partnerships Section
    partnerships: {
      title: "የእኛ አጋርነቶች",
      subtitle: "ትብብር ስኬታችንን ያመጣል። ኢትሮኒክስ ተፅእኖአችንን ለማሳደግ እና የሚቀይር ቴክኖሎጂን ወደ ህይወት ለማምጣት ከአካዳሚክ ተቋማት፣ ከኢንዱስትሪ መሪዎች እና ከአካባቢ ፈጠራ ሰሪዎች ጋር ጠንካራ አጋርነቶችን እየፈጠረ ነው።",
      featured: "ተለይተው የቀረቡ አጋርነቶች",
      featuredSubtitle: "የቴክኖሎጂ ትምህርትን ወደፊት የሚቀርጹ አንዳንድ በጣም ተፅዕኖ ፈጣሪ ትብብሮቻችንን በማጉላት ላይ።",
      cta: {
        title: "ከእኛ ጋር አጋር ይሁኑ",
        description: "ፈጠራን ለማሳደግ፣ ትምህርትን ለማሳደግ እና በቴክኖሎጂ ውስጥ ትርጉም ያለው ተፅእኖ ለመፍጠር ከእኛ ጋር ይተባበሩ።",
        becomePartner: "አጋር ይሁኑ",
        learnMore: "ተጨማሪ ይወቁ"
      },
      types: [
        { title: "የአካዳሚክ ተቋማት", description: "የቴክኖሎጂ ትምህርትና ምርምርን ለማሳደግ ከዩኒቨርሲቲዎች ጋር በመተባበር ላይ።" },
        { title: "የኢንዱስትሪ መሪዎች", description: "አካዳሚክና ኢንዱስትሪን ለማገናኘት ከቴክኖሎጂ ኩባንያዎች ጋር በመተባበር ላይ።" },
        { title: "የምርምር ድርጅቶች", description: "በሮቦቲክስ እና AI ውስጥ በዘመናዊ ምርምር ላይ በመተባበር ላይ።" },
        { title: "የመንግስት ኤጀንሲዎች", description: "ብሄራዊ የቴክኖሎጂ ተነሳሽነቶችን ለማዳበር ከመንግስት ጋር በመስራት ላይ።" },
        { title: "ዓለም አቀፍ ድርጅቶች", description: "ተደራሽነታችንን እና ተፅእኖአችንን በዓለም ዙሪያ ለማስፋት የዓለም አቀፍ አጋርነቶች።" },
        { title: "የስታርት አፕ ስነ-ምህዳር", description: "ፈጠራ ሰሪ ስታርት አፖችና ሥራ ፈጣሪዎችን በመደገፍ እና በመተባበር ላይ።" }
      ],
      keyPartnerships: [
        {
          name: "የአርሲ ዩኒቨርሲቲ",
          description: "ለስርዓተ ትምህርት ልማት እና የምርምር ትብብር ስትራቴጂካዊ አጋርነት",
          type: "አካዳሚክ"
        },
        {
          name: "የኢትዮጵያ ትምህርት ሚኒስቴር",
          description: "በብሄራዊ STEM የትምህርት ተነሳሽነቶች ላይ ትብብር",
          type: "መንግስት"
        },
        {
          name: "ዓለም አቀፍ የቴክኖሎጂ አጋሮች",
          description: "ለእውቀት ልውውጥ የዓለም አቀፍ የቴክኖሎጂ አጋርነቶች",
          type: "ኢንዱስትሪ"
        }
      ]
    },
    // CTA Section
    cta: {
      title: "የሮቦቲክስ አብዮት ይቀላቀሉ",
      description: "ሮቦቶችን ለመገንባት እና የወደፊቱን ለመፍጠር ዝግጁ ነዎት? ከ4ኛ-12ኛ ክፍል ተማሪዎች ለሆኑ የበጋ ሮቦቲክስ እና ራስ ገዝ ስርዓቶች ስልጠና ይመዝገቡ። ወይም ከኢትሮኒክስ ዘመናዊ ፕሮግራሞች እና ምርምር ጋር ለመሳተፍ ሌሎች መንገዶችን ያስሱ።",
      buttons: {
        register: "ለበጋ ስልጠና ይመዝገቡ",
        explore: "እድሎችን ያስሱ"
      },
      features: [
        { title: "ፈጣን መንገድ", description: "ፈጣን ምዝገባ እና ወዲያውኑ ወደ ፕሮግራሞች መዳረሻ" },
        { title: "የባለሙያ መመሪያ", description: "ከኢንዱስትሪ ባለሙያዎች እና ተመራማሪዎች ይማሩ" },
        { title: "የተረጋገጡ ውጤቶች", description: "በዓለም ዙሪያ በሺዎች የሚቆጠሩ ስኬታማ ተመራቂዎችን ይቀላቀሉ" }
      ]
    }
  },
  om: {
    // Hero Section
    hero: {
      badge: "Walitti Qabama Haaraa",
      slide1: {
        line1: "Teeknooloojiin Itoophiyaa keessatti",
        line2: "barsiifamu, qoratamu, hojjetamuu fi guutuu",
        line3: "addunyaa irratti hojiirra oolu",
        description: "Dhaloota itti aanu kalaqtoota fi hoggantoota barnoota ammayyaa, qorannoo fi ogummaa oomishaan humneessuun."
      },
      slide2: {
        line1: "Gara Fuulduraatti",
        line2: "Barnoota Teeknooloojii",
        line3: "Afrikaa keessatti",
        description: "Barnoota kalaqaa fi muuxannoo harkaan hojjechuun bifa lafaa teeknooloojii boru bocuuf nuun waliin ta'aa."
      },
      slide3: {
        line1: "Hoggantoota Teeknooloojii",
        line2: "Boru",
        line3: "Har'a Ijaaraa Jirra",
        description: "Roobootikis, AI fi oomisha olaanaa keessatti carraa barnoota fi qorannoo sadarkaa addunyaa qabaadhaa."
      },
      buttons: {
        summerTraining: "Leenjii Gannaa Seenaa",
        explorePrograms: "Sagantaalee Qoradhaa",
        viewResearch: "Qorannoo Ilaalaa"
      },
      floatingPromo: {
        title: "Leenjii Injinariingii Roobootikii fi AI Seenaa!",
        description: "Barattoonni kutaa 4ffaa-12ffaa leenjii gannaa keenyaan roobootichoota ijaaraa fi gara fuulduraatti koodii barreessaa!",
        button: "Amma Galmaa'aa"
      }
    },
    // Features Section
    features: {
      title: "Qorannoo fi Kalaqaa",
      subtitle: "Ethronics keessatti daangaa teeknooloojii qorannoo fi misoomaan dhiibaa jirra. Xiyyeeffannoon keenya roobootikis, AI, nageenyaa saayibarii, shallaggii kuwaantam fi blockchain irratti kan xiyyeeffatedha—kalaqoota rakkoolee addunyaa dhugaa ogummaa Itoophiyaatiin furuu kan qophaa'an.",
      learnMore: "Dabalataan Beekaa",
      modalDescription: "Gareen keenya damee kana qormaata addunyaaf furmaata kalaqaa qophaa'een guddisuu fi kutannoo qaba.",
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
    // Solutions Section
    solutions: {
      title: "Furmaatawwan",
      titleSuffix: "Ijaaraa Jirru",
      subtitle: "Ethronics barnoota, oomisha fi teeknooloojii addunyaa irratti kalaqaa Itoophiyaa irratti hundaa'uun dhiibbaa addunyaatiif furmaata jijjiiramaa hoogganaa jira.",
      categories: {
        education: {
          title: "Barnoota",
          description: "Dargaggoota Itoophiyaa roobootikis, AI fi teeknooloojii keessatti dandeettii ammayyaan humneessuun addunyaa irratti akka hooggananiif."
        },
        research: {
          title: "Qorannoo fi Misoomaa",
          description: "Itoophiyaa irraa rakkoolee addunyaa furuuf teeknooloojiiwwan bal'achuu danda'an misomsuu."
        },
        manufacturing: {
          title: "Oomisha",
          description: "Gara fuuldura industirii Itoophiyaatiif furmaata sammuu qabuun, IoT'n kan geggeeffamuun oomisha jijjiiruun."
        }
      },
      items: {
        roboticsBootcamp: { title: "Bootcamp Roobootikis", description: "Dandeettii roobootikis harkaan hojjechuun gara ofumaan hojjechuutti seenaa.", action: "Amma Seenaa" },
        aiCurriculum: { title: "Karikiyulam AI", description: "Barnoota maashinii fi saayinsii deetaa baraadhaa.", action: "Koorsii Qoradhaa" },
        mentorship: { title: "Gorsa Barattootaa", description: "Ogeessota industirii irraa gorsa argadhaa.", action: "Gorsaaf Iyyaa" },
        scholarships: { title: "Iskoolaarshipii Teeknooloojii", description: "Barnoota teeknooloojiif deeggarsa maallaqaa.", action: "Amma Iyyaa" },
        tvet: { title: "Sagantaalee TVET", description: "Dandeettii hojii harkaa roobootikis fi AI keessatti.", action: "Dabalataan Beekaa" },
        undergrad: { title: "Sagantaalee Digirii Jalqabaa", description: "Bu'uura teeknooloojii fi kalaqaa keessatti.", action: "Sagantaalee Qoradhaa" },
        postgrad: { title: "Qorannoo Digirii Lammaffaa", description: "Ogummaa teeknooloojii keessan guddisaa.", action: "Amma Iyyaa" },
        training: { title: "Leenjii Ogummaa", description: "AI fi roobootikis keessatti dandeettii guddisaa.", action: "Leenjii Argadhaa" },
        gateBarrier: { title: "Teeknooloojii Barrier Karra", description: "To'annoo seensaa ofumaa nageenyaaf.", action: "Agarsiisa Gaafadhaa" },
        smartFactory: { title: "Sirnoota Faabrikaa Sammuu", description: "Furmaata oomishaa IoT'n kan hojjetu.", action: "Dabalataan Beekaa" },
        blockchain: { title: "Waltajjiiwwan Blockchain", description: "Sirnoota daldala nageenyaa qaban.", action: "Dabalataan Argadhaa" },
        trafficControl: { title: "To'annoo Tiraafikaa AI", description: "Dhangala'aa tiraafikaa magaalaa fooyyessaa.", action: "Akkamitti Akka Ta'e Beekaa" },
        quantum: { title: "Qorannoo Kuwaantam", description: "Furmaata shallaggii dhaloota itti aanu.", action: "Qorannoo Seenaa" },
        cybersecurity: { title: "Kalaqoota Nageenyaa Saayibarii", description: "Eegumsa deetaa olaanaa.", action: "Furmaata Qoradhaa" },
        partnerships: { title: "Michummaa Teeknooloojii Addunyaa", description: "Kalaqaaf waliin hojjedhaa.", action: "Nuun Waliin Michaa Ta'aa" }
      }
    },
    // Gallery Section
    gallery: {
      title: "Imala Keenya Suuraadhaan",
      subtitle: "Yeroolee Ethronics ibsan qoradhaa—barnoota kakaasu, qorannoo kalaquu fi oomisha jijjiiru bakka.",
      showMore: "Dabalataan Agarsiisaa",
      showLess: "Xiqqaa Agarsiisaa",
      categories: {
        education: "Barnoota",
        research: "Qorannoo"
      },
      items: [
        {
          title: "Waliigaltee Yunivarsiitii Arsii Waliin",
          description: "Ethronics sagantaalee qorannoo fi barnoota kalaqaa irratti walta'uuf Yunivarsiitii Arsii waliin waliigaltee hubannoo mallatteesseera. Michummaan kun teeknooloojii fi barnoota keessatti guddina guddisuu, ogummaa barnootaa fi kalaqaa industirii walitti fiduun furmaata dhiibbaa qabu uumuuf kan xiyyeeffatedha. Walta'iinsa kanaan karikiyulam haaraa misoomsuu, pirojektii qorannoo waliin hojjechuu fi barattoonni teeknooloojiiwwan ammayyaa akka roobootikis fi AI waliin hojii harkaan akka hirmaatan carraa kennuuf kutannoo qabna."
        },
        {
          title: "Roobootikis AI Keessatti: Dandeettii Namaa Irra Deebi'anii Ibsuu",
          description: "Hogganaan Hojii Keenya roobootikis AI keessatti akkamitti gara fuulduraatti bocuu fi dandeettii namaa irra deebi'anii ibsuu irratti hubannoo haaraa konfaransii irratti dhiheessan. Dhiheessiin kun sirnoota sammuu qaban jireenya guyyaa guyyaa keessatti walitti makamuu calaqqisiiseera, teeknooloojiiwwan kun industirii keessatti oomishtummaa, kalaqaa fi rakkoo furuu akkamitti guddisuu akka danda'an qorate. Marii kun dhiibbaa naamusa qabeessaa fi guddina kun hawaasa guutuuf faayidaa akka ta'uuf kalaqaa hammataa barbaachisummaa dabalata."
        },
        {
          title: "Hubannoo Namtolchee: Miira Mul'ataa fi Hubannoo Qorachuu",
          description: "Hogganaan Teeknooloojii Keenya konfaransii irratti hubannoo namtolchee irratti qorannoo kalaqaa, miira mul'ataa fi hubannoo qorachuun qoodatan. Qorannoon kun maashinoonni dandeettii miiraa namaa akkamitti fakkeessuu akka danda'an qorate, adeemsa mul'ataa fi hubannoo sammuu irratti xiyyeeffachuun. Dhiheessiin kun qorannoo haala adda addaa bal'inaan, agarsiisa teeknikaa fi hojiirra oolmaa gara fuulduraatti dameewwan akka sirnoota ofumaa hojjetan, kunuunsa fayyaa fi karoora magaalaa keessatti of keessaa qaba, gahee Itoophiyaa kalaqaa teeknooloojii addunyaa keessatti guddachaa jiru agarsiisa."
        },
        {
          title: "Kalaqtoota Gara Fuulduraatti Humneessuu, Kaampa Gannaa",
          description: "Ethronics kalaqtoota gara fuulduraatti barnoota fi leenjii hojii harkaan humneessuuf kutannoo qabdi. Barattoonni keessatti kalaqaa, yaada murteessaa fi dandeettii rakkoo furuu guddisuu amanna. Sagantaaleen keenya dhaloota itti aanu hoggantoota teeknooloojii kakaasuu fi addunyaa saffisaan jijjiiramaa jiru keessatti milkaa'uuf beekumsaa fi meeshaalee barbaachisan isaaniif kennuuf qophaa'an. Aadaa kalaqaa fi walta'iinsaa guddisuu fi Itoophiyaa fi isa ol gara ifa ta'eef uumuuf carraaqna."
        }
      ]
    },
    // Partnerships Section
    partnerships: {
      title: "Michoonni Keenya",
      subtitle: "Walta'iinsi milkaa'ina keenya oofti. Ethronics dhiibbaa keenya guddisuu fi teeknooloojii jijjiiramaa gara jireenyaatti fiduuf dhaabbilee barnootaa, hoggantoota industirii fi kalaqtoota naannoo waliin michummaa cimaa uumaa jira.",
      featured: "Michummaa Adda Ta'e",
      featuredSubtitle: "Walta'iinsa dhiibbaa guddaa qaban kanneen gara fuuldura barnoota teeknooloojii bocuuf gargaaran muraasa calaqqisiisuu.",
      cta: {
        title: "Nuun Waliin Michaa Ta'aa",
        description: "Kalaqaa guddisuu, barnoota fooyyessuu fi teeknooloojii keessatti dhiibbaa hiika qabu uumuuf nuun waliin hojjedhaa.",
        becomePartner: "Michaa Ta'aa",
        learnMore: "Dabalataan Beekaa"
      },
      types: [
        { title: "Dhaabbilee Barnootaa", description: "Barnoota teeknooloojii fi qorannoo fooyyessuuf yunivarsiitii waliin hojjechuu." },
        { title: "Hoggantoota Industirii", description: "Barnoota fi industirii walitti hiduuf dhaabbilee teeknooloojii waliin hojjechuu." },
        { title: "Dhaabbilee Qorannoo", description: "Qorannoo ammayyaa roobootikis fi AI keessatti waliin hojjechuu." },
        { title: "Eejensii Mootummaa", description: "Karoora teeknooloojii biyyaalessaa misoomsuuf mootummaa waliin hojjechuu." },
        { title: "Dhaabbilee Idil-addunyaa", description: "Dhiyeessii fi dhiibbaa keenya addunyaa guutuutti bal'isuuf michummaa addunyaa." },
        { title: "Sirna Istaartapii", description: "Istaartapiiwwan kalaqaa fi abbaa qabeenyaa deeggaruu fi waliin hojjechuu." }
      ],
      keyPartnerships: [
        {
          name: "Yunivarsiitii Arsii",
          description: "Michummaa tarsiimoo misoomsa karikiyulam fi walta'iinsa qorannoof",
          type: "Barnoota"
        },
        {
          name: "Ministiraa Barnoota Itoophiyaa",
          description: "Karoora barnoota STEM biyyaalessaa irratti walta'iinsa",
          type: "Mootummaa"
        },
        {
          name: "Michoonni Teeknooloojii Idil-addunyaa",
          description: "Michummaa teeknooloojii addunyaa waljijjiirraa beekumsaaf",
          type: "Industirii"
        }
      ]
    },
    // CTA Section
    cta: {
      title: "Warraaqsa Roobooticis Seenaa",
      description: "Roobootichoota ijaaruuf fi gara fuulduraatti koodii barreessuuf qophii dha? Barattoonni kutaa 4ffaa-12ffaa leenjii gannaa Roobooticis fi Sirnoota Ofumaa Hojjetan keenyaaf galmaa'aa. Yookaan sagantaalee fi qorannoo ammayyaa Ethronics waliin hirmaachuuf karaalee biroo qoradhaa.",
      buttons: {
        register: "Leenjii Gannaa Galmaa'aa",
        explore: "Carraalee Qoradhaa"
      },
      features: [
        { title: "Karaa Saffisaa", description: "Galmee saffisaa fi sagantaalee seensaa battalumatti" },
        { title: "Qajeelfama Ogeessaa", description: "Ogeessota industirii fi qorattoota irraa baraadhaa" },
        { title: "Bu'aa Mirkaneeffame", description: "Kumaatama barattoonni milkaa'oo addunyaa guutuutti waliin ta'aa" }
      ]
    }
  }
};
