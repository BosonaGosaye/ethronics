# 🌱 Database Seeding - Quick Reference

## One Command to Seed Everything

```bash
cd backend
npm run seed-everything
```

This seeds:
- ✅ Admin user (admin@ethronics.org / Admin@123456)
- ✅ All translations (465+ records in 3 languages)

---

## Individual Commands

```bash
# Seed admin user only
npm run seed-admin

# Seed all translations only
npm run seed-all-translations
```

---

## Admin Login Credentials

```
Email:    admin@ethronics.org
Password: Admin@123456
```

Change in `.env`:
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=YourPassword123
```

---

## What Gets Seeded

### 1. Admin User (1 record)
- Full admin permissions
- Can manage users, content, media, settings

### 2. Translations (465+ records)

| Content Type | Languages | Sections |
|--------------|-----------|----------|
| Home | en, am, om | 6 |
| About | en, am, om | 5 |
| Academic | en, am, om | 7 |
| Blog | en, am, om | 7 |
| Careers | en, am, om | 8 |
| Contact | en, am, om | 5 |
| FAQ | en, am, om | 5 |
| Library | en, am, om | 8 |
| Manufacturing | en, am, om | 5 |
| News & Events | en, am, om | 7 |
| Register | en, am, om | 86 |
| Research | en, am, om | 6 |

**Languages:**
- `en` = English
- `am` = Amharic (አማርኛ)
- `om` = Oromifa (Afaan Oromoo)

---

## Verification

### Quick Check
```bash
# Start backend
npm run dev

# Test API
curl http://localhost:5001/api/home/en/hero

# Login to admin panel
# http://localhost:5173 (or your admin URL)
# Email: admin@ethronics.org
# Password: Admin@123456
```

### Database Check
```javascript
// In MongoDB Compass or Shell
db.users.countDocuments()              // Should be 1+
db.homecontents.countDocuments()       // Should be 18
db.aboutcontents.countDocuments()      // Should be 15
```

---

## Common Issues

### ❌ "MONGODB_URI is not defined"
→ Create `.env` file with `MONGODB_URI=your-connection-string`

### ❌ "MongoServerError: bad auth"
→ Check MongoDB username/password in connection string

### ❌ "Network timeout"
→ Add `0.0.0.0/0` to MongoDB Atlas Network Access

### ❌ Content not showing in admin
→ Check `VITE_API_URL` in admin `.env` points to backend

---

## For Production (Render)

1. Deploy backend to Render
2. Set environment variables in Render dashboard:
   ```
   MONGODB_URI=production-mongodb-uri
   ADMIN_EMAIL=admin@ethronics.org
   ADMIN_PASSWORD=Admin@123456
   ```
3. Use Render Shell to run:
   ```bash
   npm run seed-everything
   ```

---

## Need More Info?

- Detailed guide: `backend/seeds/README.md`
- Seeding results: `backend/seeds/SEEDING_SUMMARY.md`
- Translation files: `backend/seeds/translations/`

---

**Quick Start:** `npm run seed-everything` → Done! 🎉
