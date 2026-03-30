import { Plus, Trash2 } from 'lucide-react';
import ImageField from '../ImageField';
import LanguageSwitcher from '../LanguageSwitcher';

export default function SolutionsEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const updateField = (path, value) => {
    const newContent = { ...content };
    const keys = path.split('.');
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onContentChange(currentLanguage, newContent);
  };

  const addSolutionItem = () => {
    const itemName = prompt('Enter solution item key (e.g., "newService", "customProgram"):');
    if (!itemName) return;
    
    const key = itemName.replace(/[^a-zA-Z0-9]/g, '').replace(/^./, str => str.toLowerCase());
    
    if (!key) {
      alert('Invalid item name');
      return;
    }

    const newItems = { ...content.items };
    newItems[key] = { title: '', description: '', action: '', image: '' };
    updateField('items', newItems);
  };

  const removeSolutionItem = (key) => {
    if (!confirm(`Are you sure you want to delete "${key}"?`)) return;
    
    const newItems = { ...content.items };
    delete newItems[key];
    updateField('items', newItems);
  };

  const solutionItems = content.items || {};
  const itemKeys = Object.keys(solutionItems);

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Suffix</label>
            <input
              type="text"
              value={content.titleSuffix || ''}
              onChange={(e) => updateField('titleSuffix', e.target.value)}
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
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-4">
          {['education', 'research', 'manufacturing'].map((cat) => (
            <div key={cat} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 capitalize">{cat}</h4>
              <div className="space-y-3">
                {currentLanguage === 'en' && (
                  <ImageField
                    label="Category Icon/Image (Shared across all languages)"
                    value={content.categories?.[cat]?.icon || ''}
                    onChange={(url) => updateField(`categories.${cat}.icon`, url)}
                  />
                )}
                <input
                  type="text"
                  value={content.categories?.[cat]?.title || ''}
                  onChange={(e) => updateField(`categories.${cat}.title`, e.target.value)}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={content.categories?.[cat]?.description || ''}
                  onChange={(e) => updateField(`categories.${cat}.description`, e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Solution Items</h3>
          <button
            onClick={addSolutionItem}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itemKeys.map((key) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 text-sm">{key}</h4>
                <button
                  onClick={() => removeSolutionItem(key)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {currentLanguage === 'en' && (
                  <ImageField
                    label="Item Image (Shared across all languages)"
                    value={solutionItems[key]?.image || ''}
                    onChange={(url) => updateField(`items.${key}.image`, url)}
                  />
                )}
                <input
                  type="text"
                  value={solutionItems[key]?.title || ''}
                  onChange={(e) => updateField(`items.${key}.title`, e.target.value)}
                  placeholder="Title"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={solutionItems[key]?.description || ''}
                  onChange={(e) => updateField(`items.${key}.description`, e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={solutionItems[key]?.action || ''}
                  onChange={(e) => updateField(`items.${key}.action`, e.target.value)}
                  placeholder="Action Text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
