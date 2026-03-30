import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import IconPicker from '../IconPicker';
import LanguageSwitcher from '../LanguageSwitcher';

export default function ProgramsEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const content = contentByLanguage[currentLanguage] || {};

  // Convert levels object to array for easier manipulation
  const levelsArray = content.levels 
    ? Object.entries(content.levels).map(([key, value]) => ({ key, ...value }))
    : [];

  const updateField = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const updateLevels = (newLevelsArray) => {
    // Convert array back to object
    const levelsObject = {};
    newLevelsArray.forEach(level => {
      const { key, ...rest } = level;
      levelsObject[key] = rest;
    });
    updateField('levels', levelsObject);
  };

  const addLevel = () => {
    const newKey = `level${levelsArray.length + 1}`;
    const newLevelsArray = [...levelsArray, {
      key: newKey,
      name: '',
      description: '',
      programs: []
    }];
    updateLevels(newLevelsArray);
  };

  const removeLevel = (index) => {
    const newLevelsArray = levelsArray.filter((_, i) => i !== index);
    updateLevels(newLevelsArray);
  };

  const updateLevel = (index, field, value) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[index] = { ...newLevelsArray[index], [field]: value };
    updateLevels(newLevelsArray);
  };

  const addProgram = (levelIndex) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[levelIndex].programs = [
      ...(newLevelsArray[levelIndex].programs || []),
      {
        name: '',
        duration: '',
        description: '',
        highlights: []
      }
    ];
    updateLevels(newLevelsArray);
  };

  const removeProgram = (levelIndex, programIndex) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[levelIndex].programs = newLevelsArray[levelIndex].programs.filter((_, i) => i !== programIndex);
    updateLevels(newLevelsArray);
  };

  const updateProgram = (levelIndex, programIndex, field, value) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[levelIndex].programs[programIndex] = {
      ...newLevelsArray[levelIndex].programs[programIndex],
      [field]: value
    };
    updateLevels(newLevelsArray);
  };

  const addHighlight = (levelIndex, programIndex) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[levelIndex].programs[programIndex].highlights = [
      ...(newLevelsArray[levelIndex].programs[programIndex].highlights || []),
      ''
    ];
    updateLevels(newLevelsArray);
  };

  const removeHighlight = (levelIndex, programIndex, highlightIndex) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[levelIndex].programs[programIndex].highlights = 
      newLevelsArray[levelIndex].programs[programIndex].highlights.filter((_, i) => i !== highlightIndex);
    updateLevels(newLevelsArray);
  };

  const updateHighlight = (levelIndex, programIndex, highlightIndex, value) => {
    const newLevelsArray = [...levelsArray];
    newLevelsArray[levelIndex].programs[programIndex].highlights[highlightIndex] = value;
    updateLevels(newLevelsArray);
  };

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      {/* General Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Explore Our Programs"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Click Hint</label>
          <input
            type="text"
            value={content.clickHint || ''}
            onChange={(e) => updateField('clickHint', e.target.value)}
            placeholder="Click to explore"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={content.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
          rows={2}
          placeholder="Subtitle text..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Explore Button Text</label>
          <input
            type="text"
            value={content.exploreButton || ''}
            onChange={(e) => updateField('exploreButton', e.target.value)}
            placeholder="Explore Program"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Highlights Label</label>
          <input
            type="text"
            value={content.keyHighlights || ''}
            onChange={(e) => updateField('keyHighlights', e.target.value)}
            placeholder="Key Highlights"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Explore Alert Message</label>
          <input
            type="text"
            value={content.exploreAlert || ''}
            onChange={(e) => updateField('exploreAlert', e.target.value)}
            placeholder="Get ready! We'll soon launch..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Program Levels */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Program Levels</h3>
          <button
            onClick={addLevel}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Level</span>
          </button>
        </div>

        <div className="space-y-4">
          {levelsArray.map((level, levelIndex) => (
            <div key={levelIndex} className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Level Header */}
              <div className="bg-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={() => setExpandedLevel(expandedLevel === levelIndex ? null : levelIndex)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {expandedLevel === levelIndex ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    <span className="font-medium text-gray-900">
                      {level.name || `Level ${levelIndex + 1}`}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({level.programs?.length || 0} programs)
                    </span>
                  </div>
                  <button
                    onClick={() => removeLevel(levelIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Level Content */}
              {expandedLevel === levelIndex && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Level Name</label>
                      <input
                        type="text"
                        value={level.name || ''}
                        onChange={(e) => updateLevel(levelIndex, 'name', e.target.value)}
                        placeholder="TVET, Undergraduate, etc."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={level.description || ''}
                        onChange={(e) => updateLevel(levelIndex, 'description', e.target.value)}
                        placeholder="Level description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {currentLanguage === 'en' && (
                    <IconPicker
                      label="Level Icon (Shared across all languages)"
                      value={level.icon || ''}
                      onChange={(icon) => updateLevel(levelIndex, 'icon', icon)}
                    />
                  )}

                  {/* Programs */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Programs</h4>
                      <button
                        onClick={() => addProgram(levelIndex)}
                        className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Program</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(level.programs || []).map((program, programIndex) => (
                        <div key={programIndex} className="border border-gray-200 rounded-lg p-3 bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              Program {programIndex + 1}
                            </span>
                            <button
                              onClick={() => removeProgram(levelIndex, programIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={program.name || ''}
                                onChange={(e) => updateProgram(levelIndex, programIndex, 'name', e.target.value)}
                                placeholder="Program name"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              />
                              <input
                                type="text"
                                value={program.duration || ''}
                                onChange={(e) => updateProgram(levelIndex, programIndex, 'duration', e.target.value)}
                                placeholder="Duration (e.g., 4 years)"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              />
                            </div>

                            <textarea
                              value={program.description || ''}
                              onChange={(e) => updateProgram(levelIndex, programIndex, 'description', e.target.value)}
                              rows={2}
                              placeholder="Program description"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />

                            {/* Highlights */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium text-gray-700">Highlights</label>
                                <button
                                  onClick={() => addHighlight(levelIndex, programIndex)}
                                  className="text-xs text-purple-600 hover:text-purple-700"
                                >
                                  + Add Highlight
                                </button>
                              </div>
                              <div className="space-y-2">
                                {(program.highlights || []).map((highlight, highlightIndex) => (
                                  <div key={highlightIndex} className="flex items-center space-x-2">
                                    <input
                                      type="text"
                                      value={highlight}
                                      onChange={(e) => updateHighlight(levelIndex, programIndex, highlightIndex, e.target.value)}
                                      placeholder="Highlight"
                                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                    <button
                                      onClick={() => removeHighlight(levelIndex, programIndex, highlightIndex)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
