import { Link } from 'react-router-dom';

const CTA = ({ content }) => {

  // Return loading state if no content
  if (!content) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-white/20 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-white/20 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {content.title || 'Join Us Today'}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed">
            {content.description || ''}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Handle single button string */}
            {content.button && typeof content.button === 'string' && (
              <Link
                to="/contact"
                className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg bg-white text-purple-600 hover:bg-gray-100"
              >
                {content.button}
              </Link>
            )}
            
            {/* Handle buttons array (Research page format) */}
            {Array.isArray(content.buttons) && content.buttons.map((button, index) => (
              <Link
                key={index}
                to={button.href || "/contact"}
                className={`px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg ${
                  button.primary
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'border-2 border-white text-white hover:bg-white hover:text-purple-600'
                }`}
              >
                {button.text}
              </Link>
            ))}
            
            {/* Handle buttons object (Academic page format) */}
            {content.buttons && typeof content.buttons === 'object' && !Array.isArray(content.buttons) && (
              <>
                {content.buttons.joinWaitlist && (
                  <Link
                    to="/contact"
                    className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg bg-white text-purple-600 hover:bg-gray-100"
                  >
                    {content.buttons.joinWaitlist}
                  </Link>
                )}
                {content.buttons.contactUs && (
                  <Link
                    to="/contact"
                    className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg border-2 border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    {content.buttons.contactUs}
                  </Link>
                )}
                {content.buttons.primary && (
                  <Link
                    to={content.buttons.primaryLink || "/contact"}
                    className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg bg-white text-purple-600 hover:bg-gray-100"
                  >
                    {content.buttons.primary}
                  </Link>
                )}
                {content.buttons.secondary && (
                  <Link
                    to={content.buttons.secondaryLink || "/about"}
                    className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg border-2 border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    {content.buttons.secondary}
                  </Link>
                )}
                {content.buttons.register && (
                  <Link
                    to="/register#register"
                    className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg bg-white text-purple-600 hover:bg-gray-100"
                  >
                    {content.buttons.register}
                  </Link>
                )}
                {content.buttons.explore && (
                  <Link
                    to="/academics"
                    className="px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg border-2 border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    {content.buttons.explore}
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(content.features || []).map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {index === 0 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                    {index === 1 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    )}
                    {index === 2 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;