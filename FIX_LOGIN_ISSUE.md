# 🔧 Fix Login Issue - "Invalid Credentials"

## The Problem

You're getting "Invalid Credentials" (401 error) because:
- Your admin panel is pointing to **production** Render API
- But the admin user only exists in your **local** database
- Production database on Render is empty

## Quick Fix (Test Locally)

### Option 1: Use Local Backend

1. **Update admin `.env`:**
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

2. **Start local backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Restart admin panel:**
   ```bash
   cd admin
   npm run dev
   ```

4. **Login:**
   - Email: admin@ethronics.org
   - Password: Admin@123456

✅ This should work immediately!

---

## Permanent Fix (Seed Production)

### Option 2: Seed Production Database on Render

#### Step 1: Open Render Shell

1. Go to https://dashboard.render.com
2. Click your service: **ethronics-api**
3. Click **"Shell"** tab
4. Wait for connection

#### Step 2: Run Seeding

In Render Shell:
```bash
npm run seed-production
```

When prompted, type: `yes`

#### Step 3: Update Admin .env

After seeding completes, update `admin/.env`:
```env
VITE_API_URL=https://ethronics-api.onrender.com/api
```

#### Step 4: Test Login

1. Restart admin panel
2. Go to https://ethronics-admin.vercel.app (or localhost)
3. Login with:
   - Email: admin@ethronics.org
   - Password: Admin@123456

✅ Should work now!

---

## If Render Shell Not Available

### Alternative: Seed from Local Machine

1. **Temporarily update backend `.env`:**
   ```env
   # Save your local URI first!
   MONGODB_URI=mongodb+srv://dme24050_db_user:BS22886644@bsgethronics.r5zisbz.mongodb.net/?appName=bsgEthronics
   ```

2. **Run seeding:**
   ```bash
   cd backend
   npm run seed-production
   ```

3. **Restore local `.env`:**
   Put back your local MongoDB URI

4. **Update admin `.env`:**
   ```env
   VITE_API_URL=https://ethronics-api.onrender.com/api
   ```

---

## Verification

### Test Production API

```bash
# Health check
curl https://ethronics-api.onrender.com/health

# Should return: {"status":"OK","timestamp":"..."}

# Test content
curl https://ethronics-api.onrender.com/api/home/en/hero

# Should return JSON data
```

### Test Admin Login

1. Open admin panel
2. Check browser console - should see successful login
3. Navigate to content editors
4. Content should load in all languages

---

## Current Status

✅ **Local Database:** Seeded with admin user + all content
❌ **Production Database:** Empty (needs seeding)

## What You Need to Do

**Choose one:**

1. **For testing:** Use local backend (Option 1)
2. **For production:** Seed Render database (Option 2)

---

## Quick Commands

```bash
# Test locally
cd backend && npm run dev
cd admin && npm run dev
# Login: admin@ethronics.org / Admin@123456

# Seed production (in Render Shell)
npm run seed-production

# Or seed from local
npm run seed-production
```

---

## Files to Check

- `admin/.env` - Should point to correct API URL
- `backend/.env` - Should have correct MongoDB URI
- Render environment variables - Should be set

---

**Recommended:** Start with Option 1 (local) to test, then do Option 2 (production) when ready to deploy.
