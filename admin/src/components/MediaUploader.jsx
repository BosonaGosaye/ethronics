import { useState } from 'react';
import { Upload, X, Image, Video, File, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MediaUploader({ 
  type = 'image', // 'image', 'video', 'file'
  onUpload, 
  currentUrl = null,
  label = 'Upload Media',
  accept = null
}) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const [error, setError] = useState(null);

  const getAcceptTypes = () => {
    if (accept) return accept;
    switch (type) {
      case 'image':
        return 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml';
      case 'video':
        return 'video/mp4,video/mov,video/avi,video/wmv,video/webm';
      case 'file':
        return '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip';
      default:
        return '*';
    }
  };

  const getEndpoint = () => {
    switch (type) {
      case 'image':
        return '/api/media/upload-image';
      case 'video':
        return '/api/media/upload-video';
      case 'file':
        return '/api/media/upload-file';
      default:
        return '/api/media/upload-image';
    }
  };

  const getFieldName = () => {
    switch (type) {
      case 'video':
        return 'video';
      case 'file':
        return 'file';
      default:
        return 'image';
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      // Create preview for images
      if (type === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }

      // Upload to Cloudinary via backend
      const formData = new FormData();
      formData.append(getFieldName(), file);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL.replace('/api', '')}${getEndpoint()}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setPreview(data.data.url);
      onUpload(data.data);
    } catch (err) {
      setError(err.message);
      setPreview(currentUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload(null);
  };

  const getIcon = () => {
    switch (type) {
      case 'video':
        return <Video className="w-8 h-8" />;
      case 'file':
        return <File className="w-8 h-8" />;
      default:
        return <Image className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative">
          {type === 'image' ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300">
              {getIcon()}
              <span className="ml-2 text-sm text-gray-600">
                {type === 'video' ? 'Video uploaded' : 'File uploaded'}
              </span>
            </div>
          )}
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader className="w-10 h-10 text-gray-400 animate-spin mb-3" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {type === 'image' && 'PNG, JPG, GIF, WEBP, SVG (MAX. 10MB)'}
                  {type === 'video' && 'MP4, MOV, AVI, WMV, WEBM (MAX. 100MB)'}
                  {type === 'file' && 'PDF, DOC, XLS, PPT, TXT, ZIP (MAX. 20MB)'}
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={getAcceptTypes()}
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
