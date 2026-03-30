import LanguageSwitcher from '../LanguageSwitcher';

export default function ContactLocationEditor({ 
  contentByLanguage, 
  currentLanguage, 
  onContentChange, 
  onLanguageChange, 
  languages 
}) {
  const content = contentByLanguage[currentLanguage] || {};
  const englishContent = contentByLanguage['en'] || {};

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  // Handle shared fields - update all languages at once
  const handleSharedFieldChange = (field, value) => {
    languages.forEach(lang => {
      const langContent = contentByLanguage[lang.code] || {};
      onContentChange(lang.code, { ...langContent, [field]: value });
    });
  };

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Translatable Fields */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Translatable Content ({languages.find(l => l.code === currentLanguage)?.name})
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Our Location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={content.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="e.g., Mebrat, AMG Mall, 9th Floor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={content.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g., Adama, Ethiopia"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Shared Field - Same for all languages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Map Settings (Same for All Languages)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            The map URL is shared across all languages and only needs to be entered once.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Embed URL
            </label>
            <textarea
              value={englishContent.mapUrl || ''}
              onChange={(e) => handleSharedFieldChange('mapUrl', e.target.value)}
              placeholder="Paste the Google Maps embed URL here..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm bg-gray-50"
            />
            <p className="mt-2 text-xs text-gray-500">
              To get the embed URL: Go to Google Maps → Search for your location → Click "Share" → Click "Embed a map" → Copy the URL from the iframe src attribute
            </p>
          </div>

          {englishContent.mapUrl && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Map Preview
              </label>
              <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-300">
                <iframe
                  src={englishContent.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> The map URL is entered once and automatically applied to all languages. 
            Only translate the title, address, and city for each language.
          </p>
        </div>
      </div>
    </div>
  );
}
