import React, { useState } from 'react';
import { Mail, CheckCircle, Bell, Users, TrendingUp, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NewsletterSignup = ({ content }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content || {
    title: 'Subscribe to Newsletter',
    description: 'Get the latest updates',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    topics: []
  };
  
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const topicIcons = {
    technology: TrendingUp,
    research: Globe,
    events: Bell,
    partnerships: Users,
    innovation: TrendingUp,
    education: Users
  };

  const topics = t.topics.map((topic, index) => ({
    id: ['technology', 'research', 'events', 'partnerships', 'innovation', 'education'][index],
    label: topic,
    icon: Object.values(topicIcons)[index]
  }));

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && selectedTopics.length > 0) {
      setIsSubscribed(true);
      // Here you would typically send the data to your backend
      console.log('Newsletter subscription:', { email, topics: selectedTopics });
    }
  };

  if (isSubscribed) {
    return (
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.successTitle}
          </h2>
          <p className="text-green-100 text-lg mb-6">
            {t.successMessage}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {selectedTopics.map(topicId => {
              const topic = topics.find(t => t.id === topicId);
              return (
                <span key={topicId} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                  {topic?.label}
                </span>
              );
            })}
          </div>
          <button 
            onClick={() => {
              setIsSubscribed(false);
              setEmail('');
              setSelectedTopics([]);
            }}
            className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            {t.subscribeAnother}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
              <Mail className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                {t.topicsLabel}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topics.map((topic) => {
                  const IconComponent = topic.icon;
                  const isSelected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleTopicToggle(topic.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isSelected 
                          ? 'bg-purple-100 dark:bg-purple-800' 
                          : 'bg-gray-100 dark:bg-gray-600'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{topic.label}</span>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frequency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t.frequencyLabel}
              </label>
              <div className="flex flex-wrap gap-3">
                {t.frequencies.map((frequency, index) => (
                  <label key={frequency} className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      value={frequency.toLowerCase()}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      defaultChecked={index === 0}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{frequency}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.privacyNotice}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!email || selectedTopics.length === 0}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                       disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {t.submitButton}
            </button>
          </form>

          {/* Newsletter Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{t.stats[0].value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.stats[0].label}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{t.stats[1].value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.stats[1].label}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{t.stats[2].value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.stats[2].label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;