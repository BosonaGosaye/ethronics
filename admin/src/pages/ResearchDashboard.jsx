import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { Microscope, Edit, TrendingUp, FileText, CheckCircle, AlertCircle, Beaker } from 'lucide-react';

export default function ResearchDashboard() {
  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🎯', description: 'Main banner with research slides' },
    { id: 'focus', name: 'Research Focus', icon: '🔬', description: 'Key research areas and domains' },
    { id: 'projects', name: 'Projects Section', icon: '📊', description: 'Current R&D projects showcase' },
    { id: 'whateverYouNeed', name: 'Whatever You Need', icon: '💡', description: 'Custom solutions section' },
    { id: 'collaborate', name: 'Collaborate', icon: '🤝', description: 'Partnership opportunities' },
    { id: 'cta', name: 'Call to Action', icon: '📞', description: 'Contact and engagement CTA' }
  ];

  useEffect(() => {
    fetchContentStatus();
  }, []);

  const fetchContentStatus = async () => {
    try {
      setLoading(true);
      // Fetch English content to get section status
      const response = await axios.get('/research/admin/en');
      const data = response.data.data;
      
      setContent(data);
      setStats({
        total: data.length,
        published: data.filter(item => item.isPublished).length,
        draft: data.filter(item => !item.isPublished).length
      });
    } catch (error) {
      console.error('Failed to fetch content status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSectionStatus = (sectionId) => {
    const item = content.find(c => c.section === sectionId);
    return item || null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Microscope className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Research Content Management</h1>
              <p className="text-purple-100 mt-1">Manage research sections with multi-language support</p>
            </div>
          </div>
          <Link
            to="/research-projects"
            className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all shadow-lg font-medium"
          >
            <Beaker className="w-5 h-5" />
            <span>Manage Projects</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Sections</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-2">Out of {sections.length} sections</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Published</p>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
          <p className="text-xs text-gray-500 mt-2">Live on website</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
          <p className="text-xs text-gray-500 mt-2">Not published</p>
        </div>
      </div>

      {/* Sections Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const status = getSectionStatus(section.id);
            const isPublished = status?.isPublished || false;
            const exists = status !== null;

            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{section.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{section.name}</h3>
                        <p className="text-sm text-gray-500">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {exists ? (
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isPublished ? 'Published' : 'Draft'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                          Not Created
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/research/${section.id}`}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
