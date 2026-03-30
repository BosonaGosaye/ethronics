import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, Maximize2, Minimize2, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

const PDFViewerAdvanced = ({ fileUrl, fileName, fileType = 'pdf', onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [viewerType, setViewerType] = useState('google'); // 'google', 'mozilla', 'office365'

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

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages || prev, prev + 1));
  };

  // Get the appropriate viewer URL based on file type
  const getViewerUrl = () => {
    const lowerFileType = fileType.toLowerCase();
    
    if (lowerFileType === 'pdf') {
      if (viewerType === 'google') {
        // Google Docs Viewer - most reliable for Cloudinary URLs
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      } else if (viewerType === 'mozilla') {
        // Mozilla PDF.js viewer
        return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;
      } else if (viewerType === 'office365') {
        // Office 365 viewer
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
      }
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(lowerFileType)) {
      // Office documents - use Office 365 viewer or Google Docs
      if (viewerType === 'office365') {
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
      } else {
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      }
    }
    
    return fileUrl;
  };

  // Render viewer based on file type
  const renderViewer = () => {
    const lowerFileType = fileType.toLowerCase();
    
    if (lowerFileType === 'pdf' || ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(lowerFileType)) {
      return (
        <div className="w-full h-full bg-white relative">
          <iframe
            src={getViewerUrl()}
            className="w-full h-full border-0"
            title={fileName}
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
          
          {/* Viewer Type Selector */}
          {lowerFileType === 'pdf' && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 flex gap-2 z-10">
              <button
                onClick={() => setViewerType('google')}
                className={`px-3 py-1 text-xs rounded ${viewerType === 'google' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                title="Google Docs Viewer"
              >
                Google
              </button>
              <button
                onClick={() => setViewerType('mozilla')}
                className={`px-3 py-1 text-xs rounded ${viewerType === 'mozilla' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                title="Mozilla PDF.js Viewer"
              >
                Mozilla
              </button>
              <button
                onClick={() => setViewerType('office365')}
                className={`px-3 py-1 text-xs rounded ${viewerType === 'office365' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                title="Office 365 Viewer"
              >
                Office
              </button>
            </div>
          )}
        </div>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(lowerFileType)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4">
          <img
            src={fileUrl}
            alt={fileName}
            className="max-w-full max-h-full object-contain"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
        </div>
      );
    } else if (['mp4', 'webm', 'ogg'].includes(lowerFileType)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <video
            src={fileUrl}
            controls
            className="max-w-full max-h-full"
            style={{ width: `${zoom}%` }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (['mp3', 'wav', 'ogg'].includes(lowerFileType)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <audio src={fileUrl} controls className="w-full max-w-2xl">
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    } else if (lowerFileType === 'txt') {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full border-0 bg-white p-4"
          title={fileName}
        />
      );
    } else {
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
          
          {/* Rotate Button - for images and PDFs */}
          {(['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileType.toLowerCase())) && (
            <>
              <button
                onClick={handleRotate}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Rotate"
              >
                <RotateCw className="h-5 w-5" />
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

export default PDFViewerAdvanced;
