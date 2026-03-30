import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FAQContact = ({ content }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.question) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    try {
      setSubmitting(true);
      setSubmitStatus(null);

      await axios.post(`${API_URL}/faq-questions/submit`, {
        ...formData,
        language
      });

      setSubmitStatus({ 
        type: 'success', 
        message: 'Question submitted successfully! We will get back to you soon.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', question: '' });
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit question. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!content) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {content.description}
            </p>
          </div>

          {/* Contact Cards */}
          {content.contactMethods && content.contactMethods.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {content.contactMethods.map((method, index) => {
                const getIcon = () => {
                  switch (method.icon) {
                    case 'Mail': return Mail;
                    case 'Phone': return Phone;
                    case 'MessageCircle': return MessageCircle;
                    default: return Mail;
                  }
                };
                const Icon = getIcon();
                const colorClass = index === 0 ? 'purple' : index === 1 ? 'blue' : 'green';

                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className={`bg-${colorClass}-100 dark:bg-${colorClass}-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${colorClass}-600 dark:text-${colorClass}-400`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                      {method.description}
                    </p>
                    {method.link ? (
                      <a
                        href={method.link}
                        className={`text-${colorClass}-600 dark:text-${colorClass}-400 hover:text-${colorClass}-700 dark:hover:text-${colorClass}-300 font-medium`}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <button className={`text-${colorClass}-600 dark:text-${colorClass}-400 hover:text-${colorClass}-700 dark:hover:text-${colorClass}-300 font-medium`}>
                        {method.value}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Visit Us Section */}
          {content.form && content.visit && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side - Contact Form */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.form.title}
                  </h3>
                  
                  {submitStatus && (
                    <div className={`mb-4 p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {content.form.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={submitting}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 disabled:opacity-50"
                        placeholder={content.form.namePlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {content.form.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={submitting}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 disabled:opacity-50"
                        placeholder={content.form.emailPlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {content.form.questionLabel}
                      </label>
                      <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        disabled={submitting}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 disabled:opacity-50"
                        placeholder={content.form.questionPlaceholder}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      {submitting ? 'Submitting...' : content.form.submitButton}
                    </button>
                  </form>
                </div>

                {/* Right Side - Visit Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.visit.title}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {content.visit.addressTitle}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                          {content.visit.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {content.visit.hoursTitle}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                          {content.visit.hours}
                        </p>
                      </div>
                    </div>

                    {content.visit.tour && (
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
                        <h4 className="font-semibold mb-2">{content.visit.tour.title}</h4>
                        <p className="text-purple-100 text-sm mb-4">
                          {content.visit.tour.description}
                        </p>
                        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200">
                          {content.visit.tour.button}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQContact;
