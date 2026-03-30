# Ethronics CMS API Documentation

## Overview

This API provides content management for the Ethronics website, matching the exact structure of the frontend `home.js` translation file.

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.ethronics.org/api
```

## Data Structure

The backend API provides data in the same format as `home.js`:

```javascript
{
  language: 'en' | 'am' | 'om',
  sections: {
    hero: { ... },
    features: { ... },
    solutions: { ... },
    gallery: { ... },
    partnerships: { ... },
    cta: { ... }
  }
}
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Get Token

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

## Home Page Endpoints

### 1. Get All Published Content (Public)

Retrieves all published sections for a specific language, matching the structure of `homeTranslations[language]` from home.js.

```http
GET /api/home/:language
```

**Parameters:**
- `language` (path): `en`, `am`, or `om`

**Response:**
```json
{
  "success": true,
  "language": "en",
  "data": {
    "hero": {
      "badge": "New Collection",
      "slide1": {
        "line1": "A technology that is",
        "line2": "taught, researched, made, and perfected",
        "line3": "in Ethiopia and Applied worldwide",
        "description": "Empowering the next generation..."
      },
      "slide2": { ... },
      "slide3": { ... },
      "buttons": {
        "summerTraining": "Join Summer Training",
        "explorePrograms": "Explore Programs",
        "viewResearch": "View Research"
      },
      "floatingPromo": {
        "title": "Join the Robotic Engineering and AI Training!",
        "description": "Build robots and code the future...",
        "button": "Register Now"
      }
    },
    "features": {
      "title": "Research & Innovation",
      "subtitle": "At Ethronics, we're pushing the boundaries...",
      "learnMore": "Learn More",
      "modalDescription": "Our team is dedicated...",
      "items": [
        {
          "title": "Robotics",
          "description": "Developing advanced automation systems..."
        },
        {
          "title": "AI & ML",
          "description": "Creating solutions in speech recognition..."
        }
      ]
    },
    "solutions": {
      "title": "Solutions",
      "titleSuffix": "We're Building",
      "subtitle": "Ethronics is pioneering transformative solutions...",
      "categories": {
        "education": {
          "title": "Education",
          "description": "Empowering Ethiopia's youth..."
        },
        "research": {
          "title": "Research & Development",
          "description": "Developing scalable technologies..."
        },
        "manufacturing": {
          "title": "Manufacturing",
          "description": "Revolutionizing production..."
        }
      },
      "items": {
        "roboticsBootcamp": {
          "title": "Robotics Bootcamp",
          "description": "Dive into automation...",
          "action": "Join Now"
        },
        "aiCurriculum": { ... },
        "mentorship": { ... }
      }
    },
    "gallery": {
      "title": "Our Journey in Pictures",
      "subtitle": "Explore the moments that define Ethronics...",
      "showMore": "Show More",
      "showLess": "Show Less",
      "categories": {
        "education": "Education",
        "research": "Research"
      },
      "items": [
        {
          "title": "Memorandum with Arsi University",
          "description": "Ethronics signed a memorandum..."
        }
      ]
    },
    "partnerships": {
      "title": "Our Partnerships",
      "subtitle": "Collaboration drives our success...",
      "featured": "Featured Partnerships",
      "featuredSubtitle": "Highlighting some of our most impactful...",
      "cta": {
        "title": "Partner With Us",
        "description": "Join our network of partners...",
        "becomePartner": "Become a Partner",
        "learnMore": "Learn More"
      },
      "types": [
        {
          "title": "Academic Institutions",
          "description": "Collaborating with universities..."
        }
      ],
      "keyPartnerships": [
        {
          "name": "Arsi University",
          "description": "Strategic partnership...",
          "type": "Academic"
        }
      ]
    },
    "cta": {
      "title": "Join the Robotics Revolution",
      "description": "Ready to build robots and code the future?",
      "buttons": {
        "register": "Register for Summer Training",
        "explore": "Explore Opportunities"
      },
      "features": [
        {
          "title": "Fast Track",
          "description": "Quick enrollment and immediate access"
        }
      ]
    }
  }
}
```

**Example Usage:**
```bash
curl http://localhost:5000/api/home/en
curl http://localhost:5000/api/home/am
curl http://localhost:5000/api/home/om
```

### 2. Get Specific Section (Public)

Retrieves a single section for a specific language.

```http
GET /api/home/:language/:section
```

**Parameters:**
- `language` (path): `en`, `am`, or `om`
- `section` (path): `hero`, `features`, `solutions`, `gallery`, `partnerships`, or `cta`

**Response:**
```json
{
  "success": true,
  "data": {
    "badge": "New Collection",
    "slide1": { ... },
    "buttons": { ... }
  }
}
```

**Example:**
```bash
curl http://localhost:5000/api/home/en/hero
curl http://localhost:5000/api/home/am/features
```

### 3. Get All Content - Admin (Private)

Retrieves all content including unpublished drafts.

```http
GET /api/home/admin/:language
Authorization: Bearer <token>
```

**Required Role:** Admin or Editor

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "...",
      "language": "en",
      "section": "hero",
      "content": { ... },
      "isPublished": true,
      "publishedAt": "2024-03-20T10:00:00.000Z",
      "updatedBy": {
        "name": "Admin User",
        "email": "admin@ethronics.org"
      },
      "createdAt": "2024-03-20T09:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  ]
}
```

### 4. Create or Update Content (Private)

Creates new content or updates existing content for a section.

```http
POST /api/home
Authorization: Bearer <token>
Content-Type: application/json
```

**Required Role:** Admin or Editor

**Request Body:**
```json
{
  "language": "en",
  "section": "hero",
  "content": {
    "badge": "New Collection",
    "slide1": {
      "line1": "A technology that is",
      "line2": "taught, researched, made, and perfected",
      "line3": "in Ethiopia and Applied worldwide",
      "description": "Empowering the next generation..."
    },
    "buttons": {
      "summerTraining": "Join Summer Training",
      "explorePrograms": "Explore Programs",
      "viewResearch": "View Research"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content updated",
  "data": {
    "_id": "...",
    "language": "en",
    "section": "hero",
    "content": { ... },
    "isPublished": false,
    "updatedBy": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 5. Publish/Unpublish Content (Private)

Toggles the published status of content.

```http
PUT /api/home/:id/publish
Authorization: Bearer <token>
Content-Type: application/json
```

**Required Role:** Admin

**Request Body:**
```json
{
  "isPublished": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content published",
  "data": {
    "_id": "...",
    "isPublished": true,
    "publishedAt": "2024-03-20T10:00:00.000Z"
  }
}
```

### 6. Delete Content (Private)

Deletes a content section.

```http
DELETE /api/home/:id
Authorization: Bearer <token>
```

**Required Role:** Admin

**Response:**
```json
{
  "success": true,
  "message": "Content deleted successfully"
}
```

## Data Import

### Import from home.js

The backend includes a script to import data directly from the frontend translation file:

```bash
cd backend
npm run import-home
```

This script:
1. Reads `C:\Users\rooba\Desktop\ethronics.com (1)\ethronics.com (1)\src\translations\home.js`
2. Parses the JavaScript object
3. Imports all sections for all languages (en, am, om)
4. Sets all content as published
5. Creates an admin user if needed

## Section Structures

### Hero Section
```javascript
{
  badge: String,
  slide1: { line1, line2, line3, description },
  slide2: { line1, line2, line3, description },
  slide3: { line1, line2, line3, description },
  buttons: { summerTraining, explorePrograms, viewResearch },
  floatingPromo: { title, description, button }
}
```

### Features Section
```javascript
{
  title: String,
  subtitle: String,
  learnMore: String,
  modalDescription: String,
  items: [
    { title, description }
  ]
}
```

### Solutions Section
```javascript
{
  title: String,
  titleSuffix: String,
  subtitle: String,
  categories: {
    education: { title, description },
    research: { title, description },
    manufacturing: { title, description }
  },
  items: {
    [key]: { title, description, action }
  }
}
```

### Gallery Section
```javascript
{
  title: String,
  subtitle: String,
  showMore: String,
  showLess: String,
  categories: { education, research },
  items: [
    { title, description }
  ]
}
```

### Partnerships Section
```javascript
{
  title: String,
  subtitle: String,
  featured: String,
  featuredSubtitle: String,
  cta: { title, description, becomePartner, learnMore },
  types: [
    { title, description }
  ],
  keyPartnerships: [
    { name, description, type }
  ]
}
```

### CTA Section
```javascript
{
  title: String,
  description: String,
  buttons: { register, explore },
  features: [
    { title, description }
  ]
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applies to all endpoints

## CORS

Allowed origins:
- `http://localhost:5173` (Frontend dev)
- `http://localhost:5174` (Admin dev)
- Production domains (configured in .env)

## Frontend Integration

### React Hook Example

```javascript
import { useState, useEffect } from 'react';

export const useHomeContent = (language) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/home/${language}`);
        const data = await response.json();
        
        if (data.success) {
          setContent(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, loading, error };
};
```

### Usage in Component

```javascript
import { useHomeContent } from './hooks/useHomeContent';
import { useLanguage } from './contexts/LanguageContext';

function HomePage() {
  const { language } = useLanguage();
  const { content, loading, error } = useHomeContent(language);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Hero data={content.hero} />
      <Features data={content.features} />
      <Solutions data={content.solutions} />
      <Gallery data={content.gallery} />
      <Partnerships data={content.partnerships} />
      <CTA data={content.cta} />
    </div>
  );
}
```

## Testing

### Test Public Endpoints

```bash
# Get English content
curl http://localhost:5000/api/home/en

# Get Amharic hero section
curl http://localhost:5000/api/home/am/hero

# Get Oromo features section
curl http://localhost:5000/api/home/om/features
```

### Test Protected Endpoints

```bash
# Login
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ethronics.org","password":"Admin@123456"}' \
  | jq -r '.token')

# Get admin content
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
      "badge": "Updated Badge"
    }
  }'
```

## Support

For API issues or questions:
- Email: tech@ethronics.org
- Documentation: https://docs.ethronics.org
