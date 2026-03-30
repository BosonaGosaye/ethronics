import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAboutContent = (language = 'en') => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all about sections for the language
        const response = await axios.get(`${API_URL}/about/${language}`);
        
        setContent(response.data.data);
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, [language]);

  return { content, loading, error };
};
