import { useEffect, useState } from 'react';
import ResearchHero from '../components/ResearchHero';
import ResearchFocus from '../components/ResearchFocus';
import CTA from '../components/CTA';
import { Bot, Brain, Shield, Cpu, Link, X, Calendar, Users, Target, ChevronRight, FileText, Award, Lightbulb, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useResearchContent } from '../hooks/useResearchContent';

const Research = () => {
  const [selectedResearch, setSelectedResearch] = useState(null);
  const { language } = useLanguage();
  const { content, loading, error } = useResearchContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading content: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ResearchHero content={content.hero} />
      <ResearchFocus content={content.focus} />
      <ResearchProjects content={content.projects} selectedResearch={selectedResearch} setSelectedResearch={setSelectedResearch} />
      <WhateverYouNeed content={content.whateverYouNeed} />
      <CollaborateWithUs content={content.collaborate} />
      <CTA content={content.cta} />
      {selectedResearch && (
        <ResearchModal 
          research={selectedResearch} 
          onClose={() => setSelectedResearch(null)} 
        />
      )}
    </div>
  );
};

// Research Projects Section
const ResearchProjects = ({ content, selectedResearch, setSelectedResearch }) => {
  if (!content) return null;
  
  const [filter, setFilter] = useState(content.filterAll || 'All');
  
  // Get projects from backend - use projectsList which contains actual research projects with images
  const projects = content.projectsList || [];
  
  // Map projects with icons based on category
  const projectsWithAssets = projects.map((project) => {
    const icons = {
      'Robotics & AI': <Bot className="w-6 h-6" />,
      'AI & Machine Learning': <Brain className="w-6 h-6" />,
      'Quantum Computing & Security': <Shield className="w-6 h-6" />,
      'Industrial IoT & Automation': <Cpu className="w-6 h-6" />,
      'Blockchain & Distributed Systems': <Link className="w-6 h-6" />,
      'Healthcare AI': <Brain className="w-6 h-6" />
    };
    
    return {
      ...project,
      icon: icons[project.category] || <Bot className="w-6 h-6" />
    };
  });
  
  const categories = content.categories || [];
  
  const filteredProjects = filter === content.filterAll 
    ? projectsWithAssets 
    : projectsWithAssets.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    const statusMap = content.statusColors || {};
    return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getStatusText = (status) => {
    const statusTexts = content.statusTexts || {};
    return statusTexts[status] || status;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedResearch(project)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white">
                    {project.icon}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-3 font-medium">
                  {project.category}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.duration}
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images, title, onImageChange, translations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // Don't auto-slide if only one image
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        if (onImageChange) onImageChange(newIndex);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, onImageChange]);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (onImageChange) onImageChange(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (onImageChange) onImageChange(newIndex);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
    if (onImageChange) onImageChange(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
      <div className="relative w-full h-full">
        <img 
          src={images[currentIndex]} 
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          {images.length > 1 && (
            <p className="text-sm opacity-90">
              {currentIndex + 1} {translations.imageOf} {images.length}
            </p>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 right-4 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
            <div 
              className="h-full bg-white transition-all duration-300 ease-linear"
              style={{ 
                width: `${((currentIndex + 1) / images.length) * 100}%` 
              }}
            />
          </div>

          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            {translations.autoSlide}
          </div>
        </>
      )}
    </div>
  );
};

// Research Modal Component
const ResearchModal = ({ research, onClose }) => {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!research) return null;

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Get translations for modal UI
  const translations = {
    imageOf: language === 'am' ? 'ከ' : language === 'om' ? 'keessaa' : 'of',
    autoSlide: language === 'am' ? 'ራስ-ሰር ተንሸራታች' : language === 'om' ? 'Ofumaan Sochii' : 'Auto-slide',
    objectives: language === 'am' ? 'ዓላማዎች' : language === 'om' ? 'Kaayyolee' : 'Objectives',
    methodology: language === 'am' ? 'ዘዴ' : language === 'om' ? 'Mala' : 'Methodology',
    expectedOutcomes: language === 'am' ? 'የሚጠበቁ ውጤቶች' : language === 'om' ? 'Bu\'uuraalee Eegaman' : 'Expected Outcomes',
    team: language === 'am' ? 'ቡድን' : language === 'om' ? 'Garee' : 'Team',
    teamMembers: language === 'am' ? 'የቡድን አባላት' : language === 'om' ? 'Miseensota Garee' : 'Team Members',
    collaborators: language === 'am' ? 'አጋሮች' : language === 'om' ? 'Waliigaltee' : 'Collaborators',
    publications: language === 'am' ? 'ህትመቶች' : language === 'om' ? 'Maxxansaalee' : 'Publications',
    funding: language === 'am' ? 'የገንዘብ ድጋፍ' : language === 'om' ? 'Maallaqaa' : 'Funding'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
              <img 
                src={research.images?.[selectedImageIndex] || research.image} 
                alt={research.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  {research.icon}
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                {research.title}
              </h2>
              <p className="text-purple-600 dark:text-purple-400 font-medium text-sm md:text-base">
                {research.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {research.images && research.images.length > 0 && (
            <div className="mb-8">
              <ImageCarousel 
                images={research.images} 
                title={research.title} 
                onImageChange={setSelectedImageIndex}
                translations={translations}
              />
              
              {research.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {research.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className="flex-shrink-0"
                    >
                      <img 
                        src={image} 
                        alt={`${research.title} thumbnail ${index + 1}`}
                        className={`w-20 h-16 object-cover rounded-lg border-2 transition-all duration-300 ${
                          index === selectedImageIndex 
                            ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              {research.duration && (
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{research.duration}</span>
                </div>
              )}
              {research.team && research.team.length > 0 && (
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <Users className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {research.team.length} {translations.teamMembers}
                  </span>
                </div>
              )}
              {research.status && (
                <div className="px-3 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {research.status}
                </div>
              )}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {research.description}
            </p>
          </div>

          {research.objectives && research.objectives.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                {translations.objectives}
              </h3>
              <ul className="space-y-2">
                {research.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {research.methodology && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                {translations.methodology}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {research.methodology}
              </p>
            </div>
          )}

          {research.expectedOutcomes && research.expectedOutcomes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                {translations.expectedOutcomes}
              </h3>
              <ul className="space-y-2">
                {research.expectedOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {research.team && research.team.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  {translations.team}
                </h3>
                <ul className="space-y-2">
                  {research.team.map((member, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      • {member}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {research.collaborators && research.collaborators.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {translations.collaborators}
                </h3>
                <ul className="space-y-2">
                  {research.collaborators.map((collaborator, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      • {collaborator}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {research.publications && research.publications.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  {translations.publications}
                </h3>
                <ul className="space-y-2">
                  {research.publications.map((publication, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                      • {publication}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {research.funding && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {translations.funding}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {research.funding}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Whatever You Need Section
const WhateverYouNeed = ({ content }) => {
  if (!content) return null;
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="relative">
          {(content.items || []).map((item, index) => (
            <div key={index}>
              <NeedItem
                question={item.question}
                solution={item.solution}
                details={item.details}
                icon={item.icon}
                isReversed={index % 2 !== 0}
              />
              {index < content.items.length - 1 && (
                <div className="relative my-4">
                  <svg
                    className="w-full h-8 text-purple-200 dark:text-purple-900"
                    fill="none"
                    viewBox="0 0 1440 40"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 20 Q 360 40, 720 20 T 1440 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {content.footer}
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            {content.button}
          </a>
        </div>
      </div>
    </section>
  );
};

// Individual Need Item Component
const NeedItem = ({ question, solution, details, icon, isReversed = false }) => {
  const iconMap = {
    'Bot': <Bot className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
    'Cpu': <Cpu className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
    'Brain': <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
    'Shield': <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
    'Link': <Link className="w-10 h-10 text-purple-600 dark:text-purple-400" />
  };

  return (
    <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 md:gap-10 py-8 md:py-12 max-w-3xl mx-auto`}>
      <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-full p-4">
        {iconMap[icon] || <Bot className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {question}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-medium mb-2">
          {solution}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          {details}
        </p>
      </div>
    </div>
  );
};

// Collaborate With Us Section
const CollaborateWithUs = ({ content }) => {
  if (!content) return null;
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {content.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {content.subtitle}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {(content.cards || []).map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {card.description}
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                {card.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
