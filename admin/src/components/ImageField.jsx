import { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import MediaLibrary from './MediaLibrary';
import axiosInstance from '../utils/axios';

export default function ImageField({ label, value, onChange, required = false }) {
  const [showLibrary, setShowLibrary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosInstance.post('/media/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        onChange(response.data.data.url);
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleLibrarySelect = (item) => {
    onChange(item.url);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Upload Button */}
          <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center">
              {uploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm text-gray-500">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-semibold">Upload New</p>
                  <p className="text-xs text-gray-400">Click to browse</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>

          {/* Library Button */}
          <button
            type="button"
            onClick={() => setShowLibrary(true)}
            className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 font-semibold">Choose from Library</p>
            <p className="text-xs text-gray-400">Browse uploaded</p>
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Media Library Modal */}
      <MediaLibrary
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={handleLibrarySelect}
        type="image"
      />
    </div>
  );
}
