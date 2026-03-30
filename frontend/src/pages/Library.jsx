import { useState } from 'react';
import { Link } from 'react-router-dom';
import LibraryHero from '../components/LibraryHero';
import LibrarySearch from '../components/LibrarySearch';
import LibraryResources from '../components/LibraryResources';
import LibraryStats from '../components/LibraryStats';
import DigitalServices from '../components/DigitalServices';
import { useLanguage } from '../contexts/LanguageContext';
import { useLibraryContent } from '../hooks/useLibraryContent';

const Library = () => {
  const { language } = useLanguage();
  const { content, loading, error } = useLibraryContent(language);
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    title: 'Library',
    description: 'Access our resources'
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading library content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading content: {error}</p>
          <p className="text-gray-600 dark:text-gray-400">Using fallback translations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <LibraryHero content={content.hero} />
      <LibraryStats content={content.stats} />
      <LibrarySearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        content={content.search}
      />
      <LibraryResources 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedType={selectedType}
        content={content.resources}
      />
      <DigitalServices content={content.digitalServices} />
    </div>
  );
};

export default Library;