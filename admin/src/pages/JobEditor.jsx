import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Globe, Briefcase, Building, DollarSign, Users, Calendar, FileText } from 'lucide-react';
import axios from '../utils/axios';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ImageField from '../components/ImageField';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' }
];

const WORK_MODES = [
  { value: 'onsite', label: 'On-site' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' }
];

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' }
];

const EDUCATION_LEVELS = [
  { value: 'high-school', label: 'High School' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'bachelor', label: 'Bachelor\'s Degree' },
  { value: 'master', label: 'Master\'s Degree' },
  { value: 'phd', label: 'PhD' },
  { value: 'any', label: 'Any' }
];

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
];

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'ETB', label: 'ETB (Br)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' }
];

const SALARY_PERIODS = [
  { value: 'hourly', label: 'Per Hour' },
  { value: 'monthly', label: 'Per Month' },
  { value: 'yearly', label: 'Per Year' }
];

const TABS = [
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'compensation', label: 'Compensation', icon: DollarSign },
  { id: 'requirements', label: 'Requirements', icon: Users },
  { id: 'details', label: 'Details', icon: Calendar }
];

export default function JobEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    // Company Info
    company: '',
    companyLogo: '',
    companyWebsite: '',
    companySize: '',
    companyIndustry: '',
    
    // Basic Info
    location: '',
    type: 'full-time',
    workMode: 'onsite',
    category: '',
    
    // Experience & Education
    experienceLevel: 'mid',
    yearsOfExperience: '',
    educationLevel: 'bachelor',
    
    // Compensation
    salary: '',
    salaryMin: 0,
    salaryMax: 0,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    
    // Job Details
    numberOfPositions: 1,
    startDate: '',
    duration: '',
    
    // Benefits
    travelRequired: false,
    relocationAssistance: false,
    visaSponsorship: false,
    
    // Contact
    contactEmail: '',
    contactPhone: '',
    contactPerson: '',
    
    // Status
    featured: false,
    status: 'active',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    
    // Translations
    translations: {
      en: { 
        title: '', 
        description: '', 
        requirements: [], 
        responsibilities: [],
        qualifications: [],
        benefits: [], 
        niceToHave: [],
        tags: [],
        companyDescription: '',
        applicationProcess: '',
        interviewProcess: '',
        bonusInfo: ''
      },
      am: { 
        title: '', 
        description: '', 
        requirements: [], 
        responsibilities: [],
        qualifications: [],
        benefits: [], 
        niceToHave: [],
        tags: [],
        companyDescription: '',
        applicationProcess: '',
        interviewProcess: '',
        bonusInfo: ''
      },
      om: { 
        title: '', 
        description: '', 
        requirements: [], 
        responsibilities: [],
        qualifications: [],
        benefits: [], 
        niceToHave: [],
        tags: [],
        companyDescription: '',
        applicationProcess: '',
        interviewProcess: '',
        bonusInfo: ''
      }
    }
  });

  useEffect(() => {
    if (isEditMode) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/jobs/${id}`);
      const job = response.data.data;
      
      // Format dates for input
      job.deadline = new Date(job.deadline).toISOString().split('T')[0];
      if (job.startDate) {
        job.startDate = new Date(job.startDate).toISOString().split('T')[0];
      }
      
      setFormData(job);
    } catch (error) {
      console.error('Failed to fetch job:', error);
      alert('Failed to load job');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.company) {
      alert('Please enter company name');
      return;
    }
    if (!formData.location) {
      alert('Please enter location');
      return;
    }
    if (!formData.salary) {
      alert('Please enter salary range');
      return;
    }
    if (!formData.translations.en.title) {
      alert('Please enter English job title');
      return;
    }
    if (!formData.translations.en.description) {
      alert('Please enter English job description');
      return;
    }
    
    try {
      setSaving(true);
      
      if (isEditMode) {
        await axios.put(`/jobs/${id}`, formData);
        alert('Job updated successfully!');
      } else {
        await axios.post('/jobs', formData);
        alert('Job created successfully!');
      }
      
      navigate('/jobs');
    } catch (error) {
      console.error('Failed to save job:', error);
      alert(error.response?.data?.message || 'Failed to save job');
    } finally {
      setSaving(false);
    }
  };

  const handleTranslationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [currentLanguage]: {
          ...prev.translations[currentLanguage],
          [field]: value
        }
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData.translations[currentLanguage][field]];
    newArray[index] = value;
    handleTranslationChange(field, newArray);
  };

  const addArrayItem = (field) => {
    const newArray = [...formData.translations[currentLanguage][field], ''];
    handleTranslationChange(field, newArray);
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData.translations[currentLanguage][field].filter((_, i) => i !== index);
    handleTranslationChange(field, newArray);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/jobs')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Job' : 'Post New Job'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditMode ? 'Update job posting' : 'Create a new job posting with multi-language support'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Job'}</span>
        </button>
      </div>

      {/* Language Switcher */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-teal-600" />
            <span className="font-medium text-gray-700">Content Language:</span>
          </div>
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            languages={LANGUAGES}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Translations */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Job Content ({LANGUAGES.find(l => l.code === currentLanguage)?.name})
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.translations[currentLanguage].title}
                  onChange={(e) => handleTranslationChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter job title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={formData.translations[currentLanguage].description}
                  onChange={(e) => handleTranslationChange('description', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Detailed job description"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                {formData.translations[currentLanguage].requirements.map((req, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. 5+ years experience"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  + Add Requirement
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits
                </label>
                {formData.translations[currentLanguage].benefits.map((benefit, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. Health insurance"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('benefits', index)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('benefits')}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  + Add Benefit
                </button>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                {formData.translations[currentLanguage].tags.map((tag, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. React, Node.js"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('tags', index)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('tags')}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  + Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Basic Info */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g. Addis Ababa, Ethiopia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {JOB_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g. $60,000 - $80,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Company Logo */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Logo</h3>
              <ImageField
                label="Company Logo (Shared across all languages)"
                value={formData.companyLogo}
                onChange={(url) => setFormData(prev => ({ ...prev, companyLogo: url }))}
              />
              <p className="text-xs text-gray-500 mt-2">
                Upload your company logo. This will be displayed with the job posting.
              </p>
            </div>
          )}

          {/* Status */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Job</span>
                </label>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl shadow-sm p-6 border border-teal-100">
            <div className="flex items-start space-x-3">
              <Briefcase className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Multi-Language Support</h4>
                <p className="text-sm text-gray-600">
                  Switch between languages to enter translated content. Basic information (company, location, salary) is shared across all languages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
