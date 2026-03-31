import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useHomeContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/home/${language}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }

        const data = await response.json();
        
        // API already returns data as an object with sections as keys
        setContent(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching home content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, loading, error };
};

export const useSectionContent = (sectionName) => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/home/${language}/${sectionName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${sectionName} content`);
        }

        const data = await response.json();
        setContent(data.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${sectionName} content:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [language, sectionName]);

  return { content, loading, error };
};
