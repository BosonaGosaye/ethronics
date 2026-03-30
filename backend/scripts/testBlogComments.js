const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testBlogComments() {
  console.log('🧪 Testing Blog Comments API...\n');

  try {
    // Step 1: Get a published blog post
    console.log('1️⃣ Fetching published blog posts...');
    const postsResponse = await axios.get(`${API_URL}/blog-posts/public`);
    
    if (postsResponse.data.length === 0) {
      console.log('❌ No published blog posts found. Please publish a post first.');
      return;
    }
    
    const testPost = postsResponse.data[0];
    console.log(`✅ Found post: "${testPost.translations.en.title}"`);
    console.log(`   Post ID: ${testPost._id}\n`);

    // Step 2: Submit a test comment
    console.log('2️⃣ Submitting a test comment...');
    const commentData = {
      postId: testPost._id,
      author: {
        name: 'Test User',
        email: 'test@example.com'
      },
      content: 'This is a test comment to verify the comment system is working correctly!'
    };
    
    const commentResponse = await axios.post(`${API_URL}/blog-comments`, commentData);
    console.log('✅ Comment submitted successfully');
    console.log(`   Comment ID: ${commentResponse.data.data._id}`);
    console.log(`   Status: ${commentResponse.data.data.isApproved ? 'Approved' : 'Pending approval'}\n`);

    // Step 3: Fetch comments for the post (public - only approved)
    console.log('3️⃣ Fetching public comments for the post...');
    const publicCommentsResponse = await axios.get(`${API_URL}/blog-comments/post/${testPost._id}`);
    console.log(`✅ Found ${publicCommentsResponse.data.length} approved comments\n`);

    // Step 4: Test admin endpoints (requires authentication)
    console.log('4️⃣ Testing admin endpoints...');
    console.log('   Note: Admin endpoints require authentication');
    console.log('   To test admin features:');
    console.log('   1. Login to admin panel');
    console.log('   2. Go to Blog Comments Manager');
    console.log('   3. Approve the pending comment');
    console.log('   4. Verify it appears on the public blog post page\n');

    console.log('✅ All public tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Login to admin panel at http://localhost:5173');
    console.log('   2. Navigate to Blog > Comments');
    console.log('   3. Approve the pending comment');
    console.log('   4. Visit the blog post detail page to see the comment');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response.data);
      console.error('   Status:', error.response.status);
    }
  }
}

testBlogComments();
