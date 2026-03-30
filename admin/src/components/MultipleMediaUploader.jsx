import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

export default function MultipleMediaUploader({ 
  onUploadComplete,
  currentUrls = [],
  accept = 'image/*',
  maxFiles = 10,
  label = 'Upload Media Files'
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaUrls, setMediaUrls] = useState(currentUrls);
  const [error, setError] = useState(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (mediaUrls.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('image', file);

        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/media/upload-image', {
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

        uploadedUrls.push(data.data.url);
        setUploadProgress(((i + 1) / files.length) * 100);
      }

      const newUrls = [...mediaUrls, ...uploadedUrls];
      setMediaUrls(newUrls);
      onUploadComplete(newUrls);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = (index) => {
    const newUrls = mediaUrls.filter((_, i) => i !== index);
    setMediaUrls(newUrls);
    onUploadComplete(newUrls);
  };

  const handleReorder = (fromIndex, toIndex) => {
    const newUrls = [...mediaUrls];
    const [removed] = newUrls.splice(fromIndex, 1);
    newUrls.splice(toIndex, 0, removed);
    setMediaUrls(newUrls);
    onUploadComplete(newUrls);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Upload Area */}
      {mediaUrls.length < maxFiles && (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader className="w-8 h-8 text-gray-400 animate-spin mb-2" />
                <p className="text-sm text-gray-500">Uploading... {Math.round(uploadProgress)}%</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {mediaUrls.length}/{maxFiles} files • PNG, JPG, GIF, WEBP (MAX. 10MB each)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
            disabled={uploading}
            multiple
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Preview Grid */}
      {mediaUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`Media ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {mediaUrls.length > 0 && (
        <p className="text-sm text-gray-600">
          {mediaUrls.length} file{mediaUrls.length !== 1 ? 's' : ''} uploaded
        </p>
      )}
    </div>
  );
}
