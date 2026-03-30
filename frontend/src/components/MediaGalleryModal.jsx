import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Eye, Calendar } from 'lucide-react';

const MediaGalleryModal = ({ item, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Increment view count when modal opens
  useEffect(() => {
    if (isOpen && item && item.id) {
      const incrementViews = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
          await fetch(`${apiUrl}/mediaItems/public/${item.id}/view`, {
            method: 'POST'
          });
        } catch (error) {
          console.error('Failed to increment views:', error);
        }
      };
      
      incrementViews();
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  // Get all images - use mediaUrls if available, otherwise single mediaUrl
  const allImages = item.mediaUrls && item.mediaUrls.length > 0 
    ? item.mediaUrls 
    : item.mediaUrl 
    ? [item.mediaUrl] 
    : [];

  const hasMultipleImages = allImages.length > 1;

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Image Display Area */}
          <div className="relative flex-1 bg-black flex items-center justify-center p-4">
            {allImages.length > 0 ? (
              <>
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                />

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-70 text-white text-sm rounded-full">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-white text-center">
                <p>No images available</p>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="w-full md:w-96 bg-white dark:bg-gray-800 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {item.title}
            </h2>

            {item.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {item.description}
              </p>
            )}

            {/* Metadata */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(item.date)}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Eye className="h-4 w-4 mr-2" />
                <span>{item.views} views</span>
              </div>

              {item.duration && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Duration:</span> {item.duration}
                </div>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Thumbnail Grid for Multiple Images */}
            {hasMultipleImages && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  All Images ({allImages.length})
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-purple-600 ring-2 ring-purple-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={allImages[currentImageIndex]}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGalleryModal;
