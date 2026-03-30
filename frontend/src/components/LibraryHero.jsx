import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LibraryHero = ({ content }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    title: 'Library',
    description: 'Access our digital resources',
    searchPlaceholder: 'Search resources...'
  };
  
  // Use backend content if available, otherwise fallback to translations
  const heroContent = content || t.hero;

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
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {heroContent.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {heroContent.description}
          </p>

        </div>
      </div>
    </section>
  );
};

export default LibraryHero;