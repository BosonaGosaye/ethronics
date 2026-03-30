import { Search, Filter, SortAsc, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BlogFilter = ({ 
  content,
  stats,
  selectedCategory, 
  setSelectedCategory, 
  selectedTag, 
  setSelectedTag, 
  searchQuery, 
  setSearchQuery,
  sortBy,
  setSortBy 
}) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    searchPlaceholder: 'Search articles...',
    filterByCategory: 'Filter by Category',
    sortBy: 'Sort By',
    newest: 'Newest',
    oldest: 'Oldest',
    popular: 'Most Popular',
    trending: 'Trending'
  };
  
  if (!content) {
    return null;
  }

  // Build categories with real counts from stats
  const baseCategoriesLabels = {
    'all': 'All Categories',
    'technology': 'Technology',
    'ai-ml': 'AI & Machine Learning',
    'research': 'Research & Development',
    'education': 'Education',
    'innovation': 'Innovation',
    'sustainability': 'Sustainability',
    'entrepreneurship': 'Entrepreneurship',
    'partnerships': 'Partnerships',
    'community': 'Community'
  };
  
  let categories = content.categories || [];
  
  // If we have stats, update categories with real counts
  if (stats && stats.categories) {
    const categoryCountMap = {};
    stats.categories.forEach(cat => {
      categoryCountMap[cat._id] = cat.count;
    });
    
    // Calculate total for "all" category
    const totalCount = stats.totalPosts;
    
    categories = [
      { value: 'all', label: baseCategoriesLabels['all'], count: totalCount },
      ...Object.keys(baseCategoriesLabels)
        .filter(key => key !== 'all')
        .map(key => ({
          value: key,
          label: baseCategoriesLabels[key],
          count: categoryCountMap[key] || 0
        }))
        .filter(cat => cat.count > 0) // Only show categories with posts
    ];
  }
  
  // Build popular tags with real counts from stats
  let popularTags = content.popularTags || [];
  if (stats && stats.tags) {
    popularTags = stats.tags.map(tag => tag._id);
  }

  const sortOptions = content.sortOptions || [];

  return (
    <section className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 flex items-center gap-1">
            <Filter className="h-4 w-4" />
            {t.categories}
          </span>
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 flex items-center gap-1">
            <Tag className="h-4 w-4" />
            {t.tags}
          </span>
          {popularTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {(selectedCategory !== 'all' || selectedTag || searchQuery) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t.activeFilters}</span>
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm flex items-center gap-1">
                {t.category}: {categories.find(c => c.value === selectedCategory)?.label}
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="ml-1 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm flex items-center gap-1">
                {t.tag}: {selectedTag}
                <button 
                  onClick={() => setSelectedTag('')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm flex items-center gap-1">
                {t.search}: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag('');
                setSearchQuery('');
              }}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {t.clearAll}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogFilter;