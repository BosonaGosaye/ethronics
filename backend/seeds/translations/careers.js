export const careersTranslations = {
  en: {
    // Hero Section
    hero: {
      title: "Build Your Career",
      description: "Join innovative companies and shape the future of technology. Discover opportunities at Ethronics and our partner organizations worldwide.",
      stats: {
        positions: { value: "500+", label: "Open Positions" },
        companies: { value: "150+", label: "Partner Companies" },
        countries: { value: "25+", label: "Countries" },
        successRate: { value: "95%", label: "Success Rate" }
      },
      buttons: {
        browse: "Browse Jobs",
        post: "Post a Job"
      }
    },

    // Job Search Section
    search: {
      labels: {
        title: "Job Title or Keywords",
        location: "Location",
        type: "Job Type",
        company: "Company"
      },
      placeholders: {
        search: "e.g. Software Engineer, Data Scientist..."
      },
      button: "Search Jobs",
      popularSearches: "Popular searches:",
      quickFilters: [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "DevOps",
        "UI/UX Designer",
        "Remote Jobs"
      ],
      locations: [
        { value: "all", label: "All Locations" },
        { value: "addis-ababa", label: "Addis Ababa, Ethiopia" },
        { value: "adama", label: "Adama, Ethiopia" },
        { value: "remote", label: "Remote" },
        { value: "hybrid", label: "Hybrid" },
        { value: "usa", label: "United States" },
        { value: "europe", label: "Europe" },
        { value: "asia", label: "Asia" }
      ],
      jobTypes: [
        { value: "all", label: "All Types" },
        { value: "full-time", label: "Full-time" },
        { value: "part-time", label: "Part-time" },
        { value: "contract", label: "Contract" },
        { value: "internship", label: "Internship" },
        { value: "freelance", label: "Freelance" }
      ],
      companies: [
        { value: "all", label: "All Companies" },
        { value: "ethronics", label: "Ethronics" },
        { value: "tech-partners", label: "Tech Partners" },
        { value: "startups", label: "Startups" },
        { value: "enterprises", label: "Enterprises" },
        { value: "government", label: "Government" },
        { value: "ngos", label: "NGOs" }
      ]
    },

    // Job Categories Section
    categories: {
      title: "Browse by Category",
      description: "Find opportunities across diverse industries and specializations",
      items: [
        { id: "all", name: "All Categories", count: "500+" },
        { id: "engineering", name: "Software Engineering", count: "120" },
        { id: "data", name: "Data & Analytics", count: "85" },
        { id: "design", name: "Design & UX", count: "45" },
        { id: "product", name: "Product Management", count: "35" },
        { id: "security", name: "Cybersecurity", count: "40" },
        { id: "ai", name: "AI & Machine Learning", count: "55" },
        { id: "marketing", name: "Marketing & Sales", count: "30" },
        { id: "operations", name: "Operations & DevOps", count: "25" },
        { id: "education", name: "Education & Training", count: "20" },
        { id: "healthcare", name: "Healthcare & Research", count: "15" },
        { id: "international", name: "International Relations", count: "25" }
      ],
      openPositions: "open positions"
    },

    // Job Listings Section
    listings: {
      title: "Job Opportunities",
      found: "Found",
      jobsMatching: "jobs matching your criteria",
      sortBy: {
        label: "Sort by:",
        newest: "Newest",
        salary: "Salary",
        company: "Company",
        deadline: "Deadline"
      },
      featured: "Featured",
      applicants: "applicants",
      deadline: "Deadline:",
      applyNow: "Apply Now",
      loadMore: "Load More Jobs",
      noResults: {
        title: "No jobs found",
        description: "Try adjusting your search criteria or browse different categories"
      },
      jobs: [
        {
          id: 1,
          title: "Senior Software Engineer",
          company: "Ethronics",
          location: "Addis Ababa, Ethiopia",
          type: "Full-time",
          category: "engineering",
          salary: "$60,000 - $80,000",
          postedDate: "2024-03-15",
          deadline: "2024-04-15",
          description: "Join our engineering team to build cutting-edge technology solutions for African markets.",
          requirements: ["5+ years experience", "React/Node.js", "Cloud platforms", "Team leadership"],
          benefits: ["Health insurance", "Remote work", "Professional development", "Stock options"],
          featured: true,
          applicants: 45,
          rating: 4.8,
          tags: ["React", "Node.js", "AWS", "Leadership"]
        },
        {
          id: 2,
          title: "Data Scientist",
          company: "TechCorp Africa",
          location: "Remote",
          type: "Full-time",
          category: "data",
          salary: "$70,000 - $90,000",
          postedDate: "2024-03-14",
          deadline: "2024-04-20",
          description: "Analyze complex datasets to drive business insights and machine learning solutions.",
          requirements: ["PhD in Data Science", "Python/R", "Machine Learning", "Statistics"],
          benefits: ["Flexible hours", "Learning budget", "Conference attendance", "Remote first"],
          featured: false,
          applicants: 32,
          rating: 4.6,
          tags: ["Python", "ML", "Statistics", "Remote"]
        },
        {
          id: 3,
          title: "UX/UI Designer",
          company: "Design Studio ET",
          location: "Adama, Ethiopia",
          type: "Contract",
          category: "design",
          salary: "$40,000 - $55,000",
          postedDate: "2024-03-13",
          deadline: "2024-04-10",
          description: "Create beautiful and intuitive user experiences for mobile and web applications.",
          requirements: ["3+ years UX/UI", "Figma/Sketch", "User research", "Prototyping"],
          benefits: ["Creative freedom", "Modern tools", "Collaborative team", "Portfolio projects"],
          featured: true,
          applicants: 28,
          rating: 4.7,
          tags: ["Figma", "UX Research", "Mobile", "Web"]
        },
        {
          id: 4,
          title: "DevOps Engineer",
          company: "CloudTech Solutions",
          location: "Hybrid",
          type: "Full-time",
          category: "operations",
          salary: "$65,000 - $85,000",
          postedDate: "2024-03-12",
          deadline: "2024-04-25",
          description: "Build and maintain scalable infrastructure and deployment pipelines.",
          requirements: ["Docker/Kubernetes", "CI/CD", "AWS/Azure", "Infrastructure as Code"],
          benefits: ["Cutting-edge tech", "Training budget", "Flexible schedule", "Team events"],
          featured: false,
          applicants: 19,
          rating: 4.5,
          tags: ["Docker", "Kubernetes", "AWS", "CI/CD"]
        },
        {
          id: 5,
          title: "AI Research Scientist",
          company: "Ethronics Research Lab",
          location: "Addis Ababa, Ethiopia",
          type: "Full-time",
          category: "ai",
          salary: "$80,000 - $120,000",
          postedDate: "2024-03-11",
          deadline: "2024-05-01",
          description: "Conduct cutting-edge research in artificial intelligence and machine learning.",
          requirements: ["PhD in AI/ML", "Research publications", "Deep learning", "NLP/Computer Vision"],
          benefits: ["Research freedom", "Publication support", "Conference travel", "Collaboration"],
          featured: true,
          applicants: 15,
          rating: 4.9,
          tags: ["AI", "Research", "Deep Learning", "NLP"]
        },
        {
          id: 6,
          title: "Product Manager",
          company: "StartupHub Ethiopia",
          location: "Remote",
          type: "Full-time",
          category: "product",
          salary: "$55,000 - $75,000",
          postedDate: "2024-03-10",
          deadline: "2024-04-18",
          description: "Lead product strategy and development for innovative fintech solutions.",
          requirements: ["5+ years PM experience", "Agile/Scrum", "Analytics", "Stakeholder management"],
          benefits: ["Equity package", "Remote work", "Product ownership", "Growth opportunities"],
          featured: false,
          applicants: 38,
          rating: 4.4,
          tags: ["Product Strategy", "Agile", "Fintech", "Analytics"]
        }
      ]
    },

    // Company Benefits Section
    benefits: {
      title: "Why Work With Us?",
      description: "We believe in taking care of our team members with comprehensive benefits and a supportive work environment that helps you thrive both personally and professionally.",
      items: [
        {
          title: "Health & Wellness",
          description: "Comprehensive health insurance, dental, vision, and mental health support",
          features: ["Medical insurance", "Dental & vision", "Mental health", "Wellness programs"]
        },
        {
          title: "Learning & Development",
          description: "Continuous learning opportunities with courses, conferences, and certifications",
          features: ["Training budget", "Conference attendance", "Online courses", "Skill development"]
        },
        {
          title: "Work-Life Balance",
          description: "Flexible working arrangements to help you maintain a healthy work-life balance",
          features: ["Remote work", "Flexible hours", "Hybrid options", "Time off policy"]
        },
        {
          title: "Travel & Relocation",
          description: "Support for business travel and relocation assistance for international roles",
          features: ["Travel allowance", "Relocation support", "Visa assistance", "Housing help"]
        },
        {
          title: "Financial Security",
          description: "Competitive compensation packages with retirement planning and stock options",
          features: ["Competitive salary", "Stock options", "Retirement plan", "Performance bonus"]
        },
        {
          title: "Office Perks",
          description: "Modern office spaces with free meals, snacks, and recreational facilities",
          features: ["Free meals", "Game rooms", "Modern workspace", "Team events"]
        },
        {
          title: "Equipment & Tools",
          description: "Latest technology and tools to help you do your best work",
          features: ["Latest hardware", "Software licenses", "Home office setup", "Tech allowance"]
        },
        {
          title: "Team & Culture",
          description: "Collaborative environment with diverse teams and inclusive culture",
          features: ["Diverse teams", "Inclusive culture", "Team building", "Open communication"]
        },
        {
          title: "Flexible Schedule",
          description: "Work when you're most productive with flexible scheduling options",
          features: ["Flexible hours", "Core hours", "Time zones", "Personal time"]
        },
        {
          title: "Recognition & Growth",
          description: "Regular recognition programs and clear career advancement paths",
          features: ["Performance reviews", "Career paths", "Recognition programs", "Promotions"]
        }
      ],
      cta: {
        title: "Ready to Join Our Team?",
        description: "Discover opportunities that match your skills and interests. Start your journey with companies that value your growth and well-being.",
        buttons: {
          browse: "Browse All Jobs",
          alert: "Create Job Alert"
        }
      }
    },

    // Career Growth Section
    growth: {
      title: "Your Career Growth Path",
      description: "We're committed to your professional development with clear career paths, continuous learning opportunities, and support at every stage of your journey.",
      progression: {
        title: "Career Progression",
        levels: [
          {
            level: "Entry Level",
            title: "Start Your Journey",
            description: "Begin your career with mentorship and structured learning programs",
            duration: "0-2 years",
            opportunities: ["Internships", "Graduate programs", "Mentorship", "Basic training"]
          },
          {
            level: "Mid Level",
            title: "Develop Expertise",
            description: "Build specialized skills and take on more responsibilities",
            duration: "2-5 years",
            opportunities: ["Skill specialization", "Project leadership", "Cross-team collaboration", "Advanced training"]
          },
          {
            level: "Senior Level",
            title: "Lead & Innovate",
            description: "Lead teams, drive innovation, and shape company direction",
            duration: "5+ years",
            opportunities: ["Team leadership", "Strategic planning", "Innovation projects", "Executive training"]
          }
        ],
        opportunitiesLabel: "Opportunities:"
      },
      skills: {
        title: "Skills Development Programs",
        items: [
          {
            title: "Technical Skills",
            description: "Stay current with latest technologies and industry best practices",
            programs: ["Technical workshops", "Certification programs", "Hands-on projects", "Expert mentoring"]
          },
          {
            title: "Leadership Skills",
            description: "Develop leadership capabilities to guide teams and drive results",
            programs: ["Leadership training", "Management courses", "Executive coaching", "Team building"]
          },
          {
            title: "Innovation Skills",
            description: "Foster creativity and innovation to solve complex challenges",
            programs: ["Innovation workshops", "Design thinking", "Hackathons", "Research projects"]
          },
          {
            title: "Business Skills",
            description: "Understand business strategy and develop commercial acumen",
            programs: ["Business courses", "Strategy sessions", "Market analysis", "Financial literacy"]
          }
        ]
      },
      successStories: {
        title: "Success Stories",
        stories: [
          {
            name: "Sarah Johnson",
            path: "Intern → Senior Engineer",
            quote: "Started as an intern and grew into a senior role through mentorship and continuous learning opportunities."
          },
          {
            name: "Michael Chen",
            path: "Developer → Team Lead",
            quote: "The leadership development program helped me transition from individual contributor to team leader."
          },
          {
            name: "Emily Rodriguez",
            path: "Analyst → Product Manager",
            quote: "Cross-functional projects and business training enabled my transition into product management."
          }
        ]
      }
    },

    // Application Process Section
    process: {
      title: "Application Process",
      description: "Our streamlined application process is designed to be transparent and efficient, helping you understand what to expect at each stage of your journey with us.",
      steps: [
        {
          title: "Find Your Role",
          description: "Browse our job listings and find positions that match your skills and interests",
          details: ["Use advanced filters", "Save interesting jobs", "Set up job alerts", "Research companies"],
          duration: "5-10 minutes"
        },
        {
          title: "Submit Application",
          description: "Complete your application with resume, cover letter, and required documents",
          details: ["Upload your resume", "Write cover letter", "Complete application form", "Submit portfolio if required"],
          duration: "15-30 minutes"
        },
        {
          title: "Initial Review",
          description: "Our recruitment team reviews your application and qualifications",
          details: ["Application screening", "Qualification check", "Initial assessment", "Shortlist creation"],
          duration: "3-5 business days"
        },
        {
          title: "Interview Process",
          description: "Participate in interviews with hiring managers and team members",
          details: ["Phone/video screening", "Technical assessment", "Team interviews", "Final interview"],
          duration: "1-2 weeks"
        },
        {
          title: "Final Decision",
          description: "Receive feedback and job offer if selected for the position",
          details: ["Reference checks", "Final evaluation", "Offer preparation", "Negotiation if needed"],
          duration: "3-5 business days"
        },
        {
          title: "Onboarding",
          description: "Welcome to the team! Complete onboarding and start your new role",
          details: ["Contract signing", "Orientation program", "Team introductions", "Initial training"],
          duration: "1-2 weeks"
        }
      ],
      tips: {
        title: "Application Tips for Success",
        items: [
          {
            title: "Optimize Your Resume",
            tips: [
              "Tailor your resume to the specific job requirements",
              "Highlight relevant skills and achievements",
              "Use action verbs and quantify results",
              "Keep it concise and well-formatted"
            ]
          },
          {
            title: "Prepare for Interviews",
            tips: [
              "Research the company and role thoroughly",
              "Practice common interview questions",
              "Prepare specific examples of your work",
              "Ask thoughtful questions about the role"
            ]
          },
          {
            title: "Showcase Your Skills",
            tips: [
              "Create a portfolio of your best work",
              "Demonstrate problem-solving abilities",
              "Show passion for the industry",
              "Highlight continuous learning efforts"
            ]
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        questions: [
          {
            question: "How long does the application process take?",
            answer: "The entire process typically takes 2-4 weeks from application submission to final decision, depending on the role and number of interview rounds."
          },
          {
            question: "Can I apply for multiple positions?",
            answer: "Yes, you can apply for multiple positions that match your skills and interests. We recommend tailoring each application to the specific role."
          },
          {
            question: "What should I expect in the interview?",
            answer: "Interviews typically include behavioral questions, technical assessments (for technical roles), and discussions about your experience and career goals."
          },
          {
            question: "Do you provide feedback on applications?",
            answer: "We provide feedback to candidates who reach the interview stage. Due to high application volumes, we may not provide individual feedback for all applications."
          }
        ]
      },
      support: {
        title: "Need Help with Your Application?",
        description: "Our recruitment team is here to help you through the application process.",
        buttons: {
          contact: "Contact Recruitment Team",
          support: "Application Support"
        }
      }
    },

    // Company Partners Section
    partners: {
      title: "Our Partner Companies",
      description: "We partner with leading organizations across Ethiopia and internationally to bring you the best career opportunities in technology, finance, development, and more.",
      categories: [
        {
          title: "Technology Companies",
          description: "Leading tech companies offering innovative roles",
          count: "50+"
        },
        {
          title: "Startups & Scale-ups",
          description: "Fast-growing companies with exciting opportunities",
          count: "75+"
        },
        {
          title: "Financial Services",
          description: "Banks and fintech companies driving digital transformation",
          count: "30+"
        },
        {
          title: "International Organizations",
          description: "Global organizations with local and remote opportunities",
          count: "25+"
        }
      ],
      benefits: {
        title: "Why Partner Companies Choose Us",
        items: [
          {
            title: "Diverse Opportunities",
            description: "Access to roles across multiple industries and company sizes"
          },
          {
            title: "Global Reach",
            description: "Connect with local Ethiopian companies and international organizations"
          },
          {
            title: "Trusted Partners",
            description: "All partner companies are vetted for quality and workplace standards"
          },
          {
            title: "Career Growth",
            description: "Partners committed to employee development and career advancement"
          }
        ]
      },
      successStories: {
        title: "Success Stories",
        testimonials: [
          {
            name: "Sarah Alemayehu",
            role: "Software Engineer",
            company: "TechStart ET",
            quote: "Found my dream job through the platform. The application process was smooth and the company culture is amazing."
          },
          {
            name: "Michael Tadesse",
            role: "Data Analyst",
            company: "Commercial Bank of Ethiopia",
            quote: "Great platform for finding opportunities in the financial sector. Landed a role that perfectly matches my skills."
          },
          {
            name: "Hanan Mohammed",
            role: "Project Manager",
            company: "UN Ethiopia",
            quote: "The international opportunities available here are incredible. Now working on projects that make a real impact."
          }
        ]
      },
      cta: {
        title: "Want to Partner with Us?",
        description: "Join our network of partner companies and connect with top talent. Post your job openings and find the perfect candidates for your team.",
        buttons: {
          partner: "Become a Partner",
          post: "Post a Job"
        }
      },
      trusted: "Trusted by Leading Organizations"
    }
  },

  am: {
    // Hero Section
    hero: {
      title: "የስራ ዕድልዎን ይገንቡ",
      description: "ፈጠራ ያላቸውን ኩባንያዎች ይቀላቀሉ እና የቴክኖሎጂ ወደፊትን ይቀርፁ። በኢትሮኒክስ እና በአለም አቀፍ የአጋር ድርጅቶቻችን ውስጥ እድሎችን ያግኙ።",
      stats: {
        positions: { value: "500+", label: "ክፍት የስራ ቦታዎች" },
        companies: { value: "150+", label: "የአጋር ኩባንያዎች" },
        countries: { value: "25+", label: "አገሮች" },
        successRate: { value: "95%", label: "የስኬት መጠን" }
      },
      buttons: {
        browse: "ስራዎችን ያስሱ",
        post: "ስራ ያስተዋውቁ"
      }
    },

    // Job Search Section
    search: {
      labels: {
        title: "የስራ ርዕስ ወይም ቁልፍ ቃላት",
        location: "አካባቢ",
        type: "የስራ አይነት",
        company: "ኩባንያ"
      },
      placeholders: {
        search: "ለምሳሌ ሶፍትዌር ኢንጂነር፣ የመረጃ ሳይንቲስት..."
      },
      button: "ስራዎችን ፈልግ",
      popularSearches: "ታዋቂ ፍለጋዎች:",
      quickFilters: [
        "ሶፍትዌር ኢንጂነር",
        "የመረጃ ሳይንቲስት",
        "የምርት አስተዳዳሪ",
        "DevOps",
        "UI/UX ዲዛይነር",
        "የርቀት ስራዎች"
      ],
      locations: [
        { value: "all", label: "ሁሉም አካባቢዎች" },
        { value: "addis-ababa", label: "አዲስ አበባ፣ ኢትዮጵያ" },
        { value: "adama", label: "አዳማ፣ ኢትዮጵያ" },
        { value: "remote", label: "የርቀት" },
        { value: "hybrid", label: "ድብልቅ" },
        { value: "usa", label: "አሜሪካ" },
        { value: "europe", label: "አውሮፓ" },
        { value: "asia", label: "እስያ" }
      ],
      jobTypes: [
        { value: "all", label: "ሁሉም አይነቶች" },
        { value: "full-time", label: "ሙሉ ጊዜ" },
        { value: "part-time", label: "ከፊል ጊዜ" },
        { value: "contract", label: "ውል" },
        { value: "internship", label: "ተለማማጅነት" },
        { value: "freelance", label: "ነፃ ስራ" }
      ],
      companies: [
        { value: "all", label: "ሁሉም ኩባንያዎች" },
        { value: "ethronics", label: "ኢትሮኒክስ" },
        { value: "tech-partners", label: "የቴክኖሎጂ አጋሮች" },
        { value: "startups", label: "አዳዲስ ኩባንያዎች" },
        { value: "enterprises", label: "ትላልቅ ድርጅቶች" },
        { value: "government", label: "መንግስት" },
        { value: "ngos", label: "መንግስታዊ ያልሆኑ ድርጅቶች" }
      ]
    },

    categories: {
      title: "በምድብ ያስሱ",
      description: "በተለያዩ ኢንዱስትሪዎች እና ስፔሻላይዜሽኖች ውስጥ እድሎችን ያግኙ",
      items: [
        { id: "all", name: "ሁሉም ምድቦች", count: "500+" },
        { id: "engineering", name: "ሶፍትዌር ምህንድስና", count: "120" },
        { id: "data", name: "መረጃ እና ትንተና", count: "85" },
        { id: "design", name: "ዲዛይን እና UX", count: "45" },
        { id: "product", name: "የምርት አስተዳደር", count: "35" },
        { id: "security", name: "የሳይበር ደህንነት", count: "40" },
        { id: "ai", name: "AI እና ማሽን ለርኒንግ", count: "55" },
        { id: "marketing", name: "ግብይት እና ሽያጭ", count: "30" },
        { id: "operations", name: "ኦፕሬሽንስ እና DevOps", count: "25" },
        { id: "education", name: "ትምህርት እና ስልጠና", count: "20" },
        { id: "healthcare", name: "ጤና እና ምርምር", count: "15" },
        { id: "international", name: "ዓለም አቀፍ ግንኙነቶች", count: "25" }
      ],
      openPositions: "ክፍት የስራ ቦታዎች"
    },

    listings: {
      title: "የስራ እድሎች",
      found: "ተገኝተዋል",
      jobsMatching: "ከመስፈርትዎ ጋር የሚዛመዱ ስራዎች",
      sortBy: {
        label: "ደርድር በ:",
        newest: "አዲስ",
        salary: "ደመወዝ",
        company: "ኩባንያ",
        deadline: "የመጨረሻ ቀን"
      },
      featured: "ተለይቶ የቀረበ",
      applicants: "አመልካቾች",
      deadline: "የመጨረሻ ቀን:",
      applyNow: "አሁን ያመልክቱ",
      loadMore: "ተጨማሪ ስራዎችን ጫን",
      noResults: {
        title: "ምንም ስራዎች አልተገኙም",
        description: "የፍለጋ መስፈርቶችዎን ማስተካከል ወይም የተለያዩ ምድቦችን ማሰስ ይሞክሩ"
      },
      jobs: [
        {
          id: 1,
          title: "ከፍተኛ የሶፍትዌር ኢንጂነር",
          company: "ኢትሮኒክስ",
          location: "አዲስ አበባ፣ ኢትዮጵያ",
          type: "ሙሉ ጊዜ",
          category: "engineering",
          salary: "$60,000 - $80,000",
          postedDate: "2024-03-15",
          deadline: "2024-04-15",
          description: "ለአፍሪካ ገበያዎች ዘመናዊ የቴክኖሎጂ መፍትሄዎችን ለመገንባት የእኛን የምህንድስና ቡድን ይቀላቀሉ።",
          requirements: ["5+ ዓመታት ልምድ", "React/Node.js", "የክላውድ መድረኮች", "የቡድን አመራር"],
          benefits: ["የጤና መድን", "የርቀት ስራ", "ሙያዊ እድገት", "የአክሲዮን አማራጮች"],
          featured: true,
          applicants: 45,
          rating: 4.8,
          tags: ["React", "Node.js", "AWS", "አመራር"]
        },
        {
          id: 2,
          title: "የመረጃ ሳይንቲስት",
          company: "TechCorp Africa",
          location: "ርቀት",
          type: "ሙሉ ጊዜ",
          category: "data",
          salary: "$70,000 - $90,000",
          postedDate: "2024-03-14",
          deadline: "2024-04-20",
          description: "የንግድ ግንዛቤዎችን እና የማሽን መማሪያ መፍትሄዎችን ለማንዳት ውስብስብ የመረጃ ስብስቦችን ይተንትኑ።",
          requirements: ["በመረጃ ሳይንስ ውስጥ PhD", "Python/R", "የማሽን መማር", "ስታቲስቲክስ"],
          benefits: ["ተለዋዋጭ ሰዓቶች", "የመማሪያ በጀት", "የኮንፈረንስ ተሳትፎ", "የርቀት መጀመሪያ"],
          featured: false,
          applicants: 32,
          rating: 4.6,
          tags: ["Python", "ML", "ስታቲስቲክስ", "ርቀት"]
        },
        {
          id: 3,
          title: "UX/UI ዲዛይነር",
          company: "Design Studio ET",
          location: "አዳማ፣ ኢትዮጵያ",
          type: "ውል",
          category: "design",
          salary: "$40,000 - $55,000",
          postedDate: "2024-03-13",
          deadline: "2024-04-10",
          description: "ለሞባይል እና ለድር መተግበሪያዎች ቆንጆ እና ግልጽ የተጠቃሚ ልምዶችን ይፍጠሩ።",
          requirements: ["3+ ዓመታት UX/UI", "Figma/Sketch", "የተጠቃሚ ምርምር", "ፕሮቶታይፒንግ"],
          benefits: ["የፈጠራ ነፃነት", "ዘመናዊ መሳሪያዎች", "የትብብር ቡድን", "የፖርትፎሊዮ ፕሮጀክቶች"],
          featured: true,
          applicants: 28,
          rating: 4.7,
          tags: ["Figma", "UX ምርምር", "ሞባይል", "ድር"]
        },
        {
          id: 4,
          title: "DevOps ኢንጂነር",
          company: "CloudTech Solutions",
          location: "ድብልቅ",
          type: "ሙሉ ጊዜ",
          category: "operations",
          salary: "$65,000 - $85,000",
          postedDate: "2024-03-12",
          deadline: "2024-04-25",
          description: "ሊመዘን የሚችል መሠረተ ልማት እና የማሰማራት ቧንቧዎችን ይገንቡ እና ያቆዩ።",
          requirements: ["Docker/Kubernetes", "CI/CD", "AWS/Azure", "መሠረተ ልማት እንደ ኮድ"],
          benefits: ["ዘመናዊ ቴክኖሎጂ", "የስልጠና በጀት", "ተለዋዋጭ መርሃ ግብር", "የቡድን ዝግጅቶች"],
          featured: false,
          applicants: 19,
          rating: 4.5,
          tags: ["Docker", "Kubernetes", "AWS", "CI/CD"]
        },
        {
          id: 5,
          title: "AI የምርምር ሳይንቲስት",
          company: "Ethronics Research Lab",
          location: "አዲስ አበባ፣ ኢትዮጵያ",
          type: "ሙሉ ጊዜ",
          category: "ai",
          salary: "$80,000 - $120,000",
          postedDate: "2024-03-11",
          deadline: "2024-05-01",
          description: "በአርቴፊሻል ኢንተለጀንስ እና በማሽን መማር ውስጥ ዘመናዊ ምርምር ያካሂዱ።",
          requirements: ["በ AI/ML ውስጥ PhD", "የምርምር ህትመቶች", "ጥልቅ መማር", "NLP/ኮምፒውተር እይታ"],
          benefits: ["የምርምር ነፃነት", "የህትመት ድጋፍ", "የኮንፈረንስ ጉዞ", "ትብብር"],
          featured: true,
          applicants: 15,
          rating: 4.9,
          tags: ["AI", "ምርምር", "ጥልቅ መማር", "NLP"]
        },
        {
          id: 6,
          title: "የምርት አስተዳዳሪ",
          company: "StartupHub Ethiopia",
          location: "ርቀት",
          type: "ሙሉ ጊዜ",
          category: "product",
          salary: "$55,000 - $75,000",
          postedDate: "2024-03-10",
          deadline: "2024-04-18",
          description: "ለፈጠራ ፊንቴክ መፍትሄዎች የምርት ስትራቴጂ እና ልማትን መሪነት።",
          requirements: ["5+ ዓመታት PM ልምድ", "Agile/Scrum", "ትንታኔዎች", "የባለድርሻ አስተዳደር"],
          benefits: ["የፍትሃዊነት ፓኬጅ", "የርቀት ስራ", "የምርት ባለቤትነት", "የእድገት እድሎች"],
          featured: false,
          applicants: 38,
          rating: 4.4,
          tags: ["የምርት ስትራቴጂ", "Agile", "ፊንቴክ", "ትንታኔዎች"]
        }
      ]
    },

    benefits: {
      title: "ለምን ከእኛ ጋር መስራት?",
      description: "የቡድን አባላቶቻችንን በአጠቃላይ ጥቅማጥቅሞች እና በግል እና በሙያዊ ደረጃ እንዲበለጽጉ በሚያግዝ ድጋፍ ሰጪ የስራ አካባቢ እንንከባከባለን።",
      items: [
        { title: "ጤና እና ደህንነት", description: "አጠቃላይ የጤና መድን፣ የጥርስ፣ የዓይን እና የአእምሮ ጤና ድጋፍ", features: ["የህክምና መድን", "የጥርስ እና የዓይን", "የአእምሮ ጤና", "የደህንነት ፕሮግራሞች"] },
        { title: "ትምህርት እና እድገት", description: "ከኮርሶች፣ ኮንፈረንሶች እና የምስክር ወረቀቶች ጋር ቀጣይነት ያለው የመማሪያ እድሎች", features: ["የስልጠና በጀት", "የኮንፈረንስ ተሳትፎ", "የመስመር ላይ ኮርሶች", "የክህሎት ማሻሻያ"] },
        { title: "የስራ-ህይወት ሚዛን", description: "ጤናማ የስራ-ህይወት ሚዛን እንዲጠብቁ ለመርዳት ተለዋዋጭ የስራ ዝግጅቶች", features: ["የርቀት ስራ", "ተለዋዋጭ ሰዓቶች", "ድብልቅ አማራጮች", "የእረፍት ጊዜ ፖሊሲ"] },
        { title: "ጉዞ እና ዝውውር", description: "ለንግድ ጉዞ ድጋፍ እና ለዓለም አቀፍ ሚናዎች የዝውውር እርዳታ", features: ["የጉዞ አበል", "የዝውውር ድጋፍ", "የቪዛ እርዳታ", "የመኖሪያ ቤት እርዳታ"] },
        { title: "የፋይናንስ ደህንነት", description: "ከጡረታ እቅድ እና የአክሲዮን አማራጮች ጋር ተወዳዳሪ የማካካሻ ፓኬጆች", features: ["ተወዳዳሪ ደመወዝ", "የአክሲዮን አማራጮች", "የጡረታ እቅድ", "የአፈጻጸም ጉርሻ"] },
        { title: "የቢሮ ጥቅሞች", description: "ከነፃ ምግብ፣ መክሰስ እና የመዝናኛ ተቋማት ጋር ዘመናዊ የቢሮ ቦታዎች", features: ["ነፃ ምግብ", "የጨዋታ ክፍሎች", "ዘመናዊ የስራ ቦታ", "የቡድን ዝግጅቶች"] },
        { title: "መሳሪያዎች እና መሳሪያዎች", description: "ምርጥ ስራዎን እንዲሰሩ ለመርዳት የቅርብ ጊዜ ቴክኖሎጂ እና መሳሪያዎች", features: ["የቅርብ ጊዜ ሃርድዌር", "የሶፍትዌር ፈቃዶች", "የቤት ቢሮ ማዋቀር", "የቴክኖሎጂ አበል"] },
        { title: "ቡድን እና ባህል", description: "ከተለያዩ ቡድኖች እና አካታች ባህል ጋር የትብብር አካባቢ", features: ["የተለያዩ ቡድኖች", "አካታች ባህል", "የቡድን ግንባታ", "ክፍት ግንኙነት"] },
        { title: "ተለዋዋጭ መርሃ ግብር", description: "በተለዋዋጭ የመርሃ ግብር አማራጮች በጣም ምርታማ በሚሆኑበት ጊዜ ይስሩ", features: ["ተለዋዋጭ ሰዓቶች", "ዋና ሰዓቶች", "የጊዜ ዞኖች", "የግል ጊዜ"] },
        { title: "እውቅና እና እድገት", description: "መደበኛ የእውቅና ፕሮግራሞች እና ግልጽ የስራ እድገት መንገዶች", features: ["የአፈጻጸም ግምገማዎች", "የስራ መንገዶች", "የእውቅና ፕሮግራሞች", "ማስተዋወቂያዎች"] }
      ],
      cta: {
        title: "ቡድናችንን ለመቀላቀል ዝግጁ ነዎት?",
        description: "ከክህሎትዎ እና ፍላጎቶችዎ ጋር የሚዛመዱ እድሎችን ያግኙ። እድገትዎን እና ደህንነትዎን ከሚያከብሩ ኩባንያዎች ጋር ጉዞዎን ይጀምሩ።",
        buttons: {
          browse: "ሁሉንም ስራዎች ያስሱ",
          alert: "የስራ ማንቂያ ይፍጠሩ"
        }
      }
    },

    growth: {
      title: "የእርስዎ የስራ እድገት መንገድ",
      description: "በእያንዳንዱ የጉዞዎ ደረጃ ላይ ግልጽ የስራ መንገዶች፣ ቀጣይነት ያለው የመማሪያ እድሎች እና ድጋፍ በማቅረብ ለሙያዊ እድገትዎ ቁርጠኞች ነን።",
      progression: {
        title: "የስራ እድገት",
        levels: [
          { level: "የመግቢያ ደረጃ", title: "ጉዞዎን ይጀምሩ", description: "ከመመሪያ እና በተዋቀረ የመማሪያ ፕሮግራሞች ጋር ስራዎን ይጀምሩ", duration: "0-2 ዓመታት", opportunities: ["ተለማማጅነት", "የምረቃ ፕሮግራሞች", "መመሪያ", "መሰረታዊ ስልጠና"] },
          { level: "መካከለኛ ደረጃ", title: "እውቀት ያዳብሩ", description: "ልዩ ክህሎቶችን ይገንቡ እና ተጨማሪ ኃላፊነቶችን ይውሰዱ", duration: "2-5 ዓመታት", opportunities: ["የክህሎት ስፔሻላይዜሽን", "የፕሮጀክት አመራር", "የቡድን ትብብር", "የላቀ ስልጠና"] },
          { level: "ከፍተኛ ደረጃ", title: "መሪነት እና ፈጠራ", description: "ቡድኖችን መሪነት፣ ፈጠራን መንዳት እና የኩባንያ አቅጣጫን መቅረጽ", duration: "5+ ዓመታት", opportunities: ["የቡድን አመራር", "ስትራቴጂካዊ እቅድ", "የፈጠራ ፕሮጀክቶች", "የአስፈፃሚ ስልጠና"] }
        ],
        opportunitiesLabel: "እድሎች:"
      },
      skills: {
        title: "የክህሎት ማሻሻያ ፕሮግራሞች",
        items: [
          { title: "ቴክኒካል ክህሎቶች", description: "ከቅርብ ጊዜ ቴክኖሎጂዎች እና የኢንዱስትሪ ምርጥ ልምዶች ጋር ወቅታዊ ይሁኑ", programs: ["ቴክኒካል ወርክሾፖች", "የምስክር ወረቀት ፕሮግራሞች", "ተግባራዊ ፕሮጀክቶች", "የባለሙያ መመሪያ"] },
          { title: "የአመራር ክህሎቶች", description: "ቡድኖችን ለመምራት እና ውጤቶችን ለማምጣት የአመራር ችሎታዎችን ያዳብሩ", programs: ["የአመራር ስልጠና", "የአስተዳደር ኮርሶች", "የአስፈፃሚ ኮቺንግ", "የቡድን ግንባታ"] },
          { title: "የፈጠራ ክህሎቶች", description: "ውስብስብ ተግዳሮቶችን ለመፍታት ፈጠራን እና ፈጠራን ያሳድጉ", programs: ["የፈጠራ ወርክሾፖች", "የዲዛይን አስተሳሰብ", "ሃካቶኖች", "የምርምር ፕሮጀክቶች"] },
          { title: "የንግድ ክህሎቶች", description: "የንግድ ስትራቴጂን ይረዱ እና የንግድ ብልሃትን ያዳብሩ", programs: ["የንግድ ኮርሶች", "የስትራቴጂ ክፍለ ጊዜዎች", "የገበያ ትንተና", "የፋይናንስ ማንበብና መጻፍ"] }
        ]
      },
      successStories: {
        title: "የስኬት ታሪኮች",
        stories: [
          { name: "ሳራ ጆንሰን", path: "ተለማማጅ → ከፍተኛ ኢንጂነር", quote: "እንደ ተለማማጅ ጀምሬ በመመሪያ እና ቀጣይነት ያለው የመማሪያ እድሎች ወደ ከፍተኛ ሚና አድጌያለሁ።" },
          { name: "ማይክል ቼን", path: "ገንቢ → የቡድን መሪ", quote: "የአመራር ማሻሻያ ፕሮግራም ከግለሰብ አስተዋፅዖ ወደ የቡድን መሪ እንድሸጋገር ረድቶኛል።" },
          { name: "ኤሚሊ ሮድሪጌዝ", path: "ተንታኝ → የምርት አስተዳዳሪ", quote: "የተሻገሩ ተግባራዊ ፕሮጀክቶች እና የንግድ ስልጠና ወደ የምርት አስተዳደር እንድሸጋገር አስችሎኛል።" }
        ]
      }
    },

    process: {
      title: "የማመልከቻ ሂደት",
      description: "የእኛ ቀላል የማመልከቻ ሂደት ግልጽ እና ቀልጣፋ እንዲሆን የተነደፈ ሲሆን በእኛ ጋር በጉዞዎ እያንዳንዱ ደረጃ ላይ ምን እንደሚጠብቁ እንዲረዱ ይረዳዎታል።",
      steps: [
        { title: "ሚናዎን ያግኙ", description: "የስራ ዝርዝሮቻችንን ያስሱ እና ከክህሎትዎ እና ፍላጎቶችዎ ጋር የሚዛመዱ ቦታዎችን ያግኙ", details: ["የላቀ ማጣሪያዎችን ይጠቀሙ", "አስደሳች ስራዎችን ያስቀምጡ", "የስራ ማንቂያዎችን ያዋቅሩ", "ኩባንያዎችን ይመርምሩ"], duration: "5-10 ደቂቃዎች" },
        { title: "ማመልከቻ ያስገቡ", description: "ማመልከቻዎን በሪዙሜ፣ በሽፋን ደብዳቤ እና በሚፈለጉ ሰነዶች ያጠናቅቁ", details: ["ሪዙሜዎን ይስቀሉ", "የሽፋን ደብዳቤ ይጻፉ", "የማመልከቻ ቅጽ ያጠናቅቁ", "ከተፈለገ ፖርትፎሊዮ ያስገቡ"], duration: "15-30 ደቂቃዎች" },
        { title: "የመጀመሪያ ግምገማ", description: "የእኛ የምልመላ ቡድን ማመልከቻዎን እና ብቃቶችዎን ይገመግማል", details: ["የማመልከቻ ምርመራ", "የብቃት ፍተሻ", "የመጀመሪያ ግምገማ", "የአጭር ዝርዝር ፍጥረት"], duration: "3-5 የስራ ቀናት" },
        { title: "የቃለ መጠይቅ ሂደት", description: "ከቅጥር አስተዳዳሪዎች እና የቡድን አባላት ጋር በቃለ መጠይቆች ይሳተፉ", details: ["ስልክ/ቪዲዮ ምርመራ", "ቴክኒካል ግምገማ", "የቡድን ቃለ መጠይቆች", "የመጨረሻ ቃለ መጠይቅ"], duration: "1-2 ሳምንታት" },
        { title: "የመጨረሻ ውሳኔ", description: "ለቦታው ከተመረጡ ግብረመልስ እና የስራ ቅናሽ ይቀበሉ", details: ["የማጣቀሻ ፍተሻዎች", "የመጨረሻ ግምገማ", "የቅናሽ ዝግጅት", "ከተፈለገ ድርድር"], duration: "3-5 የስራ ቀናት" },
        { title: "ኦንቦርዲንግ", description: "ወደ ቡድኑ እንኳን ደህና መጡ! ኦንቦርዲንግን ያጠናቅቁ እና አዲስ ሚናዎን ይጀምሩ", details: ["የውል መፈረም", "የማስተዋወቂያ ፕሮግራም", "የቡድን መግቢያዎች", "የመጀመሪያ ስልጠና"], duration: "1-2 ሳምንታት" }
      ],
      tips: {
        title: "ለስኬት የማመልከቻ ምክሮች",
        items: [
          { title: "ሪዙሜዎን ያሳድጉ", tips: ["ሪዙሜዎን ከተወሰነ የስራ መስፈርቶች ጋር ያስማሙ", "ተዛማጅ ክህሎቶችን እና ስኬቶችን ያጎላሉ", "የድርጊት ግሦችን ይጠቀሙ እና ውጤቶችን ይለኩ", "አጭር እና በደንብ የተቀረጸ ያድርጉት"] },
          { title: "ለቃለ መጠይቆች ይዘጋጁ", tips: ["ኩባንያውን እና ሚናውን በደንብ ይመርምሩ", "የተለመዱ የቃለ መጠይቅ ጥያቄዎችን ይለማመዱ", "የስራዎን ልዩ ምሳሌዎች ያዘጋጁ", "ስለ ሚናው አስተዋይ ጥያቄዎችን ይጠይቁ"] },
          { title: "ክህሎቶችዎን ያሳዩ", tips: ["የምርጥ ስራዎን ፖርትፎሊዮ ይፍጠሩ", "የችግር መፍቻ ችሎታዎችን ያሳዩ", "ለኢንዱስትሪው ፍቅር ያሳዩ", "ቀጣይነት ያለው የመማሪያ ጥረቶችን ያጎላሉ"] }
        ]
      },
      faq: {
        title: "በተደጋጋሚ የሚጠየቁ ጥያቄዎች",
        questions: [
          { question: "የማመልከቻ ሂደቱ ምን ያህል ጊዜ ይወስዳል?", answer: "አጠቃላይ ሂደቱ በሚና እና በቃለ መጠይቅ ዙሮች ብዛት ላይ በመመስረት ከማመልከቻ አቅርቦት እስከ የመጨረሻ ውሳኔ በተለምዶ 2-4 ሳምንታት ይወስዳል።" },
          { question: "ለብዙ ቦታዎች ማመልከት እችላለሁ?", answer: "አዎ፣ ከክህሎትዎ እና ፍላጎቶችዎ ጋር ለሚዛመዱ ብዙ ቦታዎች ማመልከት ይችላሉ። እያንዳንዱን ማመልከቻ ከተወሰነ ሚና ጋር ማስማማትን እንመክራለን።" },
          { question: "በቃለ መጠይቁ ውስጥ ምን መጠበቅ አለብኝ?", answer: "ቃለ መጠይቆች በተለምዶ የባህሪ ጥያቄዎችን፣ ቴክኒካል ግምገማዎችን (ለቴክኒካል ሚናዎች) እና ስለ ልምድዎ እና የስራ ግቦችዎ ውይይቶችን ያካትታሉ።" },
          { question: "በማመልከቻዎች ላይ ግብረመልስ ይሰጣሉ?", answer: "ወደ ቃለ መጠይቅ ደረጃ ለደረሱ እጩዎች ግብረመልስ እንሰጣለን። በከፍተኛ የማመልከቻ መጠኖች ምክንያት ለሁሉም ማመልከቻዎች ግለሰባዊ ግብረመልስ ላንሰጥ እንችላለን።" }
        ]
      },
      support: {
        title: "በማመልከቻዎ ላይ እርዳታ ይፈልጋሉ?",
        description: "የእኛ የምልመላ ቡድን በማመልከቻ ሂደቱ ውስጥ ለመርዳት እዚህ አለ።",
        buttons: {
          contact: "የምልመላ ቡድንን ያነጋግሩ",
          support: "የማመልከቻ ድጋፍ"
        }
      }
    },

    partners: {
      title: "የእኛ የአጋር ኩባንያዎች",
      description: "በቴክኖሎጂ፣ በፋይናንስ፣ በልማት እና ሌሎችም ውስጥ ምርጥ የስራ እድሎችን ለማምጣት በኢትዮጵያ እና በዓለም አቀፍ ደረጃ ከመሪ ድርጅቶች ጋር አጋር ነን።",
      categories: [
        { title: "የቴክኖሎጂ ኩባንያዎች", description: "ፈጠራ ያላቸውን ሚናዎች የሚያቀርቡ መሪ የቴክኖሎጂ ኩባንያዎች", count: "50+" },
        { title: "አዳዲስ ኩባንያዎች እና ስኬል-አፕስ", description: "አስደሳች እድሎች ያላቸው በፍጥነት እያደጉ ያሉ ኩባንያዎች", count: "75+" },
        { title: "የፋይናንስ አገልግሎቶች", description: "ዲጂታል ለውጥን የሚመሩ ባንኮች እና ፊንቴክ ኩባንያዎች", count: "30+" },
        { title: "ዓለም አቀፍ ድርጅቶች", description: "የአካባቢ እና የርቀት እድሎች ያላቸው ዓለም አቀፍ ድርጅቶች", count: "25+" }
      ],
      benefits: {
        title: "የአጋር ኩባንያዎች እኛን ለምን ይመርጣሉ",
        items: [
          { title: "የተለያዩ እድሎች", description: "በብዙ ኢንዱስትሪዎች እና የኩባንያ መጠኖች ውስጥ ወደ ሚናዎች መዳረሻ" },
          { title: "ዓለም አቀፍ ተደራሽነት", description: "ከአካባቢ ኢትዮጵያዊ ኩባንያዎች እና ዓለም አቀፍ ድርጅቶች ጋር ይገናኙ" },
          { title: "የታመኑ አጋሮች", description: "ሁሉም የአጋር ኩባንያዎች ለጥራት እና ለስራ ቦታ ደረጃዎች ተመርምረዋል" },
          { title: "የስራ እድገት", description: "ለሰራተኛ እድገት እና የስራ እድገት ቁርጠኞች አጋሮች" }
        ]
      },
      successStories: {
        title: "የስኬት ታሪኮች",
        testimonials: [
          { name: "ሳራ አለማየሁ", role: "ሶፍትዌር ኢንጂነር", company: "TechStart ET", quote: "የህልም ስራዬን በመድረክ አግኝቻለሁ። የማመልከቻ ሂደቱ ለስላሳ ነበር እና የኩባንያው ባህል አስደናቂ ነው።" },
          { name: "ማይክል ታደሰ", role: "የመረጃ ተንታኝ", company: "የኢትዮጵያ ንግድ ባንክ", quote: "በፋይናንስ ዘርፍ እድሎችን ለማግኘት ምርጥ መድረክ። ከክህሎቴ ጋር በትክክል የሚዛመድ ሚና አገኘሁ።" },
          { name: "ሃናን መሐመድ", role: "የፕሮጀክት አስተዳዳሪ", company: "UN Ethiopia", quote: "እዚህ ያሉት ዓለም አቀፍ እድሎች አስደናቂ ናቸው። አሁን እውነተኛ ተጽእኖ በሚያደርጉ ፕሮጀክቶች ላይ እየሰራሁ ነው።" }
        ]
      },
      cta: {
        title: "ከእኛ ጋር አጋር መሆን ይፈልጋሉ?",
        description: "የአጋር ኩባንያዎች አውታረ መረባችንን ይቀላቀሉ እና ከከፍተኛ ተሰጥኦ ጋር ይገናኙ። የስራ ክፍት ቦታዎችዎን ያስተዋውቁ እና ለቡድንዎ ፍጹም እጩዎችን ያግኙ።",
        buttons: {
          partner: "አጋር ይሁኑ",
          post: "ስራ ያስተዋውቁ"
        }
      },
      trusted: "በመሪ ድርጅቶች የታመነ"
    }
  },

  om: {
    // Hero Section
    hero: {
      title: "Hojii Kee Ijaarradhu",
      description: "Dhaabbilee kalaqaa qaban waliin makamuu fi egeree teeknooloojii bocuu. Carraa Ethronics fi dhaabbilee hiriyoota addunyaa keessatti argadhu.",
      stats: {
        positions: { value: "500+", label: "Bakka Hojii Banaa" },
        companies: { value: "150+", label: "Dhaabbilee Hiriyoota" },
        countries: { value: "25+", label: "Biyyoota" },
        successRate: { value: "95%", label: "Sadarkaa Milkaa'inaa" }
      },
      buttons: {
        browse: "Hojii Sakatta'i",
        post: "Hojii Beeksisi"
      }
    },

    search: {
      labels: {
        title: "Mataduree Hojii ykn Jecha Ijoo",
        location: "Bakka",
        type: "Gosa Hojii",
        company: "Dhaabbata"
      },
      placeholders: {
        search: "Fkn. Injinara Sooftiweerii, Saayintistii Deetaa..."
      },
      button: "Hojii Barbaadi",
      popularSearches: "Barbaacha beekamoo:",
      quickFilters: [
        "Injinara Sooftiweerii",
        "Saayintistii Deetaa",
        "Bulchaa Oomishaa",
        "DevOps",
        "Dizaayinara UI/UX",
        "Hojii Fagoo"
      ],
      locations: [
        { value: "all", label: "Bakka Hunda" },
        { value: "addis-ababa", label: "Finfinnee, Itoophiyaa" },
        { value: "adama", label: "Adaamaa, Itoophiyaa" },
        { value: "remote", label: "Fagoo" },
        { value: "hybrid", label: "Makaa" },
        { value: "usa", label: "Ameerikaa" },
        { value: "europe", label: "Awurooppaa" },
        { value: "asia", label: "Eeshiyaa" }
      ],
      jobTypes: [
        { value: "all", label: "Gosa Hunda" },
        { value: "full-time", label: "Yeroo Guutuu" },
        { value: "part-time", label: "Yeroo Muraasa" },
        { value: "contract", label: "Waliigaltee" },
        { value: "internship", label: "Leenjii" },
        { value: "freelance", label: "Bilisaa" }
      ],
      companies: [
        { value: "all", label: "Dhaabbilee Hunda" },
        { value: "ethronics", label: "Ethronics" },
        { value: "tech-partners", label: "Hiriyoota Teeknooloojii" },
        { value: "startups", label: "Dhaabbilee Haaraa" },
        { value: "enterprises", label: "Dhaabbilee Gurguddoo" },
        { value: "government", label: "Mootummaa" },
        { value: "ngos", label: "Dhaabbilee Mootummaa Hin Taane" }
      ]
    },

    categories: {
      title: "Ramaddii Irratti Hundaa'uun Sakatta'i",
      description: "Industirii fi addabaasuu adda addaa keessatti carraa argadhu",
      items: [
        { id: "all", name: "Ramaddii Hunda", count: "500+" },
        { id: "engineering", name: "Injinariing Sooftiweerii", count: "120" },
        { id: "data", name: "Deetaa fi Xiinxala", count: "85" },
        { id: "design", name: "Dizaayinii fi UX", count: "45" },
        { id: "product", name: "Bulchiinsa Oomishaa", count: "35" },
        { id: "security", name: "Nageenyaa Saayibarii", count: "40" },
        { id: "ai", name: "AI fi Barumsa Maashinii", count: "55" },
        { id: "marketing", name: "Gabaa fi Gurgurtaa", count: "30" },
        { id: "operations", name: "Hojii Raawwii fi DevOps", count: "25" },
        { id: "education", name: "Barnoota fi Leenjii", count: "20" },
        { id: "healthcare", name: "Fayyaa fi Qorannoo", count: "15" },
        { id: "international", name: "Hariiroo Idil-addunyaa", count: "25" }
      ],
      openPositions: "bakka hojii banaa"
    },

    listings: {
      title: "Carraa Hojii",
      found: "Argame",
      jobsMatching: "hojii ulaagaa kee waliin walsimuu",
      sortBy: {
        label: "Tartiiba:",
        newest: "Haaraa",
        salary: "Mindaa",
        company: "Dhaabbata",
        deadline: "Guyyaa Xumuraa"
      },
      featured: "Adda Baafame",
      applicants: "iyyattoota",
      deadline: "Guyyaa Xumuraa:",
      applyNow: "Amma Iyyaadhu",
      loadMore: "Hojii Dabalataa Fe'i",
      noResults: {
        title: "Hojiin hin argamne",
        description: "Ulaagaa barbaacha kee sirreessuu ykn ramaddii adda addaa sakatta'uu yaali"
      },
      jobs: [
        {
          id: 1,
          title: "Injinara Sooftiweerii Olaanaa",
          company: "Ethronics",
          location: "Finfinnee, Itoophiyaa",
          type: "Guutuu-yeroo",
          category: "engineering",
          salary: "$60,000 - $80,000",
          postedDate: "2024-03-15",
          deadline: "2024-04-15",
          description: "Furmaata teeknooloojii ammayyaa gabaa Afrikaa irratti ijaaruuf garee injinariingii keenya waliin makamuu.",
          requirements: ["Muuxannoo waggaa 5+", "React/Node.js", "Waltajjiilee duumessaa", "Hoogganummaa garee"],
          benefits: ["Inshuraansii fayyaa", "Hojii fagoo", "Guddina ogummaa", "Filannoo akshinii"],
          featured: true,
          applicants: 45,
          rating: 4.8,
          tags: ["React", "Node.js", "AWS", "Hoogganummaa"]
        },
        {
          id: 2,
          title: "Saayintistii Deetaa",
          company: "TechCorp Africa",
          location: "Fagoo",
          type: "Guutuu-yeroo",
          category: "data",
          salary: "$70,000 - $90,000",
          postedDate: "2024-03-14",
          deadline: "2024-04-20",
          description: "Hubannoo daldalaa fi furmaata barumsa maashinii oofuuf kuusaa deetaa walxaxaa xiinxali.",
          requirements: ["PhD Saayinsii Deetaa keessatti", "Python/R", "Barumsa Maashinii", "Istaatiistiksii"],
          benefits: ["Sa'aatii jijjiiramaa", "Baajata barumsaa", "Hirmaannaa konfiraansii", "Fagoo jalqaba"],
          featured: false,
          applicants: 32,
          rating: 4.6,
          tags: ["Python", "ML", "Istaatiistiksii", "Fagoo"]
        },
        {
          id: 3,
          title: "Dizaayinara UX/UI",
          company: "Design Studio ET",
          location: "Adaamaa, Itoophiyaa",
          type: "Waliigaltee",
          category: "design",
          salary: "$40,000 - $55,000",
          postedDate: "2024-03-13",
          deadline: "2024-04-10",
          description: "Muuxannoo fayyadamaa bareedaa fi hubatamaa mobaayilaa fi aplikeeshinii weebii irratti uumi.",
          requirements: ["Waggaa 3+ UX/UI", "Figma/Sketch", "Qorannoo fayyadamaa", "Prototaayipii"],
          benefits: ["Bilisummaa kalaqaa", "Meeshaalee ammayyaa", "Garee walta'iinsaa", "Pirojektoota poortifoliiyoo"],
          featured: true,
          applicants: 28,
          rating: 4.7,
          tags: ["Figma", "Qorannoo UX", "Mobaayilaa", "Weebii"]
        },
        {
          id: 4,
          title: "Injinara DevOps",
          company: "CloudTech Solutions",
          location: "Makaa",
          type: "Guutuu-yeroo",
          category: "operations",
          salary: "$65,000 - $85,000",
          postedDate: "2024-03-12",
          deadline: "2024-04-25",
          description: "Bu'uura bu'uuraa fi paayipii bobbaa guddachuu danda'u ijaarii fi kunuunsi.",
          requirements: ["Docker/Kubernetes", "CI/CD", "AWS/Azure", "Bu'uura Bu'uuraa akka Koodii"],
          benefits: ["Teeknooloojii ammayyaa", "Baajata leenjii", "Sagantaa jijjiiramaa", "Taateewwan garee"],
          featured: false,
          applicants: 19,
          rating: 4.5,
          tags: ["Docker", "Kubernetes", "AWS", "CI/CD"]
        },
        {
          id: 5,
          title: "Saayintistii Qorannoo AI",
          company: "Ethronics Research Lab",
          location: "Finfinnee, Itoophiyaa",
          type: "Guutuu-yeroo",
          category: "ai",
          salary: "$80,000 - $120,000",
          postedDate: "2024-03-11",
          deadline: "2024-05-01",
          description: "Qorannoo ammayyaa sammuu namtolchee fi barumsa maashinii keessatti raawwadhu.",
          requirements: ["PhD AI/ML keessatti", "Maxxansa qorannoo", "Barumsa gadi fagoo", "NLP/Mul'ata Kompiitaraa"],
          benefits: ["Bilisummaa qorannoo", "Deeggarsa maxxansaa", "Imala konfiraansii", "Walta'iinsa"],
          featured: true,
          applicants: 15,
          rating: 4.9,
          tags: ["AI", "Qorannoo", "Barumsa Gadi Fagoo", "NLP"]
        },
        {
          id: 6,
          title: "Bulchaa Oomishaa",
          company: "StartupHub Ethiopia",
          location: "Fagoo",
          type: "Guutuu-yeroo",
          category: "product",
          salary: "$55,000 - $75,000",
          postedDate: "2024-03-10",
          deadline: "2024-04-18",
          description: "Tarsiimoo oomishaa fi misooma furmaata finteekii kalaqaa irratti hoogganuu.",
          requirements: ["Muuxannoo PM waggaa 5+", "Agile/Scrum", "Xiinxala", "Bulchiinsa qooda qabdootaa"],
          benefits: ["Paakeejii qixxummaa", "Hojii fagoo", "Abbummaa oomishaa", "Carraa guddina"],
          featured: false,
          applicants: 38,
          rating: 4.4,
          tags: ["Tarsiimoo Oomishaa", "Agile", "Finteekii", "Xiinxala"]
        }
      ]
    },

    benefits: {
      title: "Maaliif Nu Waliin Hojjechuu?",
      description: "Miseensota garee keenyaa faayidaa bal'aa fi naannoo hojii deeggaraa dhuunfaa fi ogummaa irratti akka guddatan gargaaruun kunuunsuu ni amanna.",
      items: [
        { title: "Fayyaa fi Nageenya", description: "Inshuraansii fayyaa bal'aa, ilkaan, ija fi deeggarsa fayyaa sammuu", features: ["Inshuraansii yaalaa", "Ilkaan fi ija", "Fayyaa sammuu", "Sagantaalee fayyummaa"] },
        { title: "Barnoota fi Guddina", description: "Carraa barumsaa itti fufiinsaa koorsii, konfiraansii fi ragaa waliin", features: ["Baajata leenjii", "Hirmaannaa konfiraansii", "Koorsii toora interneetii", "Misooma dandeettii"] },
        { title: "Madaallii Hojii-Jireenyaa", description: "Madaallii hojii-jireenyaa fayya qabeessa akka eegdan gargaaruuf qindaa'ina hojii jijjiiramaa", features: ["Hojii fagoo", "Sa'aatii jijjiiramaa", "Filannoo makaa", "Imaammata boqonnaa"] },
        { title: "Imala fi Jijjiirama", description: "Deeggarsa imala daldalaa fi gargaarsa jijjiiramaa gahee idil-addunyaatiif", features: ["Kaffaltii imala", "Deeggarsa jijjiiramaa", "Gargaarsa viizaa", "Gargaarsa mana jireenyaa"] },
        { title: "Nageenyaa Faayinaansii", description: "Paakeejii kaffaltii dorgommii qabu karoora soorama fi filannoo akshinii waliin", features: ["Mindaa dorgommii", "Filannoo akshinii", "Karoora soorama", "Badhaasa raawwii"] },
        { title: "Faayidaa Waajjiraa", description: "Bakka waajjiraa ammayyaa nyaata bilisaa, meeshaa nyaataa fi dhaabbilee bashannanaatiif", features: ["Nyaata bilisaa", "Kutaa taphaatiif", "Bakka hojii ammayyaa", "Taateewwan garee"] },
        { title: "Meeshaalee fi Meeshaalee", description: "Teeknooloojii fi meeshaalee yeroo ammaa hojii kee gaarii akka hojjettu si gargaaran", features: ["Haardweerii yeroo ammaa", "Hayyama sooftiweerii", "Qindaa'ina waajjira manaa", "Kaffaltii teeknooloojii"] },
        { title: "Garee fi Aadaa", description: "Naannoo walta'iinsaa garee adda addaa fi aadaa hammataa waliin", features: ["Garee adda addaa", "Aadaa hammataa", "Ijaarsa garee", "Qunnamtii banaa"] },
        { title: "Sagantaa Jijjiiramaa", description: "Yeroo baay'ee oomisha ta'anitti filannoo sagantaa jijjiiramaa waliin hojjedhu", features: ["Sa'aatii jijjiiramaa", "Sa'aatii bu'uuraa", "Naannoo yeroo", "Yeroo dhuunfaa"] },
        { title: "Beekamtii fi Guddina", description: "Sagantaalee beekamtii idilee fi karaa guddina hojii ifa ta'e", features: ["Gamaaggama raawwii", "Karaa hojii", "Sagantaalee beekamtii", "Guddina sadarkaa"] }
      ],
      cta: {
        title: "Garee Keenya Makamuu Qophii Dha?",
        description: "Carraa ogummaa fi fedhii kee waliin walsimuu argadhu. Imala kee dhaabbilee guddina fi nageenya kee kabajan waliin jalqabi.",
        buttons: {
          browse: "Hojii Hunda Sakatta'i",
          alert: "Akeekkachiisa Hojii Uumi"
        }
      }
    },

    growth: {
      title: "Karaa Guddina Hojii Keetii",
      description: "Karaa hojii ifa ta'e, carraa barumsaa itti fufiinsaa fi deeggarsa sadarkaa imala keetii hunda irratti guddina ogummaa keetiif of kennineerra.",
      progression: {
        title: "Guddina Hojii",
        levels: [
          { level: "Sadarkaa Seensaa", title: "Imala Kee Jalqabi", description: "Gorsa fi sagantaalee barnoota qindaa'aa waliin hojii kee jalqabi", duration: "Waggaa 0-2", opportunities: ["Leenjii", "Sagantaalee Eebba", "Gorsa", "Leenjii Bu'uuraa"] },
          { level: "Sadarkaa Giddugaleessaa", title: "Ogummaa Misoomi", description: "Dandeettii addaa ijaaruu fi itti gaafatamummaa dabalataa fudhachuu", duration: "Waggaa 2-5", opportunities: ["Addabaasuu Dandeettii", "Hoogganummaa Pirojektii", "Walta'iinsa Garee", "Leenjii Olaanaa"] },
          { level: "Sadarkaa Olaanaa", title: "Hoogganuu fi Kalaquu", description: "Garee hoogganuu, kalaqaa oofuu fi kallattii dhaabbataa bocuu", duration: "Waggaa 5+", opportunities: ["Hoogganummaa Garee", "Karoora Tarsiimoo", "Pirojektoota Kalaqaa", "Leenjii Raawwachiiftuu"] }
        ],
        opportunitiesLabel: "Carraalee:"
      },
      skills: {
        title: "Sagantaalee Misooma Dandeettii",
        items: [
          { title: "Dandeettii Teeknikaa", description: "Teeknooloojii yeroo ammaa fi muuxannoo gaarii industirii waliin yeroo ammaa ta'i", programs: ["Warkshooppii Teeknikaa", "Sagantaalee Ragaa", "Pirojektoota Harkaa", "Gorsa Ogeeyyii"] },
          { title: "Dandeettii Hoogganummaa", description: "Garee hoogganuu fi bu'aa fiduuf dandeettii hoogganummaa misoomi", programs: ["Leenjii Hoogganummaa", "Koorsii Bulchiinsaa", "Koochii Raawwachiiftuu", "Ijaarsa Garee"] },
          { title: "Dandeettii Kalaqaa", description: "Qormaata walxaxaa furuuf kalaqaa fi kalaqaa guddisi", programs: ["Warkshooppii Kalaqaa", "Yaada Dizaayinii", "Hakaatoonii", "Pirojektoota Qorannoo"] },
          { title: "Dandeettii Daldalaa", description: "Tarsiimoo daldalaa hubachuu fi ogummaa daldalaa misoomi", programs: ["Koorsii Daldalaa", "Walgahii Tarsiimoo", "Xiinxala Gabaa", "Barreessuu fi Dubbisuu Faayinaansii"] }
        ]
      },
      successStories: {
        title: "Seenaa Milkaa'inaa",
        stories: [
          { name: "Saaraa Joonsan", path: "Leenjisaa → Injinara Olaanaa", quote: "Akka leenjisaatti jalqabee gorsa fi carraa barumsaa itti fufiinsaa keessaa gara gahee olaanaatti guddadhe." },
          { name: "Maayikaal Cheen", path: "Hojjetaa → Hogganaa Garee", quote: "Sagantaan misooma hoogganummaa nama dhuunfaa irraa gara hogganaa garee akkan ce'u na gargaare." },
          { name: "Eemilii Roodriigez", path: "Xiinxalaa → Bulchaa Oomishaa", quote: "Pirojektoonni hojii walxaxaa fi leenjiin daldalaa gara bulchiinsa oomishaa akkan ce'u na dandeessise." }
        ]
      }
    },

    process: {
      title: "Adeemsa Iyyannoo",
      description: "Adeemsi iyyannoo keenya salphaa ta'ee fi bu'a qabeessa akka ta'u kan qophaa'e yoo ta'u, sadarkaa imala keetii nu waliin hunda irratti maal akka eegdu akka hubattu si gargaara.",
      steps: [
        { title: "Gahee Kee Barbaadi", description: "Tarree hojii keenyaa sakatta'ii fi bakka ogummaa fi fedhii kee waliin walsiman argadhu", duration: "Daqiiqaa 5-10", details: ["Calaltoota olaanaa fayyadami", "Hojii hawwataa olkaa'i", "Akeekkachiisa hojii qindeessi", "Dhaabbilee qorannoo godhi"] },
        { title: "Iyyannoo Galchi", description: "Iyyannoo kee riizumee, xalayaa haguugaa fi galmee barbaachisaa waliin xumuri", duration: "Daqiiqaa 15-30", details: ["Riizumee kee fe'i", "Xalayaa haguugaa barreessi", "Unka iyyannoo xumuri", "Yoo barbaachise poortifoliiyoo galchi"] },
        { title: "Gamaaggama Jalqabaa", description: "Gareen walitti qabaa keenyaa iyyannoo fi dandeettii kee ni gamaaggama", duration: "Guyyaa hojii 3-5", details: ["Sakatta'iinsa iyyannoo", "Mirkaneessa dandeettii", "Gamaaggama jalqabaa", "Uumuu tarree gabaabaa"] },
        { title: "Adeemsa Gaaffii", description: "Bulchitoota qacaruu fi miseensota garee waliin gaaffii irratti hirmaadhu", duration: "Torban 1-2", details: ["Sakatta'iinsa bilbilaa/viidiyoo", "Gamaaggama teeknikaa", "Gaaffii garee", "Gaaffii dhumaa"] },
        { title: "Murtee Dhumaa", description: "Yoo bakka sanaaf filatamte yaada fi dhiyeessii hojii fudhadhu", duration: "Guyyaa hojii 3-5", details: ["Mirkaneessa wabii", "Gamaaggama dhumaa", "Qophii dhiyeessii", "Yoo barbaachise mari'annoo"] },
        { title: "Onboordiing", description: "Gara garee keenyaatti baga nagaan dhuftan! Onboordiing xumuruu fi gahee haaraa kee jalqabi", duration: "Torban 1-2", details: ["Mallattoo waliigaltee", "Sagantaa seensa", "Seensa garee", "Leenjii jalqabaa"] }
      ],
      tips: {
        title: "Gorsa Iyyannoo Milkaa'inaaf",
        items: [
          { title: "Riizumee Kee Fooyyessi", description: "Riizumee kee ulaagaa hojii addaa waliin walsimsii", tips: ["Riizumee kee ulaagaa hojii addaa waliin walsimsii", "Dandeettii fi milkaa'ina walitti dhiyaatan calaqqisiisi", "Gocha gochaa fayyadamii fi bu'aa safaruu", "Gabaabaa fi haala gaarii qabuu godhi"] },
          { title: "Gaaffii Qopheessi", description: "Dhaabbata fi gahee sana sirriitti qorannoo godhi", tips: ["Dhaabbata fi gahee sana sirriitti qorannoo godhi", "Gaaffii baratamoo shaakalii", "Fakkeenya addaa hojii keetii qopheessi", "Waa'ee gahee sanaa gaaffii yaada qabu gaafadhu"] },
          { title: "Dandeettii Kee Agarsiisi", description: "Poortifoliiyoo hojii kee gaarii uumi", tips: ["Poortifoliiyoo hojii kee gaarii uumi", "Dandeettii furmaata rakkoo agarsiisi", "Industirii sanaaf jaalala agarsiisi", "Tattaaffii barumsaa itti fufiinsaa calaqqisiisi"] }
        ]
      },
      faq: {
        title: "Gaaffilee Yeroo Baay'ee Gaafataman",
        questions: [
          { question: "Adeemsi iyyannoo yeroo hammam fudhata?", answer: "Adeemsi guutuun akkaataa idileetti gahee fi lakkoofsa marsaa gaaffii irratti hundaa'uun galma iyyannoo irraa hanga murtee dhumaatti torban 2-4 fudhata." },
          { question: "Bakka baay'eedhaaf iyyachuu nan danda'aa?", answer: "Eeyyee, bakka baay'ee ogummaa fi fedhii kee waliin walsiman iyyachuu dandeessa. Iyyannoo hunda gahee addaa waliin akka walsimsitu ni gorsina." },
          { question: "Gaaffii keessatti maal eeguu qaba?", answer: "Gaaffiin akkaataa idileetti gaaffilee amala, gamaaggama teeknikaa (gahee teeknikaatiif) fi mari'annoo muuxannoo fi galma hojii keetii irratti of keessatti qabata." },
          { question: "Iyyannoo irratti yaada ni kennitu?", answer: "Iyyattoota gara sadarkaa gaaffii ga'aniif yaada ni kennina. Baay'ina iyyannoo guddaa irraa kan ka'e iyyannoo hundaaf yaada dhuunfaa kennuu hin dandeenyu ta'a." }
        ]
      },
      support: {
        title: "Iyyannoo Kee Irratti Gargaarsa Barbaaddaa?",
        description: "Gareen walitti qabaa keenyaa adeemsa iyyannoo keessatti si gargaaruuf as jira.",
        buttons: {
          contact: "Garee Walitti Qabaa Quunnamuu",
          support: "Deeggarsa Iyyannoo"
        }
      }
    },

    partners: {
      title: "Dhaabbilee Hiriyoota Keenyaa",
      description: "Carraa hojii gaarii teeknooloojii, faayinaansii, misooma fi kan biroo keessatti siif fiduuf Itoophiyaa fi idil-addunyaa irratti dhaabbilee hoggantoota waliin hiriyoota.",
      categories: [
        { title: "Dhaabbilee Teeknooloojii", description: "Dhaabbilee teeknooloojii hoggantoota gahee kalaqaa dhiyeessan", count: "50+" },
        { title: "Dhaabbilee Haaraa fi Guddataa", description: "Dhaabbilee saffisaan guddachaa jiran carraa hawwataa qaban", count: "75+" },
        { title: "Tajaajila Faayinaansii", description: "Baankii fi dhaabbilee fintekii jijjiirama dijitaalaa oofan", count: "30+" },
        { title: "Dhaabbilee Idil-addunyaa", description: "Dhaabbilee idil-addunyaa carraa naannoo fi fagoo qaban", count: "25+" }
      ],
      benefits: {
        title: "Dhaabbilee Hiriyoota Maaliif Nu Filatu",
        items: [
          { title: "Carraa Adda Addaa", description: "Gara gahee industirii fi hammamtaa dhaabbataa adda addaa keessatti argachuu" },
          { title: "Dhaqqabummaa Addunyaa", description: "Dhaabbilee Itoophiyaa naannoo fi dhaabbilee idil-addunyaa waliin wal qunnamuu" },
          { title: "Hiriyoota Amanamoo", description: "Dhaabbilee hiriyoota hundi qulqullina fi ulaagaa bakka hojii irratti qoratamaniiru" },
          { title: "Guddina Hojii", description: "Hiriyoonni guddina hojjetaa fi guddina hojii irratti of kennan" }
        ]
      },
      successStories: {
        title: "Seenaa Milkaa'inaa",
        testimonials: [
          { name: "Saaraa Alemaayehuu", role: "Injinara Sooftiweerii", company: "TechStart ET", quote: "Hojii abjuu koo karaa waltajjii kanaan argadhe. Adeemsi iyyannoo sirrii ture fi aadaan dhaabbatichaa ajaa'ibsiisaa dha." },
          { name: "Maayikaal Taaddasee", role: "Xiinxalaa Deetaa", company: "Baankii Daldalaa Itoophiyaa", quote: "Waltajjii gaarii carraa damee faayinaansii keessatti argachuuf. Gahee ogummaa koo waliin sirriitti walsimuu argadhe." },
          { name: "Haanaan Mahammad", role: "Bulchaa Pirojektii", company: "UN Ethiopia", quote: "Carraan idil-addunyaa as jiru ajaa'ibsiisaa dha. Amma pirojektoota dhiibbaa dhugaa uuman irratti hojjechaa jira." }
        ]
      },
      cta: {
        title: "Nu Waliin Hiriyaa Ta'uu Barbaaddaa?",
        description: "Networkii dhaabbilee hiriyoota keenyaa makamuu fi dandeettii olaanaa waliin wal qunnamuu. Bakka hojii banaa kee beeksisii fi garee keetiif iyyattoota gaarii argadhu.",
        buttons: {
          partner: "Hiriyaa Ta'i",
          post: "Hojii Beeksisi"
        }
      },
      trusted: "Dhaabbilee Hoggantoota Irraa Amanamaa"
    }
  }
};
