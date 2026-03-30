import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LibrarySearch = ({ searchQuery, setSearchQuery, selectedType, setSelectedType, content }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    searchPlaceholder: 'Search resources...',
    filterByType: 'Filter by Type',
    sortBy: 'Sort By'
  };
  
  // Use backend content if available, otherwise fallback to translations
  const searchContent = content || t.search;
  const resourceTypes = searchContent.resourceTypes || t.search.resourceTypes;

  return (
    <section className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={searchContent.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Resource Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {resourceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Advanced Search Button */}
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                           transition-colors duration-200 flex items-center gap-2">
            <SortAsc className="h-5 w-5" />
            {searchContent.advancedSearch}
          </button>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">{searchContent.quickFilters}</span>
          {(searchContent.filters || t.search.filters).map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                       rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 
                       dark:hover:text-purple-300 transition-colors duration-200"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibrarySearch;