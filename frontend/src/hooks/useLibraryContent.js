import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useLibraryContent = (language) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all library sections
        const sections = [
          'quickAccess',
          'hero',
          'search',
          'categories',
          'resources',
          'stats',
          'digitalServices',
          'modal'
        ];

        const promises = sections.map(section =>
          axios.get(`${API_URL}/library/${language}/${section}`)
            .then(res => ({ section, data: res.data.data }))
            .catch(err => ({ section, data: null, error: err.message }))
        );

        const results = await Promise.all(promises);

        const contentData = {};
        results.forEach(({ section, data }) => {
          if (data) {
            contentData[section] = data;
          }
        });

        setContent(contentData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching library content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchContent();
    }
  }, [language]);

  return { content, loading, error };
};

export const useLibraryResources = (language, filters = {}) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build params object, excluding undefined values
        const params = new URLSearchParams();
        params.append('language', language);
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value);
          }
        });

        const response = await axios.get(`${API_URL}/library-resources/public?${params}`);

        if (response.data.success) {
          // Transform backend data to match frontend expectations
          const transformedResources = response.data.data.map(resource => ({
            id: resource._id,
            _id: resource._id,
            title: resource.title, // Keep as multilingual object {en, am, om}
            author: resource.author,
            description: resource.description, // Keep as multilingual object {en, am, om}
            abstract: resource.abstract, // Keep as multilingual object {en, am, om}
            type: resource.type,
            category: resource.category,
            accessType: resource.accessType,
            tags: resource.tags || [],
            rating: resource.rating || 0,
            downloads: resource.downloads || 0,
            views: resource.views || 0,
            coverImage: resource.coverImage,
            fileUrl: resource.fileUrl,
            fileSize: resource.fileSize,
            fileType: resource.fileType,
            language: resource.language,
            publishedDate: resource.publishedDate,
            isFeatured: resource.isFeatured,
            relatedResources: resource.relatedResources || [],
            tableOfContents: resource.tableOfContents || [],
            allowOnlineReading: resource.allowOnlineReading,
            publisher: resource.publisher,
            isbn: resource.isbn,
            doi: resource.doi,
            pages: resource.pages,
            edition: resource.edition
          }));
          
          setResources(transformedResources);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching library resources:', err);
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchResources();
    }
  }, [language, JSON.stringify(filters)]);

  return { resources, loading, error, pagination };
};

export const useLibraryStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/library-resources/public?limit=0`);

        if (response.data.success) {
          // Calculate stats from the response
          const total = response.data.pagination.total;
          setStats({
            totalResources: total,
            totalViews: 0, // These would need to be calculated server-side
            totalDownloads: 0,
            activeUsers: 0
          });
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching library stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
