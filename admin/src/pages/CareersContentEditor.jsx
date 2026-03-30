import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, Globe, Eye, Code, Trash2 } from 'lucide-react';
import { getDefaultContent } from '../utils/editorDefaults';
import GenericEditor from '../components/editors/GenericEditor';
import { syncImagesToAllLanguages } from '../utils/syncContent';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const SECTION_NAMES = {
  hero: 'Hero Section',
  search: 'Job Search',
  listings: 'Job Listings',
  process: 'Application Process'
};

export default function CareersContentEditor() {
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
          // Fetch from admin endpoint which returns full document
          const response = await axios.get(`/careers/admin/${lang.code}`);
          
          // Find the section in the response
          const sectionData = response.data.data.find(item => item.section === section);
          
          if (sectionData) {
            contentMap[lang.code] = sectionData.content;
            statusMap[lang.code] = {
              isPublished: sectionData.isPublished,
              id: sectionData._id
            };
          } else {
            // Section doesn't exist yet, use default
            contentMap[lang.code] = getDefaultContent('careers', section);
            statusMap[lang.code] = { isPublished: false, id: null };
          }
        } catch (error) {
          if (error.response?.status === 404) {
            contentMap[lang.code] = getDefaultContent('careers', section);
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
    const savedLanguages = [];
    const failedLanguages = [];
    
    try {
      // Save all languages
      for (const lang of LANGUAGES) {
        const content = contentByLanguage[lang.code];
        if (content && Object.keys(content).length > 0) {
          try {
            await axios.post('/careers', {
              language: lang.code,
              section,
              content
            });
            savedLanguages.push(lang.name);
          } catch (error) {
            console.error(`Failed to save ${lang.name}:`, error);
            failedLanguages.push(lang.name);
          }
        }
      }
      
      if (failedLanguages.length === 0) {
        alert(`✓ Content saved successfully for all languages!\n\nSaved: ${savedLanguages.join(', ')}`);
      } else {
        alert(`⚠ Partial save completed.\n\nSaved: ${savedLanguages.join(', ')}\nFailed: ${failedLanguages.join(', ')}`);
      }
      
      await fetchAllLanguages();
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('❌ Failed to save content: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (language) => {
    if (!confirm(`Are you sure you want to delete the ${language} content for this section? This action cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(`/careers/${language}/${section}`);
      alert(`✓ Content deleted successfully for ${language}!`);
      await fetchAllLanguages();
    } catch (error) {
      console.error('Failed to delete content:', error);
      alert('❌ Failed to delete content: ' + (error.response?.data?.message || error.message));
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
      await axios.patch(`/careers/${language}/${section}/publish`);
      
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
      search: [],
      listings: ['jobs'],
      process: ['steps']
    };

    const fields = imageFieldsMap[section] || [];
    
    try {
      const result = await syncImagesToAllLanguages('careers', 'en', section, fields);
      return result;
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!section) {
    navigate('/careers');
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
                      ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white'
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
              className="w-full h-[600px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              spellCheck={false}
            />
          </div>
        </div>
      );
    }

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
          onClick={() => navigate('/careers')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Careers Dashboard</span>
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
                    ? 'bg-white text-teal-600 shadow'
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
                    ? 'bg-white text-teal-600 shadow'
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
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:from-teal-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save All Languages'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Publish Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-teal-600" />
            <span className="font-medium text-gray-700">Content Status by Language</span>
          </div>
          <div className="text-xs text-gray-500">
            {Object.values(publishStatus).filter(s => s.id).length} of {LANGUAGES.length} languages have content
          </div>
        </div>
        
        <div className="space-y-2">
          {LANGUAGES.map(lang => {
            const hasContent = publishStatus[lang.code]?.id;
            const contentSize = contentByLanguage[lang.code] ? Object.keys(contentByLanguage[lang.code]).length : 0;
            
            return (
              <div key={lang.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <span className="font-medium text-gray-700">{lang.name}</span>
                    {hasContent && (
                      <span className="ml-2 text-xs text-gray-500">
                        ({contentSize} fields)
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hasContent ? (
                    <>
                      <button
                        onClick={() => togglePublish(lang.code)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          publishStatus[lang.code]?.isPublished
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        {publishStatus[lang.code]?.isPublished ? '✓ Published' : '○ Draft'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(lang.code)}
                        className="px-4 py-2 bg-red-100 text-red-800 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium">
                      Not Created
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      {renderEditor()}
    </div>
  );
}
