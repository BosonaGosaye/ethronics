import { Plus, Trash2 } from 'lucide-react';
import IconPicker from '../IconPicker';
import LanguageSwitcher from '../LanguageSwitcher';

export default function FeaturesEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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

  const addItem = () => {
    const newItems = [...(content.items || []), { title: '', description: '', icon: '' }];
    updateField('items', newItems);
  };

  const removeItem = (index) => {
    const newItems = content.items.filter((_, i) => i !== index);
    updateField('items', newItems);
  };

  return (
    <div className="space-y-6">
      {/* Language Switcher */}
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
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learn More Text</label>
            <input
              type="text"
              value={content.learnMore || ''}
              onChange={(e) => updateField('learnMore', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Modal Description</label>
            <textarea
              value={content.modalDescription || ''}
              onChange={(e) => updateField('modalDescription', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Feature Items</h3>
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
                  <IconPicker
                    label="Icon (Shared across all languages)"
                    value={item.icon || ''}
                    onChange={(iconName) => updateItem(index, 'icon', iconName)}
                  />
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateItem(index, 'title', e.target.value)}
                    placeholder="Feature title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (for card)</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Brief description shown on card"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                {/* Detail Page Content */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Page Content</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                      <textarea
                        value={item.detailedDescription || ''}
                        onChange={(e) => updateItem(index, 'detailedDescription', e.target.value)}
                        placeholder="Full description for detail page"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
                      <textarea
                        value={(item.benefits || []).join('\n')}
                        onChange={(e) => updateItem(index, 'benefits', e.target.value.split('\n').filter(b => b.trim()))}
                        placeholder="Key benefit 1&#10;Key benefit 2&#10;Key benefit 3"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Applications (one per line)</label>
                      <textarea
                        value={(item.applications || []).join('\n')}
                        onChange={(e) => updateItem(index, 'applications', e.target.value.split('\n').filter(a => a.trim()))}
                        placeholder="Application area 1&#10;Application area 2&#10;Application area 3"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Technical Details</label>
                      <textarea
                        value={item.technicalDetails || ''}
                        onChange={(e) => updateItem(index, 'technicalDetails', e.target.value)}
                        placeholder="Technical specifications and details"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {currentLanguage === 'en' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category (Shared)</label>
                          <input
                            type="text"
                            value={item.category || ''}
                            onChange={(e) => updateItem(index, 'category', e.target.value)}
                            placeholder="e.g., AI & Machine Learning"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status (Shared)</label>
                          <select
                            value={item.status || 'Active'}
                            onChange={(e) => updateItem(index, 'status', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="Active">Active</option>
                            <option value="In Development">In Development</option>
                            <option value="Coming Soon">Coming Soon</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
