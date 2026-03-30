import { useState } from 'react';
import { Search, TrendingUp, Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BlogSidebar = ({ content, posts, stats, selectedTag, setSelectedTag }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    search: 'Search',
    popularPosts: 'Popular Posts',
    trendingTopics: 'Trending Topics',
    recentPosts: 'Recent Posts',
    views: 'views'
  };
  const [searchQuery, setSearchQuery] = useState('');

  // Get recent posts from backend only
  const recentPosts = posts && posts.length > 0
    ? posts.slice(0, 4).map(post => ({
        id: post._id,
        title: post.translations[language]?.title || post.translations.en.title,
        author: post.author.name,
        date: post.publishDate,
        readTime: post.readTime,
        image: post.image
      }))
    : [];

  // Build popular tags with real counts from stats
  let popularTags = content?.popularTagsList || [];
  if (stats && stats.tags) {
    popularTags = stats.tags.slice(0, 10).map(tag => ({
      name: tag._id,
      count: tag.count,
      trending: tag.count > 5 // Mark as trending if more than 5 posts
    }));
  }
  
  // Build categories with real counts from stats
  const baseCategoriesLabels = {
    'technology': { name: 'Technology', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    'ai-ml': { name: 'AI & ML', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    'research': { name: 'Research', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    'education': { name: 'Education', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    'innovation': { name: 'Innovation', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
    'sustainability': { name: 'Sustainability', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' },
    'entrepreneurship': { name: 'Entrepreneurship', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
    'partnerships': { name: 'Partnerships', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
    'community': { name: 'Community', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
  };
  
  let categories = content?.categoriesList || [];
  if (stats && stats.categories) {
    categories = stats.categories
      .map(cat => ({
        name: baseCategoriesLabels[cat._id]?.name || cat._id,
        count: cat.count,
        color: baseCategoriesLabels[cat._id]?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }))
      .filter(cat => cat.count > 0);
  }

  return (
    <div className="space-y-8">
      {/* Search Widget */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Search className="h-5 w-5" />
          {t.searchPosts}
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            {t.popularTags}
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => setSelectedTag(selectedTag === tag.name ? '' : tag.name)}
                className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center gap-1 ${
                  selectedTag === tag.name
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300'
                }`}
              >
                #{tag.name}
                {tag.trending && (
                  <TrendingUp className="h-3 w-3" />
                )}
                <span className="text-xs opacity-75">({tag.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t.recentPosts}
          </h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="flex gap-3">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center justify-center gap-2">
            {t.viewAllPosts}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
};

export default BlogSidebar;