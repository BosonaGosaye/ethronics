import ImageField from '../ImageField';
import LanguageSwitcher from '../LanguageSwitcher';

export default function VisionEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const updateField = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {currentLanguage === 'en' && (
          <ImageField
            label="Vision Image (Shared across all languages)"
            value={content.image || ''}
            onChange={(url) => updateField('image', url)}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Our Vision for Ethiopia's Tech Future"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description Paragraph 1</label>
          <textarea
            value={content.description1 || ''}
            onChange={(e) => updateField('description1', e.target.value)}
            rows={4}
            placeholder="First paragraph..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description Paragraph 2</label>
          <textarea
            value={content.description2 || ''}
            onChange={(e) => updateField('description2', e.target.value)}
            rows={4}
            placeholder="Second paragraph..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Caption</label>
          <input
            type="text"
            value={content.imageCaption || ''}
            onChange={(e) => updateField('imageCaption', e.target.value)}
            placeholder="Empowering Ethiopia's Next Innovators"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
