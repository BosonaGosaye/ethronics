import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Heart, MessageCircle, Share2, ArrowLeft, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState({ approved: 0, total: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  // Comment form state
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    fetchPostAndComments();
  }, [slug]);

  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch post
      const postResponse = await axios.get(`${API_URL}/blog-posts/public/slug/${slug}`);
      setPost(postResponse.data.data);
      setLikeCount(postResponse.data.data.stats.likes);

      // Fetch comments
      const commentsResponse = await axios.get(`${API_URL}/blog-comments/post/${postResponse.data.data._id}`);
      setComments(commentsResponse.data);

      // Fetch comment count
      const countResponse = await axios.get(`${API_URL}/blog-comments/post/${postResponse.data.data._id}/count`);
      setCommentCount(countResponse.data);

      // Check if user has liked (from localStorage)
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setLiked(likedPosts.includes(postResponse.data.data._id));
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;

    try {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      
      if (liked) {
        // Unlike
        await axios.post(`${API_URL}/blog-posts/public/${post._id}/unlike`);
        setLiked(false);
        setLikeCount(prev => prev - 1);
        const updatedLikes = likedPosts.filter(id => id !== post._id);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
      } else {
        // Like
        await axios.post(`${API_URL}/blog-posts/public/${post._id}/like`);
        setLiked(true);
        setLikeCount(prev => prev + 1);
        likedPosts.push(post._id);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmittingComment(true);
      
      const response = await axios.post(`${API_URL}/blog-comments`, {
        postId: post._id,
        author: {
          name: commentForm.name,
          email: commentForm.email
        },
        content: commentForm.content
      });

      console.log('Comment submitted:', response.data);
      
      setCommentSuccess(true);
      setCommentForm({ name: '', email: '', content: '' });
      
      // Refresh comments after a short delay
      setTimeout(() => {
        fetchPostAndComments();
      }, 1000);
      
      setTimeout(() => {
        setCommentSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting comment:', err);
      console.error('Error response:', err.response?.data);
      alert(`Failed to submit comment: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.translations[language]?.title || post.translations.en.title,
        text: post.translations[language]?.excerpt || post.translations.en.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <p className="text-red-800 dark:text-red-200">Post not found or error loading post.</p>
            <button
              onClick={() => navigate('/blog')}
              className="mt-4 text-purple-600 dark:text-purple-400 hover:underline"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const postContent = post.translations[language] || post.translations.en;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Blog
        </button>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <img
            src={post.image}
            alt={postContent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 md:p-12">
          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium">
              {post.category.replace('-', ' & ').toUpperCase()}
            </span>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {postContent.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {postContent.excerpt}
          </p>

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: postContent.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
            
            <button
              onClick={() => {
                const commentsSection = document.getElementById('comments-section');
                if (commentsSection) {
                  commentsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>
                {commentCount.approved} {commentCount.approved === 1 ? 'Comment' : 'Comments'}
              </span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors ml-auto"
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12" id="comments-section">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Comments ({commentCount.approved})
          </h2>

          {/* Comment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Leave a Comment
            </h3>
            
            {commentSuccess && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  Comment submitted successfully! It will be visible after admin approval.
                </p>
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={commentForm.email}
                  onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <textarea
                placeholder="Your Comment"
                value={commentForm.content}
                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                disabled={submittingComment}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingComment ? 'Submitting...' : 'Submit Comment'}
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comment.author.name}
                      </p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {comments.length === 0 && !commentSuccess && (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
            
            {comments.length === 0 && commentSuccess && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Your comment has been submitted!
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  It will appear here once approved by an administrator.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
