import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Check, X, Trash2, Eye, Calendar, Mail, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BlogCommentsManager = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postIdFromUrl = searchParams.get('postId');
  
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, approved, pending
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    fetchComments();
    fetchStats();
  }, [filter]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      
      let url = `${API_URL}/blog-comments/admin/all`;
      const params = new URLSearchParams();
      
      if (postIdFromUrl) {
        params.append('postId', postIdFromUrl);
      }
      
      if (filter === 'approved') {
        params.append('approved', 'true');
      } else if (filter === 'pending') {
        params.append('approved', 'false');
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axios.get(url);
      
      setComments(response.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog-comments/admin/stats`);
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleToggleApproval = async (commentId) => {
    try {
      await axios.patch(
        `${API_URL}/blog-comments/${commentId}/approve`,
        {}
      );
      
      fetchComments();
      fetchStats();
    } catch (error) {
      console.error('Error toggling approval:', error);
      alert('Failed to update comment status');
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await axios.delete(`${API_URL}/blog-comments/${commentId}`);
      
      fetchComments();
      fetchStats();
      setSelectedComment(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(postIdFromUrl ? '/blog-posts' : '/blog-content')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {postIdFromUrl ? 'Back to Blog Posts' : 'Back to Blog Dashboard'}
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {postIdFromUrl ? 'Post Comments' : 'Blog Comments'}
        </h1>
        <p className="text-gray-600">Manage and moderate blog post comments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Comments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                filter === 'all'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Comments ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                filter === 'pending'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                filter === 'approved'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved ({stats.approved})
            </button>
          </nav>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No comments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {comment.author.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            comment.isApproved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {comment.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {comment.author.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {comment.postId && (
                        <p className="text-sm text-gray-600 mb-2">
                          On post: <span className="font-medium">{comment.postId.translations?.en?.title || 'Unknown'}</span>
                        </p>
                      )}
                      <p className="text-gray-700 mt-2">{comment.content}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleApproval(comment._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        comment.isApproved
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                      title={comment.isApproved ? 'Unapprove' : 'Approve'}
                    >
                      {comment.isApproved ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCommentsManager;
