import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Activity, Filter, Calendar, Download } from 'lucide-react';

const ACTION_COLORS = {
  login: 'bg-green-100 text-green-800',
  logout: 'bg-gray-100 text-gray-800',
  content_create: 'bg-blue-100 text-blue-800',
  content_update: 'bg-yellow-100 text-yellow-800',
  content_delete: 'bg-red-100 text-red-800',
  job_create: 'bg-blue-100 text-blue-800',
  job_approve: 'bg-green-100 text-green-800',
  job_reject: 'bg-red-100 text-red-800',
  application_view: 'bg-purple-100 text-purple-800',
  user_create: 'bg-indigo-100 text-indigo-800',
  user_update: 'bg-yellow-100 text-yellow-800',
  user_delete: 'bg-red-100 text-red-800'
};

export default function UserActivities() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    action: '',
    resource: '',
    startDate: '',
    endDate: '',
    limit: 50
  });

  useEffect(() => {
    fetchUser();
    fetchActivities();
  }, [userId, filter]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setUser(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter.action) params.action = filter.action;
      if (filter.resource) params.resource = filter.resource;
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;
      params.limit = filter.limit;

      const response = await axios.get(`/users/${userId}/activities`, { params });
      setActivities(response.data.data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionLabel = (action) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getActionColor = (action) => {
    return ACTION_COLORS[action] || 'bg-gray-100 text-gray-800';
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/users')}
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Users</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600 mt-2">
            {user.name} ({user.email})
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <Activity className="w-5 h-5 text-teal-600" />
          <span className="font-semibold text-gray-900">{activities.length} Activities</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Action
            </label>
            <select
              value={filter.action}
              onChange={(e) => setFilter({ ...filter, action: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Actions</option>
              <option value="login">Login</option>
              <option value="content_create">Content Create</option>
              <option value="content_update">Content Update</option>
              <option value="content_delete">Content Delete</option>
              <option value="job_create">Job Create</option>
              <option value="job_approve">Job Approve</option>
              <option value="application_view">Application View</option>
              <option value="user_create">User Create</option>
              <option value="user_update">User Update</option>
            </select>
          </div>

          {/* Resource Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource
            </label>
            <input
              type="text"
              value={filter.resource}
              onChange={(e) => setFilter({ ...filter, resource: e.target.value })}
              placeholder="e.g., Job, User, Content"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Start Date
            </label>
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No activities found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity._id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'failure' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  )}
                </div>

                {/* Activity Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(activity.action)}`}>
                        {getActionLabel(activity.action)}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {activity.resource}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Details */}
                  {activity.details && Object.keys(activity.details).length > 0 && (
                    <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-2">Details:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {activity.details.method && (
                          <div>
                            <span className="text-gray-500">Method:</span>
                            <span className="ml-2 font-medium">{activity.details.method}</span>
                          </div>
                        )}
                        {activity.details.path && (
                          <div>
                            <span className="text-gray-500">Path:</span>
                            <span className="ml-2 font-mono text-xs">{activity.details.path}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* IP and User Agent */}
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    {activity.ipAddress && (
                      <span>IP: {activity.ipAddress}</span>
                    )}
                    {activity.status === 'failure' && activity.errorMessage && (
                      <span className="text-red-600">Error: {activity.errorMessage}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
