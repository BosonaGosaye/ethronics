import { PenTool } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BlogHero = ({ content, stats, loading }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    latestInsights: 'Latest Insights',
    totalPosts: 'Total Posts',
    totalViews: 'Total Views',
    totalAuthors: 'Authors'
  };
  
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (!content) {
    return null;
  }

  const heroData = content;
  
  // Use stats from backend if available, otherwise use content stats
  const displayStats = stats ? [
    { value: stats.totalPosts.toLocaleString(), label: t.blogPosts || 'Blog Posts' },
    { value: stats.monthlyReaders.toLocaleString() + '+', label: t.monthlyReaders || 'Monthly Readers' }
  ] : (heroData.stats || []);

  return (
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
              <PenTool className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {heroData.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {heroData.description}
          </p>

          {/* Quick Stats */}
          {displayStats && displayStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {displayStats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          {heroData.buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                {heroData.buttons.latest || t.latestPosts}
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-900 transition-colors font-semibold text-lg">
                {heroData.buttons.subscribe || t.subscribe}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;