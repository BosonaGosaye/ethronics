/**
 * Merge images from English content to other language content
 * This ensures images uploaded in English are available in all languages
 */

function mergeImages(targetContent, sourceContent) {
  if (!targetContent || !sourceContent) return targetContent;
  
  const merged = { ...targetContent };
  
  // Merge hero slides images
  if (merged.slides && sourceContent.slides) {
    merged.slides = merged.slides.map((slide, index) => ({
      ...slide,
      image: slide.image || (sourceContent.slides[index] && sourceContent.slides[index].image) || ''
    }));
  }
  
  // Merge single image fields
  const imageFields = [
    'image', 
    'featuredImage', 
    'worldClassImage', 
    'researchImage',
    'logo',
    'icon',
    'thumbnail',
    'banner',
    'cover'
  ];
  
  imageFields.forEach(field => {
    if (!merged[field] && sourceContent[field]) {
      merged[field] = sourceContent[field];
    }
  });
  
  // Merge array of objects with images
  const arrayFields = [
    'features', 
    'solutions', 
    'capabilities', 
    'facultyMembers', 
    'projects', 
    'products',
    'services',
    'team',
    'gallery',
    'partners',
    'testimonials'
  ];
  
  arrayFields.forEach(field => {
    if (merged[field] && Array.isArray(merged[field]) && sourceContent[field] && Array.isArray(sourceContent[field])) {
      merged[field] = merged[field].map((item, index) => {
        if (typeof item === 'object' && item !== null) {
          return {
            ...item,
            image: item.image || (sourceContent[field][index] && sourceContent[field][index].image) || '',
            logo: item.logo || (sourceContent[field][index] && sourceContent[field][index].logo) || '',
            icon: item.icon || (sourceContent[field][index] && sourceContent[field][index].icon) || ''
          };
        }
        return item;
      });
    }
  });
  
  // Merge images array (simple string array)
  if (merged.images && Array.isArray(merged.images) && sourceContent.images && Array.isArray(sourceContent.images)) {
    merged.images = merged.images.map((img, index) => 
      img || sourceContent.images[index] || ''
    );
  }
  
  return merged;
}

/**
 * Get content with image fallback from English
 * @param {Object} Model - Mongoose model
 * @param {String} language - Target language
 * @param {Object} query - Additional query parameters
 * @returns {Object} Content with merged images
 */
async function getContentWithImageFallback(Model, language, query = {}) {
  // Get content for requested language
  const content = await Model.find({
    language,
    isPublished: true,
    ...query
  }).select('-__v -updatedBy');

  // If language is English, no fallback needed
  if (language === 'en') {
    const contentObj = {};
    content.forEach(item => {
      contentObj[item.section] = item.content;
    });
    return contentObj;
  }

  // Get English content as fallback for images
  const englishContent = await Model.find({
    language: 'en',
    isPublished: true,
    ...query
  }).select('-__v -updatedBy');

  // Transform to objects
  const contentObj = {};
  const englishContentObj = {};
  
  content.forEach(item => {
    contentObj[item.section] = item.content;
  });
  
  englishContent.forEach(item => {
    englishContentObj[item.section] = item.content;
  });

  // Merge images from English content if missing in current language
  Object.keys(contentObj).forEach(section => {
    if (englishContentObj[section]) {
      contentObj[section] = mergeImages(contentObj[section], englishContentObj[section]);
    }
  });

  return contentObj;
}

module.exports = {
  mergeImages,
  getContentWithImageFallback
};
