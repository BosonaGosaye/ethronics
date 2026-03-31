# Ethronics Platform - Vercel Deployment

This repository contains three applications that need to be deployed separately on Vercel:

1. **Backend API** (`/backend`) - Express.js REST API
2. **Admin Dashboard** (`/admin`) - React admin panel
3. **Frontend Website** (`/frontend`) - Public-facing React website

## Quick Start

### Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

1. **Sign up/Login** to [Vercel](https://vercel.com)
2. **Import** your Git repository
3. **Deploy each folder** as a separate project:
   - Backend: Root directory = `backend`
   - Admin: Root directory = `admin`
   - Frontend: Root directory = `frontend`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd backend
vercel --prod

# Deploy admin
cd ../admin
vercel --prod

# Deploy frontend
cd ../frontend
vercel --prod
```

## Required Environment Variables

### Backend
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Admin & Frontend
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

## Detailed Documentation

- **Complete Guide**: See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- **Checklist**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## Project Structure

```
ethronics/
├── backend/              # Express.js API
│   ├── server.js        # Entry point
│   ├── vercel.json      # Vercel config
│   └── .env.example     # Environment template
├── admin/               # Admin dashboard
│   ├── src/
│   ├── vercel.json      # Vercel config
│   └── .env.example     # Environment template
└── frontend/            # Public website
    ├── src/
    ├── vercel.json      # Vercel config
    └── .env.example     # Environment template
```

## Deployment Order

1. **Backend first** - Deploy and get the URL
2. **Admin second** - Use backend URL in environment variables
3. **Frontend third** - Use backend URL in environment variables
4. **Update backend** - Add admin and frontend URLs to CORS

## Testing Deployment

### Backend
```bash
curl https://your-backend.vercel.app/health
# Expected: {"status":"OK","timestamp":"..."}
```

### Admin & Frontend
- Visit URLs in browser
- Check browser console for errors
- Test login and API calls

## Common Issues

### CORS Errors
- Ensure `CLIENT_URL` and `ADMIN_URL` are set correctly in backend
- No trailing slashes in URLs

### API Connection Failed
- Verify `VITE_API_URL` in admin/frontend
- Check backend is accessible

### MongoDB Connection Failed
- Whitelist `0.0.0.0/0` in MongoDB Atlas
- Verify connection string

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com)

## License

MIT
