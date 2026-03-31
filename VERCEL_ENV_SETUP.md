# Vercel Environment Variables Setup

## Backend Environment Variables

Go to your backend project on Vercel (`ethronics-api`) and set these environment variables:

### Required Variables

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics

# JWT Secret
JWT_SECRET=137e6e2961c925c7192b29f1689a557e2306408effca5d4a6874ebc33d1b647c4f78b8eae08d04f757e5e5174fbcdb77c917aa78d7be45bc1328a73994e2521c
JWT_EXPIRE=7d

# CORS - IMPORTANT: Update these with your actual Vercel URLs
CLIENT_URL=https://ethronics.vercel.app
ADMIN_URL=https://ethronics-admin.vercel.app

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dp7cfyupe
CLOUDINARY_API_KEY=252148944951582
CLOUDINARY_API_SECRET=BWX7pdf401vBvsf2-YjtP-IOG7E
CLOUDINARY_FOLDER=ethronics

# Email Configuration (Optional)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=gennaro.mraz61@ethereal.email
EMAIL_PASS=haDXdgE2Q4wxfvbpVD
EMAIL_FROM=noreply@ethronics.com
```

## Admin Environment Variables

Go to your admin project on Vercel (`ethronics-admin`) and set:

```env
VITE_API_URL=https://ethronics-api.vercel.app/api
```

## Frontend Environment Variables

Go to your frontend project on Vercel (`ethronics`) and set:

```env
VITE_API_URL=https://ethronics-api.vercel.app/api
```

---

## Steps to Update Environment Variables on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (backend, admin, or frontend)
3. Click **Settings** → **Environment Variables**
4. Add or update the variables listed above
5. Click **Save**
6. Go to **Deployments** tab
7. Click the **three dots** (...) on the latest deployment
8. Click **Redeploy** to apply the changes

---

## Important Notes

### CORS Configuration
The `CLIENT_URL` and `ADMIN_URL` in the backend MUST match your deployed URLs exactly:
- No trailing slashes
- Use HTTPS (not HTTP)
- Match the exact domain from Vercel

### After Updating CORS
1. Redeploy the backend
2. Clear your browser cache or use incognito mode
3. Try logging in to the admin panel again

### Testing the Setup
1. Visit `https://ethronics-api.vercel.app/health` - should return `{"status":"OK"}`
2. Visit `https://ethronics-admin.vercel.app` - should show login page
3. Log in with:
   - Email: `admin@ethronics.org`
   - Password: `Admin@123456`

---

## Troubleshooting

### 401 Unauthorized Errors
- Make sure you're logged in
- Check that CORS is configured correctly in backend
- Verify the JWT_SECRET is set in backend environment variables
- Try clearing browser cache/cookies

### CORS Errors
- Verify `ADMIN_URL` and `CLIENT_URL` match your Vercel URLs exactly
- Redeploy backend after changing CORS variables
- Check browser console for specific CORS error messages

### Build Failures
- Check deployment logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure build commands are correct

---

## Current Deployment URLs

- **Backend API**: https://ethronics-api.vercel.app
- **Admin Dashboard**: https://ethronics-admin.vercel.app
- **Frontend Website**: https://ethronics.vercel.app (to be deployed)

---

## Next Steps

1. ✅ Update backend environment variables (especially CORS)
2. ✅ Redeploy backend
3. ✅ Test admin login
4. ⬜ Deploy frontend
5. ⬜ Test full platform functionality
