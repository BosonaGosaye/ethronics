require('dotenv').config();
const mongoose = require('mongoose');
const NewsEventsContent = require('../models/NewsEventsContent');

// Import translations from frontend
const newsEventsTranslations = {
  en: {
    hero: {
      badge: "Latest Updates",
      title: "News & Events",
      subtitle: "Stay informed about our latest developments, achievements, and upcoming events",
      stats: [
        { number: "500+", label: "News Articles" },
        { number: "200+", label: "Events Hosted" },
        { number: "50K+", label: "Community Members" }
      ]
    },
    filter: {
      title: "Filter News & Events",
      searchPlaceholder: "Search articles and events...",
      categories: [
        { id: "all", name: "All" },
        { id: "technology", name: "Technology" },
        { id: "research", name: "Research" },
        { id: "education", name: "Education" },
        { id: "partnerships", name: "Partnerships" },
        { id: "innovation", name: "Innovation" },
        { id: "sustainability", name: "Sustainability" },
        { id: "community", name: "Community" },
        { id: "awards", name: "Awards" }
      ],
      types: [
        { id: "all", name: "All Types" },
        { id: "news", name: "News" },
        { id: "events", name: "Events" },
        { id: "awards", name: "Awards" },
        { id: "community", name: "Community" }
      ]
    },
    featured: {
      title: "Featured Stories",
      subtitle: "Highlighting our most impactful news and events"
    },
    newsGrid: {
      title: "Latest Updates",
      subtitle: "Browse through our recent news articles and event announcements",
      loadMore: "Load More",
      noResults: "No articles found",
      readMore: "Read More"
    },
    newsletter: {
      title: "Stay Updated",
      subtitle: "Subscribe to our newsletter for the latest news and event notifications",
      emailPlaceholder: "Enter your email",
      button: "Subscribe",
      successMessage: "Thank you for subscribing!",
      errorMessage: "Please enter a valid email address"
    },
    mediaCenter: {
      title: "Media Center",
      subtitle: "Access our press releases, media kits, and official statements",
      items: [
        {
          title: "Press Releases",
          description: "Official announcements and statements",
          icon: "FileText"
        },
        {
          title: "Media Kit",
          description: "Logos, images, and brand assets",
          icon: "Image"
        },
        {
          title: "Contact Press",
          description: "Get in touch with our media team",
          icon: "Mail"
        }
      ]
    },
    eventsCalendar: {
      title: "Events Calendar",
      subtitle: "View and register for upcoming events",
      viewCalendar: "View Full Calendar",
      register: "Register Now",
      noEvents: "No upcoming events"
    }
  },
  am: {
    hero: {
      badge: "የቅርብ ጊዜ ዝማኔዎች",
      title: "ዜናዎች እና ዝግጅቶች",
      subtitle: "ስለ የቅርብ ጊዜ እድገቶቻችን፣ ስኬቶች እና መጪ ዝግጅቶች መረጃ ያግኙ",
      stats: [
        { number: "500+", label: "የዜና መጣጥፎች" },
        { number: "200+", label: "የተካሄዱ ዝግጅቶች" },
        { number: "50ሺ+", label: "የማህበረሰብ አባላት" }
      ]
    },
    filter: {
      title: "ዜናዎችን እና ዝግጅቶችን ያጣሩ",
      searchPlaceholder: "መጣጥፎችን እና ዝግጅቶችን ይፈልጉ...",
      categories: [
        { id: "all", name: "ሁሉም" },
        { id: "technology", name: "ቴክኖሎጂ" },
        { id: "research", name: "ምርምር" },
        { id: "education", name: "ትምህርት" },
        { id: "partnerships", name: "ሽርክናዎች" },
        { id: "innovation", name: "ፈጠራ" },
        { id: "sustainability", name: "ዘላቂነት" },
        { id: "community", name: "ማህበረሰብ" },
        { id: "awards", name: "ሽልማቶች" }
      ],
      types: [
        { id: "all", name: "ሁሉም ዓይነቶች" },
        { id: "news", name: "ዜናዎች" },
        { id: "events", name: "ዝግጅቶች" },
        { id: "awards", name: "ሽልማቶች" },
        { id: "community", name: "ማህበረሰብ" }
      ]
    },
    featured: {
      title: "ተለይተው የቀረቡ ታሪኮች",
      subtitle: "በጣም ተጽዕኖ ፈጣሪ የሆኑ ዜናዎቻችንን እና ዝግጅቶቻችንን በማጉላት"
    },
    newsGrid: {
      title: "የቅርብ ጊዜ ዝማኔዎች",
      subtitle: "የቅርብ ጊዜ የዜና መጣጥፎቻችንን እና የዝግጅት ማስታወቂያዎችን ያስሱ",
      loadMore: "ተጨማሪ ጫን",
      noResults: "ምንም መጣጥፎች አልተገኙም",
      readMore: "ተጨማሪ ያንብቡ"
    },
    newsletter: {
      title: "ዝማኔ ያግኙ",
      subtitle: "ለቅርብ ጊዜ ዜናዎች እና የዝግጅት ማሳወቂያዎች ለጋዜጣችን ይመዝገቡ",
      emailPlaceholder: "ኢሜልዎን ያስገቡ",
      button: "ይመዝገቡ",
      successMessage: "ስለተመዘገቡ እናመሰግናለን!",
      errorMessage: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ"
    },
    mediaCenter: {
      title: "የሚዲያ ማዕከል",
      subtitle: "የፕሬስ መግለጫዎቻችንን፣ የሚዲያ ኪቶችን እና ኦፊሴላዊ መግለጫዎችን ያግኙ",
      items: [
        {
          title: "የፕሬስ መግለጫዎች",
          description: "ኦፊሴላዊ ማስታወቂያዎች እና መግለጫዎች",
          icon: "FileText"
        },
        {
          title: "የሚዲያ ኪት",
          description: "አርማዎች፣ ምስሎች እና የምርት ስም ንብረቶች",
          icon: "Image"
        },
        {
          title: "ፕሬስን ያግኙ",
          description: "ከሚዲያ ቡድናችን ጋር ይገናኙ",
          icon: "Mail"
        }
      ]
    },
    eventsCalendar: {
      title: "የዝግጅቶች ቀን መቁጠሪያ",
      subtitle: "መጪ ዝግጅቶችን ይመልከቱ እና ይመዝገቡ",
      viewCalendar: "ሙሉ ቀን መቁጠሪያ ይመልከቱ",
      register: "አሁን ይመዝገቡ",
      noEvents: "መጪ ዝግጅቶች የሉም"
    }
  },
  om: {
    hero: {
      badge: "Fooyya'iinsa Dhiyoo",
      title: "Oduu fi Taateewwan",
      subtitle: "Waa'ee guddina, milkaa'ina fi taateewwan dhufan keenya odeeffannoo argadhaa",
      stats: [
        { number: "500+", label: "Barruulee Oduu" },
        { number: "200+", label: "Taateewwan Gaggeeffaman" },
        { number: "50K+", label: "Miseensota Hawaasaa" }
      ]
    },
    filter: {
      title: "Oduu fi Taateewwan Calalaa",
      searchPlaceholder: "Barruulee fi taateewwan barbaadaa...",
      categories: [
        { id: "all", name: "Hunda" },
        { id: "technology", name: "Teeknooloojii" },
        { id: "research", name: "Qorannoo" },
        { id: "education", name: "Barnoota" },
        { id: "partnerships", name: "Waliigaltee" },
        { id: "innovation", name: "Kalaqaa" },
        { id: "sustainability", name: "Itti Fufiinsa" },
        { id: "community", name: "Hawaasa" },
        { id: "awards", name: "Badhaasa" }
      ],
      types: [
        { id: "all", name: "Gosa Hunda" },
        { id: "news", name: "Oduu" },
        { id: "events", name: "Taateewwan" },
        { id: "awards", name: "Badhaasa" },
        { id: "community", name: "Hawaasa" }
      ]
    },
    featured: {
      title: "Seenaa Addaa",
      subtitle: "Oduu fi taateewwan keenya dhiibbaa guddaa qaban calaqqisiisuu"
    },
    newsGrid: {
      title: "Fooyya'iinsa Dhiyoo",
      subtitle: "Barruulee oduu fi beeksisa taateewwan dhiyoo keenya qoradhaa",
      loadMore: "Dabalataa Fe'i",
      noResults: "Barruuleen hin argamne",
      readMore: "Dabalataa Dubbisaa"
    },
    newsletter: {
      title: "Fooyya'iinsa Argadhaa",
      subtitle: "Oduu fi beeksisa taateewwan dhiyootiif gaazexaa keenyaaf galmaa'aa",
      emailPlaceholder: "Imeelii keessan galchaa",
      button: "Galmaa'aa",
      successMessage: "Galmaa'uuf galatoomaa!",
      errorMessage: "Maaloo teessoo imeelii sirrii ta'e galchaa"
    },
    mediaCenter: {
      title: "Giddugala Miidiyaa",
      subtitle: "Ibsa paappii, kiitii miidiyaa fi ibsa ofiisaa keenya argadhaa",
      items: [
        {
          title: "Ibsa Paappii",
          description: "Beeksisaafi ibsa ofiisaa",
          icon: "FileText"
        },
        {
          title: "Kiitii Miidiyaa",
          description: "Mallattoo, suuraa fi qabeenya maqaa daldalaa",
          icon: "Image"
        },
        {
          title: "Paappii Quunnamaa",
          description: "Garee miidiyaa keenya waliin quunnamaa",
          icon: "Mail"
        }
      ]
    },
    eventsCalendar: {
      title: "Kaaleendara Taateewwan",
      subtitle: "Taateewwan dhufan ilaalaa fi galmaa'aa",
      viewCalendar: "Kaaleendara Guutuu Ilaalaa",
      register: "Amma Galmaa'aa",
      noEvents: "Taateewwan dhufan hin jiran"
    }
  }
};

const importNewsEventsData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const sections = ['hero', 'filter', 'featured', 'newsGrid', 'newsletter', 'mediaCenter', 'eventsCalendar'];
    const languages = ['en', 'am', 'om'];

    let imported = 0;
    let updated = 0;
    let skipped = 0;

    for (const language of languages) {
      for (const section of sections) {
        const content = newsEventsTranslations[language][section];
        
        if (!content) {
          console.log(`⚠️  No content found for ${language}/${section}`);
          skipped++;
          continue;
        }

        // Check if content already exists
        const existing = await NewsEventsContent.findOne({ language, section });

        if (existing) {
          // Update existing content
          existing.content = content;
          existing.isPublished = true;
          await existing.save();
          console.log(`✅ Updated: ${language}/${section}`);
          updated++;
        } else {
          // Create new content
          await NewsEventsContent.create({
            language,
            section,
            content,
            isPublished: true
          });
          console.log(`✅ Imported: ${language}/${section}`);
          imported++;
        }
      }
    }

    console.log('\n📊 Import Summary:');
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📝 Total: ${imported + updated + skipped}`);

  } catch (error) {
    console.error('❌ Error importing news & events data:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
};

// Run the import
importNewsEventsData();
