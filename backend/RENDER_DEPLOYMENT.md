# Render Deployment Guide for Ethronics Backend

## Prerequisites
- GitHub account with your backend code pushed
- Render account (sign up at https://render.com)
- MongoDB Atlas database (already configured)

## Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
cd backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository (or use "Public Git repository" if not connected)

### 3. Configure Web Service

**Basic Settings:**
- **Name:** `ethronics-api` (or your preferred name)
- **Region:** Choose closest to your users (e.g., Oregon, Frankfurt)
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend` (if backend is in a subdirectory)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** tier (or paid if needed)

### 4. Add Environment Variables

Click **"Advanced"** and add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics
JWT_SECRET=137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
JWT_EXPIRE=7d
CLIENT_URL=https://ethronics.vercel.app
ADMIN_URL=https://ethronics-admin.vercel.app
CLOUDINARY_CLOUD_NAME=dp7cfyupe
CLOUDINARY_API_KEY=252148944951582
CLOUDINARY_API_SECRET=BWX7pdf401vBvsf2-YjtP-IOG7E
CLOUDINARY_FOLDER=ethronics
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=gennaro.mraz61@ethereal.email
EMAIL_PASS=haDXdgE2Q4wxfvbpVD
EMAIL_FROM=noreply@ethronics.com
MAX_FILE_SIZE=5242880
```

### 5. Configure Health Check (Optional but Recommended)

- **Health Check Path:** `/health`
- This ensures Render knows your service is running properly

### 6. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
   - Assign a URL (e.g., `https://ethronics-api.onrender.com`)

### 7. Monitor Deployment

- Watch the **Logs** tab for deployment progress
- Look for: `✅ MongoDB connected successfully` and `🚀 Server running on port 5000`
- First deployment takes 2-5 minutes

### 8. Update Frontend & Admin URLs

Once deployed, update your frontend and admin `.env` files:

**frontend/.env:**
```
VITE_API_URL=https://ethronics-api.onrender.com/api
```

**admin/.env:**
```
VITE_API_URL=https://ethronics-api.onrender.com/api
```

Then redeploy frontend and admin on Vercel.

### 9. Configure MongoDB Atlas Network Access

Ensure MongoDB allows Render connections:
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allows all IPs)
3. Or add Render's specific IPs if you prefer tighter security

## Testing Your Deployment

### Test Health Endpoint
```bash
curl https://ethronics-api.onrender.com/health
```

Expected response:
```json
{"status":"OK","timestamp":"2026-04-01T..."}
```

### Test API Endpoint
```bash
curl https://ethronics-api.onrender.com/api/home/en
```

## Important Notes

### Free Tier Limitations
- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month free (enough for one service)

### Preventing Cold Starts (Optional)
Use a service like UptimeRobot or Cron-job.org to ping your health endpoint every 10 minutes:
```
https://ethronics-api.onrender.com/health
```

### Automatic Deploys
Render automatically redeploys when you push to your connected branch.

### Custom Domain (Optional)
1. Go to your service → Settings → Custom Domain
2. Add your domain (e.g., `api.ethronics.com`)
3. Update DNS records as instructed

## Troubleshooting

### Deployment Fails
- Check **Logs** tab for errors
- Verify all environment variables are set
- Ensure `package.json` has correct start script

### MongoDB Connection Fails
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Ensure database user has correct permissions

### CORS Errors
- Verify `CLIENT_URL` and `ADMIN_URL` match your frontend URLs
- Check server.js CORS configuration includes your domains

### 500 Errors
- Check Render logs for specific error messages
- Verify database has seeded data
- Test database connection with: `node tests/checkDatabaseConnection.js`

## Useful Commands

### View Logs
```bash
# In Render dashboard, go to Logs tab
# Or use Render CLI:
render logs -s ethronics-api
```

### Manual Deploy
```bash
# In Render dashboard:
# Click "Manual Deploy" → "Deploy latest commit"
```

### Restart Service
```bash
# In Render dashboard:
# Click "Manual Deploy" → "Clear build cache & deploy"
```

## Next Steps

1. ✅ Deploy backend on Render
2. ✅ Get your Render URL (e.g., `https://ethronics-api.onrender.com`)
3. ✅ Update frontend and admin `.env` files with new API URL
4. ✅ Redeploy frontend and admin on Vercel
5. ✅ Test all functionality

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- MongoDB Atlas Support: https://www.mongodb.com/docs/atlas/
