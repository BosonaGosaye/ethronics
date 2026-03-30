const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testBlogPublicAPI() {
  console.log('🧪 Testing Blog Public API...\n');

  try {
    // Test 1: Fetch blog posts
    console.log('1️⃣ Testing GET /api/blog-posts/public');
    const postsResponse = await axios.get(`${API_URL}/blog-posts/public`);
    console.log('✅ Blog posts fetched successfully');
    console.log(`   Found ${postsResponse.data.length} posts`);
    if (postsResponse.data.length > 0) {
      const post = postsResponse.data[0];
      console.log(`   Sample post: "${post.translations.en.title}"`);
      console.log(`   Category: ${post.category}`);
      console.log(`   Featured: ${post.featured}`);
      console.log(`   Published: ${post.isPublished}`);
    }
    console.log('');

    // Test 2: Fetch blog sections
    const sections = ['hero', 'filter', 'featured', 'blogGrid', 'sidebar'];
    const languages = ['en', 'am', 'om'];

    for (const language of languages) {
      console.log(`2️⃣ Testing Blog Sections for language: ${language}`);
      
      for (const section of sections) {
        try {
          const response = await axios.get(`${API_URL}/blog/${language}/${section}`);
          console.log(`   ✅ ${section}: ${response.data.success ? 'Found' : 'Not found'}`);
          if (response.data.data) {
            console.log(`      Keys: ${Object.keys(response.data.data).join(', ')}`);
          }
        } catch (error) {
          if (error.response?.status === 404) {
            console.log(`   ⚠️  ${section}: Not found (404) - needs to be created in admin`);
          } else {
            console.log(`   ❌ ${section}: Error - ${error.message}`);
          }
        }
      }
      console.log('');
    }

    // Test 3: Check blog content structure
    console.log('3️⃣ Checking Blog Content Structure');
    try {
      const heroResponse = await axios.get(`${API_URL}/blog/en/hero`);
      if (heroResponse.data.data) {
        console.log('   Hero content structure:');
        console.log(`   ${JSON.stringify(heroResponse.data.data, null, 2)}`);
      }
    } catch (error) {
      console.log('   ⚠️  Hero content not found - create it in admin panel');
    }

    console.log('\n✅ All tests completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Create blog content sections in admin panel (Blog Dashboard)');
    console.log('   2. Create blog posts in Blog Posts Manager');
    console.log('   3. Make sure all sections are published');
    console.log('   4. Refresh the public blog page');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response.data);
    }
  }
}

testBlogPublicAPI();
