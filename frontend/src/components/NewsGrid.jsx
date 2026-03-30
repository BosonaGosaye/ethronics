import React, { useState } from 'react';
import { Calendar, Clock, Eye, Share2, Bookmark, ArrowRight, Filter } from 'lucide-react';
import NewsModal from './NewsModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useNewsEventItems } from '../hooks/useNewsEventsContent';

const NewsGrid = ({ content, activeTab, selectedCategory, searchQuery }) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState(new Set());
  const [page, setPage] = useState(1);

  // Build filters for backend
  const filters = {
    page,
    limit: 12,
    ...(activeTab !== 'all' && { type: activeTab }),
    ...(selectedCategory !== 'all' && { category: selectedCategory }),
    ...(searchQuery && { search: searchQuery })
  };

  const { items, loading, error, pagination } = useNewsEventItems(language, filters);

  // Don't render if no content from backend
  if (!content) {
    return null;
  }

  // Transform backend items to match component structure
  const filteredNews = items.map(item => ({
    id: item._id,
    title: item.title,
    excerpt: item.excerpt,
    type: item.type,
    category: item.category,
    date: item.publishDate,
    readTime: item.readTime || '5 min read',
    views: item.views || 0,
    author: item.author?.name || item.author || 'Ethronics Team',
    tags: item.tags || [],
    eventDate: item.eventDate,
    slug: item.slug,
    featuredImage: item.featuredImage || '/placeholder-news.jpg' // Add featured image
  }));

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const toggleSaveArticle = (articleId, e) => {
    e.stopPropagation();
    const newSavedArticles = new Set(savedArticles);
    if (newSavedArticles.has(articleId)) {
      newSavedArticles.delete(articleId);
    } else {
      newSavedArticles.add(articleId);
    }
    setSavedArticles(newSavedArticles);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      news: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      events: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      awards: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      community: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[type] || colors.news;
  };

  const getTypeLabel = (type) => {
    const labels = {
      news: content.types?.[0] || 'News',
      events: content.types?.[1] || 'Events',
      awards: content.types?.[2] || 'Awards',
      community: content.types?.[3] || 'Community'
    };
    return labels[type] || labels.news;
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {content.title || 'Latest Updates'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {content.found || 'Found'} {filteredNews.length} {content.articlesAndUpdates || 'articles and updates'}
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' 
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' 
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                </div>
              </button>
            </div>
            
            {content.sortOptions && content.sortOptions.length > 0 && (
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {content.sortOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* News Grid/List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{content.loading || 'Loading...'}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {content.error || 'Error loading content'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'
          }>
          {filteredNews.map((article) => {
            const isSaved = savedArticles.has(article.id);
            
            if (viewMode === 'list') {
              return (
                <article 
                  key={article.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-transparent hover:border-purple-500"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-24 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                        <img 
                          src={article.featuredImage} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(article.type)}`}>
                            {getTypeLabel(article.type)}
                          </span>
                          {article.eventDate && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {content.event || 'Event'}: {formatDate(article.eventDate)}
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => toggleSaveArticle(article.id, e)}
                          className={`p-1 rounded transition-colors ${
                            isSaved 
                              ? 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400' 
                              : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900'
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span>{content.by || 'By'} {article.author}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(article.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                        
                        <button className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                          <span>{content.readMore || 'Read More'}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
            
            return (
              <article 
                key={article.id} 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(article.type)}`}>
                      {getTypeLabel(article.type)}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button 
                      onClick={(e) => toggleSaveArticle(article.id, e)}
                      className={`p-2 rounded-lg transition-colors backdrop-blur-sm ${
                        isSaved 
                          ? 'text-purple-600 bg-white/90' 
                          : 'text-gray-600 bg-white/70 hover:bg-white/90'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <span>{article.author}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        )}

        {/* Load More */}
        {!loading && !error && filteredNews.length > 0 && pagination.currentPage < pagination.totalPages && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setPage(prev => prev + 1)}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {content.loadMore || 'Load More'}
            </button>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {content.showing || 'Showing'} {filteredNews.length} {content.of || 'of'} {pagination.total}
            </p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {content.noResults || 'No results found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {content.noResultsDescription || 'Try adjusting your filters or search query'}
            </p>
          </div>
        )}
      </div>

      {/* News Modal */}
      <NewsModal 
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default NewsGrid;