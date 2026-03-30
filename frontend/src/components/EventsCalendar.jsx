import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Filter,
  ExternalLink,
  X,
  Eye,
  Share2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EventsCalendar = ({ content, eventsData = [] }) => {
  const { language } = useLanguage();
  
  // Get UI translations from content with fallbacks
  const t = content || {
    title: 'Events Calendar',
    description: 'Upcoming events',
    noEvents: 'No events scheduled',
    register: 'Register',
    viewDetails: 'View Details'
  };
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePopup, setShowDatePopup] = useState(false);

  // Transform backend events data
  const events = eventsData.map(item => ({
    id: item._id,
    title: item.title,
    date: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : new Date(item.publishDate).toISOString().split('T')[0],
    time: item.eventDate ? new Date(item.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '09:00 AM',
    endTime: item.eventEndDate ? new Date(item.eventEndDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '05:00 PM',
    location: item.location || 'TBA',
    type: item.category || 'Event',
    category: item.category || 'General',
    attendees: 0,
    maxAttendees: item.maxAttendees || 100,
    description: item.excerpt || '',
    organizer: item.author?.name || item.author || 'Ethronics',
    registrationRequired: !!item.registrationLink,
    color: getEventColor(item.category)
  }));

  // Get news items from events data (type: news)
  const newsItems = eventsData
    .filter(item => item.type === 'news')
    .map(item => ({
      id: item._id,
      title: item.title,
      date: new Date(item.publishDate).toISOString().split('T')[0],
      type: 'news',
      category: item.category,
      excerpt: item.excerpt,
      author: item.author?.name || item.author || 'Ethronics Team',
      views: item.views || 0
    }));

  function getEventColor(category) {
    const colors = {
      'Technology': 'bg-blue-500',
      'Research': 'bg-indigo-500',
      'Education': 'bg-green-500',
      'Innovation': 'bg-purple-500',
      'Business': 'bg-orange-500',
      'Partnership': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  }

  const monthNames = t.monthNames;
  const daysOfWeek = t.daysOfWeek;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getNewsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return newsItems.filter(news => news.date === dateString);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day.date);
    setShowDatePopup(true);
  };

  const renderCalendarView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = getEventsForDate(current);
      days.push({
        date: new Date(current),
        events: dayEvents,
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString()
      });
      current.setDate(current.getDate() + 1);
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {monthNames[month]} {year}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              {t.buttons.today}
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`min-h-24 p-2 border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                !day.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900' : ''
              } ${day.isToday ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
            >
              <div className={`text-sm font-medium mb-1 ${
                !day.isCurrentMonth ? 'text-gray-400' : 
                day.isToday ? 'text-purple-600 dark:text-purple-400' : 
                'text-gray-900 dark:text-white'
              }`}>
                {day.date.getDate()}
              </div>
              
              <div className="space-y-1">
                {day.events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${event.color} text-white`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="opacity-90">{formatTime(event.time)}</div>
                  </div>
                ))}
                {day.events.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{day.events.length - 2} {t.more}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    if (events.length === 0) {
      return (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t.noEvents || 'No Events Scheduled'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t.noEventsDescription || 'Check back later for upcoming events.'}
          </p>
        </div>
      );
    }

    const upcomingEvents = events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                    {event.type}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                    {event.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {event.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(event.time)} - {formatTime(event.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxAttendees} {t.attendees}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  {t.buttons.viewDetails}
                </button>
                {event.registrationRequired && (
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-sm">
                    {t.buttons.register}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t.viewModes.month}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t.viewModes.list}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              {t.buttons.filter}
            </button>
          
          </div>
        </div>

        {/* Calendar Content */}
        {viewMode === 'month' ? renderCalendarView() : renderListView()}

        {/* Date Popup Modal */}
        {showDatePopup && selectedDate && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setShowDatePopup(false)}
              ></div>

              <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatDate(selectedDate.toISOString().split('T')[0])}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDatePopup(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Events Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      {t.eventsSection}
                    </h4>
                    {getEventsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-3">
                        {getEventsForDate(selectedDate).map((event) => (
                          <div 
                            key={event.id}
                            onClick={() => {
                              setShowDatePopup(false);
                              setSelectedEvent(event);
                            }}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`}></div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {event.title}
                                </h5>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatTime(event.time)} - {formatTime(event.endTime)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">{t.noEvents}</p>
                      </div>
                    )}
                  </div>

                  {/* News Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      {t.newsSection}
                    </h4>
                    {getNewsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-3">
                        {getNewsForDate(selectedDate).map((news) => (
                          <div 
                            key={news.id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                    {news.category}
                                  </span>
                                </div>
                                <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {news.title}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {news.excerpt}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                  <span>{t.by} {news.author}</span>
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{news.views} {t.views}</span>
                                  </div>
                                </div>
                              </div>
                              <button className="ml-4 p-2 text-gray-400 hover:text-purple-600 transition-colors">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">{t.noNews}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setSelectedEvent(null)}
              ></div>

              <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${selectedEvent.color}`}></div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t.organizedBy} {selectedEvent.organizer}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-5 w-5" />
                      <span>{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Clock className="h-5 w-5" />
                      <span>{formatTime(selectedEvent.time)} - {formatTime(selectedEvent.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-5 w-5" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Users className="h-5 w-5" />
                      <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees} {t.attendees}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {selectedEvent.description}
                  </p>

                  <div className="flex gap-3">
                    {selectedEvent.registrationRequired && (
                      <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {t.buttons.registerNow}
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      {t.buttons.addToCalendar}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsCalendar;