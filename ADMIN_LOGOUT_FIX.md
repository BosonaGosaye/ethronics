# Admin Logout Issue Fix

## Problem
When clicking on News & Events, Register Page, or Research Page from the admin sidebar, users were being logged out automatically.

## Root Cause
The issue had two parts:

### 1. Incorrect API Endpoints
Admin pages were calling unprotected or non-existent API endpoints:
- **NewsEventsContentEditor**: Called `/newsEvents/:language/:section` instead of `/newsEvents/admin/:language/:section`
- **RegisterContentEditor**: Called `/register/:language/:section` (unprotected route)
- **ResearchContentEditor**: Called `/research/:language/:section` (unprotected route)

### 2. Missing Route Protection
Some admin routes in the backend were not protected with authentication middleware, causing potential 401 errors.

### 3. Axios Interceptor Behavior
The axios response interceptor in `admin/src/utils/axios.js` automatically redirects to `/login` on any 401 error, which logs out the user.

## Solution

### 1. Fixed NewsEventsContentEditor
**File:** `admin/src/pages/NewsEventsContentEditor.jsx`

Changed API calls to use the correct protected admin endpoints:
- `GET /newsEvents/:language/:section` → `GET /newsEvents/admin/:language/:section`
- `POST /newsEvents` → `POST /newsEvents/admin`
- `PATCH /newsEvents/:language/:section/publish` → `PATCH /newsEvents/admin/:language/:section/publish`

### 2. Protected Backend Routes
**Files:** 
- `backend/routes/research.js`
- `backend/routes/register.js`

Added `protect` and `authorize` middleware to routes that were missing protection:

```javascript
// Before (unprotected)
router.get('/:language/:section', researchController.getContentByLanguageSection);

// After (protected)
router.get('/:language/:section', protect, authorize('admin', 'editor'), researchController.getContentByLanguageSection);
```

## Changes Made

### Admin Frontend

#### NewsEventsContentEditor.jsx
```javascript
// fetchAllLanguages function
const response = await axios.get(`/newsEvents/admin/${lang.code}/${urlSection}`);

// handleSave function
await axios.post('/newsEvents/admin', {
  language: lang.code,
  section: urlSection,
  content
});

// togglePublish function
await axios.patch(`/newsEvents/admin/${language}/${urlSection}/publish`);
```

### Backend Routes

#### research.js
```javascript
router.get('/:language/:section', protect, authorize('admin', 'editor'), researchController.getContentByLanguageSection);
```

#### register.js
```javascript
router.get('/:language/:section', protect, authorize('admin'), registerController.getAdminContent);
```

## API Endpoint Structure

### News & Events
- **Public**: `/api/newsEvents/public/:language/:section`
- **Admin GET**: `/api/newsEvents/admin/:language/:section` (protected)
- **Admin POST**: `/api/newsEvents/admin` (protected)
- **Admin PATCH**: `/api/newsEvents/admin/:language/:section/publish` (protected)

### Register
- **Public**: `/api/register/public/:language/:section`
- **Admin GET**: `/api/register/:language/:section` (protected)
- **Admin POST**: `/api/register` (protected)
- **Admin PATCH**: `/api/register/:language/:section/publish` (protected)

### Research
- **Public**: `/api/research/public/:language/:section`
- **Admin GET**: `/api/research/:language/:section` (protected)
- **Admin POST**: `/api/research` (protected)
- **Admin PATCH**: `/api/research/:language/:section/publish` (protected)

## Testing

To verify the fix:

1. **Login to Admin Panel**
   - Navigate to admin login page
   - Login with credentials: admin@ethronics.org / Admin@123456

2. **Test News & Events**
   - Click on "News & Events" in sidebar
   - Click on any section (e.g., "Hero Section")
   - Verify page loads without logout
   - Verify content loads correctly

3. **Test Register Page**
   - Click on "Register Page" in sidebar
   - Click on any section (e.g., "Hero Section")
   - Verify page loads without logout
   - Verify content loads correctly

4. **Test Research Page**
   - Click on "Research Page" in sidebar
   - Click on any section (e.g., "Hero Section")
   - Verify page loads without logout
   - Verify content loads correctly

5. **Test Save Functionality**
   - Make changes to content
   - Click "Save All Languages"
   - Verify save succeeds without logout

6. **Test Publish Toggle**
   - Toggle publish status for any language
   - Verify toggle succeeds without logout

## Files Modified

1. `admin/src/pages/NewsEventsContentEditor.jsx` - Fixed API endpoints
2. `backend/routes/research.js` - Added route protection
3. `backend/routes/register.js` - Added route protection

## Security Improvements

- All admin routes now require authentication (`protect` middleware)
- All admin routes now require admin/editor role (`authorize` middleware)
- Consistent endpoint naming convention for admin routes
- Public routes remain accessible without authentication

## Notes

- The axios interceptor behavior is correct - it should redirect to login on 401 errors
- The issue was that admin pages were calling unprotected routes that could return 401
- Now all admin pages call properly protected routes with authentication tokens
- If a token expires, the user will be redirected to login (expected behavior)
