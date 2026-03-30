import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useFAQContent = (language = 'en') => {
  const [content, setContent] = useState({});
  const [faqItems, setFaqItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch FAQ sections (hero, search, contact)
        const sections = ['hero', 'search', 'contact'];
        const sectionPromises = sections.map(section =>
          axios.get(`${API_URL}/faq/${language}/${section}`)
            .then(res => ({ section, data: res.data.data }))
            .catch(err => {
              console.warn(`Failed to fetch ${section}:`, err.message);
              return { section, data: null };
            })
        );

        // Fetch published FAQ items
        const itemsPromise = axios.get(`${API_URL}/faq-items/public`, {
          params: { language }
        })
          .then(res => res.data.data || [])
          .catch(err => {
            console.warn('Failed to fetch FAQ items:', err.message);
            return [];
          });

        // Fetch FAQ statistics
        const statsPromise = axios.get(`${API_URL}/faq-items/statistics`)
          .then(res => res.data.data)
          .catch(err => {
            console.warn('Failed to fetch FAQ statistics:', err.message);
            return null;
          });

        const [sectionResults, itemsData, statsData] = await Promise.all([
          Promise.all(sectionPromises),
          itemsPromise,
          statsPromise
        ]);

        // Organize content by section
        const organizedContent = {};
        sectionResults.forEach(({ section, data }) => {
          if (data) {
            organizedContent[section] = data;
          }
        });

        setContent(organizedContent);
        setFaqItems(itemsData);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching FAQ content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQContent();
  }, [language]);

  return { content, faqItems, stats, loading, error };
};
