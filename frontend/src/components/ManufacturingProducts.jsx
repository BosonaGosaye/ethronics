import { useState, useEffect } from 'react';
import { CheckCircle, X, Calendar, Users, Zap, Shield } from 'lucide-react';

const ProgressBar = ({ targetProgress, isVisible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Small delay before starting animation
      const timer = setTimeout(() => {
        setProgress(targetProgress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Reset when not visible
      setProgress(0);
    }
  }, [isVisible, targetProgress]);

  return (
    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const ManufacturingProducts = ({ content }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!content) return null;

  const products = content.productsList || [];
  
  // Filter only published products
  const publishedProducts = products.filter(p => p.isPublished !== false);

  return (
    <>
      <section className="py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {content.title}
          </h2>
          <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
            {content.subtitle}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No products available at the moment.</p>
              </div>
            ) : publishedProducts.map((product, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&auto=format&fit=crop&q=60'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {product.name}
                  </h3>
                  {product.progress !== undefined && product.progress < 100 ? (
                    <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-200">
                          {content.inDevelopment || 'In Development'}
                        </span>
                        <span className="text-sm font-bold text-white bg-purple-600 px-2 py-1 rounded">
                          {product.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        targetProgress={product.progress}
                        isVisible={hoveredIndex === index}
                      />
                      <p className="text-xs text-gray-300 text-center mt-2">
                        {content.clickForDetails || 'Click for details'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-400 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-200 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <p className="text-xs text-gray-300 text-center">
                        {content.clickForDetails || 'Click for details'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-200">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&auto=format&fit=crop&q=60'
                }}
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 text-gray-900 dark:text-white p-2 rounded-full hover:bg-white dark:hover:bg-black/70 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/70 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm">
                {selectedProduct.status}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">{selectedProduct.expectedLaunch}</span>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {selectedProduct.detailedDescription}
              </p>

              {/* Progress Bar for Development Status */}
              {selectedProduct.progress && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {content.developmentProgress || 'Development Progress'}
                    </span>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {selectedProduct.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedProduct.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      {content.keyFeatures || 'Key Features'}
                    </h3>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      {content.applications || 'Applications'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.applications.map((app, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Specifications */}
              {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    {content.technicalSpecs || 'Technical Specifications'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="/contact"
                  className="flex-1 bg-purple-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Request More Information
                </a>
                <a
                  href="/contact"
                  className="flex-1 border-2 border-purple-600 text-purple-600 dark:text-purple-400 text-center py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  Schedule Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManufacturingProducts;