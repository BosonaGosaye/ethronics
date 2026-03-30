import React from 'react';
import { Award, MapPin, Globe, Briefcase } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

const WhyChooseUs = ({ content }) => {
  if (!content) return null;

  const defaultIcons = [
    <Award className="h-6 w-6" />,
    <MapPin className="h-6 w-6" />,
    <Globe className="h-6 w-6" />,
    <Briefcase className="h-6 w-6" />
  ];

  const whyChooseUsFeatures = content.features.map((feature, index) => ({
    icon: feature.icon ? <DynamicIcon name={feature.icon} className="h-6 w-6" /> : defaultIcons[index],
    title: feature.title,
    description: feature.description
  }));

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUsFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;