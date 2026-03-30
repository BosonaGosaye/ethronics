import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Eye, Mail, Phone, Calendar, Star } from 'lucide-react';
import PDFViewer from '../components/PDFViewer';

const STATUS_OPTIONS = ['pending', 'reviewing', 'shortlisted', 'interviewed', 'accepted', 'rejected'];

export default function ApplicationViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/applications/admin/${id}`);
      const app = response.data.data;
      setApplication(app);
      setStatus(app.status);
      setNotes(app.notes || '');
      setRating(app.rating || 0);
    } catch (error) {
      console.error('Failed to fetch application:', error);
      alert('Failed to load application');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await axios.patch(`/applications/admin/${id}`, {
        status,
        notes,
        rating
      });
      alert('Application updated successfully!');
      fetchApplication();
    } catch (error) {
      console.error('Failed to update application:', error);
      alert('Failed to update application');
    } finally {
      setUpdating(false);
    }
  };

  const getFileExtension = (filename) => {
    if (!filename) return 'pdf';
    const ext = filename.split('.').pop().toLowerCase();
    return ext || 'pdf';
  };

  const handleViewResume = () => {
    setShowPDFViewer(true);
  };

  const handleDownloadResume = async () => {
    try {
      // Use backend proxy endpoint to download file with correct filename
      const response = await axios.get(`/applications/admin/${id}/download-resume`, {
        responseType: 'blob'
      });
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = application.resume.filename || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download resume:', error);
      alert('Failed to download resume');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* PDF Viewer Modal */}
      {showPDFViewer && application?.resume?.url && (
        <PDFViewer
          fileUrl={application.resume.url}
          fileName={application.resume.filename || 'resume.pdf'}
          fileType={getFileExtension(application.resume.filename)}
          onClose={() => setShowPDFViewer(false)}
        />
      )}

      <div className="mb-8">
        <button
          onClick={() => navigate('/applications')}
          className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Applications</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Applicant Information</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-semibold text-lg">
                    {application.firstName[0]}{application.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {application.firstName} {application.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{application.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${application.email}`} className="hover:text-teal-600">
                  {application.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{application.phone}</span>
              </div>
              {application.linkedIn && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-sm">LinkedIn:</span>
                  <a href={application.linkedIn} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                    Profile
                  </a>
                </div>
              )}
              {application.portfolio && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-sm">Portfolio:</span>
                  <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                    View
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Job Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Applied For</h2>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {application.job?.translations?.en?.title || application.job?.title || 'N/A'}
              </p>
              <p className="text-gray-600">{application.job?.company || 'N/A'}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{application.job?.location || 'N/A'}</span>
                <span>•</span>
                <span>{application.job?.type || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Education Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Education Level</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {application.educationLevel?.replace('-', ' ') || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">University/College</p>
                  <p className="font-medium text-gray-900">{application.university || 'Not specified'}</p>
                </div>
              </div>
              
              {(application.department || application.fieldOfStudy) && (
                <div className="grid grid-cols-2 gap-4">
                  {application.department && (
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium text-gray-900">{application.department}</p>
                    </div>
                  )}
                  {application.fieldOfStudy && (
                    <div>
                      <p className="text-sm text-gray-500">Field of Study</p>
                      <p className="font-medium text-gray-900">{application.fieldOfStudy}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4">
                {application.graduationYear && (
                  <div>
                    <p className="text-sm text-gray-500">Graduation Year</p>
                    <p className="font-medium text-gray-900">{application.graduationYear}</p>
                  </div>
                )}
                {application.cgpa && (
                  <div>
                    <p className="text-sm text-gray-500">CGPA</p>
                    <p className="font-medium text-gray-900">{application.cgpa} / 4.0</p>
                  </div>
                )}
                {application.exitExamScore && (
                  <div>
                    <p className="text-sm text-gray-500">Exit Exam Score</p>
                    <p className="font-medium text-gray-900">{application.exitExamScore}%</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
          </div>

          {/* Work Experience */}
          {(application.yearsOfExperience || application.currentCompany || application.expectedSalary || application.availableFrom) && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
              <div className="grid grid-cols-2 gap-4">
                {application.yearsOfExperience && (
                  <div>
                    <p className="text-sm text-gray-500">Years of Experience</p>
                    <p className="font-medium text-gray-900">{application.yearsOfExperience} years</p>
                  </div>
                )}
                {application.currentCompany && (
                  <div>
                    <p className="text-sm text-gray-500">Current Company</p>
                    <p className="font-medium text-gray-900">{application.currentCompany}</p>
                  </div>
                )}
                {application.expectedSalary && (
                  <div>
                    <p className="text-sm text-gray-500">Expected Salary</p>
                    <p className="font-medium text-gray-900">{application.expectedSalary}</p>
                  </div>
                )}
                {application.availableFrom && (
                  <div>
                    <p className="text-sm text-gray-500">Available From</p>
                    <p className="font-medium text-gray-900">{new Date(application.availableFrom).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {application.certifications && application.certifications.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
              <div className="space-y-3">
                {application.certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {application.languages && application.languages.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {application.languages.map((lang, index) => (
                  <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                    {lang.language} <span className="text-purple-600">({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {application.skills && application.skills.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {application.references && application.references.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">References</h2>
              <div className="space-y-4">
                {application.references.map((ref, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                    <p className="font-medium text-gray-900 text-lg">{ref.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{ref.position} at {ref.company}</p>
                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${ref.email}`} className="hover:text-teal-600">
                          {ref.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{ref.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resume */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Resume/CV</h3>
            {application.resume?.url ? (
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">File:</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {application.resume.filename || 'resume.pdf'}
                  </p>
                </div>
                
                <button
                  onClick={handleViewResume}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-700 hover:to-green-700 transition-all font-medium shadow-sm"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Resume</span>
                </button>
                
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-all font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Resume</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No resume uploaded</p>
              </div>
            )}
          </div>

          {/* Status Update */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Add notes about this application..."
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Application'}
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
              </div>
              {application.viewedAt && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Viewed: {new Date(application.viewedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
