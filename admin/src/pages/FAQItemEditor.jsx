import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

export default function FAQItemEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    order: 0,
    isPublished: true,
    isFeatured: false,
    translations: {
      en: { question: '', answer: '', tags: [] },
      am: { question: '', answer: '', tags: [] },
      om: { question: '', answer: '', tags: [] }
    }
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/faq-items/${id}`);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch FAQ item:', error);
      alert('Failed to load FAQ item');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.translations.en.question || !formData.translations.en.answer) {
      alert('Please fill in at least the English question and answer');
      return;
    }

    try {
      setSaving(true);
      if (id) {
        await axios.put(`/faq-items/${id}`, formData);
        alert('FAQ item updated successfully!');
      } else {
        await axios.post('/faq-items', formData);
        alert('FAQ item created successfully!');
      }
      navigate('/faq-items');
    } catch (error) {
      console.error('Failed to save FAQ item:', error);
      alert('Failed to save FAQ item');
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

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = formData.translations[currentLanguage].tags || [];
      if (!currentTags.includes(newTag.trim())) {
        handleTranslationChange('tags', [...currentTags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    const currentTags = formData.translations[currentLanguage].tags || [];
    handleTranslationChange('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const currentTranslation = formData.translations[currentLanguage];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/faq-items')}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id ? 'Edit FAQ Item' : 'New FAQ Item'}
            </h1>
            <p className="text-gray-600 mt-1">Fill in all languages for complete FAQ</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save FAQ'}</span>
        </button>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Shared Fields */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                  Featured
                </label>
              </div>
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
                  Question *
                </label>
                <input
                  type="text"
                  value={currentTranslation.question}
                  onChange={(e) => handleTranslationChange('question', e.target.value)}
                  placeholder="Enter the FAQ question"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={currentTranslation.answer}
                  onChange={(e) => handleTranslationChange('answer', e.target.value)}
                  placeholder="Enter the detailed answer"
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(currentTranslation.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-purple-900"
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
