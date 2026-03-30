import { Plus, Trash2, Image as ImageIcon, Video, FileText } from 'lucide-react';
import ImageField from '../ImageField';
import LanguageSwitcher from '../LanguageSwitcher';

export default function MediaCenterEditor({ 
  contentByLanguage, 
  currentLanguage, 
  onContentChange,
  onLanguageChange,
  languages 
}) {
  const content = contentByLanguage[currentLanguage] || {};

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, {
      ...content,
      [field]: value
    });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    handleChange('items', items);
  };

  const addItem = () => {
    const items = [...(content.items || [])];
    items.push({
      id: Date.now(),
      title: '',
      type: 'photo',
      category: 'photos',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      description: '',
      mediaUrl: '',
      thumbnailUrl: '',
      duration: ''
    });
    handleChange('items', items);
  };

  const removeItem = (index) => {
    const items = content.items.filter((_, i) => i !== index);
    handleChange('items', items);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'photo':
        return <ImageIcon className="w-5 h-5" />;
      case 'press':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Switcher */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <LanguageSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          languages={languages}
        />
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Media Center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={content.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Access our collection of photos, videos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Placeholder
            </label>
            <input
              type="text"
              value={content.searchPlaceholder || ''}
              onChange={(e) => handleChange('searchPlaceholder', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search media..."
            />
          </div>
        </div>
      </div>

      {/* Media Items */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Media Items</h3>
          <button
            onClick={addItem}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Media Item</span>
          </button>
        </div>

        {(!content.items || content.items.length === 0) ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No media items yet</p>
            <p className="text-sm text-gray-500">Click "Add Media Item" to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            {content.items.map((item, index) => (
              <div key={item.id || index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(item.type)}
                    <h4 className="font-semibold text-gray-900">Media Item {index + 1}</h4>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Media title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={item.type || 'photo'}
                      onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="photo">Photo</option>
                      <option value="video">Video</option>
                      <option value="press">Press Release</option>
                      <option value="podcast">Podcast</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={item.category || 'photos'}
                      onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="photos">Photos</option>
                      <option value="videos">Videos</option>
                      <option value="press">Press Releases</option>
                      <option value="podcasts">Podcasts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={item.date || ''}
                      onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {item.type === 'video' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (e.g., 5:32)
                      </label>
                      <input
                        type="text"
                        value={item.duration || ''}
                        onChange={(e) => handleItemChange(index, 'duration', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5:32"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description"
                    />
                  </div>

                  {/* Only show media upload for English */}
                  {currentLanguage === 'en' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {item.type === 'video' ? 'Video URL' : item.type === 'photo' ? 'Image URL' : 'File URL'}
                        </label>
                        <ImageField
                          value={item.mediaUrl || ''}
                          onChange={(url) => handleItemChange(index, 'mediaUrl', url)}
                          label=""
                        />
                        {item.mediaUrl && (
                          <div className="mt-2">
                            {item.type === 'photo' ? (
                              <img
                                src={item.mediaUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ) : item.type === 'video' ? (
                              <div className="relative w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                                <Video className="w-12 h-12 text-white" />
                                <p className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                                  {item.duration || 'Video'}
                                </p>
                              </div>
                            ) : (
                              <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-2">
                                <FileText className="w-6 h-6 text-gray-600" />
                                <span className="text-sm text-gray-700">File attached</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {item.type === 'video' && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail Image (Optional)
                          </label>
                          <ImageField
                            value={item.thumbnailUrl || ''}
                            onChange={(url) => handleItemChange(index, 'thumbnailUrl', url)}
                            label=""
                          />
                          {item.thumbnailUrl && (
                            <img
                              src={item.thumbnailUrl}
                              alt={`${item.title} thumbnail`}
                              className="mt-2 w-full h-32 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Press Kit Section (Only for English) */}
      {currentLanguage === 'en' && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Press Kit & Brand Assets</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Press Kit Title
              </label>
              <input
                type="text"
                value={content.pressKit?.title || ''}
                onChange={(e) => handleChange('pressKit', { ...content.pressKit, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Press Kit & Brand Assets"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Press Kit Description
              </label>
              <textarea
                value={content.pressKit?.description || ''}
                onChange={(e) => handleChange('pressKit', { ...content.pressKit, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Download our official logos..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Press Kit Download URL
              </label>
              <ImageField
                value={content.pressKit?.downloadUrl || ''}
                onChange={(url) => handleChange('pressKit', { ...content.pressKit, downloadUrl: url })}
                label=""
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Guidelines URL
              </label>
              <input
                type="url"
                value={content.pressKit?.guidelinesUrl || ''}
                onChange={(e) => handleChange('pressKit', { ...content.pressKit, guidelinesUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
