export const blogTranslations = {
  en: {
    // Hero Section
    hero: {
      title: "Ethronics Blog",
      description: "Insights, innovations, and stories from the forefront of technology. Explore our thoughts on AI, research, education, and the future of tech in Africa.",
      stats: [
        { value: "150+", label: "Blog Posts" },
        { value: "50K+", label: "Monthly Readers" },
      ],
      buttons: {
        latest: "Latest Posts",
        subscribe: "Subscribe"
      }
    },

    // Filter Section
    filter: {
      searchPlaceholder: "Search blog posts, topics, authors...",
      categoriesLabel: "Categories:",
      tagsLabel: "Popular tags:",
      activeFilters: "Active filters:",
      clearAll: "Clear all",
      category: "Category",
      tag: "Tag",
      search: "Search",
      categories: [
        { value: 'all', label: 'All Posts', count: 150 },
        { value: 'technology', label: 'Technology', count: 35 },
        { value: 'ai-ml', label: 'AI & Machine Learning', count: 28 },
        { value: 'research', label: 'Research & Development', count: 22 },
        { value: 'education', label: 'Education', count: 18 },
        { value: 'innovation', label: 'Innovation', count: 15 },
        { value: 'sustainability', label: 'Sustainability', count: 12 },
        { value: 'entrepreneurship', label: 'Entrepreneurship', count: 10 },
        { value: 'partnerships', label: 'Partnerships', count: 8 },
        { value: 'community', label: 'Community', count: 6 }
      ],
      sortOptions: [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'trending', label: 'Trending' },
        { value: 'alphabetical', label: 'Alphabetical' }
      ],
      popularTags: [
        'Artificial Intelligence', 'Machine Learning', 'Quantum Computing', 'Blockchain',
        'IoT', 'Robotics', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'Innovation'
      ]
    },

    // Featured Posts Section
    featured: {
      title: "Featured Stories",
      description: "Discover our most impactful articles and insights from leading experts in technology and innovation.",
      readMore: "Read More",
      trendingTopics: "Trending Topics",
      featured: "Featured",
      posts: [
        {
          id: 1,
          title: "The Future of AI in African Education: Transforming Learning Landscapes",
          excerpt: "Exploring how artificial intelligence is revolutionizing educational systems across Africa, from personalized learning to automated assessment tools.",
          author: { name: "Dr. Sarah Okonkwo", role: "AI Research Director" },
          category: "AI & Machine Learning",
          publishDate: "2024-03-15",
          readTime: "8 min read",
          tags: ["Artificial Intelligence", "Education", "Africa", "Innovation"],
          stats: { views: 12500, comments: 45, likes: 230 }
        },
        {
          id: 2,
          title: "Quantum Computing Breakthroughs: What They Mean for African Tech",
          excerpt: "Recent advances in quantum computing technology and their potential impact on solving complex problems in African industries.",
          author: { name: "Prof. Michael Adebayo", role: "Quantum Research Lead" },
          category: "Technology",
          publishDate: "2024-03-12",
          readTime: "12 min read",
          tags: ["Quantum Computing", "Technology", "Research", "Innovation"],
          stats: { views: 8900, comments: 32, likes: 156 }
        },
        {
          id: 3,
          title: "Sustainable Tech Solutions: Building Green Innovation Hubs",
          excerpt: "How African tech companies are leading the charge in sustainable technology development and environmental conservation.",
          author: { name: "Dr. Amina Hassan", role: "Sustainability Director" },
          category: "Sustainability",
          publishDate: "2024-03-10",
          readTime: "6 min read",
          tags: ["Sustainability", "Green Tech", "Innovation", "Environment"],
          stats: { views: 6700, comments: 28, likes: 189 }
        }
      ]
    },

    // Blog Grid Section
    blogGrid: {
      allPosts: "All Posts",
      postsFound: "posts found",
      postFound: "post found",
      comments: "comments",
      likes: "likes",
      readFullArticle: "Read Full Article →",
      posts: [
        {
          id: 1,
          title: "Machine Learning Applications in African Healthcare Systems",
          excerpt: "Exploring how ML algorithms are being deployed to improve diagnostic accuracy and patient outcomes across African healthcare facilities.",
          author: { name: "Dr. Kwame Asante", role: "Healthcare AI Researcher" },
          category: "ai-ml",
          publishDate: "2024-03-18",
          readTime: "7 min read",
          tags: ["Machine Learning", "Healthcare", "AI", "Africa"],
          stats: { views: 8500, comments: 34, likes: 167 }
        },
        {
          id: 2,
          title: "Blockchain Technology for Supply Chain Transparency",
          excerpt: "How blockchain is revolutionizing supply chain management and creating transparency in African agricultural markets.",
          author: { name: "Sarah Okafor", role: "Blockchain Developer" },
          category: "technology",
          publishDate: "2024-03-16",
          readTime: "5 min read",
          tags: ["Blockchain", "Supply Chain", "Agriculture", "Transparency"],
          stats: { views: 6200, comments: 28, likes: 134 }
        },
        {
          id: 3,
          title: "IoT Solutions for Smart Cities in Africa",
          excerpt: "Implementing Internet of Things technologies to create smarter, more efficient urban environments across African cities.",
          author: { name: "Prof. Ahmed Hassan", role: "IoT Research Director" },
          category: "technology",
          publishDate: "2024-03-14",
          readTime: "9 min read",
          tags: ["IoT", "Smart Cities", "Urban Planning", "Technology"],
          stats: { views: 7800, comments: 42, likes: 198 }
        }
      ]
    },

    // Sidebar Section
    sidebar: {
      searchPosts: "Search Posts",
      searchPlaceholder: "Search articles...",
      categories: "Categories",
      popularTags: "Popular Tags",
      recentPosts: "Recent Posts",
      viewAllPosts: "View All Posts",
      topAuthors: "Top Authors",
      stayUpdated: "Stay Updated",
      stayUpdatedDescription: "Get the latest insights and articles delivered to your inbox.",
      emailPlaceholder: "Enter your email",
      subscribeButton: "Subscribe",
      posts: "posts",
      categoriesList: [
        { name: 'Technology', count: 45 },
        { name: 'AI & Machine Learning', count: 38 },
        { name: 'Research & Development', count: 32 },
        { name: 'Education', count: 28 },
        { name: 'Innovation', count: 25 },
        { name: 'Sustainability', count: 22 }
      ],
      popularTagsList: [
        { name: 'Artificial Intelligence', count: 45, trending: true },
        { name: 'Machine Learning', count: 38, trending: true },
        { name: 'Blockchain', count: 32, trending: false },
        { name: 'IoT', count: 28, trending: true },
        { name: 'Cybersecurity', count: 25, trending: false },
        { name: 'Sustainability', count: 22, trending: true },
        { name: 'EdTech', count: 20, trending: false },
        { name: 'Innovation', count: 18, trending: false },
        { name: 'Research', count: 15, trending: false },
        { name: 'Startups', count: 12, trending: false }
      ],
      recentPostsList: [
        {
          id: 1,
          title: "AI Ethics in African Context",
          author: "Dr. Sarah Okonkwo",
          date: "2024-03-18",
          readTime: "5 min"
        },
        {
          id: 2,
          title: "Quantum Computing Advances",
          author: "Prof. Michael Adebayo",
          date: "2024-03-16",
          readTime: "8 min"
        },
        {
          id: 3,
          title: "Green Tech Solutions",
          author: "Dr. Amina Hassan",
          date: "2024-03-14",
          readTime: "6 min"
        },
        {
          id: 4,
          title: "Digital Transformation Trends",
          author: "Grace Mwangi",
          date: "2024-03-12",
          readTime: "7 min"
        }
      ],
      topAuthorsList: [
        {
          name: "Dr. Sarah Okonkwo",
          role: "AI Research Director",
          posts: 15,
          expertise: ["AI", "Machine Learning", "Ethics"]
        },
        {
          name: "Prof. Michael Adebayo",
          role: "Quantum Research Lead",
          posts: 12,
          expertise: ["Quantum Computing", "Physics", "Research"]
        },
        {
          name: "Dr. Amina Hassan",
          role: "Sustainability Director",
          posts: 10,
          expertise: ["Sustainability", "Green Tech", "Environment"]
        }
      ]
    },

    // Author Spotlight Section
    authorSpotlight: {
      title: "Author Spotlight",
      description: "Meet the brilliant minds behind our content. Learn from leading experts and researchers shaping the future of technology.",
      about: "About",
      expertise: "Areas of Expertise",
      achievements: "Key Achievements",
      recentArticles: "Recent Articles",
      viewAllArticles: "View All Articles",
      articles: "Articles",
      citations: "Citations",
      yearsExp: "Years Exp.",
      students: "Students",
      views: "views",
      authors: [
        {
          id: 1,
          name: "Dr. Sarah Okonkwo",
          role: "AI Research Director",
          avatar: "/src/assets/CEO-IzCm-iny.jpg",
          bio: "Leading AI researcher with over 15 years of experience in machine learning and artificial intelligence. Passionate about developing ethical AI solutions for African challenges.",
          location: "Lagos, Nigeria",
          expertise: ["Artificial Intelligence", "Machine Learning", "Ethics in AI", "Computer Vision"],
          achievements: [
            "Published 50+ research papers in top-tier journals",
            "TEDx speaker on AI Ethics",
            "Winner of African Innovation Award 2023",
            "Mentor to 100+ AI researchers"
          ],
          stats: { articles: 25, citations: 1200, yearsExperience: 15, studentsSupervised: 45 },
          recentArticles: [
            { title: "The Future of AI in African Education", date: "2024-03-15", readTime: "8 min", views: 12500 },
            { title: "Ethical AI Development Guidelines", date: "2024-03-10", readTime: "6 min", views: 8900 },
            { title: "Machine Learning for Healthcare", date: "2024-03-05", readTime: "10 min", views: 15600 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/sarah-okonkwo",
            twitter: "https://twitter.com/sarahokonkwo",
            website: "https://sarahokonkwo.com"
          }
        },
        {
          id: 2,
          name: "Prof. Michael Adebayo",
          role: "Quantum Research Lead",
          avatar: "/src/assets/mentor-Cib0Zqml.jpg",
          bio: "Quantum computing pioneer and professor with groundbreaking research in quantum algorithms and their applications to African technological challenges.",
          location: "Cape Town, South Africa",
          expertise: ["Quantum Computing", "Quantum Algorithms", "Cryptography", "Theoretical Physics"],
          achievements: [
            "Developed novel quantum algorithms for optimization",
            "Founded Quantum Africa Initiative",
            "Recipient of Nobel Prize nomination",
            "Author of 'Quantum Computing for Africa' book"
          ],
          stats: { articles: 18, citations: 2100, yearsExperience: 20, studentsSupervised: 60 },
          recentArticles: [
            { title: "Quantum Computing Breakthroughs", date: "2024-03-12", readTime: "12 min", views: 8900 },
            { title: "Quantum Cryptography Applications", date: "2024-03-08", readTime: "9 min", views: 7200 },
            { title: "Building Quantum Infrastructure", date: "2024-03-03", readTime: "11 min", views: 9800 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/michael-adebayo",
            twitter: "https://twitter.com/michaeladebayo",
            website: "https://michaeladebayo.com"
          }
        },
        {
          id: 3,
          name: "Dr. Amina Hassan",
          role: "Sustainability Director",
          avatar: "/src/assets/training-xgzfTKXW.jpg",
          bio: "Environmental engineer and sustainability expert focused on developing green technology solutions for sustainable development across Africa.",
          location: "Nairobi, Kenya",
          expertise: ["Sustainable Technology", "Renewable Energy", "Environmental Engineering", "Green Innovation"],
          achievements: [
            "Led 20+ sustainable technology projects",
            "UN Sustainability Champion 2023",
            "Founded GreenTech Africa Network",
            "Advisor to African Development Bank"
          ],
          stats: { articles: 22, citations: 890, yearsExperience: 12, studentsSupervised: 35 },
          recentArticles: [
            { title: "Sustainable Tech Solutions", date: "2024-03-10", readTime: "6 min", views: 6700 },
            { title: "Renewable Energy Innovation", date: "2024-03-06", readTime: "8 min", views: 5400 },
            { title: "Green Technology Trends", date: "2024-03-01", readTime: "7 min", views: 7800 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/amina-hassan",
            twitter: "https://twitter.com/aminahassan",
            website: "https://aminahassan.com"
          }
        }
      ]
    },

    // Newsletter Section
    newsletter: {
      title: "Stay Ahead of the Curve",
      description: "Join thousands of tech enthusiasts and get the latest insights, research, and innovations delivered to your inbox.",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      frequencyLabel: "How often would you like to hear from us?",
      topicsLabel: "Topics you're interested in (optional)",
      subscribeButton: "Subscribe Now",
      subscribing: "Subscribing...",
      privacyNotice: "By subscribing, you agree to our Privacy Policy and Terms of Service. You can unsubscribe at any time.",
      successTitle: "Welcome to Our Community!",
      successMessage: "Thank you for subscribing to the Ethronics Blog newsletter. You'll receive your first digest soon!",
      managePreferences: "Manage Preferences",
      browsePosts: "Browse Latest Posts",
      whatYouGet: "What you'll get:",
      benefits: [
        "Exclusive insights from industry experts",
        "Early access to research publications",
        "Curated content tailored to your interests",
        "Invitations to webinars and events",
        "No spam, unsubscribe anytime"
      ],
      stats: [
        { value: "25K+", label: "Subscribers" },
        { value: "98%", label: "Open Rate" },
        { value: "3x", label: "Per Week" }
      ],
      frequencies: [
        { value: 'daily', label: 'Daily Digest', description: 'Get the latest posts every day' },
        { value: 'weekly', label: 'Weekly Roundup', description: 'Best content delivered weekly' },
        { value: 'monthly', label: 'Monthly Highlights', description: 'Top stories of the month' }
      ],
      topics: [
        { id: 'ai-ml', label: 'AI & Machine Learning', icon: '🤖' },
        { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
        { id: 'iot', label: 'Internet of Things', icon: '🌐' },
        { id: 'sustainability', label: 'Sustainability', icon: '🌱' },
        { id: 'research', label: 'Research & Development', icon: '🔬' },
        { id: 'education', label: 'Education Technology', icon: '📚' },
        { id: 'innovation', label: 'Innovation', icon: '💡' },
        { id: 'cybersecurity', label: 'Cybersecurity', icon: '🔒' }
      ]
    }
  },

  am: {
    // Hero Section
    hero: {
      title: "የኢትሮኒክስ ብሎግ",
      description: "ከቴክኖሎጂ ግንባር ቀደም ግንዛቤዎች፣ ፈጠራዎች እና ታሪኮች። ስለ AI፣ ምርምር፣ ትምህርት እና በአፍሪካ ውስጥ የቴክኖሎጂ ወደፊት ያለንን ሀሳቦች ያስሱ።",
      stats: [
        { value: "150+", label: "የብሎግ ልጥፎች" },
        { value: "25+", label: "ባለሙያ ደራሲዎች" },
        { value: "50K+", label: "ወርሃዊ አንባቢዎች" },
        { value: "12", label: "ምድቦች" }
      ],
      buttons: {
        latest: "የቅርብ ጊዜ ልጥፎች",
        subscribe: "ይመዝገቡ"
      }
    },

    // Filter Section
    filter: {
      searchPlaceholder: "የብሎግ ልጥፎችን፣ ርዕሶችን፣ ደራሲዎችን ይፈልጉ...",
      categoriesLabel: "ምድቦች:",
      tagsLabel: "ታዋቂ መለያዎች:",
      activeFilters: "ንቁ ማጣሪያዎች:",
      clearAll: "ሁሉንም አጽዳ",
      category: "ምድብ",
      tag: "መለያ",
      search: "ፍለጋ",
      categories: [
        { value: 'all', label: 'ሁሉም ልጥፎች', count: 150 },
        { value: 'technology', label: 'ቴክኖሎጂ', count: 35 },
        { value: 'ai-ml', label: 'AI እና ማሽን ለርኒንግ', count: 28 },
        { value: 'research', label: 'ምርምር እና ልማት', count: 22 },
        { value: 'education', label: 'ትምህርት', count: 18 },
        { value: 'innovation', label: 'ፈጠራ', count: 15 },
        { value: 'sustainability', label: 'ዘላቂነት', count: 12 },
        { value: 'entrepreneurship', label: 'ሥራ ፈጠራ', count: 10 },
        { value: 'partnerships', label: 'አጋርነቶች', count: 8 },
        { value: 'community', label: 'ማህበረሰብ', count: 6 }
      ],
      sortOptions: [
        { value: 'newest', label: 'አዲስ መጀመሪያ' },
        { value: 'oldest', label: 'ቆየት ያለ መጀመሪያ' },
        { value: 'popular', label: 'በጣም ታዋቂ' },
        { value: 'trending', label: 'አዝማሚያ' },
        { value: 'alphabetical', label: 'በፊደል ቅደም ተከተል' }
      ],
      popularTags: [
        'አርቴፊሻል ኢንተለጀንስ', 'ማሽን ለርኒንግ', 'ኳንተም ኮምፒውቲንግ', 'ብሎክቼይን',
        'IoT', 'ሮቦቲክስ', 'ዳታ ሳይንስ', 'ክላውድ ኮምፒውቲንግ', 'ሳይበር ሴኩሪቲ', 'ፈጠራ'
      ]
    },

    featured: {
      title: "ተለይተው የቀረቡ ታሪኮች",
      description: "በቴክኖሎጂ እና ፈጠራ ውስጥ ከመሪ ባለሙያዎች በጣም ተፅዕኖ ፈጣሪ መጣጥፎቻችንን እና ግንዛቤዎችን ያግኙ።",
      readMore: "ተጨማሪ ያንብቡ",
      trendingTopics: "ታዋቂ ርዕሶች",
      featured: "ተለይቶ የቀረበ",
      posts: [
        {
          id: 1,
          title: "የ AI ወደፊት በአፍሪካ ትምህርት፡ የመማሪያ መልክዓ ምድሮችን መቀየር",
          excerpt: "አርቴፊሻል ኢንተለጀንስ በአፍሪካ ውስጥ የትምህርት ስርዓቶችን እንዴት እያብዮት እንደሆነ መመርመር፣ ከግል ትምህርት እስከ አውቶማቲክ ግምገማ መሳሪያዎች።",
          author: { name: "ዶ/ር ሳራ ኦኮንክዎ", role: "የ AI ምርምር ዳይሬክተር" },
          category: "AI እና ማሽን ለርኒንግ",
          publishDate: "2024-03-15",
          readTime: "8 ደቂቃ ንባብ",
          tags: ["አርቴፊሻል ኢንተለጀንስ", "ትምህርት", "አፍሪካ", "ፈጠራ"],
          stats: { views: 12500, comments: 45, likes: 230 }
        },
        {
          id: 2,
          title: "የኳንተም ኮምፒውቲንግ ግኝቶች፡ ለአፍሪካ ቴክ ምን ማለት ነው",
          excerpt: "የቅርብ ጊዜ የኳንተም ኮምፒውቲንግ ቴክኖሎጂ እድገቶች እና በአፍሪካ ኢንዱስትሪዎች ውስጥ ውስብስብ ችግሮችን ለመፍታት ሊኖራቸው የሚችለው ተፅእኖ።",
          author: { name: "ፕሮፌሰር ማይክል አዴባዮ", role: "የኳንተም ምርምር መሪ" },
          category: "ቴክኖሎጂ",
          publishDate: "2024-03-12",
          readTime: "12 ደቂቃ ንባብ",
          tags: ["ኳንተም ኮምፒውቲንግ", "ቴክኖሎጂ", "ምርምር", "ፈጠራ"],
          stats: { views: 8900, comments: 32, likes: 156 }
        },
        {
          id: 3,
          title: "ዘላቂ የቴክ መፍትሄዎች፡ አረንጓዴ የፈጠራ ማዕከላትን መገንባት",
          excerpt: "የአፍሪካ ቴክ ኩባንያዎች በዘላቂ የቴክኖሎጂ ልማት እና የአካባቢ ጥበቃ ውስጥ እንዴት መሪነትን እየወሰዱ እንደሆነ።",
          author: { name: "ዶ/ር አሚና ሀሰን", role: "የዘላቂነት ዳይሬክተር" },
          category: "ዘላቂነት",
          publishDate: "2024-03-10",
          readTime: "6 ደቂቃ ንባብ",
          tags: ["ዘላቂነት", "አረንጓዴ ቴክ", "ፈጠራ", "አካባቢ"],
          stats: { views: 6700, comments: 28, likes: 189 }
        }
      ]
    },

    blogGrid: {
      allPosts: "ሁሉም ልጥፎች",
      postsFound: "ልጥፎች ተገኝተዋል",
      postFound: "ልጥፍ ተገኝቷል",
      comments: "አስተያየቶች",
      likes: "መውደዶች",
      readFullArticle: "ሙሉ መጣጥፍ ያንብቡ →",
      posts: [
        {
          id: 1,
          title: "በአፍሪካ የጤና እንክብካቤ ስርዓቶች ውስጥ የማሽን ለርኒንግ አፕሊኬሽኖች",
          excerpt: "ML ስልተ ቀመሮች በአፍሪካ የጤና እንክብካቤ ተቋማት ውስጥ የምርመራ ትክክለኛነትን እና የታካሚ ውጤቶችን ለማሻሻል እንዴት እየተሰማሩ እንደሆነ መመርመር።",
          author: { name: "ዶ/ር ክዋሜ አሳንቴ", role: "የጤና AI ተመራማሪ" },
          category: "ai-ml",
          publishDate: "2024-03-18",
          readTime: "7 ደቂቃ ንባብ",
          tags: ["ማሽን ለርኒንግ", "ጤና እንክብካቤ", "AI", "አፍሪካ"],
          stats: { views: 8500, comments: 34, likes: 167 }
        },
        {
          id: 2,
          title: "ለአቅርቦት ሰንሰለት ግልፅነት የብሎክቼይን ቴክኖሎጂ",
          excerpt: "ብሎክቼይን የአቅርቦት ሰንሰለት አስተዳደርን እንዴት እያብዮት እና በአፍሪካ የግብርና ገበያዎች ውስጥ ግልፅነትን እየፈጠረ እንደሆነ።",
          author: { name: "ሳራ ኦካፎር", role: "የብሎክቼይን ገንቢ" },
          category: "technology",
          publishDate: "2024-03-16",
          readTime: "5 ደቂቃ ንባብ",
          tags: ["ብሎክቼይን", "አቅርቦት ሰንሰለት", "ግብርና", "ግልፅነት"],
          stats: { views: 6200, comments: 28, likes: 134 }
        },
        {
          id: 3,
          title: "በአፍሪካ ውስጥ ለስማርት ከተሞች IoT መፍትሄዎች",
          excerpt: "በአፍሪካ ከተሞች ውስጥ የበለጠ ስማርት እና ቀልጣፋ የከተማ አካባቢዎችን ለመፍጠር የኢንተርኔት ኦፍ ቲንግስ ቴክኖሎጂዎችን መተግበር።",
          author: { name: "ፕሮፌሰር አህመድ ሀሰን", role: "የ IoT ምርምር ዳይሬክተር" },
          category: "technology",
          publishDate: "2024-03-14",
          readTime: "9 ደቂቃ ንባብ",
          tags: ["IoT", "ስማርት ከተሞች", "የከተማ እቅድ", "ቴክኖሎጂ"],
          stats: { views: 7800, comments: 42, likes: 198 }
        }
      ]
    },

    sidebar: {
      searchPosts: "ልጥፎችን ፈልግ",
      searchPlaceholder: "መጣጥፎችን ፈልግ...",
      categories: "ምድቦች",
      popularTags: "ታዋቂ መለያዎች",
      recentPosts: "የቅርብ ጊዜ ልጥፎች",
      viewAllPosts: "ሁሉንም ልጥፎች ይመልከቱ",
      topAuthors: "ምርጥ ደራሲዎች",
      stayUpdated: "ወቅታዊ ይሁኑ",
      stayUpdatedDescription: "የቅርብ ጊዜ ግንዛቤዎችን እና መጣጥፎችን ወደ ኢሜልዎ ይቀበሉ።",
      emailPlaceholder: "ኢሜልዎን ያስገቡ",
      subscribeButton: "ይመዝገቡ",
      posts: "ልጥፎች",
      categoriesList: [
        { name: 'ቴክኖሎጂ', count: 45 },
        { name: 'AI እና ማሽን ለርኒንግ', count: 38 },
        { name: 'ምርምር እና ልማት', count: 32 },
        { name: 'ትምህርት', count: 28 },
        { name: 'ፈጠራ', count: 25 },
        { name: 'ዘላቂነት', count: 22 }
      ],
      popularTagsList: [
        { name: 'አርቴፊሻል ኢንተለጀንስ', count: 45, trending: true },
        { name: 'ማሽን ለርኒንግ', count: 38, trending: true },
        { name: 'ብሎክቼይን', count: 32, trending: false },
        { name: 'IoT', count: 28, trending: true },
        { name: 'ሳይበር ሴኩሪቲ', count: 25, trending: false },
        { name: 'ዘላቂነት', count: 22, trending: true },
        { name: 'EdTech', count: 20, trending: false },
        { name: 'ፈጠራ', count: 18, trending: false },
        { name: 'ምርምር', count: 15, trending: false },
        { name: 'ስታርትአፕስ', count: 12, trending: false }
      ],
      recentPostsList: [
        { id: 1, title: "AI ስነ-ምግባር በአፍሪካ አውድ", author: "ዶ/ር ሳራ ኦኮንክዎ", date: "2024-03-18", readTime: "5 ደቂቃ" },
        { id: 2, title: "የኳንተም ኮምፒውቲንግ እድገቶች", author: "ፕሮፌሰር ማይክል አዴባዮ", date: "2024-03-16", readTime: "8 ደቂቃ" },
        { id: 3, title: "አረንጓዴ ቴክ መፍትሄዎች", author: "ዶ/ር አሚና ሀሰን", date: "2024-03-14", readTime: "6 ደቂቃ" },
        { id: 4, title: "የዲጂታል ትራንስፎርሜሽን አዝማሚያዎች", author: "ግሬስ ምዋንጊ", date: "2024-03-12", readTime: "7 ደቂቃ" }
      ],
      topAuthorsList: [
        { name: "ዶ/ር ሳራ ኦኮንክዎ", role: "የ AI ምርምር ዳይሬክተር", posts: 15, expertise: ["AI", "ማሽን ለርኒንግ", "ስነ-ምግባር"] },
        { name: "ፕሮፌሰር ማይክል አዴባዮ", role: "የኳንተም ምርምር መሪ", posts: 12, expertise: ["ኳንተም ኮምፒውቲንግ", "ፊዚክስ", "ምርምር"] },
        { name: "ዶ/ር አሚና ሀሰን", role: "የዘላቂነት ዳይሬክተር", posts: 10, expertise: ["ዘላቂነት", "አረንጓዴ ቴክ", "አካባቢ"] }
      ]
    },

    authorSpotlight: {
      title: "የደራሲ ትኩረት",
      description: "ከይዘታችን በስተጀርባ ያሉትን ብሩህ አእምሮዎች ያግኙ። ወደፊት የቴክኖሎጂን የሚቀርጹ መሪ ባለሙያዎች እና ተመራማሪዎች ይማሩ።",
      about: "ስለ",
      expertise: "የባለሙያነት ቦታዎች",
      achievements: "ቁልፍ ስኬቶች",
      recentArticles: "የቅርብ ጊዜ መጣጥፎች",
      viewAllArticles: "ሁሉንም መጣጥፎች ይመልከቱ",
      articles: "መጣጥፎች",
      citations: "ጥቅሶች",
      yearsExp: "ዓመታት ልምድ",
      students: "ተማሪዎች",
      views: "እይታዎች",
      authors: [
        {
          id: 1,
          name: "ዶ/ር ሳራ ኦኮንክዎ",
          role: "የ AI ምርምር ዳይሬክተር",
          avatar: "/src/assets/CEO-IzCm-iny.jpg",
          bio: "ከ15 ዓመታት በላይ በማሽን ለርኒንግ እና አርቴፊሻል ኢንተለጀንስ ልምድ ያላት መሪ AI ተመራማሪ። ለአፍሪካ ፈተናዎች ስነ-ምግባራዊ AI መፍትሄዎችን ለማዘጋጀት ፍላጎት አላት።",
          location: "ላጎስ፣ ናይጄሪያ",
          expertise: ["አርቴፊሻል ኢንተለጀንስ", "ማሽን ለርኒንግ", "በ AI ውስጥ ስነ-ምግባር", "ኮምፒውተር ቪዥን"],
          achievements: [
            "በከፍተኛ ደረጃ ጆርናሎች ውስጥ 50+ የምርምር ወረቀቶችን አትሟል",
            "በ AI ስነ-ምግባር ላይ TEDx ተናጋሪ",
            "የ2023 የአፍሪካ ፈጠራ ሽልማት አሸናፊ",
            "ለ100+ AI ተመራማሪዎች አማካሪ"
          ],
          stats: { articles: 25, citations: 1200, yearsExperience: 15, studentsSupervised: 45 },
          recentArticles: [
            { title: "የ AI ወደፊት በአፍሪካ ትምህርት", date: "2024-03-15", readTime: "8 ደቂቃ", views: 12500 },
            { title: "ስነ-ምግባራዊ AI ልማት መመሪያዎች", date: "2024-03-10", readTime: "6 ደቂቃ", views: 8900 },
            { title: "ለጤና እንክብካቤ ማሽን ለርኒንግ", date: "2024-03-05", readTime: "10 ደቂቃ", views: 15600 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/sarah-okonkwo",
            twitter: "https://twitter.com/sarahokonkwo",
            website: "https://sarahokonkwo.com"
          }
        },
        {
          id: 2,
          name: "ፕሮፌሰር ማይክል አዴባዮ",
          role: "የኳንተም ምርምር መሪ",
          avatar: "/src/assets/mentor-Cib0Zqml.jpg",
          bio: "የኳንተም ኮምፒውቲንግ ፈር ቀዳጅ እና ፕሮፌሰር በኳንተም ስልተ ቀመሮች እና ለአፍሪካ ቴክኖሎጂ ፈተናዎች አተገባበራቸው ላይ ግኝት ምርምር።",
          location: "ኬፕ ታውን፣ ደቡብ አፍሪካ",
          expertise: ["ኳንተም ኮምፒውቲንግ", "ኳንተም ስልተ ቀመሮች", "ክሪፕቶግራፊ", "ቲዎሬቲካል ፊዚክስ"],
          achievements: [
            "ለማመቻቸት አዲስ የኳንተም ስልተ ቀመሮችን አዘጋጅቷል",
            "የኳንተም አፍሪካ ተነሳሽነትን መሰረተ",
            "የኖቤል ሽልማት እጩነት ተቀባይ",
            "የ'ለአፍሪካ ኳንተም ኮምፒውቲንግ' መጽሐፍ ደራሲ"
          ],
          stats: { articles: 18, citations: 2100, yearsExperience: 20, studentsSupervised: 60 },
          recentArticles: [
            { title: "የኳንተም ኮምፒውቲንግ ግኝቶች", date: "2024-03-12", readTime: "12 ደቂቃ", views: 8900 },
            { title: "የኳንተም ክሪፕቶግራፊ አተገባበሮች", date: "2024-03-08", readTime: "9 ደቂቃ", views: 7200 },
            { title: "የኳንተም መሠረተ ልማት መገንባት", date: "2024-03-03", readTime: "11 ደቂቃ", views: 9800 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/michael-adebayo",
            twitter: "https://twitter.com/michaeladebayo",
            website: "https://michaeladebayo.com"
          }
        },
        {
          id: 3,
          name: "ዶ/ር አሚና ሀሰን",
          role: "የዘላቂነት ዳይሬክተር",
          avatar: "/src/assets/training-xgzfTKXW.jpg",
          bio: "በአፍሪካ ዙሪያ ለዘላቂ ልማት አረንጓዴ የቴክኖሎጂ መፍትሄዎችን ለማዘጋጀት ላይ ያተኮረ የአካባቢ መሐንዲስ እና የዘላቂነት ባለሙያ።",
          location: "ናይሮቢ፣ ኬንያ",
          expertise: ["ዘላቂ ቴክኖሎጂ", "ታዳሽ ኢነርጂ", "የአካባቢ ምህንድስና", "አረንጓዴ ፈጠራ"],
          achievements: [
            "20+ ዘላቂ የቴክኖሎጂ ፕሮጀክቶችን መርቷል",
            "የ2023 የተባበሩት መንግስታት ዘላቂነት ሻምፒዮን",
            "የግሪንቴክ አፍሪካ አውታረ መረብን መሰረተ",
            "ለአፍሪካ ልማት ባንክ አማካሪ"
          ],
          stats: { articles: 22, citations: 890, yearsExperience: 12, studentsSupervised: 35 },
          recentArticles: [
            { title: "ዘላቂ የቴክ መፍትሄዎች", date: "2024-03-10", readTime: "6 ደቂቃ", views: 6700 },
            { title: "የታዳሽ ኢነርጂ ፈጠራ", date: "2024-03-06", readTime: "8 ደቂቃ", views: 5400 },
            { title: "የአረንጓዴ ቴክኖሎጂ አዝማሚያዎች", date: "2024-03-01", readTime: "7 ደቂቃ", views: 7800 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/sarah-okonkwo",
            twitter: "https://twitter.com/sarahokonkwo",
            website: "https://sarahokonkwo.com"
          }
        }
      ]
    },

    newsletter: {
      title: "ከጊዜ ቀድመው ይሁኑ",
      description: "በሺዎች የሚቆጠሩ የቴክኖሎጂ ወዳጆችን ይቀላቀሉ እና የቅርብ ጊዜ ግንዛቤዎችን፣ ምርምሮችን እና ፈጠራዎችን ወደ ኢሜልዎ ይቀበሉ።",
      emailLabel: "የኢሜይል አድራሻ",
      emailPlaceholder: "የኢሜይል አድራሻዎን ያስገቡ",
      frequencyLabel: "ምን ያህል ጊዜ ከእኛ መስማት ይፈልጋሉ?",
      topicsLabel: "የሚስብዎት ርዕሶች (አማራጭ)",
      subscribeButton: "አሁን ይመዝገቡ",
      subscribing: "በመመዝገብ ላይ...",
      privacyNotice: "በመመዝገብ፣ ለግላዊነት ፖሊሲያችን እና የአገልግሎት ውሎቻችን ተስማምተዋል። በማንኛውም ጊዜ ምዝገባዎን መሰረዝ ይችላሉ።",
      successTitle: "ወደ ማህበረሰባችን እንኳን ደህና መጡ!",
      successMessage: "ለኢትሮኒክስ ብሎግ ጋዜጣ ስለተመዘገቡ እናመሰግናለን። የመጀመሪያውን ዳይጀስት በቅርቡ ይቀበላሉ!",
      managePreferences: "ምርጫዎችን ያስተዳድሩ",
      browsePosts: "የቅርብ ጊዜ ልጥፎችን ያስሱ",
      whatYouGet: "ምን ያገኛሉ:",
      benefits: [
        "ከኢንዱስትሪ ባለሙያዎች ልዩ ግንዛቤዎች",
        "ለምርምር ህትመቶች ቀደም ብሎ መድረስ",
        "ለፍላጎትዎ የተበጀ የተመረጠ ይዘት",
        "ለዌብናሮች እና ዝግጅቶች ግብዣዎች",
        "ስፓም የለም፣ በማንኛውም ጊዜ ምዝገባ ይሰርዙ"
      ],
      stats: [
        { value: "25K+", label: "ደንበኞች" },
        { value: "98%", label: "የመክፈቻ መጠን" },
        { value: "3x", label: "በሳምንት" }
      ],
      frequencies: [
        { value: 'daily', label: 'ዕለታዊ ዳይጀስት', description: 'በየቀኑ የቅርብ ጊዜ ልጥፎችን ይቀበሉ' },
        { value: 'weekly', label: 'ሳምንታዊ ማጠቃለያ', description: 'በሳምንት የተላለፈ ምርጥ ይዘት' },
        { value: 'monthly', label: 'ወርሃዊ ድምቀቶች', description: 'የወሩ ምርጥ ታሪኮች' }
      ],
      topics: [
        { id: 'ai-ml', label: 'AI እና ማሽን ለርኒንግ', icon: '🤖' },
        { id: 'blockchain', label: 'ብሎክቼይን', icon: '⛓️' },
        { id: 'iot', label: 'ኢንተርኔት ኦፍ ቲንግስ', icon: '🌐' },
        { id: 'sustainability', label: 'ዘላቂነት', icon: '🌱' },
        { id: 'research', label: 'ምርምር እና ልማት', icon: '🔬' },
        { id: 'education', label: 'የትምህርት ቴክኖሎጂ', icon: '📚' },
        { id: 'innovation', label: 'ፈጠራ', icon: '💡' },
        { id: 'cybersecurity', label: 'ሳይበር ሴኩሪቲ', icon: '🔒' }
      ]
    }
  },

  om: {
    // Hero Section
    hero: {
      title: "Biloogii Ethronics",
      description: "Hubannoo, kalaqaa fi seenaa fuula duraa teeknooloojii irraa. Yaada keenya waa'ee AI, qorannoo, barnoota fi fuula duraa teekii Afrikaa keessatti qoradhu.",
      stats: [
        { value: "150+", label: "Maxxansa Biloogii" },
        { value: "25+", label: "Barreessitoota Ogummaa" },
        { value: "50K+", label: "Dubbistota Ji'aa" },
        { value: "12", label: "Ramaddii" }
      ],
      buttons: {
        latest: "Maxxansa Yeroo Ammaa",
        subscribe: "Galmaa'i"
      }
    },

    filter: {
      searchPlaceholder: "Maxxansa biloogii, mata-duree, barreessitoota barbaadi...",
      categoriesLabel: "Ramaddii:",
      tagsLabel: "Mallattoowwan beekamoo:",
      activeFilters: "Calaltoota hojii irra jiran:",
      clearAll: "Hunda qulqulleessi",
      category: "Ramaddii",
      tag: "Mallattoo",
      search: "Barbaadi",
      categories: [
        { value: 'all', label: 'Maxxansa Hunda', count: 150 },
        { value: 'technology', label: 'Teeknooloojii', count: 35 },
        { value: 'ai-ml', label: 'AI fi Barumsa Maashinii', count: 28 },
        { value: 'research', label: 'Qorannoo fi Misooma', count: 22 },
        { value: 'education', label: 'Barnoota', count: 18 },
        { value: 'innovation', label: 'Kalaqaa', count: 15 },
        { value: 'sustainability', label: 'Itti Fufiinsa', count: 12 },
        { value: 'entrepreneurship', label: 'Daldala', count: 10 },
        { value: 'partnerships', label: 'Hiriyummaa', count: 8 },
        { value: 'community', label: 'Hawaasa', count: 6 }
      ],
      sortOptions: [
        { value: 'newest', label: 'Haaraa Jalqaba' },
        { value: 'oldest', label: 'Moofaa Jalqaba' },
        { value: 'popular', label: 'Baay\'ee Beekamaa' },
        { value: 'trending', label: 'Agarsiisaa' },
        { value: 'alphabetical', label: 'Tartiiba Qubee' }
      ],
      popularTags: [
        'Sammuu Namtolchee', 'Barumsa Maashinii', 'Herrega Kuwaantam', 'Bilookicheen',
        'IoT', 'Rooboorikisii', 'Saayinsii Daataa', 'Herrega Duumessaa', 'Nageenyaa Saayibarii', 'Kalaqaa'
      ]
    },

    featured: {
      title: "Seenaa Adda Baafaman",
      description: "Barruulee keenya baay'ee dhiibbaa qaban fi hubannoo ogeeyyii hooggantoota teeknooloojii fi kalaqaa irraa argadhu.",
      readMore: "Dabalataan Dubbisi",
      trendingTopics: "Mata-dureewwan Beekamoo",
      featured: "Adda Baafame",
      posts: [
        {
          id: 1,
          title: "Fuula Duraa AI Barnoota Afrikaa Keessatti: Mul'ata Barumsaa Jijjiiruun",
          excerpt: "Sammuu namtolchee sirna barnoota Afrikaa guutuu keessatti akkamitti warraaqsa fidaa jiru qorachuu, barumsa dhuunfaa irraa kaasee hanga meeshaalee madaallii ofumaan hojjetaniitti.",
          author: { name: "Dr. Saaraa Okoonkwoo", role: "Hogganaa Qorannoo AI" },
          category: "AI fi Barumsa Maashinii",
          publishDate: "2024-03-15",
          readTime: "Daqiiqaa 8 dubbisuu",
          tags: ["Sammuu Namtolchee", "Barnoota", "Afrikaa", "Kalaqaa"],
          stats: { views: 12500, comments: 45, likes: 230 }
        },
        {
          id: 2,
          title: "Argannoo Herrega Kuwaantam: Teekii Afrikaa Maal Jechuudha",
          excerpt: "Guddina yeroo ammaa teeknooloojii herrega kuwaantam fi dhiibbaa isaan rakkoolee walxaxaa industirii Afrikaa keessatti furuu danda'an.",
          author: { name: "Piroofesara Maayikil Adebaayo", role: "Hogganaa Qorannoo Kuwaantam" },
          category: "Teeknooloojii",
          publishDate: "2024-03-12",
          readTime: "Daqiiqaa 12 dubbisuu",
          tags: ["Herrega Kuwaantam", "Teeknooloojii", "Qorannoo", "Kalaqaa"],
          stats: { views: 8900, comments: 32, likes: 156 }
        },
        {
          id: 3,
          title: "Furmaata Teekii Itti Fufiinsaa: Giddugala Kalaqaa Magariisaa Ijaaruu",
          excerpt: "Dhaabbileen teekii Afrikaa misooma teeknooloojii itti fufiinsaa fi kunuunsa naannoo keessatti akkamitti hoogganummaa fudhachaa jiran.",
          author: { name: "Dr. Amiinaa Hasaan", role: "Hogganaa Itti Fufiinsa" },
          category: "Itti Fufiinsa",
          publishDate: "2024-03-10",
          readTime: "Daqiiqaa 6 dubbisuu",
          tags: ["Itti Fufiinsa", "Teekii Magariisaa", "Kalaqaa", "Naannoo"],
          stats: { views: 6700, comments: 28, likes: 189 }
        }
      ]
    },

    blogGrid: {
      allPosts: "Maxxansa Hunda",
      postsFound: "maxxansawwan argaman",
      postFound: "maxxansa argame",
      comments: "yaada",
      likes: "jaallata",
      readFullArticle: "Barruulee Guutuu Dubbisi →",
      posts: [
        {
          id: 1,
          title: "Fayyadama Barumsa Maashinii Sirna Eegumsa Fayyaa Afrikaa Keessatti",
          excerpt: "Algoritmoonni ML dhaabbilee eegumsa fayyaa Afrikaa keessatti sirrii ta'uu qorannoo fi bu'aa dhukkubsataa fooyyessuuf akkamitti bobba'amaa jiran qorachuu.",
          author: { name: "Dr. Kwaame Asaantee", role: "Qorattaa AI Fayyaa" },
          category: "ai-ml",
          publishDate: "2024-03-18",
          readTime: "Daqiiqaa 7 dubbisuu",
          tags: ["Barumsa Maashinii", "Eegumsa Fayyaa", "AI", "Afrikaa"],
          stats: { views: 8500, comments: 34, likes: 167 }
        },
        {
          id: 2,
          title: "Teeknooloojii Bilookicheen Iftoomina Sarara Dhiyeessii",
          excerpt: "Bilookicheen bulchiinsa sarara dhiyeessii akkamitti warraaqsa fidaa fi gabaa qonnaa Afrikaa keessatti iftoomina uumaa jiru.",
          author: { name: "Saaraa Okaafor", role: "Misoomtuu Bilookicheen" },
          category: "technology",
          publishDate: "2024-03-16",
          readTime: "Daqiiqaa 5 dubbisuu",
          tags: ["Bilookicheen", "Sarara Dhiyeessii", "Qonnaa", "Iftoomina"],
          stats: { views: 6200, comments: 28, likes: 134 }
        },
        {
          id: 3,
          title: "Furmaata IoT Magaalota Ismaartii Afrikaa Keessatti",
          excerpt: "Teeknooloojii Intarneetii Wantoota naannoo magaalaa ismaartii fi gahumsa qabu magaalota Afrikaa keessatti uumuuf hojiirra oolchuu.",
          author: { name: "Piroofesara Ahimad Hasaan", role: "Hogganaa Qorannoo IoT" },
          category: "technology",
          publishDate: "2024-03-14",
          readTime: "Daqiiqaa 9 dubbisuu",
          tags: ["IoT", "Magaalota Ismaartii", "Karoora Magaalaa", "Teeknooloojii"],
          stats: { views: 7800, comments: 42, likes: 198 }
        }
      ]
    },

    sidebar: {
      searchPosts: "Maxxansa Barbaadi",
      searchPlaceholder: "Barruulee barbaadi...",
      categories: "Ramaddii",
      popularTags: "Mallattoowwan Beekamoo",
      recentPosts: "Maxxansa Yeroo Ammaa",
      viewAllPosts: "Maxxansa Hunda Ilaali",
      topAuthors: "Barreessitoota Olaanoo",
      stayUpdated: "Yeroo Ammaa Ta'aa",
      stayUpdatedDescription: "Hubannoo fi barruulee yeroo ammaa gara imeelii keetti argadhu.",
      emailPlaceholder: "Imeelii kee galchi",
      subscribeButton: "Galmaa'i",
      posts: "maxxansawwan",
      categoriesList: [
        { name: 'Teeknooloojii', count: 45 },
        { name: 'AI fi Barumsa Maashinii', count: 38 },
        { name: 'Qorannoo fi Misooma', count: 32 },
        { name: 'Barnoota', count: 28 },
        { name: 'Kalaqaa', count: 25 },
        { name: 'Itti Fufiinsa', count: 22 }
      ],
      popularTagsList: [
        { name: 'Sammuu Namtolchee', count: 45, trending: true },
        { name: 'Barumsa Maashinii', count: 38, trending: true },
        { name: 'Bilookicheen', count: 32, trending: false },
        { name: 'IoT', count: 28, trending: true },
        { name: 'Nageenyaa Saayibarii', count: 25, trending: false },
        { name: 'Itti Fufiinsa', count: 22, trending: true },
        { name: 'EdTech', count: 20, trending: false },
        { name: 'Kalaqaa', count: 18, trending: false },
        { name: 'Qorannoo', count: 15, trending: false },
        { name: 'Istaartiappii', count: 12, trending: false }
      ],
      recentPostsList: [
        { id: 1, title: "Naamusa AI Haala Afrikaa Keessatti", author: "Dr. Saaraa Okoonkwoo", date: "2024-03-18", readTime: "Daqiiqaa 5" },
        { id: 2, title: "Guddina Herrega Kuwaantam", author: "Piroofesara Maayikil Adebaayo", date: "2024-03-16", readTime: "Daqiiqaa 8" },
        { id: 3, title: "Furmaata Teekii Magariisaa", author: "Dr. Amiinaa Hasaan", date: "2024-03-14", readTime: "Daqiiqaa 6" },
        { id: 4, title: "Adeemsa Jijjiirama Dijitaalaa", author: "Gireesii Mwaangii", date: "2024-03-12", readTime: "Daqiiqaa 7" }
      ],
      topAuthorsList: [
        { name: "Dr. Saaraa Okoonkwoo", role: "Hogganaa Qorannoo AI", posts: 15, expertise: ["AI", "Barumsa Maashinii", "Naamusa"] },
        { name: "Piroofesara Maayikil Adebaayo", role: "Hogganaa Qorannoo Kuwaantam", posts: 12, expertise: ["Herrega Kuwaantam", "Fiizikisii", "Qorannoo"] },
        { name: "Dr. Amiinaa Hasaan", role: "Hogganaa Itti Fufiinsa", posts: 10, expertise: ["Itti Fufiinsa", "Teekii Magariisaa", "Naannoo"] }
      ]
    },

    authorSpotlight: {
      title: "Xiyyeeffannoo Barreessitootaa",
      description: "Sammuu calaqqisaa qabiyyee keenyaa duubaan jiru argadhu. Ogeeyyii fi qorattota fuula duraa teeknooloojii bocuutti jiran irraa baradhu.",
      about: "Waa'ee",
      expertise: "Naannoo Ogummaa",
      achievements: "Milkaa'ina Ijoo",
      recentArticles: "Barruulee Yeroo Ammaa",
      viewAllArticles: "Barruulee Hunda Ilaali",
      articles: "Barruulee",
      citations: "Wabeeffannaa",
      yearsExp: "Waggaa Muuxannoo",
      students: "Barattootaa",
      views: "mul'ata",
      authors: [
        {
          id: 1,
          name: "Dr. Saaraa Okoonkwoo",
          role: "Hogganaa Qorannoo AI",
          avatar: "/src/assets/CEO-IzCm-iny.jpg",
          bio: "Qorattuu AI hoogganaa muuxannoo waggaa 15 ol barumsa maashinii fi sammuu namtolchee keessatti qabu. Furmaata AI naamusa qabu qormaata Afrikaa dhaaf qopheessuuf fedhii qabdi.",
          location: "Laagoos, Naayijeeriyaa",
          expertise: ["Sammuu Namtolchee", "Barumsa Maashinii", "Naamusa AI Keessatti", "Mul'ata Kompiitaraa"],
          achievements: [
            "Waraqaa qorannoo 50+ gaazexoota sadarkaa olaanaa keessatti maxxansite",
            "Haasoftuu TEDx Naamusa AI irratti",
            "Injifataa Badhaasa Kalaqaa Afrikaa 2023",
            "Gorsituu qorattota AI 100+ ta'uu"
          ],
          stats: { articles: 25, citations: 1200, yearsExperience: 15, studentsSupervised: 45 },
          recentArticles: [
            { title: "Fuula Duraa AI Barnoota Afrikaa Keessatti", date: "2024-03-15", readTime: "Daqiiqaa 8", views: 12500 },
            { title: "Qajeelfama Misooma AI Naamusaa", date: "2024-03-10", readTime: "Daqiiqaa 6", views: 8900 },
            { title: "Barumsa Maashinii Eegumsa Fayyaaf", date: "2024-03-05", readTime: "Daqiiqaa 10", views: 15600 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/sarah-okonkwo",
            twitter: "https://twitter.com/sarahokonkwo",
            website: "https://sarahokonkwo.com"
          }
        },
        {
          id: 2,
          name: "Piroofesara Maayikil Adebaayo",
          role: "Hogganaa Qorannoo Kuwaantam",
          avatar: "/src/assets/mentor-Cib0Zqml.jpg",
          bio: "Piroofesaraa fi piroofesara herrega kuwaantam qorannoo argannoo algoritmoonni kuwaantam fi fayyadama isaanii qormaata teeknooloojii Afrikaa keessatti qabu irratti.",
          location: "Keeppii Taawun, Afrikaa Kibbaa",
          expertise: ["Herrega Kuwaantam", "Algoritmoonni Kuwaantam", "Kiriiptoograafiif", "Fiizikisii Tiyoorii"],
          achievements: [
            "Algoritmoonni kuwaantam haaraa fooyyessuuf qopheesse",
            "Karoora Kuwaantam Afrikaa hundeesse",
            "Filannoo Badhaasa Noobeel argatte",
            "Barreessaa kitaaba 'Herrega Kuwaantam Afrikaa Dhaaf'"
          ],
          stats: { articles: 18, citations: 2100, yearsExperience: 20, studentsSupervised: 60 },
          recentArticles: [
            { title: "Argannoo Herrega Kuwaantam", date: "2024-03-12", readTime: "Daqiiqaa 12", views: 8900 },
            { title: "Fayyadama Kiriiptoograafiif Kuwaantam", date: "2024-03-08", readTime: "Daqiiqaa 9", views: 7200 },
            { title: "Bu'uura Kuwaantam Ijaaruu", date: "2024-03-03", readTime: "Daqiiqaa 11", views: 9800 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/michael-adebayo",
            twitter: "https://twitter.com/michaeladebayo",
            website: "https://michaeladebayo.com"
          }
        },
        {
          id: 3,
          name: "Dr. Amiinaa Hasaan",
          role: "Hogganaa Itti Fufiinsa",
          avatar: "/src/assets/training-xgzfTKXW.jpg",
          bio: "Injinara naannoo fi ogeessa itti fufiinsa furmaata teeknooloojii magariisaa misooma itti fufiinsaa Afrikaa guutuu keessatti qopheessuuf xiyyeeffate.",
          location: "Naayiroobii, Keenyaa",
          expertise: ["Teeknooloojii Itti Fufiinsaa", "Anniisaa Haaromfamaa", "Injinariingi Naannoo", "Kalaqaa Magariisaa"],
          achievements: [
            "Pirojektoota teeknooloojii itti fufiinsaa 20+ hoogganite",
            "Shaampiyoonii Itti Fufiinsa UN 2023",
            "Networkii GreenTech Afrikaa hundeessite",
            "Gorsituu Baankii Misooma Afrikaa"
          ],
          stats: { articles: 22, citations: 890, yearsExperience: 12, studentsSupervised: 35 },
          recentArticles: [
            { title: "Furmaata Teekii Itti Fufiinsaa", date: "2024-03-10", readTime: "Daqiiqaa 6", views: 6700 },
            { title: "Kalaqaa Anniisaa Haaromfamaa", date: "2024-03-06", readTime: "Daqiiqaa 8", views: 5400 },
            { title: "Adeemsa Teeknooloojii Magariisaa", date: "2024-03-01", readTime: "Daqiiqaa 7", views: 7800 }
          ],
          social: {
            linkedin: "https://linkedin.com/in/amina-hassan",
            twitter: "https://twitter.com/aminahassan",
            website: "https://aminahassan.com"
          }
        }
      ]
    },

    newsletter: {
      title: "Fuula Duratti Ta'aa",
      description: "Jaallattoota teeknooloojii kumaatamaan waliin ta'uun hubannoo, qorannoo fi kalaqaa yeroo ammaa gara imeelii keetti argadhu.",
      emailLabel: "Teessoo Imeelii",
      emailPlaceholder: "Teessoo imeelii kee galchi",
      frequencyLabel: "Yeroo hammam nuurraa dhagahuu barbaadda?",
      topicsLabel: "Mata-dureewwan si hawwatan (filannoo)",
      subscribeButton: "Amma Galmaa'i",
      subscribing: "Galmaa'aa jira...",
      privacyNotice: "Galmaa'uudhaan, Imaammata Iccitii fi Haalota Tajaajila keenyaaf walii galtee. Yeroo kamiyyuu galmaa'uu dhiisuu dandeessa.",
      successTitle: "Gara Hawaasa Keenyaatti Baga Nagaan Dhuftan!",
      successMessage: "Gaazexaa Biloogii Ethronics galmaa'uuf galatoomaa. Daayijestii jalqabaa yeroo gabaabaa keessatti argatta!",
      managePreferences: "Filannoo Bulchi",
      browsePosts: "Maxxansa Yeroo Ammaa Sakatta'i",
      whatYouGet: "Maal argatta:",
      benefits: [
        "Hubannoo addaa ogeeyyii industirii irraa",
        "Maxxansa qorannoo dursitee argachuu",
        "Qabiyyee fedhii keef qophaa'e filatamaa",
        "Afeerraa webinaarii fi taateewwaniif",
        "Ispaamiin hin jiru, yeroo kamiyyuu galmaa'uu dhiisi"
      ],
      stats: [
        { value: "25K+", label: "Maamiltoota" },
        { value: "98%", label: "Sadarkaa Banuu" },
        { value: "3x", label: "Torbanitti" }
      ],
      frequencies: [
        { value: 'daily', label: 'Daayijestii Guyyaa', description: 'Guyyaa guyyaan maxxansa haaraa argadhu' },
        { value: 'weekly', label: 'Walitti Qabama Torbanaa', description: 'Qabiyyee gaarii torbanitti dhiyaatu' },
        { value: 'monthly', label: 'Calaqqisiisa Ji\'aa', description: 'Seenaa olaanaa ji\'aa' }
      ],
      topics: [
        { id: 'ai-ml', label: 'AI fi Barumsa Maashinii', icon: '🤖' },
        { id: 'blockchain', label: 'Bilookicheen', icon: '⛓️' },
        { id: 'iot', label: 'Intarneetii Wantoota', icon: '🌐' },
        { id: 'sustainability', label: 'Itti Fufiinsa', icon: '🌱' },
        { id: 'research', label: 'Qorannoo fi Misooma', icon: '🔬' },
        { id: 'education', label: 'Teeknooloojii Barnoota', icon: '📚' },
        { id: 'innovation', label: 'Kalaqaa', icon: '💡' },
        { id: 'cybersecurity', label: 'Nageenyaa Saayibarii', icon: '🔒' }
      ]
    }
  }
};
