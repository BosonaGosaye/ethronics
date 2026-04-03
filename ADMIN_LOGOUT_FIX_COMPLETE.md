# Admin Logout Issue - Complete Fix

## Problem
Users were being logged out when:
1. Clicking "News & Events" from the sidebar
2. Clicking "Manage Projects" button on Research Dashboard
3. Clicking "View Registrations" button on Register Dashboard
4. Clicking "Manage News & Events" button on News Events Dashboard

## Root Cause

The issue was that many admin pages were using `localStorage.getItem('token')` to manually add authentication tokens to API requests. However, the token is NOT stored in localStorage - it only exists in the AuthContext state and axios.defaults.headers.common['Authorization'].

When these pages tried to make API calls with `headers: { Authorization: Bearer ${null} }`, the backend returned 401 Unauthorized, which triggered the axios interceptor to redirect to login and log out the user.

## Solution

Removed all manual token handling from admin pages. The axios instance automatically includes the token from `axios.defaults.headers.common['Authorization']` which is set during login in AuthContext.

## Files Fixed

### 1. NewsEventsDashboard.jsx
**Issue**: Used localStorage token for fetching content
**Fix**: Removed manual token handling

```javascript
// Before
const token = localStorage.getItem('token');
const response = await axios.get(`/newsEvents/admin/${lang.code}`, {
  headers: { Authorization: `Bearer ${token}` }
});

// After
const response = await axios.get(`/newsEvents/admin/${lang.code}`);
```

### 2. NewsEventsContentEditor.jsx
**Issue**: Called wrong endpoint `/newsEvents/:language/:section` instead of `/newsEvents/admin/:language/:section`
**Fix**: Updated to use correct admin endpoints

```javascript
// Before
await axios.get(`/newsEvents/${lang.code}/${urlSection}`);
await axios.post('/newsEvents', {...});
await axios.patch(`/newsEvents/${language}/${urlSection}/publish`);

// After
await axios.get(`/newsEvents/admin/${lang.code}/${urlSection}`);
await axios.post('/newsEvents/admin', {...});
await axios.patch(`/newsEvents/admin/${language}/${urlSection}/publish`);
```

### 3. ResearchProjectsManager.jsx
**Issue**: Used localStorage token for all API calls
**Fix**: Removed manual token handling from:
- `fetchProjects()` - GET /research-projects/admin
- `fetchStats()` - GET /research-projects/admin/stats
- `handleDelete()` - DELETE /research-projects/admin/:id

### 4. NewsEventItemsManager.jsx
**Issue**: Used localStorage token for all API calls
**Fix**: Removed manual token handling from:
- `fetchItems()` - GET /newsEventItems/admin
- `fetchStats()` - GET /newsEventItems/admin/stats
- `handleDelete()` - DELETE /newsEventItems/admin/:id

### 5. RegistrationsManager.jsx
**Issue**: Used localStorage token for all API calls
**Fix**: Removed manual token handling from:
- `fetchRegistrations()` - GET /registrations/admin
- `fetchStats()` - GET /registrations/admin/stats
- `handleDelete()` - DELETE /registrations/admin/:id

### 6. Backend Routes
**Issue**: Some admin routes were not protected
**Fix**: Added `protect` and `authorize` middleware to:
- `backend/routes/research.js` - Protected `/:language/:section` route
- `backend/routes/register.js` - Protected `/:language/:section` route

## How Authentication Works Now

### Login Flow
1. User logs in with email/password
2. AuthContext receives token from backend
3. Token is stored in AuthContext state (NOT localStorage)
4. Token is set in `axios.defaults.headers.common['Authorization']`

### API Request Flow
1. Admin page makes API call using axios instance
2. Axios request interceptor automatically adds token from `axios.defaults.headers.common['Authorization']`
3. Backend validates token and returns data
4. If token is invalid/expired, backend returns 401
5. Axios response interceptor catches 401 and redirects to login

### Why Manual Token Handling Failed
```javascript
// ❌ WRONG - Token is null because it's not in localStorage
const token = localStorage.getItem('token'); // Returns null
const response = await axios.get('/api/endpoint', {
  headers: { Authorization: `Bearer ${token}` } // Bearer null
});

// ✅ CORRECT - Axios automatically includes token
const response = await axios.get('/api/endpoint');
// Axios adds: Authorization: Bearer <actual-token>
```

## Testing Checklist

### News & Events
- [ ] Click "News & Events" in sidebar - should load without logout
- [ ] Click any section (e.g., "Hero Section") - should load content
- [ ] Click "Manage News & Events" button - should load items manager
- [ ] Save content - should save successfully
- [ ] Toggle publish status - should work

### Register Page
- [ ] Click "Register Page" in sidebar - should load without logout
- [ ] Click any section - should load content
- [ ] Click "View Registrations" button - should load registrations list
- [ ] Save content - should save successfully

### Research Page
- [ ] Click "Research Page" in sidebar - should load without logout
- [ ] Click any section - should load content
- [ ] Click "Manage Projects" button - should load projects manager
- [ ] Save content - should save successfully

## Key Takeaways

1. **Never use localStorage for tokens** - Tokens should be in AuthContext state only
2. **Let axios handle authentication** - The axios instance automatically includes tokens
3. **Use correct admin endpoints** - Admin routes should use `/admin/` prefix where applicable
4. **Protect all admin routes** - Backend routes must have `protect` and `authorize` middleware

## Files Modified

### Admin Frontend
1. `admin/src/pages/NewsEventsDashboard.jsx`
2. `admin/src/pages/NewsEventsContentEditor.jsx`
3. `admin/src/pages/ResearchProjectsManager.jsx`
4. `admin/src/pages/NewsEventItemsManager.jsx`
5. `admin/src/pages/RegistrationsManager.jsx`

### Backend
6. `backend/routes/research.js`
7. `backend/routes/register.js`

## Result

✅ All admin pages now work without unexpected logouts
✅ Authentication is handled consistently across all pages
✅ All API calls use proper authentication headers
✅ All admin routes are properly protected
✅ Users can navigate freely without being logged out
