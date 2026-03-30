import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useNewsEventsContent = (language = 'en') => {
  const [content, setContent] = useState({});
  const [newsItems, setNewsItems] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch page content sections
        const contentResponse = await axios.get(`${API_URL}/newsEvents/public/${language}`);
        
        // Transform array to object keyed by section
        const contentData = {};
        if (contentResponse.data.success && contentResponse.data.data) {
          contentResponse.data.data.forEach(section => {
            contentData[section.section] = section.content;
          });
        }
        
        setContent(contentData);

        // Fetch news/event items
        const itemsResponse = await axios.get(`${API_URL}/newsEventItems/public`, {
          params: { language, limit: 12 }
        });
        
        if (itemsResponse.data.success) {
          setNewsItems(itemsResponse.data.data || []);
        }

        // Fetch featured news/events
        const featuredResponse = await axios.get(`${API_URL}/newsEventItems/public/featured`, {
          params: { language, limit: 3 }
        });
        
        if (featuredResponse.data.success) {
          setFeaturedNews(featuredResponse.data.data || []);
        }

      } catch (err) {
        console.error('Error fetching news/events content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, newsItems, featuredNews, loading, error };
};

export const useNewsEventItems = (language = 'en', filters = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          language,
          ...filters
        };

        const response = await axios.get(`${API_URL}/newsEventItems/public`, { params });
        
        if (response.data.success) {
          setItems(response.data.data || []);
          setPagination({
            currentPage: response.data.currentPage || 1,
            totalPages: response.data.totalPages || 1,
            total: response.data.total || 0
          });
        }

      } catch (err) {
        console.error('Error fetching news/event items:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [language, JSON.stringify(filters)]);

  return { items, loading, error, pagination };
};

export const useNewsEventItem = (slug, language = 'en') => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/newsEventItems/public/${slug}`, {
          params: { language }
        });
        
        if (response.data.success) {
          setItem(response.data.data);
        }

      } catch (err) {
        console.error('Error fetching news/event item:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [slug, language]);

  return { item, loading, error };
};
