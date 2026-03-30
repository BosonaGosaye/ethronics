import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AcademicHero = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!content) return null;

  const slides = content.slides.map((slide, index) => {
    // Check if title is an object with part1 and part2
    const hasMultiPartTitle = slide.title && typeof slide.title === 'object' && (slide.title.part1 || slide.title.part2);
    
    return {
      title: hasMultiPartTitle ? (
        <>
          {slide.title.part1 && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
              {slide.title.part1}
            </span>
          )}
          {slide.title.part1 && slide.title.part2 && ' '}
          {slide.title.part2 && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-red-400">
              {slide.title.part2}
            </span>
          )}
        </>
      ) : (
        slide.title?.full || slide.title || ''
      ),
      description: slide.description,
      image: slide.image || `https://images.unsplash.com/photo-1572310608276-9134d42f127f?w=1200&auto=format&fit=crop&q=80`
    };
  });

  const buttons = [
    {
      text: content.buttons.joinWaitlist,
      href: "/contact",
      primary: true
    },
    {
      text: content.buttons.explorePrograms,
      href: "#programs"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
              {slides[currentSlide].description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center ${
                    button.primary
                      ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-1'
                      : 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default AcademicHero;
