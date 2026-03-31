# Localhost URL Fix - Admin Panel

## Issue
The admin panel had several hardcoded `localhost:5001` URLs that prevented it from connecting to the production API when deployed or running locally with production backend.

## Files Fixed

### 1. `admin/src/components/MediaUploader.jsx`
- **Line 76**: Changed hardcoded `http://localhost:5001` to use `VITE_API_URL` environment variable
- **Impact**: Image/video/file uploads now use correct API URL

### 2. `admin/src/components/MultipleMediaUploader.jsx`
- **Line 38**: Changed hardcoded `http://localhost:5001/api/media/upload-image` to use `VITE_API_URL`
- **Impact**: Multiple image uploads now use correct API URL

### 3. `admin/src/components/MediaLibrary.jsx`
- **Line 21**: Changed hardcoded `http://localhost:5001/api/media/list` to use `VITE_API_URL`
- **Impact**: Media library listing now uses correct API URL

## Already Correct (No Changes Needed)

These files already use `import.meta.env.VITE_API_URL` correctly:
- `admin/src/pages/Dashboard.jsx`
- `admin/src/pages/ContactMessagesManager.jsx`
- `admin/src/pages/ApplicationsManager.jsx`
- `admin/src/utils/axios.js`

## How It Works Now

All components now use this pattern:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const response = await fetch(`${API_URL}/endpoint`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

## Environment Configuration

### Local Development
Create `admin/.env`:
```
VITE_API_URL=http://localhost:5001/api
```

### Production (Vercel)
Set environment variable in Vercel dashboard:
```
VITE_API_URL=https://ethronics-api.vercel.app/api
```

## Testing

1. **Local with Production API**:
   - Set `VITE_API_URL=https://ethronics-api.vercel.app/api` in `admin/.env`
   - Restart dev server: `npm run dev`
   - Test media uploads and settings

2. **Production**:
   - Deploy to Vercel
   - Verify environment variable is set
   - Test all media upload features

## Important Notes

1. **Restart Required**: After changing `.env` files, you MUST restart the dev server
2. **Vite Prefix**: Environment variables must start with `VITE_` to be exposed to the client
3. **Fallback**: All components have `|| 'http://localhost:5001/api'` fallback for local development

## Next Steps

1. If running locally, restart your admin dev server
2. If deployed, redeploy admin to Vercel to pick up the changes
3. Test uploading logo in Site Settings
4. Test uploading images in content editors
