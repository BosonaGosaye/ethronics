import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useHomeContent } from '../hooks/useHomeContent';
import DynamicIcon from '../components/DynamicIcon';

const FeatureDetail = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { content, loading, error } = useHomeContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading content: {error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const features = content?.features?.items || [];
  const featureIndex = parseInt(featureId);
  const feature = features[featureIndex];

  if (!feature) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Feature Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The feature you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl">
              <DynamicIcon iconName={feature.icon || 'Lightbulb'} className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">{feature.title}</h1>
              <p className="text-xl text-white/90">{feature.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Feature Image */}
            {feature.image && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Overview */}
            {feature.detailedDescription && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {feature.detailedDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Key Benefits */}
            {feature.benefits && feature.benefits.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
                <div className="space-y-4">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {feature.applications && feature.applications.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feature.applications.map((app, index) => (
                    <div key={index} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{app}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Details */}
            {feature.technicalDetails && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Details</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {feature.technicalDetails}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <div className="space-y-4">
                {feature.category && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category</p>
                    <p className="text-gray-900 dark:text-white font-medium">{feature.category}</p>
                  </div>
                )}
                {feature.status && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      feature.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="/contact"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-semibold"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Related Features */}
            {features.length > 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Features</h3>
                <div className="space-y-3">
                  {features
                    .filter((_, idx) => idx !== featureIndex)
                    .slice(0, 3)
                    .map((relatedFeature, idx) => {
                      const relatedIndex = features.findIndex(f => f === relatedFeature);
                      return (
                        <button
                          key={idx}
                          onClick={() => navigate(`/feature/${relatedIndex}`)}
                          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <DynamicIcon iconName={relatedFeature.icon || 'Lightbulb'} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{relatedFeature.title}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;
