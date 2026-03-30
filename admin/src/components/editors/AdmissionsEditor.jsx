import { Plus, Trash2 } from 'lucide-react';
import IconPicker from '../IconPicker';
import LanguageSwitcher from '../LanguageSwitcher';

export default function AdmissionsEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const updateField = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const addStep = () => {
    const newSteps = [...(content.steps || []), {
      title: '',
      description: '',
      icon: 'CheckCircle'
    }];
    updateField('steps', newSteps);
  };

  const removeStep = (index) => {
    const newSteps = content.steps.filter((_, i) => i !== index);
    updateField('steps', newSteps);
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...(content.steps || [])];
    newSteps[index] = { ...newSteps[index], [field]: value };
    updateField('steps', newSteps);
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
            placeholder="Admissions Process"
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
            <h3 className="text-lg font-semibold text-gray-900">Steps</h3>
            <button
              onClick={addStep}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-4">
            {(content.steps || []).map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Step {index + 1}</span>
                  <button
                    onClick={() => removeStep(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {currentLanguage === 'en' && (
                    <IconPicker
                      label="Icon (Shared across all languages)"
                      value={step.icon || ''}
                      onChange={(icon) => updateStep(index, 'icon', icon)}
                    />
                  )}
                  <input
                    type="text"
                    value={step.title || ''}
                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                    placeholder="Step title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <textarea
                    value={step.description || ''}
                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Step description"
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
