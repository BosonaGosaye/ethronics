import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Eye, MessageCircle, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedPosts = ({ content, posts, loading }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    featuredPosts: 'Featured Posts',
    readMore: 'Read More',
    views: 'views',
    comments: 'comments',
    likes: 'likes'
  };
  const [selectedPost, setSelectedPost] = useState(null);

  // Get featured posts from backend only
  const featuredPosts = posts && posts.length > 0 
    ? posts.filter(post => post.featured).slice(0, 3).map(post => ({
        id: post._id,
        title: post.translations[language]?.title || post.translations.en.title,
        excerpt: post.translations[language]?.excerpt || post.translations.en.excerpt,
        author: post.author,
        category: post.category,
        publishDate: post.publishDate,
        readTime: post.readTime,
        image: post.image,
        tags: post.tags,
        stats: post.stats,
        featured: post.featured,
        slug: post.slug
      }))
    : [];

  const displayTitle = content?.title || t.featured;
  const displayDescription = content?.description || '';
  const displayTrendingTopics = content?.trendingTopics || t.trendingTopics;

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {displayTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {displayDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Post */}
          <div className="lg:col-span-2">
            <article className="group cursor-pointer" onClick={() => navigate(`/blog/${featuredPosts[0].slug}`)}>
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img 
                  src={featuredPosts[0].image} 
                  alt={featuredPosts[0].title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                    {t.featured}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-4 text-white text-sm mb-2">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredPosts[0].stats.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {featuredPosts[0].stats?.comments || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {featuredPosts[0].stats?.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full font-medium">
                    {featuredPosts[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPosts[0].publishDate).toLocaleDateString()}
                  </span>
                  <span>{featuredPosts[0].readTime}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {featuredPosts[0].title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {featuredPosts[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredPosts[0].author.avatar} 
                      alt={featuredPosts[0].author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {featuredPosts[0].author.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {featuredPosts[0].author.role}
                      </p>
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-3 transition-all">
                    {t.readMore}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Secondary Featured Posts */}
          <div className="space-y-8">
            {featuredPosts.slice(1).map((post) => (
              <article 
                key={post.id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-3 text-white text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.stats.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.stats.comments}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.trendingTopics}
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(featuredPosts.flatMap(post => post.tags))).map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;