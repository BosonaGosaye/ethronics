import { useState } from 'react';
import { User, Award, BookOpen, Calendar, ArrowRight, MapPin, Linkedin, Twitter, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AuthorSpotlight = ({ content, loading }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content?.ui || {
    title: 'Featured Authors',
    description: 'Meet our expert contributors',
    authors: []
  };
  const [selectedAuthor, setSelectedAuthor] = useState(0);

  const featuredAuthors = content?.authors || t.authors.length > 0 ? t.authors : [];

  const displayTitle = content?.title || t.title;
  const displayDescription = content?.description || t.description;

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (!featuredAuthors || featuredAuthors.length === 0) {
    return null;
  }

  const currentAuthor = featuredAuthors[selectedAuthor];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {displayTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {displayDescription}
          </p>
        </div>

        {/* Author Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            {featuredAuthors.map((author, index) => (
              <button
                key={author.id}
                onClick={() => setSelectedAuthor(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  selectedAuthor === index
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-medium">{author.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Author Profile */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Author Info */}
            <div className="md:w-1/3 p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              <div className="text-center mb-6">
                <img 
                  src={currentAuthor.avatar} 
                  alt={currentAuthor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white/20"
                />
                <h3 className="text-2xl font-bold mb-2">{currentAuthor.name}</h3>
                <p className="text-purple-100 mb-2">{currentAuthor.role}</p>
                <p className="text-purple-200 text-sm flex items-center justify-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentAuthor.location}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentAuthor.stats.articles}</div>
                  <div className="text-purple-200 text-sm">{t.articles}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentAuthor.stats.citations}</div>
                  <div className="text-purple-200 text-sm">{t.citations}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentAuthor.stats.yearsExperience}</div>
                  <div className="text-purple-200 text-sm">{t.yearsExp}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentAuthor.stats.studentsSupervised}</div>
                  <div className="text-purple-200 text-sm">{t.students}</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <a 
                  href={currentAuthor.social.linkedin}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href={currentAuthor.social.twitter}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href={currentAuthor.social.website}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Author Details */}
            <div className="md:w-2/3 p-8">
              {/* Bio */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t.about}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentAuthor.bio}
                </p>
              </div>

              {/* Expertise */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t.expertise}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentAuthor.expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t.achievements}
                </h4>
                <ul className="space-y-2">
                  {currentAuthor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Articles */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {t.recentArticles}
                </h4>
                <div className="space-y-4">
                  {currentAuthor.recentArticles.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors group">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {article.title}
                        </h5>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                          <span>{article.readTime}</span>
                          <span>{article.views.toLocaleString()} {t.views}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2">
                  {t.viewAllArticles}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSpotlight;