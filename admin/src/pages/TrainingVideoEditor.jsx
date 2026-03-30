import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save } from 'lucide-react';
import MediaUploader from '../components/MediaUploader';

const TrainingVideoEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState({
    thumbnail: '',
    embedUrl: '',
    duration: '',
    title: { en: '', am: '', om: '' },
    description: { en: '', am: '', om: '' },
    order: 0,
    isPublished: true
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isNew && id && id !== 'new') {
      fetchVideo();
    }
  }, [id, isNew]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/training-videos/${id}`);
      setFormData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch video');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isNew) {
        await axios.post('/training-videos', formData);
      } else {
        if (!id) {
          throw new Error('Video ID is missing. Cannot update.');
        }
        await axios.put(`/training-videos/${id}`, formData);
      }
      navigate('/training-videos');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save video');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/training-videos"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Link>
        <h1 className="text-2xl font-bold">
          {isNew ? 'Add Training Video' : 'Edit Training Video'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Media Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Media (Shared across all languages)</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image
              </label>
              <MediaUploader
                type="image"
                currentUrl={formData.thumbnail}
                onUpload={(data) => handleChange('thumbnail', data?.url || '')}
                label="Thumbnail Image"
                accept="image/*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube Embed URL *
              </label>
              <input
                type="url"
                value={formData.embedUrl}
                onChange={(e) => handleChange('embedUrl', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Use the embed URL format (not the watch URL)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="12:45"
                required
              />
            </div>
          </div>
        </div>

        {/* Multi-language Content */}
        {['en', 'am', 'om'].map((lang) => (
          <div key={lang} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              {lang === 'en' ? 'English' : lang === 'am' ? 'Amharic (አማርኛ)' : 'Oromo (Afaan Oromoo)'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title[lang]}
                  onChange={(e) => handleLanguageChange('title', lang, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description[lang]}
                  onChange={(e) => handleLanguageChange('description', lang, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {/* Metadata */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Metadata</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => handleChange('order', parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Lower numbers appear first
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => handleChange('isPublished', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                Published
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/training-videos')}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {saving ? 'Saving...' : 'Save Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainingVideoEditor;
