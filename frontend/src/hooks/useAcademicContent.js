import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useAcademicContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Use the new section-based API
        const response = await fetch(`${API_URL}/academic-sections/${language}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }

        const result = await response.json();
        
        // API returns { success: true, language: 'en', data: { hero: {...}, programs: {...} } }
        setContent(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching academic content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, loading, error };
};
