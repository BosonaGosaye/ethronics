import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, Image as ImageIcon, Video, FileText, Mic } from 'lucide-react';
import MediaUploader from '../components/MediaUploader';
import MultipleMediaUploader from '../components/MultipleMediaUploader';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'am', name: 'አማርኛ' },
  { code: 'om', name: 'Afaan Oromoo' }
];

export default function MediaItemEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const [formData, setFormData] = useState({
    title: { en: '', am: '', om: '' },
    description: { en: '', am: '', om: '' },
    type: 'photo',
    category: 'photos',
    mediaUrl: '',
    mediaUrls: [],
    thumbnailUrl: '',
    duration: '',
    publishDate: new Date().toISOString().split('T')[0],
    published: false,
    featured: false,
    tags: [],
    metadata: {
      fileSize: '',
      format: '',
      resolution: ''
    }
  });

  useEffect(() => {
    if (!isNew) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/mediaItems/admin/${id}`);
      
      if (response.data.success) {
        const item = response.data.data;
        setFormData({
          title: item.title || { en: '', am: '', om: '' },
          description: item.description || { en: '', am: '', om: '' },
          type: item.type,
          category: item.category,
          mediaUrl: item.mediaUrl || '',
          mediaUrls: item.mediaUrls || [],
          thumbnailUrl: item.thumbnailUrl || '',
          duration: item.duration || '',
          publishDate: item.publishDate ? new Date(item.publishDate).toISOString().split('T')[0] : '',
          published: item.published,
          featured: item.featured,
          tags: item.tags || [],
          metadata: item.metadata || { fileSize: '', format: '', resolution: '' }
        });
      }
    } catch (error) {
      console.error('Failed to fetch item:', error);
      alert('Failed to load media item');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.en) {
      alert('Please provide at least an English title');
      return;
    }
    
    // Validate media based on type
    if (formData.type === 'photo') {
      if (!formData.mediaUrls || formData.mediaUrls.length === 0) {
        alert('Please upload at least one photo');
        return;
      }
    } else {
      if (!formData.mediaUrl) {
        alert('Please upload a media file');
        return;
      }
    }

    try {
      setSaving(true);
      const endpoint = isNew ? '/mediaItems/admin' : `/mediaItems/admin/${id}`;
      const method = isNew ? 'post' : 'put';
      
      // Prepare data based on type
      const submitData = { ...formData };
      if (formData.type === 'photo' && formData.mediaUrls.length > 0) {
        // For photos, use the first URL as mediaUrl for backward compatibility
        submitData.mediaUrl = formData.mediaUrls[0];
      }
      
      const response = await axios[method](endpoint, submitData);
      
      if (response.data.success) {
        alert(`Media item ${isNew ? 'created' : 'updated'} successfully!`);
        navigate('/media-items');
      }
    } catch (error) {
      console.error('Failed to save item:', error);
      alert('Failed to save media item');
    } finally {
      setSaving(false);
    }
  };

  const handleMediaUpload = (url, type = 'media') => {
    if (type === 'media') {
      setFormData({ ...formData, mediaUrl: url });
    } else {
      setFormData({ ...formData, thumbnailUrl: url });
    }
  };

  const handleMultipleMediaUpload = (urls) => {
    setFormData({ ...formData, mediaUrls: urls });
  };

  const handleTypeChange = (type) => {
    const categoryMap = {
      video: 'videos',
      photo: 'photos',
      press: 'press',
      podcast: 'podcasts'
    };
    setFormData({
      ...formData,
      type,
      category: categoryMap[type]
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'photo':
        return <ImageIcon className="h-5 w-5" />;
      case 'press':
        return <FileText className="h-5 w-5" />;
      case 'podcast':
        return <Mic className="h-5 w-5" />;
      default:
        return <ImageIcon className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/media-items')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Add Media Item' : 'Edit Media Item'}
          </h1>
          <p className="text-gray-600 mt-1">Upload and manage media content</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Media Type Selection */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Media Type</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'photo', label: 'Photos', icon: <ImageIcon className="h-6 w-6" /> },
              { value: 'video', label: 'Video', icon: <Video className="h-6 w-6" /> },
              { value: 'press', label: 'Press Release', icon: <FileText className="h-6 w-6" /> },
              { value: 'podcast', label: 'Podcast', icon: <Mic className="h-6 w-6" /> }
            ].map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleTypeChange(type.value)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  formData.type === type.value
                    ? 'border-purple-600 bg-purple-50 text-purple-600'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                {type.icon}
                <span className="mt-2 text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Media Upload - Shared across all languages */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Media Files</h2>
            <span className="text-sm text-gray-500">Shared across all languages</span>
          </div>
          
          {formData.type === 'photo' ? (
            <div>
              <MultipleMediaUploader
                onUploadComplete={handleMultipleMediaUpload}
                currentUrls={formData.mediaUrls}
                accept="image/*"
                maxFiles={20}
                label="Upload Photos (Multiple files supported)"
              />
              <p className="mt-2 text-sm text-gray-600">
                Upload multiple photos for a gallery. The first photo will be used as the main image.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Media File *
              </label>
              <MediaUploader
                onUploadComplete={(data) => handleMediaUpload(data.url, 'media')}
                currentUrl={formData.mediaUrl}
                accept={
                  formData.type === 'video' ? 'video/*' : 
                  formData.type === 'podcast' ? 'audio/*' : 
                  '*'
                }
              />
              {formData.mediaUrl && (
                <p className="mt-2 text-sm text-green-600">✓ Media file uploaded</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image (optional)
            </label>
            <MediaUploader
              onUploadComplete={(data) => handleMediaUpload(data.url, 'thumbnail')}
              currentUrl={formData.thumbnailUrl}
              accept="image/*"
            />
            <p className="mt-1 text-xs text-gray-500">
              Recommended for videos and podcasts. For photos, the first image is used as thumbnail.
            </p>
          </div>

          {(formData.type === 'video' || formData.type === 'podcast') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 5:32 or 45:20"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edit Text Content (Language-specific)
          </label>
          <div className="flex space-x-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLanguage === lang.code
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Translate title and description for each language. Media files are shared.
          </p>
        </div>

        {/* Multilingual Text Content */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Text Content ({LANGUAGES.find(l => l.code === selectedLanguage)?.name})
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title[selectedLanguage]}
              onChange={(e) => setFormData({
                ...formData,
                title: { ...formData.title, [selectedLanguage]: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required={selectedLanguage === 'en'}
              placeholder={`Enter title in ${LANGUAGES.find(l => l.code === selectedLanguage)?.name}`}
            />
            {selectedLanguage === 'en' && (
              <p className="mt-1 text-xs text-gray-500">English title is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description[selectedLanguage]}
              onChange={(e) => setFormData({
                ...formData,
                description: { ...formData.description, [selectedLanguage]: e.target.value }
              })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={`Enter description in ${LANGUAGES.find(l => l.code === selectedLanguage)?.name}`}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publish Date
            </label>
            <input
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              })}
              placeholder="Technology, Innovation, Research"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Publication Status</h2>
          
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Published</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/media-items')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? 'Saving...' : 'Save Media Item'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
