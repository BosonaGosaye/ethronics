import { Plus, Trash2, Globe } from 'lucide-react';
import MediaUploader from '../MediaUploader';

export default function ManufacturingHeroEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
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
      line1: '',
      line2: '',
      line3: '',
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

  const slides = content.slides || [];

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
          Note: Images are shared across all languages. Upload once and they'll apply to all translations automatically.
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
          placeholder="Manufacturing Excellence"
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
                      Slide Image (Shared across all languages)
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
                      Slide Image (Shared)
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 1</label>
                  <input
                    type="text"
                    value={slide.line1 || ''}
                    onChange={(e) => updateSlide(index, 'line1', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="First line of title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Line 2 (Highlighted)
                  </label>
                  <input
                    type="text"
                    value={slide.line2 || ''}
                    onChange={(e) => updateSlide(index, 'line2', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Highlighted line (gradient)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 3</label>
                  <input
                    type="text"
                    value={slide.line3 || ''}
                    onChange={(e) => updateSlide(index, 'line3', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Third line of title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={slide.description || ''}
                    onChange={(e) => updateSlide(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Slide description"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Call-to-Action Buttons</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure the buttons that appear below the hero content
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Button Text
            </label>
            <input
              type="text"
              value={content.button || ''}
              onChange={(e) => updateField('button', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Learn More"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
