import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useJobs = (filters = {}) => {
  const { language } = useLanguage();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // Build query string
        const params = new URLSearchParams();
        if (filters.type && filters.type !== 'all') {
          params.append('type', filters.type);
        }
        if (filters.location && filters.location !== 'all') {
          params.append('location', filters.location);
        }
        if (filters.search) {
          params.append('search', filters.search);
        }
        if (filters.sort) {
          params.append('sort', filters.sort);
        }
        
        const response = await fetch(`${API_URL}/jobs?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        
        // Transform jobs to include language-specific content
        const transformedJobs = data.data.map(job => ({
          id: job._id,
          // Multilingual fields
          title: job.translations[language]?.title || job.translations.en.title,
          description: job.translations[language]?.description || job.translations.en.description,
          requirements: job.translations[language]?.requirements || job.translations.en.requirements,
          responsibilities: job.translations[language]?.responsibilities || job.translations.en.responsibilities || [],
          qualifications: job.translations[language]?.qualifications || job.translations.en.qualifications || [],
          benefits: job.translations[language]?.benefits || job.translations.en.benefits,
          niceToHave: job.translations[language]?.niceToHave || job.translations.en.niceToHave || [],
          tags: job.translations[language]?.tags || job.translations.en.tags,
          companyDescription: job.translations[language]?.companyDescription || job.translations.en.companyDescription || '',
          applicationProcess: job.translations[language]?.applicationProcess || job.translations.en.applicationProcess || '',
          interviewProcess: job.translations[language]?.interviewProcess || job.translations.en.interviewProcess || '',
          bonusInfo: job.translations[language]?.bonusInfo || job.translations.en.bonusInfo || '',
          
          // Company fields
          company: job.company,
          companyLogo: job.companyLogo,
          companyWebsite: job.companyWebsite || '',
          companySize: job.companySize || '',
          companyIndustry: job.companyIndustry || '',
          
          // Job details
          location: job.location,
          type: job.type,
          workMode: job.workMode || 'onsite',
          category: job.category,
          experienceLevel: job.experienceLevel || 'mid',
          yearsOfExperience: job.yearsOfExperience || '',
          educationLevel: job.educationLevel || 'bachelor',
          
          // Compensation
          salary: job.salary,
          salaryMin: job.salaryMin || 0,
          salaryMax: job.salaryMax || 0,
          salaryCurrency: job.salaryCurrency || 'USD',
          salaryPeriod: job.salaryPeriod || 'yearly',
          
          // Job specifics
          numberOfPositions: job.numberOfPositions || 1,
          startDate: job.startDate || null,
          duration: job.duration || '',
          
          // Benefits
          travelRequired: job.travelRequired || false,
          relocationAssistance: job.relocationAssistance || false,
          visaSponsorship: job.visaSponsorship || false,
          
          // Contact
          contactEmail: job.contactEmail || '',
          contactPhone: job.contactPhone || '',
          contactPerson: job.contactPerson || '',
          
          // Status
          featured: job.featured,
          status: job.status,
          deadline: job.deadline,
          postedDate: job.postedDate,
          applicants: job.applicantCount,
          rating: job.rating
        }));
        
        setJobs(transformedJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [language, filters.type, filters.location, filters.search, filters.sort]);

  return { jobs, loading, error };
};

export const useJob = (jobId) => {
  const { language } = useLanguage();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/jobs/${jobId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }

        const data = await response.json();
        const jobData = data.data;
        
        // Transform job to include language-specific content
        const transformedJob = {
          id: jobData._id,
          // Multilingual fields
          title: jobData.translations[language]?.title || jobData.translations.en.title,
          description: jobData.translations[language]?.description || jobData.translations.en.description,
          requirements: jobData.translations[language]?.requirements || jobData.translations.en.requirements,
          responsibilities: jobData.translations[language]?.responsibilities || jobData.translations.en.responsibilities || [],
          qualifications: jobData.translations[language]?.qualifications || jobData.translations.en.qualifications || [],
          benefits: jobData.translations[language]?.benefits || jobData.translations.en.benefits,
          niceToHave: jobData.translations[language]?.niceToHave || jobData.translations.en.niceToHave || [],
          tags: jobData.translations[language]?.tags || jobData.translations.en.tags,
          companyDescription: jobData.translations[language]?.companyDescription || jobData.translations.en.companyDescription || '',
          applicationProcess: jobData.translations[language]?.applicationProcess || jobData.translations.en.applicationProcess || '',
          interviewProcess: jobData.translations[language]?.interviewProcess || jobData.translations.en.interviewProcess || '',
          bonusInfo: jobData.translations[language]?.bonusInfo || jobData.translations.en.bonusInfo || '',
          
          // Company fields
          company: jobData.company,
          companyLogo: jobData.companyLogo,
          companyWebsite: jobData.companyWebsite || '',
          companySize: jobData.companySize || '',
          companyIndustry: jobData.companyIndustry || '',
          
          // Job details
          location: jobData.location,
          type: jobData.type,
          workMode: jobData.workMode || 'onsite',
          category: jobData.category,
          experienceLevel: jobData.experienceLevel || 'mid',
          yearsOfExperience: jobData.yearsOfExperience || '',
          educationLevel: jobData.educationLevel || 'bachelor',
          
          // Compensation
          salary: jobData.salary,
          salaryMin: jobData.salaryMin || 0,
          salaryMax: jobData.salaryMax || 0,
          salaryCurrency: jobData.salaryCurrency || 'USD',
          salaryPeriod: jobData.salaryPeriod || 'yearly',
          
          // Job specifics
          numberOfPositions: jobData.numberOfPositions || 1,
          startDate: jobData.startDate || null,
          duration: jobData.duration || '',
          
          // Benefits
          travelRequired: jobData.travelRequired || false,
          relocationAssistance: jobData.relocationAssistance || false,
          visaSponsorship: jobData.visaSponsorship || false,
          
          // Contact
          contactEmail: jobData.contactEmail || '',
          contactPhone: jobData.contactPhone || '',
          contactPerson: jobData.contactPerson || '',
          
          // Status
          featured: jobData.featured,
          status: jobData.status,
          deadline: jobData.deadline,
          postedDate: jobData.postedDate,
          applicants: jobData.applicantCount,
          rating: jobData.rating
        };
        
        setJob(transformedJob);
        setError(null);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.message);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, language]);

  return { job, loading, error };
};
