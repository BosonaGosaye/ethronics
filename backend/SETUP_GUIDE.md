# Ethronics Backend Setup Guide

Complete guide to set up and verify the backend CMS that matches the home.js translation file structure.

## Prerequisites

- Node.js v16+ installed
- MongoDB v5+ installed and running
- Git (optional)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd "ethronics.com (1)/backend"
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- cors, helmet (security)
- multer (file uploads)
- dotenv (environment variables)

### 2. Configure Environment

Create `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ethronics-cms

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin User (for initial setup)
ADMIN_EMAIL=admin@ethronics.org
ADMIN_PASSWORD=Admin@123456

# CORS Origins
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# Windows (if installed as service)
net start MongoDB

# Or start manually
mongod --dbpath "C:\data\db"

# Linux/Mac
sudo systemctl start mongod
# or
mongod
```

### 4. Test Data Structure (Optional but Recommended)

Before importing, verify the home.js file structure:

```bash
npm run test-structure
```

This will:
- ✅ Verify the file exists at the correct path
- ✅ Check all languages (en, am, om) are present
- ✅ Validate all sections (hero, features, solutions, gallery, partnerships, cta)
- ✅ Show data size and structure for each section
- ✅ Report any missing or malformed data

Expected output:
```
🧪 Testing home.js data structure...

✅ Found file: C:/Users/rooba/Desktop/ethronics.com (1)/ethronics.com (1)/src/translations/home.js

📊 Data Structure Analysis:

Languages found: en, am, om
✅ All expected languages present

📝 EN Language:
   Sections: hero, features, solutions, gallery, partnerships, cta
   ✅ All sections present
   - hero: 1234 bytes
     ✓ All required fields present
   - features: 567 bytes
     ✓ 5 feature items
   ...

✅ Data structure is complete and ready for import!
```

### 5. Import Data from home.js

Import all content from the frontend translation file:

```bash
npm run import-home
```

This script:
1. Reads `C:\Users\rooba\Desktop\ethronics.com (1)\ethronics.com (1)\src\translations\home.js`
2. Parses the JavaScript object
3. Creates admin user if needed
4. Clears existing home content
5. Imports all sections for all languages
6. Sets all content as published

Expected output:
```
✅ Connected to MongoDB
👤 Created admin user: admin@ethronics.org
🗑️  Cleared 0 existing home content documents

📝 Importing EN content...
   ✓ hero (1234 bytes)
   ✓ features (567 bytes)
   ✓ solutions (890 bytes)
   ✓ gallery (456 bytes)
   ✓ partnerships (678 bytes)
   ✓ cta (345 bytes)

📝 Importing AM content...
   ✓ hero (1456 bytes)
   ...

📝 Importing OM content...
   ✓ hero (1398 bytes)
   ...

✅ Successfully imported 18 content sections

📊 Summary:
   EN: 6 sections - hero, features, solutions, gallery, partnerships, cta
   AM: 6 sections - hero, features, solutions, gallery, partnerships, cta
   OM: 6 sections - hero, features, solutions, gallery, partnerships, cta

🎉 Import completed successfully!

📝 You can now access the content via:
   GET http://localhost:5000/api/home/en
   GET http://localhost:5000/api/home/am
   GET http://localhost:5000/api/home/om
```

### 6. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected: localhost
```

### 7. Test the API

#### Test Public Endpoints (No Authentication Required)

```bash
# Get all English content
curl http://localhost:5000/api/home/en

# Get Amharic hero section
curl http://localhost:5000/api/home/am/hero

# Get Oromo features section
curl http://localhost:5000/api/home/om/features
```

#### Test Authentication

```bash
# Login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ethronics.org","password":"Admin@123456"}'

# Response will include token:
# {"success":true,"token":"eyJhbGc...","user":{...}}
```

#### Test Protected Endpoints (Authentication Required)

```bash
# Save the token from login
TOKEN="your-token-here"

# Get admin view of content
curl http://localhost:5000/api/home/admin/en \
  -H "Authorization: Bearer $TOKEN"

# Update content
curl -X POST http://localhost:5000/api/home \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "section": "hero",
    "content": {
      "badge": "Updated Badge",
      "slide1": {...}
    }
  }'
```

## Data Structure Verification

The backend API returns data in the exact same structure as `home.js`:

### Frontend (home.js)
```javascript
export const homeTranslations = {
  en: {
    hero: { badge: "...", slide1: {...}, buttons: {...} },
    features: { title: "...", items: [...] },
    solutions: { title: "...", categories: {...}, items: {...} },
    gallery: { title: "...", items: [...] },
    partnerships: { title: "...", types: [...], keyPartnerships: [...] },
    cta: { title: "...", buttons: {...}, features: [...] }
  },
  am: { ... },
  om: { ... }
}
```

### Backend API Response
```javascript
GET /api/home/en

{
  "success": true,
  "language": "en",
  "data": {
    "hero": { badge: "...", slide1: {...}, buttons: {...} },
    "features": { title: "...", items: [...] },
    "solutions": { title: "...", categories: {...}, items: {...} },
    "gallery": { title: "...", items: [...] },
    "partnerships": { title: "...", types: [...], keyPartnerships: [...] },
    "cta": { title: "...", buttons: {...}, features: [...] }
  }
}
```

The structures are identical! The API just wraps it in a response object.

## Database Schema

### HomeContent Collection

```javascript
{
  _id: ObjectId,
  language: "en" | "am" | "om",
  section: "hero" | "features" | "solutions" | "gallery" | "partnerships" | "cta",
  content: {
    // Flexible Mixed type - matches exact structure from home.js
    // No schema validation, allowing any nested structure
  },
  isPublished: Boolean,
  publishedAt: Date,
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### User Collection

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: "admin" | "editor" | "viewer",
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Issue: MongoDB Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Make sure MongoDB is running: `mongod`
2. Check MONGODB_URI in .env file
3. Verify MongoDB is listening on port 27017

### Issue: File Not Found During Import

```
❌ Home translations file not found at: C:/Users/rooba/Desktop/...
```

**Solution:**
1. Verify the file path in `scripts/importHomeData.js`
2. Update the path if your project is in a different location
3. Make sure the file exists and is readable

### Issue: Authentication Failed

```
{"success":false,"message":"Invalid credentials"}
```

**Solution:**
1. Check ADMIN_EMAIL and ADMIN_PASSWORD in .env
2. Make sure you ran the import script to create the admin user
3. Try resetting: delete the database and run import again

### Issue: Content Validation Errors

```
⚠️ Content validation warning for hero: missing required fields
```

**Solution:**
1. Run `npm run test-structure` to check data integrity
2. Verify home.js has all required fields for each section
3. Check the validators in `utils/validators.js`

## Next Steps

1. ✅ Backend is running and serving data from home.js
2. 🔄 Update frontend to fetch from API instead of static file
3. 🎨 Build admin dashboard for content management
4. 📄 Add models for other pages (academic, research, etc.)
5. 🔐 Implement content versioning and history
6. 🚀 Deploy to production

## Scripts Reference

```bash
npm start              # Start server (production)
npm run dev            # Start server (development with auto-reload)
npm run seed           # Seed basic users
npm run seed-home      # Seed sample home content
npm run import-home    # Import from home.js (RECOMMENDED)
npm run test-structure # Test home.js data structure
```

## API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/home/:language` | Public | Get all published content |
| GET | `/api/home/:language/:section` | Public | Get specific section |
| GET | `/api/home/admin/:language` | Private | Get all content (admin) |
| POST | `/api/home` | Private | Create/update content |
| PUT | `/api/home/:id/publish` | Admin | Publish/unpublish |
| DELETE | `/api/home/:id` | Admin | Delete content |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/register` | Admin | Create user |
| GET | `/api/auth/me` | Private | Get current user |

## Support

For issues or questions:
- Check the logs in the terminal
- Review API_DOCUMENTATION.md for detailed API info
- Contact: tech@ethronics.org
