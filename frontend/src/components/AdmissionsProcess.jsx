import React from 'react';
import DynamicIcon from './DynamicIcon';

const AdmissionsProcess = ({ content }) => {
  if (!content) return null;

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.steps.map((step, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4 mx-auto">
                {step.icon ? (
                  <DynamicIcon name={step.icon} className="h-6 w-6" />
                ) : (
                  <span className="text-lg font-bold">{index + 1}</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionsProcess;