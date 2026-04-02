# ✅ Render Deployment Checklist

Use this checklist to ensure successful deployment.

## Pre-Deployment

- [ ] Code is committed to GitHub
- [ ] `.env` file is NOT committed (check `.gitignore`)
- [ ] `package.json` has `"start": "node server.js"`
- [ ] MongoDB Atlas database is created and accessible

## Render Setup

- [ ] Created new Web Service on Render
- [ ] Connected to GitHub repository
- [ ] Set Root Directory to `backend` (if in subdirectory)
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

## Environment Variables (Critical)

- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - JWT secret key

## Environment Variables (Recommended)

- [ ] `NODE_ENV` = `production`
- [ ] `CLIENT_URL` - Frontend URL
- [ ] `ADMIN_URL` - Admin panel URL
- [ ] `CLOUDINARY_CLOUD_NAME` - Cloudinary name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary secret

## MongoDB Atlas Configuration

- [ ] Network Access allows `0.0.0.0/0` (or Render IPs)
- [ ] Database user has read/write permissions
- [ ] Connection string is correct format
- [ ] Database has collections/data (if needed)

## Deployment

- [ ] Clicked "Create Web Service" or "Deploy"
- [ ] Watched logs for errors
- [ ] Saw "✅ MongoDB connected successfully"
- [ ] Saw "🚀 Server running on port 5000"
- [ ] Service status shows "Live"

## Testing

- [ ] Health endpoint works: `curl https://your-service.onrender.com/health`
- [ ] API endpoint works: `curl https://your-service.onrender.com/api/home/en`
- [ ] No errors in Render logs

## Post-Deployment

- [ ] Copied Render URL (e.g., `https://ethronics-api.onrender.com`)
- [ ] Updated `frontend/.env` with `VITE_API_URL=https://your-service.onrender.com/api`
- [ ] Updated `admin/.env` with `VITE_API_URL=https://your-service.onrender.com/api`
- [ ] Redeployed frontend on Vercel
- [ ] Redeployed admin on Vercel
- [ ] Tested login on admin panel
- [ ] Tested content loading on public site

## Troubleshooting (If Needed)

If deployment fails:
- [ ] Read `RENDER_QUICK_FIX.md`
- [ ] Check Render logs for specific errors
- [ ] Verify all environment variables are set
- [ ] Verify MongoDB Network Access
- [ ] Try "Clear build cache & deploy"

## Success Indicators

✅ Render service status: "Live"
✅ Logs show: "MongoDB connected successfully"
✅ Health endpoint returns: `{"status":"OK",...}`
✅ API endpoints return data
✅ Frontend can fetch data
✅ Admin panel can login

## Common Issues

### "Exited with status 1"
→ Missing environment variables (add MONGODB_URI and JWT_SECRET)

### "MongoServerError: bad auth"
→ Wrong MongoDB credentials (check username/password)

### "ENOTFOUND" or connection timeout
→ MongoDB Network Access doesn't allow Render (add 0.0.0.0/0)

### CORS errors in frontend
→ CLIENT_URL and ADMIN_URL don't match (verify exact URLs)

### Cold starts (slow first request)
→ Normal on free tier (service spins down after 15 min)

---

## Quick Reference

**Render Dashboard:** https://dashboard.render.com
**MongoDB Atlas:** https://cloud.mongodb.com
**Check Logs:** Render Dashboard → Your Service → Logs
**Environment Variables:** Render Dashboard → Your Service → Environment

---

## Need Help?

1. `RENDER_QUICK_FIX.md` - Fast solutions
2. `RENDER_TROUBLESHOOTING.md` - Detailed debugging
3. `RENDER_DEPLOYMENT.md` - Complete guide
4. Render Community: https://community.render.com
