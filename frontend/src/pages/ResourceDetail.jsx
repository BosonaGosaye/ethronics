import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Star, 
  Calendar, 
  User, 
  FileText, 
  Share2,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import PDFViewerAdvanced from '../components/PDFViewerAdvanced';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await axios.get(`${API_URL}/library-resources/public/${id}`);
      setResource(response.data.data);
      
      // Track view
      await axios.post(`${API_URL}/library-resources/public/${id}/view`);
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Track download
      await axios.post(`${API_URL}/library-resources/public/${id}/download`);
      
      if (resource.fileUrl) {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = resource.fileUrl;
        
        // Get file extension from fileType or URL
        const fileExtension = resource.fileType || 'pdf';
        const fileName = `${title.replace(/[^a-z0-9]/gi, '_')}.${fileExtension}`;
        
        // Set download attribute with filename
        link.setAttribute('download', fileName);
        link.setAttribute('target', '_blank');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading resource:', error);
      alert('Failed to download resource. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReadOnline = () => {
    if (resource.fileUrl) {
      // Check if it's a PDF or viewable format
      const fileType = resource.fileType?.toLowerCase() || 'pdf';
      
      if (fileType === 'pdf') {
        // Open PDF viewer modal
        setShowPDFViewer(true);
      } else {
        // For other formats, open in new tab
        window.open(resource.fileUrl, '_blank');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resource Not Found</h2>
          <Link to="/library" className="text-purple-600 hover:text-purple-700">
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  const title = resource.title?.[language] || resource.title?.en || 'Untitled';
  const description = resource.description?.[language] || resource.description?.en || '';
  const abstract = resource.abstract?.[language] || resource.abstract?.en || '';
  const toc = resource.tableOfContents || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* PDF Viewer Modal */}
      {showPDFViewer && (
        <PDFViewerAdvanced
          fileUrl={resource.fileUrl}
          fileName={title}
          fileType={resource.fileType || 'pdf'}
          onClose={() => setShowPDFViewer(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/library"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                {resource.coverImage && (
                  <img
                    src={resource.coverImage}
                    alt={title}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full capitalize">
                      {resource.type}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full capitalize">
                      {resource.category}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {resource.author}
                    </div>
                    {resource.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(resource.publishedDate).getFullYear()}
                      </div>
                    )}
                    {resource.pages > 0 && (
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {resource.pages} pages
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Abstract */}
              {abstract && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Abstract
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {abstract}
                    </p>
                  </div>
                </div>
              )}

              {/* Table of Contents */}
              {toc && toc.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Table of Contents
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ul className="space-y-2">
                      {toc.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                          <span>{item.chapter}</span>
                          <span>Page {item.page}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Actions
              </h3>
              
              <div className="space-y-3">
                {resource.allowOnlineReading && (
                  <button
                    onClick={handleReadOnline}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="h-5 w-5" />
                    Read Online
                  </button>
                )}
                
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full px-4 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </button>
                
                <button className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>

              {/* Resource Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Resource Information
                </h4>
                
                <div className="space-y-2 text-sm">
                  {resource.publisher && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Publisher</span>
                      <span className="text-gray-900 dark:text-white">{resource.publisher}</span>
                    </div>
                  )}
                  {resource.isbn && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">ISBN</span>
                      <span className="text-gray-900 dark:text-white">{resource.isbn}</span>
                    </div>
                  )}
                  {resource.edition && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Edition</span>
                      <span className="text-gray-900 dark:text-white">{resource.edition}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">File Size</span>
                    <span className="text-gray-900 dark:text-white">{resource.fileSize || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Format</span>
                    <span className="text-gray-900 dark:text-white uppercase">{resource.fileType || 'PDF'}</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Statistics
                </h4>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">Views</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{resource.views}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">Downloads</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{resource.downloads}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600 dark:text-gray-400">Rating</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{resource.rating}/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
