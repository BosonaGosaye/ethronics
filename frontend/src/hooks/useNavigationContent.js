import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useNavigationContent = (language = 'en') => {
  const [content, setContent] = useState({
    contactDetails: {},
    contactLocation: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only fetch contact details and location from backend
        const [contactDetailsRes, contactLocationRes] = await Promise.all([
          axios.get(`${API_URL}/contact/${language}/details`).catch(() => ({ data: { data: {} } })),
          axios.get(`${API_URL}/contact/${language}/location`).catch(() => ({ data: { data: {} } }))
        ]);

        setContent({
          contactDetails: contactDetailsRes?.data?.data || {},
          contactLocation: contactLocationRes?.data?.data || {}
        });
      } catch (err) {
        // Silently handle errors since we have translation fallbacks
        console.debug('Contact content not available, using fallbacks');
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, loading, error };
};
