import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  Filter, 
  Calendar,
  Eye,
  FileText,
  Briefcase,
  UserPlus,
  LogIn,
  Download,
  RefreshCw
} from 'lucide-react';

const ACTION_COLORS = {
  login: 'bg-green-100 text-green-800 border-green-200',
  logout: 'bg-gray-100 text-gray-800 border-gray-200',
  content_create: 'bg-blue-100 text-blue-800 border-blue-200',
  content_update: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  content_delete: 'bg-red-100 text-red-800 border-red-200',
  content_publish: 'bg-green-100 text-green-800 border-green-200',
  job_create: 'bg-blue-100 text-blue-800 border-blue-200',
  job_approve: 'bg-green-100 text-green-800 border-green-200',
  job_reject: 'bg-red-100 text-red-800 border-red-200',
  application_view: 'bg-purple-100 text-purple-800 border-purple-200',
  user_create: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  user_update: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  user_delete: 'bg-red-100 text-red-800 border-red-200',
  media_upload: 'bg-cyan-100 text-cyan-800 border-cyan-200'
};

const ACTION_ICONS = {
  login: LogIn,
  content_create: FileText,
  content_update: FileText,
  job_create: Briefcase,
  job_approve: Briefcase,
  application_view: Eye,
  user_create: UserPlus,
  user_update: Users,
  media_upload: Download
};

export default function ActivityDashboard() {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState({
    action: '',
    resource: '',
    userId: '',
    startDate: '',
    endDate: '',
    limit: 50
  });
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    fetchData();
  }, [filter, dateRange]);

  useEffect(() => {
    // Update date filter based on range selection
    const now = new Date();
    let startDate = '';
    
    switch (dateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString();
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
        break;
      case 'all':
        startDate = '';
        break;
    }
    
    if (dateRange !== 'custom') {
      setFilter(prev => ({ ...prev, startDate, endDate: '' }));
    }
  }, [dateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchActivities(),
        fetchStats()
      ]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const params = {};
      if (filter.action) params.action = filter.action;
      if (filter.resource) params.resource = filter.resource;
      if (filter.userId) params.userId = filter.userId;
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;
      params.limit = filter.limit;

      const response = await axios.get('/users/activities/all', { params });
      setActivities(response.data.data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const params = {};
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;

      const response = await axios.get('/users/activities/stats', { params });
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const getActionLabel = (action) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getActionColor = (action) => {
    return ACTION_COLORS[action] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getActionIcon = (action) => {
    const Icon = ACTION_ICONS[action] || Activity;
    return Icon;
  };

  if (loading && !stats) {
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
          <h1 className="text-3xl font-bold text-gray-900">Activity Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor system activities and user actions</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Activities */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm font-medium">Total Activities</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <Activity className="w-12 h-12 text-teal-200" />
            </div>
          </div>

          {/* Most Active User */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Most Active User</p>
                <p className="text-lg font-bold mt-2 truncate">
                  {stats.byUser?.[0]?.user?.name || 'N/A'}
                </p>
                <p className="text-sm text-blue-200">
                  {stats.byUser?.[0]?.count || 0} actions
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          {/* Top Action */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Top Action</p>
                <p className="text-lg font-bold mt-2">
                  {getActionLabel(stats.byAction?.[0]?._id || 'N/A')}
                </p>
                <p className="text-sm text-purple-200">
                  {stats.byAction?.[0]?.count || 0} times
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          {/* Top Resource */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Top Resource</p>
                <p className="text-lg font-bold mt-2">
                  {stats.byResource?.[0]?._id || 'N/A'}
                </p>
                <p className="text-sm text-orange-200">
                  {stats.byResource?.[0]?.count || 0} actions
                </p>
              </div>
              <FileText className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Actions Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Breakdown</h3>
            <div className="space-y-3">
              {stats.byAction?.slice(0, 8).map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getActionColor(item._id)}`}>
                      {getActionLabel(item._id)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: `${(item.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Users</h3>
            <div className="space-y-3">
              {stats.byUser?.slice(0, 8).map((item, index) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.user?.name}</p>
                      <p className="text-xs text-gray-500">{item.user?.email}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-teal-600">{item.count} actions</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        {/* Date Range Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['today', 'week', 'month', 'all', 'custom'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                dateRange === range
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Type
            </label>
            <select
              value={filter.action}
              onChange={(e) => setFilter({ ...filter, action: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Actions</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="content_create">Content Create</option>
              <option value="content_update">Content Update</option>
              <option value="content_delete">Content Delete</option>
              <option value="content_publish">Content Publish</option>
              <option value="job_create">Job Create</option>
              <option value="job_approve">Job Approve</option>
              <option value="job_reject">Job Reject</option>
              <option value="application_view">Application View</option>
              <option value="user_create">User Create</option>
              <option value="user_update">User Update</option>
              <option value="media_upload">Media Upload</option>
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

          {/* Custom Date Range */}
          {dateRange === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={filter.startDate ? filter.startDate.split('T')[0] : ''}
                  onChange={(e) => setFilter({ ...filter, startDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filter.endDate ? filter.endDate.split('T')[0] : ''}
                  onChange={(e) => setFilter({ ...filter, endDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </>
          )}

          {/* Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Results
            </label>
            <select
              value={filter.limit}
              onChange={(e) => setFilter({ ...filter, limit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {activities.length} activities
      </div>

      {/* Activities Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
        
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
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = getActionIcon(activity.action);
              return (
                <div
                  key={activity._id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${getActionColor(activity.action)}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getActionColor(activity.action)}`}>
                          {getActionLabel(activity.action)}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {activity.resource}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Link
                        to={`/users/${activity.user?._id}/activities`}
                        className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
                      >
                        {activity.user?.name}
                      </Link>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{activity.user?.email}</span>
                      {activity.user?.role && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                            {activity.user.role}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Details */}
                    {activity.details && Object.keys(activity.details).length > 0 && (
                      <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                        <div className="flex flex-wrap gap-3 text-xs">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-500">{key}:</span>
                              <span className="ml-1 font-medium text-gray-700">
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status and IP */}
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      {activity.status && (
                        <span className={`px-2 py-0.5 rounded-full ${
                          activity.status === 'success' ? 'bg-green-100 text-green-700' :
                          activity.status === 'failure' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {activity.status}
                        </span>
                      )}
                      {activity.ipAddress && (
                        <span>IP: {activity.ipAddress}</span>
                      )}
                      {activity.status === 'failure' && activity.errorMessage && (
                        <span className="text-red-600">Error: {activity.errorMessage}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
