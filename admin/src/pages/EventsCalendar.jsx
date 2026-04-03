import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, 
  List, Filter, ArrowLeft, Eye, Edit, Trash2, MapPin, Users
} from 'lucide-react';

export default function EventsCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'list'
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: 'en',
    category: '',
    status: 'published'
  });

  useEffect(() => {
    fetchEvents();
  }, [currentDate, filters]);

  const fetchEvents = async () => {
    try {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const params = new URLSearchParams({
        type: 'events',
        language: filters.language,
        status: filters.status,
        limit: 100
      });
      
      if (filters.category) params.append('category', filters.category);
      
      const response = await axios.get(`/news-event-items/admin?${params}`);
      
      if (response.data.success) {
        // Filter events within the current month
        const monthEvents = response.data.data.filter(event => {
          if (!event.eventDate) return false;
          const eventDate = new Date(event.eventDate);
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        });
        setEvents(monthEvents);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleCreateEvent = (date = null) => {
    const eventDate = date || selectedDate || new Date();
    const formattedDate = eventDate.toISOString().slice(0, 16);
    navigate(`/news-event-item-editor/new?type=events&eventDate=${formattedDate}&language=${filters.language}`);
  };

  const handleEditEvent = (eventId) => {
    navigate(`/news-event-item-editor/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await axios.delete(`/news-event-items/admin/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event');
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarView = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-32 bg-gray-50 border border-gray-200"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`min-h-32 border border-gray-200 p-2 cursor-pointer transition-colors ${
            isToday ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'
          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>
          
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event._id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditEvent(event._id);
                }}
                className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate hover:bg-blue-200 transition-colors"
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 pl-1">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCreateEvent(date);
            }}
            className="mt-2 w-full text-xs text-blue-600 hover:text-blue-800 flex items-center justify-center space-x-1 py-1 hover:bg-blue-50 rounded transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Event</span>
          </button>
        </div>
      );
    }
    
    return days;
  };

  const renderListView = () => {
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.eventDate) - new Date(b.eventDate)
    );

    if (sortedEvents.length === 0) {
      return (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No events scheduled for this month</p>
          <button
            onClick={() => handleCreateEvent()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create First Event
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {sortedEvents.map(event => (
          <div key={event._id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'published' ? 'bg-green-100 text-green-800' :
                    event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{event.excerpt}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(event.eventDate).toLocaleString()}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.maxAttendees && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{event.currentAttendees || 0} / {event.maxAttendees}</span>
                    </div>
                  )}
                </div>
                
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEditEvent(event._id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/news-event-items')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events Calendar</h1>
            <p className="text-gray-600 mt-1">Manage events with calendar view</p>
          </div>
        </div>
        
        <button
          onClick={() => handleCreateEvent()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Month Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900 min-w-48 text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleToday}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Today
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('month')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'month' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
              title="Month View"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
              <option value="om">Afaan Oromoo</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="research">Research</option>
              <option value="education">Education</option>
              <option value="partnerships">Partnerships</option>
              <option value="innovation">Innovation</option>
              <option value="sustainability">Sustainability</option>
              <option value="community">Community</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar/List View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {viewMode === 'month' ? (
          <>
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {dayNames.map(day => (
                <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {renderCalendarView()}
            </div>
          </>
        ) : (
          <div className="p-6">
            {renderListView()}
          </div>
        )}
      </div>

      {/* Selected Date Info */}
      {selectedDate && viewMode === 'month' && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">
                Selected: {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                {getEventsForDate(selectedDate).length} event(s) scheduled
              </p>
            </div>
            <button
              onClick={() => handleCreateEvent(selectedDate)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Create Event on This Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
