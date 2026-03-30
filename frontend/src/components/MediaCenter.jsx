import { useState, useEffect } from 'react';
import { 
  Play, 
  Download, 
  Image, 
  FileText, 
  Video, 
  Mic,
  Eye,
  Calendar,
  Search
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import MediaGalleryModal from './MediaGalleryModal';

const MediaCenter = ({ content, mediaItems = [] }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content || {
    title: 'Media Center',
    description: 'Browse our media gallery',
    viewAll: 'View All',
    categories: []
  };
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaStats, setMediaStats] = useState({
    totalPhotos: 0,
    totalVideos: 0,
    totalPress: 0,
    totalPodcasts: 0
  });

  // Fetch media statistics from backend
  useEffect(() => {
    const fetchMediaStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const url = `${apiUrl}/mediaItems/public?language=${language}`;
        
        console.log('Fetching media stats from:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Media stats response:', data);
        
        if (data.success) {
          const items = data.data;
          const stats = {
            totalPhotos: items.filter(item => item.type === 'photo').length,
            totalVideos: items.filter(item => item.type === 'video').length,
            totalPress: items.filter(item => item.type === 'press').length,
            totalPodcasts: items.filter(item => item.type === 'podcast').length
          };
          console.log('Media stats calculated:', stats);
          setMediaStats(stats);
        }
      } catch (error) {
        console.error('Error fetching media stats:', error);
      }
    };
    
    fetchMediaStats();
  }, [language]);

  const categoryIcons = {
    all: Image,
    photos: Image,
    videos: Video,
    press: FileText,
    podcasts: Mic
  };

  const categories = t.categories.map((label, index) => ({
    id: ['all', 'photos', 'videos', 'press', 'podcasts'][index],
    label,
    icon: Object.values(categoryIcons)[index]
  }));

  // Filter media items
  const filteredMedia = mediaItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'photo': return Image;
      case 'press': return FileText;
      case 'podcast': return Mic;
      default: return Image;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      video: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      photo: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      press: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      podcast: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[type] || colors.photo;
  };

  const getTypeLabel = (type) => {
    const labels = {
      video: t.types[0],
      photo: t.types[1],
      press: t.types[2],
      podcast: t.types[3]
    };
    return labels[type] || labels.photo;
  };

  const handleViewMedia = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex-1 relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.noMedia || 'No Media Available'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.noMediaDescription || 'Media content will be available soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMedia.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            // Get the main media URL - for photos with multiple images, use first one
            const mainMediaUrl = item.mediaUrl || (item.mediaUrls && item.mediaUrls[0]) || item.thumbnailUrl;
            const hasMultiplePhotos = item.type === 'photo' && item.mediaUrls && item.mediaUrls.length > 1;
            
            return (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  {/* Display image for photos or thumbnail */}
                  {(item.type === 'photo' || item.thumbnailUrl) && mainMediaUrl && (
                    <img 
                      src={mainMediaUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  
                  {/* Play button for videos/podcasts */}
                  {(item.type === 'video' || item.type === 'podcast') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <button className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </button>
                    </div>
                  )}
                  
                  {/* Type badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  
                  {/* Multiple photos indicator */}
                  {hasMultiplePhotos && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center gap-1">
                      <Image className="h-3 w-3" />
                      <span>{item.mediaUrls.length}</span>
                    </div>
                  )}
                  
                  {/* Duration for videos/podcasts */}
                  {item.duration && !hasMultiplePhotos && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {item.duration}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    <TypeIcon className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views} {t.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewMedia(item)}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      {t.viewButton}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Press Kit Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t.pressKit.title}
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            {t.pressKit.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2 justify-center">
              <Download className="h-5 w-5" />
              {t.pressKit.downloadButton}
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-semibold">
              {t.pressKit.guidelinesButton}
            </button>
          </div>
        </div>

        {/* Media Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {mediaStats.totalPhotos}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t.stats[0]?.label || 'Photos'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {mediaStats.totalVideos}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t.stats[1]?.label || 'Videos'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {mediaStats.totalPress}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t.stats[2]?.label || 'Press Releases'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {mediaStats.totalPodcasts}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t.stats[3]?.label || 'Podcasts'}
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery Modal */}
      <MediaGalleryModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default MediaCenter;