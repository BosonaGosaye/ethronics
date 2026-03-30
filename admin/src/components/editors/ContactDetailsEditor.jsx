import LanguageSwitcher from '../LanguageSwitcher';

export default function ContactDetailsEditor({ 
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
                placeholder="e.g., Contact Details"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Label
                </label>
                <input
                  type="text"
                  value={content.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="e.g., Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Label
                </label>
                <input
                  type="text"
                  value={content.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="e.g., Phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Follow Us Label
              </label>
              <input
                type="text"
                value={content.followUs || ''}
                onChange={(e) => handleChange('followUs', e.target.value)}
                placeholder="e.g., Follow Us"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Shared Fields - Same for all languages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Contact Information (Same for All Languages)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            These fields are shared across all languages and only need to be entered once.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={englishContent.emailAddress || ''}
                onChange={(e) => handleSharedFieldChange('emailAddress', e.target.value)}
                placeholder="e.g., contact@ethronics.org"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={englishContent.phoneNumber || ''}
                onChange={(e) => handleSharedFieldChange('phoneNumber', e.target.value)}
                placeholder="e.g., +(251) 978-467-467"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={englishContent.linkedinUrl || ''}
                onChange={(e) => handleSharedFieldChange('linkedinUrl', e.target.value)}
                placeholder="e.g., https://et.linkedin.com/company/ethronics"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the full LinkedIn company page URL
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> The email address, phone number, and LinkedIn URL are entered once and automatically applied to all languages. 
            Only translate the labels (Section Title, Email Label, Phone Label, Follow Us Label) for each language.
          </p>
        </div>
      </div>
    </div>
  );
}
