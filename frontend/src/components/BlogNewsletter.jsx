import { useState } from 'react';
import { Mail, Send, CheckCircle, Users, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BlogNewsletter = ({ content, loading }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    title: 'Subscribe to Our Newsletter',
    description: 'Get the latest articles delivered to your inbox',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    subscribed: 'Subscribed!',
    frequencies: [],
    topics: []
  };
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('weekly');
  const [selectedTopics, setSelectedTopics] = useState([]);

  const frequencies = content?.frequencies || t.frequencies.length > 0 ? t.frequencies : [];
  const topics = content?.topics || t.topics.length > 0 ? t.topics : [];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1500);
  };

  const toggleTopic = (topicId) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.successTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {t.successMessage}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubscribed(false)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {t.managePreferences}
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                {t.browsePosts}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Mail className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Stats & Benefits */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-300" />
                </div>
                <div className="text-2xl font-bold text-white">25K+</div>
                <div className="text-blue-200 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-green-300" />
                </div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-blue-200 text-sm">Open Rate</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="h-8 w-8 text-purple-300" />
                </div>
                <div className="text-2xl font-bold text-white">3x</div>
                <div className="text-blue-200 text-sm">Per Week</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">{t.whatYouGet}</h3>
              <div className="space-y-3">
                {(t.benefits.length > 0 ? t.benefits : [
                  'Exclusive insights from industry experts',
                  'Early access to research publications',
                  'Curated content tailored to your interests',
                  'Invitations to webinars and events',
                  'No spam, unsubscribe anytime'
                ]).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <form onSubmit={handleSubscribe} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-300" />
                </div>
              </div>

              {/* Frequency Selection */}
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  {t.frequencyLabel}
                </label>
                <div className="space-y-2">
                  {frequencies.map((freq) => (
                    <label key={freq.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value={freq.value}
                        checked={selectedFrequency === freq.value}
                        onChange={(e) => setSelectedFrequency(e.target.value)}
                        className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 focus:ring-purple-500"
                      />
                      <div>
                        <div className="text-white font-medium">{freq.label}</div>
                        <div className="text-gray-300 text-sm">{freq.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic Selection */}
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  <Bell className="inline h-4 w-4 mr-1" />
                  {t.topicsLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                        selectedTopics.includes(topic.id)
                          ? 'bg-white/30 text-white border-2 border-white/50'
                          : 'bg-white/10 text-gray-300 border-2 border-transparent hover:bg-white/20'
                      }`}
                    >
                      <span className="mr-2">{topic.icon}</span>
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
                    {t.subscribing}
                  </>
                ) : (
                  <>
                    {t.subscribeButton}
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="text-gray-300 text-xs text-center">
                {t.privacyNotice}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;