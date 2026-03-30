import React from 'react';
import { Users, Brain, Award } from 'lucide-react';

const communityFeatures = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Student Network",
    description: "Connect with peers from diverse backgrounds and build lifelong professional relationships."
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Research Community",
    description: "Collaborate on groundbreaking research projects with faculty and industry partners."
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Alumni Success",
    description: "Join a growing network of successful graduates making impact in Ethiopia and globally."
  }
];

const CommunitySection = () => (
  <section className="py-20 bg-white dark:bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Join Our Community
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
        Connect with like-minded innovators, researchers, and industry leaders who are shaping Ethiopia's technological future.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {communityFeatures.map((feature, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-6 mx-auto text-purple-600 dark:text-purple-400">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;