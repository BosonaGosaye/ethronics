const mongoose = require('mongoose');
const User = require('../models/User');
const HomeContent = require('../models/HomeContent');
require('dotenv').config();

/**
 * Seed script specifically for home page content
 * This creates the database structure matching the home.js translation file
 */

const seedHomeData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get or create admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@ethronics.org',
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        name: 'Admin User',
        role: 'admin',
        isActive: true
      });
      console.log('👤 Created admin user:', adminUser.email);
    } else {
      console.log('👤 Using existing admin user:', adminUser.email);
    }

    // Clear existing home content
    const deletedCount = await HomeContent.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount.deletedCount} existing home content documents`);

    // Sample data structure matching home.js
    const sampleContent = {
      en: {
        hero: {
          badge: "New Collection",
          slide1: {
            line1: "A technology that is",
            line2: "taught, researched, made, and perfected",
            line3: "in Ethiopia and Applied worldwide",
            description: "Empowering the next generation of innovators and leaders through cutting-edge education, research, and manufacturing excellence."
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
        features: {
          title: "Research & Innovation",
          subtitle: "At Ethronics, we're pushing the boundaries of technology through groundbreaking research and development.",
          learnMore: "Learn More",
          items: [
            { title: "Robotics", description: "Developing advanced automation systems" },
            { title: "AI & ML", description: "Creating solutions in speech recognition and computer vision" }
          ]
        },
        solutions: {
          title: "Solutions",
          titleSuffix: "We're Building",
          subtitle: "Ethronics is pioneering transformative solutions across education, manufacturing, and global technology.",
          categories: {
            education: { title: "Education", description: "Empowering Ethiopia's youth with cutting-edge skills" },
            research: { title: "Research & Development", description: "Developing scalable technologies" },
            manufacturing: { title: "Manufacturing", description: "Revolutionizing production with smart solutions" }
          },
          items: {
            roboticsBootcamp: { title: "Robotics Bootcamp", description: "Dive into automation", action: "Join Now" }
          }
        },
        gallery: {
          title: "Our Journey in Pictures",
          subtitle: "Explore the moments that define Ethronics",
          showMore: "Show More",
          showLess: "Show Less",
          categories: { education: "Education", research: "Research" },
          items: []
        },
        partnerships: {
          title: "Our Partnerships",
          subtitle: "Collaboration drives our success",
          featured: "Featured Partnerships",
          cta: {
            title: "Partner With Us",
            description: "Join our network of partners",
            becomePartner: "Become a Partner",
            learnMore: "Learn More"
          },
          types: [],
          keyPartnerships: []
        },
        cta: {
          title: "Join the Robotics Revolution",
          description: "Ready to build robots and code the future?",
          buttons: { register: "Register for Summer Training", explore: "Explore Opportunities" },
          features: [
            { title: "Fast Track", description: "Quick enrollment and immediate access" },
            { title: "Expert Guidance", description: "Learn from industry professionals" },
            { title: "Proven Results", description: "Join thousands of successful graduates" }
          ]
        }
      }
    };

    // Create content for each section
    const sections = ['hero', 'features', 'solutions', 'gallery', 'partnerships', 'cta'];
    let created = 0;

    for (const section of sections) {
      const content = await HomeContent.create({
        language: 'en',
        section,
        content: sampleContent.en[section],
        isPublished: true,
        publishedAt: new Date(),
        updatedBy: adminUser._id
      });
      console.log(`✅ Created ${section} section`);
      created++;
    }

    console.log(`\n🎉 Successfully seeded ${created} home content sections`);
    console.log('\n📝 To import complete data from home.js, run:');
    console.log('   npm run import-home');
    console.log('\n📝 You can now access the content via:');
    console.log(`   GET http://localhost:${process.env.PORT || 5000}/api/home/en`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding home data:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

seedHomeData();
