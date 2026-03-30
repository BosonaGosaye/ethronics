import { Plus, Trash2 } from 'lucide-react';
import ImageField from '../ImageField';
import LanguageSwitcher from '../LanguageSwitcher';

export default function GalleryEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const updateField = (field, value) => {
    const newContent = { ...content, [field]: value };
    onContentChange(currentLanguage, newContent);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    updateField('items', newItems);
  };

  const updateItemImage = (index, imageIndex, value) => {
    const newItems = [...(content.items || [])];
    const images = Array.isArray(newItems[index].images) ? [...newItems[index].images] : ['', ''];
    images[imageIndex] = value;
    newItems[index] = { ...newItems[index], images };
    updateField('items', newItems);
  };

  const addItem = () => {
    const newItems = [...(content.items || []), { 
      title: '', 
      description: '', 
      images: ['', ''],
      category: 'education'
    }];
    updateField('items', newItems);
  };

  const removeItem = (index) => {
    const newItems = content.items.filter((_, i) => i !== index);
    updateField('items', newItems);
  };

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <textarea
              value={content.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show More Text</label>
              <input
                type="text"
                value={content.showMore || ''}
                onChange={(e) => updateField('showMore', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Less Text</label>
              <input
                type="text"
                value={content.showLess || ''}
                onChange={(e) => updateField('showLess', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education Label</label>
            <input
              type="text"
              value={content.categories?.education || ''}
              onChange={(e) => updateField('categories', { ...content.categories, education: e.target.value })}
              placeholder="Education"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Research Label</label>
            <input
              type="text"
              value={content.categories?.research || ''}
              onChange={(e) => updateField('categories', { ...content.categories, research: e.target.value })}
              placeholder="Research"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Gallery Items</h3>
          <button
            onClick={addItem}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="space-y-4">
          {(content.items || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {currentLanguage === 'en' && (
                  <div className="grid grid-cols-2 gap-3">
                    <ImageField
                      label="Image 1 (Shared across all languages)"
                      value={(item.images && item.images[0]) || ''}
                      onChange={(url) => updateItemImage(index, 0, url)}
                    />
                    <ImageField
                      label="Image 2 (Shared across all languages)"
                      value={(item.images && item.images[1]) || ''}
                      onChange={(url) => updateItemImage(index, 1, url)}
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={item.category || 'education'}
                    onChange={(e) => updateItem(index, 'category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="education">Education</option>
                    <option value="research">Research</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
