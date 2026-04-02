# 🔧 Fix Render Environment Variables

## The Problem

Your database is properly seeded, but Render login fails because Render's environment variables don't match your local setup.

## Solution: Update Render Environment Variables

### Step 1: Go to Render Dashboard

1. Open https://dashboard.render.com
2. Click on your service: **ethronics-api**
3. Click **"Environment"** in the left sidebar

### Step 2: Set/Update These Variables

Click "Add Environment Variable" or edit existing ones:

#### Required Variables:

```
MONGODB_URI
mongodb+srv://ethronics:bs22886644@clusterbsg.idkw86s.mongodb.net/?appName=Clusterbsg
```

```
JWT_SECRET
137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
```

```
JWT_EXPIRE
7d
```

```
NODE_ENV
production
```

#### Important Variables:

```
ADMIN_EMAIL
admin@ethronics.org
```

```
ADMIN_PASSWORD
Admin@123456
```

```
CLIENT_URL
https://ethronics.vercel.app
```

```
ADMIN_URL
https://ethronics-admin.vercel.app
```

#### Cloudinary Variables:

```
CLOUDINARY_CLOUD_NAME
dp7cfyupe
```

```
CLOUDINARY_API_KEY
252148944951582
```

```
CLOUDINARY_API_SECRET
BWX7pdf401vBvsf2-YjtP-IOG7E
```

```
CLOUDINARY_FOLDER
ethronics
```

### Step 3: Save and Wait for Redeploy

1. Click **"Save Changes"**
2. Render will automatically redeploy (takes 2-3 minutes)
3. Watch the **Logs** tab for deployment progress
4. Look for: `✅ MongoDB connected successfully`

### Step 4: Test Login

After deployment completes:

1. Go to your admin panel
2. Try logging in:
   - Email: admin@ethronics.org
   - Password: Admin@123456

✅ Should work now!

---

## Verification

### Test Render API Directly

```bash
# Health check
curl https://ethronics-api.onrender.com/health

# Should return: {"status":"OK","timestamp":"..."}

# Test login (replace with your actual credentials)
curl -X POST https://ethronics-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ethronics.org","password":"Admin@123456"}'

# Should return: {"success":true,"token":"...","user":{...}}
```

### Check Render Logs

In Render dashboard → Logs tab, you should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

If you see errors like:
- `MongoServerError: bad auth` → Wrong MongoDB credentials
- `MONGODB_URI is not defined` → Variable not set
- `JWT_SECRET is not defined` → Variable not set

---

## Common Issues

### Issue: Still getting 401 after updating

**Solution:**
1. Make sure you clicked "Save Changes"
2. Wait for redeploy to complete (check Logs tab)
3. Clear browser cache
4. Try in incognito/private window

### Issue: "MongoServerError: bad auth"

**Solution:**
- Double-check MongoDB URI is exactly:
  ```
  mongodb+srv://ethronics:bs22886644@clusterbsg.idkw86s.mongodb.net/?appName=Clusterbsg
  ```
- No extra spaces
- Password is case-sensitive

### Issue: "JWT_SECRET is not defined"

**Solution:**
- Add JWT_SECRET variable in Render
- Must be the same as in your local .env

### Issue: Login works but content doesn't load

**Solution:**
- Check CORS variables (CLIENT_URL, ADMIN_URL)
- Make sure they match your actual frontend URLs

---

## Quick Copy-Paste for Render

If Render allows bulk import, use this format:

```
MONGODB_URI=mongodb+srv://ethronics:bs22886644@clusterbsg.idkw86s.mongodb.net/?appName=Clusterbsg
JWT_SECRET=137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
JWT_EXPIRE=7d
NODE_ENV=production
ADMIN_EMAIL=admin@ethronics.org
ADMIN_PASSWORD=Admin@123456
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

---

## After Fixing

Once login works:

1. ✅ Test all admin panel features
2. ✅ Verify content loads in all languages
3. ✅ Test frontend displays content correctly
4. ✅ Check image uploads work
5. ✅ Test user management

---

**Most Important:** Make sure `MONGODB_URI` and `JWT_SECRET` are set correctly in Render!
