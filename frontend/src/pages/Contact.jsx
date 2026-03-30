import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Upload, FileText, X, CheckCircle } from 'lucide-react'
import { useContactContent, submitContactMessage } from '../hooks/useContactContent'

// Contact Hero Component
const ContactHero = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="relative bg-gradient-to-br from-blue-900/90 via-gray-900/80 to-blue-900/90 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          {content.description}
        </p>
      </div>
    </div>
  );
};
// Contact Form Component
const ContactForm = ({ content, onSubmitSuccess }) => {
  if (!content) return null;
  
  const categories = content.categories || [];
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "general"
  })
  
  const [resumeFile, setResumeFile] = useState(null)
  const [uploadError, setUploadError] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    setSubmitError("")
    
    try {
      let resumeUrl = null;
      
      // Upload resume to Cloudinary if file exists
      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);
        formData.append('folder', 'resumes');
        
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const uploadResponse = await fetch(`${apiUrl}/media/upload`, {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload resume');
        }
        
        const uploadData = await uploadResponse.json();
        resumeUrl = uploadData.data.url;
      }
      
      const messageData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        category: formData.category,
        resumeUrl: resumeUrl
      };
      
      await submitContactMessage(messageData);
      
      onSubmitSuccess()
      setFormData({
        name: "",
        email: "",
        message: "",
        category: "general"
      })
      setResumeFile(null)
      setUploadError("")
    } catch (error) {
      console.error("Error:", error)
      setSubmitError(error.message || "Failed to submit message. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }))
    // Clear resume file if switching away from careers
    if (value !== 'careers') {
      setResumeFile(null)
      setUploadError("")
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setUploadError("")
    
    if (!file) return
    
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ]
    
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setUploadError(content.fileError || "Invalid file type")
      return
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(content.fileSizeError || "File size must be less than 5MB")
      return
    }
    
    setResumeFile(file)
  }

  const removeFile = () => {
    setResumeFile(null)
    setUploadError("")
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const selectedCategory = categories.find(cat => cat.value === formData.category)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {content.title}
      </h2>
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
        </div>
      )}
      
      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {content.categoryLabel || "Select Category"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(category => (
            <label
              key={category.value}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.category === category.value
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={formData.category === category.value}
                onChange={() => handleCategoryChange(category.value)}
                className="hidden"
              />
              <span className="text-sm font-medium">{category.label}</span>
            </label>
          ))}
        </div>
        
        {/* Category Info */}
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {selectedCategory?.label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedCategory?.info}
          </p>
        </div>
      </div>

      {/* Resume Upload Section - Only show for Careers category */}
      {formData.category === 'careers' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {content.resumeUpload || "Upload Resume (Optional)"}
          </label>
          
          {!resumeFile ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium text-purple-600 dark:text-purple-400">{content.clickToUpload || "Click to upload"}</span> {content.dragAndDrop || "or drag and drop"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {content.fileTypes || "PDF, DOCX, DOC, TXT (max 5MB)"}
                </p>
              </label>
            </div>
          ) : (
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(resumeFile.size)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {uploadError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {uploadError}
            </p>
          )}
          
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {content.supportedFormats || "Supported formats: PDF, DOCX, DOC, TXT"}
          </p>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {content.nameLabel || "Full Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {content.emailLabel || "Email Address"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {content.messageLabel || "Message"}
            {formData.category === 'careers' && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {content.careerMessageHint || "(Include your experience and qualifications)"}
              </span>
            )}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            placeholder={
              formData.category === 'careers' 
                ? (content.careerMessagePlaceholder || "Tell us about your experience, skills, and why you'd like to join Ethronics...")
                : (content.messagePlaceholder || "Your message...")
            }
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 dark:text-white"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isUploading}
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {formData.category === 'careers' ? (content.uploading || "Uploading...") : (content.sending || "Sending...")}
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              {formData.category === 'careers' ? (content.submitApplication || "Submit Application") : (content.sendButton || "Send Message")}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
// Contact Details Component
const ContactDetails = ({ content }) => {
  if (!content) return null;
  
  const socialLinks = [
    {
      Icon: Linkedin,
      href: content.linkedinUrl || "https://et.linkedin.com/company/ethronics"
    }
  ]

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {content.title}
        </h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {content.email || "Email"}
              </p>
              <a
                href={`mailto:${content.emailAddress || 'contact@ethronics.org'}`}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                {content.emailAddress || "contact@ethronics.org"}
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {content.phone || "Phone"}
              </p>
              <a
                href={`tel:${content.phoneNumber || '+251978467467'}`}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                {content.phoneNumber || "+(251) 978-467-467"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {content.followUs || "Follow Us"}
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

// Location Component
const LocationMap = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <MapPin className="w-5 h-5 text-purple-600 mr-2" />
        {content.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {content.address}<br />
        {content.city}
      </p>
      <div className="relative h-64 w-full rounded-lg overflow-hidden">
        <iframe
          src={content.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5104963168656!2d39.267508675060384!3d8.546809291496546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1fbf6d421b13%3A0x104c602ab0c730b1!2sEthronics%20-%20Institute%20of%20Robotics%20and%20Autonomous%20Systems%20(IRAS)!5e0!3m2!1sen!2set!4v1744915902755!5m2!1sen!2set"}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

// Main Contact Page Component
const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const { content, loading, error } = useContactContent()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmitSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-16">
      <ContactHero content={content.hero} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <ContactDetails content={content.details} />
            <LocationMap content={content.location} />
          </div>
          <div className="lg:col-span-2">
            <ContactForm content={content.form} onSubmitSuccess={handleSubmitSuccess} />
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {content?.form?.successMessage || "Message sent successfully!"}
        </div>
      )}
    </div>
  )
}

export default Contact