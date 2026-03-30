import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';
import ImageField from '../components/ImageField';
import FileUploader from '../components/FileUploader';

export default function LibraryResourceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Multilingual fields
    title: { en: '', am: '', om: '' },
    description: { en: '', am: '', om: '' },
    abstract: { en: '', am: '', om: '' },
    
    // Common fields (uploaded once for all languages)
    tableOfContents: [],
    author: '',
    type: 'book',
    category: 'electronics',
    tags: [],
    fileUrl: '',
    fileType: 'pdf',
    fileSize: '',
    coverImage: '',
    publisher: '',
    publishedDate: '',
    isbn: '',
    doi: '',
    pages: 0,
    edition: '',
    accessType: 'free',
    isPublished: false,
    isFeatured: false,
    allowOnlineReading: true,
    keywords: []
  });
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const resourceTypes = [
    { value: 'book', label: 'Book' },
    { value: 'paper', label: 'Research Paper' },
    { value: 'journal', label: 'Journal' },
    { value: 'video', label: 'Video' },
    { value: 'dataset', label: 'Dataset' },
    { value: 'software', label: 'Software' },
    { value: 'thesis', label: 'Thesis' },
    { value: 'manual', label: 'Manual' },
    { value: 'guide', label: 'Guide' },
    { value: 'other', label: 'Other' }
  ];

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'power', label: 'Power Systems' },
    { value: 'automation', label: 'Automation' },
    { value: 'research', label: 'Research' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'programming', label: 'Programming' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'science', label: 'Science' },
    { value: 'other', label: 'Other' }
  ];

  const accessTypes = [
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
    { value: 'openSource', label: 'Open Source' },
    { value: 'restricted', label: 'Restricted' }
  ];

  const fileTypes = [
    { value: 'pdf', label: 'PDF' },
    { value: 'doc', label: 'Word Document' },
    { value: 'epub', label: 'EPUB' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
    { value: 'zip', label: 'Archive' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (id && id !== 'new') {
      fetchResource();
    }
  }, [id]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/library-resources/admin/${id}`);

      if (response.data.success) {
        const data = response.data.data;
        // Ensure multilingual structure exists
        setFormData({
          ...data,
          title: data.title || { en: '', am: '', om: '' },
          description: data.description || { en: '', am: '', om: '' },
          abstract: data.abstract || { en: '', am: '', om: '' },
          tableOfContents: data.tableOfContents || []
        });
      }
    } catch (error) {
      console.error('Failed to fetch resource:', error);
      alert('Failed to load resource');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (id && id !== 'new') {
        await axios.put(`/library-resources/admin/${id}`, formData);
        alert('Resource updated successfully!');
      } else {
        await axios.post('/library-resources/admin', formData);
        alert('Resource created successfully!');
      }
      
      navigate('/library-resources');
    } catch (error) {
      console.error('Failed to save resource:', error);
      alert(error.response?.data?.message || 'Failed to save resource');
    } finally {
      setSaving(false);
    }
  };

  const handleCommonFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultilingualFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [currentLang]: value }
    }));
  };

  const addTOCItem = () => {
    setFormData(prev => ({
      ...prev,
      tableOfContents: [...prev.tableOfContents, { chapter: '', page: 0 }]
    }));
  };

  const removeTOCItem = (index) => {
    setFormData(prev => ({
      ...prev,
      tableOfContents: prev.tableOfContents.filter((_, i) => i !== index)
    }));
  };

  const updateTOCItem = (index, field, value) => {
    setFormData(prev => {
      const newTOC = [...prev.tableOfContents];
      newTOC[index][field] = field === 'page' ? parseInt(value) || 0 : value;
      return {
        ...prev,
        tableOfContents: newTOC
      };
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/library-resources')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id && id !== 'new' ? 'Edit Resource' : 'Add New Resource'}
            </h1>
            <p className="text-gray-600 mt-1">Multilingual library resource with detailed information</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Resource'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentLang('en')}
                className={`px-4 py-2 font-medium transition-colors ${
                  currentLang === 'en'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setCurrentLang('am')}
                className={`px-4 py-2 font-medium transition-colors ${
                  currentLang === 'am'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                አማርኛ (Amharic)
              </button>
              <button
                type="button"
                onClick={() => setCurrentLang('om')}
                className={`px-4 py-2 font-medium transition-colors ${
                  currentLang === 'om'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Afaan Oromoo (Oromifa)
              </button>
            </div>
          </div>

          {/* Multilingual Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Content in {currentLang === 'en' ? 'English' : currentLang === 'am' ? 'Amharic' : 'Oromifa'}
            </h3>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title[currentLang]}
                onChange={(e) => handleMultilingualFieldChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description[currentLang]}
                onChange={(e) => handleMultilingualFieldChange('description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Abstract */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Abstract
              </label>
              <textarea
                rows={6}
                value={formData.abstract[currentLang]}
                onChange={(e) => handleMultilingualFieldChange('abstract', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Common Fields (Uploaded Once for All Languages) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Common Information (All Languages)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => handleCommonFieldChange('author', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => handleCommonFieldChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleCommonFieldChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Type
              </label>
              <select
                value={formData.fileType}
                onChange={(e) => handleCommonFieldChange('fileType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {fileTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table of Contents - Common for all languages */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table of Contents (Common for all languages)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Add chapter titles and page numbers. These will be the same across all languages.
            </p>
            <div className="space-y-2">
              {(formData.tableOfContents || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Chapter title"
                    value={item.chapter}
                    onChange={(e) => updateTOCItem(index, 'chapter', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Page"
                    value={item.page}
                    onChange={(e) => updateTOCItem(index, 'page', e.target.value)}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeTOCItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTOCItem()}
                className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Chapter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Files & Media */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Files & Media</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <ImageField
                value={formData.coverImage}
                onChange={(url) => handleCommonFieldChange('coverImage', url)}
                label="Upload Cover Image"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource File *
              </label>
              <FileUploader
                label="Upload Resource File"
                value={formData.fileUrl}
                onChange={(url) => handleCommonFieldChange('fileUrl', url)}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.7z,.mp4,.avi,.mov,.mkv,.csv,.json,.txt,.epub,.mobi"
                description="Upload any file type (PDF, DOC, EPUB, Video, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Size
              </label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => handleCommonFieldChange('fileSize', e.target.value)}
                placeholder="e.g., 5.2 MB"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Publication Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publisher
              </label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => handleCommonFieldChange('publisher', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Published Date
              </label>
              <input
                type="date"
                value={formData.publishedDate ? formData.publishedDate.split('T')[0] : ''}
                onChange={(e) => handleCommonFieldChange('publishedDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN
              </label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => handleCommonFieldChange('isbn', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DOI
              </label>
              <input
                type="text"
                value={formData.doi}
                onChange={(e) => handleCommonFieldChange('doi', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pages
              </label>
              <input
                type="number"
                value={formData.pages}
                onChange={(e) => handleCommonFieldChange('pages', parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edition
              </label>
              <input
                type="text"
                value={formData.edition}
                onChange={(e) => handleCommonFieldChange('edition', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Type
              </label>
              <select
                value={formData.accessType}
                onChange={(e) => handleCommonFieldChange('accessType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {accessTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tags & Keywords */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags & Keywords</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  placeholder="Add keyword..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="hover:text-gray-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status & Options</h2>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => handleCommonFieldChange('isPublished', e.target.checked)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Published</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => handleCommonFieldChange('isFeatured', e.target.checked)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.allowOnlineReading}
                onChange={(e) => handleCommonFieldChange('allowOnlineReading', e.target.checked)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Allow Online Reading</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
