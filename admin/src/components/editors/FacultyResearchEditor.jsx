import { Plus, Trash2 } from 'lucide-react';
import ImageField from '../ImageField';
import LanguageSwitcher from '../LanguageSwitcher';

export default function FacultyResearchEditor({ contentByLanguage, currentLanguage, onContentChange, onLanguageChange, languages }) {
  const content = contentByLanguage[currentLanguage] || {};

  const updateField = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  // Faculty Members Management
  const addFacultyMember = () => {
    const newMembers = [...(content.facultyMembers || []), {
      name: '',
      title: '',
      description: '',
      image: '',
      expertise: []
    }];
    updateField('facultyMembers', newMembers);
  };

  const removeFacultyMember = (index) => {
    const newMembers = content.facultyMembers.filter((_, i) => i !== index);
    updateField('facultyMembers', newMembers);
  };

  const updateFacultyMember = (index, field, value) => {
    const newMembers = [...(content.facultyMembers || [])];
    newMembers[index] = { ...newMembers[index], [field]: value };
    updateField('facultyMembers', newMembers);
  };

  const addExpertise = (memberIndex) => {
    const newMembers = [...(content.facultyMembers || [])];
    newMembers[memberIndex].expertise = [...(newMembers[memberIndex].expertise || []), ''];
    updateField('facultyMembers', newMembers);
  };

  const removeExpertise = (memberIndex, expertiseIndex) => {
    const newMembers = [...(content.facultyMembers || [])];
    newMembers[memberIndex].expertise = newMembers[memberIndex].expertise.filter((_, i) => i !== expertiseIndex);
    updateField('facultyMembers', newMembers);
  };

  const updateExpertise = (memberIndex, expertiseIndex, value) => {
    const newMembers = [...(content.facultyMembers || [])];
    newMembers[memberIndex].expertise[expertiseIndex] = value;
    updateField('facultyMembers', newMembers);
  };

  // Research Projects Management
  const addResearchProject = () => {
    const newProjects = [...(content.researchProjects || []), {
      title: '',
      description: '',
      image: '',
      lead: '',
      status: 'ongoing'
    }];
    updateField('researchProjects', newProjects);
  };

  const removeResearchProject = (index) => {
    const newProjects = content.researchProjects.filter((_, i) => i !== index);
    updateField('researchProjects', newProjects);
  };

  const updateResearchProject = (index, field, value) => {
    const newProjects = [...(content.researchProjects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateField('researchProjects', newProjects);
  };

  return (
    <div className="space-y-8">
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        languages={languages}
      />

      {/* General Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Faculty & Research"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
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
      </div>

      {/* World-Class Faculty Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">World-Class Faculty</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              type="text"
              value={content.worldClassTitle || ''}
              onChange={(e) => updateField('worldClassTitle', e.target.value)}
              placeholder="World-Class Faculty"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={content.worldClassDescription || ''}
              onChange={(e) => updateField('worldClassDescription', e.target.value)}
              rows={3}
              placeholder="Description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {currentLanguage === 'en' && (
            <ImageField
              label="Faculty Section Image (Shared across all languages)"
              value={content.worldClassImage || ''}
              onChange={(url) => updateField('worldClassImage', url)}
            />
          )}
        </div>

        {/* Faculty Members List */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Faculty Members</h4>
            <button
              onClick={addFacultyMember}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Faculty Member</span>
            </button>
          </div>

          <div className="space-y-4">
            {(content.facultyMembers || []).map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Faculty Member {index + 1}</span>
                  <button
                    onClick={() => removeFacultyMember(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={member.name || ''}
                      onChange={(e) => updateFacultyMember(index, 'name', e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={member.title || ''}
                      onChange={(e) => updateFacultyMember(index, 'title', e.target.value)}
                      placeholder="Title (e.g., Professor, PhD)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <textarea
                    value={member.description || ''}
                    onChange={(e) => updateFacultyMember(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Bio/Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />

                  {currentLanguage === 'en' && (
                    <ImageField
                      label="Photo (Shared across all languages)"
                      value={member.image || ''}
                      onChange={(url) => updateFacultyMember(index, 'image', url)}
                    />
                  )}

                  {/* Expertise Areas */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700">Areas of Expertise</label>
                      <button
                        onClick={() => addExpertise(index)}
                        className="text-xs text-purple-600 hover:text-purple-700"
                      >
                        + Add Expertise
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(member.expertise || []).map((exp, expIndex) => (
                        <div key={expIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={exp}
                            onChange={(e) => updateExpertise(index, expIndex, e.target.value)}
                            placeholder="e.g., Machine Learning, Robotics"
                            className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => removeExpertise(index, expIndex)}
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

      {/* Research Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cutting-Edge Research</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              type="text"
              value={content.researchTitle || ''}
              onChange={(e) => updateField('researchTitle', e.target.value)}
              placeholder="Cutting-Edge Research"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={content.researchDescription || ''}
              onChange={(e) => updateField('researchDescription', e.target.value)}
              rows={3}
              placeholder="Description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {currentLanguage === 'en' && (
            <ImageField
              label="Research Section Image (Shared across all languages)"
              value={content.researchImage || ''}
              onChange={(url) => updateField('researchImage', url)}
            />
          )}
        </div>

        {/* Research Projects List */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Research Projects</h4>
            <button
              onClick={addResearchProject}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Research Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {(content.researchProjects || []).map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Research Project {index + 1}</span>
                  <button
                    onClick={() => removeResearchProject(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={project.title || ''}
                    onChange={(e) => updateResearchProject(index, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />

                  <textarea
                    value={project.description || ''}
                    onChange={(e) => updateResearchProject(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Project Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={project.lead || ''}
                      onChange={(e) => updateResearchProject(index, 'lead', e.target.value)}
                      placeholder="Project Lead"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <select
                      value={project.status || 'ongoing'}
                      onChange={(e) => updateResearchProject(index, 'status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>

                  {currentLanguage === 'en' && (
                    <ImageField
                      label="Project Image (Shared across all languages)"
                      value={project.image || ''}
                      onChange={(url) => updateResearchProject(index, 'image', url)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Caption */}
      <div className="border-t border-gray-200 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">General Image Caption</label>
          <input
            type="text"
            value={content.imageCaption || ''}
            onChange={(e) => updateField('imageCaption', e.target.value)}
            placeholder="Research That Transforms Lives"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
