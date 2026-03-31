# Media Library Upload Fix - "O is not a function" Error

## Problem
When trying to upload a logo in Site Settings, the error "O is not a function" occurred.

## Root Cause
1. **Wrong Component**: SiteSettings was using `MediaUploader` component
2. **Wrong Props**: Passing `onSelect` prop but MediaUploader expected `onUpload`
3. **Missing Upload**: MediaLibrary component didn't have upload functionality built-in

## Solution
Changed SiteSettings to use MediaLibrary and enhanced MediaLibrary with upload capability.

## Files Modified

### 1. `admin/src/pages/SiteSettings.jsx`
**Changes**:
- Changed from `MediaUploader` to `MediaLibrary` component
- Updated import: `import MediaLibrary from '../components/MediaLibrary'`
- Changed state: `showMediaUploader` → `showMediaLibrary`
- Updated props to match MediaLibrary API:
  ```jsx
  <MediaLibrary
    isOpen={showMediaLibrary}
    onClose={() => setShowMediaLibrary(false)}
    onSelect={handleMediaSelect}
    type="image"
  />
  ```

### 2. `admin/src/components/MediaLibrary.jsx`
**Enhancements**:

1. **Added Upload State**:
   ```javascript
   const [uploading, setUploading] = useState(false);
   ```

2. **Added Upload Icon Import**:
   ```javascript
   import { X, Search, Image as ImageIcon, Loader, Upload } from 'lucide-react';
   ```

3. **Added Upload Handler**:
   ```javascript
   const handleFileUpload = async (e) => {
     const file = e.target.files[0];
     if (!file) return;

     setUploading(true);
     try {
       const formData = new FormData();
       formData.append('image', file);

       const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
       const response = await fetch(`${API_URL}/media/upload-image`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`
         },
         body: formData
       });

       const data = await response.json();
       if (!response.ok) throw new Error(data.message || 'Upload failed');

       // Refresh media list
       await fetchMedia();
       
       // Auto-select the newly uploaded image
       setSelectedItem(data.data);
     } catch (error) {
       console.error('Error uploading file:', error);
       alert('Upload failed: ' + error.message);
     } finally {
       setUploading(false);
     }
   };
   ```

4. **Added Upload Button to UI**:
   ```jsx
   <label className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
     <Upload className="w-4 h-4" />
     <span>{uploading ? 'Uploading...' : 'Upload New'}</span>
     <input
       type="file"
       accept="image/*"
       onChange={handleFileUpload}
       disabled={uploading}
       className="hidden"
     />
   </label>
   ```

5. **Fixed useEffect Dependencies**:
   ```javascript
   useEffect(() => {
     if (isOpen && token) {
       fetchMedia();
     }
   }, [isOpen, type, token]);
   ```

## How It Works Now

### Upload Flow
1. User clicks "Upload Logo" in Site Settings
2. MediaLibrary modal opens
3. User can either:
   - **Select existing image** from the library
   - **Upload new image** using "Upload New" button
4. After upload, the new image is:
   - Added to Cloudinary
   - Automatically selected in the library
   - Shown in the media grid
5. User clicks "Select" to use the image
6. Logo URL is saved to settings

### Component Hierarchy
```
SiteSettings
  └── MediaLibrary (modal)
      ├── Search bar
      ├── Upload button (new!)
      ├── Media grid
      └── Select/Cancel buttons
```

## Features Added to MediaLibrary

1. **Upload Button**: Allows uploading new images directly from the library
2. **Auto-Select**: Newly uploaded images are automatically selected
3. **Auto-Refresh**: Media list refreshes after upload
4. **Loading State**: Shows "Uploading..." during upload
5. **Error Handling**: Shows alert if upload fails
6. **Token Check**: Only fetches media when token is available

## Testing

1. **Restart dev server**:
   ```bash
   cd admin
   npm run dev
   ```

2. **Test the flow**:
   - Log in to admin panel
   - Go to Site Settings
   - Click "Upload Logo"
   - MediaLibrary modal opens
   - Click "Upload New"
   - Select an image file
   - Wait for upload (shows "Uploading...")
   - Image appears in grid and is auto-selected
   - Click "Select"
   - Logo appears in settings
   - Click "Save Settings"
   - Logo is saved ✅

3. **Test on frontend**:
   - Go to frontend site
   - Logo should appear in Navbar and Footer

## Benefits of This Approach

1. **Reusable**: MediaLibrary can now be used anywhere that needs image selection + upload
2. **Better UX**: Users can see existing images and upload new ones in one place
3. **Consistent**: Uses the same component across the admin panel
4. **Efficient**: No need for separate upload and selection flows

## Next Steps

1. Restart your admin dev server
2. Test uploading a logo
3. Verify it appears on the frontend
4. If deployed, redeploy admin to Vercel
