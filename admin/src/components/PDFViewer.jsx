import { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Maximize2, Minimize2 } from 'lucide-react';

const PDFViewer = ({ fileUrl, fileName, onClose, fileType = 'pdf' }) => {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Convert Cloudinary URL to inline display mode
  const getInlineFileUrl = (url) => {
    if (url.includes('cloudinary.com')) {
      // For Cloudinary URLs, modify to use inline display (fl_attachment -> fl_inline)
      // Also change /raw/upload/ to /image/upload/ for PDFs to enable preview
      let modifiedUrl = url.replace('/raw/upload/', '/image/upload/');
      
      // Add flags for inline display and PDF page rendering
      if (modifiedUrl.includes('/upload/')) {
        modifiedUrl = modifiedUrl.replace('/upload/', '/upload/fl_attachment:false,fl_inline/');
      }
      
      return modifiedUrl;
    }
    return url;
  };

  // Determine how to display the file based on type
  const renderViewer = () => {
    const lowerFileType = fileType.toLowerCase();
    const inlineUrl = getInlineFileUrl(fileUrl);
    
    if (lowerFileType === 'pdf') {
      // For PDFs, use Google Docs Viewer which handles Cloudinary URLs better
      return (
        <div className="w-full h-full bg-white">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="w-full h-full border-0"
            title={fileName}
          />
        </div>
      );
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(lowerFileType)) {
      // For Office documents, use Google Docs Viewer
      return (
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
          className="w-full h-full border-0 bg-white"
          title={fileName}
        />
      );
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(lowerFileType)) {
      // For images
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4">
          <img
            src={inlineUrl}
            alt={fileName}
            className="max-w-full max-h-full object-contain"
            style={{ transform: `scale(${zoom / 100})` }}
          />
        </div>
      );
    } else if (['mp4', 'webm', 'ogg'].includes(lowerFileType)) {
      // For videos
      return (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <video
            src={inlineUrl}
            controls
            className="max-w-full max-h-full"
            style={{ width: `${zoom}%` }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (['mp3', 'wav', 'ogg'].includes(lowerFileType)) {
      // For audio
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <audio src={inlineUrl} controls className="w-full max-w-2xl">
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    } else if (lowerFileType === 'txt') {
      // For text files, fetch and display
      return (
        <iframe
          src={inlineUrl}
          className="w-full h-full border-0 bg-white p-4"
          title={fileName}
        />
      );
    } else {
      // For unsupported formats, show download option
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <p className="text-xl mb-4">Preview not available for this file type</p>
            <p className="text-gray-400 mb-6">File type: {fileType.toUpperCase()}</p>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Download className="h-5 w-5" />
              Download File
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black ${isFullscreen ? 'bg-opacity-100' : 'bg-opacity-90'} flex flex-col`}>
      {/* Header */}
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{fileName}</h3>
          <span className="text-xs text-gray-400 uppercase">{fileType}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Zoom Controls - only for images and PDFs */}
          {(['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileType.toLowerCase())) && (
            <>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="text-sm px-3 min-w-[60px] text-center">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              
              <div className="w-px h-6 bg-gray-700 mx-2"></div>
            </>
          )}
          
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="h-5 w-5" />
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto bg-gray-800">
        {renderViewer()}
      </div>
    </div>
  );
};

export default PDFViewer;
