import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const BASE_URL = API_URL.includes('/api') ? API_URL : `${API_URL}/api`;

export const useRegisterContent = (language = 'en') => {
  const [content, setContent] = useState({});
  const [videos, setVideos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisterContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Register sections
        const sections = ['hero', 'objective', 'highlights', 'form', 'faq', 'gallery', 'nextSteps', 'cta'];
        const sectionPromises = sections.map(section =>
          axios.get(`${BASE_URL}/register/public/${language}/${section}`)
            .then(res => ({ 
              section, 
              // After the fix, API returns data directly (not data.content)
              data: res.data.data || {} 
            }))
            .catch(err => {
              console.warn(`Failed to fetch ${section}:`, err.message);
              return { section, data: {} };
            })
        );

        // Fetch training videos
        const videosPromise = axios.get(`${BASE_URL}/training-videos/public`)
          .then(res => res.data.data)
          .catch(err => {
            console.warn('Failed to fetch training videos:', err.message);
            return [];
          });

        // Fetch student projects
        const projectsPromise = axios.get(`${BASE_URL}/student-projects/public`)
          .then(res => res.data.data)
          .catch(err => {
            console.warn('Failed to fetch student projects:', err.message);
            return [];
          });

        const [sectionResults, videosData, projectsData] = await Promise.all([
          Promise.all(sectionPromises),
          videosPromise,
          projectsPromise
        ]);

        // Organize content by section
        const organizedContent = {};
        sectionResults.forEach(({ section, data }) => {
          if (data) {
            organizedContent[section] = data;
          }
        });

        setContent(organizedContent);
        setVideos(videosData);
        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching Register content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisterContent();
  }, [language]);

  return { content, videos, projects, loading, error };
};
