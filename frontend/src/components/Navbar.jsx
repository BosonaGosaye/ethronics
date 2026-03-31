import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { navigationTranslations } from '../translations/navigation';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logo, setLogo] = useState('/logo.png');
  const location = useLocation();
  const { language } = useLanguage();
  
  // Use local translations only
  const t = navigationTranslations[language] || navigationTranslations.en;

  useEffect(() => {
    fetchLogo();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchLogo = async () => {
    try {
      const response = await axios.get(`${API_URL}/site-settings`);
      if (response.data.data.logo) {
        setLogo(response.data.data.logo);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const primaryNavItems = [
    { title: t.home, href: '/' },
    { title: t.academics, href: '/academics' },
    { title: t.researchDevelopment, href: '/research' },
    { title: t.manufacturing, href: '/manufacturing' },
  ];

  const secondaryNavItems = [
    { id: 'contact', title: t.contact, href: '/contact' },
    { id: 'library', title: t.library, href: '/library' },
    { id: 'careers', title: t.careers, href: '/careers' },
    { id: 'news', title: t.newsEvents, href: '/news' },
    { id: 'blog', title: t.blog, href: '/blog' },
    { id: 'about', title: t.aboutUs, href: '/about' },
    
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-[1800px] 2xl:mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col py-4 relative">
          {/* Logo */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Link to="/" className="text-xl lg:text-2xl font-bold text-white">
              <div className="flex items-center space-x-2">
                <img 
                  src={logo} 
                  alt="Ethronics Logo" 
                  className="h-8 w-auto lg:h-10 xl:h-12"
                  onError={(e) => { e.target.src = '/logo.png'; }}
                />
                <span className="hidden sm:inline">Ethronics</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="ml-32 lg:ml-40 xl:ml-48">
            {/* Primary Navigation */}
            <div className="flex justify-end items-center space-x-6 lg:space-x-8 xl:space-x-10 h-10">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm lg:text-base font-medium ${
                    isActive(item.href)
                      ? 'text-purple-400'
                      : 'text-gray-200 hover:text-purple-400'
                  } transition-colors duration-200`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Secondary Navigation */}
            <div className={`flex justify-end items-center space-x-4 lg:space-x-6 xl:space-x-8 h-10 border-t pt-2 transition-colors duration-300 ${
              isScrolled ? 'border-gray-700' : 'border-white/10'
            }`}>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`text-xs lg:text-sm ${
                    isActive(item.href)
                      ? 'text-purple-400'
                      : 'text-gray-400 hover:text-purple-400'
                  } transition-colors duration-200`}
                >
                  {item.title}
                </Link>
              ))}
              <LanguageSelector className="ml-2" />
              <ThemeToggle className="ml-2" />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-white">
            <div className="flex items-end space-x-2">
              <img 
                src={logo} 
                alt="Ethronics Logo" 
                className="h-8 w-auto"
                onError={(e) => { e.target.src = '/logo.png'; }}
              />
              <span>Ethronics</span>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 p-2"
              aria-label={isOpen ? t.closeMenu : t.openMenu}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-gray-900 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-b border-gray-700">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'text-purple-400'
                    : 'text-gray-200 hover:text-purple-400'
                } transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="px-2 pt-3 pb-4 space-y-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`block px-3 py-2 text-sm ${
                  isActive(item.href)
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-purple-400'
                } transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;