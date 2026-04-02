export const newsEventsTranslations = {
  en: {
    // Hero Section
    hero: {
      title: "News & Events",
      description: "Stay updated with the latest developments, innovations, and events from Ethronics and the global technology community.",
      stats: {
        articles: { value: "250+", label: "News Articles" },
        events: { value: "50+", label: "Upcoming Events" },
        subscribers: { value: "15K+", label: "Newsletter Subscribers" },
        partners: { value: "100+", label: "Media Partners" }
      },
      buttons: {
        news: "Latest News",
        events: "View Events"
      }
    },

    // Filter Section
    filter: {
      tabs: [
        { id: "all", label: "All" },
        { id: "news", label: "News" },
        { id: "events", label: "Events" },
        { id: "awards", label: "Awards" },
        { id: "community", label: "Community" }
      ],
      searchPlaceholder: "Search news, events, announcements...",
      categories: [
        { value: "all", label: "All Categories" },
        { value: "technology", label: "Technology" },
        { value: "research", label: "Research & Development" },
        { value: "education", label: "Education" },
        { value: "partnerships", label: "Partnerships" },
        { value: "innovation", label: "Innovation" },
        { value: "sustainability", label: "Sustainability" },
        { value: "community", label: "Community" },
        { value: "awards", label: "Awards & Recognition" }
      ],
      dateOptions: [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "year", label: "This Year" }
      ],
      quickFiltersLabel: "Quick filters:",
      quickFilters: ["Breaking News", "Upcoming Events", "Research Updates", "Partnership News", "Awards"]
    },

    // Featured News Section
    featured: {
      title: "Featured Stories",
      description: "Discover the latest breakthroughs and developments from Ethronics",
      readMore: "Read More",
      read: "Read",
      by: "by",
      trendingTopics: "Trending Topics",
      tags: ["Artificial Intelligence", "Quantum Computing", "Smart Cities", "Sustainability", "Innovation", "Research", "Partnerships", "Education"],
      articles: [
        {
          id: 1,
          title: "Ethronics Launches Revolutionary AI-Powered Smart City Initiative",
          excerpt: "Our latest smart city project integrates AI, IoT, and sustainable technology to transform urban living in Ethiopia.",
          category: "Innovation",
          date: "2024-03-15",
          readTime: "5 min read",
          author: "Dr. Sarah Johnson",
          views: 2500
        },
        {
          id: 2,
          title: "Partnership with MIT: Advancing Quantum Computing Research",
          excerpt: "Ethronics partners with MIT to establish a quantum computing research center in Addis Ababa.",
          category: "Research",
          date: "2024-03-12",
          readTime: "4 min read",
          author: "Prof. Michael Chen",
          views: 1800
        },
        {
          id: 3,
          title: "Ethiopian Tech Summit 2024: Innovation Meets Opportunity",
          excerpt: "Join us at the largest technology conference in East Africa, featuring global speakers and cutting-edge innovations.",
          category: "Events",
          date: "2024-03-10",
          readTime: "3 min read",
          author: "Events Team",
          views: 3200
        }
      ]
    },

    // News Grid Section
    newsGrid: {
      title: "Latest Updates",
      found: "Found",
      articlesAndUpdates: "articles and updates",
      sortOptions: ["Sort by: Newest", "Sort by: Most Popular", "Sort by: Most Viewed", "Sort by: Oldest"],
      readMore: "Read More",
      by: "by",
      event: "Event",
      loadMore: "Load More Articles",
      noResults: "No articles found",
      noResultsDescription: "Try adjusting your search criteria or browse different categories",
      types: ["News", "Events", "Awards", "Community"],
      articles: [
        {
          id: 1,
          title: "Breakthrough in Renewable Energy Storage Technology",
          excerpt: "Ethronics researchers develop new battery technology that could revolutionize renewable energy storage.",
          category: "technology",
          type: "news",
          date: "2024-03-14",
          readTime: "6 min read",
          author: "Dr. Emily Rodriguez",
          views: 1500,
          tags: ["Renewable Energy", "Battery Technology", "Research"]
        },
        {
          id: 2,
          title: "Annual Tech Innovation Conference 2024",
          excerpt: "Join industry leaders and innovators at our flagship technology conference in Addis Ababa.",
          category: "community",
          type: "events",
          date: "2024-04-15",
          readTime: "2 min read",
          author: "Events Team",
          views: 2800,
          tags: ["Conference", "Innovation", "Networking"],
          eventDate: "2024-05-20",
          location: "Addis Ababa, Ethiopia"
        },
        {
          id: 3,
          title: "Ethronics Wins Excellence in Innovation Award",
          excerpt: "Recognition for outstanding contributions to technology advancement in Africa.",
          category: "awards",
          type: "awards",
          date: "2024-03-10",
          readTime: "4 min read",
          author: "Communications Team",
          views: 3200,
          tags: ["Awards", "Recognition", "Innovation"]
        },
        {
          id: 4,
          title: "New Partnership with European Space Agency",
          excerpt: "Collaborative research initiative to advance satellite technology and space exploration.",
          category: "partnerships",
          type: "news",
          date: "2024-03-08",
          readTime: "5 min read",
          author: "Dr. James Wilson",
          views: 1900,
          tags: ["Space Technology", "Partnership", "ESA"]
        },
        {
          id: 5,
          title: "Student Robotics Competition 2024",
          excerpt: "High school students showcase innovative robotics solutions at our annual competition.",
          category: "education",
          type: "events",
          date: "2024-03-05",
          readTime: "3 min read",
          author: "Education Team",
          views: 1200,
          tags: ["Robotics", "Education", "Students"],
          eventDate: "2024-04-10",
          location: "Ethronics Campus"
        },
        {
          id: 6,
          title: "Sustainable Manufacturing Initiative Launch",
          excerpt: "New program to promote environmentally friendly manufacturing practices across Ethiopia.",
          category: "sustainability",
          type: "news",
          date: "2024-03-03",
          readTime: "7 min read",
          author: "Sustainability Team",
          views: 2100,
          tags: ["Sustainability", "Manufacturing", "Environment"]
        }
      ]
    },

    // Newsletter Section
    newsletter: {
      title: "Stay Updated",
      description: "Subscribe to our newsletter and be the first to know about our latest innovations, events, and breakthrough discoveries.",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      topicsLabel: "What topics interest you? (Select at least one)",
      topics: ["Technology Updates", "Research & Development", "Events & Workshops", "Partnerships & Collaborations", "Innovation Stories", "Educational Programs"],
      frequencyLabel: "How often would you like to receive updates?",
      frequencies: ["Weekly", "Bi-weekly", "Monthly"],
      privacyNotice: "Privacy Notice: We respect your privacy and will never share your email address with third parties. You can unsubscribe at any time by clicking the link in our emails.",
      submitButton: "Subscribe to Newsletter",
      stats: [
        { value: "15K+", label: "Subscribers" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "Weekly", label: "Updates" }
      ],
      successTitle: "Welcome to Our Community!",
      successMessage: "Thank you for subscribing to our newsletter. You'll receive updates about the topics you selected.",
      subscribeAnother: "Subscribe Another Email"
    },

    // Media Center Section
    mediaCenter: {
      title: "Media Center",
      description: "Access our collection of photos, videos, press releases, and multimedia content",
      searchPlaceholder: "Search media...",
      categories: ["All Media", "Photos", "Videos", "Press Releases", "Podcasts"],
      types: ["Video", "Photo", "Press", "Podcast"],
      views: "views",
      viewButton: "View",
      pressKit: {
        title: "Press Kit & Brand Assets",
        description: "Download our official logos, brand guidelines, high-resolution photos, and other media assets for press and partnership use.",
        downloadButton: "Download Press Kit",
        guidelinesButton: "Brand Guidelines"
      },
      stats: [
        { value: "500+", label: "Photos" },
        { value: "150+", label: "Videos" },
        { value: "75+", label: "Press Releases" },
        { value: "50+", label: "Podcasts" }
      ],
      items: [
        {
          id: 1,
          title: "Ethronics Innovation Lab Tour",
          type: "video",
          category: "videos",
          date: "2024-03-15",
          duration: "5:32",
          views: 2500,
          description: "Take a virtual tour of our state-of-the-art innovation laboratory."
        },
        {
          id: 2,
          title: "AI Summit 2024 Highlights",
          type: "photo",
          category: "photos",
          date: "2024-03-12",
          views: 1800,
          description: "Key moments from our annual AI and technology summit."
        },
        {
          id: 3,
          title: "Quantum Computing Partnership Announcement",
          type: "press",
          category: "press",
          date: "2024-03-10",
          views: 3200,
          description: "Official press release announcing our partnership with leading quantum research institutions."
        },
        {
          id: 4,
          title: "Tech Talk: Future of Sustainable Technology",
          type: "podcast",
          category: "podcasts",
          date: "2024-03-08",
          duration: "45:20",
          views: 1500,
          description: "In-depth discussion about sustainable technology solutions and their impact."
        },
        {
          id: 5,
          title: "Student Innovation Showcase",
          type: "video",
          category: "videos",
          date: "2024-03-05",
          duration: "8:15",
          views: 2100,
          description: "Showcasing innovative projects from our student community."
        },
        {
          id: 6,
          title: "Research Facility Opening Ceremony",
          type: "photo",
          category: "photos",
          date: "2024-03-03",
          views: 1900,
          description: "Photos from the grand opening of our new research facility."
        }
      ]
    },

    // Events Calendar Section
    eventsCalendar: {
      title: "Events Calendar",
      description: "Stay updated with upcoming events, workshops, and conferences",
      viewModes: {
        month: "Month",
        list: "List"
      },
      buttons: {
        today: "Today",
        filter: "Filter",
        addEvent: "Add Event",
        viewDetails: "View Details",
        register: "Register",
        registerNow: "Register Now",
        addToCalendar: "Add to Calendar"
      },
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      more: "more",
      attendees: "attendees",
      organizedBy: "Organized by",
      by: "by",
      views: "views",
      eventsSection: "Events",
      newsSection: "News",
      noEvents: "No events scheduled for this date",
      noNews: "No news published on this date"
    }
  },

  am: {
    // Hero Section
    hero: {
      title: "ዜናዎች እና ዝግጅቶች",
      description: "ከኢትሮኒክስ እና ከዓለም አቀፍ የቴክኖሎጂ ማህበረሰብ የቅርብ ጊዜ እድገቶች፣ ፈጠራዎች እና ዝግጅቶች ጋር ወቅታዊ ይሁኑ።",
      stats: {
        articles: { value: "250+", label: "የዜና መጣጥፎች" },
        events: { value: "50+", label: "መጪ ዝግጅቶች" },
        subscribers: { value: "15K+", label: "የጋዜጣ ደንበኞች" },
        partners: { value: "100+", label: "የሚዲያ አጋሮች" }
      },
      buttons: {
        news: "የቅርብ ጊዜ ዜናዎች",
        events: "ዝግጅቶችን ይመልከቱ"
      }
    },

    // Filter Section
    filter: {
      tabs: [
        { id: "all", label: "ሁሉም" },
        { id: "news", label: "ዜናዎች" },
        { id: "events", label: "ዝግጅቶች" },
        { id: "awards", label: "ሽልማቶች" },
        { id: "community", label: "ማህበረሰብ" }
      ],
      searchPlaceholder: "ዜናዎችን፣ ዝግጅቶችን፣ ማስታወቂያዎችን ይፈልጉ...",
      categories: [
        { value: "all", label: "ሁሉም ምድቦች" },
        { value: "technology", label: "ቴክኖሎጂ" },
        { value: "research", label: "ምርምር እና ልማት" },
        { value: "education", label: "ትምህርት" },
        { value: "partnerships", label: "አጋርነቶች" },
        { value: "innovation", label: "ፈጠራ" },
        { value: "sustainability", label: "ዘላቂነት" },
        { value: "community", label: "ማህበረሰብ" },
        { value: "awards", label: "ሽልማቶች እና እውቅና" }
      ],
      dateOptions: [
        { value: "all", label: "ሁሉም ጊዜ" },
        { value: "today", label: "ዛሬ" },
        { value: "week", label: "በዚህ ሳምንት" },
        { value: "month", label: "በዚህ ወር" },
        { value: "year", label: "በዚህ ዓመት" }
      ],
      quickFiltersLabel: "ፈጣን ማጣሪያዎች:",
      quickFilters: ["አስቸኳይ ዜናዎች", "መጪ ዝግጅቶች", "የምርምር ዝመናዎች", "የአጋርነት ዜናዎች", "ሽልማቶች"]
    },

    // Featured News Section
    featured: {
      title: "ተለይተው የቀረቡ ታሪኮች",
      description: "ከኢትሮኒክስ የቅርብ ጊዜ ግኝቶችን እና እድገቶችን ያግኙ",
      readMore: "ተጨማሪ ያንብቡ",
      read: "አንብብ",
      by: "በ",
      trendingTopics: "ታዋቂ ርዕሶች",
      tags: ["አርቴፊሻል ኢንተለጀንስ", "ኳንተም ኮምፒውቲንግ", "ስማርት ከተሞች", "ዘላቂነት", "ፈጠራ", "ምርምር", "አጋርነቶች", "ትምህርት"],
      articles: [
        {
          id: 1,
          title: "ኢትሮኒክስ አብዮታዊ በ AI የሚንቀሳቀስ ስማርት ከተማ ፕሮጀክት ጀመረ",
          excerpt: "የቅርብ ጊዜ ስማርት ከተማ ፕሮጀክታችን AI፣ IoT እና ዘላቂ ቴክኖሎጂን በማዋሃድ በኢትዮጵያ የከተማ ኑሮን ለመቀየር ይሰራል።",
          category: "ፈጠራ",
          date: "2024-03-15",
          readTime: "5 ደቂቃ ንባብ",
          author: "ዶ/ር ሳራ ጆንሰን",
          views: 2500
        },
        {
          id: 2,
          title: "ከ MIT ጋር አጋርነት፡ የኳንተም ኮምፒውቲንግ ምርምርን ማሳደግ",
          excerpt: "ኢትሮኒክስ ከ MIT ጋር በመተባበር በአዲስ አበባ የኳንተም ኮምፒውቲንግ ምርምር ማዕከል ለማቋቋም ተስማምቷል።",
          category: "ምርምር",
          date: "2024-03-12",
          readTime: "4 ደቂቃ ንባብ",
          author: "ፕሮፌሰር ማይክል ቼን",
          views: 1800
        },
        {
          id: 3,
          title: "የኢትዮጵያ ቴክ ስብሰባ 2024፡ ፈጠራ እና እድል ይገናኛሉ",
          excerpt: "በምስራቅ አፍሪካ ትልቁ የቴክኖሎጂ ኮንፈረንስ ላይ ይቀላቀሉን፣ ዓለም አቀፍ ተናጋሪዎችን እና ዘመናዊ ፈጠራዎችን ያቀርባል።",
          category: "ዝግጅቶች",
          date: "2024-03-10",
          readTime: "3 ደቂቃ ንባብ",
          author: "የዝግጅቶች ቡድን",
          views: 3200
        }
      ]
    },

    // News Grid Section
    newsGrid: {
      title: "የቅርብ ጊዜ ዝመናዎች",
      found: "ተገኝተዋል",
      articlesAndUpdates: "መጣጥፎች እና ዝመናዎች",
      sortOptions: ["ደርድር በ: አዲስ", "ደርድር በ: በጣም ታዋቂ", "ደርድር በ: በጣም የታዩ", "ደርድር በ: ቆየት ያለ"],
      readMore: "ተጨማሪ ያንብቡ",
      by: "በ",
      event: "ዝግጅት",
      loadMore: "ተጨማሪ መጣጥፎችን ጫን",
      noResults: "ምንም መጣጥፎች አልተገኙም",
      noResultsDescription: "የፍለጋ መስፈርቶችዎን ማስተካከል ወይም የተለያዩ ምድቦችን ማሰስ ይሞክሩ",
      types: ["ዜና", "ዝግጅቶች", "ሽልማቶች", "ማህበረሰብ"],
      articles: [
        {
          id: 1,
          title: "በታዳሽ ኢነርጂ ማከማቻ ቴክኖሎጂ ውስጥ ግኝት",
          excerpt: "የኢትሮኒክስ ተመራማሪዎች የታዳሽ ኢነርጂ ማከማቻን አብዮት ሊያደርግ የሚችል አዲስ የባትሪ ቴክኖሎጂ አዘጋጅተዋል።",
          category: "technology",
          type: "news",
          date: "2024-03-14",
          readTime: "6 ደቂቃ ንባብ",
          author: "ዶ/ር ኤሚሊ ሮድሪጌዝ",
          views: 1500,
          tags: ["ታዳሽ ኢነርጂ", "የባትሪ ቴክኖሎጂ", "ምርምር"]
        },
        {
          id: 2,
          title: "ዓመታዊ የቴክ ፈጠራ ኮንፈረንስ 2024",
          excerpt: "በአዲስ አበባ በሚደረገው ዋና የቴክኖሎጂ ኮንፈረንሳችን ላይ የኢንዱስትሪ መሪዎችን እና ፈጣሪዎችን ይቀላቀሉ።",
          category: "community",
          type: "events",
          date: "2024-04-15",
          readTime: "2 ደቂቃ ንባብ",
          author: "የዝግጅቶች ቡድን",
          views: 2800,
          tags: ["ኮንፈረንስ", "ፈጠራ", "አውታረ መረብ"],
          eventDate: "2024-05-20",
          location: "አዲስ አበባ፣ ኢትዮጵያ"
        },
        {
          id: 3,
          title: "ኢትሮኒክስ በፈጠራ ላይ የላቀ ሽልማት አሸነፈ",
          excerpt: "በአፍሪካ ውስጥ ለቴክኖሎጂ እድገት ላደረገው ድንቅ አስተዋፅዖ እውቅና።",
          category: "awards",
          type: "awards",
          date: "2024-03-10",
          readTime: "4 ደቂቃ ንባብ",
          author: "የግንኙነት ቡድን",
          views: 3200,
          tags: ["ሽልማቶች", "እውቅና", "ፈጠራ"]
        },
        {
          id: 4,
          title: "ከአውሮፓ የጠፈር ኤጀንሲ ጋር አዲስ አጋርነት",
          excerpt: "የሳተላይት ቴክኖሎጂን እና የጠፈር ምርምርን ለማሳደግ የትብብር ምርምር ተነሳሽነት።",
          category: "partnerships",
          type: "news",
          date: "2024-03-08",
          readTime: "5 ደቂቃ ንባብ",
          author: "ዶ/ር ጄምስ ዊልሰን",
          views: 1900,
          tags: ["የጠፈር ቴክኖሎጂ", "አጋርነት", "ESA"]
        },
        {
          id: 5,
          title: "የተማሪዎች ሮቦቲክስ ውድድር 2024",
          excerpt: "የሁለተኛ ደረጃ ተማሪዎች በዓመታዊ ውድድራችን ላይ አዳዲስ የሮቦቲክስ መፍትሄዎችን ያሳያሉ።",
          category: "education",
          type: "events",
          date: "2024-03-05",
          readTime: "3 ደቂቃ ንባብ",
          author: "የትምህርት ቡድን",
          views: 1200,
          tags: ["ሮቦቲክስ", "ትምህርት", "ተማሪዎች"],
          eventDate: "2024-04-10",
          location: "የኢትሮኒክስ ካምፓስ"
        },
        {
          id: 6,
          title: "ዘላቂ የማምረቻ ተነሳሽነት ጅምር",
          excerpt: "በኢትዮጵያ ውስጥ ለአካባቢ ተስማሚ የማምረቻ ልምዶችን ለማስተዋወቅ አዲስ ፕሮግራም።",
          category: "sustainability",
          type: "news",
          date: "2024-03-03",
          readTime: "7 ደቂቃ ንባብ",
          author: "የዘላቂነት ቡድን",
          views: 2100,
          tags: ["ዘላቂነት", "ማምረት", "አካባቢ"]
        }
      ]
    },

    // Newsletter Section
    newsletter: {
      title: "ወቅታዊ ይሁኑ",
      description: "ለጋዜጣችን ይመዝገቡ እና ስለ የቅርብ ጊዜ ፈጠራዎቻችን፣ ዝግጅቶች እና ግኝቶች የመጀመሪያ ያውቁ።",
      emailLabel: "የኢሜይል አድራሻ",
      emailPlaceholder: "የኢሜይል አድራሻዎን ያስገቡ",
      topicsLabel: "ምን ርዕሶች ይስብዎታል? (ቢያንስ አንድ ይምረጡ)",
      topics: ["የቴክኖሎጂ ዝመናዎች", "ምርምር እና ልማት", "ዝግጅቶች እና ወርክሾፖች", "አጋርነቶች እና ትብብሮች", "የፈጠራ ታሪኮች", "የትምህርት ፕሮግራሞች"],
      frequencyLabel: "ምን ያህል ጊዜ ዝመናዎችን መቀበል ይፈልጋሉ?",
      frequencies: ["ሳምንታዊ", "በሁለት ሳምንት አንዴ", "ወርሃዊ"],
      privacyNotice: "የግላዊነት ማስታወቂያ: ግላዊነትዎን እናከብራለን እና የኢሜይል አድራሻዎን ለሶስተኛ ወገኖች በፍጹም አናጋራም። በማንኛውም ጊዜ በኢሜይሎቻችን ውስጥ ያለውን አገናኝ በመጫን ምዝገባዎን መሰረዝ ይችላሉ።",
      submitButton: "ለጋዜጣ ይመዝገቡ",
      stats: [
        { value: "15K+", label: "ደንበኞች" },
        { value: "98%", label: "የእርካታ መጠን" },
        { value: "ሳምንታዊ", label: "ዝመናዎች" }
      ],
      successTitle: "ወደ ማህበረሰባችን እንኳን ደህና መጡ!",
      successMessage: "ለጋዜጣችን ስለተመዘገቡ እናመሰግናለን። ስለመረጧቸው ርዕሶች ዝመናዎችን ይቀበላሉ።",
      subscribeAnother: "ሌላ ኢሜይል ይመዝገቡ"
    },

    // Media Center Section
    mediaCenter: {
      title: "የሚዲያ ማእከል",
      description: "የፎቶዎች፣ ቪዲዮዎች፣ የፕሬስ መግለጫዎች እና የመልቲሚዲያ ይዘት ስብስባችንን ይድረሱ",
      searchPlaceholder: "ሚዲያ ይፈልጉ...",
      categories: ["ሁሉም ሚዲያ", "ፎቶዎች", "ቪዲዮዎች", "የፕሬስ መግለጫዎች", "ፖድካስቶች"],
      types: ["ቪዲዮ", "ፎቶ", "ፕሬስ", "ፖድካስት"],
      views: "እይታዎች",
      viewButton: "ይመልከቱ",
      pressKit: {
        title: "የፕሬስ ኪት እና የምርት ንብረቶች",
        description: "ለፕሬስ እና ለአጋርነት አጠቃቀም ኦፊሴላዊ አርማዎቻችንን፣ የምርት መመሪያዎችን፣ ከፍተኛ ጥራት ያላቸውን ፎቶዎች እና ሌሎች የሚዲያ ንብረቶችን ያውርዱ።",
        downloadButton: "የፕሬስ ኪት ያውርዱ",
        guidelinesButton: "የምርት መመሪያዎች"
      },
      stats: [
        { value: "500+", label: "ፎቶዎች" },
        { value: "150+", label: "ቪዲዮዎች" },
        { value: "75+", label: "የፕሬስ መግለጫዎች" },
        { value: "50+", label: "ፖድካስቶች" }
      ],
      items: [
        {
          id: 1,
          title: "የኢትሮኒክስ ፈጠራ ላብራቶሪ ጉብኝት",
          type: "video",
          category: "videos",
          date: "2024-03-15",
          duration: "5:32",
          views: 2500,
          description: "የእኛን ዘመናዊ የፈጠራ ላብራቶሪ ምናባዊ ጉብኝት ያድርጉ።"
        },
        {
          id: 2,
          title: "AI ስብሰባ 2024 ድምቀቶች",
          type: "photo",
          category: "photos",
          date: "2024-03-12",
          views: 1800,
          description: "ከዓመታዊ AI እና ቴክኖሎጂ ስብሰባችን ቁልፍ ጊዜያት።"
        },
        {
          id: 3,
          title: "የኳንተም ኮምፒውቲንግ አጋርነት ማስታወቂያ",
          type: "press",
          category: "press",
          date: "2024-03-10",
          views: 3200,
          description: "ከመሪ የኳንተም ምርምር ተቋማት ጋር ያለንን አጋርነት የሚያስታውቅ ኦፊሴላዊ የፕሬስ መግለጫ።"
        },
        {
          id: 4,
          title: "ቴክ ቶክ፡ የዘላቂ ቴክኖሎጂ ወደፊት",
          type: "podcast",
          category: "podcasts",
          date: "2024-03-08",
          duration: "45:20",
          views: 1500,
          description: "ስለ ዘላቂ የቴክኖሎጂ መፍትሄዎች እና ተፅእኖአቸው ጥልቅ ውይይት።"
        },
        {
          id: 5,
          title: "የተማሪዎች ፈጠራ ማሳያ",
          type: "video",
          category: "videos",
          date: "2024-03-05",
          duration: "8:15",
          views: 2100,
          description: "ከተማሪዎች ማህበረሰባችን አዳዲስ ፕሮጀክቶችን ማሳየት።"
        },
        {
          id: 6,
          title: "የምርምር ተቋም መክፈቻ ስነ-ስርዓት",
          type: "photo",
          category: "photos",
          date: "2024-03-03",
          views: 1900,
          description: "ከአዲሱ የምርምር ተቋማችን ታላቅ መክፈቻ ፎቶዎች።"
        }
      ]
    },

    // Events Calendar Section
    eventsCalendar: {
      title: "የዝግጅቶች ቀን መቁጠሪያ",
      description: "መጪ ዝግጅቶች፣ ወርክሾፖች እና ኮንፈረንሶች ጋር ወቅታዊ ይሁኑ",
      viewModes: {
        month: "ወር",
        list: "ዝርዝር"
      },
      buttons: {
        today: "ዛሬ",
        filter: "አጣራ",
        addEvent: "ዝግጅት ጨምር",
        viewDetails: "ዝርዝሮችን ይመልከቱ",
        register: "ይመዝገቡ",
        registerNow: "አሁን ይመዝገቡ",
        addToCalendar: "ወደ ቀን መቁጠሪያ ጨምር"
      },
      daysOfWeek: ["እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "አርብ", "ቅዳሜ"],
      monthNames: ["ጃንዋሪ", "ፌብሩዋሪ", "ማርች", "ኤፕሪል", "ሜይ", "ጁን", "ጁላይ", "ኦገስት", "ሴፕቴምበር", "ኦክቶበር", "ኖቬምበር", "ዲሴምበር"],
      more: "ተጨማሪ",
      attendees: "ተሳታፊዎች",
      organizedBy: "የተዘጋጀው በ",
      by: "በ",
      views: "እይታዎች",
      eventsSection: "ዝግጅቶች",
      newsSection: "ዜናዎች",
      noEvents: "በዚህ ቀን ምንም ዝግጅቶች አልተያዙም",
      noNews: "በዚህ ቀን ምንም ዜናዎች አልታተሙም"
    }
  },

  om: {
    // Hero Section
    hero: {
      title: "Oduu fi Taateewwan",
      description: "Guddina yeroo ammaa, kalaqaa fi taateewwan Ethronics fi hawaasa teeknooloojii addunyaa irraa yeroo ammaa ta'aa.",
      stats: {
        articles: { value: "250+", label: "Barruulee Oduu" },
        events: { value: "50+", label: "Taateewwan Dhufaa" },
        subscribers: { value: "15K+", label: "Maamiltoota Gaazexaa" },
        partners: { value: "100+", label: "Hiriyoota Miidiyaa" }
      },
      buttons: {
        news: "Oduu Yeroo Ammaa",
        events: "Taateewwan Ilaali"
      }
    },

    // Filter Section
    filter: {
      tabs: [
        { id: "all", label: "Hunda" },
        { id: "news", label: "Oduu" },
        { id: "events", label: "Taateewwan" },
        { id: "awards", label: "Badhaasalee" },
        { id: "community", label: "Hawaasa" }
      ],
      searchPlaceholder: "Oduu, taateewwan, beeksisa barbaadi...",
      categories: [
        { value: "all", label: "Ramaddii Hunda" },
        { value: "technology", label: "Teeknooloojii" },
        { value: "research", label: "Qorannoo fi Misooma" },
        { value: "education", label: "Barnoota" },
        { value: "partnerships", label: "Hiriyummaa" },
        { value: "innovation", label: "Kalaqaa" },
        { value: "sustainability", label: "Itti Fufiinsa" },
        { value: "community", label: "Hawaasa" },
        { value: "awards", label: "Badhaasalee fi Beekamtii" }
      ],
      dateOptions: [
        { value: "all", label: "Yeroo Hunda" },
        { value: "today", label: "Har'a" },
        { value: "week", label: "Torban Kana" },
        { value: "month", label: "Ji'a Kana" },
        { value: "year", label: "Waggaa Kana" }
      ],
      quickFiltersLabel: "Calaltoota saffisaa:",
      quickFilters: ["Oduu Ariifachiisaa", "Taateewwan Dhufaa", "Fooyya'iinsa Qorannoo", "Oduu Hiriyummaa", "Badhaasalee"]
    },

    // Featured News Section
    featured: {
      title: "Seenaa Adda Baafaman",
      description: "Argannoo fi guddina yeroo ammaa Ethronics irraa argadhu",
      readMore: "Dabalataan Dubbisi",
      read: "Dubbisi",
      by: "kan",
      trendingTopics: "Mata-dureewwan Beekamoo",
      tags: ["Sammuu Namtolchee", "Herrega Kuwaantam", "Magaalota Ismaartii", "Itti Fufiinsa", "Kalaqaa", "Qorannoo", "Hiriyummaa", "Barnoota"],
      articles: [
        {
          id: 1,
          title: "Ethronics Pirojektii Magaalaa Ismaartii AI'n Hojjetu Warraaqsa Qabu Jalqabe",
          excerpt: "Pirojektiin magaalaa ismaartii keenya haaraan AI, IoT fi teeknooloojii itti fufiinsa qabu walitti makuun jireenya magaalaa Itoophiyaa keessatti jijjiiruuf hojjeta.",
          category: "Kalaqaa",
          date: "2024-03-15",
          readTime: "Daqiiqaa 5 dubbisuu",
          author: "Dr. Saaraa Joonsan",
          views: 2500
        },
        {
          id: 2,
          title: "Hiriyummaa MIT waliin: Qorannoo Herrega Kuwaantam Guddisuu",
          excerpt: "Ethronics MIT waliin ta'uun Finfinnee keessatti giddugala qorannoo herrega kuwaantam hundeessuuf walii gale.",
          category: "Qorannoo",
          date: "2024-03-12",
          readTime: "Daqiiqaa 4 dubbisuu",
          author: "Piroofesara Maayikil Cheen",
          views: 1800
        },
        {
          id: 3,
          title: "Walga'ii Teekii Itoophiyaa 2024: Kalaqaa fi Carraan Wal Arguu",
          excerpt: "Konfiraansii teeknooloojii guddaa Afrikaa Bahaa irratti nu waliin ta'aa, haasoftoota addunyaa fi kalaqaa ammayyaa dhiyeessa.",
          category: "Taateewwan",
          date: "2024-03-10",
          readTime: "Daqiiqaa 3 dubbisuu",
          author: "Garee Taateewwan",
          views: 3200
        }
      ]
    },

    // News Grid Section
    newsGrid: {
      title: "Fooyya'iinsa Yeroo Ammaa",
      found: "Argame",
      articlesAndUpdates: "barruulee fi fooyya'iinsa",
      sortOptions: ["Tartiiba: Haaraa", "Tartiiba: Baay'ee Beekamaa", "Tartiiba: Baay'ee Mul'ate", "Tartiiba: Moofaa"],
      readMore: "Dabalataan Dubbisi",
      by: "kan",
      event: "Taatee",
      loadMore: "Barruulee Dabalataa Fe'i",
      noResults: "Barruuleen hin argamne",
      noResultsDescription: "Ulaagaa barbaacha kee sirreessuu ykn ramaddii adda addaa sakatta'uu yaali",
      types: ["Oduu", "Taateewwan", "Badhaasalee", "Hawaasa"],
      articles: [
        {
          id: 1,
          title: "Teeknooloojii Kuusaa Anniisaa Haaromfamaa Keessatti Argannoo",
          excerpt: "Qorattoonni Ethronics teeknooloojii baatirii haaraa kan kuusaa anniisaa haaromfamaa warraaqsa fiduu danda'u qopheessan.",
          category: "technology",
          type: "news",
          date: "2024-03-14",
          readTime: "Daqiiqaa 6 dubbisuu",
          author: "Dr. Eemilii Roodirigeez",
          views: 1500,
          tags: ["Anniisaa Haaromfamaa", "Teeknooloojii Baatirii", "Qorannoo"]
        },
        {
          id: 2,
          title: "Konfiraansii Kalaqaa Teekii Waggaa 2024",
          excerpt: "Konfiraansii teeknooloojii keenya guddaa Finfinnee keessatti hooggantoota industirii fi kalaqtoota waliin ta'aa.",
          category: "community",
          type: "events",
          date: "2024-04-15",
          readTime: "Daqiiqaa 2 dubbisuu",
          author: "Garee Taateewwan",
          views: 2800,
          tags: ["Konfiraansii", "Kalaqaa", "Networkii"],
          eventDate: "2024-05-20",
          location: "Finfinnee, Itoophiyaa"
        },
        {
          id: 3,
          title: "Ethronics Badhaasa Kalaqaa Olaanaa Mo'ate",
          excerpt: "Gumaacha addaa guddina teeknooloojii Afrikaa keessatti godheef beekamtii.",
          category: "awards",
          type: "awards",
          date: "2024-03-10",
          readTime: "Daqiiqaa 4 dubbisuu",
          author: "Garee Qunnamtii",
          views: 3200,
          tags: ["Badhaasalee", "Beekamtii", "Kalaqaa"]
        },
        {
          id: 4,
          title: "Hiriyummaa Haaraa Eejensii Hawaa Awurooppaa Waliin",
          excerpt: "Teeknooloojii saatalaayitii fi qorannoo hawaa guddisuu dhaaf karoora qorannoo walta'iinsaa.",
          category: "partnerships",
          type: "news",
          date: "2024-03-08",
          readTime: "Daqiiqaa 5 dubbisuu",
          author: "Dr. Jeemis Wilsan",
          views: 1900,
          tags: ["Teeknooloojii Hawaa", "Hiriyummaa", "ESA"]
        },
        {
          id: 5,
          title: "Dorgommii Roobootikisii Barattootaa 2024",
          excerpt: "Barattoonni mana barumsaa sadarkaa lammaffaa dorgommii waggaa keenyaa irratti furmaata rooboorikisii kalaqaa agarsiisan.",
          category: "education",
          type: "events",
          date: "2024-03-05",
          readTime: "Daqiiqaa 3 dubbisuu",
          author: "Garee Barnoota",
          views: 1200,
          tags: ["Rooboorikisii", "Barnoota", "Barattootaa"],
          eventDate: "2024-04-10",
          location: "Kaampasii Ethronics"
        },
        {
          id: 6,
          title: "Jalqaba Karoora Oomishaa Itti Fufiinsaa",
          excerpt: "Sagantaan haaraan gocha oomishaa naannoodhaaf mijataa Itoophiyaa guutuu keessatti guddisuu dhaaf.",
          category: "sustainability",
          type: "news",
          date: "2024-03-03",
          readTime: "Daqiiqaa 7 dubbisuu",
          author: "Garee Itti Fufiinsa",
          views: 2100,
          tags: ["Itti Fufiinsa", "Oomisha", "Naannoo"]
        }
      ]
    },

    // Newsletter Section
    newsletter: {
      title: "Yeroo Ammaa Ta'aa",
      description: "Gaazexaa keenyaaf galmaa'ii fi waa'ee kalaqaa, taateewwan fi argannoo keenyaa yeroo ammaa jalqabatti beeki.",
      emailLabel: "Teessoo Imeelii",
      emailPlaceholder: "Teessoo imeelii kee galchi",
      topicsLabel: "Mata-dureewwan kamtu si hawwata? (Yoo xiqqaate tokko filadhu)",
      topics: ["Fooyya'iinsa Teeknooloojii", "Qorannoo fi Misooma", "Taateewwan fi Warkshooppii", "Hiriyummaa fi Walta'iinsa", "Seenaa Kalaqaa", "Sagantaalee Barnoota"],
      frequencyLabel: "Fooyya'iinsa yeroo hammam fudhachuu barbaadda?",
      frequencies: ["Torbanitti", "Torban lamatti", "Ji'atti"],
      privacyNotice: "Beeksisa Iccitii: Iccitii kee ni kabajina akkasumas teessoo imeelii kee namoota sadaffaatiif gonkumaa hin qoodnu. Yeroo kamiyyuu furtuu imeelii keenyaa keessatti jiru cuqaasuun galmaa'uu dhiisuu dandeessa.",
      submitButton: "Gaazexaaf Galmaa'i",
      stats: [
        { value: "15K+", label: "Maamiltoota" },
        { value: "98%", label: "Sadarkaa Gammachuu" },
        { value: "Torbanitti", label: "Fooyya'iinsa" }
      ],
      successTitle: "Gara Hawaasa Keenyaatti Baga Nagaan Dhuftan!",
      successMessage: "Gaazexaa keenyaaf waan galmaa'aniif galatoomaa. Waa'ee mata-dureewwan filatanii fooyya'iinsa ni argatu.",
      subscribeAnother: "Imeelii Biraa Galmaa'i"
    },

    // Media Center Section
    mediaCenter: {
      title: "Giddugala Miidiyaa",
      description: "Kuusaa suuraa, viidiyoo, ibsa gaazexaa fi qabiyyee maltimiidiyaa keenyaa argadhu",
      searchPlaceholder: "Miidiyaa barbaadi...",
      categories: ["Miidiyaa Hunda", "Suuraa", "Viidiyoo", "Ibsa Gaazexaa", "Poodkaastii"],
      types: ["Viidiyoo", "Suuraa", "Gaazexaa", "Poodkaastii"],
      views: "mul'ata",
      viewButton: "Ilaali",
      pressKit: {
        title: "Kiitii Gaazexaa fi Qabeenyaa Maqaa",
        description: "Asxaa ofiisaa, qajeelfama maqaa, suuraa qulqullina olaanaa fi qabeenyaa miidiyaa biroo gaazexaa fi hiriyummaa fayyadamaaf buusi.",
        downloadButton: "Kiitii Gaazexaa Buusi",
        guidelinesButton: "Qajeelfama Maqaa"
      },
      stats: [
        { value: "500+", label: "Suuraa" },
        { value: "150+", label: "Viidiyoo" },
        { value: "75+", label: "Ibsa Gaazexaa" },
        { value: "50+", label: "Poodkaastii" }
      ],
      items: [
        {
          id: 1,
          title: "Daawwannaa Laabooraatoorii Kalaqaa Ethronics",
          type: "video",
          category: "videos",
          date: "2024-03-15",
          duration: "5:32",
          views: 2500,
          description: "Daawwannaa vaartuwalii laabooraatoorii kalaqaa ammayyaa keenyaa godhadhu."
        },
        {
          id: 2,
          title: "Calaqqisiisa Walga'ii AI 2024",
          type: "photo",
          category: "photos",
          date: "2024-03-12",
          views: 1800,
          description: "Yeroo ijoo walga'ii AI fi teeknooloojii waggaa keenyaa irraa."
        },
        {
          id: 3,
          title: "Beeksisa Hiriyummaa Herrega Kuwaantam",
          type: "press",
          category: "press",
          date: "2024-03-10",
          views: 3200,
          description: "Ibsi gaazexaa ofiisaa hiriyummaa keenya dhaabbilee qorannoo kuwaantam hooggantoota waliin beeksisu."
        },
        {
          id: 4,
          title: "Haasawa Teekii: Fuula Duraa Teeknooloojii Itti Fufiinsaa",
          type: "podcast",
          category: "podcasts",
          date: "2024-03-08",
          duration: "45:20",
          views: 1500,
          description: "Marii gadi fagoo waa'ee furmaata teeknooloojii itti fufiinsaa fi dhiibbaa isaanii."
        },
        {
          id: 5,
          title: "Agarsiisa Kalaqaa Barattootaa",
          type: "video",
          category: "videos",
          date: "2024-03-05",
          duration: "8:15",
          views: 2100,
          description: "Pirojektoota kalaqaa hawaasa barattootaa keenyaa irraa agarsiisuu."
        },
        {
          id: 6,
          title: "Ayyaana Banumsaa Dhaabbata Qorannoo",
          type: "photo",
          category: "photos",
          date: "2024-03-03",
          views: 1900,
          description: "Suuraa banumsaa guddaa dhaabbata qorannoo haaraa keenyaa irraa."
        }
      ]
    },

    // Events Calendar Section
    eventsCalendar: {
      title: "Kaalaandarii Taateewwan",
      description: "Taateewwan dhufaa, warkshooppii fi konfiraansii waliin yeroo ammaa ta'aa",
      viewModes: {
        month: "Ji'a",
        list: "Tarree"
      },
      buttons: {
        today: "Har'a",
        filter: "Calaluu",
        addEvent: "Taatee Dabali",
        viewDetails: "Bal'ina Ilaali",
        register: "Galmaa'i",
        registerNow: "Amma Galmaa'i",
        addToCalendar: "Gara Kaalaandariitti Dabali"
      },
      daysOfWeek: ["Dil", "Wix", "Qib", "Rob", "Kam", "Jim", "San"],
      monthNames: ["Amajjii", "Guraandhala", "Bitootessa", "Elba", "Caamsa", "Waxabajjii", "Adooleessa", "Hagayya", "Fulbaana", "Onkololeessa", "Sadaasa", "Muddee"],
      more: "dabalataa",
      attendees: "hirmaattota",
      organizedBy: "Kan qophaa'e",
      by: "kan",
      views: "mul'ata",
      eventsSection: "Taateewwan",
      newsSection: "Oduu",
      noEvents: "Guyyaa kana irratti taatewwan hin qophaa'ine",
      noNews: "Guyyaa kana irratti oduun hin maxxanfamne"
    }
  }
};
