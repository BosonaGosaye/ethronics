# Quick Start: Deploy to Render in 5 Minutes

## Option 1: Using Render Dashboard (Recommended)

### Step 1: Go to Render
Visit: https://dashboard.render.com/register

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Choose **"Build and deploy from a Git repository"**
3. Connect your GitHub account or use public repository URL

### Step 3: Configure Service
```
Name: ethronics-api
Region: Oregon (or closest to you)
Branch: main
Root Directory: backend (if in subdirectory, otherwise leave blank)
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### Step 4: Add Environment Variables
Copy and paste these (click "Add Environment Variable" for each):

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics
JWT_SECRET=137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
CLIENT_URL=https://ethronics.vercel.app
ADMIN_URL=https://ethronics-admin.vercel.app
CLOUDINARY_CLOUD_NAME=dp7cfyupe
CLOUDINARY_API_KEY=252148944951582
CLOUDINARY_API_SECRET=BWX7pdf401vBvsf2-YjtP-IOG7E
```

### Step 5: Deploy
Click **"Create Web Service"** and wait 2-3 minutes.

### Step 6: Get Your URL
Your API will be available at: `https://ethronics-api.onrender.com`

### Step 7: Update Frontend & Admin
Update these files with your new Render URL:

**frontend/.env:**
```
VITE_API_URL=https://ethronics-api.onrender.com/api
```

**admin/.env:**
```
VITE_API_URL=https://ethronics-api.onrender.com/api
```

Redeploy frontend and admin on Vercel.

---

## Option 2: Using Render Blueprint (Fastest)

### Step 1: Push render.yaml to your repo
The `render.yaml` file is already created in your backend folder.

### Step 2: Create from Blueprint
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will auto-detect `render.yaml` and configure everything

### Step 3: Add Secret Environment Variables
You'll need to manually add these sensitive values:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`

---

## Testing Your Deployment

### Test 1: Health Check
```bash
curl https://your-service-name.onrender.com/health
```

Expected: `{"status":"OK","timestamp":"..."}`

### Test 2: API Endpoint
```bash
curl https://your-service-name.onrender.com/api/home/en
```

Expected: JSON data from your database

---

## Common Issues

### Issue: "Application failed to respond"
**Solution:** Check Render logs. Usually means:
- MongoDB connection failed (check MONGODB_URI)
- Missing environment variables
- Port configuration issue (Render uses PORT env var automatically)

### Issue: CORS errors in frontend
**Solution:** Verify `CLIENT_URL` and `ADMIN_URL` in Render environment variables match your frontend URLs exactly.

### Issue: Cold starts (slow first request)
**Solution:** This is normal on free tier. Service spins down after 15 min inactivity. Consider:
- Upgrading to paid tier ($7/month for always-on)
- Using UptimeRobot to ping every 10 minutes

---

## Need Help?

See full guide: `RENDER_DEPLOYMENT.md`
