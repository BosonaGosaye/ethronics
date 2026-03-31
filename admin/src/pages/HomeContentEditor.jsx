import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Save, ArrowLeft, Eye, Code, Globe, CheckCircle, XCircle } from 'lucide-react';
import { syncImagesToAllLanguages } from '../utils/syncContent';
import HeroEditor from '../components/editors/HeroEditor';
import FeaturesEditor from '../components/editors/FeaturesEditor';
import SolutionsEditor from '../components/editors/SolutionsEditor';
import GalleryEditor from '../components/editors/GalleryEditor';
import PartnershipsEditor from '../components/editors/PartnershipsEditor';
import CTAEditor from '../components/editors/CTAEditor';
import GenericEditor from '../components/editors/GenericEditor';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const PREDEFINED_SECTIONS = {
  hero: 'Hero Section',
  features: 'Features',
  solutions: 'Solutions',
  gallery: 'Gallery',
  partnerships: 'Partnerships',
  cta: 'Call to Action'
};

export default function HomeContentEditor() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [contentByLanguage, setContentByLanguage] = useState({
    en: null,
    am: null,
    om: null
  });
  const [publishStatusByLanguage, setPublishStatusByLanguage] = useState({
    en: false,
    am: false,
    om: false
  });
  const [contentIds, setContentIds] = useState({
    en: null,
    am: null,
    om: null
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [viewMode, setViewMode] = useState('form');
  const [jsonContent, setJsonContent] = useState('');

  useEffect(() => {
    if (section) {
      fetchAllLanguages();
    } else {
      // If no section param, redirect back to dashboard
      navigate('/home-content');
    }
  }, [section, navigate]);

  useEffect(() => {
    // Update JSON view when language changes
    if (contentByLanguage[currentLanguage]) {
      setJsonContent(JSON.stringify(contentByLanguage[currentLanguage], null, 2));
    }
  }, [currentLanguage, contentByLanguage]);

  const getDefaultContent = (sectionName) => {
    // Return appropriate default structure based on section
    const defaults = {
      hero: {
        badge: '',
        slide1: { line1: '', line2: '', line3: '', description: '', image: '' },
        buttons: { summerTraining: '', explorePrograms: '', viewResearch: '' },
        floatingPromo: { title: '', description: '', button: '' }
      },
      features: {
        title: '',
        subtitle: '',
        learnMore: '',
        modalDescription: '',
        items: []
      },
      solutions: {
        title: '',
        subtitle: '',
        items: []
      },
      gallery: {
        title: '',
        subtitle: '',
        images: []
      },
      partnerships: {
        title: '',
        subtitle: '',
        partners: []
      },
      cta: {
        title: '',
        subtitle: '',
        buttonText: '',
        backgroundImage: ''
      }
    };
    
    return defaults[sectionName] || { title: '', description: '' };
  };

  const fetchAllLanguages = async () => {
    if (!section) return;
    
    setLoading(true);
    const newContent = {};
    const newPublishStatus = {};
    const newIds = {};

    try {
      // Fetch content for all languages using admin endpoint
      for (const lang of LANGUAGES) {
        try {
          // Use admin endpoint to get full document with metadata
          const response = await axios.get(`/home/admin/${lang.code}`);
          
          // Find the section in the response
          const sectionData = response.data.data.find(item => item.section === section);
          
          if (sectionData) {
            newContent[lang.code] = sectionData.content;
            newPublishStatus[lang.code] = sectionData.isPublished || false;
            newIds[lang.code] = sectionData._id;
          } else {
            // Section doesn't exist yet, create default content structure
            newContent[lang.code] = getDefaultContent(section);
            newPublishStatus[lang.code] = false;
            newIds[lang.code] = null;
          }
        } catch (error) {
          if (error.response?.status === 404 || error.response?.status === 401) {
            // Section doesn't exist yet or not authenticated, create default content structure
            newContent[lang.code] = getDefaultContent(section);
            newPublishStatus[lang.code] = false;
            newIds[lang.code] = null;
          } else {
            throw error;
          }
        }
      }

      setContentByLanguage(newContent);
      setPublishStatusByLanguage(newPublishStatus);
      setContentIds(newIds);
      setJsonContent(JSON.stringify(newContent.en, null, 2));
    } catch (error) {
      console.error('Failed to fetch content:', error);
      alert('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (lang) => {
    if (!contentIds[lang]) {
      alert(`Please save the ${LANGUAGES.find(l => l.code === lang)?.name} content first before publishing`);
      return;
    }

    setPublishing(true);
    try {
      const newStatus = !publishStatusByLanguage[lang];
      await axios.put(`/home/${contentIds[lang]}/publish`, {
        isPublished: newStatus
      });

      setPublishStatusByLanguage(prev => ({
        ...prev,
        [lang]: newStatus
      }));

      alert(`${LANGUAGES.find(l => l.code === lang)?.name} content ${newStatus ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      alert('Failed to update publish status');
    } finally {
      setPublishing(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let dataToSave = contentByLanguage;
      
      if (viewMode === 'json') {
        try {
          const parsed = JSON.parse(jsonContent);
          dataToSave = { ...contentByLanguage, [currentLanguage]: parsed };
        } catch (error) {
          alert('Invalid JSON format');
          setSaving(false);
          return;
        }
      }

      // Save all languages
      const savePromises = LANGUAGES.map(lang =>
        axios.post('/home', {
          language: lang.code,
          section,
          content: dataToSave[lang.code]
        })
      );

      await Promise.all(savePromises);

      // Refresh to get updated IDs
      await fetchAllLanguages();

      alert('Content saved successfully for all languages!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleSyncImages = async () => {
    // Define which fields contain images/icons for each section
    const imageFieldsMap = {
      hero: ['slides'],
      features: ['features'],
      solutions: ['solutions'],
      gallery: ['images'],
      partnerships: ['partners'],
      cta: ['backgroundImage']
    };

    const fields = imageFieldsMap[section] || [];
    
    try {
      const result = await syncImagesToAllLanguages('home', 'en', section, fields);
      
      // Refresh content after sync
      await fetchAllLanguages();
      
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
    return null;
  }

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
            value={jsonContent}
            onChange={(e) => {
              const newJson = e.target.value;
              setJsonContent(newJson);
              try {
                const parsed = JSON.parse(newJson);
                setContentByLanguage(prev => ({
                  ...prev,
                  [currentLanguage]: parsed
                }));
              } catch (error) {
                // Invalid JSON, don't update content
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
      onContentChange: (lang, newContent) => {
        setContentByLanguage(prev => ({
          ...prev,
          [lang]: newContent
        }));
        if (lang === currentLanguage) {
          setJsonContent(JSON.stringify(newContent, null, 2));
        }
      },
      onLanguageChange: setCurrentLanguage,
      languages: LANGUAGES
    };

    // Use specific editors for predefined sections
    switch (section) {
      case 'hero':
        return <HeroEditor {...editorProps} />;
      case 'features':
        return <FeaturesEditor {...editorProps} />;
      case 'solutions':
        return <SolutionsEditor {...editorProps} />;
      case 'gallery':
        return <GalleryEditor {...editorProps} />;
      case 'partnerships':
        return <PartnershipsEditor {...editorProps} />;
      case 'cta':
        return <CTAEditor {...editorProps} />;
      default:
        return <GenericEditor {...editorProps} />;
    }
  };

  const getSectionName = () => {
    if (PREDEFINED_SECTIONS[section]) {
      return PREDEFINED_SECTIONS[section];
    }
    return section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/home-content')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Dashboard</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {getSectionName()}
              </h1>
              {!PREDEFINED_SECTIONS[section] && (
                <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded">
                  Custom Section
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Multi-language editor - Switch languages inside the editor</span>
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
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save All Languages'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Publish Status Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Publish Status:</span>
            {LANGUAGES.map(lang => (
              <div
                key={lang.code}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${
                  publishStatusByLanguage[lang.code]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {publishStatusByLanguage[lang.code] ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handlePublishToggle(lang.code)}
                disabled={publishing || !contentIds[lang.code]}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  publishStatusByLanguage[lang.code]
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {publishStatusByLanguage[lang.code] ? (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Unpublish {lang.flag}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Publish {lang.flag}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor with integrated language switcher */}
      {renderEditor()}
    </div>
  );
}
