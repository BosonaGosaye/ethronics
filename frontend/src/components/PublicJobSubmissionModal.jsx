import { useState } from 'react';
import { X, Briefcase, Send, CheckCircle, FileText, Building, DollarSign, Users, Calendar } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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

export default function PublicJobSubmissionModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: form, 2: success
  const [activeTab, setActiveTab] = useState('content');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Company Info
    company: '',
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
    
    // Deadline
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    
    // English content (required)
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
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // Validation - check required fields
    const missingFields = [];
    
    if (!formData.company) missingFields.push('Company');
    if (!formData.title) missingFields.push('Job Title');
    if (!formData.description) missingFields.push('Job Description');
    if (!formData.location) missingFields.push('Location');
    if (!formData.salary) missingFields.push('Salary');
    if (!formData.contactEmail) missingFields.push('Contact Email');
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n\n${missingFields.join('\n')}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);
      
      const jobData = {
        ...formData,
        status: 'draft', // Important: submitted jobs start as draft
        featured: false,
        translations: {
          en: {
            title: formData.title,
            description: formData.description,
            requirements: formData.requirements,
            responsibilities: formData.responsibilities,
            qualifications: formData.qualifications,
            benefits: formData.benefits,
            niceToHave: formData.niceToHave,
            tags: formData.tags,
            companyDescription: formData.companyDescription,
            applicationProcess: formData.applicationProcess,
            interviewProcess: formData.interviewProcess,
            bonusInfo: formData.bonusInfo
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
      };

      console.log('Submitting job data:', jobData);
      
      const response = await axios.post(`${API_URL}/jobs/public-submit`, jobData);
      
      console.log('Job submitted successfully:', response.data);
      
      setStep(2); // Show success message
    } catch (error) {
      console.error('Failed to submit job:', error);
      console.error('Error response:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to submit job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setActiveTab('content');
    setFormData({
      company: '', companyWebsite: '', companySize: '', companyIndustry: '',
      location: '', type: 'full-time', workMode: 'onsite', category: '',
      experienceLevel: 'mid', yearsOfExperience: '', educationLevel: 'bachelor',
      salary: '', salaryMin: 0, salaryMax: 0, salaryCurrency: 'USD', salaryPeriod: 'yearly',
      numberOfPositions: 1, startDate: '', duration: '',
      travelRequired: false, relocationAssistance: false, visaSponsorship: false,
      contactEmail: '', contactPhone: '', contactPerson: '',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      title: '', description: '', requirements: [], responsibilities: [], qualifications: [],
      benefits: [], niceToHave: [], tags: [], companyDescription: '',
      applicationProcess: '', interviewProcess: '', bonusInfo: ''
    });
    onClose();
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  if (step === 2) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Job Submitted Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for submitting your job posting. Our team will review it and publish it within 24-48 hours.
              </p>
              <button
                onClick={handleClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-700 hover:to-green-700 transition-all font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Post a Job
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Submit your job posting for review
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                        ? 'text-teal-600 border-teal-600 bg-white dark:bg-gray-800'
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

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'content' && (
              <ContentTab 
                formData={formData}
                setFormData={setFormData}
                handleArrayChange={handleArrayChange}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}
            
            {activeTab === 'company' && (
              <CompanyTab 
                formData={formData}
                setFormData={setFormData}
                COMPANY_SIZES={COMPANY_SIZES}
              />
            )}
            
            {activeTab === 'compensation' && (
              <CompensationTab 
                formData={formData}
                setFormData={setFormData}
                CURRENCIES={CURRENCIES}
                SALARY_PERIODS={SALARY_PERIODS}
              />
            )}
            
            {activeTab === 'requirements' && (
              <RequirementsTab 
                formData={formData}
                setFormData={setFormData}
                JOB_TYPES={JOB_TYPES}
                WORK_MODES={WORK_MODES}
                EXPERIENCE_LEVELS={EXPERIENCE_LEVELS}
                EDUCATION_LEVELS={EDUCATION_LEVELS}
              />
            )}
            
            {activeTab === 'details' && (
              <DetailsTab 
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              <Send className="w-5 h-5" />
              <span>{submitting ? 'Submitting...' : 'Submit Job'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ========== CONTENT TAB ==========
function ContentTab({ formData, setFormData, handleArrayChange, addArrayItem, removeArrayItem }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <span className="font-semibold">Job Content</span>
          <br />
          Provide detailed information about the job position.
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g. Senior Software Engineer"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Detailed job description..."
          required
        />
      </div>

      {/* Responsibilities */}
      <ArrayField
        label="Key Responsibilities"
        field="responsibilities"
        items={formData.responsibilities}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Design and develop scalable applications"
      />

      {/* Qualifications */}
      <ArrayField
        label="Qualifications"
        field="qualifications"
        items={formData.qualifications}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. 5+ years of software development experience"
      />

      {/* Requirements */}
      <ArrayField
        label="Requirements"
        field="requirements"
        items={formData.requirements}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Must be legally authorized to work"
      />

      {/* Benefits */}
      <ArrayField
        label="Benefits & Perks"
        field="benefits"
        items={formData.benefits}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Health insurance coverage"
      />

      {/* Nice to Have */}
      <ArrayField
        label="Nice to Have"
        field="niceToHave"
        items={formData.niceToHave}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. Experience with Docker and Kubernetes"
      />

      {/* Tags */}
      <ArrayField
        label="Skills/Tags"
        field="tags"
        items={formData.tags}
        onChange={handleArrayChange}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
        placeholder="e.g. React, Node.js, AWS"
      />

      {/* Company Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Description
        </label>
        <textarea
          value={formData.companyDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Tell candidates about your company..."
        />
      </div>

      {/* Application Process */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Application Process
        </label>
        <textarea
          value={formData.applicationProcess}
          onChange={(e) => setFormData(prev => ({ ...prev, applicationProcess: e.target.value }))}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Explain your hiring process step by step..."
        />
      </div>

      {/* Interview Process */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Interview Process
        </label>
        <textarea
          value={formData.interviewProcess}
          onChange={(e) => setFormData(prev => ({ ...prev, interviewProcess: e.target.value }))}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="What should candidates expect during interviews..."
        />
      </div>

      {/* Bonus Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Additional Information
        </label>
        <textarea
          value={formData.bonusInfo}
          onChange={(e) => setFormData(prev => ({ ...prev, bonusInfo: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Any additional information for candidates..."
        />
      </div>
    </div>
  );
}


// ========== COMPANY TAB ==========
function CompanyTab({ formData, setFormData, COMPANY_SIZES }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <p className="text-sm text-purple-900 dark:text-purple-200">
          <span className="font-semibold">Company Information</span>
          <br />
          Tell candidates about your company.
        </p>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g. Ethronics Technology"
          required
        />
      </div>

      {/* Company Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Website
        </label>
        <input
          type="url"
          value={formData.companyWebsite}
          onChange={(e) => setFormData(prev => ({ ...prev, companyWebsite: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="https://example.com"
        />
      </div>

      {/* Company Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Size
        </label>
        <select
          value={formData.companySize}
          onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {COMPANY_SIZES.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>

      {/* Company Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Industry
        </label>
        <input
          type="text"
          value={formData.companyIndustry}
          onChange={(e) => setFormData(prev => ({ ...prev, companyIndustry: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g. Technology & Software Development"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g. Addis Ababa, Ethiopia"
          required
        />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
        
        {/* Contact Person */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Person
          </label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Sarah Johnson, HR Manager"
          />
        </div>

        {/* Contact Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="careers@example.com"
            required
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-900 dark:text-green-200">
          <span className="font-semibold">Compensation Details</span>
          <br />
          Provide salary information and compensation details.
        </p>
      </div>

      {/* Salary Range (Display) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Salary Range (Display Text) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.salary}
          onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g. $60,000 - $80,000 per year"
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This is the text that will be displayed to candidates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salary Min */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Salary
          </label>
          <input
            type="number"
            value={formData.salaryMin}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="60000"
            min="0"
          />
        </div>

        {/* Salary Max */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum Salary
          </label>
          <input
            type="number"
            value={formData.salaryMax}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="80000"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <select
            value={formData.salaryCurrency}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryCurrency: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {CURRENCIES.map(currency => (
              <option key={currency.value} value={currency.value}>{currency.label}</option>
            ))}
          </select>
        </div>

        {/* Salary Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Salary Period
          </label>
          <select
            value={formData.salaryPeriod}
            onChange={(e) => setFormData(prev => ({ ...prev, salaryPeriod: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {SALARY_PERIODS.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-200">
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
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <p className="text-sm text-orange-900 dark:text-orange-200">
          <span className="font-semibold">Job Requirements</span>
          <br />
          Define the job type, experience level, and education requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {JOB_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Work Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Mode
          </label>
          <select
            value={formData.workMode}
            onChange={(e) => setFormData(prev => ({ ...prev, workMode: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Experience Level
          </label>
          <select
            value={formData.experienceLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Years of Experience
          </label>
          <input
            type="text"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g. 5-7 years"
          />
        </div>
      </div>

      {/* Education Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Education Level
        </label>
        <select
          value={formData.educationLevel}
          onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {EDUCATION_LEVELS.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Category
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g. engineering, data, design"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
      <div className="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
        <p className="text-sm text-cyan-900 dark:text-cyan-200">
          <span className="font-semibold">Job Details & Benefits</span>
          <br />
          Set dates, number of positions, and additional benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Number of Positions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Positions
          </label>
          <input
            type="number"
            value={formData.numberOfPositions}
            onChange={(e) => setFormData(prev => ({ ...prev, numberOfPositions: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            min="1"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duration
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Permanent, 6 months contract"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expected Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Application Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Benefits & Perks</h3>
        
        <div className="space-y-3">
          {/* Travel Required */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              checked={formData.travelRequired}
              onChange={(e) => setFormData(prev => ({ ...prev, travelRequired: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Travel Required</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Position requires occasional travel</p>
            </div>
          </label>

          {/* Relocation Assistance */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              checked={formData.relocationAssistance}
              onChange={(e) => setFormData(prev => ({ ...prev, relocationAssistance: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Relocation Assistance</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Company provides relocation support</p>
            </div>
          </label>

          {/* Visa Sponsorship */}
          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              checked={formData.visaSponsorship}
              onChange={(e) => setFormData(prev => ({ ...prev, visaSponsorship: e.target.checked }))}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Visa Sponsorship</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Company sponsors work visas</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <span className="font-semibold">Note:</span> Your job posting will be reviewed by our team before being published. This usually takes 24-48 hours. You'll be notified once it's live.
        </p>
      </div>
    </div>
  );
}

// ========== ARRAY FIELD COMPONENT ==========
function ArrayField({ label, field, items, onChange, onAdd, onRemove, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      {items.map((item, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(field, index, e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
