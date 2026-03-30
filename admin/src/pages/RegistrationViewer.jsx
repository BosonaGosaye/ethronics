import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  ArrowLeft, User, Mail, Phone, School, Calendar, Clock,
  CheckCircle, XCircle, AlertCircle, DollarSign, FileText,
  Send, Plus, Edit2, Save, X
} from 'lucide-react';

export default function RegistrationViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Edit states
  const [editMode, setEditMode] = useState({
    status: false,
    payment: false,
    exam: false
  });
  
  const [formData, setFormData] = useState({
    status: '',
    paymentStatus: '',
    examStatus: '',
    examScore: ''
  });
  
  // Note state
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  
  // Email state
  const [emailForm, setEmailForm] = useState({
    subject: '',
    body: ''
  });
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    fetchRegistration();
  }, [id]);

  const fetchRegistration = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/registrations/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const data = response.data.data;
        setRegistration(data);
        setFormData({
          status: data.status,
          paymentStatus: data.paymentStatus,
          examStatus: data.examStatus,
          examScore: data.examScore || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch registration:', error);
      alert('Failed to load registration');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (field) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const updateData = {};
      
      if (field === 'status') updateData.status = formData.status;
      if (field === 'payment') updateData.paymentStatus = formData.paymentStatus;
      if (field === 'exam') {
        updateData.examStatus = formData.examStatus;
        if (formData.examScore) updateData.examScore = parseInt(formData.examScore);
      }
      
      const response = await axios.put(`/registrations/admin/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setRegistration(response.data.data);
        setEditMode({ ...editMode, [field]: false });
      }
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update registration');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setAddingNote(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/registrations/admin/${id}/note`,
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setRegistration(response.data.data);
        setNewNote('');
      }
    } catch (error) {
      console.error('Failed to add note:', error);
      alert('Failed to add note');
    } finally {
      setAddingNote(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailForm.subject.trim() || !emailForm.body.trim()) {
      alert('Please fill in both subject and body');
      return;
    }
    
    setSendingEmail(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/registrations/admin/${id}/email`,
        emailForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setRegistration(response.data.data);
        setEmailForm({ subject: '', body: '' });
        setShowEmailForm(false);
        alert('Email sent successfully!');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show detailed error message
      let errorMessage = 'Failed to send email';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        if (error.response.data.hint) {
          errorMessage += '\n\n' + error.response.data.hint;
        }
      } else if (error.message) {
        errorMessage += ': ' + error.message;
      }
      
      alert(errorMessage);
    } finally {
      setSendingEmail(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      waitlist: 'blue'
    };
    return colors[status] || 'gray';
  };

  const getPaymentColor = (status) => {
    const colors = {
      unpaid: 'red',
      partial: 'yellow',
      paid: 'green'
    };
    return colors[status] || 'gray';
  };

  const getExamColor = (status) => {
    const colors = {
      not_taken: 'gray',
      scheduled: 'blue',
      passed: 'green',
      failed: 'red'
    };
    return colors[status] || 'gray';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Registration not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/registrations')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{registration.studentName}</h1>
            <p className="text-gray-600 mt-1">Registration Details</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          ID: {registration._id}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Student Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="font-medium text-gray-900">{registration.studentName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Age</label>
                <p className="font-medium text-gray-900">{registration.studentAge} years</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Gender</label>
                <p className="font-medium text-gray-900 capitalize">{registration.studentGender}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Grade</label>
                <p className="font-medium text-gray-900">{registration.grade}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">School</label>
                <p className="font-medium text-gray-900">{registration.school}</p>
              </div>
              {registration.studentEmail && (
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="font-medium text-gray-900">{registration.studentEmail}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-600">Experience Level</label>
                <p className="font-medium text-gray-900 capitalize">{registration.experience.replace(/([A-Z])/g, ' $1')}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Preferred Session</label>
                <p className="font-medium text-gray-900 capitalize">{registration.session}</p>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Guardian Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Guardian Name</label>
                <p className="font-medium text-gray-900">{registration.guardianName}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </label>
                <p className="font-medium text-gray-900">{registration.guardianEmail}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Emergency Contact
                </label>
                <p className="font-medium text-gray-900">{registration.emergency}</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Notes
            </h2>
            
            {/* Add Note */}
            <div className="mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleAddNote}
                disabled={addingNote || !newNote.trim()}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {addingNote ? 'Adding...' : 'Add Note'}
              </button>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {registration.notes && registration.notes.length > 0 ? (
                registration.notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(note.addedAt).toLocaleString()} • {note.addedBy}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No notes yet</p>
              )}
            </div>
          </div>

          {/* Email Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-green-600" />
                Email Communication
              </span>
              <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                {showEmailForm ? 'Cancel' : 'Send Email'}
              </button>
            </h2>

            {/* Email Form */}
            {showEmailForm && (
              <div className="mb-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Email subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={emailForm.body}
                    onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Email message"
                  />
                </div>
                <button
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sendingEmail ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            )}

            {/* Email History */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Email History</h3>
              {registration.emailsSent && registration.emailsSent.length > 0 ? (
                registration.emailsSent.map((email, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{email.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">{email.body}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(email.sentAt).toLocaleString()} • Sent by {email.sentBy}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No emails sent yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          {/* Registration Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
              <span>Registration Status</span>
              {!editMode.status && (
                <button
                  onClick={() => setEditMode({ ...editMode, status: true })}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </h3>
            
            {editMode.status ? (
              <div className="space-y-3">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlist">Waitlist</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate('status')}
                    disabled={updating}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode({ ...editMode, status: false });
                      setFormData({ ...formData, status: registration.status });
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-${getStatusColor(registration.status)}-100 text-${getStatusColor(registration.status)}-800`}>
                {registration.status}
              </span>
            )}
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Payment Status
              </span>
              {!editMode.payment && (
                <button
                  onClick={() => setEditMode({ ...editMode, payment: true })}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </h3>
            
            {editMode.payment ? (
              <div className="space-y-3">
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="partial">Partial</option>
                  <option value="paid">Paid</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate('payment')}
                    disabled={updating}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode({ ...editMode, payment: false });
                      setFormData({ ...formData, paymentStatus: registration.paymentStatus });
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-${getPaymentColor(registration.paymentStatus)}-100 text-${getPaymentColor(registration.paymentStatus)}-800`}>
                {registration.paymentStatus}
              </span>
            )}
          </div>

          {/* Exam Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <School className="w-4 h-4 mr-1" />
                Exam Status
              </span>
              {!editMode.exam && (
                <button
                  onClick={() => setEditMode({ ...editMode, exam: true })}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </h3>
            
            {editMode.exam ? (
              <div className="space-y-3">
                <select
                  value={formData.examStatus}
                  onChange={(e) => setFormData({ ...formData, examStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="not_taken">Not Taken</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.examScore}
                  onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
                  placeholder="Exam Score (0-100)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate('exam')}
                    disabled={updating}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode({ ...editMode, exam: false });
                      setFormData({ 
                        ...formData, 
                        examStatus: registration.examStatus,
                        examScore: registration.examScore || ''
                      });
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-${getExamColor(registration.examStatus)}-100 text-${getExamColor(registration.examStatus)}-800`}>
                  {registration.examStatus.replace('_', ' ')}
                </span>
                {registration.examScore && (
                  <p className="mt-2 text-sm text-gray-600">
                    Score: <span className="font-medium">{registration.examScore}/100</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Metadata</h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-gray-600">Language</label>
                <p className="font-medium text-gray-900 uppercase">{registration.language}</p>
              </div>
              <div>
                <label className="text-gray-600">Source</label>
                <p className="font-medium text-gray-900 capitalize">{registration.source}</p>
              </div>
              <div>
                <label className="text-gray-600">Submitted</label>
                <p className="font-medium text-gray-900">
                  {new Date(registration.createdAt).toLocaleString()}
                </p>
              </div>
              {registration.ipAddress && (
                <div>
                  <label className="text-gray-600">IP Address</label>
                  <p className="font-medium text-gray-900">{registration.ipAddress}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
