# Ethronics CMS Backend

A comprehensive Content Management System backend for managing the Ethronics website content across multiple languages (English, Amharic, Oromo).

## Features

- ✅ Multi-language content management (EN, AM, OM)
- ✅ Role-based access control (Admin, Editor, Viewer)
- ✅ JWT authentication
- ✅ Content versioning and history
- ✅ Cloudinary integration for media storage (images, videos, files)
- ✅ RESTful API
- ✅ MongoDB database
- ✅ Content publishing workflow
- ✅ Rate limiting and security

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Media Storage**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer with Cloudinary Storage
- **Validation**: Express Validator

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# 3. Test data structure (optional)
npm run test-structure

# 4. Import data from home.js
npm run import-home

# 5. Upload existing images to Cloudinary
npm run upload-images

# 6. Update database with Cloudinary URLs
npm run update-db-urls

# 7. Start server
npm run dev
```

Server runs on `http://localhost:5001`

## Cloudinary Integration

The CMS uses Cloudinary for media storage. See:
- `../CLOUDINARY_QUICK_START.md` - Quick setup guide
- `../CLOUDINARY_INTEGRATION.md` - Complete documentation

## Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Full API reference
- **[DATA_STRUCTURE_MATCH.md](./DATA_STRUCTURE_MATCH.md)** - How backend matches home.js

## Key Features

#### Register User (Admin Only)
```http
POST /api/auth/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "editor"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@ethronics.org",
  "password": "Admin@123456"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@ethronics.org",
    "name": "Admin",
    "role": "admin"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Home Content Endpoints

#### Get Published Content (Public)
```http
GET /api/home/:language
# Example: GET /api/home/en
```

Response:
```json
{
  "success": true,
  "data": {
    "hero": { ... },
    "features": { ... },
    "solutions": { ... },
    "gallery": { ... },
    "partnerships": { ... },
    "cta": { ... }
  }
}
```

#### Get Specific Section (Public)
```http
GET /api/home/:language/:section
# Example: GET /api/home/en/hero
```

#### Get All Content (Admin/Editor)
```http
GET /api/home/admin/:language
Authorization: Bearer {token}
```

#### Create/Update Content
```http
POST /api/home
Authorization: Bearer {token}
Content-Type: application/json

{
  "language": "en",
  "section": "hero",
  "content": {
    "badge": "New Collection",
    "slide1": {
      "line1": "A technology that is",
      "line2": "taught, researched, made, and perfected",
      "line3": "in Ethiopia and Applied worldwide"
    }
  }
}
```

#### Publish/Unpublish Content
```http
PUT /api/home/:id/publish
Authorization: Bearer {token}
Content-Type: application/json

{
  "isPublished": true
}
```

#### Delete Content
```http
DELETE /api/home/:id
Authorization: Bearer {token}
```

## Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  role: String (enum: ['admin', 'editor', 'viewer']),
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### HomeContent Model
```javascript
{
  language: String (enum: ['en', 'am', 'om'], required),
  section: String (enum: ['hero', 'features', 'solutions', 'gallery', 'partnerships', 'cta'], required),
  content: Mixed (required),
  isPublished: Boolean,
  publishedAt: Date,
  updatedBy: ObjectId (ref: 'User'),
  timestamps: true
}
```

## User Roles

- **Admin**: Full access - can create users, publish/unpublish content, delete content
- **Editor**: Can create and edit content, but cannot publish or delete
- **Viewer**: Read-only access to all content

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- Helmet.js for HTTP headers security
- CORS configuration
- Input validation and sanitization
- Role-based access control

## Content Structure

The CMS manages the following sections for the home page:

1. **Hero Section**: Slides, badges, buttons, floating promo
2. **Features Section**: Research & innovation items
3. **Solutions Section**: Categories and solution items
4. **Gallery Section**: Images and descriptions
5. **Partnerships Section**: Partner information and CTAs
6. **CTA Section**: Call-to-action content

Each section supports all three languages (EN, AM, OM).

## Development

### Project Structure
```
backend/
├── controllers/       # Request handlers
├── models/           # MongoDB models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── scripts/          # Utility scripts
├── uploads/          # File uploads
├── .env.example      # Environment template
├── server.js         # Entry point
└── package.json      # Dependencies
```

### Adding New Content Types

1. Create a new model in `models/`
2. Create routes in `routes/`
3. Create controller in `controllers/`
4. Register routes in `server.js`

## Deployment

### Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Use production MongoDB instance
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS origins
- [ ] Set up backup strategy
- [ ] Configure logging
- [ ] Set up monitoring

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ethronics
JWT_SECRET=very-strong-secret-key-min-32-characters
CLIENT_URL=https://ethronics.org
ADMIN_URL=https://admin.ethronics.org
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## Testing

```bash
# Run tests (when implemented)
npm test
```

## Support

For issues or questions, contact: tech@ethronics.org

## License

MIT License - Ethronics © 2024
