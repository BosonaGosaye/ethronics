import { Bot, Code, Zap } from 'lucide-react';

const RegisterHighlightsEditor = ({ contentByLanguage, onContentChange, currentLanguage }) => {
  const content = contentByLanguage[currentLanguage] || {
    title: '',
    roboticsTitle: '',
    roboticsDescription: '',
    codingTitle: '',
    codingDescription: '',
    autonomousTitle: '',
    autonomousDescription: ''
  };

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Section Title *
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., Training Highlights"
          required
        />
      </div>

      {/* Robotics Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Robotics Highlight</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Title *
            </label>
            <input
              type="text"
              value={content.roboticsTitle || ''}
              onChange={(e) => handleChange('roboticsTitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Robotics Fundamentals"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={content.roboticsDescription || ''}
              onChange={(e) => handleChange('roboticsDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the robotics training"
              required
            />
          </div>
        </div>
      </div>

      {/* Coding Card */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-300 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Code className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-green-900">Coding Highlight</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Title *
            </label>
            <input
              type="text"
              value={content.codingTitle || ''}
              onChange={(e) => handleChange('codingTitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Programming Skills"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={content.codingDescription || ''}
              onChange={(e) => handleChange('codingDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the coding training"
              required
            />
          </div>
        </div>
      </div>

      {/* AI/Autonomous Card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">AI & Automation Highlight</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Title *
            </label>
            <input
              type="text"
              value={content.autonomousTitle || ''}
              onChange={(e) => handleChange('autonomousTitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., AI & Automation"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={content.autonomousDescription || ''}
              onChange={(e) => handleChange('autonomousDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe the AI/automation training"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterHighlightsEditor;
