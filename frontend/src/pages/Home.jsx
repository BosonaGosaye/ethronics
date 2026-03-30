import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Solutions from '../components/Solutions';
import Gallery from '../components/Gallery';
import Partnerships from '../components/Partnerships';
import CTA from '../components/CTA';
import { useLanguage } from '../contexts/LanguageContext';
import { useHomeContent } from '../hooks/useHomeContent';

const Home = () => {
  const { language } = useLanguage();
  const { content, loading, error } = useHomeContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = () => {
    window.location.href = '/register#register';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading content: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 max-w-full overflow-x-hidden transition-colors duration-200">
      {/* Hero Section */}
      <Hero content={content.hero} onNavigate={handleNavigate} />
      
      {/* Features Section - Research & Innovation */}
      <Features content={content.features} />
      
      {/* Solutions Section */}
      <Solutions content={content.solutions} />
      
      {/* Partnerships Section */}
      <Partnerships content={content.partnerships} />
      
      {/* Gallery Section - Our Journey in Pictures */}
      <Gallery content={content.gallery} />
      
      {/* Call to Action Section */}
      <CTA content={content.cta} />

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes pop-in {
          0% {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
          100% {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }
        @keyframes pop-out {
          0% {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
        }
        @keyframes explode {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--random-x, 100px), var(--random-y, -100px)) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;