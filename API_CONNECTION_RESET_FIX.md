# API Connection Reset Fix

## Problem
Admin panel was getting `ERR_CONNECTION_RESET` errors when trying to fetch Oromifa (om) and Amharic (am) content from the API. The backend was returning 404 errors or crashing when content didn't exist for these languages.

## Root Cause
Multiple content controllers were returning 404 errors when content wasn't found for a specific language, instead of falling back to English content. This caused the API to fail and the connection to reset.

## Solution
Updated all content controllers to use a new `getSectionWithImageFallback()` utility function that:

1. Tries to fetch content for the requested language
2. If not found, falls back to English content
3. Merges images from English content into the target language
4. Returns empty object instead of 404 if no content exists
5. Handles all errors gracefully to prevent API crashes

## Files Modified

### 1. `backend/utils/imageFallback.js`
- Added new `getSectionWithImageFallback()` function
- Handles single section fetching with fallback logic
- Returns `{ data, fallback }` object

### 2. Content Controllers Updated
All the following controllers now use the image fallback utility:

- `backend/controllers/homeController.js`
- `backend/controllers/aboutController.js`
- `backend/controllers/researchController.js`
- `backend/controllers/manufacturingController.js`
- `backend/controllers/careersController.js`
- `backend/controllers/contactController.js`
- `backend/controllers/faqController.js`

## Key Changes

### Before
```javascript
const content = await Model.findOne({
  language,
  section,
  isPublished: true
});

if (!content) {
  return res.status(404).json({
    success: false,
    message: 'Content not found'
  });
}

res.json({
  success: true,
  data: content.content
});
```

### After
```javascript
const result = await getSectionWithImageFallback(Model, language, section);

res.json({
  success: true,
  data: result.data,
  ...(result.fallback && { fallback: true, message: 'Using English content as fallback' })
});
```

## Benefits

1. **No More Connection Resets**: API never crashes, always returns valid response
2. **Automatic Fallback**: Missing content automatically uses English version
3. **Image Sharing**: Images uploaded in English appear in all languages
4. **Better UX**: Admin panel works smoothly even when content is missing
5. **Graceful Degradation**: Empty objects returned instead of errors

## Testing

After deploying these changes:

1. Test admin panel with all 3 languages (en, am, om)
2. Verify images show in all languages
3. Check that missing content falls back to English
4. Confirm no more connection reset errors

## Next Steps

1. Deploy backend changes to Vercel
2. Test API endpoints directly
3. Verify admin panel works correctly
4. Consider creating seed data for am/om languages if needed
