# Seed Production Database on Render

## Quick Steps

### 1. Open Render Shell

1. Go to https://dashboard.render.com
2. Click on your service (ethronics-api)
3. Click **"Shell"** tab at the top
4. Wait for shell to connect

### 2. Run Seeding Command

In the Render Shell, run:

```bash
npm run seed-production
```

### 3. Confirm

When prompted:
```
Are you sure you want to continue? (yes/no):
```

Type: `yes` and press Enter

### 4. Wait for Completion

The script will:
- ✅ Create admin user (admin@ethronics.org)
- ✅ Seed all translations (465+ records)
- ✅ Display summary

### 5. Test Login

1. Go to https://ethronics-admin.vercel.app
2. Login with:
   - Email: admin@ethronics.org
   - Password: Admin@123456

---

## Alternative: Seed from Local Machine

If you have access to production MongoDB URI:

### 1. Update Local .env Temporarily

```env
# Backup your local MONGODB_URI first!
MONGODB_URI=your-production-mongodb-uri
```

### 2. Run Seeding

```bash
cd backend
npm run seed-production
```

### 3. Restore Local .env

Put back your local MongoDB URI after seeding.

---

## Troubleshooting

### Shell Not Available on Render Free Tier

If Shell is not available:

**Option A: Use Render Deploy Hook**

1. Add a one-time script to `package.json`:
   ```json
   "scripts": {
     "postinstall": "node seeds/seedProductionDatabase.js || true"
   }
   ```

2. Trigger a redeploy

3. Remove the `postinstall` script after seeding

**Option B: Seed from Local**

Use the alternative method above with production MongoDB URI.

### Error: "MONGODB_URI is not defined"

Make sure environment variables are set in Render dashboard.

### Error: "MongoServerError: bad auth"

Check MongoDB credentials in Render environment variables.

---

## Verification

After seeding, test these endpoints:

```bash
# Health check
curl https://ethronics-api.onrender.com/health

# Home content
curl https://ethronics-api.onrender.com/api/home/en/hero

# About content
curl https://ethronics-api.onrender.com/api/about/en/hero
```

All should return data.

---

## What Gets Seeded

- **Admin User:** 1 record
- **Home Content:** 18 records (6 sections × 3 languages)
- **About Content:** 15 records
- **Academic Content:** 21 records
- **Blog Content:** 21 records
- **Careers Content:** 24 records
- **Contact Content:** 15 records
- **FAQ Content:** 15 records
- **Library Content:** 24 records
- **Manufacturing Content:** 15 records
- **News & Events Content:** 21 records
- **Register Content:** 258 records
- **Research Content:** 18 records

**Total:** 465+ records

---

## After Seeding

1. ✅ Test admin login
2. ✅ Verify content loads in admin panel
3. ✅ Check all languages work
4. ✅ Test frontend displays content
5. ✅ Update admin `.env` to use production URL:
   ```env
   VITE_API_URL=https://ethronics-api.onrender.com/api
   ```

---

## Need Help?

- Check Render logs for errors
- Verify environment variables are set
- Test MongoDB connection
- Review `backend/seeds/README.md`
