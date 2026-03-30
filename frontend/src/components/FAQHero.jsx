import React from 'react';
import { HelpCircle, MessageCircle, BookOpen } from 'lucide-react';

const FAQHero = ({ content, stats }) => {
  if (!content) return null;

  const getIconComponent = (iconName) => {
    const icons = {
      BookOpen,
      MessageCircle,
      HelpCircle
    };
    return icons[iconName] || HelpCircle;
  };

  // Always use real stats from backend, ignore content.stats
  const displayStats = stats ? [
    {
      icon: 'BookOpen',
      value: stats.published || 0,
      label: 'Published FAQs'
    },
    {
      icon: 'MessageCircle',
      value: stats.total || 0,
      label: 'Total Questions'
    },
    {
      icon: 'HelpCircle',
      value: stats.featured || 0,
      label: 'Featured'
    }
  ] : [];

  return (
    <section className="relative bg-gradient-to-br from-blue-900/90 via-gray-900/80 to-blue-900/90 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
              <HelpCircle className="w-16 h-16" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* Quick Stats - Only show if we have real backend stats */}
          {displayStats && displayStats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {displayStats.map((stat, index) => {
                const Icon = getIconComponent(stat.icon);
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Icon className="w-8 h-8 mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-purple-100">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQHero;
