import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useBlogContent = (language = 'en') => {
  const [content, setContent] = useState({});
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blog sections
        const sections = ['hero', 'filter', 'featured', 'blogGrid', 'sidebar'];
        const sectionPromises = sections.map(section =>
          axios.get(`${API_URL}/blog/${language}/${section}`)
            .then(res => ({ section, data: res.data.data }))
            .catch(err => {
              console.warn(`Failed to fetch ${section}:`, err.message);
              return { section, data: null };
            })
        );

        // Fetch blog posts
        const postsPromise = axios.get(`${API_URL}/blog-posts/public`)
          .then(res => res.data)
          .catch(err => {
            console.warn('Failed to fetch blog posts:', err.message);
            return [];
          });

        // Fetch blog statistics
        const statsPromise = axios.get(`${API_URL}/blog-posts/public/stats`)
          .then(res => res.data.data)
          .catch(err => {
            console.warn('Failed to fetch blog stats:', err.message);
            return null;
          });

        const [sectionResults, postsData, statsData] = await Promise.all([
          Promise.all(sectionPromises),
          postsPromise,
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
        setPosts(postsData);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching blog content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [language]);

  return { content, posts, stats, loading, error };
};
