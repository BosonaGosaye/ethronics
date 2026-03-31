import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';
import MediaUploader from '../components/MediaUploader';

export default function SiteSettings() {
  const [settings, setSettings] = useState({ logo: '', siteName: 'Ethronics' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showMediaUploader, setShowMediaUploader] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/site-settings');
      setSettings(response.data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await axios.put('/site-settings', settings);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleMediaSelect = (media) => {
    setSettings({ ...settings, logo: media.url });
    setShowMediaUploader(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium mb-2">Site Logo</label>
          <div className="flex items-center space-x-4">
            {settings.logo && (
              <img src={settings.logo} alt="Logo" className="h-16 w-auto" />
            )}
            <button
              onClick={() => setShowMediaUploader(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Logo</span>
            </button>
          </div>
        </div>

        {/* Site Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
          {message && (
            <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </span>
          )}
        </div>
      </div>

      {showMediaUploader && (
        <MediaUploader
          onSelect={handleMediaSelect}
          onClose={() => setShowMediaUploader(false)}
        />
      )}
    </div>
  );
}
