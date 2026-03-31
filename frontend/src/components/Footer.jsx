import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigationContent } from '../hooks/useNavigationContent';
import { navigationTranslations } from '../translations/navigation';
import { Mail, Phone, MapPin, X } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Footer = () => {
  const { language } = useLanguage();
  const { content } = useNavigationContent(language);
  const [showMapModal, setShowMapModal] = useState(false);
  const [logo, setLogo] = useState('/logo.png');
  
  // Use local translations for UI text
  const t = navigationTranslations[language] || navigationTranslations.en;

  useEffect(() => {
    fetchLogo();
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
  
  // Get contact details from backend, fallback to translations
  const contactInfo = {
    email: content.contactDetails?.emailAddress || t.emailValue,
    phone: content.contactDetails?.phoneNumber || t.phoneValue,
    address: content.contactLocation?.address 
      ? `${content.contactLocation.address}${content.contactLocation.city ? ', ' + content.contactLocation.city : ''}`
      : t.addressValue
  };

  // Ethronics location - Institute of Robotics and Autonomous Systems (IRAS)
  const location = {
    lat: 8.546809291496546,
    lng: 39.267508675060384,
    name: contactInfo.address,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5104963168656!2d39.267508675060384!3d8.546809291496546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1fbf6d421b13%3A0x104c602ab0c730b1!2sEthronics%20-%20Institute%20of%20Robotics%20and%20Autonomous%20Systems%20(IRAS)!5e0!3m2!1sen!2set!4v1744915902755!5m2!1sen!2set',
    placeId: 'ChIJExtC7b8fS0ARsTC3sCoGTBA'
  };

  const navigationLinks = [
    { title: t.home, href: '/' },
    { title: t.academics, href: '/academics' },
    { title: t.researchDevelopment, href: '/research' },
    { title: t.manufacturing, href: '/manufacturing' },
  ];

  const companyLinks = [
    { id: 'about', title: t.aboutUs, href: '/about' },
    { id: 'careers', title: t.careers, href: '/careers' },
    { id: 'news', title: t.news, href: '/news' },
    { id: 'contact', title: t.contact, href: '/contact' },
  ];

  const resourceLinks = [
    { id: 'blog', title: t.blog, href: '/blog' },
    { id: 'library', title: t.library, href: '/library' },
    { id: 'support', title: t.support, href: '/contact' },
    { id: 'faq', title: t.faq, href: '/faq' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4 text-center sm:text-left">
            <Link to="/" className="flex items-center justify-center sm:justify-start space-x-2">
              <img 
                src={logo} 
                alt="Ethronics Logo" 
                className="h-8 sm:h-10 w-auto"
                onError={(e) => { e.target.src = '/logo.png'; }}
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Ethronics
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.footerDescription}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.navigation}
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.company}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.resources}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact and Social Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.contactUs}
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                {/* Email - Clickable */}
                <li className="flex items-start justify-center sm:justify-start space-x-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <span className="block text-xs text-gray-500 dark:text-gray-500">{t.email}</span>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </li>

                {/* Phone - Clickable */}
                <li className="flex items-start justify-center sm:justify-start space-x-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <span className="block text-xs text-gray-500 dark:text-gray-500">{t.phone}</span>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </li>

                {/* Address - Clickable (opens map) */}
                <li className="flex items-start justify-center sm:justify-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <div className="text-left">
                    <span className="block text-xs text-gray-500 dark:text-gray-500">{t.address}</span>
                    <button
                      onClick={() => setShowMapModal(true)}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline"
                    >
                      {contactInfo.address}
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.followUs}
              </h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                {/* Twitter/X */}
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  aria-label={t.followTwitter}
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://et.linkedin.com/company/ethronics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  aria-label={t.followLinkedIn}
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/ethronics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  aria-label={t.followGitHub}
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.304-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.241 2.872.118 3.176.769.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Ethronics. {t.allRightsReserved}
          </p>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {language === 'am' ? 'የእኛ አድራሻ' : language === 'om' ? 'Teessoo Keenya' : 'Our Location'}
                  </h2>
                  <p className="text-purple-100 text-sm">{location.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Map Container */}
            <div className="relative">
              {/* Google Maps Embed - Official Ethronics Location */}
              <div className="w-full h-[400px] sm:h-[500px]">
                <iframe
                  title="Ethronics - Institute of Robotics and Autonomous Systems (IRAS)"
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://www.google.com/maps/place/?q=place_id:${location.placeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>
                      {language === 'am' ? 'በGoogle Maps ክፈት' : language === 'om' ? 'Google Maps irratti bani' : 'Open in Google Maps'}
                    </span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&destination_place_id=${location.placeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span>
                      {language === 'am' ? 'መመሪያዎችን ያግኙ' : language === 'om' ? 'Qajeelfama argadhu' : 'Get Directions'}
                    </span>
                  </a>
                </div>

                {/* Contact Info in Modal */}
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <a 
                        href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;