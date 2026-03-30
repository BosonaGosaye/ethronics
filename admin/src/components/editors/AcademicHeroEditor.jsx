import { Plus, Trash2 } from 'lucide-react';
import ImageField from '../ImageField';
import LanguageSwitcher from '../LanguageSwitcher';

export default function AcademicHeroEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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
    const slides = content.slides || [];
    const newSlide = {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: ''
    };
    
    updateField('slides', [...slides, newSlide]);
  };

  const removeSlide = (index) => {
    if (!confirm(`Are you sure you want to delete slide ${index + 1}?`)) return;
    
    const slides = [...(content.slides || [])];
    slides.splice(index, 1);
    updateField('slides', slides);
  };

  const updateSlide = (index, field, value) => {
    const slides = [...(content.slides || [])];
    if (!slides[index]) slides[index] = {};
    slides[index][field] = value;
    updateField('slides', slides);
  };

  const slides = content.slides || [];

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      {/* Slides */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Hero Slides</h3>
          <button
            onClick={addSlide}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
        </div>

        {slides.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No slides yet. Click "Add Slide" to create your first slide.
          </div>
        )}

        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">
                  Slide {index + 1}
                </h4>
                {slides.length > 1 && (
                  <button
                    onClick={() => removeSlide(index)}
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
                    value={slide.image || ''}
                    onChange={(url) => updateSlide(index, 'image', url)}
                  />
                )}

                <div className="bg-gradient-to-r from-green-50 to-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">
                    Title with Gradient Colors
                  </h5>
                  <p className="text-xs text-gray-600 mb-3">
                    Split your title into two parts for beautiful gradient effects. Part 1 will be green-yellow, Part 2 will be purple-blue-red.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title Part 1 (Green-Yellow Gradient)
                      </label>
                      <input
                        type="text"
                        value={typeof slide.title === 'object' ? slide.title.part1 || '' : ''}
                        onChange={(e) => {
                          const currentTitle = typeof slide.title === 'object' ? slide.title : { part1: '', part2: '' };
                          updateSlide(index, 'title', { ...currentTitle, part1: e.target.value });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Pioneering"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title Part 2 (Purple-Blue-Red Gradient)
                      </label>
                      <input
                        type="text"
                        value={typeof slide.title === 'object' ? slide.title.part2 || '' : ''}
                        onChange={(e) => {
                          const currentTitle = typeof slide.title === 'object' ? slide.title : { part1: '', part2: '' };
                          updateSlide(index, 'title', { ...currentTitle, part2: e.target.value });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Academic Excellence"
                      />
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Preview:</p>
                      <div className="text-2xl font-bold">
                        {typeof slide.title === 'object' && slide.title.part1 && (
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                            {slide.title.part1}
                          </span>
                        )}
                        {typeof slide.title === 'object' && slide.title.part1 && slide.title.part2 && ' '}
                        {typeof slide.title === 'object' && slide.title.part2 && (
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-red-400">
                            {slide.title.part2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={slide.subtitle || ''}
                    onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter slide subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={slide.description || ''}
                    onChange={(e) => updateSlide(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter slide description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={slide.buttonText || ''}
                    onChange={(e) => updateSlide(index, 'buttonText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Learn More"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={slide.buttonLink || ''}
                    onChange={(e) => updateSlide(index, 'buttonLink', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., /programs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
