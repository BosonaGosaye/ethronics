import { useState, useEffect } from 'react'
import { GraduationCap, Microscope, Factory, Linkedin } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAboutContent } from '../hooks/useAboutContent'

// Team Member Component
const TeamMember = ({ name, quote, bio, position, image, linkdin, translations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm mx-auto md:mx-0 flex flex-col items-center transform transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group border border-gray-200 dark:border-gray-700"
        onClick={openModal}
      >
        <div className="relative mb-6">
          <img
            src={image}
            alt={name}
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 dark:border-purple-500 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">
          {name}
        </h3>
        
        <p className="text-md md:text-lg text-purple-600 dark:text-purple-400 font-medium mb-3 text-center tracking-wide italic">
          "{quote}"
        </p>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4 text-center leading-relaxed line-clamp-3">
          {bio}
        </p>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>
            <strong className="font-semibold text-gray-700 dark:text-gray-200">{translations.position}:</strong> {position}
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-gray-900/50 dark:bg-gray-900/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 transform transition-all animate-fade-in border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt={name}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 dark:border-purple-500 mb-4"
              />
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {name}
              </h3>
              
              <p className="text-lg text-purple-600 dark:text-purple-300 mb-4 italic">
                "{quote}"
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 text-base mb-4 text-center">
                {bio}
              </p>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 w-full">
                <p>
                  <strong className="font-semibold text-gray-800 dark:text-gray-200">{translations.position}:</strong> {position}
                </p>
                
                {linkdin && (
                  <a
                    href={linkdin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    {translations.linkedinProfile}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Front Component
const Front = ({ title, description, icon, details }) => (
  <div className="relative flex flex-col md:flex-row items-center gap-8 py-8 max-w-4xl mx-auto">
    <div className="flex-shrink-0">
      <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4">
        {icon}
      </div>
    </div>
    <div className="text-center md:text-left">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mb-4">
        {description}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-base">
        {details}
      </p>
    </div>
  </div>
)

// Main About Component
const About = () => {
  const { language } = useLanguage()
  const { content, loading, error } = useAboutContent(language)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const frontIcons = [
    <GraduationCap className="w-12 h-12 text-purple-600 dark:text-purple-400" />,
    <Microscope className="w-12 h-12 text-purple-600 dark:text-purple-400" />,
    <Factory className="w-12 h-12 text-purple-600 dark:text-purple-400" />
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-800 dark:text-red-200">Error loading content: {error}</p>
        </div>
      </div>
    )
  }

  // Use backend content if available
  const hero = content.hero || {};
  const purpose = content.purpose || {};
  const leaders = content.leaders || {};
  const threeFronts = content.threeFronts || {};
  const journey = content.journey || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900/90 via-gray-900/80 to-blue-900/90 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {hero.title || 'About Ethronics'}
          </h1>
          <p className="text-lg md:text-xl text-purple-100 dark:text-gray-300 max-w-3xl mx-auto">
            {hero.description || ''}
          </p>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {purpose.title || 'Our Purpose'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {purpose.mission?.title || 'Mission'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                {purpose.mission?.description || ''}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {purpose.vision?.title || 'Vision'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                {purpose.vision?.description || ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Leaders */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {leaders.title || 'Meet Our Leaders'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {leaders.description || ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.teamMembers && leaders.teamMembers.length > 0 ? (
              leaders.teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  quote={member.quote}
                  bio={member.bio}
                  position={member.position}
                  image={member.image}
                  linkdin={member.linkdin}
                  translations={leaders}
                />
              ))
            ) : (
              <p className="col-span-2 text-center text-gray-600 dark:text-gray-400">No team members available</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Three Fronts */}
      <section className="py-16 bg-white dark:bg-gray-800 relative transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {threeFronts.title || 'Our Three Fronts'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {threeFronts.description || ''}
            </p>
          </div>
          
          <div className="relative">
            {threeFronts.fronts && threeFronts.fronts.length > 0 ? (
              threeFronts.fronts.map((front, index) => (
                <Front
                  key={index}
                  title={front.title}
                  description={front.description}
                  icon={frontIcons[index]}
                  details={front.details}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">No fronts available</p>
            )}
          </div>
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-700 dark:bg-gray-900 relative transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {journey.title || 'Join Our Journey'}
          </h2>
          <p className="text-lg text-purple-100 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {journey.description || ''}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 dark:bg-purple-600 dark:text-white rounded-lg hover:bg-purple-50 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 transition-colors font-medium"
            >
              {journey.getInvolved || 'Get Involved'}
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white dark:border-purple-600 dark:text-purple-400 hover:bg-white hover:text-purple-600 dark:hover:bg-purple-600 dark:hover:text-white rounded-lg transition-colors font-medium"
            >
              {journey.learnMore || 'Learn More'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About