# Update API URL After Render Deployment

After deploying your backend to Render, you'll get a URL like:
`https://ethronics-api.onrender.com`

## Step 1: Update Frontend .env

Edit `frontend/.env`:

```env
VITE_API_URL=https://ethronics-api.onrender.com/api
```

## Step 2: Update Admin .env

Edit `admin/.env`:

```env
VITE_API_URL=https://ethronics-api.onrender.com/api
```

## Step 3: Update Backend Environment Variables on Render

Make sure these match your actual frontend URLs:

```env
CLIENT_URL=https://ethronics.vercel.app
ADMIN_URL=https://ethronics-admin.vercel.app
```

## Step 4: Redeploy Frontend & Admin

### If using Vercel:
```bash
# Frontend
cd frontend
vercel --prod

# Admin
cd admin
vercel --prod
```

### Or push to GitHub (if auto-deploy is enabled):
```bash
git add .
git commit -m "Update API URL to Render"
git push origin main
```

## Step 5: Test Everything

1. Open your admin panel: `https://ethronics-admin.vercel.app`
2. Try to login
3. Open your public site: `https://ethronics.vercel.app`
4. Check if content loads

## Troubleshooting

### Still seeing CORS errors?
1. Check Render logs for your backend
2. Verify `CLIENT_URL` and `ADMIN_URL` in Render dashboard match exactly
3. Make sure MongoDB is accessible (Network Access: 0.0.0.0/0)

### Backend not responding?
1. Check Render service status (should be "Live")
2. Test health endpoint: `curl https://your-service.onrender.com/health`
3. Check Render logs for errors

### First request is slow?
This is normal on Render free tier (cold start). Service spins down after 15 minutes of inactivity.
