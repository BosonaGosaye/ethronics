# Quick Reference Card

## 🚀 Setup Commands

```bash
npm install                 # Install dependencies
cp .env.example .env       # Create environment file
npm run test-structure     # Test home.js structure
npm run import-home        # Import data from home.js
npm run dev                # Start development server
```

## 📁 File Structure

```
backend/
├── models/
│   ├── User.js              # User authentication model
│   └── HomeContent.js       # Home page content model (Mixed type)
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── homeController.js    # Home content CRUD operations
├── routes/
│   ├── auth.js              # Auth endpoints
│   ├── home.js              # Home content endpoints
│   ├── content.js           # Other content (future)
│   └── media.js             # File uploads
├── middleware/
│   └── auth.js              # JWT protection & authorization
├── scripts/
│   ├── seedData.js          # Seed basic users
│   ├── seedHomeData.js      # Seed sample home content
│   ├── importHomeData.js    # Import from home.js ⭐
│   └── testDataStructure.js # Test home.js structure
├── utils/
│   └── validators.js        # Content validation helpers
└── server.js                # Express app entry point
```

## 🔑 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ethronics-cms
JWT_SECRET=your-secret-key-min-32-chars
ADMIN_EMAIL=admin@ethronics.org
ADMIN_PASSWORD=Admin@123456
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

## 🌐 API Endpoints

### Public (No Auth)
```
GET  /api/home/:language              # All published content
GET  /api/home/:language/:section     # Specific section
POST /api/auth/login                  # Login
```

### Protected (Auth Required)
```
GET    /api/home/admin/:language      # All content (admin view)
POST   /api/home                      # Create/update content
PUT    /api/home/:id/publish          # Publish/unpublish
DELETE /api/home/:id                  # Delete content
GET    /api/auth/me                   # Current user
POST   /api/auth/register             # Create user (admin only)
```

## 📊 Data Structure

### home.js → API Response

```javascript
// Frontend: homeTranslations[language]
{
  hero: { badge, slide1, slide2, slide3, buttons, floatingPromo },
  features: { title, subtitle, items[] },
  solutions: { title, categories{}, items{} },
  gallery: { title, items[] },
  partnerships: { title, types[], keyPartnerships[] },
  cta: { title, buttons, features[] }
}

// Backend: GET /api/home/:language
{
  "success": true,
  "language": "en",
  "data": {
    // EXACT SAME STRUCTURE ↑
  }
}
```

## 🔐 User Roles

| Role | Create | Edit | Publish | Delete | Users |
|------|--------|------|---------|--------|-------|
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Editor | ✅ | ✅ | ❌ | ❌ | ❌ |
| Viewer | ❌ | ❌ | ❌ | ❌ | ❌ |

## 🧪 Testing

```bash
# Test data structure
npm run test-structure

# Test API with curl
curl http://localhost:5000/api/home/en
curl http://localhost:5000/api/home/am/hero

# Login and get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ethronics.org","password":"Admin@123456"}'

# Use token for protected endpoints
curl http://localhost:5000/api/home/admin/en \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📝 Database Schema

### HomeContent
```javascript
{
  language: "en" | "am" | "om",
  section: "hero" | "features" | "solutions" | "gallery" | "partnerships" | "cta",
  content: Mixed,  // Any structure from home.js
  isPublished: Boolean,
  publishedAt: Date,
  updatedBy: ObjectId
}
```

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: "admin" | "editor" | "viewer",
  isActive: Boolean,
  lastLogin: Date
}
```

## 🎯 Import Process

```
home.js (Frontend)
    ↓
importHomeData.js reads file
    ↓
Parses JavaScript object
    ↓
Creates 18 documents (6 sections × 3 languages)
    ↓
MongoDB Database
    ↓
API serves in same format
    ↓
Frontend (no changes needed!)
```

## ⚡ Common Tasks

### Add New Language
1. Add to `home.js`: `homeTranslations.sw = { ... }`
2. Update model enum: `enum: ['en', 'am', 'om', 'sw']`
3. Update validators: `VALID_LANGUAGES = ['en', 'am', 'om', 'sw']`
4. Run import: `npm run import-home`

### Add New Section
1. Add to `home.js`: `homeTranslations.en.newSection = { ... }`
2. Update model enum: `enum: [..., 'newSection']`
3. Update validators: `VALID_SECTIONS = [..., 'newSection']`
4. Run import: `npm run import-home`

### Update Content
```bash
# Option 1: Edit home.js and re-import
npm run import-home

# Option 2: Use API
curl -X POST http://localhost:5000/api/home \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"language":"en","section":"hero","content":{...}}'
```

### Reset Database
```bash
# Delete all content and re-import
npm run import-home
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Start MongoDB: `mongod` |
| File not found during import | Check path in `importHomeData.js` |
| Authentication failed | Check .env credentials |
| Content validation errors | Run `npm run test-structure` |
| Port already in use | Change PORT in .env |

## 📚 Documentation Files

- `README.md` - Overview and basic setup
- `SETUP_GUIDE.md` - Detailed setup instructions
- `API_DOCUMENTATION.md` - Complete API reference
- `DATA_STRUCTURE_MATCH.md` - Structure comparison
- `QUICK_REFERENCE.md` - This file

## 🔗 Key Paths

- **Frontend Translation**: `C:\Users\rooba\Desktop\ethronics.com (1)\ethronics.com (1)\src\translations\home.js`
- **Backend Root**: `C:\Users\rooba\Desktop\ethronics.com (1)\ethronics.com (1)\backend`
- **Import Script**: `backend/scripts/importHomeData.js`

## ✅ Verification Checklist

- [ ] MongoDB running
- [ ] Dependencies installed (`npm install`)
- [ ] Environment configured (`.env`)
- [ ] Data structure tested (`npm run test-structure`)
- [ ] Data imported (`npm run import-home`)
- [ ] Server started (`npm run dev`)
- [ ] API tested (`curl http://localhost:5000/api/home/en`)
- [ ] Authentication tested (login endpoint)

## 🎉 Success Indicators

```
✅ Connected to MongoDB
✅ Successfully imported 18 content sections
✅ Server running on port 5000
✅ API returns data matching home.js structure
```

## 📞 Support

- Email: tech@ethronics.org
- Docs: Check other .md files in this directory
