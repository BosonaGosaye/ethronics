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
      <ResearchProjects content={content.projects} selectedResearch={selectedResearch} setSelectedResearch={setSelectedResearch} language={language} />
      <WhateverYouNeed content={content.whateverYouNeed} />
      <CollaborateWithUs content={content.collaborate} />
      <CTA content={content.cta} />
      {selectedResearch && (
        <ResearchModal 
          research={selectedResearch} 
          onClose={() => setSelectedResearch(null)}
          content={content.projects}
        />
      )}
    </div>
  );
};

// Research Projects Section
const ResearchProjects = ({ content, selectedResearch, setSelectedResearch, language }) => {
  if (!content) return null;
  
  const [filter, setFilter] = useState(content.filterAll || 'All');
  
  // Get projects data from backend content
  const projectsData = content.projectsList || [];
  
  const projectsWithAssets = projectsData.map((project) => {
    const icons = {
      1: <Bot className="w-6 h-6" />,
      2: <Brain className="w-6 h-6" />,
      3: <Shield className="w-6 h-6" />,
      4: <Cpu className="w-6 h-6" />,
      5: <Link className="w-6 h-6" />,
      6: <Brain className="w-6 h-6" />
    };
    
    const imagesByProject = {
      1: {
        main: "/src/assets/Robot-replace-D--cWneY.jpg",
        gallery: [
          "/src/assets/Robot-replace-D--cWneY.jpg",
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60"
        ]
      },
      2: {
        main: "/src/assets/ai-curriculum-DbYJIUnh.jpg",
        gallery: [
          "/src/assets/ai-curriculum-DbYJIUnh.jpg",
          "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
        ]
      },
      3: {
        main: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&auto=format&fit=crop&q=60",
        gallery: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop&q=60"
        ]
      },
      4: {
        main: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&auto=format&fit=crop&q=60",
        gallery: [
          "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60",
          "/src/assets/training-xgzfTKXW.jpg",
          "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&auto=format&fit=crop&q=60"
        ]
      },
      5: {
        main: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=60",
        gallery: [
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=60",
          "/src/assets/smart-gate-BuGtJWux.jpg"
        ]
      },
      6: {
        main: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=60",
        gallery: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop&q=60",
          "/src/assets/mentor-Cib0Zqml.jpg"
        ]
      }
    };
    
    // Static data that doesn't change with language
    const staticData = {
      1: { status: "Active", duration: "2023 - 2025", team: ["Dr. Firew Abera", "Eng. Yohannes Melese", "Research Team"] },
      2: { status: "Active", duration: "2022 - 2024", team: ["Dr. Firew Abera", "AI Research Team", "Linguistics Experts"] },
      3: { status: "Research Phase", duration: "2024 - 2027", team: ["Quantum Research Team", "Cybersecurity Experts"] },
      4: { status: "Active", duration: "2023 - 2025", team: ["Manufacturing Team", "IoT Specialists", "Data Scientists"] },
      5: { status: "Pilot Phase", duration: "2024 - 2026", team: ["Blockchain Developers", "Supply Chain Experts", "Business Analysts"] },
      6: { status: "Development", duration: "2024 - 2026", team: ["Medical AI Team", "Healthcare Professionals", "Data Scientists"] }
    };
    
    return {
      ...project,
      icon: icons[project.id] || <Bot className="w-6 h-6" />,
      image: project.image || imagesByProject[project.id]?.main || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=60",
      images: project.images || imagesByProject[project.id]?.gallery || [project.image || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=60"],
      status: project.status || staticData[project.id]?.status || "Active",
      duration: project.duration || staticData[project.id]?.duration || "2024",
      team: project.team || staticData[project.id]?.team || []
    };
  });
  
  // Get categories from content
  const categories = content.categories || [content.filterAll || 'All'];
  
  const filteredProjects = filter === (content.filterAll || 'All')
    ? projectsWithAssets 
    : projectsWithAssets.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Research Phase': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pilot Phase': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Development': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status) => {
    const statusMap = content.statusMap || {};
    return statusMap[status] || status;
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
          {filteredProjects.map((project) => (
            <div
              key={project.id}
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
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        if (onImageChange) onImageChange(newIndex);
        return newIndex;
      });
    }, 5000); // Change image every 5 seconds

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

  return (
    <div className="relative h-64 rounded-xl overflow-hidden group">
      {/* Main Image */}
      <div className="relative w-full h-full">
        <img 
          src={images[currentIndex]} 
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Image Info Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">
            {currentIndex + 1} {translations.imageOf} {images.length}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Dots Indicator */}
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

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentIndex + 1) / images.length) * 100}%` 
          }}
        />
      </div>

      {/* Auto-slide indicator */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
        {translations.autoSlide}
      </div>
    </div>
  );
};

// Research Modal Component
const ResearchModal = ({ research, onClose, content }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!research) return null;

  const modalContent = content?.modal || {};
  const statusMap = content?.statusMap || {};
  
  const getStatusText = (status) => {
    return statusMap[status] || status;
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
              <img 
                src={research.images[selectedImageIndex]} 
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
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {research.title}
              </h2>
              <p className="text-purple-600 dark:text-purple-400 font-medium">
                {research.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Project Hero Image Carousel */}
          <div className="mb-8">
            <ImageCarousel 
              images={research.images || [research.image]} 
              title={research.title} 
              onImageChange={setSelectedImageIndex}
              translations={modalContent}
            />
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {(research.images || [research.image]).map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className="flex-shrink-0"
                >
                  <img 
                    src={image} 
                    alt={`${research.title} thumbnail ${index + 1}`}
                    className={`w-16 h-12 object-cover rounded-lg border-2 transition-all duration-300 ${
                      index === selectedImageIndex 
                        ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Overview */}
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
                  <span className="text-sm text-gray-700 dark:text-gray-300">{research.team.length} {modalContent.teamMembers || 'Team Members'}</span>
                </div>
              )}
              <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                research.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                research.status === 'Research Phase' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                research.status === 'Pilot Phase' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>
                {getStatusText(research.status)}
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {research.description}
            </p>
          </div>

          {/* Research Objectives */}
          {research.objectives && research.objectives.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                {modalContent.objectives || 'Research Objectives'}
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

          {/* Methodology */}
          {research.methodology && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                {modalContent.methodology || 'Methodology'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {research.methodology}
              </p>
            </div>
          )}

          {/* Expected Outcomes */}
          {research.expectedOutcomes && research.expectedOutcomes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                {modalContent.expectedOutcomes || 'Expected Outcomes'}
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

          {/* Team & Collaborators */}
          {((research.team && research.team.length > 0) || (research.collaborators && research.collaborators.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {research.team && research.team.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    {modalContent.team || 'Research Team'}
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
                    {modalContent.collaborators || 'Collaborators'}
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
          )}

          {/* Publications & Funding */}
          {((research.publications && research.publications.length > 0) || research.funding) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {research.publications && research.publications.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    {modalContent.publications || 'Publications'}
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
                    {modalContent.funding || 'Funding Sources'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {research.funding}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Whatever You Need Section
const WhateverYouNeed = ({ content }) => {
  if (!content) return null;
  
  const whateverYouNeedData = (content.items || []).map((item, index) => {
    const icons = [
      <Bot className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      <Cpu className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      <Link className="w-10 h-10 text-purple-600 dark:text-purple-400" />
    ];
    
    return {
      question: item.question,
      solution: item.solution,
      details: item.details,
      icon: icons[index] || icons[0]
    };
  });

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
          {whateverYouNeedData.map((item, index) => (
            <div key={index}>
              <NeedItem
                question={item.question}
                solution={item.solution}
                details={item.details}
                icon={item.icon}
                isReversed={index % 2 !== 0}
              />
              {index < whateverYouNeedData.length - 1 && (
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
const NeedItem = ({ question, solution, details, icon, isReversed = false }) => (
  <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 md:gap-10 py-8 md:py-12 max-w-3xl mx-auto`}>
    <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-full p-4">
      {icon}
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