import { useState, useEffect } from 'react';
import MediaUploader from '../MediaUploader';

const RegisterHeroEditor = ({ contentByLanguage = {}, onContentChange, currentLanguage = 'en', languages = [] }) => {
  const [sharedImage, setSharedImage] = useState('');
  const [textContent, setTextContent] = useState({
    title: '',
    description: '',
    button: ''
  });

  // Initialize from content
  useEffect(() => {
    const currentContent = contentByLanguage[currentLanguage] || {};
    setTextContent({
      title: currentContent.title || '',
      description: currentContent.description || '',
      button: currentContent.button || ''
    });
    
    // Get image from any language (they should all be the same)
    const imageFromContent = currentContent.image || 
                            contentByLanguage['en']?.image || 
                            contentByLanguage['am']?.image || 
                            contentByLanguage['om']?.image || '';
    setSharedImage(imageFromContent);
  }, [currentLanguage, contentByLanguage]);

  const handleTextChange = (field, value) => {
    const newTextContent = { ...textContent, [field]: value };
    setTextContent(newTextContent);
    
    // Update only current language with text + shared image
    onContentChange(currentLanguage, {
      ...newTextContent,
      image: sharedImage
    });
  };

  const handleImageChange = (url) => {
    setSharedImage(url);
    
    // Update ALL languages with the new image
    if (languages && languages.length > 0) {
      languages.forEach(lang => {
        const langContent = contentByLanguage[lang.code] || {};
        onContentChange(lang.code, {
          ...langContent,
          image: url
        });
      });
    } else {
      // Fallback: update current language only
      const currentContent = contentByLanguage[currentLanguage] || {};
      onContentChange(currentLanguage, {
        ...currentContent,
        image: url
      });
    }
  };

  const getCurrentLanguageName = () => {
    if (!languages || languages.length === 0) return currentLanguage;
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.name : currentLanguage;
  };

  return (
    <div className="space-y-6">
      {/* Shared Image Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-1">
              Hero Image (Shared Across All Languages)
            </h3>
            <p className="text-sm text-blue-700">
              Upload the hero image once - it will automatically apply to English, Amharic, and Oromo versions.
            </p>
          </div>
        </div>

        <MediaUploader
          type="image"
          currentUrl={sharedImage}
          onUpload={(data) => {
            if (data && data.url) {
              handleImageChange(data.url);
            } else if (data === null) {
              handleImageChange('');
            }
          }}
          label="Hero Image"
          accept="image/*"
        />
        
        <p className="text-xs text-blue-600 mt-2">
          Recommended size: 1200x800px or larger. Formats: JPG, PNG, WebP
        </p>
        
        {sharedImage && (
          <div className="mt-4">
            <p className="text-sm font-medium text-blue-900 mb-2">Preview:</p>
            <img
              src={sharedImage}
              alt="Hero preview"
              className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg border-2 border-blue-200"
            />
          </div>
        )}
      </div>

      {/* Language-Specific Text Content */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-1">
              Text Content for {getCurrentLanguageName()}
            </h3>
            <p className="text-sm text-green-700">
              Translate the text content for each language using the language tabs above.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Title *
            </label>
            <input
              type="text"
              value={textContent.title}
              onChange={(e) => handleTextChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter hero title"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Main heading displayed at the top of the register page
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Description *
            </label>
            <textarea
              value={textContent.description}
              onChange={(e) => handleTextChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter hero description"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Subtitle or description text below the title
            </p>
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text *
            </label>
            <input
              type="text"
              value={textContent.button}
              onChange={(e) => handleTextChange('button', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Register Now"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Text displayed on the call-to-action button
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterHeroEditor;
