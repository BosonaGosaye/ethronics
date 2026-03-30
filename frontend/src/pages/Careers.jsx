import React, { useState } from 'react';
import CareersHero from '../components/CareersHero';
import JobSearch from '../components/JobSearch';
import JobListings from '../components/JobListings';
import ApplicationProcess from '../components/ApplicationProcess';
import { useLanguage } from '../contexts/LanguageContext';

const Careers = () => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks (if needed)
  const t = {
    title: 'Careers',
    description: 'Join our team'
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CareersHero />
      <JobSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <JobListings 
        searchQuery={searchQuery}
        selectedLocation={selectedLocation}
        selectedType={selectedType}
        selectedCompany={selectedCompany}
      />
      <ApplicationProcess />
    </div>
  );
};

export default Careers;