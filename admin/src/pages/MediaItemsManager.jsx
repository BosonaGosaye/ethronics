import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Plus, Search, Filter, Edit, Trash2, Eye, Video, Image as ImageIcon, FileText, Mic, ArrowLeft } from 'lucide-react';

export default function MediaItemsManager() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    published: '',
    featured: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, [filters, currentPage]);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      
      // Only add non-empty filter values
      if (filters.search) params.append('search', filters.search);
      if (filters.type) params.append('type', filters.type);
      if (filters.category) params.append('category', filters.category);
      if (filters.published) params.append('published', filters.published);
      if (filters.featured) params.append('featured', filters.featured);
      params.append('page', currentPage);
      params.append('limit', 20);
      
      const queryString = params.toString();
      const url = `/mediaItems/admin${queryString ? `?${queryString}` : ''}`;
      
      console.log('Fetching media items from:', url);
      
      const response = await axios.get(url);
      
      console.log('Media items response:', response.data);
      
      if (response.data.success) {
        setItems(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
      console.error('Error details:', error.response?.data);
      alert(`Failed to fetch media items: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      console.log('Fetching media stats...');
      const response = await axios.get('/mediaItems/admin/stats');
      
      console.log('Media stats response:', response.data);
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    
    try {
      await axios.delete(`/mediaItems/admin/${id}`);
      
      alert('Media item deleted successfully!');
      fetchItems();
      fetchStats();
    } catch (error) {
      console.error('Failed to delete item:', error);
      console.error('Error details:', error.response?.data);
      alert(`Failed to delete media item: ${error.response?.data?.message || error.message}`);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: Video,
      photo: ImageIcon,
      press: FileText,
      podcast: Mic
    };
    const Icon = icons[type] || ImageIcon;
    return <Icon className="h-5 w-5" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      video: 'bg-red-100 text-red-700',
      photo: 'bg-blue-100 text-blue-700',
      press: 'bg-green-100 text-green-700',
      podcast: 'bg-purple-100 text-purple-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/news-events-dashboard')}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600 mt-1">Manage photos, videos, press releases, and podcasts</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/media-items/new')}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Media</span>
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          {stats.byType.map(stat => (
            <div key={stat._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 capitalize">{stat._id}s</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-xs text-gray-500">{stat.published} published</p>
                </div>
                {getTypeIcon(stat._id)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 font-medium">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="video">Videos</option>
            <option value="photo">Photos</option>
            <option value="press">Press Releases</option>
            <option value="podcast">Podcasts</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="videos">Videos</option>
            <option value="photos">Photos</option>
            <option value="press">Press</option>
            <option value="podcasts">Podcasts</option>
          </select>

          <select
            value={filters.published}
            onChange={(e) => setFilters({ ...filters, published: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>

          <select
            value={filters.featured}
            onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Items</option>
            <option value="true">Featured Only</option>
            <option value="false">Not Featured</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gray-200">
              {(() => {
                // Get the image URL - priority: thumbnailUrl > first mediaUrl > mediaUrl
                const imageUrl = item.thumbnailUrl || 
                                (item.mediaUrls && item.mediaUrls.length > 0 ? item.mediaUrls[0] : null) || 
                                item.mediaUrl;
                
                return imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={item.title?.en || item.title?.am || item.title?.om || 'Media item'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, show icon instead
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null;
              })()}
              
              {/* Fallback icon (hidden by default, shown if image fails) */}
              <div className="w-full h-full flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
                {getTypeIcon(item.type)}
              </div>
              
              {/* Type Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                {item.type}
              </div>
              
              {/* Multiple images indicator */}
              {item.mediaUrls && item.mediaUrls.length > 1 && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  <span>{item.mediaUrls.length}</span>
                </div>
              )}
              
              {/* Duration */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
                  {item.duration}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {item.title.en || item.title.am || item.title.om}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.description?.en || item.description?.am || item.description?.om || 'No description'}
              </p>
              
              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{item.views || 0}</span>
                </div>
                <span>{new Date(item.publishDate).toLocaleDateString()}</span>
              </div>

              {/* Status Badges */}
              <div className="flex items-center space-x-2 mb-3">
                {item.published ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Published</span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Draft</span>
                )}
                {item.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Featured</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate(`/media-items/edit/${item._id}`)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No media items found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first media item</p>
          <button
            onClick={() => navigate('/media-items/new')}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Media</span>
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
