import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Default fallback images - empty to avoid CORS issues
const defaultImages = {
  tvet: '',
  undergrad: '',
  postgrad: '',
  training: '',
  bootcamp: '',
  aiCurriculum: '',
  mentor: '',
  scholarship: '',
  smartGate: '',
  smartFactory: '',
  blockchain: '',
  trafficControl: '',
  quantum: '',
  cybersecurity: '',
  partnerships: ''
};

const Solutions = ({ content }) => {
  const { language } = useLanguage();

  // Return loading state if no content
  if (!content) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Build solutions data from backend content
  const items = content.items || {};
  const categories = content.categories || {};

  // Solutions data organized by category
  const ac = {
    education: [
      items.roboticsBootcamp && {
        title: items.roboticsBootcamp.title,
        description: items.roboticsBootcamp.description,
        image: items.roboticsBootcamp.image || defaultImages.bootcamp,
        action: {
          text: items.roboticsBootcamp.action || 'Learn More',
          href: items.roboticsBootcamp.href || '/contact'
        }
      },
      items.aiCurriculum && {
        title: items.aiCurriculum.title,
        description: items.aiCurriculum.description,
        image: items.aiCurriculum.image || defaultImages.aiCurriculum,
        action: {
          text: items.aiCurriculum.action || 'Learn More',
          href: items.aiCurriculum.href || '/academics/#programs'
        }
      },
      items.mentorship && {
        title: items.mentorship.title,
        description: items.mentorship.description,
        image: items.mentorship.image || defaultImages.mentor,
        action: {
          text: items.mentorship.action || 'Learn More',
          href: items.mentorship.href || '/contact'
        }
      },
      items.scholarships && {
        title: items.scholarships.title,
        description: items.scholarships.description,
        image: items.scholarships.image || defaultImages.scholarship,
        action: {
          text: items.scholarships.action || 'Learn More',
          href: items.scholarships.href || '/contact'
        }
      },
      items.tvet && {
        title: items.tvet.title,
        description: items.tvet.description,
        image: items.tvet.image || defaultImages.tvet,
        action: {
          text: items.tvet.action || 'Learn More',
          href: items.tvet.href || '/academics'
        }
      },
      items.undergrad && {
        title: items.undergrad.title,
        description: items.undergrad.description,
        image: items.undergrad.image || defaultImages.undergrad,
        action: {
          text: items.undergrad.action || 'Learn More',
          href: items.undergrad.href || '/academics'
        }
      },
      items.postgrad && {
        title: items.postgrad.title,
        description: items.postgrad.description,
        image: items.postgrad.image || defaultImages.postgrad,
        action: {
          text: items.postgrad.action || 'Learn More',
          href: items.postgrad.href || '/academics'
        }
      },
      items.training && {
        title: items.training.title,
        description: items.training.description,
        image: items.training.image || defaultImages.training,
        action: {
          text: items.training.action || 'Learn More',
          href: items.training.href || '/academics'
        }
      }
    ].filter(Boolean),
    manufacturing: [
      items.gateBarrier && {
        title: items.gateBarrier.title,
        description: items.gateBarrier.description,
        image: items.gateBarrier.image || defaultImages.smartGate,
        action: {
          text: items.gateBarrier.action || 'Learn More',
          href: items.gateBarrier.href || '/contact'
        }
      },
      items.smartFactory && {
        title: items.smartFactory.title,
        description: items.smartFactory.description,
        image: items.smartFactory.image || defaultImages.smartFactory,
        action: {
          text: items.smartFactory.action || 'Learn More',
          href: items.smartFactory.href || '/manufacturing'
        }
      }
    ].filter(Boolean),
    globalTech: [
      items.blockchain && {
        title: items.blockchain.title,
        description: items.blockchain.description,
        image: items.blockchain.image || defaultImages.blockchain,
        action: {
          text: items.blockchain.action || 'Learn More',
          href: items.blockchain.href || '/contact'
        }
      },
      items.trafficControl && {
        title: items.trafficControl.title,
        description: items.trafficControl.description,
        image: items.trafficControl.image || defaultImages.trafficControl,
        action: {
          text: items.trafficControl.action || 'Learn More',
          href: items.trafficControl.href || '/contact'
        }
      },
      items.quantum && {
        title: items.quantum.title,
        description: items.quantum.description,
        image: items.quantum.image || defaultImages.quantum,
        action: {
          text: items.quantum.action || 'Learn More',
          href: items.quantum.href || '/contact'
        }
      },
      items.cybersecurity && {
        title: items.cybersecurity.title,
        description: items.cybersecurity.description,
        image: items.cybersecurity.image || defaultImages.cybersecurity,
        action: {
          text: items.cybersecurity.action || 'Learn More',
          href: items.cybersecurity.href || '/contact'
        }
      },
      items.partnerships && {
        title: items.partnerships.title,
        description: items.partnerships.description,
        image: items.partnerships.image || defaultImages.partnerships,
        action: {
          text: items.partnerships.action || 'Learn More',
          href: items.partnerships.href || '/contact'
        }
      }
    ].filter(Boolean)
  };

  // Solution categories
  const Db = [
    {
      title: categories.education?.title || 'Education',
      key: "education",
      solutions: ac.education,
      description: categories.education?.description || ''
    },
    {
      title: categories.research?.title || 'Research & Development',
      key: "globalTech",
      solutions: ac.globalTech,
      description: categories.research?.description || ''
    },
    {
      title: categories.manufacturing?.title || 'Manufacturing',
      key: "manufacturing",
      solutions: ac.manufacturing,
      description: categories.manufacturing?.description || ''
    }
  ];
  // Solution card component exactly as in real website
  const SolutionCard = ({ solution }) => (
    <div className="w-72 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 snap-start">
      <img
        src={solution.image}
        alt={solution.title}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => {
          // Fallback to empty if the backend image fails to load
          e.target.src = '';
        }}
      />
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {solution.title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {solution.description}
        </p>
        <a
          href={solution.action.href}
          className="inline-block px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm font-medium"
        >
          {solution.action.text}
        </a>
      </div>
    </div>
  );

  // Category carousel component exactly as in real website
  const CategoryCarousel = ({ section }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 288; // 72 * 4 (w-72 = 18rem = 288px)
    const visibleCards = 1;

    const scrollToIndex = (index) => {
      if (scrollRef.current) {
        const scrollPosition = index * cardWidth;
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
        setScrollLeft(scrollPosition);
        setCurrentIndex(index);
      }
    };

    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollLeft;
        const index = Math.round(scrollPosition / cardWidth);
        setCurrentIndex(index);
        setScrollLeft(scrollPosition);
      }
    };

    const handlePrev = () => {
      const newIndex = Math.max(currentIndex - 1, 0);
      scrollToIndex(newIndex);
    };

    const handleNext = () => {
      const newIndex = Math.min(currentIndex + 1, section.solutions.length - visibleCards);
      scrollToIndex(newIndex);
    };

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollLeft);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = (e.touches[0].pageX - startX) * 2;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - x;
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      if (scrollRef.current) {
        setScrollLeft(scrollRef.current.scrollLeft);
        handleScroll();
      }
    };

    useEffect(() => {
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        scrollElement.addEventListener("scroll", handleScroll);
        return () => scrollElement.removeEventListener("scroll", handleScroll);
      }
    }, []);

    const progressPercentage = ((currentIndex + visibleCards) / section.solutions.length) * 100;

    return (
      <div className="mb-12">
        <div className="px-4 sm:px-6 lg:px-8 mb-6">
          <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {section.title}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl">
              {section.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50"
                aria-label="Previous solution"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= section.solutions.length - visibleCards}
                className="p-2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50"
                aria-label="Next solution"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 sm:px-6 lg:px-8 no-scrollbar"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {section.solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} />
          ))}
        </div>
        <div className="flex justify-center mt-4 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-purple-600">{content.title || 'Solutions'}</span> {content.titleSuffix || "We're Building"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle || ''}
          </p>
        </div>
        {Db.map((section) => (
          <CategoryCarousel key={section.key} section={section} />
        ))}
      </div>
    </section>
  );
};

export default Solutions;