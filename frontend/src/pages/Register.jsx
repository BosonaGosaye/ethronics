import { useState } from 'react'
import { User, Clock, CreditCard, Check, ChevronDown, Calendar, Play, Bot, Code, Zap, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useRegisterContent } from '../hooks/useRegisterContent'
// Video Card Component (exact from real website)
const VideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {!isPlaying ? (
          <>
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-colors duration-200"
              >
                <Play className="h-8 w-8" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>
          </>
        ) : (
          <div className="w-full h-48">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{video.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{video.description}</p>
      </div>
    </div>
  )
}
// Gallery Component (exact from real website)
const Gallery = ({ title, description, videos, projects, titleColor, descriptionColor, t }) => {
  const [activeTab, setActiveTab] = useState("videos")

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 dark:from-gray-900 via-purple-100 dark:via-purple-900 to-purple-50 dark:to-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={titleColor || "text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center"}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-500 dark:to-cyan-500">
              {title}
            </span>
          </h2>
          <p className={descriptionColor || "text-lg sm:text-xl md:text-2xl text-purple-700 dark:text-cyan-600 mb-8 max-w-3xl mx-auto"}>
            {description}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.trainingVideos}
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.studentProjects}
            </button>
          </div>
        </div>

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  {project.student && (
                    <p className="text-purple-600 dark:text-purple-400 text-sm mb-3">{t.byStudent}: {project.student}</p>
                  )}
                  <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
// Main Register Component
const Register = () => {
  const { language } = useLanguage()
  const { content, videos, projects, loading, error } = useRegisterContent(language)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    studentName: "",
    studentAge: "",
    studentGender: "",
    grade: "",
    studentEmail: "",
    school: "",
    experience: "noExperience",
    session: "",
    guardianName: "",
    guardianEmail: "",
    emergency: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Use backend content
  const t = content.form || {}
  const heroContent = content.hero || {}
  const objectiveContent = content.objective || {}
  const highlightsContent = content.highlights || {}
  const galleryContent = content.gallery || {}
  const faqContent = content.faq || {}
  const nextStepsContent = content.nextSteps || {}
  const ctaContent = content.cta || {}

  // FAQ toggle
  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = t.errorStudentName
    }
    if (!formData.studentAge || formData.studentAge < 6 || formData.studentAge > 25) {
      newErrors.studentAge = t.errorStudentAge
    }
    if (!formData.studentGender) {
      newErrors.studentGender = t.errorStudentGender
    }
    if (!formData.grade) {
      newErrors.grade = t.errorGrade
    }
    if (!formData.school.trim()) {
      newErrors.school = t.errorSchool
    }
    if (!formData.experience) {
      newErrors.experience = t.errorExperience
    }
    if (formData.studentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
      newErrors.studentEmail = t.errorStudentEmail
    }

    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!formData.guardianName.trim()) {
      newErrors.guardianName = t.errorGuardianName
    }
    if (!formData.guardianEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guardianEmail)) {
      newErrors.guardianEmail = t.errorGuardianEmail
    }
    if (!formData.emergency.trim() || !/^\+?\d{9,15}$/.test(formData.emergency)) {
      newErrors.emergency = t.errorEmergency
    }

    return newErrors
  }
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const step2Errors = validateStep2()
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    try {
      const response = await fetch(`${apiUrl}/api/registrations/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language
        }),
      })

      if (!response.ok) {
        let errorMessage = t.apiError
        try {
          const errorData = await response.json()
          if (errorData.errors) {
            const fieldErrors = {}
            errorData.errors.forEach(error => {
              fieldErrors[error.param] = error.msg
            })
            setErrors(fieldErrors)
            return
          } else if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError)
        }
        throw new Error(errorMessage)
      }

      await response.json()
      setStep(3)
      setFormData({
        studentName: "",
        studentAge: "",
        studentGender: "",
        grade: "",
        studentEmail: "",
        school: "",
        experience: "noExperience",
        session: "",
        guardianName: "",
        guardianEmail: "",
        emergency: ""
      })
      setErrors({})
    } catch (error) {
      console.error("Fetch error:", error)
      setSubmitError(
        error.message === "Failed to fetch"
          ? "Cannot connect to server. Please try again later."
          : error.message || t.apiError
      )
    } finally {
      setIsSubmitting(false)
    }
  }
  // Handle input changes (exact from real website)
  const handleInputChange = (e) => {
    const { id, value } = e.target
    
    if (id === "studentAge") {
      setFormData({ ...formData, [id]: value })
      const age = parseInt(value)
      if (value && (isNaN(age) || age < 6 || age > 25)) {
        setErrors({ ...errors, studentAge: t.errorStudentAge })
      } else {
        setErrors({ ...errors, studentAge: "" })
      }
    } else if (id === "studentEmail" || id === "guardianEmail") {
      setFormData({ ...formData, [id]: value })
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors({ ...errors, [id]: t[id === "studentEmail" ? "errorStudentEmail" : "errorGuardianEmail"] })
      } else {
        setErrors({ ...errors, [id]: "" })
      }
    } else if (id === "emergency") {
      setFormData({ ...formData, [id]: value })
      if (value && !/^\+?\d{9,15}$/.test(value)) {
        setErrors({ ...errors, emergency: t.errorEmergency })
      } else {
        setErrors({ ...errors, emergency: "" })
      }
    } else {
      setFormData({ ...formData, [id]: value })
      setErrors({ ...errors, [id]: "" })
    }

    setSubmitError(null)
  }

  // Step navigation (exact from real website)
  const handleNextStep = () => {
    const step1Errors = validateStep1()
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors)
      return
    }
    setStep(2)
    setErrors({})
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    setErrors({})
    setSubmitError(null)
  }

  // FAQ toggle
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // Reset form
  const resetForm = () => {
    setStep(1)
    setFormData({
      studentName: "",
      studentAge: "",
      studentGender: "",
      grade: "",
      studentEmail: "",
      school: "",
      experience: "noExperience",
      session: "",
      guardianName: "",
      guardianEmail: "",
      emergency: ""
    })
    setErrors({})
    setSubmitError(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error loading content: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <section 
      className={`py-32 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 dark:text-white overflow-hidden transition-colors duration-200 ${language === "am" ? "font-noto-ethiopic" : "font-sans"}`}
      role="region"
      aria-label={t.heroTitle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section - exact from real website */}
        <div className="flex flex-col lg:flex-row items-center mb-16 md:mb-20">
          <div className="lg:w-1/2 mb-10 lg:mb-0 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
              {heroContent.title || 'Summer Robotic Engineering and AI Training'}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-700 dark:text-cyan-200 mb-8 max-w-lg">
              {heroContent.description || 'Join our training program'}
            </p>
            <a
              href="#register"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={heroContent.button || 'Register Now'}
            >
              {heroContent.button || 'Register Now'}
            </a>
          </div>
          <div className="lg:w-1/2">
            <img
              src={heroContent.image || "/src/assets/training-xgzfTKXW.jpg"}
              alt="Robotics training in action"
              className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover rounded-2xl shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in delay-100"
            />
          </div>
        </div>

        {/* Objective Section - exact from real website */}
        <div 
          className="mb-16 md:mb-20 py-12 bg-gradient-to-r from-purple-100 dark:from-purple-800/30 to-transparent rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(34,211,238,0.5)] text-center relative"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:pl-8 text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-in">
              {objectiveContent.title || 'Discover the Fun of Robotics'}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-purple-700 dark:text-cyan-200 mb-8 max-w-2xl animate-fade-in delay-200">
              {objectiveContent.description || 'Get ready for an awesome training'}
            </p>
            <ul className="space-y-4 max-w-2xl" role="list" aria-label="training Objectives">
              {(objectiveContent.points || []).map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 dark:text-cyan-200 hover:text-gray-900 dark:hover:text-white transition-all duration-200 animate-fade-in relative z-10"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <svg
                    className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-200 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Training Highlights - exact from real website */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
            {highlightsContent.title || 'Training Highlights'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-purple-300 dark:border-cyan-400 shadow-lg dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 animate-fade-in delay-200">
              <div className="flex items-center mb-6">
                <Bot className="w-10 h-10 text-purple-600 dark:text-cyan-200 mr-4" />
                <h4 className="text-2xl font-semibold text-purple-700 dark:text-cyan-200">
                  {highlightsContent.roboticsTitle || 'Robotics'}
                </h4>
              </div>
              <p className="text-base text-gray-700 dark:text-cyan-200">
                {highlightsContent.roboticsDescription || 'Learn robotics fundamentals'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-purple-300 dark:border-cyan-400 shadow-lg dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 animate-fade-in delay-300">
              <div className="flex items-center mb-6">
                <Code className="w-10 h-10 text-purple-600 dark:text-cyan-200 mr-4" />
                <h4 className="text-2xl font-semibold text-purple-700 dark:text-cyan-200">
                  {highlightsContent.codingTitle || 'Coding'}
                </h4>
              </div>
              <p className="text-base text-gray-700 dark:text-cyan-200">
                {highlightsContent.codingDescription || 'Learn programming'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-purple-300 dark:border-cyan-400 shadow-lg dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 animate-fade-in delay-400">
              <div className="flex items-center mb-6">
                <Zap className="w-10 h-10 text-purple-600 dark:text-cyan-200 mr-4" />
                <h4 className="text-2xl font-semibold text-purple-700 dark:text-cyan-200">
                  {highlightsContent.autonomousTitle || 'AI & Automation'}
                </h4>
              </div>
              <p className="text-base text-gray-700 dark:text-cyan-200">
                {highlightsContent.autonomousDescription || 'Explore AI concepts'}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile CTA Button */}
        <div className="fixed bottom-1 right-6 z-20 md:hidden">
          <a
            href="#register"
            className="inline-block px-6 py-2 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:shadow-[0_0_20px_rgba(34,211,238,0.9)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label={heroContent.button || 'Register Now'}
          >
            {heroContent.button || 'Register Now'}
          </a>
        </div>

        {/* Gallery Section */}
        {(videos.length > 0 || projects.length > 0) && (
          <section id="gallery">
            <Gallery 
              title={galleryContent.galleryTitle || 'See Our Learning in Action'}
              description={galleryContent.galleryDescription || 'Watch our training videos'}
              videos={videos.map(v => ({
                id: v._id,
                title: v.title[language] || v.title.en,
                description: v.description[language] || v.description.en,
                thumbnail: v.thumbnail,
                embedUrl: v.embedUrl,
                duration: v.duration
              }))}
              projects={projects.map(p => ({
                id: p._id,
                title: p.title[language] || p.title.en,
                description: p.description[language] || p.description.en,
                image: p.image,
                student: p.studentName?.[language] || p.studentName?.en || ''
              }))}
              titleColor="text-3xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 text-center"
              descriptionColor="text-lg sm:text-xl md:text-2xl text-cyan-600 mb-8"
              t={{
                trainingVideos: galleryContent.trainingVideos || 'Training Videos',
                studentProjects: galleryContent.studentProjects || 'Student Projects',
                byStudent: galleryContent.byStudent || 'By'
              }}
            />
          </section>
        )}

        {/* Registration Title */}
        <div className="max-w-3xl mx-auto text-center mb-6 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t.registrationTitle || 'Registration for Summer Training'}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200">
            {t.registrationDescription || 'Please fill out the form below'}
          </p>
        </div>

        {/* Registration Form - exact structure from real website */}
        <div 
          id="register"
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg dark:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          {/* Progress Steps - exact from real website */}
          <div className="flex justify-center overflow-x-auto mb-4">
            <div className="flex items-center space-x-3 min-w-[280px]">
              <div className={`flex items-center ${step === 1 ? "text-purple-600 dark:text-cyan-200" : "text-gray-500 dark:text-gray-400"}`}>
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs ${step >= 1 ? "bg-purple-500" : "bg-gray-400 dark:bg-gray-600"}`}>
                  1
                </span>
                <span className="ml-2 text-xs font-medium">
                  {t.step1}
                </span>
              </div>
              <div className={`w-8 h-1 ${step >= 2 ? "bg-purple-500" : "bg-gray-400 dark:bg-gray-600"}`}></div>
              <div className={`flex items-center ${step === 2 ? "text-purple-600 dark:text-cyan-200" : "text-gray-500 dark:text-gray-400"}`}>
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs ${step >= 2 ? "bg-purple-500" : "bg-gray-400 dark:bg-gray-600"}`}>
                  2
                </span>
                <span className="ml-2 text-xs font-medium">
                  {t.step2}
                </span>
              </div>
              <div className={`w-8 h-1 ${step >= 3 ? "bg-purple-500" : "bg-gray-400 dark:bg-gray-600"}`}></div>
              <div className={`flex items-center ${step === 3 ? "text-purple-600 dark:text-cyan-200" : "text-gray-500 dark:text-gray-400"}`}>
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs ${step >= 3 ? "bg-purple-500" : "bg-gray-400 dark:bg-gray-600"}`}>
                  3
                </span>
                <span className="ml-2 text-xs font-medium">
                  {t.nextSteps}
                </span>
              </div>
            </div>
          </div>

          {/* Form Title - exact from real website */}
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
            {step === 1 ? t.formTitleStudent : step === 2 ? t.formTitleGuardian : t.registrationSuccessful}
          </h3>

          {/* Error Message - exact from real website */}
          {submitError && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-xs text-center">
              {submitError}
            </div>
          )}
          {step === 3 ? (
            /* Success Page - exact from real website */
            <div className="bg-gradient-to-br from-purple-50 dark:from-gray-900/90 via-purple-100 dark:via-gray-800/90 to-purple-50 dark:to-purple-900/80 backdrop-blur-lg p-6 sm:p-10 rounded-2xl border-2 border-purple-400 dark:border-cyan-400 shadow-xl dark:shadow-[0_8px_32px_rgba(34,211,238,0.25)] animate-fade-in">
              <div className="flex flex-col items-center justify-center mb-6">
                <Check className="w-10 h-10 text-green-600 dark:text-green-400 mb-2 drop-shadow-lg" />
                <h4 className="text-2xl font-bold text-purple-900 dark:text-cyan-100 text-center drop-shadow">
                  {t.congratulations}, {formData.studentName}!
                </h4>
                <p className="text-base text-purple-700 dark:text-cyan-200 mt-2 text-center max-w-xl">
                  {t.registrationComplete}
                </p>
              </div>

              {/* Payment Information - exact from real website */}
              <div className="mb-6 p-4 bg-yellow-100 dark:bg-cyan-900/30 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg text-gray-800 dark:text-cyan-100 text-sm sm:text-base">
                <b>{nextStepsContent.important || 'Important'}:</b> {nextStepsContent.paymentInstructions || 'Please complete payment to confirm your registration'}
              </div>
              {/* Information Grid - exact from real website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {nextStepsContent.registrationFee || 'Registration Fee'}
                    </h5>
                    <div className="text-sm text-gray-700 dark:text-cyan-200 space-y-1">
                      {nextStepsContent.registrationFeeDetails || 'Fee details will be provided'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {nextStepsContent.sessionPreference || 'Session Preference'}
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-cyan-200">
                      {nextStepsContent.sessionPreferenceDetails || 'Your selected session will be confirmed'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {nextStepsContent.paymentDeadline || 'Payment Deadline'}
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-cyan-200">
                      {nextStepsContent.paymentDeadlineDetails || 'Complete payment within the deadline'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {nextStepsContent.diagnosticExam || 'Diagnostic Exam'}
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-cyan-200">
                      {nextStepsContent.diagnosticExamDetails || 'Assessment details will be shared'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <Phone className="w-6 h-6 text-purple-600 dark:text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {nextStepsContent.contactUs || 'Contact Us'}
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-cyan-200">
                      {nextStepsContent.contactUsDetails || 'Reach out for any questions'}
                    </p>
                  </div>
                </div>
              </div>
              {/* Action Buttons - exact from real website */}
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 text-base"
                  aria-label={t.registerAnotherStudent}
                >
                  {t.registerAnotherStudent}
                </button>
                <a
                  href="mailto:info@ethronics.com"
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-gray-600 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 text-base"
                  aria-label={t.contactUsButton}
                >
                  {t.contactUsButton}
                </a>
              </div>
            </div>
          ) : (
            /* Registration Form - exact structure from real website */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step === 1 && (
                <>
                  {/* Student Name */}
                  <div>
                    <label htmlFor="studentName" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <User className="w-5 h-5 mr-2" />
                      {t.studentName}
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.studentName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      aria-required="true"
                      aria-invalid={!!errors.studentName}
                      aria-describedby={errors.studentName ? "studentName-error" : undefined}
                      placeholder={content.form?.placeholderStudentName || t.placeholderName}
                    />
                    {errors.studentName && (
                      <p id="studentName-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.studentName}
                      </p>
                    )}
                  </div>

                  {/* Student Age */}
                  <div>
                    <label htmlFor="studentAge" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <span className="w-5 h-5 mr-2 flex items-center justify-center">
                        <svg width="20" height="20" fill="none" stroke="currentColor">
                          <circle cx="10" cy="10" r="9" strokeWidth="2" />
                          <path strokeWidth="2" strokeLinecap="round" d="M10 6v4l2 2" />
                        </svg>
                      </span>
                      {t.studentAge}
                    </label>
                    <input
                      type="number"
                      id="studentAge"
                      value={formData.studentAge || ""}
                      onChange={handleInputChange}
                      min={6}
                      max={25}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.studentAge ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      placeholder={t.studentAge}
                      aria-required="true"
                      aria-invalid={!!errors.studentAge}
                      aria-describedby={errors.studentAge ? "studentAge-error" : undefined}
                    />
                    {errors.studentAge && (
                      <p id="studentAge-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.studentAge}
                      </p>
                    )}
                  </div>
                  {/* Student Gender */}
                  <div>
                    <label htmlFor="studentGender" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <span className="w-5 h-5 mr-2 flex items-center justify-center">
                        <svg width="20" height="20" fill="none" stroke="currentColor">
                          <circle cx="10" cy="10" r="9" strokeWidth="2" />
                          <path strokeWidth="2" strokeLinecap="round" d="M10 14v-4m0 0V6m0 4h4m-4 0H6" />
                        </svg>
                      </span>
                      {t.studentGender}
                    </label>
                    <select
                      id="studentGender"
                      value={formData.studentGender || ""}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.studentGender ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      aria-required="true"
                      aria-invalid={!!errors.studentGender}
                      aria-describedby={errors.studentGender ? "studentGender-error" : undefined}
                    >
                      <option value="">{t.studentGender}</option>
                      <option value="male">{t.male}</option>
                      <option value="female">{t.female}</option>
                    </select>
                    {errors.studentGender && (
                      <p id="studentGender-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.studentGender}
                      </p>
                    )}
                  </div>

                  {/* Grade */}
                  <div>
                    <label htmlFor="grade" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Bot className="w-5 h-5 mr-2" />
                      {t.grade}
                    </label>
                    <select
                      id="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.grade ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      aria-required="true"
                      aria-invalid={!!errors.grade}
                      aria-describedby={errors.grade ? "grade-error" : undefined}
                    >
                      <option value="">{t.selectGrade}</option>
                      {[...Array(9)].map((_, index) => (
                        <option key={index} value={index + 4}>
                          {t.grade} {index + 4}
                        </option>
                      ))}
                    </select>
                    {errors.grade && (
                      <p id="grade-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.grade}
                      </p>
                    )}
                  </div>

                  {/* Student Email */}
                  <div>
                    <label htmlFor="studentEmail" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Mail className="w-5 h-5 mr-2" />
                      {t.studentEmail}
                      <span className="ml-2 text-xs text-gray-600 dark:text-cyan-300 font-normal">
                        ({t.parentEmailOk})
                      </span>
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.studentEmail ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      placeholder={content.form?.placeholderStudentEmail || "student@example.com"}
                      aria-invalid={!!errors.studentEmail}
                      aria-describedby={errors.studentEmail ? "studentEmail-error" : undefined}
                    />
                    {errors.studentEmail && (
                      <p id="studentEmail-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.studentEmail}
                      </p>
                    )}
                  </div>

                  {/* School */}
                  <div>
                    <label htmlFor="school" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Bot className="w-5 h-5 mr-2" />
                      {t.school}
                    </label>
                    <input
                      type="text"
                      id="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.school ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      placeholder={content.form?.placeholderSchool || "School name"}
                      aria-required="true"
                      aria-invalid={!!errors.school}
                      aria-describedby={errors.school ? "school-error" : undefined}
                    />
                    {errors.school && (
                      <p id="school-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.school}
                      </p>
                    )}
                  </div>
                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Zap className="w-5 h-5 mr-2" />
                      {t.experience}
                    </label>
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.experience ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      aria-required="true"
                      aria-invalid={!!errors.experience}
                      aria-describedby={errors.experience ? "experience-error" : undefined}
                    >
                      <option value="">{ t.selectExperience}</option>
                      <option value="noExperience">{t.noExperience}</option>
                      <option value="beginner">{t.beginner}</option>
                      <option value="intermediate">{t.intermediate}</option>
                    </select>
                    {errors.experience && (
                      <p id="experience-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* Session */}
                  <div>
                    <label htmlFor="session" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Clock className="w-5 h-5 mr-2" />
                      {t.session}
                    </label>
                    <select
                      id="session"
                      value={formData.session}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.session ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      aria-required="true"
                      aria-invalid={!!errors.session}
                      aria-describedby={errors.session ? "session-error" : undefined}
                    >
                      <option value="">{content.form?.selectSession || "Select Session"}</option>
                      <option value="morning">{content.form?.morning || t.morning}</option>
                      <option value="afternoon">{content.form?.afternoon || t.afternoon}</option>
                    </select>
                    {errors.session && (
                      <p id="session-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.session}
                      </p>
                    )}
                  </div>

                  {/* Next Button */}
                  <div className="md:col-span-2 flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      {t.nextButton}
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Guardian Name */}
                  <div>
                    <label htmlFor="guardianName" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <User className="w-5 h-5 mr-2" />
                      {t.guardianName}
                    </label>
                    <input
                      type="text"
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.guardianName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      placeholder={content.form?.placeholderGuardianName || "Parent/Guardian name"}
                      aria-required="true"
                      aria-invalid={!!errors.guardianName}
                      aria-describedby={errors.guardianName ? "guardianName-error" : undefined}
                    />
                    {errors.guardianName && (
                      <p id="guardianName-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.guardianName}
                      </p>
                    )}
                  </div>

                  {/* Guardian Email */}
                  <div>
                    <label htmlFor="guardianEmail" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Mail className="w-5 h-5 mr-2" />
                      {t.guardianEmail}
                    </label>
                    <input
                      type="email"
                      id="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.guardianEmail ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      placeholder={content.form?.placeholderGuardianEmail || "parent@example.com"}
                      aria-required="true"
                      aria-invalid={!!errors.guardianEmail}
                      aria-describedby={errors.guardianEmail ? "guardianEmail-error" : undefined}
                    />
                    {errors.guardianEmail && (
                      <p id="guardianEmail-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.guardianEmail}
                      </p>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="md:col-span-2">
                    <label htmlFor="emergency" className="flex items-center text-gray-700 dark:text-cyan-200 mb-2 font-semibold text-sm sm:text-base">
                      <Phone className="w-5 h-5 mr-2" />
                      {t.emergency}
                    </label>
                    <input
                      type="tel"
                      id="emergency"
                      value={formData.emergency}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border ${errors.emergency ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400 shadow-sm dark:shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-200 text-sm sm:text-base`}
                      placeholder={content.form?.placeholderEmergency || "+251912345678"}
                      aria-required="true"
                      aria-invalid={!!errors.emergency}
                      aria-describedby={errors.emergency ? "emergency-error" : undefined}
                    />
                    {errors.emergency && (
                      <p id="emergency-error" className="text-red-600 dark:text-red-200 text-xs mt-1">
                        {errors.emergency}
                      </p>
                    )}
                  </div>

                  {/* Form Navigation */}
                  <div className="md:col-span-2 flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      {t.backButton}
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t.submitting}
                        </>
                      ) : (
                        t.submitButton
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* FAQ Section - exact from real website */}
        <div className="mb-16 md:mb-20 py-16">
          <h3 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center animate-fade-in">
            {faqContent.title || 'Frequently Asked Questions'}
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {(faqContent.questions || []).map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/60 backdrop-blur-md rounded-xl border border-purple-300 dark:border-cyan-400 shadow-lg dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-fade-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-700 dark:text-cyan-200 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-cyan-400"
                  aria-expanded={expandedFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base sm:text-lg font-semibold">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${expandedFaq === index ? "transform rotate-180" : ""}`} />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? "max-h-96 px-6 py-4" : "max-h-0"}`}
                >
                  <p className="text-sm sm:text-base text-gray-600 dark:text-cyan-200">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {ctaContent.ctaTitle && (
        <div className="mb-16 md:mb-20 py-12 bg-gradient-to-r from-purple-100 dark:from-purple-800/60 to-transparent rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(34,211,238,0.5)] text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:pl-8 text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-in">
              {ctaContent.ctaTitle}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-purple-700 dark:text-cyan-200 mb-8 max-w-2xl animate-fade-in delay-200">
              {ctaContent.ctaDescription}
            </p>
            <a
              href="#register"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-white bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={ctaContent.ctaButton}
            >
              {ctaContent.ctaButton}
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

export default Register