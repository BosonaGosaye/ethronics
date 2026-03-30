import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Bookmark, 
  ExternalLink,
  Calendar,
  Users,
  Star,
  Filter,
  Grid,
  List,
  Briefcase
} from 'lucide-react';
import JobDetailModal from './JobDetailModal';
import JobApplicationModal from './JobApplicationModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useJobs } from '../hooks/useJobs';
import { useSectionContent } from '../hooks/useCareersContent';

const JobListings = ({ 
  searchQuery, 
  selectedLocation, 
  selectedType, 
  selectedCompany 
}) => {
  const { language } = useLanguage();
  const { content, loading: contentLoading } = useSectionContent('listings');
  
  const [viewMode, setViewMode] = useState('grid');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [sortBy, setSortBy] = useState('-postedDate');

  // Fetch jobs from backend
  const jobsResult = useJobs({
    type: selectedType,
    location: selectedLocation,
    search: searchQuery,
    sort: sortBy
  });

  const loading = contentLoading || (jobsResult?.loading ?? true);
  const backendJobs = jobsResult?.jobs ?? [];
  const error = jobsResult?.error ?? null;

  // Filter jobs based on company filter (frontend filter)
  const jobs = backendJobs.filter(job => {
    if (selectedCompany === 'all') return true;
    if (selectedCompany === 'ethronics') {
      return job.company.toLowerCase().includes('ethronics');
    }
    return true;
  });

  const filteredJobs = jobs;

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(false);
    setIsApplicationModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const handleApplicationSuccess = () => {
    alert('Application submitted successfully!');
  };

  const toggleSaveJob = (jobId, e) => {
    e.stopPropagation();
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">{content?.loading || 'Loading jobs...'}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{content?.error || 'Error loading jobs'}: {error}</p>
          </div>
        )}

        {/* Results Header */}
        {!loading && content && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {content?.title || 'Available Positions'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {content?.found || 'Found'} {filteredJobs.length} {content?.jobsMatching || 'jobs'}
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              {content?.sortBy && (
                <select 
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="-postedDate">{content.sortBy.label} {content.sortBy.newest}</option>
                  <option value="salary">{content.sortBy.label} {content.sortBy.salary}</option>
                  <option value="company">{content.sortBy.label} {content.sortBy.company}</option>
                  <option value="deadline">{content.sortBy.label} {content.sortBy.deadline}</option>
                </select>
              )}
            </div>
          </div>
        )}

        {/* Job Listings */}
        {!loading && filteredJobs.length > 0 && content && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
          {filteredJobs.map((job) => {
            const isSaved = savedJobs.has(job.id);
            
            if (viewMode === 'list') {
              return (
                <div 
                  key={job.id} 
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-transparent hover:border-purple-500"
                  onClick={() => handleJobClick(job)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                              {job.title}
                              {job.featured && content && (
                                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                                  {content.featured}
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {job.company}
                            </p>
                          </div>
                          
                          <button 
                            onClick={(e) => toggleSaveJob(job.id, e)}
                            className={`p-2 rounded-lg transition-colors ${
                              isSaved 
                                ? 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400' 
                                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900'
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{job.applicants} {content ? content.applicants : 'applicants'}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                          {job.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {job.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>{content ? content.deadline : 'Deadline'} {formatDate(job.deadline)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            return (
              <div 
                key={job.id} 
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {job.featured && content && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                          {content.featured}
                        </span>
                      )}
                      <button 
                        onClick={(e) => toggleSaveJob(job.id, e)}
                        className={`p-2 rounded-lg transition-colors ${
                          isSaved 
                            ? 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400' 
                            : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{job.applicants} {content ? content.applicants : 'applicants'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{job.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{content ? content.deadline : 'Deadline'} {formatDate(job.deadline)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Load More */}
        {!loading && filteredJobs.length > 0 && content && content.loadMore && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {content?.loadMore || 'Load More'}
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No jobs available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for new opportunities
            </p>
          </div>
        )}
      </div>

      {/* Job Modals */}
      <JobDetailModal 
        job={selectedJob}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onApply={handleApplyClick}
      />
      
      <JobApplicationModal
        job={selectedJob}
        isOpen={isApplicationModalOpen}
        onClose={closeApplicationModal}
        onSuccess={handleApplicationSuccess}
      />
    </section>
  );
};

export default JobListings;