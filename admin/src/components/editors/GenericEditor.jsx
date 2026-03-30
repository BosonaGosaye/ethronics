import { Plus, Trash2 } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import ImageField from '../ImageField';
import IconPicker from '../IconPicker';

export default function GenericEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...content[field]];
    newArray[index] = value;
    onContentChange(currentLanguage, { ...content, [field]: newArray });
  };

  const handleArrayItemAdd = (field) => {
    const currentArray = content[field] || [];
    const newItem = typeof currentArray[0] === 'object' ? {} : '';
    onContentChange(currentLanguage, { ...content, [field]: [...currentArray, newItem] });
  };

  const handleArrayItemRemove = (field, index) => {
    const newArray = content[field].filter((_, i) => i !== index);
    onContentChange(currentLanguage, { ...content, [field]: newArray });
  };

  const handleObjectChange = (field, subField, value) => {
    onContentChange(currentLanguage, {
      ...content,
      [field]: {
        ...content[field],
        [subField]: value
      }
    });
  };

  const handleNestedObjectChange = (field, index, subField, value) => {
    const newArray = [...content[field]];
    newArray[index] = { ...newArray[index], [subField]: value };
    onContentChange(currentLanguage, { ...content, [field]: newArray });
  };

  const handleNestedArrayChange = (field, index, subField, subIndex, value) => {
    const newArray = [...content[field]];
    const nestedArray = [...newArray[index][subField]];
    nestedArray[subIndex] = value;
    newArray[index] = { ...newArray[index], [subField]: nestedArray };
    onContentChange(currentLanguage, { ...content, [field]: newArray });
  };

  const handleNestedArrayItemAdd = (field, index, subField) => {
    const newArray = [...content[field]];
    const currentNestedArray = newArray[index][subField] || [];
    const newItem = typeof currentNestedArray[0] === 'object' ? {} : '';
    newArray[index] = {
      ...newArray[index],
      [subField]: [...currentNestedArray, newItem]
    };
    onContentChange(currentLanguage, { ...content, [field]: newArray });
  };

  const handleNestedArrayItemRemove = (field, index, subField, subIndex) => {
    const newArray = [...content[field]];
    const nestedArray = newArray[index][subField].filter((_, i) => i !== subIndex);
    newArray[index] = { ...newArray[index], [subField]: nestedArray };
    onContentChange(currentLanguage, { ...content, [field]: newArray });
  };

  const isImageField = (key) => {
    const imageKeywords = ['image', 'img', 'photo', 'picture', 'thumbnail', 'avatar', 'background'];
    return imageKeywords.some(keyword => key.toLowerCase().includes(keyword));
  };

  const isIconField = (key) => {
    return key.toLowerCase() === 'icon';
  };

  const renderField = (key, value, onChange, isNested = false) => {
    const fieldClass = isNested ? "text-sm" : "";
    
    // Image fields
    if (typeof value === 'string' && isImageField(key) && currentLanguage === 'en') {
      return (
        <ImageField
          label={key.replace(/([A-Z])/g, ' $1').trim()}
          value={value}
          onChange={onChange}
        />
      );
    }
    
    // Icon fields
    if (typeof value === 'string' && isIconField(key) && currentLanguage === 'en') {
      return (
        <IconPicker
          label={key.replace(/([A-Z])/g, ' $1').trim()}
          value={value}
          onChange={onChange}
        />
      );
    }
    
    // String fields
    if (typeof value === 'string') {
      if (value.length > 100 || key.toLowerCase().includes('description')) {
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${fieldClass}`}
          />
        );
      }
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${fieldClass}`}
        />
      );
    }
    
    // Number fields
    if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${fieldClass}`}
        />
      );
    }
    
    // Boolean fields
    if (typeof value === 'boolean') {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-600">Enabled</span>
        </div>
      );
    }
    
    return null;
  };

  // If content is empty or minimal, show a helpful starter template
  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="space-y-6">
        <LanguageSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          languages={languages}
        />
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Empty Section</h3>
            <p className="text-gray-600 mb-6">
              This is a custom section. Switch to JSON mode at the page level to define its structure,
              or add some basic fields below.
            </p>
            <button
              onClick={() => onContentChange(currentLanguage, { title: '', description: '', items: [] })}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Basic Structure
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      {/* Form Fields */}
      <div className="space-y-6">
        {Object.entries(content).map(([key, value]) => {
          // Skip internal fields
          if (key.startsWith('_') || key === 'isPublished' || key === 'createdAt' || key === 'updatedAt') {
            return null;
          }

          // Simple fields (string, number, boolean)
          if (['string', 'number', 'boolean'].includes(typeof value)) {
            return (
              <div key={key} className="bg-white rounded-lg border border-gray-200 p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {renderField(key, value, (newValue) => handleChange(key, newValue))}
              </div>
            );
          }
          
          // Array fields
          else if (Array.isArray(value)) {
            return (
              <div key={key} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()} ({value.length} items)
                  </label>
                  <button
                    onClick={() => handleArrayItemAdd(key)}
                    className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {value.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Item {index + 1}</span>
                        <button
                          onClick={() => handleArrayItemRemove(key, index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' ? (
                        renderField(`${key}_${index}`, item, (newValue) => handleArrayChange(key, index, newValue))
                      ) : typeof item === 'object' && item !== null ? (
                        <div className="space-y-2">
                          {Object.entries(item).map(([subKey, subValue]) => (
                            <div key={subKey}>
                              <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                                {subKey.replace(/([A-Z])/g, ' $1').trim()}
                              </label>
                              {['string', 'number', 'boolean'].includes(typeof subValue) ? (
                                renderField(
                                  subKey,
                                  subValue,
                                  (newValue) => handleNestedObjectChange(key, index, subKey, newValue),
                                  true
                                )
                              ) : Array.isArray(subValue) ? (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-medium text-gray-600">
                                      {subKey} ({subValue.length} items)
                                    </label>
                                    <button
                                      onClick={() => handleNestedArrayItemAdd(key, index, subKey)}
                                      className="text-xs px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                                    >
                                      + Add
                                    </button>
                                  </div>
                                  {subValue.map((item, subIndex) => (
                                    <div key={subIndex} className="flex items-center gap-2">
                                      {typeof item === 'string' ? (
                                        <input
                                          type="text"
                                          value={item}
                                          onChange={(e) => handleNestedArrayChange(key, index, subKey, subIndex, e.target.value)}
                                          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                                        />
                                      ) : (
                                        <div className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500">
                                          Complex item - use JSON mode
                                        </div>
                                      )}
                                      <button
                                        onClick={() => handleNestedArrayItemRemove(key, index, subKey, subIndex)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : typeof subValue === 'object' && subValue !== null ? (
                                <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-500">
                                  Nested object - use JSON mode for deep nesting
                                </div>
                              ) : (
                                <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-500">
                                  {typeof subValue} value
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-500">
                          {typeof item} value
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          
          // Object fields
          else if (typeof value === 'object' && value !== null) {
            return (
              <div key={key} className="bg-white rounded-lg border border-gray-200 p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="space-y-3 pl-4 border-l-2 border-purple-200">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                        {subKey.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      {['string', 'number', 'boolean'].includes(typeof subValue) ? (
                        renderField(
                          subKey,
                          subValue,
                          (newValue) => handleObjectChange(key, subKey, newValue),
                          true
                        )
                      ) : Array.isArray(subValue) ? (
                        <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500">
                          Array with {subValue.length} items - use JSON mode for nested arrays
                        </div>
                      ) : typeof subValue === 'object' && subValue !== null ? (
                        <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500">
                          Nested object - use JSON mode for deep nesting
                        </div>
                      ) : (
                        <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500">
                          {typeof subValue} value
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
}
