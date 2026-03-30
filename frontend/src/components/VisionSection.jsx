import React from 'react';

const VisionSection = ({ content }) => {
  if (!content) return null;

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {content.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {content.description1}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {content.description2}
            </p>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={content.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"}
              alt={content.imageCaption || "Vision"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent flex items-end p-6">
              <p className="text-white text-lg font-semibold">
                {content.imageCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;