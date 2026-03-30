import React, { useState } from 'react';
import { GraduationCap, DollarSign, BookOpen, Users, Building, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQCategories = () => {
  const { language } = useLanguage();
  
  // Get UI translations with fallbacks
  const t = {
    title: 'FAQ Categories',
    all: 'All',
    categories: []
  };
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryIcons = {
    all: BookOpen,
    admissions: GraduationCap,
    tuition: DollarSign,
    programs: BookOpen,
    campus: Users,
    facilities: Building,
    careers: Briefcase
  };

  const categoryColors = {
    all: 'purple',
    admissions: 'blue',
    tuition: 'green',
    programs: 'orange',
    campus: 'pink',
    facilities: 'indigo',
    careers: 'teal'
  };

  const getColorClasses = (color, isActive) => {
    const colors = {
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40',
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40',
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/40',
      pink: isActive ? 'bg-pink-600 text-white' : 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/40',
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
      teal: isActive ? 'bg-teal-600 text-white' : 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/40',
    };
    return colors[color];
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
          {t.items.map((category) => {
            const Icon = categoryIcons[category.id];
            const color = categoryColors[category.id];
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-xl transition-all duration-200 transform hover:scale-105 ${getColorClasses(color, isActive)}`}
              >
                <Icon className="w-8 h-8 mx-auto mb-3" />
                <div className="text-sm font-semibold text-center">
                  {category.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQCategories;
