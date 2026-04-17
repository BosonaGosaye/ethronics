import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  Mail, Search, Filter, Eye, Trash2, Reply, 
  CheckCircle, Clock, AlertCircle, Download,
  ArrowLeft, Star, Briefcase, User, FileText, X, ChevronRight
} from 'lucide-react';

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priority: '',
    search: ''
  });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'waiting-list', label: 'Waiting List' },
    { value: 'careers', label: 'Careers' },
    { value: 'research', label: 'Research' },
    { value: 'internships', label: 'Internships' },
    { value: 'partnerships', label: 'Partnerships' },
    { value: 'support', label: 'Support' }
  ];

  const statuses = [
    { value: '', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
    { value: 'archived', label: 'Archived' }
  ];

  const priorities = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  useEffect(() => {
    fetchMessages();
    fetchStatistics();
  }, [filters, pagination.page]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        page: pagination.page,
        limit: 20
      });
      
      const response = await axios.get(`/contact-messages?${params}`);
      setMessages(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/contact-messages/statistics');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };

  const handleViewDetails = async (message) => {
    setSelectedMessage(message);
    setShowDetailModal(true);
    
    // Mark as read if it's new
    if (message.status === 'new') {
      try {
        await axios.patch(`/contact-messages/${message._id}/read`);
        fetchMessages();
        fetchStatistics();
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
  };

  const handleUpdateStatus = async (id, status, priority) => {
    try {
      await axios.patch(`/contact-messages/${id}/status`, { status, priority });
      fetchMessages();
      fetchStatistics();
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status, priority });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) {
      alert('Please enter a reply message');
      return;
    }

    try {
      setSending(true);
      await axios.post(`/contact-messages/${selectedMessage._id}/reply`, {
        replyMessage: replyText
      });
      alert('✅ Reply sent successfully!');
      setShowReplyModal(false);
      setReplyText('');
      fetchMessages();
      fetchStatistics();
      if (selectedMessage) {
        setSelectedMessage({ ...selectedMessage, status: 'replied', repliedAt: new Date() });
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send reply';
      const errorHint = error.response?.data?.hint || '';
      alert(`❌ ${errorMessage}\n\n${errorHint}`);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await axios.delete(`/contact-messages/${id}`);
      setShowDetailModal(false);
      setSelectedMessage(null);
      fetchMessages();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'blue',
      'waiting-list': 'green',
      careers: 'purple',
      research: 'indigo',
      internships: 'orange',
      partnerships: 'teal',
      support: 'red'
    };
    return colors[category] || 'gray';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'careers':
        return Briefcase;
      case 'research':
        return Star;
      case 'internships':
        return User;
      case 'partnerships':
        return CheckCircle;
      case 'support':
        return AlertCircle;
      case 'waiting-list':
        return Clock;
      default:
        return Mail;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-gray-100 text-gray-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-600',
      normal: 'bg-blue-100 text-blue-600',
      high: 'bg-orange-100 text-orange-600',
      urgent: 'bg-red-100 text-red-600'
    };
    return colors[priority] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/contact"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
              <p className="text-orange-100">
                Manage and respond to contact form submissions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Mail className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.total || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Total Messages</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{stats.byStatus?.new || 0}</span>
          </div>
          <p className="text-sm text-gray-600">New Messages</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{stats.byStatus?.replied || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Replied</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-600">{stats.byPriority?.urgent || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Urgent</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Name, email, message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Messages List - Card View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((message) => {
              const CategoryIcon = getCategoryIcon(message.category);
              const categoryColor = getCategoryColor(message.category);
              
              return (
                <div 
                  key={message._id} 
                  onClick={() => handleViewDetails(message)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div className={`bg-${categoryColor}-100 p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                        <CategoryIcon className={`w-6 h-6 text-${categoryColor}-600`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {message.name}
                          </h3>
                          {message.status === 'new' && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                              NEW
                            </span>
                          )}
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getPriorityColor(message.priority)}`}>
                            {message.priority}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{message.email}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-700`}>
                            {message.category}
                          </span>
                          {message.resumeUrl && (
                            <div className="flex items-center space-x-1 text-purple-600">
                              <FileText className="w-4 h-4" />
                              <span className="text-xs font-medium">Has attachment</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.pages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className={`bg-gradient-to-r from-${getCategoryColor(selectedMessage.category)}-600 to-${getCategoryColor(selectedMessage.category)}-700 p-6 text-white`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {(() => {
                    const Icon = getCategoryIcon(selectedMessage.category);
                    return (
                      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <Icon className="w-8 h-8" />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedMessage.name}</h2>
                    <p className="text-white/90">{selectedMessage.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMessage.status)} bg-white/90`}>
                        {selectedMessage.status}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedMessage.priority)} bg-white/90`}>
                        {selectedMessage.priority}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm">
                        {selectedMessage.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedMessage(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Message */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Message</h3>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="text-lg font-bold text-gray-900 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Attachment */}
              {selectedMessage.resumeUrl && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Attachment</h3>
                  <div className={`bg-gradient-to-r from-${getCategoryColor(selectedMessage.category)}-50 to-${getCategoryColor(selectedMessage.category)}-100 rounded-xl p-5 border-2 border-${getCategoryColor(selectedMessage.category)}-200`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`bg-${getCategoryColor(selectedMessage.category)}-600 p-3 rounded-lg`}>
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">File Attached</p>
                          <p className="text-sm text-gray-600">Click to view or download</p>
                        </div>
                      </div>
                      <a
                        href={selectedMessage.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-5 py-2.5 bg-${getCategoryColor(selectedMessage.category)}-600 text-white rounded-lg hover:bg-${getCategoryColor(selectedMessage.category)}-700 transition-colors font-semibold`}
                      >
                        <Download className="w-5 h-5" />
                        <span>View File</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Received</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedMessage.readAt && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Read</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedMessage.readAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {selectedMessage.repliedAt && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs text-green-600 mb-1">Replied</p>
                      <p className="text-sm font-medium text-green-900">
                        {new Date(selectedMessage.repliedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Message if exists */}
              {selectedMessage.replyMessage && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Your Reply</h3>
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedMessage.replyMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <select
                  value={selectedMessage.status}
                  onChange={(e) => handleUpdateStatus(selectedMessage._id, e.target.value, selectedMessage.priority)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={selectedMessage.priority}
                  onChange={(e) => handleUpdateStatus(selectedMessage._id, selectedMessage.status, e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="px-5 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => {
                    setShowReplyModal(true);
                    setShowDetailModal(false);
                  }}
                  className={`px-5 py-2.5 bg-gradient-to-r from-${getCategoryColor(selectedMessage.category)}-600 to-${getCategoryColor(selectedMessage.category)}-700 text-white rounded-lg hover:from-${getCategoryColor(selectedMessage.category)}-700 hover:to-${getCategoryColor(selectedMessage.category)}-800 transition-colors flex items-center space-x-2`}
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 border-b border-gray-100 bg-gradient-to-r from-${getCategoryColor(selectedMessage.category)}-600 to-${getCategoryColor(selectedMessage.category)}-700 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">Reply to {selectedMessage.name}</h2>
                  <p className="text-sm text-white/90">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setShowDetailModal(true);
                    setReplyText('');
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Original Message:</p>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Type your reply here..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setShowDetailModal(true);
                  setReplyText('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={sending}
                className={`px-6 py-2 bg-gradient-to-r from-${getCategoryColor(selectedMessage.category)}-600 to-${getCategoryColor(selectedMessage.category)}-700 text-white rounded-lg hover:from-${getCategoryColor(selectedMessage.category)}-700 hover:to-${getCategoryColor(selectedMessage.category)}-800 transition-colors disabled:opacity-50 flex items-center space-x-2`}
              >
                <Reply className="w-4 h-4" />
                <span>{sending ? 'Sending...' : 'Send Reply'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
