# Site Settings Management Guide

## Overview
The site settings feature allows you to manage global site configuration like the logo through the admin panel.

## What Was Implemented

### Backend
- **Model**: `backend/models/SiteSettings.js` - Stores logo URL and site name
- **Controller**: `backend/controllers/siteSettingsController.js` - Handles get/update operations
- **Routes**: `backend/routes/siteSettings.js` - Public GET, protected PUT endpoints
- **API Endpoint**: `/api/site-settings`

### Admin Panel
- **Page**: `admin/src/pages/SiteSettings.jsx` - Settings management interface
- **Navigation**: Added "Site Settings" link to admin sidebar
- **Features**:
  - Upload logo via Media Library
  - Edit site name
  - Preview current logo
  - Save changes

### Frontend
- **Navbar**: Fetches and displays logo from backend
- **Footer**: Fetches and displays logo from backend
- **Fallback**: Uses `/logo.png` if fetch fails or no logo is set

## How to Use

### 1. Access Settings
1. Log in to admin panel
2. Click "Site Settings" in the sidebar (bottom of the list)

### 2. Upload Logo
1. Click "Upload Logo" button
2. Select an image from Media Library or upload new one
3. Logo preview will update
4. Click "Save Settings" to apply changes

### 3. Frontend Updates
- Logo changes appear immediately on frontend after saving
- Both Navbar and Footer fetch the logo on page load
- Fallback to `/logo.png` if backend is unavailable

## Technical Details

### API Endpoints
```
GET  /api/site-settings          - Public, returns current settings
PUT  /api/site-settings          - Protected (admin/editor), updates settings
```

### Response Format
```json
{
  "success": true,
  "data": {
    "logo": "https://cloudinary.com/...",
    "siteName": "Ethronics",
    "updatedAt": "2026-03-31T..."
  }
}
```

### Frontend Integration
Both Navbar and Footer use this pattern:
```javascript
const [logo, setLogo] = useState('/logo.png');

useEffect(() => {
  fetchLogo();
}, []);

const fetchLogo = async () => {
  try {
    const response = await axios.get(`${API_URL}/site-settings`);
    if (response.data.data.logo) {
      setLogo(response.data.data.logo);
    }
  } catch (error) {
    console.error('Error fetching logo:', error);
  }
};
```

## Next Steps

1. **Upload Logo**: Go to admin settings and upload your logo
2. **Test**: Verify logo appears on frontend Navbar and Footer
3. **Hero Images**: Upload hero slide images through Home Content editor

## Troubleshooting

### Logo Not Showing
- Check if logo was saved in admin settings
- Verify API URL is correct in frontend `.env`
- Check browser console for errors
- Ensure Cloudinary is configured properly

### Can't Access Settings
- Verify you're logged in as admin or editor
- Check that route is registered in `admin/src/App.jsx`
- Ensure "Site Settings" appears in sidebar navigation
