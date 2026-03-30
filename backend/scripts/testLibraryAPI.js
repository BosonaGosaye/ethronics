const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`)
};

async function testLibraryAPI() {
  console.log('\n=== Testing Library API Endpoints ===\n');

  try {
    // Test 1: Get library content sections
    log.info('Test 1: Fetching library content sections...');
    const sections = ['hero', 'stats', 'search', 'categories', 'resources', 'digitalServices'];
    
    for (const section of sections) {
      try {
        const response = await axios.get(`${API_URL}/library/en/${section}`);
        if (response.data.success) {
          log.success(`Section '${section}' fetched successfully`);
        } else {
          log.warning(`Section '${section}' returned unsuccessful response`);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          log.warning(`Section '${section}' not found (404) - needs to be imported`);
        } else {
          log.error(`Section '${section}' failed: ${error.message}`);
        }
      }
    }

    // Test 2: Get public library resources
    log.info('\nTest 2: Fetching public library resources...');
    try {
      const response = await axios.get(`${API_URL}/library-resources/public?language=en&limit=5`);
      if (response.data.success) {
        log.success(`Fetched ${response.data.data.length} resources`);
        log.info(`Total resources: ${response.data.pagination.total}`);
        log.info(`Pages: ${response.data.pagination.pages}`);
        
        if (response.data.data.length > 0) {
          const resource = response.data.data[0];
          log.info(`Sample resource: ${resource.title} by ${resource.author}`);
        }
      } else {
        log.warning('Resources fetch returned unsuccessful response');
      }
    } catch (error) {
      log.error(`Resources fetch failed: ${error.message}`);
    }

    // Test 3: Test resource filtering by type
    log.info('\nTest 3: Testing resource filtering by type...');
    const types = ['book', 'paper', 'video', 'dataset', 'software'];
    
    for (const type of types) {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?type=${type}&limit=1`);
        if (response.data.success) {
          log.success(`Type '${type}': ${response.data.pagination.total} resources found`);
        }
      } catch (error) {
        log.error(`Type '${type}' filter failed: ${error.message}`);
      }
    }

    // Test 4: Test resource filtering by category
    log.info('\nTest 4: Testing resource filtering by category...');
    const categories = ['electronics', 'power', 'automation', 'research'];
    
    for (const category of categories) {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?category=${category}&limit=1`);
        if (response.data.success) {
          log.success(`Category '${category}': ${response.data.pagination.total} resources found`);
        }
      } catch (error) {
        log.error(`Category '${category}' filter failed: ${error.message}`);
      }
    }

    // Test 5: Test search functionality
    log.info('\nTest 5: Testing search functionality...');
    try {
      const response = await axios.get(`${API_URL}/library-resources/public?search=electronics&limit=5`);
      if (response.data.success) {
        log.success(`Search found ${response.data.pagination.total} resources`);
      }
    } catch (error) {
      log.error(`Search failed: ${error.message}`);
    }

    // Test 6: Test pagination
    log.info('\nTest 6: Testing pagination...');
    try {
      const page1 = await axios.get(`${API_URL}/library-resources/public?page=1&limit=2`);
      const page2 = await axios.get(`${API_URL}/library-resources/public?page=2&limit=2`);
      
      if (page1.data.success && page2.data.success) {
        log.success('Pagination working correctly');
        log.info(`Page 1: ${page1.data.data.length} resources`);
        log.info(`Page 2: ${page2.data.data.length} resources`);
      }
    } catch (error) {
      log.error(`Pagination test failed: ${error.message}`);
    }

    // Test 7: Test featured resources
    log.info('\nTest 7: Testing featured resources...');
    try {
      const response = await axios.get(`${API_URL}/library-resources/public?featured=true&limit=5`);
      if (response.data.success) {
        log.success(`Found ${response.data.pagination.total} featured resources`);
      }
    } catch (error) {
      log.error(`Featured resources test failed: ${error.message}`);
    }

    console.log('\n=== Library API Tests Complete ===\n');

  } catch (error) {
    log.error(`Test suite failed: ${error.message}`);
    process.exit(1);
  }
}

// Run tests
testLibraryAPI().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
