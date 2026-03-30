import { Link } from 'react-router-dom';
import { Mail, Edit, FileText } from 'lucide-react';

export default function ContactDashboard() {
  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🎯', description: 'Main banner and title' },
    { id: 'categories', name: 'Categories', icon: '📋', description: 'Contact form categories' },
    { id: 'form', name: 'Form Labels', icon: '📝', description: 'Form fields and labels' },
    { id: 'details', name: 'Contact Details', icon: '📞', description: 'Phone, email, address' },
    { id: 'location', name: 'Location', icon: '📍', description: 'Map and location info' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Page Content</h1>
          <p className="text-gray-600 mt-2">Manage contact page sections - edit in multiple languages</p>
        </div>
        <Link
          to="/contact-messages"
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>View Messages</span>
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
              <Mail className="w-6 h-6 text-purple-600" />
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
                  to={`/contact/${section.id}`}
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
