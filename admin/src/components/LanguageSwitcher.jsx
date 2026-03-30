import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ currentLanguage, onLanguageChange, languages }) {
  return (
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
        Note: Images and icons are shared across all languages. Edit them once and they'll apply to all translations.
      </p>
    </div>
  );
}
