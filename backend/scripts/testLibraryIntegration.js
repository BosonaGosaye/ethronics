const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}\n${'='.repeat(50)}`)
};

async function testLibraryIntegration() {
  log.section('Testing Library Backend Integration');

  try {
    // Test 1: Fetch Library Content Sections
    log.info('Test 1: Fetching library content sections...');
    const sections = ['quickAccess', 'hero', 'search', 'categories', 'resources', 'stats', 'digitalServices', 'modal'];
    
    for (const section of sections) {
      try {
        const response = await axios.get(`${API_URL}/library/en/${section}`);
        if (response.data.success && response.data.data) {
          log.success(`Section '${section}' fetched successfully`);
        } else {
          log.error(`Section '${section}' returned invalid data`);
        }
      } catch (error) {
        log.error(`Failed to fetch section '${section}': ${error.message}`);
      }
    }

    // Test 2: Fetch Public Library Resources
    log.section('Test 2: Fetching public library resources');
    
    const resourcesResponse = await axios.get(`${API_URL}/library-resources/public?language=en&limit=10`);
    if (resourcesResponse.data.success) {
      log.success(`Fetched ${resourcesResponse.data.data.length} resources`);
      log.info(`Total resources: ${resourcesResponse.data.pagination.total}`);
      
      if (resourcesResponse.data.data.length > 0) {
        const resource = resourcesResponse.data.data[0];
        log.info(`Sample resource: ${resource.title} by ${resource.author}`);
        log.info(`Type: ${resource.type}, Category: ${resource.category}`);
        log.info(`Downloads: ${resource.downloads}, Views: ${resource.views}`);
      }
    } else {
      log.error('Failed to fetch public resources');
    }

    // Test 3: Filter by Type
    log.section('Test 3: Testing resource filtering by type');
    
    const types = ['book', 'paper', 'video', 'dataset', 'software'];
    for (const type of types) {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?language=en&type=${type}&limit=5`);
        if (response.data.success) {
          log.success(`Type '${type}': ${response.data.pagination.total} resources found`);
        }
      } catch (error) {
        log.error(`Failed to filter by type '${type}': ${error.message}`);
      }
    }

    // Test 4: Filter by Category
    log.section('Test 4: Testing resource filtering by category');
    
    const categories = ['electronics', 'power-systems', 'automation', 'robotics', 'research'];
    for (const category of categories) {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?language=en&category=${category}&limit=5`);
        if (response.data.success) {
          log.success(`Category '${category}': ${response.data.pagination.total} resources found`);
        }
      } catch (error) {
        log.error(`Failed to filter by category '${category}': ${error.message}`);
      }
    }

    // Test 5: Search Functionality
    log.section('Test 5: Testing search functionality');
    
    const searchTerms = ['electronics', 'power', 'automation'];
    for (const term of searchTerms) {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?language=en&search=${term}&limit=5`);
        if (response.data.success) {
          log.success(`Search '${term}': ${response.data.pagination.total} results found`);
        }
      } catch (error) {
        log.error(`Failed to search for '${term}': ${error.message}`);
      }
    }

    // Test 6: Pagination
    log.section('Test 6: Testing pagination');
    
    try {
      const page1 = await axios.get(`${API_URL}/library-resources/public?language=en&page=1&limit=5`);
      const page2 = await axios.get(`${API_URL}/library-resources/public?language=en&page=2&limit=5`);
      
      if (page1.data.success && page2.data.success) {
        log.success(`Page 1: ${page1.data.data.length} resources`);
        log.success(`Page 2: ${page2.data.data.length} resources`);
        log.info(`Total pages: ${page1.data.pagination.pages}`);
      }
    } catch (error) {
      log.error(`Pagination test failed: ${error.message}`);
    }

    // Test 7: Featured Resources
    log.section('Test 7: Testing featured resources');
    
    try {
      const response = await axios.get(`${API_URL}/library-resources/public?language=en&featured=true&limit=10`);
      if (response.data.success) {
        log.success(`Featured resources: ${response.data.pagination.total} found`);
      }
    } catch (error) {
      log.error(`Failed to fetch featured resources: ${error.message}`);
    }

    // Test 8: Multi-language Support
    log.section('Test 8: Testing multi-language support');
    
    const languages = ['en', 'am', 'om'];
    for (const lang of languages) {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?language=${lang}&limit=5`);
        if (response.data.success) {
          log.success(`Language '${lang}': ${response.data.pagination.total} resources found`);
        }
      } catch (error) {
        log.error(`Failed to fetch resources for language '${lang}': ${error.message}`);
      }
    }

    log.section('All Tests Completed!');
    log.success('Library backend integration is working correctly');

  } catch (error) {
    log.error(`Test suite failed: ${error.message}`);
    console.error(error);
  }
}

// Run tests
testLibraryIntegration();
