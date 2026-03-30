import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { ArrowLeft, Save, Key } from 'lucide-react';

const ROLES = [
  { value: 'admin', label: 'Admin', description: 'Full system access' },
  { value: 'editor', label: 'Editor', description: 'Can create and edit content' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
];

export default function UserEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'create';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor',
    isActive: true,
    permissions: {
      content: { create: true, edit: true, delete: false, publish: false },
      jobs: { create: true, edit: true, delete: false, approve: false },
      applications: { view: true, edit: true, delete: false, export: false },
      media: { upload: true, delete: false },
      users: { view: false, create: false, edit: false, delete: false }
    }
  });

  const [resetPassword, setResetPassword] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/users/${id}`);
      const user = response.data.data;
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        permissions: user.permissions
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      alert('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (isNew && !formData.password) {
      alert('Password is required for new users');
      return;
    }

    if (isNew && formData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    try {
      setSaving(true);
      if (isNew) {
        await axios.post('/users', formData);
        alert('User created successfully!');
      } else {
        await axios.patch(`/users/${id}`, formData);
        alert('User updated successfully!');
      }
      navigate('/users');
    } catch (error) {
      console.error('Failed to save user:', error);
      alert(error.response?.data?.message || 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetPassword || resetPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    if (!confirm('Are you sure you want to reset this user\'s password?')) {
      return;
    }

    try {
      await axios.post(`/users/${id}/reset-password`, {
        newPassword: resetPassword
      });
      alert('Password reset successfully!');
      setShowPasswordReset(false);
      setResetPassword('');
    } catch (error) {
      console.error('Failed to reset password:', error);
      alert('Failed to reset password');
    }
  };

  const handleRoleChange = (role) => {
    let defaultPermissions = {};
    
    if (role === 'admin') {
      defaultPermissions = {
        content: { create: true, edit: true, delete: true, publish: true },
        jobs: { create: true, edit: true, delete: true, approve: true },
        applications: { view: true, edit: true, delete: true, export: true },
        media: { upload: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true }
      };
    } else if (role === 'editor') {
      defaultPermissions = {
        content: { create: true, edit: true, delete: false, publish: false },
        jobs: { create: true, edit: true, delete: false, approve: false },
        applications: { view: true, edit: true, delete: false, export: false },
        media: { upload: true, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      };
    } else if (role === 'viewer') {
      defaultPermissions = {
        content: { create: false, edit: false, delete: false, publish: false },
        jobs: { create: false, edit: false, delete: false, approve: false },
        applications: { view: true, edit: false, delete: false, export: false },
        media: { upload: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      };
    }

    setFormData({
      ...formData,
      role,
      permissions: defaultPermissions
    });
  };

  const handlePermissionChange = (category, permission, value) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [category]: {
          ...formData.permissions[category],
          [permission]: value
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Users</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Create New User' : 'Edit User'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                disabled={!isNew}
              />
            </div>

            {isNew && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  minLength={8}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.isActive.toString()}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ROLES.map((role) => (
              <div
                key={role.value}
                onClick={() => handleRoleChange(role.value)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.role === role.value
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="radio"
                    checked={formData.role === role.value}
                    onChange={() => handleRoleChange(role.value)}
                    className="text-teal-600"
                  />
                  <span className="font-medium text-gray-900">{role.label}</span>
                </div>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Permissions</h2>
          <p className="text-sm text-gray-600 mb-4">
            Customize specific permissions for this user
          </p>

          <div className="space-y-6">
            {/* Content Permissions */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Content Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.permissions.content).map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.content[perm]}
                      onChange={(e) => handlePermissionChange('content', perm, e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Jobs Permissions */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Jobs Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.permissions.jobs).map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.jobs[perm]}
                      onChange={(e) => handlePermissionChange('jobs', perm, e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Applications Permissions */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Applications Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.permissions.applications).map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.applications[perm]}
                      onChange={(e) => handlePermissionChange('applications', perm, e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Media Permissions */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Media Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.permissions.media).map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.media[perm]}
                      onChange={(e) => handlePermissionChange('media', perm, e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Users Permissions */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">User Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.permissions.users).map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.users[perm]}
                      onChange={(e) => handlePermissionChange('users', perm, e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Password Reset (Edit Mode Only) */}
        {!isNew && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Reset</h2>
            {!showPasswordReset ? (
              <button
                type="button"
                onClick={() => setShowPasswordReset(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Key className="w-5 h-5" />
                <span>Reset Password</span>
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    minLength={8}
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordReset(false);
                      setResetPassword('');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : isNew ? 'Create User' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
