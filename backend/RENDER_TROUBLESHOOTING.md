# Render Deployment Troubleshooting

## Issue: "Exited with status 1"

This means your server crashed on startup. Here's how to fix it:

### Step 1: Check Environment Variables in Render

Go to your Render service → **Environment** tab and verify ALL these variables are set:

#### Required Variables (Must Have):
```
MONGODB_URI=mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics
JWT_SECRET=137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
```

#### Important Variables:
```
NODE_ENV=production
CLIENT_URL=https://ethronics.vercel.app
ADMIN_URL=https://ethronics-admin.vercel.app
CLOUDINARY_CLOUD_NAME=dp7cfyupe
CLOUDINARY_API_KEY=252148944951582
CLOUDINARY_API_SECRET=BWX7pdf401vBvsf2-YjtP-IOG7E
CLOUDINARY_FOLDER=ethronics
```

#### Optional Variables:
```
JWT_EXPIRE=7d
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=gennaro.mraz61@ethereal.email
EMAIL_PASS=haDXdgE2Q4wxfvbpVD
EMAIL_FROM=noreply@ethronics.com
MAX_FILE_SIZE=5242880
```

### Step 2: Check MongoDB Atlas Network Access

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click on **Network Access** (left sidebar)
3. Make sure you have an entry for `0.0.0.0/0` (allows all IPs)
4. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"** → **"Confirm"**

### Step 3: Verify MongoDB Connection String

Your connection string should look like:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/?appName=DATABASE
```

Common issues:
- ❌ Password contains special characters (needs URL encoding)
- ❌ Wrong database name
- ❌ User doesn't have permissions

### Step 4: Check Render Logs

In Render dashboard:
1. Go to your service
2. Click **"Logs"** tab
3. Look for specific error messages:

**If you see:**
```
❌ Missing required environment variables: MONGODB_URI
```
→ Add MONGODB_URI in Environment tab

**If you see:**
```
❌ MongoDB connection error: MongoServerError: bad auth
```
→ Check your MongoDB username/password

**If you see:**
```
Error: querySrv ENOTFOUND
```
→ Check MongoDB connection string format

**If you see:**
```
MongooseServerSelectionError: Could not connect to any servers
```
→ Check MongoDB Network Access allows 0.0.0.0/0

### Step 5: Manual Deploy After Fixing

After adding/fixing environment variables:
1. Go to **"Manual Deploy"** dropdown
2. Click **"Clear build cache & deploy"**
3. Wait 2-3 minutes
4. Check logs again

### Step 6: Test MongoDB Connection Locally

Run this locally to verify your MongoDB URI works:

```bash
cd backend
node tests/checkDatabaseConnection.js
```

If this fails locally, your MongoDB credentials are wrong.

---

## Common Error Messages & Solutions

### Error: "Application failed to respond"
**Cause:** Server isn't starting or crashed immediately
**Solution:** 
- Check environment variables are set
- Check MongoDB connection
- Look at Render logs for specific error

### Error: "MongoParseError: Invalid connection string"
**Cause:** MONGODB_URI format is wrong
**Solution:** 
- Verify format: `mongodb+srv://user:pass@cluster.mongodb.net/?appName=db`
- Check for typos
- Ensure no extra spaces

### Error: "MongoServerError: bad auth"
**Cause:** Wrong username or password
**Solution:**
- Go to MongoDB Atlas → Database Access
- Verify username and password
- Reset password if needed
- Update MONGODB_URI in Render

### Error: "ENOTFOUND" or "ECONNREFUSED"
**Cause:** Can't reach MongoDB server
**Solution:**
- Check MongoDB Network Access allows 0.0.0.0/0
- Verify cluster is running (not paused)
- Check connection string has correct cluster URL

### Error: Port already in use
**Cause:** Render automatically sets PORT environment variable
**Solution:** Don't set PORT manually, let Render handle it

---

## Verification Checklist

Before deploying, verify:

- [ ] All environment variables are set in Render
- [ ] MONGODB_URI is correct and tested locally
- [ ] MongoDB Network Access allows 0.0.0.0/0
- [ ] MongoDB user has read/write permissions
- [ ] JWT_SECRET is set (any long random string)
- [ ] CLIENT_URL and ADMIN_URL match your frontend URLs
- [ ] Code is pushed to GitHub
- [ ] package.json has "start": "node server.js"

---

## Still Not Working?

### Check Render Service Settings

Go to your service → **Settings**:

**Build Command:** `npm install`
**Start Command:** `npm start`
**Root Directory:** `backend` (if backend is in subdirectory)

### View Full Logs

```bash
# In Render dashboard, click "Logs" and scroll to see full output
# Look for the first error message after "Running 'npm start'"
```

### Test Health Endpoint

Once deployed successfully, test:
```bash
curl https://your-service-name.onrender.com/health
```

Should return:
```json
{"status":"OK","timestamp":"2026-04-01T..."}
```

---

## Quick Fix Commands

### If you need to redeploy:
1. Fix the issue (add env vars, etc.)
2. Go to Render dashboard
3. Click "Manual Deploy" → "Clear build cache & deploy"

### If you need to check logs:
1. Go to Render dashboard
2. Click "Logs" tab
3. Look for error messages in red

### If you need to restart:
1. Go to Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## Need More Help?

1. Copy the error message from Render logs
2. Check MongoDB Atlas status
3. Verify all environment variables are set
4. Try deploying again after fixes

## Contact Support

- Render Community: https://community.render.com
- MongoDB Support: https://www.mongodb.com/docs/atlas/
