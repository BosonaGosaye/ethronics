# Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

### 1. Prerequisites Setup
- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Push code to GitHub/GitLab/Bitbucket
- [ ] Set up MongoDB Atlas cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create Cloudinary account at [cloudinary.com](https://cloudinary.com)
- [ ] Generate strong JWT secret (32+ characters)

### 2. MongoDB Atlas Configuration
- [ ] Create database cluster
- [ ] Create database user with password
- [ ] Whitelist IP addresses (use `0.0.0.0/0` for Vercel)
- [ ] Copy connection string
- [ ] Test connection locally

### 3. Cloudinary Configuration
- [ ] Get Cloud Name from dashboard
- [ ] Get API Key from dashboard
- [ ] Get API Secret from dashboard
- [ ] Test upload locally

## Backend Deployment

### 4. Backend Setup
- [ ] Verify `backend/vercel.json` exists
- [ ] Verify `backend/.env.example` exists
- [ ] Test backend locally: `cd backend && npm install && npm start`

### 5. Deploy Backend to Vercel
- [ ] Go to Vercel Dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import Git repository
- [ ] Set Root Directory: `backend`
- [ ] Framework Preset: Other
- [ ] Leave Build Command empty
- [ ] Leave Output Directory empty

### 6. Configure Backend Environment Variables
Add these in Vercel project settings:
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=<your_connection_string>`
- [ ] `JWT_SECRET=<your_secret>`
- [ ] `CLIENT_URL=<will_update_later>`
- [ ] `ADMIN_URL=<will_update_later>`
- [ ] `CLOUDINARY_CLOUD_NAME=<your_cloud_name>`
- [ ] `CLOUDINARY_API_KEY=<your_api_key>`
- [ ] `CLOUDINARY_API_SECRET=<your_api_secret>`

### 7. Deploy and Test Backend
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy backend URL (e.g., `https://your-backend.vercel.app`)
- [ ] Test health endpoint: `curl https://your-backend.vercel.app/health`
- [ ] Verify response: `{"status":"OK","timestamp":"..."}`

## Admin Dashboard Deployment

### 8. Admin Setup
- [ ] Verify `admin/vercel.json` exists
- [ ] Verify `admin/.env.example` exists
- [ ] Create `admin/.env` with backend URL
- [ ] Test admin locally: `cd admin && npm install && npm run dev`

### 9. Deploy Admin to Vercel
- [ ] Go to Vercel Dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import Git repository (or add new)
- [ ] Set Root Directory: `admin`
- [ ] Framework Preset: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### 10. Configure Admin Environment Variables
- [ ] `VITE_API_URL=https://your-backend.vercel.app/api`

### 11. Deploy and Test Admin
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy admin URL (e.g., `https://your-admin.vercel.app`)
- [ ] Visit admin URL in browser
- [ ] Test login functionality
- [ ] Verify API calls work

## Frontend Deployment

### 12. Frontend Setup
- [ ] Verify `frontend/vercel.json` exists
- [ ] Verify `frontend/.env.example` exists
- [ ] Create `frontend/.env` with backend URL
- [ ] Test frontend locally: `cd frontend && npm install && npm run dev`

### 13. Deploy Frontend to Vercel
- [ ] Go to Vercel Dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import Git repository (or add new)
- [ ] Set Root Directory: `frontend`
- [ ] Framework Preset: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### 14. Configure Frontend Environment Variables
- [ ] `VITE_API_URL=https://your-backend.vercel.app/api`

### 15. Deploy and Test Frontend
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy frontend URL (e.g., `https://your-frontend.vercel.app`)
- [ ] Visit frontend URL in browser
- [ ] Navigate through pages
- [ ] Verify content loads correctly

## Post-Deployment

### 16. Update Backend CORS
- [ ] Go to backend project in Vercel
- [ ] Update environment variables:
  - `CLIENT_URL=https://your-frontend.vercel.app`
  - `ADMIN_URL=https://your-admin.vercel.app`
- [ ] Redeploy backend

### 17. Final Testing
- [ ] Test admin login
- [ ] Test content creation/editing
- [ ] Test file uploads
- [ ] Test frontend displays content
- [ ] Test all major features
- [ ] Check browser console for errors
- [ ] Test on mobile devices

### 18. Custom Domains (Optional)
- [ ] Purchase domains
- [ ] Add domain to backend project (e.g., `api.ethronics.com`)
- [ ] Add domain to admin project (e.g., `admin.ethronics.com`)
- [ ] Add domain to frontend project (e.g., `ethronics.com`)
- [ ] Configure DNS records
- [ ] Wait for DNS propagation
- [ ] Update environment variables with custom domains
- [ ] Redeploy all projects

### 19. Security Review
- [ ] Verify JWT_SECRET is strong and unique
- [ ] Check MongoDB IP whitelist
- [ ] Review CORS settings
- [ ] Verify HTTPS is enabled (automatic with Vercel)
- [ ] Test rate limiting
- [ ] Review user permissions

### 20. Monitoring Setup
- [ ] Enable Vercel Analytics (optional)
- [ ] Set up error tracking (optional)
- [ ] Configure deployment notifications
- [ ] Set up uptime monitoring (optional)

## Troubleshooting

### Common Issues

**CORS Errors**
- [ ] Check `CLIENT_URL` and `ADMIN_URL` in backend env vars
- [ ] Ensure no trailing slashes in URLs
- [ ] Verify CORS configuration in `backend/server.js`

**API Connection Failed**
- [ ] Verify `VITE_API_URL` in admin/frontend
- [ ] Check backend is deployed and accessible
- [ ] Test backend health endpoint

**MongoDB Connection Failed**
- [ ] Verify connection string format
- [ ] Check IP whitelist in MongoDB Atlas
- [ ] Verify database user credentials

**Build Failures**
- [ ] Check build logs in Vercel
- [ ] Verify all dependencies in `package.json`
- [ ] Test build locally: `npm run build`

**Environment Variables Not Working**
- [ ] Redeploy after adding/changing variables
- [ ] Verify Vite variables start with `VITE_`
- [ ] Check for typos

## Maintenance

### Regular Tasks
- [ ] Monitor deployment logs
- [ ] Check error rates
- [ ] Review MongoDB usage
- [ ] Monitor Cloudinary storage
- [ ] Update dependencies regularly
- [ ] Backup database regularly

### Deployment Updates
- [ ] Push to Git repository
- [ ] Vercel auto-deploys from `main` branch
- [ ] Check deployment status in dashboard
- [ ] Test after each deployment

---

## Quick Commands

### Test Locally
```bash
# Backend
cd backend && npm install && npm start

# Admin
cd admin && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### Deploy via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd backend && vercel --prod

# Deploy admin
cd admin && vercel --prod

# Deploy frontend
cd frontend && vercel --prod
```

### Test Endpoints
```bash
# Backend health check
curl https://your-backend.vercel.app/health

# Test API endpoint
curl https://your-backend.vercel.app/api/home
```

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [MongoDB Atlas Support](https://www.mongodb.com/cloud/atlas/support)

---

**Deployment Date**: _________________

**Backend URL**: _________________

**Admin URL**: _________________

**Frontend URL**: _________________

**Notes**: 
_________________
_________________
_________________
