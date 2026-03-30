import { Leaf, Recycle, Zap } from 'lucide-react';

const SustainabilitySection = ({ content }) => {
  if (!content) return null;

  const iconMap = {
    'Leaf': <Leaf className="h-10 w-10" />,
    'Recycle': <Recycle className="h-10 w-10" />,
    'Zap': <Zap className="h-10 w-10" />
  };

  const sustainabilityItems = (content.items || []).map((item) => ({
    icon: iconMap[item.icon] || <Leaf className="h-10 w-10" />,
    ...item
  }));

  return (
    <section className="relative h-auto py-12 px-4 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-900/70" />
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          {content.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 max-w-xl mx-auto">
          {content.subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {sustainabilityItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-white/10"
            >
              <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-3 sm:mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;