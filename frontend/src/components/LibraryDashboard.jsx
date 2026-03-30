import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Download, 
  Clock, 
  TrendingUp, 
  User,
  Settings,
  Bell,
  Search,
  Filter
} from 'lucide-react';

const LibraryDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'saved', label: 'Saved Resources', icon: Heart },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'history', label: 'Reading History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const recentActivity = [
    {
      type: 'download',
      title: 'Advanced Circuit Analysis',
      author: 'Dr. Sarah Johnson',
      time: '2 hours ago',
      category: 'Electronics'
    },
    {
      type: 'save',
      title: 'Machine Learning in Automation',
      author: 'Prof. Michael Chen',
      time: '1 day ago',
      category: 'Automation'
    },
    {
      type: 'view',
      title: 'Power Electronics Fundamentals',
      author: 'Dr. Emily Rodriguez',
      time: '2 days ago',
      category: 'Power Systems'
    }
  ];

  const savedResources = [
    {
      id: 1,
      title: 'Digital Signal Processing Toolkit',
      author: 'Dr. James Wilson',
      type: 'Software',
      savedDate: '2024-03-15',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Renewable Energy Systems Dataset',
      author: 'Ethronics Research Team',
      type: 'Dataset',
      savedDate: '2024-03-10',
      category: 'Research'
    },
    {
      id: 3,
      title: 'Entrepreneurship in Technology',
      author: 'Prof. Lisa Anderson',
      type: 'Book',
      savedDate: '2024-03-08',
      category: 'Business'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Resources Accessed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
            </div>
            <Download className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reading Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">48h</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`p-2 rounded-full ${
                activity.type === 'download' ? 'bg-green-100 text-green-600' :
                activity.type === 'save' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {activity.type === 'download' && <Download className="h-4 w-4" />}
                {activity.type === 'save' && <Heart className="h-4 w-4" />}
                {activity.type === 'view' && <BookOpen className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  by {activity.author} • {activity.category}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSavedResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Saved Resources ({savedResources.length})
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search saved..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {savedResources.map((resource) => (
          <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  by {resource.author}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                    {resource.type}
                  </span>
                  <span>{resource.category}</span>
                  <span>Saved on {resource.savedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Access
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'saved':
        return renderSavedResources();
      case 'downloads':
        return <div className="text-center py-12 text-gray-500">Downloads history coming soon...</div>;
      case 'history':
        return <div className="text-center py-12 text-gray-500">Reading history coming soon...</div>;
      case 'profile':
        return <div className="text-center py-12 text-gray-500">Profile settings coming soon...</div>;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">Library settings coming soon...</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Library Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your resources, track your progress, and customize your library experience
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;