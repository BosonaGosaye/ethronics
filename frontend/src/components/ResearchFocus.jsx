import { Bot, Brain, Shield, Cpu, Link } from 'lucide-react';

const ResearchFocus = ({ content }) => {
  if (!content) return null;

  const iconMap = {
    'Bot': <Bot className="h-8 w-8" />,
    'Brain': <Brain className="h-8 w-8" />,
    'Shield': <Shield className="h-8 w-8" />,
    'Cpu': <Cpu className="h-8 w-8" />,
    'Link': <Link className="h-8 w-8" />
  };
  
  const researchFocusAreas = (content.areas || []).map((area, index) => ({
    icon: iconMap[area.icon] || <Bot className="h-8 w-8" />,
    title: area.title,
    description: area.description
  }));

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchFocusAreas.map((area, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4 mx-auto text-purple-600 dark:text-purple-400">
                {area.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {area.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchFocus;
