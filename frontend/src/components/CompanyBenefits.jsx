import React from 'react';
import { 
  Heart, 
  GraduationCap, 
  Home, 
  Plane, 
  Shield, 
  Coffee,
  Laptop,
  Users,
  Clock,
  Award
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionContent } from '../hooks/useCareersContent';

const CompanyBenefits = () => {
  const { language } = useLanguage();
  const { content, loading } = useSectionContent('benefits');
  
  // Don't render if no content from backend
  if (!content || loading) {
    return null;
  }
  
  const iconMap = [Heart, GraduationCap, Home, Plane, Shield, Coffee, Laptop, Users, Clock, Award];
  const benefits = (content.items || []).map((item, index) => ({
    ...item,
    icon: iconMap[index]
  }));

  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                    <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {benefit.description}
                </p>
                
                <ul className="space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        {content.cta && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {content.cta.title}
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                {content.cta.description}
              </p>
              {content.cta.buttons && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {content.cta.buttons.browse && (
                    <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                      {content.cta.buttons.browse}
                    </button>
                  )}
                  {content.cta.buttons.alert && (
                    <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-semibold">
                      {content.cta.buttons.alert}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyBenefits;