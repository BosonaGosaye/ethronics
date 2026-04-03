import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, X, Plus } from 'lucide-react';
import ImageField from '../components/ImageField';

export default function ResearchProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [formData, setFormData] = useState({
    translations: {
      en: {
        title: '',
        description: '',
        objectives: [],
        methodology: '',
        expectedOutcomes: [],
        publications: [],
        funding: '',
        collaborators: []
      },
      am: {
        title: '',
        description: '',
        objectives: [],
        methodology: '',
        expectedOutcomes: [],
        publications: [],
        funding: '',
        collaborators: []
      },
      om: {
        title: '',
        description: '',
        objectives: [],
        methodology: '',
        expectedOutcomes: [],
        publications: [],
        funding: '',
        collaborators: []
      }
    },
    category: 'Robotics & AI',
    status: 'Active',
    teamMembers: [],
    images: [],
    featuredImage: '',
    startDate: '',
    endDate: '',
    isPublished: false,
    displayOrder: 0
  });

  const [inputs, setInputs] = useState({
    objective: '',
    outcome: '',
    publication: '',
    collaborator: '',
    teamMemberName: '',
    teamMemberRole: '',
    teamMemberImage: ''
  });

  const categories = [
    'Robotics & AI',
    'AI & Machine Learning',
    'Quantum Computing & Security',
    'Industrial IoT & Automation',
    'Blockchain & Distributed Systems',
    'Healthcare AI'
  ];

  const statuses = ['Active', 'Research Phase', 'Pilot Phase', 'Development', 'Completed', 'On Hold'];
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'om', name: 'Afaan Oromoo' }
  ];

  useEffect(() => {
    if (id && id !== 'new') {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/research-projects/admin/${id}`);

      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
      alert('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (id && id !== 'new') {
        await axios.put(`/research-projects/admin/${id}`, formData);
        alert('Project updated successfully!');
      } else {
        await axios.post('/research-projects/admin', formData);
        alert('Project created successfully!');
      }
      
      navigate('/research-projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleTranslationChange = (lang, field, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [field]: value
        }
      }
    }));
  };

  const addArrayItem = (lang, field, value) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            ...prev.translations[lang],
            [field]: [...prev.translations[lang][field], value.trim()]
          }
        }
      }));
    }
  };

  const removeArrayItem = (lang, field, index) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [field]: prev.translations[lang][field].filter((_, i) => i !== index)
        }
      }
    }));
  };

  const addTeamMember = () => {
    if (inputs.teamMemberName.trim() && inputs.teamMemberRole.trim()) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          {
            name: inputs.teamMemberName.trim(),
            role: inputs.teamMemberRole.trim(),
            image: inputs.teamMemberImage
          }
        ]
      }));
      setInputs(prev => ({
        ...prev,
        teamMemberName: '',
        teamMemberRole: '',
        teamMemberImage: ''
      }));
    }
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const addImage = (url) => {
    if (url && !formData.images.includes(url)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
    }
  };

  const removeImage = (url) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== url)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const currentTranslation = formData.translations[activeLanguage];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/research-projects')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id && id !== 'new' ? 'Edit Research Project' : 'New Research Project'}
            </h1>
            <p className="text-gray-600 mt-1">Manage research project details and translations</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Project'}</span>
        </button>
      </div>

      {/* Language Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex space-x-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setActiveLanguage(lang.code)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeLanguage === lang.code
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information ({languages.find(l => l.code === activeLanguage)?.name})
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={currentTranslation.title}
                onChange={(e) => handleTranslationChange(activeLanguage, 'title', e.target.value)}
                required={activeLanguage === 'en'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={currentTranslation.description}
                onChange={(e) => handleTranslationChange(activeLanguage, 'description', e.target.value)}
                required={activeLanguage === 'en'}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Methodology
              </label>
              <textarea
                value={currentTranslation.methodology}
                onChange={(e) => handleTranslationChange(activeLanguage, 'methodology', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Information
              </label>
              <input
                type="text"
                value={currentTranslation.funding}
                onChange={(e) => handleTranslationChange(activeLanguage, 'funding', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Research Objectives</h2>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={inputs.objective}
              onChange={(e) => setInputs({ ...inputs, objective: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addArrayItem(activeLanguage, 'objectives', inputs.objective);
                  setInputs({ ...inputs, objective: '' });
                }
              }}
              placeholder="Add objective..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => {
                addArrayItem(activeLanguage, 'objectives', inputs.objective);
                setInputs({ ...inputs, objective: '' });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {currentTranslation.objectives.map((obj, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{obj}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem(activeLanguage, 'objectives', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Outcomes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expected Outcomes</h2>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={inputs.outcome}
              onChange={(e) => setInputs({ ...inputs, outcome: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addArrayItem(activeLanguage, 'expectedOutcomes', inputs.outcome);
                  setInputs({ ...inputs, outcome: '' });
                }
              }}
              placeholder="Add expected outcome..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => {
                addArrayItem(activeLanguage, 'expectedOutcomes', inputs.outcome);
                setInputs({ ...inputs, outcome: '' });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {currentTranslation.expectedOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{outcome}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem(activeLanguage, 'expectedOutcomes', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Publications</h2>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={inputs.publication}
              onChange={(e) => setInputs({ ...inputs, publication: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addArrayItem(activeLanguage, 'publications', inputs.publication);
                  setInputs({ ...inputs, publication: '' });
                }
              }}
              placeholder="Add publication..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => {
                addArrayItem(activeLanguage, 'publications', inputs.publication);
                setInputs({ ...inputs, publication: '' });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {currentTranslation.publications.map((pub, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{pub}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem(activeLanguage, 'publications', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborators */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Collaborators</h2>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={inputs.collaborator}
              onChange={(e) => setInputs({ ...inputs, collaborator: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addArrayItem(activeLanguage, 'collaborators', inputs.collaborator);
                  setInputs({ ...inputs, collaborator: '' });
                }
              }}
              placeholder="Add collaborator..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => {
                addArrayItem(activeLanguage, 'collaborators', inputs.collaborator);
                setInputs({ ...inputs, collaborator: '' });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {currentTranslation.collaborators.map((collab, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{collab}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem(activeLanguage, 'collaborators', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Project Metadata (Language Independent) */}
        {activeLanguage === 'en' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate ? formData.startDate.split('T')[0] : ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  value={inputs.teamMemberName}
                  onChange={(e) => setInputs({ ...inputs, teamMemberName: e.target.value })}
                  placeholder="Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={inputs.teamMemberRole}
                  onChange={(e) => setInputs({ ...inputs, teamMemberRole: e.target.value })}
                  placeholder="Role"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Member
                </button>
              </div>
              <div className="space-y-3">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Images</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <ImageField
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  label="Upload Featured Image"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images
                </label>
                <ImageField
                  value=""
                  onChange={addImage}
                  label="Upload Additional Image"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img} alt="" className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Publication Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Status</h2>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
