import React, { useState, useEffect } from 'react';
import NewsEventsHero from '../components/NewsEventsHero';
import NewsEventsFilter from '../components/NewsEventsFilter';
import FeaturedNews from '../components/FeaturedNews';
import NewsGrid from '../components/NewsGrid';
import EventsCalendar from '../components/EventsCalendar';
import MediaCenter from '../components/MediaCenter';
import { useLanguage } from '../contexts/LanguageContext';
import { useNewsEventsContent } from '../hooks/useNewsEventsContent';

const NewsEvents = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch content from backend
  const { content, featuredNews, newsItems, loading, error } = useNewsEventsContent(language);

  // Filter events for calendar (items with type 'events' or with eventDate)
  const eventsForCalendar = newsItems.filter(item => 
    item.type === 'events' || item.eventDate
  );

  // Fetch media items
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState(null);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        setMediaLoading(true);
        setMediaError(null);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const url = `${apiUrl}/mediaItems/public?language=${language}&limit=12`;
        
        console.log('Fetching media items from:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Media items response:', data);
        
        if (data.success) {
          console.log('Media items fetched:', data.data.length);
          setMediaItems(data.data);
        } else {
          console.error('Failed to fetch media items:', data.message);
          setMediaError(data.message || 'Failed to load media');
        }
      } catch (error) {
        console.error('Error fetching media items:', error);
        setMediaError(error.message);
      } finally {
        setMediaLoading(false);
      }
    };
    
    fetchMediaItems();
  }, [language]);

  // Calculate real statistics from database
  const realStats = {
    articles: newsItems.filter(item => item.type === 'news').length,
    events: eventsForCalendar.length,
    subscribers: 0, // This would come from newsletter subscriptions if implemented
    partners: 0 // This would come from partners database if implemented
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NewsEventsHero content={content.hero} realStats={realStats} />
      <NewsEventsFilter 
        content={content.filter}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FeaturedNews content={content.featured} featuredItems={featuredNews} />
      <NewsGrid 
        content={content.newsGrid}
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
      <EventsCalendar content={content.eventsCalendar} eventsData={eventsForCalendar} />
      <MediaCenter content={content.mediaCenter} mediaItems={mediaItems} />
    </div>
  );
};

export default NewsEvents;