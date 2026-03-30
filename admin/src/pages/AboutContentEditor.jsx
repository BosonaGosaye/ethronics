import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Code, Globe } from 'lucide-react';
import axios from '../utils/axios';
import { getDefaultContent } from '../utils/editorDefaults';
import GenericEditor from '../components/editors/GenericEditor';
import LeadersEditor from '../components/editors/LeadersEditor';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const SECTIONS = {
  hero: 'Hero Section',
  purpose: 'Our Purpose',
  leaders: 'Meet Our Leaders',
  threeFronts: 'Three Fronts',
  journey: 'Join Our Journey'
};

export default function AboutContentEditor() {
  const { section: urlSection } = useParams();
  const navigate = useNavigate();
  const [contentByLanguage, setContentByLanguage] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState('form');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [publishStatus, setPublishStatus] = useState({});

  useEffect(() => {
    if (urlSection) {
      fetchAllLanguages();
    }
  }, [urlSection]);

  const fetchAllLanguages = async () => {
    try {
      const contentMap = {};
      const statusMap = {};

      for (const lang of LANGUAGES) {
        try {
          const response = await axios.get(`/about/${lang.code}/${urlSection}`);
          contentMap[lang.code] = response.data.data;
          statusMap[lang.code] = {
            isPublished: response.data.data.isPublished,
            id: response.data.data._id
          };
        } catch (error) {
          if (error.response?.status === 404) {
            contentMap[lang.code] = getDefaultContent('about', urlSection);
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
          await axios.post('/about', {
            language: lang.code,
            section: urlSection,
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
      await axios.put(`/about/${status.id}/publish`, { isPublished: !status.isPublished });
      
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
    const imageFieldsMap = {
      hero: [],
      purpose: [],
      leaders: ['teamMembers'],
      threeFronts: [],
      journey: []
    };

    const fields = imageFieldsMap[urlSection] || [];
    
    try {
      const result = await syncImagesToAllLanguages('about', 'en', urlSection, fields);
      return result;
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!urlSection) {
    navigate('/about-content');
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
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
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
                  // Invalid JSON
                }
              }}
              className="w-full h-[600px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              spellCheck={false}
            />
          </div>
        </div>
      );
    }

    // Use specialized editor for leaders section
    if (urlSection === 'leaders') {
      return (
        <LeadersEditor
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

  const getSectionName = () => SECTIONS[urlSection] || urlSection;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/about-content')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to About Dashboard</span>
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
                    ? 'bg-white text-indigo-600 shadow'
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
                    ? 'bg-white text-indigo-600 shadow'
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
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            <Globe className="w-5 h-5 text-indigo-600" />
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
