import React from 'react';
import { 
  Search, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  MessageCircle,
  Award,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionContent } from '../hooks/useCareersContent';

const ApplicationProcess = () => {
  const { language } = useLanguage();
  const { content, loading } = useSectionContent('process');
  
  // Don't render if no content from backend
  if (!content || loading) {
    return null;
  }
  
  const iconMap = [Search, FileText, Users, MessageCircle, CheckCircle, UserCheck];
  const steps = (content.steps || []).map((step, index) => ({
    ...step,
    icon: iconMap[index]
  }));

  const tipIconMap = [FileText, MessageCircle, Award];
  const tips = (content.tips?.items || []).map((tip, index) => ({
    ...tip,
    icon: tipIconMap[index]
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

        {/* Process Steps */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 pt-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Tips */}
        {content.tips && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-8">
              {content.tips.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tip.title}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {tip.tips.map((tipItem, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {tipItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationProcess;