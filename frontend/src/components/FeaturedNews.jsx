import React from 'react';
import { Calendar, Clock, ArrowRight, Eye, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedNews = ({ content, featuredItems = [] }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content || {
    title: 'Featured News',
    description: 'Latest highlights',
    readMore: 'Read More',
    views: 'views'
  };
  
  // Use only backend data - no fake fallback
  const featuredArticles = featuredItems.map(item => ({
    id: item._id,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    date: item.publishDate,
    readTime: item.readTime || '5 min read',
    views: item.views || 0,
    author: item.author?.name || item.author || 'Ethronics Team',
    slug: item.slug,
    image: item.featuredImage
  }));
  
  // If no featured items from backend, show message
  if (featuredArticles.length === 0) {
    return (
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.description}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No featured stories available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 md:h-80 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                <img 
                  src={featuredArticles[0].image || 'https://via.placeholder.com/800x600?text=Featured+News'} 
                  alt={featuredArticles[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                    {featuredArticles[0].category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredArticles[0].date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredArticles[0].readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredArticles[0].views}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                      <span>{t.readMore}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Secondary Featured Articles */}
          <div className="space-y-6">
            {featuredArticles.slice(1).map((article) => (
              <article key={article.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Image Thumbnail */}
                {article.image && (
                  <div className="relative h-40 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  {!article.image && (
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>{t.by} {article.author}</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
                      <span>{t.read}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.trendingTopics}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {t.tags.map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;