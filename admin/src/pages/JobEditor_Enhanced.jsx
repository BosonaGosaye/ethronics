import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Globe, FileText, Building, DollarSign, Users, Calendar } from 'lucide-react';
import axios from '../utils/axios';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ImageField from '../components/ImageField';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const TABS = [
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'compensation', label: 'Compensation', icon: DollarSign },
  { id: 'requirements', label: 'Requirements', icon: Users },
  { id: 'details', label: 'Details', icon: Calendar }
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
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'phd', label: 'PhD' },
  { value: 'any', label: 'Any' }
];

const COMPANY_SIZES = [
  { value: '', label: 'Not specified' },
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
              {isEditMode ? 'Update job posting' : 'Create a comprehensive job posting with all details'}
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

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'content' && <ContentTab 
            formData={formData}
            currentLanguage={currentLanguage}
            handleTranslationChange={handleTranslationChange}
            handleArrayChange={handleArrayChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            LANGUAGES={LANGUAGES}
          />}
          
          {activeTab === 'company' && <CompanyTab 
            formData={formData}
            setFormData={setFormData}
          />}
          
          {activeTab === 'compensation' && <CompensationTab 
            formData={formData}
            setFormData={setFormData}
            CURRENCIES={CURRENCIES}
            SALARY_PERIODS={SALARY_PERIODS}
          />}
          
          {activeTab === 'requirements' && <RequirementsTab 
            formData={formData}
            setFormData={setFormData}
            JOB_TYPES={JOB_TYPES}
            WORK_MODES={WORK_MODES}
            EXPERIENCE_LEVELS={EXPERIENCE_LEVELS}
            EDUCATION_LEVELS={EDUCATION_LEVELS}
          />}
          
          {activeTab === 'details' && <DetailsTab 
            formData={formData}
            setFormData={setFormData}
          />}
        </div>
      </div>
    </div>
  );
}

// ========== CONTENT TAB ==========
function ContentTab({ formData, currentLanguage, handleTranslationChange, handleArrayChange, addArrayItem, removeArrayItem, LANGUAGES }) {
  const currentLang = LANGUAGES.find(l => l.code === currentLanguage);
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Editing: {currentLang?.name} {currentLang?.flag}</span>
          <br />
          Fill in content for this language. Switch languages using the selector above.
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title * {currentLanguage === 'en' && '(Required)'}
        </label>
        <input
          type="text"
          value={formData.translations[currentLanguage].title}
          onChange={(e) => handleTranslationChange('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="e.g. Senior Software Engineer"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description * {currentLanguage === 'en' && '(Required)'}
        </label>
        <textarea
          value={formData.translations[currentLanguage].description}
          onChange={(e) => handleTranslationChange('description', e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Detailed job description..."
        />
      </div>

      {/* Responsibilities */}
      <ArrayField
        label="Key Responsibilities"
        field="responsibilities"
        items={formData.translations[currentLanguage].responsibilities}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Design and develop scalable applications"
      />

      {/* Qualifications */}
      <ArrayField
        label="Qualifications"
        field="qualifications"
        items={formData.translations[currentLanguage].qualifications}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. 5+ years of software development experience"
      />

      {/* Requirements */}
      <ArrayField
        label="Requirements"
        field="requirements"
        items={formData.translations[currentLanguage].requirements}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Must be legally authorized to work"
      />

      {/* Benefits */}
      <ArrayField
        label="Benefits & Perks"
        field="benefits"
        items={formData.translations[currentLanguage].benefits}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Health insurance coverage"
      />

      {/* Nice to Have */}
      <ArrayField
        label="Nice to Have"
        field="niceToHave"
        items={formData.translations[currentLanguage].niceToHave}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Experience with Docker and Kubernetes"
      />

      {/* Tags */}
      <ArrayField
        label="Skills/Tags"
        field="tags"
        items={formData.translations[currentLanguage].tags}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. React, Node.js, AWS"
      />

      {/* Company Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Description
        </label>
        <textarea
          value={formData.translations[currentLanguage].companyDescription}
          onChange={(e) => handleTranslationChange('companyDescription', e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Tell candidates about your company..."
        />
      </div>

      {/* Application Process */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Application Process
        </label>
        <textarea
          value={formData.translations[currentLanguage].applicationProcess}
          onChange={(e) => handleTranslationChange('applicationProcess', e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Explain your hiring process step by step..."
        />
      </div>

      {/* Interview Process */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interview Process
        </label>
        <textarea
          value={formData.translations[currentLanguage].interviewProcess}
          onChange={(e) => handleTranslationChange('interviewProcess', e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="What should candidates expect during interviews..."
        />
      </div>

      {/* Bonus Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Information
        </label>
        <textarea
          value={formData.translations[currentLanguage].bonusInfo}
          onChange={(e) => handleTranslationChange('bonusInfo', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Any additional information for candidates..."
        />
      </div>
    </div>
  );
}

// ========== COMPANY TAB ==========
function CompanyTab({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm text-purple-900">
          <span className="font-semibold">Company Information</span>
          <br />
          These fields are shared across all languages.
        </p>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="e.g. Ethronics Technology"
        />
      </div>

      {/* Company Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Logo
        </label>
        <ImageField
          label=""
          value={formData.companyLogo}
          onChange={(url) => setFormData(prev => ({ ...prev, companyLogo: url }))}
        />
        <p className="text-xs text-gray-500 mt-2">
          Upload your company logo. Recommended size: 200x200px
        </p>
      </div>

      {/* Company Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Website
        </label>
        <input
          type="url"
          value={formData.companyWebsite}
          onChange={(e) => setFormData(prev => ({ ...prev, companyWebsite: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="https://example.com"
        />
      </div>

      {/* Company Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Size
        </label>
        <select
          value={formData.companySize}
          onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          {[
            { value: '', label: 'Not specified' },
            { value: '1-10', label: '1-10 employees' },
            { value: '11-50', label: '11-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-500', label: '201-500 employees' },
            { value: '501-1000', label: '501-1000 employees' },
            { value: '1000+', label: '1000+ employees' }
          ].map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>

      {/* Company Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Industry
        </label>
        <input
          type="text"
          value={formData.companyIndustry}
          onChange={(e) => setFormData(prev => ({ ...prev, companyIndustry: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="e.g. Technology & Software Development"
        />
      </div>

      {/* Location */}
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

      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        {/* Contact Person */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person
          </label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="e.g. Sarah Johnson, HR Manager"
          />
        </div>

        {/* Contact Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="careers@example.com"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="+251-11-123-4567"
          />
        </div>
      </div>
    </div>
  );
}

// ========== COMPENSATION TAB ==========
function CompensationTab({ formData, setFormData, CURRENCIES, SALARY_PERIODS }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm text-green-900">
          <span className="font-semibold">Compensation Details</span>
          <br />
          Provide salary information and compensation details.
        </p>
      </div>

      {/* Salary Range (Display) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Salary Range (Display Text) *
        </label>
        <input
          type="text"
          value={formData.salary}
          onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="e.g. $60,000 - $80,000 per year"
        />
        <p className="text-xs text-gray-500 mt-1">
          This is the text that will be displayed to candidates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salary Min */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Salary
          </label>
          <input
            type="number"
            value={formData.salaryMin}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="60000"
            min="0"
          />
        </div>

        {/* Salary Max */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Salary
          </label>
          <input
            type="number"
            value={formData.salaryMax}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="80000"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={formData.salaryCurrency}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryCurrency: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {CURRENCIES.map(currency => (
              <option key={currency.value} value={currency.value}>{currency.label}</option>
            ))}
          </select>
        </div>

        {/* Salary Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Period
          </label>
          <select
            value={formData.salaryPeriod}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryPeriod: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {SALARY_PERIODS.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">💡 Tip:</span> Providing specific salary ranges helps attract qualified candidates and saves time in the hiring process.
        </p>
      </div>
    </div>
  );
}

// ========== REQUIREMENTS TAB ==========
function RequirementsTab({ formData, setFormData, JOB_TYPES, WORK_MODES, EXPERIENCE_LEVELS, EDUCATION_LEVELS }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
        <p className="text-sm text-orange-900">
          <span className="font-semibold">Job Requirements</span>
          <br />
          Define the job type, experience level, and education requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Type */}
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

        {/* Work Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Mode
          </label>
          <select
            value={formData.workMode}
            onChange={(e) => setFormData(prev => ({ ...prev, workMode: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {WORK_MODES.map(mode => (
              <option key={mode.value} value={mode.value}>{mode.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={formData.experienceLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="text"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="e.g. 5-7 years"
          />
        </div>
      </div>

      {/* Education Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Education Level
        </label>
        <select
          value={formData.educationLevel}
          onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          {EDUCATION_LEVELS.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Category
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="e.g. engineering, data, design"
        />
        <p className="text-xs text-gray-500 mt-1">
          Used for filtering jobs on the careers page
        </p>
      </div>
    </div>
  );
}

// ========== DETAILS TAB ==========
function DetailsTab({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-lg p-4 border border-cyan-200">
        <p className="text-sm text-cyan-900">
          <span className="font-semibold">Job Details & Status</span>
          <br />
          Set dates, benefits, and job status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Number of Positions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Positions
          </label>
          <input
            type="number"
            value={formData.numberOfPositions}
            onChange={(e) => setFormData(prev => ({ ...prev, numberOfPositions: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            min="1"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="e.g. Permanent, 6 months contract"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Application Deadline */}
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

      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
        
        <div className="space-y-3">
          {/* Travel Required */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.travelRequired}
              onChange={(e) => setFormData(prev => ({ ...prev, travelRequired: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Travel Required</span>
              <p className="text-xs text-gray-500">Position requires occasional travel</p>
            </div>
          </label>

          {/* Relocation Assistance */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.relocationAssistance}
              onChange={(e) => setFormData(prev => ({ ...prev, relocationAssistance: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Relocation Assistance</span>
              <p className="text-xs text-gray-500">Company provides relocation support</p>
            </div>
          </label>

          {/* Visa Sponsorship */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.visaSponsorship}
              onChange={(e) => setFormData(prev => ({ ...prev, visaSponsorship: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Visa Sponsorship</span>
              <p className="text-xs text-gray-500">Company sponsors work visas</p>
            </div>
          </label>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Status</h3>
        
        <div className="space-y-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
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

          {/* Featured */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Featured Job</span>
              <p className="text-xs text-gray-500">Display this job prominently on the careers page</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

// ========== ARRAY FIELD COMPONENT ==========
function ArrayField({ label, field, items, onChange, onAdd, onRemove, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {items.map((item, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(field, index, e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onRemove(field, index)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onAdd(field)}
        className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center space-x-1"
      >
        <span>+</span>
        <span>Add {label}</span>
      </button>
    </div>
  );
}
