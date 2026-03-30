import { Plus, Trash2 } from 'lucide-react';
import IconPicker from '../IconPicker';
import LanguageSwitcher from '../LanguageSwitcher';

export default function WhyChooseUsEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const updateField = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const addFeature = () => {
    const newFeatures = [...(content.features || []), {
      icon: 'Award',
      title: '',
      description: ''
    }];
    updateField('features', newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = content.features.filter((_, i) => i !== index);
    updateField('features', newFeatures);
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...(content.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    updateField('features', newFeatures);
  };

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Why Choose Us?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <textarea
            value={content.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            rows={3}
            placeholder="Subtitle text..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            <button
              onClick={addFeature}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-4">
            {(content.features || []).map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Feature {index + 1}</span>
                  <button
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {currentLanguage === 'en' && (
                    <IconPicker
                      label="Icon (Shared across all languages)"
                      value={feature.icon || ''}
                      onChange={(icon) => updateFeature(index, 'icon', icon)}
                    />
                  )}
                  <input
                    type="text"
                    value={feature.title || ''}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    placeholder="Feature title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <textarea
                    value={feature.description || ''}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Feature description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
