import { Link } from 'react-router-dom';
import { BookOpen, Edit, FileText, List } from 'lucide-react';

export default function LibraryDashboard() {
  const sections = [
    { id: 'quickAccess', name: 'Quick Access', icon: '⚡', description: 'Quick navigation links' },
    { id: 'hero', name: 'Hero Section', icon: '🎯', description: 'Main banner and stats' },
    { id: 'search', name: 'Search Section', icon: '🔍', description: 'Search bar and filters' },
    { id: 'resources', name: 'Resources', icon: '📄', description: 'Resource listings' },
    { id: 'stats', name: 'Statistics', icon: '📊', description: 'Library impact stats' },
    { id: 'digitalServices', name: 'Digital Services', icon: '💻', description: 'Services and features' },
    { id: 'modal', name: 'Modal Content', icon: '🪟', description: 'Resource detail modal' },
    { id: 'sampleResources', name: 'Sample Resources', icon: '📦', description: 'Sample resource data' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library Page Content</h1>
          <p className="text-gray-600 mt-2">Manage digital library sections - edit in multiple languages</p>
        </div>
        <Link
          to="/library-resources"
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <List className="w-5 h-5" />
          <span>Manage Resources</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Sections</p>
          <p className="text-3xl font-bold text-gray-900">{sections.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Languages</p>
          <p className="text-3xl font-bold text-purple-600">3</p>
          <p className="text-xs text-gray-500 mt-1">English, Amharic, Oromo</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Multi-Language</p>
          <p className="text-3xl font-bold text-blue-600">✓</p>
          <p className="text-xs text-gray-500 mt-1">Switch languages in editor</p>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Content Sections</h2>
          <p className="text-purple-100 text-sm">Click edit to manage content in all languages</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="group bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{section.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{section.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{section.description}</p>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/library/${section.id}`}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Section</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
