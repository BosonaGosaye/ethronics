import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import ImageField from '../ImageField';

export default function LeadersEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {
    title: '',
    description: '',
    position: 'Position',
    linkedinProfile: 'LinkedIn Profile',
    teamMembers: []
  };

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...content.teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    onContentChange(currentLanguage, { ...content, teamMembers: newTeamMembers });
  };

  const handleImageChange = (index, imageUrl) => {
    // Update image for current language
    const newTeamMembers = [...content.teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], image: imageUrl };
    onContentChange(currentLanguage, { ...content, teamMembers: newTeamMembers });

    // Sync image to all other languages
    languages.forEach(lang => {
      if (lang.code !== currentLanguage) {
        const otherContent = contentByLanguage[lang.code] || { teamMembers: [] };
        const otherTeamMembers = [...(otherContent.teamMembers || [])];
        
        // Ensure the team member exists in other language
        if (otherTeamMembers[index]) {
          otherTeamMembers[index] = { ...otherTeamMembers[index], image: imageUrl };
          onContentChange(lang.code, { ...otherContent, teamMembers: otherTeamMembers });
        }
      }
    });
  };

  const addTeamMember = () => {
    const newMember = {
      name: '',
      quote: '',
      bio: '',
      position: '',
      image: '',
      linkdin: ''
    };

    // Add to all languages
    languages.forEach(lang => {
      const langContent = contentByLanguage[lang.code] || { teamMembers: [] };
      const newTeamMembers = [...(langContent.teamMembers || []), newMember];
      onContentChange(lang.code, { ...langContent, teamMembers: newTeamMembers });
    });
  };

  const removeTeamMember = (index) => {
    if (!confirm('Are you sure you want to remove this team member from all languages?')) return;

    // Remove from all languages
    languages.forEach(lang => {
      const langContent = contentByLanguage[lang.code] || { teamMembers: [] };
      const newTeamMembers = (langContent.teamMembers || []).filter((_, i) => i !== index);
      onContentChange(lang.code, { ...langContent, teamMembers: newTeamMembers });
    });
  };

  return (
    <div className="space-y-6">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      {/* Section Title */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Section Title
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., Meet Our Leaders"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Section Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Section Description
        </label>
        <textarea
          value={content.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="Brief description of the leadership team"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* UI Labels */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">UI Labels (for modal)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Position Label
            </label>
            <input
              type="text"
              value={content.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="e.g., Position"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              LinkedIn Profile Label
            </label>
            <input
              type="text"
              value={content.linkedinProfile || ''}
              onChange={(e) => handleChange('linkedinProfile', e.target.value)}
              placeholder="e.g., LinkedIn Profile"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Team Members ({content.teamMembers?.length || 0})
          </label>
          <button
            onClick={addTeamMember}
            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>

        <div className="space-y-6">
          {content.teamMembers && content.teamMembers.length > 0 ? (
            content.teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Team Member {index + 1}</h4>
                  <button
                    onClick={() => removeTeamMember(index)}
                    className="text-red-600 hover:text-red-700"
                    title="Remove from all languages"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Image Upload - Shared across all languages */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Profile Image <span className="text-purple-600">(Shared across all languages)</span>
                    </label>
                    <ImageField
                      value={member.image || ''}
                      onChange={(url) => handleImageChange(index, url)}
                      label="Upload Profile Image"
                    />
                    {member.image && (
                      <div className="mt-2">
                        <img
                          src={member.image}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover border-2 border-purple-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={member.name || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Quote */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Quote
                    </label>
                    <input
                      type="text"
                      value={member.quote || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'quote', e.target.value)}
                      placeholder="Inspirational quote"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={member.bio || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)}
                      rows={3}
                      placeholder="Brief biography"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Position/Title
                    </label>
                    <input
                      type="text"
                      value={member.position || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'position', e.target.value)}
                      placeholder="e.g., CEO, CTO"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* LinkedIn URL - Shared across all languages */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      LinkedIn URL <span className="text-purple-600">(Shared across all languages)</span>
                    </label>
                    <input
                      type="url"
                      value={member.linkdin || ''}
                      onChange={(e) => {
                        const url = e.target.value;
                        // Update for current language
                        handleTeamMemberChange(index, 'linkdin', url);
                        
                        // Sync to all other languages
                        languages.forEach(lang => {
                          if (lang.code !== currentLanguage) {
                            const otherContent = contentByLanguage[lang.code] || { teamMembers: [] };
                            const otherTeamMembers = [...(otherContent.teamMembers || [])];
                            if (otherTeamMembers[index]) {
                              otherTeamMembers[index] = { ...otherTeamMembers[index], linkdin: url };
                              onContentChange(lang.code, { ...otherContent, teamMembers: otherTeamMembers });
                            }
                          }
                        });
                      }}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No team members yet. Click "Add Team Member" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Profile images and LinkedIn URLs are automatically shared across all languages</li>
          <li>Name, quote, bio, and position should be translated for each language</li>
          <li>Adding or removing team members affects all languages simultaneously</li>
          <li>Switch languages using the tabs above to translate text content</li>
        </ul>
      </div>
    </div>
  );
}
