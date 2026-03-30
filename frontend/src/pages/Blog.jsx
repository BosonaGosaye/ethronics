import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogHero from '../components/BlogHero';
import BlogFilter from '../components/BlogFilter';
import FeaturedPosts from '../components/FeaturedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { useBlogContent } from '../hooks/useBlogContent';

const Blog = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { content, posts, stats, loading, error } = useBlogContent(language);
  
  // Get UI translations from backend content
  const t = content.blogGrid?.ui || {
    loadingPosts: 'Loading posts...',
    errorLoading: 'Error loading posts',
    allPosts: 'All Posts',
    postFound: 'post found',
    postsFound: 'posts found',
    noPostsFound: 'No posts found matching your criteria',
    comments: 'comments',
    likes: 'likes',
    readFullArticle: 'Read Full Article →'
  };
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // BlogGrid component with backend data only
  const BlogGrid = ({ selectedCategory, selectedTag, searchQuery, sortBy }) => {
    // Get posts from backend only
    const allPosts = posts.length > 0 ? posts.map(post => ({
      id: post._id,
      title: post.translations[language]?.title || post.translations.en.title,
      excerpt: post.translations[language]?.excerpt || post.translations.en.excerpt,
      content: post.translations[language]?.content || post.translations.en.content,
      author: post.author,
      category: post.category,
      publishDate: post.publishDate,
      readTime: post.readTime,
      image: post.image,
      tags: post.tags,
      stats: post.stats,
      featured: post.featured,
      slug: post.slug
    })) : [];

    // Filter posts
    let filteredPosts = allPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.some(tag => 
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      );
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesTag && matchesSearch;
    });

    // Sort posts
    filteredPosts = filteredPosts.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'popular':
          return (b.stats?.views || 0) - (a.stats?.views || 0);
        case 'trending':
          return (b.stats?.likes || 0) - (a.stats?.likes || 0);
        default:
          return 0;
      }
    });

    return (
      <div>
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t.loadingPosts}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-800 dark:text-red-200">{t.errorLoading}: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCategory === 'all' ? t.allPosts : 
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' & ')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredPosts.length} {filteredPosts.length === 1 ? t.postFound : t.postsFound}
                </p>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">{t.noPostsFound}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
                          {post.category.replace('-', ' & ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {post.author.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {post.author.role}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/blog/${post.slug}#comments-section`);
                            }}
                            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            {post.stats?.comments || 0} {t.comments}
                          </button>
                          <span>{post.stats?.likes || 0} {t.likes}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/blog/${post.slug}`);
                          }}
                          className="text-purple-600 dark:text-purple-400 font-medium text-sm hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        >
                          {t.readFullArticle}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <BlogHero content={content.hero} stats={stats} loading={loading} />
      <BlogFilter 
        content={content.filter}
        stats={stats}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <FeaturedPosts content={content.featured} posts={posts} loading={loading} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogGrid 
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar 
              content={content.sidebar}
              posts={posts}
              stats={stats}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;