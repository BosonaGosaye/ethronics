import { useState, useEffect } from 'react';

const RegisterGalleryEditor = ({ contentByLanguage, onContentChange, currentLanguage }) => {
  const [content, setContent] = useState({
    galleryTitle: '',
    galleryDescription: '',
    trainingVideos: '',
    studentProjects: '',
    byStudent: ''
  });

  // Initialize content from contentByLanguage
  useEffect(() => {
    const currentContent = contentByLanguage[currentLanguage] || {
      galleryTitle: '',
      galleryDescription: '',
      trainingVideos: '',
      studentProjects: '',
      byStudent: ''
    };
    setContent(currentContent);
  }, [currentLanguage, contentByLanguage]);

  const handleChange = (field, value) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
    onContentChange(currentLanguage, updatedContent);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-sm text-blue-700">
          <strong>Gallery Section:</strong> Configure the gallery section labels and tab names. 
          The actual videos and projects are managed separately in their respective managers.
        </p>
        <div className="mt-2 text-xs text-blue-600">
          <p>• Training Videos: Manage in <strong>Training Videos Manager</strong></p>
          <p>• Student Projects: Manage in <strong>Student Projects Manager</strong></p>
        </div>
      </div>

      {/* Gallery Title */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gallery Section Title *
        </label>
        <input
          type="text"
          value={content.galleryTitle || ''}
          onChange={(e) => handleChange('galleryTitle', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., See Our Learning in Action"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Main heading for the gallery section
        </p>
      </div>

      {/* Gallery Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gallery Description *
        </label>
        <textarea
          value={content.galleryDescription || ''}
          onChange={(e) => handleChange('galleryDescription', e.target.value)}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., Watch our training videos and explore student projects"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Subtitle text below the gallery title
        </p>
      </div>

      {/* Tab Labels */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300 p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Tab Labels</h3>
        
        <div className="space-y-4">
          {/* Training Videos Tab */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Training Videos Tab Label *
            </label>
            <input
              type="text"
              value={content.trainingVideos || ''}
              onChange={(e) => handleChange('trainingVideos', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Training Videos"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Label for the training videos tab
            </p>
          </div>

          {/* Student Projects Tab */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Projects Tab Label *
            </label>
            <input
              type="text"
              value={content.studentProjects || ''}
              onChange={(e) => handleChange('studentProjects', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Student Projects"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Label for the student projects tab
            </p>
          </div>

          {/* By Student Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              "By Student" Label *
            </label>
            <input
              type="text"
              value={content.byStudent || ''}
              onChange={(e) => handleChange('byStudent', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., By"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Label shown before student name in project cards (e.g., "By John Doe")
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">Managing Gallery Content</h4>
        <div className="text-xs text-yellow-700 space-y-1">
          <p>• To add/edit training videos, go to <strong>Register Dashboard → Training Videos</strong></p>
          <p>• To add/edit student projects, go to <strong>Register Dashboard → Student Projects</strong></p>
          <p>• Videos and projects support multilingual titles and descriptions</p>
          <p>• Only published videos and projects will appear on the public page</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterGalleryEditor;
