import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  ArrowLeft, Search, Star, StarOff, MessageSquare, Trash2, 
  CheckCircle, Clock, Archive, Eye, Plus
} from 'lucide-react';

export default function FAQQuestionsManager() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [importantFilter, setImportantFilter] = useState(false);
  const [stats, setStats] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [reply, setReply] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
    fetchStatistics();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [searchTerm, statusFilter, importantFilter, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/faq-questions');
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      alert('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/faq-questions/statistics');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(q => q.status === statusFilter);
    }

    if (importantFilter) {
      filtered = filtered.filter(q => q.isImportant);
    }

    setFilteredQuestions(filtered);
  };

  const toggleImportant = async (id) => {
    try {
      await axios.patch(`/faq-questions/${id}/important`);
      fetchQuestions();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to toggle important:', error);
      alert('Failed to update status');
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) {
      alert('Please enter a reply');
      return;
    }

    try {
      await axios.post(`/faq-questions/${selectedQuestion._id}/reply`, { reply });
      alert('Reply sent successfully!');
      setShowReplyModal(false);
      setReply('');
      setSelectedQuestion(null);
      fetchQuestions();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply');
    }
  };

  const handleConvertToFAQ = async () => {
    if (!answer.trim()) {
      alert('Please enter an answer');
      return;
    }

    try {
      await axios.post(`/faq-questions/${selectedQuestion._id}/convert-to-faq`, {
        answer,
        translations: {
          en: {
            question: selectedQuestion.question,
            answer: answer,
            tags: []
          },
          am: {
            question: selectedQuestion.question,
            answer: answer,
            tags: []
          },
          om: {
            question: selectedQuestion.question,
            answer: answer,
            tags: []
          }
        }
      });
      alert('Question converted to FAQ successfully!');
      setShowConvertModal(false);
      setAnswer('');
      setSelectedQuestion(null);
      fetchQuestions();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to convert to FAQ:', error);
      alert('Failed to convert to FAQ');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await axios.delete(`/faq-questions/${id}`);
      alert('Question deleted successfully');
      fetchQuestions();
      fetchStatistics();
    } catch (error) {
      console.error('Failed to delete question:', error);
      alert('Failed to delete question');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'yellow', text: 'Pending', icon: Clock },
      replied: { color: 'green', text: 'Replied', icon: CheckCircle },
      converted: { color: 'purple', text: 'Converted', icon: Plus },
      archived: { color: 'gray', text: 'Archived', icon: Archive }
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-${badge.color}-100 text-${badge.color}-800 rounded`}>
        <Icon className="w-3 h-3" />
        <span>{badge.text}</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/faq-dashboard')}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FAQ Questions</h1>
            <p className="text-gray-600 mt-1">Manage user submitted questions</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-600">Replied</p>
            <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-600">Converted</p>
            <p className="text-2xl font-bold text-purple-600">{stats.converted}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-600">Important</p>
            <p className="text-2xl font-bold text-red-600">{stats.important}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
          <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={importantFilter}
              onChange={(e) => setImportantFilter(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">Important Only</span>
          </label>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No questions found
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((question) => (
                  <tr key={question._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        {question.isImportant && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0 mt-1" />
                        )}
                        <p className="text-sm text-gray-900 line-clamp-2 max-w-md">
                          {question.question}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{question.name}</p>
                        <p className="text-gray-500">{question.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(question.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(question.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => toggleImportant(question._id)}
                          className={`p-2 rounded transition-colors ${
                            question.isImportant
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title="Toggle Important"
                        >
                          {question.isImportant ? (
                            <Star className="w-4 h-4 fill-current" />
                          ) : (
                            <StarOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuestion(question);
                            setShowReplyModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Reply"
                          disabled={question.status === 'converted'}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuestion(question);
                            setShowConvertModal(true);
                          }}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Convert to FAQ"
                          disabled={question.convertedToFAQ}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuestion(question);
                            setShowDetailsModal(true);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(question._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
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

      {/* Reply Modal */}
      {showReplyModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reply to Question</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Question from {selectedQuestion.name}:</p>
              <p className="text-gray-900">{selectedQuestion.question}</p>
            </div>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Enter your reply..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setReply('');
                  setSelectedQuestion(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Question Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedQuestion(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status and Important */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusBadge(selectedQuestion.status)}
                  {selectedQuestion.isImportant && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Important</span>
                    </span>
                  )}
                  {selectedQuestion.convertedToFAQ && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      <Plus className="w-4 h-4" />
                      <span>Converted to FAQ</span>
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(selectedQuestion.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{selectedQuestion.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedQuestion.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Language</p>
                    <p className="font-medium text-gray-900 uppercase">{selectedQuestion.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedQuestion.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Question</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedQuestion.question}</p>
                </div>
              </div>

              {/* Reply */}
              {selectedQuestion.reply && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Reply</h4>
                    {selectedQuestion.repliedAt && (
                      <span className="text-sm text-gray-500">
                        Replied on {new Date(selectedQuestion.repliedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuestion.reply}</p>
                  </div>
                  {selectedQuestion.repliedBy && (
                    <p className="text-sm text-gray-600 mt-2">
                      Replied by: {selectedQuestion.repliedBy.name || selectedQuestion.repliedBy.email}
                    </p>
                  )}
                </div>
              )}

              {/* FAQ Item Link */}
              {selectedQuestion.convertedToFAQ && selectedQuestion.faqItemId && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Converted to FAQ Item</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    This question has been converted to an FAQ item.
                  </p>
                  {selectedQuestion.faqItemId.translations?.en?.question && (
                    <p className="text-gray-900 font-medium">
                      "{selectedQuestion.faqItemId.translations.en.question}"
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              {selectedQuestion.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Admin Notes</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuestion.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {!selectedQuestion.convertedToFAQ && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowReplyModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Reply to User
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowConvertModal(true);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Convert to FAQ
                    </button>
                  </>
                )}
                <button
                  onClick={() => toggleImportant(selectedQuestion._id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedQuestion.isImportant
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedQuestion.isImportant ? 'Remove Important' : 'Mark Important'}
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedQuestion(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Convert to FAQ Modal */}
      {showConvertModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Convert to FAQ Item</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Question:</p>
              <p className="text-gray-900 font-medium">{selectedQuestion.question}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer (will be used for all languages initially)
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer to this question..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can edit translations later in the FAQ Items Manager
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowConvertModal(false);
                  setAnswer('');
                  setSelectedQuestion(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConvertToFAQ}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Convert to FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
