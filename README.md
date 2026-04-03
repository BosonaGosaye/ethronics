# Ethronics - Multi-Language CMS Platform

A comprehensive full-stack web application for Ethronics, featuring a public-facing website, admin CMS, and multi-language support (English, Amharic, Oromifa).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-5.0%2B-green.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Ethronics is a modern web platform designed for an Ethiopian technology company, featuring:

- **Public Website**: Responsive, multi-language website showcasing company services, research, and products
- **Admin CMS**: Powerful content management system for managing all website content
- **Multi-Language Support**: Full support for English, Amharic (አማርኛ), and Oromifa (Afaan Oromoo)
- **Media Management**: Integrated media library with Cloudinary support
- **User Management**: Role-based access control for admin users
- **Activity Logging**: Comprehensive audit trail of all admin actions

## ✨ Features

### Public Website
- 🏠 **Home Page**: Dynamic hero sections, features showcase, and company highlights
- 🎓 **Academic Programs**: Educational offerings and training programs
- 🔬 **Research**: Research projects and publications
- 🏭 **Manufacturing**: Product catalog and manufacturing capabilities
- 📰 **News & Events**: Latest news, events calendar, and media center
- 💼 **Careers**: Job listings with application management
- 📚 **Digital Library**: Resource library with categorized content
- 📞 **Contact**: Multi-location contact information and inquiry forms
- ❓ **FAQ**: Frequently asked questions with search functionality

### Admin CMS
- 📊 **Dashboard**: Real-time statistics and recent activity monitoring
- 📝 **Content Management**: Edit all page content across multiple languages
- 🖼️ **Media Library**: Upload and manage images, videos, and documents
- 👥 **User Management**: Create and manage admin users with role-based permissions
- 📧 **Application Management**: Review and manage job applications
- 🎫 **Registration Management**: Handle training program registrations
- 📈 **Analytics**: Track content performance and user activity
- 🔒 **Security**: JWT authentication with secure session management

### Technical Features
- ⚡ **Performance**: Optimized loading with lazy loading and code splitting
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🌐 **SEO Optimized**: Meta tags, structured data, and sitemap generation
- 🔄 **Real-time Updates**: Live content updates without page refresh
- 🎨 **Modern UI**: Beautiful, intuitive interface with Lucide icons
- 🔐 **Secure**: CORS protection, rate limiting, and input validation
- 📦 **Scalable**: Modular architecture for easy feature additions

## 🛠 Tech Stack

### Frontend (Public Website)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form

### Admin Panel
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Rich Text Editor**: TipTap / React Quill
- **File Upload**: Cloudinary integration
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Version Control**: Git & GitHub
- **Deployment**: 
  - Backend: Render
  - Frontend: Vercel
  - Admin: Vercel
- **Database Hosting**: MongoDB Atlas
- **CDN**: Cloudinary

## 📁 Project Structure

```
ethronics/
├── frontend/                 # Public website
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   └── package.json
│
├── admin/                    # Admin CMS
│   ├── src/
│   │   ├── components/      # Admin UI components
│   │   │   └── editors/     # Content editors
│   │   ├── pages/           # Admin pages
│   │   ├── contexts/        # React contexts
│   │   └── utils/           # Utilities
│   └── package.json
│
├── backend/                  # API Server
│   ├── controllers/         # Route controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── utils/               # Helper functions
│   └── server.js            # Entry point
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB 5.0+
- Cloudinary account (for media storage)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ethronics.git
cd ethronics
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Install Admin Dependencies**
```bash
cd ../admin
npm install
```

5. **Set up Environment Variables**

Create `.env` files in each directory (see [Environment Variables](#environment-variables))


6. **Start Development Servers**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 3 - Admin:
```bash
cd admin
npm run dev
```

The applications will be available at:
- Frontend: http://localhost:5173
- Admin: http://localhost:5174
- Backend API: http://localhost:5001

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5001

# Database
MONGODB_URI=mongodb://localhost:27017/ethronics
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ethronics

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@ethronics.com
FROM_NAME=Ethronics

# CORS
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api
```

### Admin (.env)
```env
VITE_API_URL=http://localhost:5001/api
```

## 🚀 Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables from `.env.example`
5. Deploy!

See `backend/RENDER_DEPLOYMENT.md` for detailed instructions.

### Frontend & Admin (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy Frontend:
```bash
cd frontend
vercel --prod
```
3. Deploy Admin:
```bash
cd admin
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📚 API Documentation

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
```

### Content Management
```
GET    /api/home/public/:language/:section
GET    /api/home/admin/:language
POST   /api/home/admin
PATCH  /api/home/admin/:language/:section/publish
```

Similar endpoints exist for:
- `/api/academic-sections`
- `/api/about`
- `/api/blog`
- `/api/careers`
- `/api/contact`
- `/api/faq`
- `/api/library`
- `/api/manufacturing`
- `/api/newsEvents`
- `/api/register`
- `/api/research`

### Jobs & Applications
```
GET    /api/jobs
POST   /api/jobs/admin
GET    /api/applications/admin/all
POST   /api/applications
```

### Media
```
POST   /api/upload
GET    /api/mediaItems
DELETE /api/mediaItems/:id
```

### Users
```
GET    /api/users/admin/all
POST   /api/users/admin
PUT    /api/users/admin/:id
GET    /api/users/activities/all
```

## 🎨 Customization

### Adding a New Language

1. Update language constants in frontend/admin
2. Add translations to backend files
3. Update language switcher components


### Adding a New Page Section

1. Create model in `backend/models/`
2. Create controller in `backend/controllers/`
3. Add routes in `backend/routes/`
4. Create editor component in `admin/src/components/editors/`
5. Create page component in `frontend/src/pages/`

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Admin tests
cd admin
npm test
```

## 📝 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Frontend/Admin
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- **Ethronics Development Team**

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- Cloudinary for media hosting
- All open-source contributors

## 📞 Support

For support, email support@ethronics.com or open an issue on GitHub.

## 🔗 Links

- [Website](https://ethronics.vercel.app/)

---

Made with ❤️ by Ethronics Team
