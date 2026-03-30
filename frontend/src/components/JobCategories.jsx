import React from 'react';
import { 
  Code, 
  Database, 
  Palette, 
  BarChart3, 
  Shield, 
  Cpu, 
  Users, 
  Briefcase,
  Wrench,
  GraduationCap,
  Heart,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const JobCategories = ({ selectedCategory, setSelectedCategory }) => {
  const { language } = useLanguage();
  
  // Get UI translations with fallbacks
  const t = {
    title: 'Browse by Category',
    allJobs: 'All Jobs'
  };
  
  const iconMap = {
    'all': Briefcase,
    'engineering': Code,
    'data': Database,
    'design': Palette,
    'product': BarChart3,
    'security': Shield,
    'ai': Cpu,
    'marketing': Users,
    'operations': Wrench,
    'education': GraduationCap,
    'healthcare': Heart,
    'international': Globe
  };
  
  const colorMap = {
    'all': 'purple',
    'engineering': 'blue',
    'data': 'green',
    'design': 'pink',
    'product': 'orange',
    'security': 'red',
    'ai': 'indigo',
    'marketing': 'yellow',
    'operations': 'gray',
    'education': 'teal',
    'healthcare': 'rose',
    'international': 'cyan'
  };
  
  const categories = t.items.map(item => ({
    ...item,
    icon: iconMap[item.id],
    color: colorMap[item.id]
  }));

  const getColorClasses = (color, isSelected) => {
    const colors = {
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10',
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10',
      green: isSelected 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/10',
      pink: isSelected 
        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/10',
      orange: isSelected 
        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/10',
      red: isSelected 
        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/10',
      indigo: isSelected 
        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/10',
      yellow: isSelected 
        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10',
      gray: isSelected 
        ? 'border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
      teal: isSelected 
        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/10',
      rose: isSelected 
        ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/10',
      cyan: isSelected 
        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/10'
    };
    return colors[color] || colors.purple;
  };

  const getIconColorClasses = (color, isSelected) => {
    const colors = {
      purple: isSelected ? 'text-purple-600 dark:text-purple-400' : 'text-purple-500 group-hover:text-purple-600',
      blue: isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-blue-500 group-hover:text-blue-600',
      green: isSelected ? 'text-green-600 dark:text-green-400' : 'text-green-500 group-hover:text-green-600',
      pink: isSelected ? 'text-pink-600 dark:text-pink-400' : 'text-pink-500 group-hover:text-pink-600',
      orange: isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-orange-500 group-hover:text-orange-600',
      red: isSelected ? 'text-red-600 dark:text-red-400' : 'text-red-500 group-hover:text-red-600',
      indigo: isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-indigo-500 group-hover:text-indigo-600',
      yellow: isSelected ? 'text-yellow-600 dark:text-yellow-400' : 'text-yellow-500 group-hover:text-yellow-600',
      gray: isSelected ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 group-hover:text-gray-600',
      teal: isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-teal-500 group-hover:text-teal-600',
      rose: isSelected ? 'text-rose-600 dark:text-rose-400' : 'text-rose-500 group-hover:text-rose-600',
      cyan: isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-cyan-500 group-hover:text-cyan-600'
    };
    return colors[color] || colors.purple;
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left group ${
                  getColorClasses(category.color, isSelected)
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected 
                      ? `bg-${category.color}-100 dark:bg-${category.color}-800` 
                      : `bg-gray-100 dark:bg-gray-700 group-hover:bg-${category.color}-100 dark:group-hover:bg-${category.color}-800`
                  }`}>
                    <IconComponent className={`h-6 w-6 ${getIconColorClasses(category.color, isSelected)}`} />
                  </div>
                  
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    isSelected
                      ? `bg-${category.color}-200 text-${category.color}-800 dark:bg-${category.color}-800 dark:text-${category.color}-200`
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                  }`}>
                    {category.count}
                  </span>
                </div>
                
                <h3 className={`font-semibold mb-1 ${
                  isSelected
                    ? `text-${category.color}-900 dark:text-${category.color}-100`
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {category.name}
                </h3>
                
                <p className={`text-sm ${
                  isSelected
                    ? `text-${category.color}-600 dark:text-${category.color}-400`
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {category.count} {t.openPositions}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;