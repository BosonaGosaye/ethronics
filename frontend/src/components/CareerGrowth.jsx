import React from 'react';
import { TrendingUp, Target, Users, Award, BookOpen, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionContent } from '../hooks/useCareersContent';

const CareerGrowth = () => {
  const { language } = useLanguage();
  const { content, loading } = useSectionContent('growth');
  
  // Don't render if no content from backend
  if (!content || loading) {
    return null;
  }
  
  const growthPaths = (content.progression?.levels || []).map((level, index) => ({
    ...level,
    color: ['green', 'blue', 'purple'][index]
  }));

  const skills = (content.skills?.items || []).map((skill, index) => ({
    ...skill,
    icon: [Target, Users, Lightbulb, BookOpen][index]
  }));

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Career Levels */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-8">
            {content.progression?.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {growthPaths.map((path, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < growthPaths.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-8 h-0.5 bg-gray-300 dark:bg-gray-600 transform translate-x-full -translate-y-1/2 z-10"></div>
                )}
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                      path.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                      path.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                      'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
                    }`}>
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {path.level}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {path.duration}
                    </p>
                  </div>
                  
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {path.title}
                  </h5>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {path.description}
                  </p>
                  
                  <div>
                    <h6 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                      {content.progression?.opportunitiesLabel}
                    </h6>
                    <ul className="space-y-1">
                      {path.opportunities.map((opportunity, opIndex) => (
                        <li key={opIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            path.color === 'green' ? 'bg-green-500' :
                            path.color === 'blue' ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`}></div>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Development */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-8">
            {content.skills?.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                    <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {skill.description}
                  </p>
                  
                  <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    {skill.programs.map((program, progIndex) => (
                      <li key={progIndex} className="flex items-center justify-center">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerGrowth;