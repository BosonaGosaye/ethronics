import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useCareersContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch all sections for the careers page
        const sections = ['hero', 'search', 'listings', 'process'];
        const promises = sections.map(section =>
          fetch(`${API_URL}/careers/${language}/${section}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
        );
        
        const results = await Promise.all(promises);
        
        // Build content object
        const contentData = {};
        sections.forEach((section, index) => {
          if (results[index]?.success) {
            contentData[section] = results[index].data;
          }
        });
        
        setContent(contentData);
        setError(null);
      } catch (err) {
        console.error('Error fetching careers content:', err);
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
        
        // Fetch with error handling to prevent console spam
        const response = await fetch(`${API_URL}/careers/${language}/${sectionName}`)
          .catch(() => ({ ok: false, status: 404 }));
        
        if (!response.ok) {
          // Silently handle 404 - content not created yet in admin
          if (response.status === 404) {
            setContent(null);
            setError(null);
            setLoading(false);
            return;
          }
          throw new Error(`Failed to fetch ${sectionName} content`);
        }

        const data = await response.json();
        setContent(data.data);
        setError(null);
      } catch (err) {
        // Silently handle errors - content not available
        setContent(null);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [language, sectionName]);

  return { content, loading, error };
};
