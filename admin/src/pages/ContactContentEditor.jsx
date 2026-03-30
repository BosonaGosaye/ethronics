import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, Globe, Eye, Code } from 'lucide-react';
import GenericEditor from '../components/editors/GenericEditor';
import ContactDetailsEditor from '../components/editors/ContactDetailsEditor';
import ContactLocationEditor from '../components/editors/ContactLocationEditor';
import { syncImagesToAllLanguages } from '../utils/syncContent';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const SECTION_NAMES = {
  hero: 'Hero Section',
  categories: 'Contact Categories',
  form: 'Form Labels',
  details: 'Contact Details',
  location: 'Location Information'
};

export default function ContactContentEditor() {
  const { section } = useParams();
  const navigate = useNavigate();
  
  const [contentByLanguage, setContentByLanguage] = useState({});
  const [publishStatus, setPublishStatus] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('form');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (section) {
      fetchAllLanguages();
    }
  }, [section]);

  const fetchAllLanguages = async () => {
    try {
      setLoading(true);
      const contentMap = {};
      const statusMap = {};

      for (const lang of LANGUAGES) {
        try {
          const response = await axios.get(`/contact/${lang.code}/${section}`);
          contentMap[lang.code] = response.data.data;
          statusMap[lang.code] = {
            isPublished: response.data.data.isPublished,
            id: response.data.data._id
          };
        } catch (error) {
          if (error.response?.status === 404) {
            contentMap[lang.code] = {};
            statusMap[lang.code] = { isPublished: false, id: null };
          } else {
            throw error;
          }
        }
      }
      
      setContentByLanguage(contentMap);
      setPublishStatus(statusMap);
    } catch (error) {
      console.error('Failed to fetch content:', error);
      alert('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save all languages
      for (const lang of LANGUAGES) {
        const content = contentByLanguage[lang.code];
        if (content && Object.keys(content).length > 0) {
          await axios.post('/contact', {
            language: lang.code,
            section,
            content
          });
        }
      }
      
      alert('Content saved successfully for all languages!');
      await fetchAllLanguages();
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (language, newContent) => {
    setContentByLanguage(prev => ({
      ...prev,
      [language]: newContent
    }));
  };

  const togglePublish = async (language) => {
    const status = publishStatus[language];
    if (!status?.id) {
      alert('Please save the content first before publishing');
      return;
    }

    try {
      await axios.patch(`/contact/${language}/${section}/publish`);
      
      setPublishStatus(prev => ({
        ...prev,
        [language]: { ...prev[language], isPublished: !status.isPublished }
      }));
      
      alert(`Content ${!status.isPublished ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      alert('Failed to update publish status');
    }
  };

  const handleSyncImages = async () => {
    // Define image fields for each section
    const imageFieldsMap = {
      hero: [],
      categories: ['categories'],
      form: [],
      details: [],
      location: []
    };

    const fields = imageFieldsMap[section] || [];
    
    try {
      const result = await syncImagesToAllLanguages('contact', 'en', section, fields);
      return result;
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!section) {
    navigate('/contact');
    return null;
  }

  const renderEditor = () => {
    if (viewMode === 'json') {
      return (
        <div className="space-y-4">
          {/* Language Switcher for JSON View */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* JSON Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <textarea
              value={JSON.stringify(contentByLanguage[currentLanguage] || {}, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleContentChange(currentLanguage, parsed);
                } catch (error) {
                  // Invalid JSON - ignore
                }
              }}
              className="w-full h-[600px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              spellCheck={false}
            />
          </div>
        </div>
      );
    }

    // Use custom editors for specific sections
    if (section === 'details') {
      return (
        <ContactDetailsEditor
          contentByLanguage={contentByLanguage}
          currentLanguage={currentLanguage}
          onContentChange={handleContentChange}
          onLanguageChange={setCurrentLanguage}
          languages={LANGUAGES}
        />
      );
    }

    if (section === 'location') {
      return (
        <ContactLocationEditor
          contentByLanguage={contentByLanguage}
          currentLanguage={currentLanguage}
          onContentChange={handleContentChange}
          onLanguageChange={setCurrentLanguage}
          languages={LANGUAGES}
        />
      );
    }

    // Use generic editor for other sections
    return (
      <GenericEditor
        contentByLanguage={contentByLanguage}
        currentLanguage={currentLanguage}
        onContentChange={handleContentChange}
        onLanguageChange={setCurrentLanguage}
        languages={LANGUAGES}
      />
    );
  };

  const getSectionName = () => SECTION_NAMES[section] || section;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/contact')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contact Dashboard</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getSectionName()}
            </h1>
            <p className="text-gray-600 mt-1">
              Edit content for all languages
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('form')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'form'
                    ? 'bg-white text-purple-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Form</span>
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'json'
                    ? 'bg-white text-purple-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>JSON</span>
              </button>
            </div>

            
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save All Languages'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Publish Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">Publish Status:</span>
          </div>
          <div className="flex space-x-2">
            {LANGUAGES.map(lang => (
              <div key={lang.code} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {lang.flag} {lang.name}:
                </span>
                <button
                  onClick={() => togglePublish(lang.code)}
                  disabled={!publishStatus[lang.code]?.id}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    publishStatus[lang.code]?.isPublished
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {publishStatus[lang.code]?.isPublished ? 'Published ✓' : 'Draft'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      {renderEditor()}
    </div>
  );
}
