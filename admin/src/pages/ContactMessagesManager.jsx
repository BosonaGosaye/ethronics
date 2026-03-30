import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  Mail, Search, Filter, Eye, Trash2, Reply, 
  CheckCircle, Clock, Archive, AlertCircle, Download,
  ArrowLeft, Star, StarOff, FileText, Briefcase, User
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
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

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

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`/contact-messages/${id}/read`);
      fetchMessages();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleUpdateStatus = async (id, status, priority) => {
    try {
      await axios.patch(`/contact-messages/${id}/status`, { status, priority });
      fetchMessages();
      fetchStatistics();
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
      alert('Reply sent successfully!');
      setShowReplyModal(false);
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please check SMTP configuration.');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await axios.delete(`/contact-messages/${id}`);
      fetchMessages();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'from-blue-500 to-blue-600',
      'waiting-list': 'from-green-500 to-green-600',
      careers: 'from-purple-600 to-pink-600',
      research: 'from-indigo-500 to-indigo-600',
      internships: 'from-orange-500 to-orange-600',
      partnerships: 'from-teal-500 to-teal-600',
      support: 'from-red-500 to-red-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
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

      {/* Messages List */}
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
          <div className="grid grid-cols-1 gap-6">
            {messages.map((message) => {
              const CategoryIcon = getCategoryIcon(message.category);
              const categoryGradient = getCategoryColor(message.category);
              
              return (
                <div 
                  key={message._id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${categoryGradient} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                          <CategoryIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold">{message.name}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)} bg-white/90`}>
                              {message.status}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(message.priority)} bg-white/90`}>
                              {message.priority}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/90">
                            <Mail className="w-4 h-4" />
                            <p className="text-sm">{message.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        {message.status === 'new' && (
                          <button
                            onClick={() => handleMarkAsRead(message._id)}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
                            title="Mark as read"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowReplyModal(true);
                          }}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
                          title="Reply"
                        >
                          <Reply className="w-5 h-5" />
                        </button>
                        <select
                          value={message.priority}
                          onChange={(e) => handleUpdateStatus(message._id, message.status, e.target.value)}
                          className="px-3 py-2 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white/50"
                        >
                          <option value="low" className="text-gray-900">Low</option>
                          <option value="normal" className="text-gray-900">Normal</option>
                          <option value="high" className="text-gray-900">High</option>
                          <option value="urgent" className="text-gray-900">Urgent</option>
                        </select>
                        <button
                          onClick={() => handleDelete(message._id)}
                          className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors backdrop-blur-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="p-6 space-y-4">
                    {/* Career Application - Enhanced Display */}
                    {message.category === 'careers' ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                          <div className="flex items-start space-x-3">
                            <User className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Application Message</h4>
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
                              
                              {/* Small View CV Button */}
                              {message.resumeUrl && (
                                <div className="mt-4">
                                  <button
                                    onClick={async () => {
                                      setPdfUrl(message.resumeUrl);
                                      setShowPdfModal(true);
                                      setLoadingPdf(true);
                                      
                                      // Fetch PDF and create blob URL
                                      try {
                                        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                                        const publicId = message.resumeUrl.split('/upload/')[1];
                                        const viewUrl = `${apiUrl}/media/view/${publicId}`;
                                        
                                        const response = await fetch(viewUrl);
                                        const blob = await response.blob();
                                        const blobUrl = URL.createObjectURL(blob);
                                        setPdfBlobUrl(blobUrl);
                                      } catch (error) {
                                        console.error('Error loading PDF:', error);
                                      } finally {
                                        setLoadingPdf(false);
                                      }
                                    }}
                                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-md"
                                  >
                                    <FileText className="w-4 h-4" />
                                    <span>View CV</span>
                                  </button>
                                </div>
                              )}
                              
                              {!message.resumeUrl && (
                                <div className="mt-4 inline-flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                                  <span className="text-yellow-800 font-medium">No CV attached</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Beautiful Layout for Other Categories */
                      <div className="space-y-4">
                        <div className={`bg-gradient-to-br ${categoryGradient.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-xl p-5 border-2 border-${message.category === 'support' ? 'red' : message.category === 'research' ? 'indigo' : 'blue'}-200`}>
                          <div className="flex items-start space-x-3">
                            <CategoryIcon className={`w-6 h-6 ${message.category === 'support' ? 'text-red-600' : message.category === 'research' ? 'text-indigo-600' : 'text-blue-600'} mt-1 flex-shrink-0`} />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-3 text-lg capitalize">{message.category} Message</h4>
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
                            </div>
                          </div>
                        </div>

                        {message.resumeUrl && (
                          <div className={`bg-gradient-to-r ${categoryGradient} rounded-xl p-4 shadow-md`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 text-white">
                                <FileText className="w-6 h-6" />
                                <span className="font-semibold">Attachment Available</span>
                              </div>
                              <a
                                href={message.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors font-semibold"
                              >
                                <Download className="w-4 h-4" />
                                <span>View File</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(message.createdAt).toLocaleString()}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryGradient.includes('purple') ? 'bg-purple-100 text-purple-700' : categoryGradient.includes('blue') ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {message.category}
                      </span>
                    </div>
                    {message.repliedAt && (
                      <div className="flex items-center space-x-2 text-sm text-green-600 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Replied on {new Date(message.repliedAt).toLocaleString()}</span>
                      </div>
                    )}
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

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 border-b border-gray-100 ${
              selectedMessage.category === 'careers' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : ''
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                {selectedMessage.category === 'careers' && (
                  <Briefcase className="w-6 h-6" />
                )}
                <h2 className={`text-xl font-bold ${
                  selectedMessage.category === 'careers' ? 'text-white' : 'text-gray-900'
                }`}>
                  Reply to {selectedMessage.name}
                </h2>
              </div>
              <p className={`text-sm ${
                selectedMessage.category === 'careers' ? 'text-purple-100' : 'text-gray-600'
              }`}>
                {selectedMessage.email}
              </p>
              {selectedMessage.category === 'careers' && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-purple-100">
                  <FileText className="w-4 h-4" />
                  <span>Career Application</span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              {/* Career Application Info */}
              {selectedMessage.category === 'careers' && selectedMessage.resumeUrl && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-600 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Resume/CV Attached</p>
                        <p className="text-sm text-gray-600">Review the candidate's resume</p>
                      </div>
                    </div>
                    <a
                      href={selectedMessage.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>View Resume</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {selectedMessage.category === 'careers' ? 'Application Message:' : 'Original Message:'}
                </p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={
                    selectedMessage.category === 'careers'
                      ? "Thank you for your application. We have reviewed your resume and..."
                      : "Type your reply here..."
                  }
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyText('');
                  setSelectedMessage(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={sending}
                className={`px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2 ${
                  selectedMessage.category === 'careers'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
              >
                <Reply className="w-4 h-4" />
                <span>{sending ? 'Sending...' : 'Send Reply'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showPdfModal && pdfUrl && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">CV Preview</h3>
                  <p className="text-sm text-purple-100">Review the candidate's resume</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/media/download/${pdfUrl.split('/upload/')[1]}`}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105 font-semibold shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </a>
                <button
                  onClick={() => {
                    if (pdfBlobUrl) {
                      URL.revokeObjectURL(pdfBlobUrl);
                    }
                    setShowPdfModal(false);
                    setPdfUrl('');
                    setPdfBlobUrl('');
                  }}
                  className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm text-white"
                  title="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-gray-100 overflow-hidden relative">
              {loadingPdf ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading PDF...</p>
                  </div>
                </div>
              ) : pdfBlobUrl ? (
                <iframe
                  src={pdfBlobUrl}
                  className="w-full h-full border-0"
                  title="CV Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No PDF to display</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Use the download button above to save the CV to your device
              </p>
              <button
                onClick={() => {
                  if (pdfBlobUrl) {
                    URL.revokeObjectURL(pdfBlobUrl);
                  }
                  setShowPdfModal(false);
                  setPdfUrl('');
                  setPdfBlobUrl('');
                }}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
