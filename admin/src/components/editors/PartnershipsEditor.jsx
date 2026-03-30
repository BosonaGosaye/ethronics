import { Plus, Trash2 } from 'lucide-react';
import ImageField from '../ImageField';
import IconPicker from '../IconPicker';
import LanguageSwitcher from '../LanguageSwitcher';

export default function PartnershipsEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...(content[arrayName] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    updateField(arrayName, newArray);
  };

  const addArrayItem = (arrayName, template) => {
    const newArray = [...(content[arrayName] || []), template];
    updateField(arrayName, newArray);
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = content[arrayName].filter((_, i) => i !== index);
    updateField(arrayName, newArray);
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
            <input
              type="text"
              value={content.featured || ''}
              onChange={(e) => updateField('featured', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Subtitle</label>
            <input
              type="text"
              value={content.featuredSubtitle || ''}
              onChange={(e) => updateField('featuredSubtitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CTA</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={content.cta?.title || ''}
            onChange={(e) => updateField('cta.title', e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            value={content.cta?.description || ''}
            onChange={(e) => updateField('cta.description', e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={content.cta?.becomePartner || ''}
              onChange={(e) => updateField('cta.becomePartner', e.target.value)}
              placeholder="Become Partner Button"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              value={content.cta?.learnMore || ''}
              onChange={(e) => updateField('cta.learnMore', e.target.value)}
              placeholder="Learn More Button"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Partnership Types</h3>
          <button
            onClick={() => addArrayItem('types', { title: '', description: '', icon: '' })}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Type</span>
          </button>
        </div>

        <div className="space-y-4">
          {(content.types || []).map((type, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Type {index + 1}</span>
                <button
                  onClick={() => removeArrayItem('types', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {currentLanguage === 'en' && (
                  <IconPicker
                    label="Type Icon (Shared across all languages)"
                    value={type.icon || ''}
                    onChange={(iconName) => updateArrayItem('types', index, 'icon', iconName)}
                  />
                )}
                <input
                  type="text"
                  value={type.title || ''}
                  onChange={(e) => updateArrayItem('types', index, 'title', e.target.value)}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={type.description || ''}
                  onChange={(e) => updateArrayItem('types', index, 'description', e.target.value)}
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
          <h3 className="text-lg font-semibold text-gray-900">Key Partnerships</h3>
          <button
            onClick={() => addArrayItem('keyPartnerships', { name: '', description: '', type: '', logo: '' })}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partnership</span>
          </button>
        </div>

        <div className="space-y-4">
          {(content.keyPartnerships || []).map((partnership, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Partnership {index + 1}</span>
                <button
                  onClick={() => removeArrayItem('keyPartnerships', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {currentLanguage === 'en' && (
                  <ImageField
                    label="Partnership Logo (Shared across all languages)"
                    value={partnership.logo || ''}
                    onChange={(url) => updateArrayItem('keyPartnerships', index, 'logo', url)}
                  />
                )}
                <input
                  type="text"
                  value={partnership.name || ''}
                  onChange={(e) => updateArrayItem('keyPartnerships', index, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={partnership.description || ''}
                  onChange={(e) => updateArrayItem('keyPartnerships', index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={partnership.type || ''}
                  onChange={(e) => updateArrayItem('keyPartnerships', index, 'type', e.target.value)}
                  placeholder="Type"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
