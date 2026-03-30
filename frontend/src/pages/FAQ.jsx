import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFAQContent } from '../hooks/useFAQContent';
import FAQHero from '../components/FAQHero';
import FAQSearch from '../components/FAQSearch';
import FAQAccordion from '../components/FAQAccordion';
import FAQContact from '../components/FAQContact';

const FAQ = () => {
  const { language } = useLanguage();
  const { content, faqItems, stats, loading, error } = useFAQContent(language);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading FAQ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error loading FAQ: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <FAQHero content={content.hero} stats={stats} />
      <FAQSearch content={content.search} faqItems={faqItems} />
      <FAQAccordion faqItems={faqItems} />
      <FAQContact content={content.contact} />
    </div>
  );
};

export default FAQ;
