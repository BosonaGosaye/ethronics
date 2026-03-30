require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function testBlogIntegration() {
  try {
    console.log('🧪 Testing Blog Integration...\n');

    // Test 1: Fetch blog content sections
    console.log('1️⃣ Testing blog content sections...');
    const sections = ['hero', 'filter', 'featured', 'blogGrid', 'sidebar'];
    
    for (const section of sections) {
      try {
        const response = await axios.get(`${API_URL}/blog/en/${section}`);
        console.log(`   ✅ ${section}: ${response.data.content ? 'OK' : 'Empty'}`);
      } catch (error) {
        console.log(`   ❌ ${section}: ${error.response?.status || error.message}`);
      }
    }

    // Test 2: Fetch blog posts
    console.log('\n2️⃣ Testing blog posts...');
    try {
      const response = await axios.get(`${API_URL}/blogPosts/public`);
      console.log(`   ✅ Found ${response.data.length} blog posts`);
      
      if (response.data.length > 0) {
        const post = response.data[0];
        console.log(`   📝 Sample post: "${post.translations.en.title}"`);
        console.log(`      - Category: ${post.category}`);
        console.log(`      - Featured: ${post.featured}`);
        console.log(`      - Published: ${post.isPublished}`);
        console.log(`      - Tags: ${post.tags.join(', ')}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
    }

    // Test 3: Fetch featured posts
    console.log('\n3️⃣ Testing featured posts...');
    try {
      const response = await axios.get(`${API_URL}/blogPosts/public`);
      const featuredPosts = response.data.filter(post => post.featured);
      console.log(`   ✅ Found ${featuredPosts.length} featured posts`);
      
      featuredPosts.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.translations.en.title}`);
      });
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
    }

    // Test 4: Test blog post by slug
    console.log('\n4️⃣ Testing blog post by slug...');
    try {
      const allPosts = await axios.get(`${API_URL}/blogPosts/public`);
      if (allPosts.data.length > 0) {
        const slug = allPosts.data[0].slug;
        const response = await axios.get(`${API_URL}/blogPosts/public/slug/${slug}`);
        console.log(`   ✅ Fetched post by slug: "${response.data.translations.en.title}"`);
      } else {
        console.log(`   ⚠️  No posts available to test`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
    }

    // Test 5: Test multi-language support
    console.log('\n5️⃣ Testing multi-language support...');
    const languages = ['en', 'am', 'om'];
    
    for (const lang of languages) {
      try {
        const response = await axios.get(`${API_URL}/blog/${lang}/hero`);
        console.log(`   ✅ ${lang.toUpperCase()}: ${response.data.content ? 'OK' : 'Empty'}`);
      } catch (error) {
        console.log(`   ❌ ${lang.toUpperCase()}: ${error.response?.status || error.message}`);
      }
    }

    // Test 6: Test blog post categories
    console.log('\n6️⃣ Testing blog post categories...');
    try {
      const response = await axios.get(`${API_URL}/blogPosts/public`);
      const categories = {};
      
      response.data.forEach(post => {
        categories[post.category] = (categories[post.category] || 0) + 1;
      });
      
      console.log('   📊 Posts by category:');
      Object.entries(categories).forEach(([category, count]) => {
        console.log(`      - ${category}: ${count} posts`);
      });
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
    }

    // Test 7: Test blog post tags
    console.log('\n7️⃣ Testing blog post tags...');
    try {
      const response = await axios.get(`${API_URL}/blogPosts/public`);
      const allTags = new Set();
      
      response.data.forEach(post => {
        post.tags.forEach(tag => allTags.add(tag));
      });
      
      console.log(`   ✅ Found ${allTags.size} unique tags`);
      console.log(`   🏷️  Tags: ${Array.from(allTags).slice(0, 10).join(', ')}${allTags.size > 10 ? '...' : ''}`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
    }

    console.log('\n✅ Blog integration test completed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testBlogIntegration();
