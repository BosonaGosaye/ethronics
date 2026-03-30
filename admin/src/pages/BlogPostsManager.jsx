import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, Search, Filter, MessageCircle, ArrowLeft } from 'lucide-react';

export default function BlogPostsManager() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, featured: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [commentCounts, setCommentCounts] = useState({});

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'research', label: 'Research & Development' },
    { value: 'education', label: 'Education' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'partnerships', label: 'Partnerships' },
    { value: 'community', label: 'Community' }
  ];

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, [categoryFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoryFilter !== 'all') {
        params.category = categoryFilter;
      }
      
      const response = await axios.get('/blog-posts', { params });
      const postsData = response.data.data;
      setPosts(postsData);
      
      // Fetch comment counts for each post
      const counts = {};
      await Promise.all(
        postsData.map(async (post) => {
          try {
            const countResponse = await axios.get(`/blog-comments/post/${post._id}/count`);
            counts[post._id] = countResponse.data;
          } catch (error) {
            console.error(`Failed to fetch comment count for post ${post._id}:`, error);
            counts[post._id] = { approved: 0, total: 0, pending: 0 };
          }
        })
      );
      setCommentCounts(counts);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      alert('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/blog-posts/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await axios.delete(`/blog-posts/${id}`);
      alert('Blog post deleted successfully');
      fetchPosts();
      fetchStats();
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      alert('Failed to delete blog post');
    }
  };

  const togglePublish = async (id) => {
    try {
      await axios.patch(`/blog-posts/${id}/publish`);
      fetchPosts();
      fetchStats();
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      alert('Failed to update publish status');
    }
  };

  const toggleFeatured = async (id) => {
    try {
      await axios.patch(`/blog-posts/${id}/featured`);
      fetchPosts();
      fetchStats();
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
      alert('Failed to update featured status');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.translations.en.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.translations.en.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/blog-content')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts Management</h1>
            <p className="text-gray-600 mt-1">Create and manage blog posts with multi-language support</p>
          </div>
          <Link
            to="/blog-posts/new"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>New Blog Post</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Published</p>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Featured</p>
          <p className="text-3xl font-bold text-orange-600">{stats.featured}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts by title, excerpt, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No blog posts found. Create your first post to get started!
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.translations.en.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{post.translations.en.title}</p>
                          <p className="text-sm text-gray-500">{post.slug}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(post.publishDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.author.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>👁️ {post.stats.views} views</div>
                        <button
                          onClick={() => navigate(`/blog-comments?postId=${post._id}`)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                          title="View comments"
                        >
                          <MessageCircle className="w-3 h-3" />
                          {commentCounts[post._id] ? (
                            <>
                              {commentCounts[post._id].total} comment{commentCounts[post._id].total !== 1 ? 's' : ''}
                              {commentCounts[post._id].pending > 0 && (
                                <span className="text-orange-600 font-medium">
                                  ({commentCounts[post._id].pending} pending)
                                </span>
                              )}
                            </>
                          ) : (
                            '0 comments'
                          )}
                        </button>
                        <div>❤️ {post.stats.likes} likes</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                        {post.featured && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => toggleFeatured(post._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            post.featured
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={post.featured ? 'Unmark as featured' : 'Mark as featured'}
                        >
                          {post.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => togglePublish(post._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            post.isPublished
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={post.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {post.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <Link
                          to={`/blog-posts/edit/${post._id}`}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
