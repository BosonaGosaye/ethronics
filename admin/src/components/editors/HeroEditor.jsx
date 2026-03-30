import { Plus, Trash2, Globe } from 'lucide-react';
import ImageField from '../ImageField';

export default function HeroEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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

  const addSlide = () => {
    const slideNumbers = Object.keys(content)
      .filter(key => key.startsWith('slide'))
      .map(key => parseInt(key.replace('slide', '')))
      .sort((a, b) => a - b);
    
    const nextNumber = slideNumbers.length > 0 ? Math.max(...slideNumbers) + 1 : 1;
    const newSlideKey = `slide${nextNumber}`;
    
    updateField(newSlideKey, {
      line1: '',
      line2: '',
      line3: '',
      description: '',
      image: ''
    });
  };

  const removeSlide = (slideKey) => {
    if (!confirm(`Are you sure you want to delete ${slideKey}?`)) return;
    
    const newContent = { ...content };
    delete newContent[slideKey];
    onContentChange(currentLanguage, newContent);
  };

  const getSlides = () => {
    return Object.keys(content)
      .filter(key => key.tsWith('slide'))
      .sort((a, b) => {
        const numA = parseInt(a.replace('slide', ''));
        const numB = parseInt(b.replace('slide', ''));
        return numA - numB;
      });
  };

  return (
    <div className="space-y-6">
      {/* Language Switcher */}
      <div className="bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              Select language to edit translations:
            </span>
          </div>
          <div className="flex space-x-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentLanguage === lang.code
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 ml-8">
          Note: Images are shared across all languages. Edit them once and they'll apply to all translations.
        </p>
      </div>

      {/* Badge */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Badge</h3>
        <input
          type="text"
          value={content.badge || ''}
          onChange={(e) => updateField('badge', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="New Collection"
        />
      </div>

      {/* Slides */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Slides</h3>
          <button
            onClick={addSlide}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="space-y-6">
          {getSlides().map((slideKey) => (
            <div key={slideKey} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 capitalize">
                  {slideKey.replace('slide', 'Slide ')}
                </h4>
                {getSlides().length > 1 && (
                  <button
                    onClick={() => removeSlide(slideKey)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {currentLanguage === 'en' && (
                  <ImageField
                    label="Slide Background Image (Shared across all languages)"
                    value={content[slideKey]?.image || ''}
                    onChange={(url) => updateField(`${slideKey}.image`, url)}
                  />
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 1</label>
                  <input
                    type="text"
                    value={content[slideKey]?.line1 || ''}
                    onChange={(e) => updateField(`${slideKey}.line1`, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 2</label>
                  <input
                    type="text"
                    value={content[slideKey]?.line2 || ''}
                    onChange={(e) => updateField(`${slideKey}.line2`, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 3</label>
                  <input
                    type="text"
                    value={content[slideKey]?.line3 || ''}
                    onChange={(e) => updateField(`${slideKey}.line3`, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={content[slideKey]?.description || ''}
                    onChange={(e) => updateField(`${slideKey}.description`, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Buttons</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Summer Training</label>
            <input
              type="text"
              value={content.buttons?.summerTraining || ''}
              onChange={(e) => updateField('buttons.summerTraining', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Explore Programs</label>
            <input
              type="text"
              value={content.buttons?.explorePrograms || ''}
              onChange={(e) => updateField('buttons.explorePrograms', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">View Research</label>
            <input
              type="text"
              value={content.buttons?.viewResearch || ''}
              onChange={(e) => updateField('buttons.viewResearch', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Floating Promo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Floating Promo</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={content.floatingPromo?.title || ''}
              onChange={(e) => updateField('floatingPromo.title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={content.floatingPromo?.description || ''}
              onChange={(e) => updateField('floatingPromo.description', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
            <input
              type="text"
              value={content.floatingPromo?.button || ''}
              onChange={(e) => updateField('floatingPromo.button', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
