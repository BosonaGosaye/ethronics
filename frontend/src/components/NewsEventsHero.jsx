import React from 'react';
import { Newspaper } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NewsEventsHero = ({ content, realStats }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const fallback = {
    title: 'News & Events',
    description: 'Stay updated with our latest news',
    stats: {
      articles: { label: 'Articles', value: 0 },
      events: { label: 'Events', value: 0 },
      views: { label: 'Views', value: 0 }
    }
  };
  
  // Use backend content if available, otherwise fallback
  const t = content || fallback;
  
  // Merge real stats values with backend labels
  const stats = {
    articles: {
      value: realStats?.articles || 0,
      label: t?.stats?.articles?.label || fallback.stats.articles.label
    },
    events: {
      value: realStats?.events || 0,
      label: t?.stats?.events?.label || fallback.stats.events.label
    },
    partners: {
      value: realStats?.partners || 0,
      label: t?.stats?.partners?.label || fallback.stats.partners.label
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Newspaper className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t?.title || fallback.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {t?.description || fallback.description}
          </p>

          {/* Quick Stats - Real Database Counts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stats.articles.value}
              </div>
              <div className="text-sm text-gray-200">
                {stats.articles.label}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stats.events.value}
              </div>
              <div className="text-sm text-gray-200">
                {stats.events.label}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stats.partners.value}
              </div>
              <div className="text-sm text-gray-200">
                {stats.partners.label}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          {(t?.buttons || fallback.buttons) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                {t?.buttons?.news || fallback.buttons.news}
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-900 transition-colors font-semibold text-lg">
                {t?.buttons?.events || fallback.buttons.events}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsEventsHero;
