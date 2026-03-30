import React from 'react';

const FacultyResearch = ({ content }) => {
  if (!content) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {content.worldClassTitle}
            </h3>
            <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
              {content.worldClassDescription}
            </p>
            
            {content.facultyMembers && content.facultyMembers.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Faculty Members</h4>
                <div className="space-y-4">
                  {content.facultyMembers.map((member, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h5 className="font-semibold text-gray-900 dark:text-white">{member.name}</h5>
                      <p className="text-sm text-purple-600 dark:text-purple-400">{member.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{member.description}</p>
                      {member.expertise && member.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {member.expertise.map((exp, i) => (
                            <span key={i} className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                              {exp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {content.researchTitle}
            </h3>
            <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
              {content.researchDescription}
            </p>
            
            {content.researchProjects && content.researchProjects.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Research Projects</h4>
                <div className="space-y-4">
                  {content.researchProjects.map((project, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <div className="flex justify-between items-start">
                        <h5 className="font-semibold text-gray-900 dark:text-white">{project.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.status === 'ongoing' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          project.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                          'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
                      {project.lead && (
                        <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">Lead: {project.lead}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={content.researchImage || content.worldClassImage || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80"}
              alt={content.imageCaption || "Faculty Research"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80";
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

export default FacultyResearch;