import { Plus, Trash2 } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

export default function CapabilitiesEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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

  const updateItemDetail = (itemIndex, detailIndex, value) => {
    const newItems = [...(content.items || [])];
    const newDetails = [...(newItems[itemIndex].details || [])];
    newDetails[detailIndex] = value;
    newItems[itemIndex] = { ...newItems[itemIndex], details: newDetails };
    updateField('items', newItems);
  };

  const addItem = () => {
    const newItems = [...(content.items || []), { 
      title: '', 
      description: '', 
      details: [] 
    }];
    updateField('items', newItems);
  };

  const removeItem = (index) => {
    if (!confirm('Are you sure you want to delete this capability?')) return;
    const newItems = content.items.filter((_, i) => i !== index);
    updateField('items', newItems);
  };

  const addDetail = (itemIndex) => {
    const newItems = [...(content.items || [])];
    const newDetails = [...(newItems[itemIndex].details || []), ''];
    newItems[itemIndex] = { ...newItems[itemIndex], details: newDetails };
    updateField('items', newItems);
  };

  const removeDetail = (itemIndex, detailIndex) => {
    const newItems = [...(content.items || [])];
    const newDetails = newItems[itemIndex].details.filter((_, i) => i !== detailIndex);
    newItems[itemIndex] = { ...newItems[itemIndex], details: newDetails };
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

      {/* General Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Why Choose Our Manufacturing?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <textarea
              value={content.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Our manufacturing facility combines..."
            />
          </div>
        </div>
      </div>

      {/* Capabilities Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Capabilities ({(content.items || []).length})</h3>
          <button
            onClick={addItem}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Capability</span>
          </button>
        </div>

        <div className="space-y-6">
          {(content.items || []).map((item, itemIndex) => (
            <div key={itemIndex} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Capability {itemIndex + 1}</h4>
                <button
                  onClick={() => removeItem(itemIndex)}
                  className="text-red-600 hover:text-red-700"
                  title="Delete capability"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateItem(itemIndex, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Local Innovation"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateItem(itemIndex, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Developing solutions tailored for Ethiopian markets"
                  />
                </div>

                {/* Details List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Details ({(item.details || []).length} items)
                    </label>
                    <button
                      onClick={() => addDetail(itemIndex)}
                      className="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Detail</span>
                    </button>
                  </div>

                  <div className="space-y-2 pl-4 border-l-2 border-indigo-200">
                    {(item.details || []).map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <span className="text-indigo-600 mt-2">•</span>
                        <input
                          type="text"
                          value={detail || ''}
                          onChange={(e) => updateItemDetail(itemIndex, detailIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="Ethiopian-designed automation systems"
                        />
                        <button
                          onClick={() => removeDetail(itemIndex, detailIndex)}
                          className="text-red-600 hover:text-red-700 mt-2"
                          title="Remove detail"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {(item.details || []).length === 0 && (
                      <p className="text-sm text-gray-500 italic">No details added yet. Click "Add Detail" to add one.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(content.items || []).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No capabilities added yet.</p>
              <button
                onClick={addItem}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Capability</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
