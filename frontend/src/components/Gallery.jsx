import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Default fallback images - empty to avoid CORS
const defaultImages = [
  '',
  ''
];

const Gallery = ({ content }) => {
  const { language } = useLanguage();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [mobileOffset, setMobileOffset] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Return loading state if no content
  if (!content) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Gallery data from backend - use backend images with fallback
  const galleryData = (content.items || []).map((item, index) => ({
    title: item.title || '',
    description: item.description || '',
    images: (item.images && item.images.length > 0 && item.images.some(img => img)) 
      ? item.images.map((img, idx) => img || defaultImages[idx % defaultImages.length])
      : defaultImages,
    category: item.category || (content.categories?.education || 'Education')
  }));

  const cardWidth = 320;
  const visibleCards = Math.floor(window.innerWidth / cardWidth) || 1;

  const handlePrevMobile = () => {
    setMobileOffset(prev => Math.min(prev + cardWidth, 0));
  };

  const handleNextMobile = () => {
    const maxOffset = -(galleryData.length - visibleCards) * cardWidth;
    setMobileOffset(prev => Math.max(prev - cardWidth, maxOffset));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title || 'Our Journey in Pictures'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle || ''}
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedGallery(item)}
            >
              <div className="relative grid grid-cols-2 gap-1 p-2 h-64 overflow-hidden group">
                {item.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="relative">
                    <img
                      src={image}
                      alt={`${item.title} - ${imageIndex + 1}`}
                      className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = defaultImages[imageIndex % defaultImages.length];
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                      <p className="text-xs text-white text-center line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
                <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <button
            onClick={handlePrevMobile}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 disabled:opacity-50"
            disabled={mobileOffset === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="overflow-x-hidden">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${mobileOffset}px)` }}
            >
              {galleryData.map((item, index) => (
                <div
                  key={index}
                  className="w-80 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
                  onClick={() => setSelectedGallery(item)}
                >
                  <div className="grid grid-cols-2 gap-1 p-2 h-56 overflow-hidden hover:text-underline">
                    {item.images.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={image}
                        alt={`${item.title} - ${imageIndex + 1}`}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = defaultImages[imageIndex % defaultImages.length];
                        }}
                      />
                    ))}
                  </div>
                  <div className="p-4 relative">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.description}
                    </p>
                    <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextMobile}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 disabled:opacity-50"
            disabled={mobileOffset <= -(galleryData.length - visibleCards) * cardWidth}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedGallery && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGallery(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setSelectedGallery(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedGallery.title}
            </h3>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {selectedGallery.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedGallery.title} - ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = defaultImages[index % defaultImages.length];
                  }}
                />
              ))}
            </div>
            
            <div className="mb-4">
              <p className={`text-gray-600 dark:text-gray-300 transition-all duration-300 ${
                showFullDescription ? "max-h-none" : "max-h-20 overflow-hidden"
              }`}>
                {selectedGallery.description}
              </p>
              {selectedGallery.description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium text-right float-right"
                >
                  {showFullDescription ? (content.showLess || 'Show Less') : (content.showMore || 'Show More')}
                </button>
              )}
            </div>
            
            <span className="inline-block bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full">
              {selectedGallery.category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;