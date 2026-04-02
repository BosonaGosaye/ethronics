# Database Seeding Guide

This directory contains all seeding scripts for the Ethronics CMS database.

## Quick Start

### Seed Everything (Recommended)
Seeds admin user + all translations in one command:

```bash
cd backend
npm run seed-everything
```

This will:
1. ✅ Create admin user (admin@ethronics.org)
2. ✅ Seed all translations (12 content types × 3 languages)
3. ✅ Display summary and next steps

## Individual Seeding Scripts

### 1. Seed Admin User Only
```bash
npm run seed-admin
```

Creates/updates admin user with credentials from `.env`:
- Email: `ADMIN_EMAIL` (default: admin@ethronics.org)
- Password: `ADMIN_PASSWORD` (default: Admin@123456)

### 2. Seed All Translations Only
```bash
npm run seed-all-translations
```

Seeds all content from `translations/` folder:
- Home, About, Academic, Blog, Careers, Contact
- FAQ, Library, Manufacturing, News & Events
- Register, Research
- All in 3 languages: English (en), Amharic (am), Oromifa (om)

## Translation Files

Located in `backend/seeds/translations/`:

```
translations/
├── about.js          - About page content
├── academic.js       - Academic programs content
├── blog.js           - Blog page content
├── blogUI.js         - Blog UI elements
├── careers.js        - Careers page content
├── contact.js        - Contact page content
├── faq.js            - FAQ page content
├── home.js           - Home page content
├── library.js        - Library page content
├── manufacturing.js  - Manufacturing page content
├── navigation.js     - Navigation menus
├── newsEvents.js     - News & Events content
├── register.js       - Registration form content
└── research.js       - Research page content
```

## Admin Credentials

Default credentials (can be changed in `.env`):

```
Email:    admin@ethronics.org
Password: Admin@123456
```

### Change Admin Credentials

1. Update `.env` file:
   ```env
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=YourSecurePassword123
   ```

2. Re-run admin seeding:
   ```bash
   npm run seed-admin
   ```

## Database Collections

Seeded data is stored in these MongoDB collections:

| Collection | Content Type | Languages | Sections |
|------------|--------------|-----------|----------|
| `users` | Admin user | - | 1 |
| `homecontents` | Home page | 3 | 6 per language |
| `aboutcontents` | About page | 3 | 5 per language |
| `academicsections` | Academic | 3 | 7 per language |
| `blogcontents` | Blog | 3 | 7 per language |
| `careerscontents` | Careers | 3 | 8 per language |
| `contactcontents` | Contact | 3 | 5 per language |
| `faqcontents` | FAQ | 3 | 5 per language |
| `librarycontents` | Library | 3 | 8 per language |
| `manufacturingcontents` | Manufacturing | 3 | 5 per language |
| `newseventscontents` | News & Events | 3 | 7 per language |
| `registercontents` | Registration | 3 | 86 per language |
| `researchcontents` | Research | 3 | 6 per language |

**Total:** 465+ content records + 1 admin user

## Verification

### Check Database
```bash
# Connect to MongoDB and check counts
mongosh "your-connection-string"

use ethronics
db.users.countDocuments()              // Should be 1+
db.homecontents.countDocuments()       // Should be 18
db.aboutcontents.countDocuments()      // Should be 15
// etc.
```

### Test API Endpoints
```bash
# Test home content
curl http://localhost:5001/api/home/en/hero

# Test about content
curl http://localhost:5001/api/about/en/hero

# Test academic content
curl http://localhost:5001/api/academic-sections/en/hero
```

### Test Admin Login
1. Start backend: `npm run dev`
2. Start admin panel: `cd admin && npm run dev`
3. Login with admin credentials
4. Navigate to content editors
5. Verify content loads in all languages

## Troubleshooting

### Error: "MONGODB_URI is not defined"
**Solution:** Make sure `.env` file exists with valid `MONGODB_URI`

### Error: "MongoServerError: bad auth"
**Solution:** Check MongoDB username/password in connection string

### Error: "Network timeout"
**Solution:** 
1. Check MongoDB Atlas Network Access
2. Add `0.0.0.0/0` to allowed IPs
3. Verify cluster is running

### Content not appearing in admin panel
**Solution:**
1. Check `isPublished` is `true` in database
2. Verify API endpoints return data
3. Check frontend/admin `.env` has correct `VITE_API_URL`
4. Clear browser cache

### Re-seeding doesn't update content
**Solution:** The scripts use `upsert: true`, so they should update. If not:
1. Manually delete the collection
2. Re-run the seeding script

## Updating Translations

To update existing translations:

1. Edit files in `backend/seeds/translations/`
2. Run seeding script:
   ```bash
   npm run seed-all-translations
   ```
3. Changes will be updated in database (upsert)
4. Refresh admin panel to see changes

## Production Deployment

### Before deploying to Render:

1. ✅ Seed database locally first
2. ✅ Test all content loads correctly
3. ✅ Verify admin login works
4. ✅ Deploy backend to Render
5. ✅ Run seeding on production database:
   ```bash
   # SSH into Render or use Render Shell
   npm run seed-everything
   ```

### Environment Variables for Render

Make sure these are set in Render dashboard:
```
MONGODB_URI=your-production-mongodb-uri
ADMIN_EMAIL=admin@ethronics.org
ADMIN_PASSWORD=Admin@123456
```

## Scripts Summary

| Command | Description |
|---------|-------------|
| `npm run seed-everything` | Seed admin + all translations |
| `npm run seed-admin` | Seed admin user only |
| `npm run seed-all-translations` | Seed all translations only |

## File Structure

```
backend/seeds/
├── README.md                    # This file
├── SEEDING_SUMMARY.md          # Detailed seeding results
├── seedAdminUser.js            # Admin user seeding script
├── seedAllTranslations.js      # All translations seeding script
├── seedEverything.js           # Complete seeding script
└── translations/               # Translation data files
    ├── about.js
    ├── academic.js
    ├── blog.js
    ├── blogUI.js
    ├── careers.js
    ├── contact.js
    ├── faq.js
    ├── home.js
    ├── library.js
    ├── manufacturing.js
    ├── navigation.js
    ├── newsEvents.js
    ├── register.js
    └── research.js
```

## Support

For issues or questions:
1. Check `SEEDING_SUMMARY.md` for detailed results
2. Review error messages in console
3. Verify MongoDB connection
4. Check environment variables

---

**Last Updated:** 2026-04-02
**Status:** ✅ All seeding scripts working
