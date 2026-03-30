import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Wrench, Brain, Cpu, ChevronDown, Clock, BookOpen, X } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

// Program Modal Component
const ProgramModal = ({ program, onClose, content }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleExplore = (e) => {
    e.preventDefault();
    alert(content.exploreAlert);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 dark:bg-black/70 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${program.name}`}
      tabIndex={-1}
    >
      <div className="w-full max-w-lg bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-[0_0_20px_rgba(147,51,234,0.3)] dark:shadow-[0_0_20px_rgba(80,200,255,0.5)] p-6 m-4 animate-slide-up">
        <div className="flex items-center mb-6">
          <div className="mr-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full text-white animate-pulse">
            <BookOpen className="h-6 w-6" />
          </div>
          <h4 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-500 dark:to-cyan-500">
            {program.name}
          </h4>
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-full bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-white hover:bg-cyan-500 hover:text-white dark:hover:text-gray-900 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          {program.duration}
        </div>
        
        <p className="text-base text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
          {program.description}
        </p>
        
        <div className="mb-6">
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{content.keyHighlights}</h5>
          <ul className="space-y-2">
            {program.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                <BookOpen className="w-3 h-3 mr-2 text-cyan-600 dark:text-cyan-500" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={handleExplore}
          className="inline-block px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400"
          aria-label={`Explore ${program.name}`}
        >
          {content.exploreButton}
        </button>
      </div>
    </div>
  );
};

const ProgramsSection = ({ content }) => {
  const sectionRef = useRef(null);
  const [expandedLevel, setExpandedLevel] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showHint, setShowHint] = useState(true);

  if (!content) return null;

  const defaultIcons = {
    tvet: <Wrench className="w-8 h-8" />,
    undergraduate: <GraduationCap className="w-8 h-8" />,
    postgrad: <Brain className="w-8 h-8" />,
    professional: <Cpu className="w-8 h-8" />
  };

  // Build academic programs from content
  const academicPrograms = Object.entries(content.levels).map(([key, level]) => ({
    level: level.name,
    icon: level.icon ? <DynamicIcon name={level.icon} className="w-8 h-8" /> : defaultIcons[key],
    description: level.description,
    programs: level.programs
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.program-card').forEach((card, index) => {
              card.classList.add('animate-slide-in');
              card.style.animationDelay = `${index * 0.1}s`;
            });
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
  }, [expandedLevel]);

  const toggleLevel = (index) => {
    setExpandedLevel(expandedLevel === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      role="region"
      aria-label="Explore Our Programs"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-1 h-1 bg-purple-400/50 dark:bg-white/50 rounded-full absolute top-10 left-20 animate-twinkle"></div>
        <div className="w-1 h-1 bg-purple-400/50 dark:bg-white/50 rounded-full absolute top-40 right-30 animate-twinkle delay-200"></div>
        <div className="w-1 h-1 bg-purple-400/50 dark:bg-white/50 rounded-full absolute bottom-20 left-40 animate-twinkle delay-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-500 dark:to-cyan-500 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {academicPrograms.map((level, levelIndex) => (
            <div
              key={levelIndex}
              className="bg-white/80 dark:bg-gray-800/30 rounded-2xl shadow-lg dark:shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-gray-200 dark:border-transparent"
            >
              <button
                className={`w-full p-4 flex items-center justify-between text-left transition-all duration-500 rounded-2xl ${
                  expandedLevel === levelIndex
                    ? 'bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-500/20 dark:to-cyan-500/20 shadow-lg dark:shadow-[0_0_15px_rgba(80,200,255,0.3)]'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => toggleLevel(levelIndex)}
                aria-expanded={expandedLevel === levelIndex}
                aria-controls={`level-programs-${levelIndex}`}
                aria-label={`Toggle ${level.level} programs`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full text-white mr-4 animate-pulse">
                    {React.cloneElement(level.icon, { className: "h-6 w-6" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {level.level}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {level.description}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 ${
                    expandedLevel === levelIndex ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`level-programs-${levelIndex}`}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 transition-all duration-500 ease-in-out ${
                  expandedLevel === levelIndex
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                {level.programs.map((program, programIndex) => (
                  <div
                    key={programIndex}
                    className="program-card bg-white dark:bg-gray-800/50 rounded-xl shadow-md dark:shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(80,200,255,0.5)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400 group relative cursor-pointer border border-gray-200 dark:border-transparent"
                    role="button"
                    tabIndex={0}
                    aria-label={`Learn more about ${program.name}`}
                    aria-describedby={`program-desc-${levelIndex}-${programIndex}`}
                    onClick={() => setSelectedProgram(program)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedProgram(program)}
                  >
                    <div className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full text-white group-hover:animate-pulse mr-3">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          {program.name}
                        </h4>
                      </div>
                      <div className="flex items-center text-xs text-cyan-600 dark:text-cyan-400 mb-2">
                        <Clock className="w-3 h-3 mr-2" />
                        {program.duration}
                      </div>
                      <p
                        id={`program-desc-${levelIndex}-${programIndex}`}
                        className="text-xs text-gray-600 dark:text-gray-400 truncate"
                      >
                        {program.description}
                      </p>
                      {showHint && programIndex === 0 && levelIndex === 0 && (
                        <span className="absolute top-2 right-2 text-xs text-cyan-600 dark:text-cyan-400 bg-white/90 dark:bg-gray-900/80 px-2 py-1 rounded animate-pulse border border-cyan-200 dark:border-transparent">
                          {content.clickHint}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProgram && (
        <ProgramModal
          program={selectedProgram}
          content={content}
          onClose={() => setSelectedProgram(null)}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-twinkle {
          animation: twinkle 3s infinite;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  );
};

export default ProgramsSection;