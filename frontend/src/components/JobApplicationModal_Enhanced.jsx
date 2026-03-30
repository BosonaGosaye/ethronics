import { useState } from 'react';
import { X, Upload, FileText, Loader, User, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const EDUCATION_LEVELS = [
  { value: 'high-school', label: 'High School' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'phd', label: 'PhD' },
  { value: 'other', label: 'Other' }
];

const PROFICIENCY_LEVELS = [
  { value: 'basic', label: 'Basic' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'native', label: 'Native' }
];

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'additional', label: 'Additional', icon: Award }
];

const JobApplicationModal = ({ job, isOpen, onClose, onSuccess }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    
    // Education
    educationLevel: 'bachelor',
    department: '',
    fieldOfStudy: '',
    university: '',
    graduationYear: new Date().getFullYear(),
    cgpa: '',
    exitExamScore: '',
    
    // Experience
    yearsOfExperience: '',
    currentCompany: '',
    expectedSalary: '',
    availableFrom: '',
    coverLetter: '',
    
    // Additional
    certifications: [],
    languages: [],
    skills: [],
    references: []
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !job) return null;

  const translation = job.translations?.[language] || job.translations?.en || {};


  const labels = {
    en: {
      title: 'Apply for',
      // Personal
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      linkedIn: 'LinkedIn Profile',
      portfolio: 'Portfolio/Website',
      // Education
      educationLevel: 'Education Level',
      department: 'Department',
      fieldOfStudy: 'Field of Study',
      university: 'College/University',
      graduationYear: 'Year of Graduation',
      cgpa: 'CGPA (out of 4.0)',
      exitExamScore: 'Exit Exam Score (%)',
      // Experience
      yearsOfExperience: 'Years of Experience',
      currentCompany: 'Current Company',
      expectedSalary: 'Expected Salary',
      availableFrom: 'Available From',
      coverLetter: 'Cover Letter',
      // Additional
      certifications: 'Certifications',
      languages: 'Languages',
      skills: 'Skills',
      references: 'References',
      // Actions
      cv: 'Upload CV/Resume',
      cvHint: 'PDF, DOC, or DOCX (Max 5MB)',
      submit: 'Submit Application',
      cancel: 'Cancel',
      required: 'Required',
      optional: 'Optional',
      uploading: 'Uploading...',
      success: 'Application submitted successfully!',
      error: 'Failed to submit application. Please try again.',
      fileSelected: 'File selected:',
      changeFile: 'Change file',
      selectFile: 'Select file',
      addCertification: 'Add Certification',
      addLanguage: 'Add Language',
      addSkill: 'Add Skill',
      addReference: 'Add Reference',
      remove: 'Remove'
    }
  };

  const t = labels[language] || labels.en;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setCvFile(file);
      setError('');
    }
  };

  // Array handlers
  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', year: new Date().getFullYear() }]
    }));
  };

  const removeCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const updateCertification = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', proficiency: 'intermediate' }]
    }));
  };

  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const updateLanguage = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: '', position: '', company: '', email: '', phone: '' }]
    }));
  };

  const removeReference = (index) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const updateReference = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.location) {
      setError('Please fill in all required personal information fields');
      setActiveTab('personal');
      return;
    }

    if (!formData.educationLevel || !formData.university) {
      setError('Please fill in education information');
      setActiveTab('education');
      return;
    }

    if (!formData.coverLetter || formData.coverLetter.trim() === '') {
      setError('Please write a cover letter');
      setActiveTab('experience');
      return;
    }

    if (!cvFile) {
      setError('Please upload your CV/Resume');
      setActiveTab('personal');
      return;
    }

    setLoading(true);

    try {
      // Upload CV
      const cvFormData = new FormData();
      cvFormData.append('resume', cvFile);

      const uploadResponse = await axios.post(`${API_URL}/applications/upload-resume`, cvFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!uploadResponse.data.success) {
        throw new Error('Failed to upload CV');
      }

      // Submit application
      const applicationData = {
        ...formData,
        cgpa: formData.cgpa ? parseFloat(formData.cgpa) : undefined,
        exitExamScore: formData.exitExamScore ? parseFloat(formData.exitExamScore) : undefined,
        yearsOfExperience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : undefined,
        graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined,
        resume: {
          url: uploadResponse.data.data.url,
          publicId: uploadResponse.data.data.publicId,
          filename: uploadResponse.data.data.filename
        }
      };

      const response = await axios.post(`${API_URL}/applications/job/${job.id || job._id}`, applicationData);

      if (response.data.success) {
        onSuccess?.();
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      console.error('Application submission error:', err);
      setError(err.response?.data?.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {translation.title} - {job.company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex overflow-x-auto px-6">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors whitespace-nowrap border-b-2 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-blue-600 bg-white dark:bg-gray-800'
                        : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === 'personal' && (
              <PersonalTab 
                formData={formData}
                handleInputChange={handleInputChange}
                cvFile={cvFile}
                handleFileChange={handleFileChange}
                t={t}
              />
            )}

            {activeTab === 'education' && (
              <EducationTab 
                formData={formData}
                handleInputChange={handleInputChange}
                t={t}
                EDUCATION_LEVELS={EDUCATION_LEVELS}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceTab 
                formData={formData}
                handleInputChange={handleInputChange}
                t={t}
              />
            )}

            {activeTab === 'additional' && (
              <AdditionalTab 
                formData={formData}
                t={t}
                addCertification={addCertification}
                removeCertification={removeCertification}
                updateCertification={updateCertification}
                addLanguage={addLanguage}
                removeLanguage={removeLanguage}
                updateLanguage={updateLanguage}
                addSkill={addSkill}
                removeSkill={removeSkill}
                updateSkill={updateSkill}
                addReference={addReference}
                removeReference={removeReference}
                updateReference={updateReference}
                PROFICIENCY_LEVELS={PROFICIENCY_LEVELS}
              />
            )}

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>{t.uploading}</span>
                  </>
                ) : (
                  <span>{t.submit}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;


// ========== PERSONAL TAB ==========
function PersonalTab({ formData, handleInputChange, cvFile, handleFileChange, t }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <span className="font-semibold">Personal Information</span>
          <br />
          Please provide your basic contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.firstName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.lastName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="john@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.phone} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="+251 912 345 678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.location} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Addis Ababa, Ethiopia"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.linkedIn}
          </label>
          <input
            type="url"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.portfolio}
          </label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.cv} <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          {cvFile ? (
            <div className="space-y-3">
              <FileText className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {t.fileSelected}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
              <label className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                {t.changeFile}
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                  {t.selectFile}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {t.cvHint}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== EDUCATION TAB ==========
function EducationTab({ formData, handleInputChange, t, EDUCATION_LEVELS }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <p className="text-sm text-purple-900 dark:text-purple-200">
          <span className="font-semibold">Education Information</span>
          <br />
          Tell us about your educational background.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.educationLevel} <span className="text-red-500">*</span>
        </label>
        <select
          name="educationLevel"
          value={formData.educationLevel}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {EDUCATION_LEVELS.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.university} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="e.g. Addis Ababa University"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.department}
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.fieldOfStudy}
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Software Engineering"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.graduationYear}
          </label>
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleInputChange}
            min="1950"
            max="2050"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.cgpa}
          </label>
          <input
            type="number"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            max="4.0"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="3.75"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.exitExamScore}
          </label>
          <input
            type="number"
            name="exitExamScore"
            value={formData.exitExamScore}
            onChange={handleInputChange}
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="85"
          />
        </div>
      </div>
    </div>
  );
}

// ========== EXPERIENCE TAB ==========
function ExperienceTab({ formData, handleInputChange, t }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-900 dark:text-green-200">
          <span className="font-semibold">Work Experience</span>
          <br />
          Share your professional experience and expectations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.yearsOfExperience}
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.currentCompany}
          </label>
          <input
            type="text"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Current employer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.expectedSalary}
          </label>
          <input
            type="text"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. $60,000 - $80,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.availableFrom}
          </label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.coverLetter} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          required
          rows="8"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          placeholder="Tell us why you're a great fit for this position..."
        ></textarea>
      </div>
    </div>
  );
}


// ========== ADDITIONAL TAB ==========
function AdditionalTab({ 
  formData, t, 
  addCertification, removeCertification, updateCertification,
  addLanguage, removeLanguage, updateLanguage,
  addSkill, removeSkill, updateSkill,
  addReference, removeReference, updateReference,
  PROFICIENCY_LEVELS
}) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <p className="text-sm text-orange-900 dark:text-orange-200">
          <span className="font-semibold">Additional Information</span>
          <br />
          Add certifications, languages, skills, and references (all optional).
        </p>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.certifications}
          </label>
          <button
            type="button"
            onClick={addCertification}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + {t.addCertification}
          </button>
        </div>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <input
              type="text"
              value={cert.name}
              onChange={(e) => updateCertification(index, 'name', e.target.value)}
              placeholder="Certification name"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
              placeholder="Issuing organization"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                value={cert.year}
                onChange={(e) => updateCertification(index, 'year', e.target.value)}
                placeholder="Year"
                min="1950"
                max="2050"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                {t.remove}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.languages}
          </label>
          <button
            type="button"
            onClick={addLanguage}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + {t.addLanguage}
          </button>
        </div>
        {formData.languages.map((lang, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <input
              type="text"
              value={lang.language}
              onChange={(e) => updateLanguage(index, 'language', e.target.value)}
              placeholder="Language name"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <div className="flex space-x-2">
              <select
                value={lang.proficiency}
                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                {PROFICIENCY_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                {t.remove}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.skills}
          </label>
          <button
            type="button"
            onClick={addSkill}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + {t.addSkill}
          </button>
        </div>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
              placeholder="e.g. React, Node.js, Python"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              {t.remove}
            </button>
          </div>
        ))}
      </div>

      {/* References */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.references}
          </label>
          <button
            type="button"
            onClick={addReference}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + {t.addReference}
          </button>
        </div>
        {formData.references.map((ref, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={ref.name}
                onChange={(e) => updateReference(index, 'name', e.target.value)}
                placeholder="Reference name"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                value={ref.position}
                onChange={(e) => updateReference(index, 'position', e.target.value)}
                placeholder="Position/Title"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={ref.company}
                onChange={(e) => updateReference(index, 'company', e.target.value)}
                placeholder="Company"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="email"
                value={ref.email}
                onChange={(e) => updateReference(index, 'email', e.target.value)}
                placeholder="Email"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={ref.phone}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  placeholder="Phone"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  {t.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
