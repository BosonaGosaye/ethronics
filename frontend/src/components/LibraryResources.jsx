import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Eye, 
  Star, 
  Calendar,
  User,
  ExternalLink,
  Heart,
  Share2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLibraryResources } from '../hooks/useLibraryContent';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LibraryResources = ({ searchQuery, selectedCategory, selectedType, content }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    loading: 'Loading resources...',
    error: 'Error loading resources',
    noResources: 'No resources found',
    viewDetails: 'View Details',
    download: 'Download'
  };
  
  // Use backend content if available, otherwise fallback to translations
  const resourcesContent = content || t.resources;
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [page, setPage] = useState(1);
  
  // Fetch resources from backend
  const { resources: backendResources, loading, error, pagination } = useLibraryResources(language, {
    type: selectedType !== 'all' ? selectedType : undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchQuery || undefined,
    page,
    limit: 20
  });
  
  // Filter resources based on search (client-side filtering for additional refinement)
  const filteredResources = backendResources.filter(resource => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    // Extract title and description based on current language with fallback
    const title = resource.title?.[language] || resource.title?.en || '';
    const description = resource.description?.[language] || resource.description?.en || '';
    
    return (
      title.toLowerCase().includes(searchLower) ||
      resource.author?.toLowerCase().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const handleDownload = async (e, resource) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      // Increment download count
      await axios.post(`${API_URL}/library-resources/public/${resource._id || resource.id}/download`);
      
      // Trigger download with proper filename
      if (resource.fileUrl) {
        const link = document.createElement('a');
        link.href = resource.fileUrl;
        
        // Extract title for filename
        const title = resource.title?.[language] || resource.title?.en || 'resource';
        const fileExtension = resource.fileType || 'pdf';
        const fileName = `${title.replace(/[^a-z0-9]/gi, '_')}.${fileExtension}`;
        
        link.setAttribute('download', fileName);
        link.setAttribute('target', '_blank');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading resource:', error);
      alert('Failed to download resource. Please try again.');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book': return BookOpen;
      case 'paper': return FileText;
      case 'video': return Video;
      case 'dataset': return FileText;
      case 'software': return Download;
      default: return BookOpen;
    }
  };

  const getAccessBadge = (accessType) => {
    const badges = {
      free: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', text: resourcesContent.accessTypes?.free || t.resources.accessTypes.free },
      premium: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', text: resourcesContent.accessTypes?.premium || t.resources.accessTypes.premium },
      openSource: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', text: resourcesContent.accessTypes?.openSource || t.resources.accessTypes.openSource },
      restricted: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', text: resourcesContent.accessTypes?.restricted || 'Restricted' }
    };
    return badges[accessType] || badges.free;
  };

  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading resources...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">Error loading resources: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {resourcesContent.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {resourcesContent.found || t.resources.found} {pagination?.total || filteredResources.length} {resourcesContent.foundResources || t.resources.foundResources}
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' 
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' 
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current h-1 rounded-sm"></div>
                <div className="bg-current h-1 rounded-sm"></div>
                <div className="bg-current h-1 rounded-sm"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Resources Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            const accessBadge = getAccessBadge(resource.accessType);
            
            // Extract multilingual fields based on current language with fallback
            const title = resource.title?.[language] || resource.title?.en || 'Untitled';
            const description = resource.description?.[language] || resource.description?.en || '';
            
            if (viewMode === 'list') {
              return (
                <Link key={resource.id} to={`/library/resource/${resource._id || resource.id}`} className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {resource.coverImage ? (
                        <img 
                          src={resource.coverImage} 
                          alt={title}
                          className="w-16 h-20 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80"%3E%3Crect fill="%23e5e7eb" width="64" height="80"/%3E%3Cpath fill="%239ca3af" d="M32 30l8 8-8 8-8-8z"/%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-20 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <TypeIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {t.resources.by} {resource.author}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                            {description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${accessBadge.color}`}>
                            {accessBadge.text}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            <span>{resource.downloads}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{resource.views}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button 
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" 
                            onClick={(e) => handleDownload(e, resource)}
                          >
                            {resourcesContent.access || t.resources.access}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
            
            return (
              <Link key={resource.id} to={`/library/resource/${resource._id || resource.id}`} className="block bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  {resource.coverImage ? (
                    <img 
                      src={resource.coverImage} 
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center ${resource.coverImage ? 'hidden' : 'flex'}`}
                    style={{ display: resource.coverImage ? 'none' : 'flex' }}
                  >
                    <TypeIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${accessBadge.color}`}>
                      {accessBadge.text}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {resourcesContent.by || t.resources.by} {resource.author}
                  </p>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{resource.views}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button 
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2" 
                      onClick={(e) => handleDownload(e, resource)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {resourcesContent.access || t.resources.access}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More */}
        {filteredResources.length > 0 && pagination && pagination.page < pagination.pages && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setPage(page + 1)}
              className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {resourcesContent.loadMore || t.resources.loadMore}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {resourcesContent.noResults?.title || t.resources.noResults.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {resourcesContent.noResults?.description || t.resources.noResults.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LibraryResources;