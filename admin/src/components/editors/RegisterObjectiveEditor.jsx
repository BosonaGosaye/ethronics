import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const RegisterObjectiveEditor = ({ contentByLanguage, onContentChange, currentLanguage }) => {
  const content = contentByLanguage[currentLanguage] || { title: '', description: '', points: [] };

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const handleAddPoint = () => {
    const newPoints = [...(content.points || []), ''];
    onContentChange(currentLanguage, { ...content, points: newPoints });
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...content.points];
    newPoints[index] = value;
    onContentChange(currentLanguage, { ...content, points: newPoints });
  };

  const handleRemovePoint = (index) => {
    const newPoints = content.points.filter((_, i) => i !== index);
    onContentChange(currentLanguage, { ...content, points: newPoints });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Section Title *
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., Discover the Fun of Robotics"
          required
        />
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={content.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Introduction text for the objective section"
          required
        />
      </div>

      {/* Points */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Objective Points ({(content.points || []).length} items)
          </label>
          <button
            onClick={handleAddPoint}
            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Point</span>
          </button>
        </div>

        <div className="space-y-3">
          {(content.points || []).map((point, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-start space-x-2">
                <GripVertical className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">Point {index + 1}</span>
                    <button
                      onClick={() => handleRemovePoint(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={point}
                    onChange={(e) => handlePointChange(index, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Enter objective point"
                  />
                </div>
              </div>
            </div>
          ))}

          {(content.points || []).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No points added yet</p>
              <button
                onClick={handleAddPoint}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Add your first point
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterObjectiveEditor;
