import React, { useState } from 'react';
import { Briefcase, Users, TrendingUp, Globe } from 'lucide-react';
import PublicJobSubmissionModal from './PublicJobSubmissionModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionContent } from '../hooks/useCareersContent';

const CareersHero = () => {
  const { language } = useLanguage();
  const { content, loading } = useSectionContent('hero');
  const [isJobPostingOpen, setIsJobPostingOpen] = useState(false);

  // Don't render if no content from backend
  if (!content || loading) {
    return null;
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {content.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {content.description}
            </p>

            {/* CTA Buttons */}
            {content.buttons && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {content.buttons.browse && (
                  <button className="px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                    {content.buttons.browse}
                  </button>
                )}
                {content.buttons.post && (
                  <button 
                    onClick={() => setIsJobPostingOpen(true)}
                    className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-900 transition-colors font-semibold text-lg"
                  >
                    {content.buttons.post}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Posting Modal */}
      <PublicJobSubmissionModal 
        isOpen={isJobPostingOpen}
        onClose={() => setIsJobPostingOpen(false)}
      />
    </>
  );
};

export default CareersHero;