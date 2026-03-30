import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LibraryStats = ({ content }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    totalResources: 'Total Resources',
    totalViews: 'Total Views',
    totalDownloads: 'Downloads',
    activeUsers: 'Active Users'
  };
  
  const [realStats, setRealStats] = useState(null);
  
  // Use backend content if available
  const statsContent = content || {};

  // Fetch real statistics from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/library-resources/public?language=${language}&limit=1000`);
        if (response.data.success) {
          const resources = response.data.data;
          const totalDownloads = resources.reduce((sum, r) => sum + (r.downloads || 0), 0);
          const totalViews = resources.reduce((sum, r) => sum + (r.views || 0), 0);
          
          setRealStats({
            totalResources: response.data.pagination.total,
            totalDownloads,
            totalViews,
            activeUsers: Math.floor(totalViews / 10) // Estimate based on views
          });
        }
      } catch (error) {
        console.error('Error fetching library stats:', error);
      }
    };

    if (language) {
      fetchStats();
    }
  }, [language]);

  const icons = [TrendingUp, Users, Clock, Award];
  
  // Update stats with real data if available
  const stats = (statsContent.items || t.stats.items).map((item, index) => {
    let value = item.value;
    
    if (realStats) {
      switch (index) {
        case 0:
          value = realStats.totalResources.toLocaleString();
          break;
        case 1:
          value = realStats.totalDownloads.toLocaleString();
          break;
        case 2:
          value = realStats.totalViews.toLocaleString();
          break;
        case 3:
          value = realStats.activeUsers.toLocaleString();
          break;
      }
    }
    
    return {
      ...item,
      value,
      icon: icons[index]
    };
  });

  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {statsContent.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {statsContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                  <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {stat.label}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LibraryStats;