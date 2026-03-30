import React, { useState, useEffect, useRef, memo } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DynamicIcon from './DynamicIcon';

// Feature Card Component
const FeatureCard = memo(({ feature, index, activeIndex, setActiveIndex, isMobile }) => {
  const { language } = useLanguage();
  const isActive = activeIndex === index;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
        setIsHovered(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveIndex]);

  const handleClick = () => {
    setActiveIndex(isActive ? null : index);
    if (!isActive) setIsHovered(false);
  };

  const handleLearnMore = (e) => {
    e.stopPropagation();
    console.log(`Clicked Learn More for ${feature.title}`);
  };

  return (
    <>
      {/* Feature Card */}
      <div
        className={`ethronics-feature-card relative p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 group ${
          isActive
            ? 'border-4 border-gradient-to-r from-purple-600 to-indigo-600 scale-105 shadow-lg z-10'
            : 'hover:border-4 hover:border-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br dark:hover:from-purple-900/50 dark:hover:to-indigo-900/50'
        }`}
        tabIndex={0}
        role="button"
        aria-label={`Feature: ${feature.title}, hover or click for more details`}
        aria-describedby={`feature-desc-${index}`}
        aria-expanded={isActive}
        aria-controls={`feature-modal-${index}`}
        aria-selected={isActive}
        onMouseEnter={() => !isMobile && (setIsHovered(true), setActiveIndex(index))}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onFocus={() => !isMobile && setActiveIndex(index)}
        onBlur={() => !isMobile && !isHovered && setActiveIndex(null)}
        onClick={isMobile ? handleClick : undefined}
      >
        {/* Icon */}
        <div className="relative mb-3 mx-auto w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full text-white group-hover:animate-pulse">
          <DynamicIcon iconName={feature.icon} className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 text-center animate-fade-in">
          {feature.title}
        </h3>

        {/* Description */}
        <p
          id={`feature-desc-${index}`}
          className="text-sm text-gray-600 dark:text-gray-300 truncate animate-fade-in"
        >
          {feature.shortDescription || feature.description}...
        </p>
      </div>

      {/* Modal */}
      <div
        id={`feature-modal-${index}`}
        className={`fixed top-0 left-0 z-[100] w-full max-w-full h-full lg:max-w-lg lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-2xl lg:h-auto pointer-events-auto transition-all duration-500 ease-out ${
          isActive && (isHovered || isMobile)
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 lg:translate-x-0 lg:translate-y-full'
        } backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-t-4 lg:border-4 border-purple-600 shadow-2xl`}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${feature.title}`}
        tabIndex={-1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isMobile) setActiveIndex(null);
        }}
      >
        <div className="p-6 sm:p-8 max-w-full pointer-events-auto">
          {/* Modal Header */}
          <div className="flex items-center mb-6">
            <div className="mr-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full text-white animate-pulse">
              <DynamicIcon iconName={feature.icon} className="w-6 h-6" />
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              {feature.title}
            </h4>
            <button
              onClick={() => {
                setActiveIndex(null);
                setIsHovered(false);
              }}
              className="ml-auto p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-purple-500 hover:text-white transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Content */}
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            {feature.details || feature.description}
          </p>

          {/* Learn More Button */}
          <a
            href={feature.link || `/research/${index}`}
            className="inline-block px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-400"
            aria-label={`Learn more about ${feature.title}`}
            tabIndex={0}
            onClick={handleLearnMore}
            data-clickable="true"
          >
            {feature.learnMoreText || 'Learn More'}
          </a>
        </div>
      </div>
    </>
  );
});

// Main Features Component
const Features = ({ content }) => {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Return null or loading state if no content
  if (!content) {
    return (
      <section className="py-10 sm:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640 || /Mobi|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.ethronics-feature-card').forEach((card, index) => {
              card.classList.add('ethronics-fade-up');
              card.style.animationDelay = `${index * 0.15}s`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Features data from backend
  const features = (content.items || []).map((item, index) => ({
    icon: item.icon || 'Lightbulb', // Use icon name from backend
    title: item.title,
    description: item.description,
    learnMoreText: content.learnMore || 'Learn More'
  }));

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-12 bg-gray-50 dark:bg-gray-900 max-w-full overflow-x-hidden"
      role="region"
      aria-label="Research and Innovation features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-purple-500">
              {content.title || 'Research & Innovation'}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle || ''}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-full">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes ethronics-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ethronics-fade-up {
          animation: ethronics-fade-up 0.6s ease-out forwards;
        }
        @keyframes modal-icon-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: modal-icon-pulse 2s infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Features;