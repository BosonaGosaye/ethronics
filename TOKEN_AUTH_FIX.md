# Token Authentication Fix - Media Upload 401 Error

## Problem
Media upload components were getting 401 Unauthorized errors because they were trying to get the authentication token from `localStorage`, but the token was only stored in React state and axios defaults.

## Root Cause
- `AuthContext` stores token in state: `const [token, setToken] = useState(null)`
- Token is set in axios defaults: `axios.defaults.headers.common['Authorization']`
- Token is NOT stored in localStorage
- Media upload components were using: `localStorage.getItem('token')` → returns `null`
- Result: API requests sent without Authorization header → 401 Unauthorized

## Solution
Changed all media upload components to use the token from AuthContext instead of localStorage.

## Files Modified

### 1. `admin/src/contexts/AuthContext.jsx`
**Change**: Exposed `token` in the context provider
```javascript
// Before
<AuthContext.Provider value={{ user, loading, login, logout }}>

// After
<AuthContext.Provider value={{ user, token, loading, login, logout }}>
```

### 2. `admin/src/components/MediaUploader.jsx`
**Changes**:
- Added `import { useAuth } from '../contexts/AuthContext'`
- Added `const { token } = useAuth()` hook
- Removed `const token = localStorage.getItem('token')`
- Now uses token from AuthContext

### 3. `admin/src/components/MultipleMediaUploader.jsx`
**Changes**:
- Added `import { useAuth } from '../contexts/AuthContext'`
- Added `const { token } = useAuth()` hook
- Removed `const token = localStorage.getItem('token')`
- Now uses token from AuthContext

### 4. `admin/src/components/MediaLibrary.jsx`
**Changes**:
- Added `import { useAuth } from '../contexts/AuthContext'`
- Added `const { token } = useAuth()` hook
- Removed `const token = localStorage.getItem('token')`
- Now uses token from AuthContext

## How It Works Now

### Authentication Flow
1. User logs in via `AuthContext.login()`
2. Token is stored in state: `setToken(token)`
3. Token is set in axios: `axios.defaults.headers.common['Authorization'] = 'Bearer ${token}'`
4. Token is exposed via context: `value={{ user, token, ... }}`

### Media Upload Flow
1. Component imports: `import { useAuth } from '../contexts/AuthContext'`
2. Component gets token: `const { token } = useAuth()`
3. Component uses token in fetch: `headers: { 'Authorization': 'Bearer ${token}' }`
4. Backend validates token → Upload succeeds ✅

## Testing

1. **Restart dev server** (important for changes to take effect):
   ```bash
   cd admin
   npm run dev
   ```

2. **Test media upload**:
   - Log in to admin panel
   - Go to Site Settings
   - Click "Upload Logo"
   - Select an image
   - Should upload successfully without 401 error

3. **Verify token is present**:
   - Open browser console
   - Look for "Token set: Bearer ..." log message
   - Token should be visible in the log

## Why This Approach?

### Pros
- Token stays in memory (more secure than localStorage)
- Token automatically cleared on logout
- Token shared across all components via context
- No XSS vulnerability from localStorage

### Cons
- Token lost on page refresh (user must log in again)
- This is actually a security feature - prevents session hijacking

## Alternative Approach (Not Implemented)

If you want persistent sessions across page refreshes:

1. Store token in localStorage on login
2. Read token from localStorage on app load
3. Validate token with backend
4. Set token in state if valid

This would require changes to AuthContext initialization.

## Next Steps

1. Restart your admin dev server
2. Log in again (token was cleared)
3. Try uploading logo in Site Settings
4. Upload should work without 401 errors
5. If deployed, redeploy admin to Vercel
