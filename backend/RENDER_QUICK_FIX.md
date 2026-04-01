# 🚨 Quick Fix: "Exited with status 1"

## The Problem
Your Render deployment is failing because environment variables are missing.

## The Solution (2 minutes)

### Step 1: Go to Render Dashboard
https://dashboard.render.com → Your Service → **Environment** tab

### Step 2: Add These Two Critical Variables

Click **"Add Environment Variable"** and add:

**Variable 1:**
```
Key: MONGODB_URI
Value: mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics
```

**Variable 2:**
```
Key: JWT_SECRET
Value: 137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
```

### Step 3: Add Recommended Variables

```
Key: NODE_ENV
Value: production

Key: CLIENT_URL
Value: https://ethronics.vercel.app

Key: ADMIN_URL
Value: https://ethronics-admin.vercel.app

Key: CLOUDINARY_CLOUD_NAME
Value: dp7cfyupe

Key: CLOUDINARY_API_KEY
Value: 252148944951582

Key: CLOUDINARY_API_SECRET
Value: BWX7pdf401vBvsf2-YjtP-IOG7E
```

### Step 4: Save and Redeploy

1. Click **"Save Changes"**
2. Render will automatically redeploy
3. Wait 2-3 minutes
4. Check logs - should see: `✅ MongoDB connected successfully`

---

## Still Failing? Check MongoDB

### Allow Render to Connect to MongoDB:

1. Go to https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"**
5. Enter `0.0.0.0/0`
6. Click **"Confirm"**

---

## Verify It's Working

Once deployed, test:

```bash
curl https://your-service-name.onrender.com/health
```

Should return:
```json
{"status":"OK","timestamp":"2026-04-01T..."}
```

---

## Copy-Paste All Variables at Once

If Render allows bulk import, use this format:

```
MONGODB_URI=mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics
JWT_SECRET=137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
NODE_ENV=production
CLIENT_URL=https://ethronics.vercel.app
ADMIN_URL=https://ethronics-admin.vercel.app
CLOUDINARY_CLOUD_NAME=dp7cfyupe
CLOUDINARY_API_KEY=252148944951582
CLOUDINARY_API_SECRET=BWX7pdf401vBvsf2-YjtP-IOG7E
CLOUDINARY_FOLDER=ethronics
JWT_EXPIRE=7d
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=gennaro.mraz61@ethereal.email
EMAIL_PASS=haDXdgE2Q4wxfvbpVD
EMAIL_FROM=noreply@ethronics.com
MAX_FILE_SIZE=5242880
```

---

## That's It!

After adding environment variables and allowing MongoDB access, your deployment should succeed. 🎉
