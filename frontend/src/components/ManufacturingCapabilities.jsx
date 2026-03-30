import { Lightbulb, Cog, Users, Leaf, Zap } from 'lucide-react';

const ManufacturingCapabilities = ({ content }) => {
  if (!content) return null;

  const iconMap = {
    'Lightbulb': <Lightbulb className="h-6 w-6" />,
    'Cog': <Cog className="h-6 w-6" />,
    'Users': <Users className="h-6 w-6" />,
    'Leaf': <Leaf className="h-6 w-6" />,
    'Zap': <Zap className="h-6 w-6" />
  };

  const capabilities = (content.items || []).map((item) => ({
    icon: iconMap[item.icon] || <Cog className="h-6 w-6" />,
    ...item
  }));

  return (
    <section id="capabilities" className="bg-white dark:bg-gray-900 p-24 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {content.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
          {content.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-400">
                    {capability.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                    {capability.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {capability.description}
                </p>
                <ul className="space-y-2">
                  {capability.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingCapabilities;