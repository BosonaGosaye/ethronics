import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Floating promotion component
const FloatingPromotion = ({ content, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const showPromotion = () => {
      setIsVisible(true);
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 500);
      setTimeout(() => setIsVisible(false), 4000);
    };

    showPromotion();
    const interval = setInterval(showPromotion, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!content) return null;

  return (
    <div
      className={`fixed top-1/2 right-0 transform -translate-y-1/2 w-80 sm:w-64 bg-gradient-to-br from-blue-900/95 to-indigo-900/95 text-white p-6 sm:p-4 rounded-l-2xl shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-500 z-50 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-label="Summer Robotics Training Promotion"
    >
      {isExploding && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: index % 2 === 0 ? '#00f7ff' : '#a855f7',
                top: '50%',
                left: '50%',
                animation: 'explode 0.5s ease-out forwards',
                transform: `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px)`
              }}
            />
          ))}
        </div>
      )}
      
      <h3 className="text-xl sm:text-lg font-extrabold text-cyan-100 mb-2 animate-pulse">
        {content.title}
      </h3>
      
      <p className="text-sm sm:text-xs text-cyan-200 mb-4">
        {content.description}
      </p>
      
      <a
        href="/register#register"
        onClick={onNavigate}
        className="block px-4 py-2 text-center font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:scale-105 transition-all duration-300"
        aria-label="Register for Summer Robotics Training"
      >
        {content.button}
      </a>
    </div>
  );
};

// Main Hero Carousel Component
const HeroCarousel = ({ slides, buttons = [], badge, className = "" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !slides || slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides, isAutoPlaying]);

  const nextSlide = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  }, [slides]);

  const prevSlide = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-black transition-colors duration-200 ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 dark:opacity-100"
          style={{
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)"
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[128px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 dark:bg-cyan-500/30 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[128px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/5 border border-purple-200 dark:border-white/10 backdrop-blur-sm w-fit animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                <span className="text-xs font-medium text-purple-700 dark:text-cyan-100 tracking-wide uppercase">
                  {badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
              {slides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed animate-fade-in-up animation-delay-100">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Buttons */}
          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-200">
              {buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={`group relative px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                    button.primary
                      ? 'bg-purple-600 dark:bg-white text-white dark:text-black hover:bg-purple-700 dark:hover:bg-gray-100 shadow-lg hover:shadow-xl'
                      : 'bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 backdrop-blur-md'
                  }`}
                >
                  {button.text}
                  {button.primary && (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Slide Indicators */}
          <div className="flex items-center gap-4 pt-8 animate-fade-in-up animation-delay-300">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className="group relative h-1 flex-1 max-w-[60px] bg-gray-300 dark:bg-white/10 rounded-full overflow-hidden transition-all hover:bg-gray-400 dark:hover:bg-white/20"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 transition-all duration-500 ease-out ${
                    index === currentSlide ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative flex justify-center lg:justify-end items-center perspective-1000">
          <div className="relative w-full max-w-lg aspect-square lg:aspect-[4/5] flex items-center justify-center">
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[80px] transition-opacity duration-700 ${
                isAutoPlaying ? 'opacity-100' : 'opacity-50'
              }`}
            />
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.image}
                alt={slide.title || "Hero slide"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute w-full h-full object-contain transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0 scale-100 rotate-0 blur-0'
                    : 'opacity-0 translate-y-12 scale-95 rotate-3 blur-sm'
                } animate-float`}
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))'
                }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-black/20 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-black/20 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        @keyframes explode {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--random-x, 100px), var(--random-y, -100px)) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

// Main Hero Component
const Hero = ({ content, onNavigate }) => {
  if (!content) return null;

  // Build slides from backend content
  const slides = Object.keys(content)
    .filter(key => key.startsWith('slide'))
    .sort()
    .map(key => {
      const slide = content[key];
      return {
        title: (
          <>
            <span className="block mb-2 sm:mb-3 lg:mb-4 text-gray-900 dark:text-white">
              {slide.line1}
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-purple-600 dark:from-green-400 dark:via-yellow-400 dark:to-purple-400 mb-2 sm:mb-3 lg:mb-4">
              {slide.line2}
            </span>
            <span className="block text-gray-900 dark:text-white">
              {slide.line3}
            </span>
          </>
        ),
        description: slide.description,
        image: slide.image || "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      };
    });

  // Build buttons from backend content
  const buttons = content.buttons ? [
    {
      text: content.buttons.summerTraining,
      href: "/register#register",
      primary: true
    },
    {
      text: content.buttons.explorePrograms,
      href: "/academics",
      primary: false
    },
    {
      text: content.buttons.viewResearch,
      href: "/research-development",
      primary: false
    }
  ] : [];

  return (
    <>
      <FloatingPromotion content={content.floatingPromo} onNavigate={onNavigate} />
      <HeroCarousel 
        slides={slides} 
        buttons={buttons}
        badge={content.badge}
        className="w-full max-w-full overflow-x-hidden" 
      />
    </>
  );
};

export default Hero;
