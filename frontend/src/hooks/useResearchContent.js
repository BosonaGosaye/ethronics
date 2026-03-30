import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = 'http://localhost:5001/api';

export const useResearchContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch all sections
        const sections = ['hero', 'focus', 'projects', 'whateverYouNeed', 'collaborate', 'cta'];
        const promises = sections.map(section =>
          fetch(`${API_URL}/research/public/${language}/${section}`)
            .then(res => res.ok ? res.json() : Promise.reject(`Failed to fetch ${section}`))
        );

        // Also fetch research projects
        promises.push(
          fetch(`${API_URL}/research-projects/public?language=${language}`)
            .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch projects'))
        );

        const results = await Promise.all(promises);
        
        // Build content object
        const contentObj = {};
        sections.forEach((section, index) => {
          contentObj[section] = results[index].data;
        });

        // Add projects list to the projects section
        const projectsData = results[sections.length].data;
        
        // Transform projects data to match frontend expectations
        const transformedProjects = projectsData.map(project => {
          const translation = project.translations[language] || project.translations.en;
          return {
            id: project._id,
            title: translation.title,
            description: translation.description,
            objectives: translation.objectives || [],
            methodology: translation.methodology || '',
            expectedOutcomes: translation.expectedOutcomes || [],
            publications: translation.publications || [],
            funding: translation.funding || '',
            collaborators: translation.collaborators || [],
            category: project.category,
            status: project.status,
            image: project.featuredImage || (project.images && project.images[0]) || '',
            images: project.images || [],
            team: (project.teamMembers || []).map(member => member.name || member),
            duration: project.startDate && project.endDate 
              ? `${new Date(project.startDate).getFullYear()} - ${new Date(project.endDate).getFullYear()}`
              : project.startDate 
                ? `${new Date(project.startDate).getFullYear()} - Present`
                : ''
          };
        });

        // Add projects list and create status map
        if (contentObj.projects) {
          contentObj.projects.projectsList = transformedProjects;
          
          // Create status map for translations
          contentObj.projects.statusMap = {
            'Active': contentObj.projects.statusActive || 'Active',
            'Research Phase': contentObj.projects.statusResearch || 'Research Phase',
            'Pilot Phase': contentObj.projects.statusPilot || 'Pilot Phase',
            'Development': contentObj.projects.statusDevelopment || 'Development',
            'Completed': contentObj.projects.statusCompleted || 'Completed',
            'On Hold': contentObj.projects.statusOnHold || 'On Hold'
          };

          // Create categories array
          const categoriesObj = contentObj.projects.categories || {};
          contentObj.projects.categories = [
            contentObj.projects.filterAll || 'All',
            ...Object.values(categoriesObj)
          ];
        }

        setContent(contentObj);
        setError(null);
      } catch (err) {
        console.error('Error fetching research content:', err);
        setError(err.message || 'Failed to fetch content');
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
        const response = await fetch(`${API_URL}/research/public/${language}/${sectionName}`);
        
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
