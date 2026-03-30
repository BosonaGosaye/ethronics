import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import DynamicIcon from './DynamicIcon';

const Partnerships = ({ content }) => {
  const { language } = useLanguage();

  // Return loading state if no content
  if (!content) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  const partnerships = (content.types || []).map((type, index) => ({
    ...type,
    icon: type.icon || 'Building', // Use icon name from backend
    color: ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-teal-500", "from-orange-500 to-red-500", "from-indigo-500 to-purple-500", "from-yellow-500 to-orange-500"][index % 6]
  }));

  const keyPartnerships = (content.keyPartnerships || []).map((partner, index) => ({
    ...partner,
    logo: partner.logo || `https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80`
  }));

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title || 'Our Partnerships'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle || ''}
          </p>
        </div>

        {/* Partnership Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partnerships.map((partnership, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${partnership.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <DynamicIcon iconName={partnership.icon} className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {partnership.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {partnership.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Partnerships Showcase */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {content.featured || 'Featured Partnerships'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {content.featuredSubtitle || ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyPartnerships.map((partner, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Partner Logo */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        // Fallback to a generic partner icon SVG
                        e.target.src = `https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80`;
                      }}
                    />
                  </div>
                </div>

                {/* Partner Info */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs font-medium rounded-full mb-2">
                    {partner.type}
                  </span>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {partner.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {content.cta?.title || 'Partner With Us'}
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              {content.cta?.description || ''}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {content.cta?.becomePartner || 'Become a Partner'}
              </a>
              <a
                href="/about"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                {content.cta?.learnMore || 'Learn More'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;