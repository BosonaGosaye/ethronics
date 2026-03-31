# Vercel Deployment Guide for Ethronics Platform

This guide will help you deploy your full-stack platform (Backend API, Admin Dashboard, and Frontend) on Vercel.

## Project Structure
- `backend/` - Express.js API server
- `admin/` - React admin dashboard (Vite)
- `frontend/` - React public website (Vite)

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **MongoDB Atlas**: Set up a cloud MongoDB database at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
4. **Cloudinary Account**: For media storage at [cloudinary.com](https://cloudinary.com)

---

## Step 1: Prepare Your Backend for Vercel

### 1.1 Create Vercel Configuration for Backend

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 1.2 Update Backend CORS Configuration

The backend already has CORS configured. You'll need to update environment variables with your deployed URLs.

---

## Step 2: Prepare Admin Dashboard for Vercel

### 2.1 Create Vercel Configuration for Admin

Create `admin/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2.2 Update Admin API Configuration

Check `admin/src/utils/axios.js` and ensure it uses environment variable for API URL.

---

## Step 3: Prepare Frontend for Vercel

### 3.1 Create Vercel Configuration for Frontend

Create `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3.2 Update Frontend API Configuration

Ensure frontend uses environment variable for API URL.

---

## Step 4: Deploy Backend API

### 4.1 Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

### 4.2 Deploy Backend via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### 4.3 Configure Backend Environment Variables

In Vercel project settings, add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
CLIENT_URL=https://your-frontend-domain.vercel.app
ADMIN_URL=https://your-admin-domain.vercel.app

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (if using nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM=noreply@ethronics.com
```

### 4.4 Deploy

Click "Deploy" and wait for deployment to complete. Note your backend URL (e.g., `https://your-backend.vercel.app`)

---

## Step 5: Deploy Admin Dashboard

### 5.1 Deploy Admin via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your Git repository (or create new project)
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 5.2 Configure Admin Environment Variables

```
VITE_API_URL=https://your-backend.vercel.app/api
```

### 5.3 Deploy

Click "Deploy". Your admin dashboard will be available at `https://your-admin.vercel.app`

---

## Step 6: Deploy Frontend Website

### 6.1 Deploy Frontend via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your Git repository (or create new project)
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 6.2 Configure Frontend Environment Variables

```
VITE_API_URL=https://your-backend.vercel.app/api
```

### 6.3 Deploy

Click "Deploy". Your frontend will be available at `https://your-frontend.vercel.app`

---

## Step 7: Update CORS Configuration

After all deployments are complete:

1. Go to your backend project on Vercel
2. Update environment variables:
   ```
   CLIENT_URL=https://your-frontend.vercel.app
   ADMIN_URL=https://your-admin.vercel.app
   ```
3. Redeploy the backend

---

## Step 8: Configure Custom Domains (Optional)

### 8.1 Add Custom Domain to Each Project

1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `api.ethronics.com`, `admin.ethronics.com`, `ethronics.com`)
4. Follow DNS configuration instructions

### 8.2 Update Environment Variables with Custom Domains

Update all environment variables to use custom domains instead of `.vercel.app` URLs.

---

## Step 9: Set Up MongoDB Atlas

### 9.1 Create MongoDB Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist Vercel IPs (or use `0.0.0.0/0` for all IPs)

### 9.2 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Add this to backend environment variables as `MONGODB_URI`

---

## Step 10: Verify Deployment

### 10.1 Test Backend API

```bash
curl https://your-backend.vercel.app/health
```

Should return: `{"status":"OK","timestamp":"..."}`

### 10.2 Test Admin Dashboard

1. Visit `https://your-admin.vercel.app`
2. Try logging in
3. Check if API calls work

### 10.3 Test Frontend

1. Visit `https://your-frontend.vercel.app`
2. Navigate through pages
3. Verify content loads correctly

---

## Deployment via Vercel CLI (Alternative Method)

### Deploy Backend
```bash
cd backend
vercel --prod
```

### Deploy Admin
```bash
cd admin
vercel --prod
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

---

## Troubleshooting

### Issue: CORS Errors

**Solution**: Ensure backend environment variables `CLIENT_URL` and `ADMIN_URL` match your deployed URLs exactly (no trailing slashes).

### Issue: API Calls Failing

**Solution**: 
- Check environment variables in admin/frontend (`VITE_API_URL`)
- Verify backend is deployed and accessible
- Check browser console for errors

### Issue: MongoDB Connection Failed

**Solution**:
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has correct permissions

### Issue: Build Failures

**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Issue: Environment Variables Not Working

**Solution**:
- Redeploy after adding/changing environment variables
- For Vite apps, ensure variables start with `VITE_`
- Check for typos in variable names

---

## Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

- **Production**: Pushes to `main` or `master` branch
- **Preview**: Pushes to other branches create preview deployments

---

## Monitoring and Logs

1. Go to your project in Vercel dashboard
2. Click "Deployments" to see deployment history
3. Click on a deployment to view logs
4. Use "Functions" tab to see serverless function logs (backend)

---

## Security Checklist

- [ ] Use strong JWT_SECRET (at least 32 random characters)
- [ ] Enable MongoDB Atlas IP whitelist (if possible, restrict to Vercel IPs)
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up rate limiting (already configured in backend)
- [ ] Review CORS settings
- [ ] Set secure cookie options in production

---

## Cost Considerations

- **Vercel Free Tier**: Suitable for small projects
  - 100GB bandwidth/month
  - Serverless function execution limits
  
- **Vercel Pro**: $20/month per user
  - Increased limits
  - Better performance
  - Team collaboration

- **MongoDB Atlas**: Free tier (512MB) available
- **Cloudinary**: Free tier available

---

## Next Steps

1. Set up monitoring (Vercel Analytics)
2. Configure custom domains
3. Set up email notifications for deployments
4. Create staging environment (separate Vercel projects)
5. Set up automated backups for MongoDB
6. Configure CDN for static assets

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## Quick Reference: Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Admin (.env)
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

---

Good luck with your deployment! 🚀
