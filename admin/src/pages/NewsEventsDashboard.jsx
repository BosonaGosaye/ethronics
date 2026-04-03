import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { Newspaper, Eye, EyeOff, Edit, TrendingUp, FileText, CheckCircle, AlertCircle, Globe, Image } from 'lucide-react';

export default function NewsEventsDashboard() {
  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
    { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' }
  ];

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🎯', description: 'Main banner with stats' },
    { id: 'filter', name: 'Filter Section', icon: '🔍', description: 'Search and filter options' },
    { id: 'featured', name: 'Featured News', icon: '⭐', description: 'Featured stories' },
    { id: 'newsGrid', name: 'News Grid', icon: '📰', description: 'Latest updates grid' },
    { id: 'newsletter', name: 'Newsletter', icon: '📧', description: 'Newsletter subscription' },
    { id: 'mediaCenter', name: 'Media Center', icon: '🎬', description: 'Media gallery' },
    { id: 'eventsCalendar', name: 'Events Calendar', icon: '📅', description: 'Calendar view' }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const allContent = [];
      
      for (const lang of languages) {
        const response = await axios.get(`/newsEvents/admin/${lang.code}`);
        if (response.data.success) {
          allContent.push(...response.data.data);
        }
      }
      
      setContent(allContent);
      setStats({
        total: sections.length,
        published: sections.filter(section => 
          languages.every(lang => 
            allContent.find(item => item.language === lang.code && item.section === section.id)?.isPublished
          )
        ).length,
        draft: sections.filter(section => 
          languages.some(lang => 
            !allContent.find(item => item.language === lang.code && item.section === section.id)?.isPublished
          )
        ).length
      });
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPublishStatus = (sectionId) => {
    const statuses = languages.map(lang => {
      const sectionContent = content.find(
        item => item.language === lang.code && item.section === sectionId
      );
      return {
        language: lang.code,
        flag: lang.flag,
        isPublished: sectionContent?.isPublished || false
      };
    });
    return statuses;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News & Events Page Content</h1>
          <p className="text-gray-600 mt-2">Manage news & events sections across all languages</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/media-items"
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Image className="w-5 h-5" />
            <span className="font-medium">Media Library</span>
          </Link>
          <Link
            to="/news-event-items"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Newspaper className="w-5 h-5" />
            <span className="font-medium">Manage News & Events</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Sections</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Published</p>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Languages</p>
          <p className="text-3xl font-bold text-blue-600">{languages.length}</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Page Sections</h2>
          <p className="text-blue-100 text-sm mt-1">Edit content for all languages in one place</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => {
              const publishStatuses = getPublishStatus(section.id);

              return (
                <div
                  key={section.id}
                  className="group bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{section.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{section.name}</h3>
                        <p className="text-xs text-gray-500">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Language Status */}
                  <div className="flex items-center space-x-1 mb-3">
                    {publishStatuses.map(status => (
                      <div
                        key={status.language}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                          status.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                        title={`${status.language.toUpperCase()}: ${status.isPublished ? 'Published' : 'Draft'}`}
                      >
                        <span>{status.flag}</span>
                        {status.isPublished ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/news-events/${section.id}`}
                    className="flex items-center justify-center space-x-1 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Section</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
