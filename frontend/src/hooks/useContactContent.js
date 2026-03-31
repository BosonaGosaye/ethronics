import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useContactContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch all sections including categories
        const sections = ['hero', 'form', 'details', 'location', 'categories'];
        const promises = sections.map(section =>
          fetch(`${API_URL}/contact/${language}/${section}`)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Failed to fetch ${section}`);
              }
              return res.json();
            })
        );

        const results = await Promise.all(promises);
        
        // Build content object
        const contentObj = {};
        sections.forEach((section, index) => {
          contentObj[section] = results[index].data;
        });

        // Merge categories into form content for easier access
        if (contentObj.form && contentObj.categories) {
          contentObj.form.categories = contentObj.categories;
        }

        setContent(contentObj);
        setError(null);
      } catch (err) {
        console.error('Error fetching contact content:', err);
        setError(err.message || 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, loading, error };
};

export const submitContactMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_URL}/contact-messages/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit message');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
};
