import { useEffect } from 'react';
import ManufacturingHero from '../components/ManufacturingHero';
import ManufacturingCapabilities from '../components/ManufacturingCapabilities';
import ManufacturingProducts from '../components/ManufacturingProducts';
import SustainabilitySection from '../components/SustainabilitySection';
import CTA from '../components/CTA';
import { useManufacturingContent } from '../hooks/useManufacturingContent';

const Manufacturing = () => {
  const { content, loading, error } = useManufacturingContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ManufacturingHero content={content.hero} />
      <ManufacturingCapabilities content={content.capabilities} />
      <ManufacturingProducts content={content.products} />
      <SustainabilitySection content={content.sustainability} />
      <CTA content={content.cta} />
    </div>
  );
};

export default Manufacturing;