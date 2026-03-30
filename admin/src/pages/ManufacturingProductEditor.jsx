import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import ImageField from '../components/ImageField';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

export default function ManufacturingProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const [formData, setFormData] = useState({
    image: '',
    category: 'other',
    status: 'In Development',
    progress: 0,
    expectedLaunch: '',
    isPublished: false,
    isFeatured: false,
    order: 0,
    specifications: {},
    translations: {
      en: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] },
      am: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] },
      om: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] }
    }
  });

  const [inputs, setInputs] = useState({
    feature: '',
    application: '',
    tag: '',
    specKey: '',
    specValue: ''
  });

  useEffect(() => {
    if (!isNew && id && id !== 'new') {
      fetchProduct();
    }
  }, [id, isNew]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      console.log('Fetching product:', id);
      const response = await axios.get(`/manufacturing-products/admin/${id}`);
      console.log('Product response:', response.data);
      
      if (response.data.success) {
        const product = response.data.data;
        // Ensure translations structure exists
        if (!product.translations) {
          product.translations = {
            en: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] },
            am: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] },
            om: { name: '', description: '', detailedDescription: '', features: [], applications: [], tags: [] }
          };
        }
        setFormData(product);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert('Failed to load product: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.translations.en.name || !formData.translations.en.description) {
      alert('Please fill in at least the English name and description');
      return;
    }
    
    try {
      setSaving(true);
      console.log('Saving product:', formData);
      
      if (isNew) {
        const response = await axios.post('/manufacturing-products/admin', formData);
        console.log('Create response:', response.data);
        alert('Product created successfully!');
      } else {
        if (!id) {
          throw new Error('Product ID is missing. Cannot update.');
        }
        const response = await axios.put(`/manufacturing-products/admin/${id}`, formData);
        console.log('Update response:', response.data);
        alert('Product updated successfully!');
      }
      
      navigate('/manufacturing-products');
    } catch (error) {
      console.error('Failed to save product:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert(error.response?.data?.message || error.message || 'Failed to save product. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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

  const addArrayItem = (fieldName, inputKey) => {
    const value = inputs[inputKey];
    if (value && value.trim()) {
      const currentArray = formData.translations[currentLanguage][fieldName] || [];
      handleTranslationChange(fieldName, [...currentArray, value.trim()]);
      setInputs(prev => ({ ...prev, [inputKey]: '' }));
    }
  };

  const removeArrayItem = (fieldName, index) => {
    const currentArray = formData.translations[currentLanguage][fieldName] || [];
    handleTranslationChange(fieldName, currentArray.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    if (inputs.specKey.trim() && inputs.specValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [inputs.specKey.trim()]: inputs.specValue.trim()
        }
      }));
      setInputs(prev => ({ ...prev, specKey: '', specValue: '' }));
    }
  };

  const removeSpecification = (key) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentTranslation = formData.translations[currentLanguage];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/manufacturing-products')}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id && id !== 'new' ? 'Edit Product' : 'New Product'}
            </h1>
            <p className="text-gray-600 mt-1">Fill in all languages for complete product info</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Shared Fields */}
        <div className="space-y-6">
          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="iot">IoT</option>
                  <option value="automation">Automation</option>
                  <option value="smart-city">Smart City</option>
                  <option value="security">Security</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="e.g., In Development"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress (%)
                </label>
                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Launch
                </label>
                <input
                  type="text"
                  name="expectedLaunch"
                  value={formData.expectedLaunch}
                  onChange={handleChange}
                  placeholder="e.g., Q2 2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                  Featured
                </label>
              </div>
            </div>
          </div>

          {/* Image - Shared */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Product Image</h3>
            <p className="text-xs text-gray-500 mb-3">Shared across all languages</p>
            <ImageField
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              label="Upload Image"
            />
          </div>

          {/* Specifications - Shared */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Specifications</h3>
            <p className="text-xs text-gray-500 mb-3">Shared across all languages</p>
            
            <div className="space-y-2 mb-3">
              <input
                type="text"
                value={inputs.specKey}
                onChange={(e) => setInputs(prev => ({ ...prev, specKey: e.target.value }))}
                placeholder="Spec name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputs.specValue}
                  onChange={(e) => setInputs(prev => ({ ...prev, specValue: e.target.value }))}
                  placeholder="Value..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <div>
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600 ml-1">{value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Translations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Switcher */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              languages={LANGUAGES}
            />
          </div>

          {/* Translation Fields */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">
              Content - {LANGUAGES.find(l => l.code === currentLanguage)?.name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={currentTranslation.name}
                  onChange={(e) => handleTranslationChange('name', e.target.value)}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  value={currentTranslation.description}
                  onChange={(e) => handleTranslationChange('description', e.target.value)}
                  placeholder="Brief description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={currentTranslation.detailedDescription}
                  onChange={(e) => handleTranslationChange('detailedDescription', e.target.value)}
                  placeholder="Detailed product description"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={inputs.feature}
                    onChange={(e) => setInputs(prev => ({ ...prev, feature: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('features', 'feature');
                      }
                    }}
                    placeholder="Add feature..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => addArrayItem('features', 'feature')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {(currentTranslation.features || []).map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('features', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applications
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={inputs.application}
                    onChange={(e) => setInputs(prev => ({ ...prev, application: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('applications', 'application');
                      }
                    }}
                    placeholder="Add application..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => addArrayItem('applications', 'application')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {(currentTranslation.applications || []).map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{app}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('applications', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={inputs.tag}
                    onChange={(e) => setInputs(prev => ({ ...prev, tag: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('tags', 'tag');
                      }
                    }}
                    placeholder="Add tag..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => addArrayItem('tags', 'tag')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(currentTranslation.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('tags', index)}
                        className="hover:text-indigo-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
