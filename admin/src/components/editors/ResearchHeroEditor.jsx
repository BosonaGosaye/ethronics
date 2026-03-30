import { Plus, Trash2, Globe } from 'lucide-react';
import MediaUploader from '../MediaUploader';

export default function ResearchHeroEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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

  // Sync image to all languages
  const syncImageToAllLanguages = (slideIndex, imageUrl) => {
    languages.forEach(lang => {
      const langContent = contentByLanguage[lang.code] || {};
      const slides = langContent.slides || [];
      if (slides[slideIndex]) {
        slides[slideIndex] = { ...slides[slideIndex], image: imageUrl };
        onContentChange(lang.code, { ...langContent, slides });
      }
    });
  };

  const addSlide = () => {
    const slides = content.slides || [];
    const newSlide = {
      title: '',
      description: '',
      image: ''
    };
    updateField('slides', [...slides, newSlide]);
  };

  const removeSlide = (index) => {
    if (!confirm(`Are you sure you want to delete slide ${index + 1}?`)) return;
    
    const slides = content.slides || [];
    const newSlides = slides.filter((_, i) => i !== index);
    updateField('slides', newSlides);
  };

  const updateSlide = (index, field, value) => {
    const slides = content.slides || [];
    const newSlides = [...slides];
    if (!newSlides[index]) newSlides[index] = {};
    newSlides[index] = { ...newSlides[index], [field]: value };
    updateField('slides', newSlides);
  };

  const addButton = () => {
    const buttons = content.buttons || [];
    const newButton = {
      text: '',
      href: '/contact',
      primary: false
    };
    updateField('buttons', [...buttons, newButton]);
  };

  const removeButton = (index) => {
    if (!confirm(`Are you sure you want to delete button ${index + 1}?`)) return;
    
    const buttons = content.buttons || [];
    const newButtons = buttons.filter((_, i) => i !== index);
    updateField('buttons', newButtons);
  };

  const updateButton = (index, field, value) => {
    const buttons = content.buttons || [];
    const newButtons = [...buttons];
    if (!newButtons[index]) newButtons[index] = {};
    newButtons[index] = { ...newButtons[index], [field]: value };
    updateField('buttons', newButtons);
  };

  const slides = content.slides || [];
  const buttons = content.buttons || [];

  return (
    <div className="space-y-6">
      {/* Language Switcher */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
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
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
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
          Note: Images are shared across all languages. Upload once and they'll apply to all translations automatically.
        </p>
      </div>

      {/* Slides */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Hero Slides</h3>
          <button
            onClick={addSlide}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
        </div>

        {slides.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No slides yet. Click "Add Slide" to create one.
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
                {/* Image Upload - Only show for English */}
                {currentLanguage === 'en' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slide Background Image (Shared across all languages)
                    </label>
                    <MediaUploader
                      type="image"
                      currentUrl={slide.image || ''}
                      onUpload={(data) => syncImageToAllLanguages(index, data?.url || '')}
                      label="Upload Slide Image"
                      accept="image/*"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This image will be used for all language versions of this slide
                    </p>
                  </div>
                )}

                {/* Show current image for non-English languages */}
                {currentLanguage !== 'en' && slide.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slide Background Image (Shared)
                    </label>
                    <img 
                      src={slide.image} 
                      alt={`Slide ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      To change this image, switch to English language
                    </p>
                  </div>
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
                        placeholder="e.g., Pioneering Research"
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
                        placeholder="e.g., from Ethiopia"
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
                    Description
                  </label>
                  <textarea
                    value={slide.description || ''}
                    onChange={(e) => updateSlide(index, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ethronics is driving technological breakthroughs..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Call-to-Action Buttons</h3>
          <button
            onClick={addButton}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Button</span>
          </button>
        </div>

        {buttons.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No buttons yet. Click "Add Button" to create one.
          </div>
        )}

        <div className="space-y-4">
          {buttons.map((button, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">
                  Button {index + 1}
                </h4>
                <button
                  onClick={() => removeButton(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={button.text || ''}
                    onChange={(e) => updateButton(index, 'text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Join Our Research"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={button.href || ''}
                    onChange={(e) => updateButton(index, 'href', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="/contact"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`primary-${index}`}
                    checked={button.primary || false}
                    onChange={(e) => updateButton(index, 'primary', e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor={`primary-${index}`} className="ml-2 text-sm text-gray-700">
                    Primary Button (highlighted style)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
