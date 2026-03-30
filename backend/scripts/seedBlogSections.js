const mongoose = require('mongoose');
const BlogContent = require('../models/BlogContent');
require('dotenv').config();

const blogSectionsData = {
  en: {
    hero: {
      title: 'Ethronics Blog',
      description: 'Insights, innovations, and stories from the world of technology and education',
      stats: [
        { value: '500+', label: 'Articles' },
        { value: '50K+', label: 'Readers' },
        { value: '100+', label: 'Contributors' },
        { value: '20+', label: 'Topics' }
      ],
      buttons: {
        latest: 'Latest Posts',
        subscribe: 'Subscribe'
      }
    },
    filter: {
      categories: [
        { value: 'all', label: 'All Categories', count: 0 },
        { value: 'technology', label: 'Technology', count: 0 },
        { value: 'ai-ml', label: 'AI & ML', count: 0 },
        { value: 'research', label: 'Research', count: 0 },
        { value: 'education', label: 'Education', count: 0 },
        { value: 'innovation', label: 'Innovation', count: 0 },
        { value: 'sustainability', label: 'Sustainability', count: 0 },
        { value: 'entrepreneurship', label: 'Entrepreneurship', count: 0 },
        { value: 'partnerships', label: 'Partnerships', count: 0 },
        { value: 'community', label: 'Community', count: 0 }
      ],
      sortOptions: [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'trending', label: 'Trending' }
      ],
      popularTags: ['AI', 'Machine Learning', 'IoT', 'Robotics', 'Education', 'Innovation', 'Research', 'Technology']
    },
    featured: {
      title: 'Featured Posts',
      description: 'Discover our most popular and impactful articles',
      trendingTopics: 'Trending Topics'
    },
    blogGrid: {
      title: 'All Posts',
      description: 'Browse all our blog posts'
    },
    sidebar: {
      popularTagsList: [
        { name: 'AI', count: 15, trending: true },
        { name: 'Machine Learning', count: 12, trending: true },
        { name: 'IoT', count: 10, trending: false },
        { name: 'Robotics', count: 8, trending: false },
        { name: 'Education', count: 20, trending: true },
        { name: 'Innovation', count: 18, trending: false },
        { name: 'Research', count: 14, trending: false },
        { name: 'Technology', count: 25, trending: true }
      ],
      categoriesList: [
        { name: 'Technology', count: 45, color: 'bg-blue-100 text-blue-800' },
        { name: 'AI & ML', count: 32, color: 'bg-purple-100 text-purple-800' },
        { name: 'Research', count: 28, color: 'bg-green-100 text-green-800' },
        { name: 'Education', count: 38, color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Innovation', count: 25, color: 'bg-pink-100 text-pink-800' }
      ]
    }
  },
  am: {
    hero: {
      title: 'የኢትሮኒክስ ብሎግ',
      description: 'ከቴክኖሎጂ እና ትምህርት አለም ግንዛቤዎች፣ ፈጠራዎች እና ታሪኮች',
      stats: [
        { value: '500+', label: 'ጽሑፎች' },
        { value: '50K+', label: 'አንባቢዎች' },
        { value: '100+', label: 'አስተዋፅዖ አበርካቾች' },
        { value: '20+', label: 'ርዕሶች' }
      ],
      buttons: {
        latest: 'የቅርብ ጊዜ ልጥፎች',
        subscribe: 'ይመዝገቡ'
      }
    },
    filter: {
      categories: [
        { value: 'all', label: 'ሁሉም ምድቦች', count: 0 },
        { value: 'technology', label: 'ቴክኖሎጂ', count: 0 },
        { value: 'ai-ml', label: 'AI እና ML', count: 0 },
        { value: 'research', label: 'ምርምር', count: 0 },
        { value: 'education', label: 'ትምህርት', count: 0 },
        { value: 'innovation', label: 'ፈጠራ', count: 0 },
        { value: 'sustainability', label: 'ዘላቂነት', count: 0 },
        { value: 'entrepreneurship', label: 'ሥራ ፈጠራ', count: 0 },
        { value: 'partnerships', label: 'ሽርክናዎች', count: 0 },
        { value: 'community', label: 'ማህበረሰብ', count: 0 }
      ],
      sortOptions: [
        { value: 'newest', label: 'አዲስ መጀመሪያ' },
        { value: 'oldest', label: 'አሮጌ መጀመሪያ' },
        { value: 'popular', label: 'በጣም ታዋቂ' },
        { value: 'trending', label: 'ትኩስ' }
      ],
      popularTags: ['AI', 'ማሽን ለርኒንግ', 'IoT', 'ሮቦቲክስ', 'ትምህርት', 'ፈጠራ', 'ምርምር', 'ቴክኖሎጂ']
    },
    featured: {
      title: 'ተለይተው የቀረቡ ልጥፎች',
      description: 'በጣም ታዋቂ እና ተፅዕኖ ፈጣሪ ጽሑፎቻችንን ያግኙ',
      trendingTopics: 'ትኩስ ርዕሶች'
    },
    blogGrid: {
      title: 'ሁሉም ልጥፎች',
      description: 'ሁሉንም የብሎግ ልጥፎቻችንን ያስሱ'
    },
    sidebar: {
      popularTagsList: [
        { name: 'AI', count: 15, trending: true },
        { name: 'ማሽን ለርኒንግ', count: 12, trending: true },
        { name: 'IoT', count: 10, trending: false },
        { name: 'ሮቦቲክስ', count: 8, trending: false },
        { name: 'ትምህርት', count: 20, trending: true },
        { name: 'ፈጠራ', count: 18, trending: false },
        { name: 'ምርምር', count: 14, trending: false },
        { name: 'ቴክኖሎጂ', count: 25, trending: true }
      ],
      categoriesList: [
        { name: 'ቴክኖሎጂ', count: 45, color: 'bg-blue-100 text-blue-800' },
        { name: 'AI እና ML', count: 32, color: 'bg-purple-100 text-purple-800' },
        { name: 'ምርምር', count: 28, color: 'bg-green-100 text-green-800' },
        { name: 'ትምህርት', count: 38, color: 'bg-yellow-100 text-yellow-800' },
        { name: 'ፈጠራ', count: 25, color: 'bg-pink-100 text-pink-800' }
      ]
    }
  },
  om: {
    hero: {
      title: 'Biloogii Ethronics',
      description: 'Hubannoo, kalaqaa fi seenaa addunyaa teeknooloojii fi barnoota irraa',
      stats: [
        { value: '500+', label: 'Barruulee' },
        { value: '50K+', label: 'Dubbistota' },
        { value: '100+', label: 'Gumaachitoota' },
        { value: '20+', label: 'Mata-dureewwan' }
      ],
      buttons: {
        latest: 'Barruulee Haaraa',
        subscribe: 'Galmaa\'i'
      }
    },
    filter: {
      categories: [
        { value: 'all', label: 'Ramaddii Hunda', count: 0 },
        { value: 'technology', label: 'Teeknooloojii', count: 0 },
        { value: 'ai-ml', label: 'AI fi ML', count: 0 },
        { value: 'research', label: 'Qorannoo', count: 0 },
        { value: 'education', label: 'Barnoota', count: 0 },
        { value: 'innovation', label: 'Kalaqaa', count: 0 },
        { value: 'sustainability', label: 'Itti Fufiinsa', count: 0 },
        { value: 'entrepreneurship', label: 'Daldala', count: 0 },
        { value: 'partnerships', label: 'Tumsa', count: 0 },
        { value: 'community', label: 'Hawaasa', count: 0 }
      ],
      sortOptions: [
        { value: 'newest', label: 'Haaraa Jalqaba' },
        { value: 'oldest', label: 'Moofaa Jalqaba' },
        { value: 'popular', label: 'Baay\'ee Beekamaa' },
        { value: 'trending', label: 'Haaraa' }
      ],
      popularTags: ['AI', 'Barumsa Maashinii', 'IoT', 'Roobootiksi', 'Barnoota', 'Kalaqaa', 'Qorannoo', 'Teeknooloojii']
    },
    featured: {
      title: 'Barruulee Adda Ba\'an',
      description: 'Barruulee keenya baay\'ee beekamoo fi dhiibbaa qaban argadhu',
      trendingTopics: 'Mata-dureewwan Haaraa'
    },
    blogGrid: {
      title: 'Barruulee Hunda',
      description: 'Barruulee biloogii keenya hunda sakatta\'i'
    },
    sidebar: {
      popularTagsList: [
        { name: 'AI', count: 15, trending: true },
        { name: 'Barumsa Maashinii', count: 12, trending: true },
        { name: 'IoT', count: 10, trending: false },
        { name: 'Roobootiksi', count: 8, trending: false },
        { name: 'Barnoota', count: 20, trending: true },
        { name: 'Kalaqaa', count: 18, trending: false },
        { name: 'Qorannoo', count: 14, trending: false },
        { name: 'Teeknooloojii', count: 25, trending: true }
      ],
      categoriesList: [
        { name: 'Teeknooloojii', count: 45, color: 'bg-blue-100 text-blue-800' },
        { name: 'AI fi ML', count: 32, color: 'bg-purple-100 text-purple-800' },
        { name: 'Qorannoo', count: 28, color: 'bg-green-100 text-green-800' },
        { name: 'Barnoota', count: 38, color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Kalaqaa', count: 25, color: 'bg-pink-100 text-pink-800' }
      ]
    }
  }
};

async function seedBlogSections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing blog content
    await BlogContent.deleteMany({});
    console.log('🗑️  Cleared existing blog content');

    // Seed blog sections for all languages
    const sections = ['hero', 'filter', 'featured', 'blogGrid', 'sidebar'];
    const languages = ['en', 'am', 'om'];

    for (const language of languages) {
      console.log(`\n📝 Seeding ${language.toUpperCase()} blog sections...`);
      
      for (const section of sections) {
        const content = blogSectionsData[language][section];
        
        await BlogContent.create({
          language,
          section,
          content,
          isPublished: true
        });
        
        console.log(`   ✅ ${section} section created`);
      }
    }

    console.log('\n✅ Blog sections seeded successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Create blog posts in the admin panel');
    console.log('   2. Visit the public blog page to see the content');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blog sections:', error);
    process.exit(1);
  }
}

seedBlogSections();
