import { 
  X, MapPin, Briefcase, DollarSign, Calendar, Clock, 
  Building, Users, Star, Award, CheckCircle, Sparkles,
  TrendingUp, Target, Shield, FileText
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const JobDetailModal = ({ job, isOpen, onClose, onApply }) => {
  const { language } = useLanguage();

  if (!isOpen || !job) return null;

  // The job data is already transformed by useJobs hook
  // It has title, description, requirements, benefits, tags directly on the job object
  const translation = job;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : language === 'am' ? 'am-ET' : 'om-ET', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const labels = {
    en: {
      company: 'Company',
      location: 'Location',
      type: 'Job Type',
      category: 'Category',
      salary: 'Salary',
      deadline: 'Application Deadline',
      posted: 'Posted',
      applicants: 'Applicants',
      rating: 'Company Rating',
      description: 'Job Description',
      requirements: 'Requirements',
      responsibilities: 'Key Responsibilities',
      benefits: 'Benefits & Perks',
      tags: 'Required Skills',
      applyNow: 'Apply Now',
      close: 'Close',
      featured: 'Featured Job',
      overview: 'Job Overview',
      details: 'Job Details',
      qualifications: 'Qualifications',
      whatWeOffer: 'What We Offer'
    },
    am: {
      company: 'ኩባንያ',
      location: 'አካባቢ',
      type: 'የስራ አይነት',
      category: 'ምድብ',
      salary: 'ደመወዝ',
      deadline: 'የማመልከቻ የመጨረሻ ቀን',
      posted: 'የተለጠፈበት',
      applicants: 'አመልካቾች',
      rating: 'የኩባንያ ደረጃ',
      description: 'የስራ መግለጫ',
      requirements: 'መስፈርቶች',
      responsibilities: 'ቁልፍ ኃላፊነቶች',
      benefits: 'ጥቅሞች እና ፓርኮች',
      tags: 'የሚያስፈልጉ ክህሎቶች',
      applyNow: 'አሁን ያመልክቱ',
      close: 'ዝጋ',
      featured: 'ተለይቶ የቀረበ ስራ',
      overview: 'የስራ አጠቃላይ እይታ',
      details: 'የስራ ዝርዝሮች',
      qualifications: 'ብቃቶች',
      whatWeOffer: 'የምናቀርበው'
    },
    om: {
      company: 'Dhaabbata',
      location: 'Bakka',
      type: 'Gosa Hojii',
      category: 'Ramaddii',
      salary: 'Mindaa',
      deadline: 'Guyyaa Xumuraa Iyyannoo',
      posted: 'Guyyaa Maxxanfame',
      applicants: 'Iyyattoota',
      rating: 'Sadarkaa Dhaabbataa',
      description: 'Ibsa Hojii',
      requirements: 'Ulaagaalee',
      responsibilities: 'Itti Gaafatamummaa Ijoo',
      benefits: 'Faayidaalee fi Qabeenya',
      tags: 'Dandeettii Barbaachisaa',
      applyNow: 'Amma Iyyannoo Galchi',
      close: 'Cufi',
      featured: 'Hojii Addaa',
      overview: 'Ilaalcha Waliigalaa Hojii',
      details: 'Bal\'ina Hojii',
      qualifications: 'Qajeelfama',
      whatWeOffer: 'Waan Dhiyeessinu'
    }
  };

  const t = labels[language] || labels.en;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {translation.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                {job.company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Featured Badge */}
            {job.featured && (
              <div className="mb-6 flex items-center justify-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">{t.featured}</span>
                </div>
              </div>
            )}

            {/* Company Logo & Info */}
            {job.companyLogo && (
              <div className="flex justify-center mb-6">
                <img 
                  src={job.companyLogo} 
                  alt={job.company}
                  className="h-20 w-20 object-contain rounded-lg border-2 border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Job Overview Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{t.overview}</span>
              </h3>
              
              {/* Job Info Grid - Enhanced with ALL fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{t.company}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{job.company}</p>
                    {job.companySize && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{job.companySize} employees</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="p-2 bg-green-600 dark:bg-green-500 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">{t.location}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{job.location}</p>
                    {job.workMode && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">{job.workMode}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="p-2 bg-purple-600 dark:bg-purple-500 rounded-lg">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{t.type}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{job.type}</p>
                    {job.duration && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{job.duration}</p>
                    )}
                  </div>
                </div>

                {job.category && (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <div className="p-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{t.category}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{job.category}</p>
                      {job.companyIndustry && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{job.companyIndustry}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="p-2 bg-yellow-600 dark:bg-yellow-500 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">{t.salary}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{job.salary}</p>
                    {job.salaryMin > 0 && job.salaryMax > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {job.salaryCurrency} {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} / {job.salaryPeriod}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="p-2 bg-red-600 dark:bg-red-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">{t.deadline}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{formatDate(job.deadline)}</p>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                  <div className="p-2 bg-cyan-600 dark:bg-cyan-500 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Experience</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{job.experienceLevel}</p>
                    {job.yearsOfExperience && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{job.yearsOfExperience}</p>
                    )}
                  </div>
                </div>

                {/* Education Level */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl border border-pink-200 dark:border-pink-800">
                  <div className="p-2 bg-pink-600 dark:bg-pink-500 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">Education</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{job.educationLevel.replace('-', ' ')}</p>
                  </div>
                </div>

                {/* Number of Positions */}
                {job.numberOfPositions > 1 && (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="p-2 bg-orange-600 dark:bg-orange-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Positions</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{job.numberOfPositions} openings</p>
                    </div>
                  </div>
                )}

                {/* Start Date */}
                {job.startDate && (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl border border-teal-200 dark:border-teal-800">
                    <div className="p-2 bg-teal-600 dark:bg-teal-500 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">Start Date</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formatDate(job.startDate)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.posted}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(job.postedDate || job.createdAt)}
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-400 mb-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.applicants}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {job.applicants}
                  </p>
                </div>

                {job.rating > 0 && (
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.rating}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {job.rating.toFixed(1)} / 5.0
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

            {/* Company Description */}
            {translation.companyDescription && (
              <>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Building className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>About the Company</span>
                  </h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {translation.companyDescription}
                    </p>
                    {job.companyWebsite && (
                      <a
                        href={job.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                      >
                        Visit Company Website →
                      </a>
                    )}
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
              </>
            )}

            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>{t.description}</span>
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {translation.description}
                </p>
              </div>
            </div>

            {/* Responsibilities Section */}
            {translation.responsibilities && translation.responsibilities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span>{t.responsibilities}</span>
                </h3>
                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <ul className="space-y-3">
                    {translation.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-orange-600 dark:bg-orange-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Qualifications Section */}
            {translation.qualifications && translation.qualifications.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>{t.qualifications}</span>
                </h3>
                <div className="bg-teal-50 dark:bg-teal-900/10 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
                  <ul className="space-y-3">
                    {translation.qualifications.map((qual, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Requirements Section */}
            {translation.requirements && translation.requirements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>{t.qualifications}</span>
                </h3>
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <ul className="space-y-3">
                    {translation.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            {translation.benefits && translation.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{t.whatWeOffer}</span>
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {translation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Additional Benefits Badges */}
                  {(job.travelRequired || job.relocationAssistance || job.visaSponsorship) && (
                    <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Additional Perks:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.relocationAssistance && (
                          <span className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1.5" />
                            Relocation Assistance
                          </span>
                        )}
                        {job.visaSponsorship && (
                          <span className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1.5" />
                            Visa Sponsorship
                          </span>
                        )}
                        {job.travelRequired && (
                          <span className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white rounded-full text-xs font-medium">
                            <MapPin className="w-3 h-3 mr-1.5" />
                            Travel Opportunities
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Nice to Have Section */}
            {translation.niceToHave && translation.niceToHave.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <span>Nice to Have</span>
                </h3>
                <div className="bg-pink-50 dark:bg-pink-900/10 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
                  <ul className="space-y-3">
                    {translation.niceToHave.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-pink-600 dark:bg-pink-500 flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Skills/Tags Section */}
            {translation.tags && translation.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>{t.tags}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {translation.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Application Process */}
            {translation.applicationProcess && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span>Application Process</span>
                </h3>
                <div className="bg-cyan-50 dark:bg-cyan-900/10 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {translation.applicationProcess}
                  </p>
                </div>
              </div>
            )}

            {/* Interview Process */}
            {translation.interviewProcess && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Interview Process</span>
                </h3>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {translation.interviewProcess}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Information */}
            {translation.bonusInfo && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Additional Information</span>
                </h3>
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {translation.bonusInfo}
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {(job.contactEmail || job.contactPhone || job.contactPerson) && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span>Contact Information</span>
                </h3>
                <div className="bg-violet-50 dark:bg-violet-900/10 rounded-xl p-6 border border-violet-200 dark:border-violet-800 space-y-2">
                  {job.contactPerson && (
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Contact Person:</span> {job.contactPerson}
                    </p>
                  )}
                  {job.contactEmail && (
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Email:</span>{' '}
                      <a href={`mailto:${job.contactEmail}`} className="text-violet-600 dark:text-violet-400 hover:underline">
                        {job.contactEmail}
                      </a>
                    </p>
                  )}
                  {job.contactPhone && (
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Phone:</span>{' '}
                      <a href={`tel:${job.contactPhone}`} className="text-violet-600 dark:text-violet-400 hover:underline">
                        {job.contactPhone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {t.close}
            </button>
            <button
              onClick={() => onApply(job)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
            >
              {t.applyNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
