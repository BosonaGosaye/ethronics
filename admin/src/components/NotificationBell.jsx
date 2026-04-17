import { useState, useEffect, useRef } from 'react';
import { Bell, MessageSquare, ClipboardList, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    messages: { new: 0, total: 0 },
    applications: { pending: 0, total: 0 },
    registrations: { pending: 0, total: 0 }
  });
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      const [messagesRes, applicationsRes, registrationsRes] = await Promise.all([
        axios.get('/contact-messages/statistics').catch(() => ({ data: { success: false } })),
        axios.get('/applications/admin/stats').catch(() => ({ data: { success: false } })),
        axios.get('/registrations/admin/stats').catch(() => ({ data: { success: false } }))
      ]);

      const newNotifications = {
        messages: {
          new: messagesRes.data.success ? (messagesRes.data.data.byStatus?.new || 0) : 0,
          total: messagesRes.data.success ? (messagesRes.data.data.total || 0) : 0
        },
        applications: {
          pending: applicationsRes.data.success 
            ? (applicationsRes.data.data.byStatus?.find(s => s._id === 'pending')?.count || 0)
            : 0,
          total: applicationsRes.data.success
            ? (applicationsRes.data.data.byStatus?.reduce((sum, s) => sum + s.count, 0) || 0)
            : 0
        },
        registrations: {
          pending: registrationsRes.data.success ? (registrationsRes.data.data.pending || 0) : 0,
          total: registrationsRes.data.success ? (registrationsRes.data.data.total || 0) : 0
        }
      };

      setNotifications(newNotifications);
    } catch (error) {
      // Silently fail - notifications are not critical
    } finally {
      setLoading(false);
    }
  };

  const totalNotifications = 
    notifications.messages.new + 
    notifications.applications.pending + 
    notifications.registrations.pending;

  const handleNotificationClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        
        {/* Badge */}
        {totalNotifications > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
            {totalNotifications > 9 ? '9+' : totalNotifications}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Notification Items */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading...</p>
              </div>
            ) : totalNotifications === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No new notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {/* New Messages */}
                {notifications.messages.new > 0 && (
                  <Link
                    to="/contact-messages"
                    onClick={handleNotificationClick}
                    className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          New Contact Messages
                        </p>
                        <p className="text-sm text-gray-600">
                          {notifications.messages.new} new message{notifications.messages.new !== 1 ? 's' : ''} waiting for response
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Total: {notifications.messages.total}
                        </p>
                      </div>
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                        {notifications.messages.new}
                      </span>
                    </div>
                  </Link>
                )}

                {/* Pending Applications */}
                {notifications.applications.pending > 0 && (
                  <Link
                    to="/applications"
                    onClick={handleNotificationClick}
                    className="block px-4 py-3 hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Pending Job Applications
                        </p>
                        <p className="text-sm text-gray-600">
                          {notifications.applications.pending} application{notifications.applications.pending !== 1 ? 's' : ''} need review
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Total: {notifications.applications.total}
                        </p>
                      </div>
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 rounded-full">
                        {notifications.applications.pending}
                      </span>
                    </div>
                  </Link>
                )}

                {/* Pending Registrations */}
                {notifications.registrations.pending > 0 && (
                  <Link
                    to="/registrations"
                    onClick={handleNotificationClick}
                    className="block px-4 py-3 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Pending Registrations
                        </p>
                        <p className="text-sm text-gray-600">
                          {notifications.registrations.pending} registration{notifications.registrations.pending !== 1 ? 's' : ''} awaiting approval
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Total: {notifications.registrations.total}
                        </p>
                      </div>
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-yellow-500 rounded-full">
                        {notifications.registrations.pending}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {totalNotifications > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <Link
                to="/"
                onClick={handleNotificationClick}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View Dashboard →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
