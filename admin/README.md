# Ethronics Admin Dashboard

React-based admin dashboard for managing Ethronics website content.

## Features

- 🔐 Secure authentication with JWT
- 🌍 Multi-language content management (English, Amharic, Oromo)
- 📝 Section-by-section editing for home page
- 🎨 Form-based and JSON editors
- 📸 Image upload with Cloudinary integration
- 🖼️ Media library for browsing uploaded images
- ✅ Publish/unpublish content
- ➕ Create custom sections dynamically
- 🗑️ Delete custom sections
- 📊 Dashboard with content statistics
- 🎯 Real-time content updates

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

## Installation

```bash
cd admin
npm install
```

## Configuration

The admin dashboard connects to the backend API at `http://localhost:5001`.

This is configured in the components that make API calls.

## Image Upload

The admin dashboard includes comprehensive image upload capabilities:

### Components:
- **ImageField**: Upload or select images for content
- **MediaLibrary**: Browse all uploaded images
- **MediaUploader**: Generic uploader for images, videos, and files

### Usage:
1. Click "Upload New" to upload a new image
2. Click "Choose from Library" to select from uploaded images
3. Images are automatically uploaded to Cloudinary
4. URLs are saved in the content

See `../CLOUDINARY_QUICK_START.md` for setup instructions.

## Running

### Development Mode

```bash
npm run dev
```

Admin dashboard will run on `http://localhost:5174`

### Production Build

```bash
npm run build
npm run preview
```

## Default Credentials

```
Email: admin@ethronics.org
Password: Admin@123456
```

## Usage

### 1. Login

Navigate to `http://localhost:5174/login` and enter your credentials.

### 2. Dashboard

After login, you'll see the dashboard with:
- Statistics (total sections, published, drafts)
- Content grid organized by language
- Quick edit and publish/unpublish buttons

### 3. Edit Content

Click "Edit" on any section to open the editor:

**Form Mode:**
- User-friendly form fields
- Organized by subsections
- Add/remove array items
- Real-time validation

**JSON Mode:**
- Direct JSON editing
- Syntax highlighting
- Full control over structure

### 4. Save Changes

Click "Save Changes" to update content. Content is saved as draft by default.

### 5. Publish

Return to dashboard and click "Publish" to make content live on the public site.

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Main layout with nav
│   │   └── editors/             # Section-specific editors
│   │       ├── HeroEditor.jsx
│   │       ├── FeaturesEditor.jsx
│   │       ├── SolutionsEditor.jsx
│   │       ├── GalleryEditor.jsx
│   │       ├── PartnershipsEditor.jsx
│   │       └── CTAEditor.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx      # Authentication state
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   └── HomeContentEditor.jsx # Content editor
│   ├── App.jsx                  # App router
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Sections

The admin dashboard manages 6 sections of the home page:

### 1. Hero Section
- Badge text
- 3 slides (line1, line2, line3, description)
- Button labels
- Floating promo (title, description, button)

### 2. Features
- Title and subtitle
- Feature items (title, description)
- Learn more text
- Modal description

### 3. Solutions
- Title and subtitle
- 3 categories (education, research, manufacturing)
- Solution items (15+ items with title, description, action)

### 4. Gallery
- Title and subtitle
- Show more/less text
- Gallery items (title, description)

### 5. Partnerships
- Title and subtitle
- CTA section
- Partnership types
- Key partnerships

### 6. Call to Action
- Title and description
- Button labels
- Feature highlights

## API Integration

The admin dashboard communicates with the backend API:

### Authentication
```javascript
POST /api/auth/login
GET  /api/auth/me
```

### Content Management
```javascript
GET    /api/home/:language/:section      # Get content
GET    /api/home/admin/:language         # Get all (admin)
POST   /api/home                         # Create/update
PUT    /api/home/:id/publish             # Publish/unpublish
DELETE /api/home/:id                     # Delete
```

## Development

### Adding New Sections

1. Create editor component in `src/components/editors/`
2. Add to `HomeContentEditor.jsx` switch statement
3. Update `SECTIONS` array in `Dashboard.jsx`

### Customizing Styles

Tailwind CSS is used for styling. Modify `tailwind.config.js` for theme customization.

### Adding Features

- Authentication logic: `src/contexts/AuthContext.jsx`
- API calls: Use axios with `/api` prefix (proxied to backend)
- Routing: `src/App.jsx`

## Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Static Hosting

The admin dashboard is a static SPA that can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

**Important:** Configure the API proxy in production:

```javascript
// For production, update axios base URL
axios.defaults.baseURL = 'https://api.ethronics.org';
```

## Security

- JWT tokens stored in localStorage
- Automatic token refresh on page load
- Protected routes with authentication check
- Role-based access control (admin, editor, viewer)

## Troubleshooting

### Cannot connect to backend

Make sure the backend is running on `http://localhost:5000`:

```bash
cd backend
npm run dev
```

### Login fails

Check backend logs and verify:
- MongoDB is running
- Admin user exists (run `npm run import-home` in backend)
- Credentials are correct

### Content not saving

Check browser console for errors. Verify:
- You're authenticated (token in localStorage)
- Backend API is accessible
- Content structure is valid

## Support

For issues or questions:
- Check backend API documentation
- Review browser console for errors
- Contact: tech@ethronics.org
