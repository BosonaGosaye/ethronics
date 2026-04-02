# Register Page Data Loading Fix

## Problem
The register page was not loading the correct data from the backend. All other pages worked correctly.

## Root Cause
The seeded data structure didn't match what the frontend expected:

### Old Structure (Flat)
```javascript
{
  heroTitle: "...",
  heroDescription: "...",
  heroButton: "...",
  objectiveTitle: "...",
  // ... all fields flat
}
```

### New Structure (Nested)
```javascript
{
  hero: {
    title: "...",
    description: "...",
    button: "...",
    image: "..."
  },
  objective: {
    title: "...",
    description: "...",
    points: [...]
  },
  highlights: {...},
  faq: {...},
  form: {...},
  gallery: {...},
  nextSteps: {...},
  cta: {...}
}
```

## Solution

### 1. Updated Translation File Structure
**File:** `backend/seeds/translations/register.js`

Restructured the translations to have nested objects for each section:
- `hero` - Hero section content
- `objective` - Objective section content
- `highlights` - Training highlights
- `faq` - FAQ questions and answers
- `form` - Form labels and validation messages
- `gallery` - Gallery section content
- `nextSteps` - Next steps after registration
- `cta` - Call-to-action section

### 2. Created Reseeding Script
**File:** `backend/seeds/reseedRegisterContent.js`

This script:
- Deletes all existing register content (282 old records)
- Seeds new content with correct structure
- Creates 8 sections × 3 languages = 24 records total

### 3. Updated Frontend Hook
**File:** `frontend/src/hooks/useRegisterContent.js`

The hook now correctly accesses `res.data.data` which contains the content object directly from the database.

## Data Flow

1. **Database:** RegisterContent model stores content in `content` field
2. **Backend Controller:** `getSectionWithImageFallback` returns `{ data: content.content }`
3. **API Response:** `{ success: true, data: {...content...} }`
4. **Frontend Hook:** Accesses `res.data.data` to get the content object
5. **Frontend Component:** Uses `content.hero`, `content.form`, etc.

## Sections Structure

### Hero Section
```javascript
{
  title: string,
  description: string,
  button: string,
  image: string
}
```

### Objective Section
```javascript
{
  title: string,
  description: string,
  points: string[]
}
```

### Highlights Section
```javascript
{
  title: string,
  roboticsTitle: string,
  roboticsDescription: string,
  codingTitle: string,
  codingDescription: string,
  autonomousTitle: string,
  autonomousDescription: string
}
```

### FAQ Section
```javascript
{
  title: string,
  questions: [
    {
      question: string,
      answer: string
    }
  ]
}
```

### Form Section
```javascript
{
  formTitleStudent: string,
  formTitleGuardian: string,
  studentName: string,
  // ... all form labels and error messages
}
```

### Gallery Section
```javascript
{
  galleryTitle: string,
  galleryDescription: string,
  trainingVideos: string,
  studentProjects: string,
  byStudent: string
}
```

### Next Steps Section
```javascript
{
  important: string,
  paymentInstructions: string,
  registrationFee: string,
  registrationFeeDetails: string,
  // ... other next steps fields
}
```

### CTA Section
```javascript
{
  ctaTitle: string,
  ctaDescription: string,
  ctaButton: string
}
```

## Execution

```bash
# Run from backend directory
cd backend
node seeds/reseedRegisterContent.js
```

## Results

✅ Deleted 282 old flat-structure records
✅ Seeded 24 new nested-structure records (8 sections × 3 languages)
✅ Register page now loads and displays correct data
✅ All sections render properly with correct content

## Languages Supported

- English (en)
- Amharic (am)
- Oromifa (om)

## Files Modified

1. `backend/seeds/translations/register.js` - Restructured translations
2. `backend/seeds/reseedRegisterContent.js` - New reseeding script
3. `frontend/src/hooks/useRegisterContent.js` - Updated data access

## Testing

To verify the fix:
1. Visit the register page: `http://localhost:5173/register`
2. Check that all sections display correctly
3. Switch languages to verify all translations work
4. Verify form labels and validation messages appear
5. Check FAQ section expands/collapses properly
6. Verify hero, objective, highlights, and CTA sections render

## Notes

- The backend controller uses `getSectionWithImageFallback` which automatically merges images from English content to other languages
- If a section is missing in a language, it falls back to English content
- All content is marked as `isPublished: true` for immediate visibility
