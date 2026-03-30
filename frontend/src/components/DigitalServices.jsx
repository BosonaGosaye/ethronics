import React from 'react';
import { 
  Search, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Calendar, 
  Headphones,
  Monitor,
  FileText,
  Database,
  Wifi
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DigitalServices = ({ content }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    title: 'Digital Services',
    description: 'Access our online services'
  };
  
  // Use backend content if available, otherwise fallback to translations
  const servicesContent = content || t.digitalServices;

  const icons = [Search, BookOpen, Users, MessageCircle, Calendar, Headphones, Monitor, FileText, Database, Wifi];
  const services = (servicesContent.services || t.digitalServices.services).map((service, index) => ({
    ...service,
    icon: icons[index]
  }));

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {servicesContent.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {servicesContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                    <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  {servicesContent.learnMore || t.digitalServices.learnMore}
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {servicesContent.cta?.title || t.digitalServices.cta.title}
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            {servicesContent.cta?.description || t.digitalServices.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              {servicesContent.cta?.scheduleConsultation || t.digitalServices.cta.scheduleConsultation}
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-semibold">
              {servicesContent.cta?.virtualTour || t.digitalServices.cta.virtualTour}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalServices;