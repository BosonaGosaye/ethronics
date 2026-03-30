import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Code, Globe } from 'lucide-react';
import axios from '../utils/axios';
import { syncImagesToAllLanguages } from '../utils/syncContent';
import { getDefaultContent } from '../utils/editorDefaults';
import AcademicHeroEditor from '../components/editors/AcademicHeroEditor';
import WhyChooseUsEditor from '../components/editors/WhyChooseUsEditor';
import VisionEditor from '../components/editors/VisionEditor';
import ProgramsEditor from '../components/editors/ProgramsEditor';
import AdmissionsEditor from '../components/editors/AdmissionsEditor';
import FacultyResearchEditor from '../components/editors/FacultyResearchEditor';
import AcademicCTAEditor from '../components/editors/AcademicCTAEditor';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const SECTIONS = {
  hero: 'Hero',
  whyChooseUs: 'Why Choose Us',
  vision: 'Vision',
  programs: 'Programs',
  admissions: 'Admissions',
  faculty: 'Faculty & Research',
  cta: 'Call to Action'
};

export default function AcademicContentEditor() {
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
          const response = await axios.get(`/academic-sections/${lang.code}/${urlSection}`);
          contentMap[lang.code] = response.data.data;
          statusMap[lang.code] = {
            isPublished: response.data.data.isPublished,
            id: response.data.data._id
          };
        } catch (error) {
          if (error.response?.status === 404) {
            contentMap[lang.code] = getDefaultContent('academic', urlSection);
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
          await axios.post('/academic-sections/section', {
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
      await axios.put(
        `/academic-sections/section/${status.id}/publish`,
        { isPublished: !status.isPublished }
      );
      
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
    // Define which fields contain images/icons for each section
    const imageFieldsMap = {
      hero: ['slides'],
      whyChooseUs: ['features'],
      vision: ['image'],
      programs: ['levels'],
      admissions: ['steps'],
      faculty: ['image'],
      cta: ['backgroundImage']
    };

    const fields = imageFieldsMap[urlSection] || [];
    
    try {
      const result = await syncImagesToAllLanguages('academic', 'en', urlSection, fields);
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

  if (!urlSection) {
    navigate('/academic-content');
    return null;
  }

  const currentContent = contentByLanguage[currentLanguage] || {};

  const renderEditor = () => {
    if (viewMode === 'json') {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Editing JSON for: {LANGUAGES.find(l => l.code === currentLanguage)?.name}
              </label>
              <div className="flex space-x-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentLanguage === lang.code
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
            className="w-full h-[600px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            spellCheck={false}
          />
        </div>
      );
    }

    const editorProps = {
      contentByLanguage,
      currentLanguage,
      onContentChange: handleContentChange,
      onLanguageChange: setCurrentLanguage,
      languages: LANGUAGES
    };

    switch (urlSection) {
      case 'hero':
        return <AcademicHeroEditor {...editorProps} />;
      case 'whyChooseUs':
        return <WhyChooseUsEditor {...editorProps} />;
      case 'vision':
        return <VisionEditor {...editorProps} />;
      case 'programs':
        return <ProgramsEditor {...editorProps} />;
      case 'admissions':
        return <AdmissionsEditor {...editorProps} />;
      case 'faculty':
        return <FacultyResearchEditor {...editorProps} />;
      case 'cta':
        return <AcademicCTAEditor {...editorProps} />;
      default:
        return <div>Section not found</div>;
    }
  };

  const getSectionName = () => SECTIONS[urlSection] || urlSection;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/academic-content')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Academic Dashboard</span>
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
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
