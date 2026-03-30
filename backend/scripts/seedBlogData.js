require('dotenv').config();
const mongoose = require('mongoose');
const BlogContent = require('../models/BlogContent');
const BlogPost = require('../models/BlogPost');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleBlogPosts = [
  {
    slug: 'ai-african-education-future',
    image: '/src/assets/ai-curriculum-DbYJIUnh.jpg',
    author: {
      name: 'Dr. Sarah Okonkwo',
      role: 'AI Research Director',
      avatar: '/src/assets/CEO-IzCm-iny.jpg'
    },
    category: 'ai-ml',
    publishDate: new Date('2024-03-15'),
    readTime: '8 min read',
    tags: ['Artificial Intelligence', 'Education', 'Africa', 'Innovation'],
    stats: { views: 12500, comments: 45, likes: 230 },
    featured: true,
    isPublished: true,
    translations: {
      en: {
        title: 'The Future of AI in African Education: Transforming Learning Landscapes',
        excerpt: 'Exploring how artificial intelligence is revolutionizing educational systems across Africa, from personalized learning to automated assessment tools.',
        content: `<h2>Introduction</h2>
<p>Artificial Intelligence is transforming education across Africa, creating unprecedented opportunities for personalized learning and improved educational outcomes.</p>

<h2>Key Applications</h2>
<ul>
<li>Personalized learning paths</li>
<li>Automated assessment and grading</li>
<li>Intelligent tutoring systems</li>
<li>Predictive analytics for student success</li>
</ul>

<h2>Challenges and Opportunities</h2>
<p>While AI presents enormous potential, we must address infrastructure challenges, data privacy concerns, and ensure equitable access across all communities.</p>

<h2>Conclusion</h2>
<p>The future of education in Africa is bright with AI integration, promising more accessible, personalized, and effective learning experiences for all students.</p>`
      },
      am: {
        title: 'በአፍሪካ ትምህርት ውስጥ የሰው ሰራሽ ብልህነት ወደፊት',
        excerpt: 'በአፍሪካ ውስጥ ያለው የትምህርት ስርዓት እንዴት በሰው ሰራሽ ብልህነት እየተለወጠ እንደሆነ መመርመር።',
        content: '<p>የሰው ሰራሽ ብልህነት በአፍሪካ ትምህርት ላይ ትልቅ ለውጥ እያመጣ ነው።</p>'
      },
      om: {
        title: 'Gara Fuulduraatti AI Barnoota Afrikaa Keessatti',
        excerpt: 'Akkaataa AI sirna barnootaa Afrikaa keessatti jijjiiraa jiru qorachuu.',
        content: '<p>AI barnoota Afrikaa keessatti jijjiirama guddaa fida jira.</p>'
      }
    }
  },
  {
    slug: 'blockchain-supply-chain-africa',
    image: '/src/assets/smart-gate-BuGtJWux.jpg',
    author: {
      name: 'Sarah Okafor',
      role: 'Blockchain Developer',
      avatar: '/src/assets/CEO-IzCm-iny.jpg'
    },
    category: 'technology',
    publishDate: new Date('2024-03-16'),
    readTime: '5 min read',
    tags: ['Blockchain', 'Supply Chain', 'Agriculture', 'Transparency'],
    stats: { views: 6200, comments: 28, likes: 134 },
    featured: true,
    isPublished: true,
    translations: {
      en: {
        title: 'Blockchain Technology for Supply Chain Transparency in Africa',
        excerpt: 'How blockchain is revolutionizing supply chain management and creating transparency in African agricultural markets.',
        content: `<h2>The Challenge</h2>
<p>African agricultural supply chains face significant challenges with transparency, traceability, and fair pricing for farmers.</p>

<h2>Blockchain Solutions</h2>
<p>Blockchain technology provides immutable records of transactions, enabling complete transparency from farm to market.</p>

<h2>Real-World Impact</h2>
<ul>
<li>Improved farmer income through direct market access</li>
<li>Reduced fraud and counterfeit products</li>
<li>Enhanced food safety and traceability</li>
<li>Streamlined logistics and reduced costs</li>
</ul>

<h2>Future Outlook</h2>
<p>As blockchain adoption grows, we expect to see more efficient, transparent, and equitable agricultural supply chains across Africa.</p>`
      },
      am: {
        title: 'በአፍሪካ የአቅርቦት ሰንሰለት ግልጽነት ለብሎክቼይን ቴክኖሎጂ',
        excerpt: 'ብሎክቼይን የአቅርቦት ሰንሰለት አስተዳደርን እንዴት እያሻሻለ እንደሆነ።',
        content: '<p>ብሎክቼይን ቴክኖሎጂ በአፍሪካ የግብርና ገበያዎች ውስጥ ግልጽነትን እያመጣ ነው።</p>'
      },
      om: {
        title: 'Teknooloojii Blockchain Iftoominaa Supply Chain Afrikaa',
        excerpt: 'Akkaataa blockchain bulchiinsa supply chain fooyyessaa jiru.',
        content: '<p>Teknooloojiin blockchain gabaa qonnaa Afrikaa keessatti iftoominaa fida jira.</p>'
      }
    }
  },
  {
    slug: 'iot-smart-cities-africa',
    image: '/src/assets/Robot-replace-D--cWneY.jpg',
    author: {
      name: 'Prof. Ahmed Hassan',
      role: 'IoT Research Director',
      avatar: '/src/assets/mentor-Cib0Zqml.jpg'
    },
    category: 'technology',
    publishDate: new Date('2024-03-14'),
    readTime: '9 min read',
    tags: ['IoT', 'Smart Cities', 'Urban Planning', 'Technology'],
    stats: { views: 7800, comments: 42, likes: 198 },
    featured: true,
    isPublished: true,
    translations: {
      en: {
        title: 'IoT Solutions for Smart Cities in Africa',
        excerpt: 'Implementing Internet of Things technologies to create smarter, more efficient urban environments across African cities.',
        content: `<h2>Smart City Vision</h2>
<p>African cities are rapidly urbanizing, creating both challenges and opportunities for implementing smart city solutions.</p>

<h2>IoT Applications</h2>
<ul>
<li>Smart traffic management systems</li>
<li>Intelligent waste management</li>
<li>Energy-efficient street lighting</li>
<li>Water quality monitoring</li>
<li>Air quality sensors</li>
</ul>

<h2>Case Studies</h2>
<p>Cities like Kigali, Lagos, and Nairobi are already implementing IoT solutions with measurable improvements in efficiency and quality of life.</p>

<h2>Challenges</h2>
<p>Infrastructure investment, data security, and technical capacity building remain key challenges that must be addressed.</p>`
      },
      am: {
        title: 'በአፍሪካ ለስማርት ከተሞች የIoT መፍትሄዎች',
        excerpt: 'በአፍሪካ ከተሞች ውስጥ ብልህ የከተማ አካባቢዎችን ለመፍጠር IoT ቴክኖሎጂዎችን መተግበር።',
        content: '<p>የIoT ቴክኖሎጂዎች በአፍሪካ ከተሞች ውስጥ ብልህ መፍትሄዎችን እያመጡ ነው።</p>'
      },
      om: {
        title: 'Furmaata IoT Magaalota Ogummaa Afrikaa',
        excerpt: 'Teknooloojii IoT magaalota Afrikaa keessatti hojiirra oolchuu.',
        content: '<p>Teknooloojiin IoT magaalota Afrikaa keessatti furmaata ogummaa fida jira.</p>'
      }
    }
  }
];

const seedBlogData = async () => {
  try {
    await connectDB();

    console.log('🌱 Seeding blog data...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing blog data...');
    await BlogPost.deleteMany({});
    console.log('   ✅ Cleared blog posts\n');

    // Insert blog posts
    console.log('📝 Creating blog posts...');
    const createdPosts = await BlogPost.insertMany(sampleBlogPosts);
    console.log(`   ✅ Created ${createdPosts.length} blog posts\n`);

    // Display created posts
    console.log('📋 Created posts:');
    createdPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.translations.en.title}`);
      console.log(`      - Slug: ${post.slug}`);
      console.log(`      - Category: ${post.category}`);
      console.log(`      - Featured: ${post.featured}`);
      console.log(`      - Tags: ${post.tags.join(', ')}`);
    });

    console.log('\n✅ Blog data seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blog data:', error);
    process.exit(1);
  }
};

seedBlogData();
