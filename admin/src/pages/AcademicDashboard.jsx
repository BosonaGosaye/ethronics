import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { Globe, Edit, CheckCircle, XCircle, Languages } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const SECTIONS = [
  { id: 'hero', name: 'Hero Section', description: 'Main banner with slides' },
  { id: 'whyChooseUs', name: 'Why Choose Us', description: 'Key features and benefits' },
  { id: 'vision', name: 'Vision', description: 'Vision and mission statement' },
  { id: 'programs', name: 'Programs', description: 'Academic programs and courses' },
  { id: 'admissions', name: 'Admissions', description: 'Admission process steps' },
  { id: 'faculty', name: 'Faculty & Research', description: 'Faculty and research info' },
  { id: 'cta', name: 'Call to Action', description: 'Registration CTA' }
];

export default function AcademicDashboard() {
  const [contentStatus, setContentStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: SECTIONS.length, published: 0, draft: 0 });

  useEffect(() => {
    fetchContentStatus();
  }, []);

  const fetchContentStatus = async () => {
    try {
      const statusMap = {};

      for (const lang of LANGUAGES) {
        const response = await axios.get(`/academic-sections/admin/${lang.code}`);
        statusMap[lang.code] = {};
        
        response.data.data.forEach(item => {
          statusMap[lang.code][item.section] = {
            isPublished: item.isPublished,
            updatedAt: item.updatedAt,
            id: item._id
          };
        });
      }

      setContentStatus(statusMap);
      
      // Calculate stats based on sections (not language duplicates)
      let publishedCount = 0;
      let draftCount = 0;
      
      SECTIONS.forEach(section => {
        const allPublished = LANGUAGES.every(lang => 
          statusMap[lang.code]?.[section.id]?.isPublished
        );
        const anyExists = LANGUAGES.some(lang => 
          statusMap[lang.code]?.[section.id]
        );
        
        if (anyExists) {
          if (allPublished) publishedCount++;
          else draftCount++;
        }
      });
      
      setStats({ total: SECTIONS.length, published: publishedCount, draft: draftCount });
    } catch (error) {
      console.error('Failed to fetch content status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageStatus = (sectionId) => {
    const statuses = LANGUAGES.map(lang => ({
      lang: lang.code,
      flag: lang.flag,
      exists: !!contentStatus[lang.code]?.[sectionId],
      isPublished: contentStatus[lang.code]?.[sectionId]?.isPublished
    }));
    return statuses;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Academic Page Content</h1>
        <p className="text-gray-600 mt-2">Manage academic content for all languages and sections</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sections</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Globe className="w-12 h-12 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{stats.published}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <XCircle className="w-12 h-12 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
        <Languages className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-900 font-medium">Multi-Language Editor</p>
          <p className="text-sm text-blue-700 mt-1">
            Click Edit to manage content for all languages in one place. Switch between languages inside the editor to enter translated texts. Images and icons are shared across all languages.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTIONS.map(section => {
          const languageStatuses = getLanguageStatus(section.id);
          const hasAnyContent = languageStatuses.some(s => s.exists);
          
          return (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                </div>
              </div>

              {/* Language Status Indicators */}
              <div className="flex items-center space-x-2 mb-4">
                {languageStatuses.map(status => (
                  <div
                    key={status.lang}
                    className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
                      !status.exists
                        ? 'bg-gray-100 text-gray-500'
                        : status.isPublished
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                    title={`${status.flag} ${!status.exists ? 'Not created' : status.isPublished ? 'Published' : 'Draft'}`}
                  >
                    <span>{status.flag}</span>
                    {status.exists && (
                      <span>{status.isPublished ? '✓' : '○'}</span>
                    )}
                  </div>
                ))}
              </div>

              <Link
                to={`/academic/edit/${section.id}`}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors w-full"
              >
                <Edit className="w-4 h-4" />
                <span>{hasAnyContent ? 'Edit' : 'Create'}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
