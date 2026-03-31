import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useManufacturingContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch all sections
        const sections = ['hero', 'capabilities', 'products', 'sustainability', 'cta'];
        const promises = sections.map(section =>
          fetch(`${API_URL}/manufacturing/${language}/${section}`)
            .then(res => res.ok ? res.json() : Promise.reject(`Failed to fetch ${section}`))
        );

        // Also fetch manufacturing products (only published)
        promises.push(
          fetch(`${API_URL}/manufacturing-products/public?isPublished=true`)
            .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch products'))
        );

        const results = await Promise.all(promises);
        
        // Build content object
        const contentObj = {};
        sections.forEach((section, index) => {
          // After the fix, API returns data directly (not data.content)
          contentObj[section] = results[index].data || {};
        });

        // Add products list to the products section
        const productsResponse = results[sections.length];
        const productsData = productsResponse.data || [];
        
        // Transform products data to match frontend expectations
        const transformedProducts = productsData.map(product => {
          const translation = product.translations?.[language] || product.translations?.en || {};
          return {
            id: product._id,
            name: translation.name || 'Untitled Product',
            description: translation.description || '',
            detailedDescription: translation.detailedDescription || '',
            features: translation.features || [],
            applications: translation.applications || [],
            tags: translation.tags || [],
            category: product.category || 'other',
            status: product.status || 'In Development',
            progress: product.progress || 0,
            expectedLaunch: product.expectedLaunch || '',
            image: product.image || '',
            specifications: product.specifications || {},
            isFeatured: product.isFeatured || false,
            isPublished: product.isPublished !== false,
            order: product.order || 0
          };
        }).sort((a, b) => a.order - b.order); // Sort by order

        // Add products list to products section
        if (contentObj.products) {
          contentObj.products.productsList = transformedProducts;
        }

        setContent(contentObj);
        setError(null);
      } catch (err) {
        console.error('Error fetching manufacturing content:', err);
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
        const response = await fetch(`${API_URL}/manufacturing/${language}/${sectionName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${sectionName} content`);
        }

        const data = await response.json();
        // After the fix, API returns data directly (not data.content)
        setContent(data.data || {});
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
