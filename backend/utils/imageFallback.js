/**
 * Merge images from English content to other language content
 * This ensures images uploaded in English are available in all languages
 */

function mergeImages(targetContent, sourceContent) {
  if (!targetContent || !sourceContent) return targetContent;
  
  try {
    const merged = JSON.parse(JSON.stringify(targetContent)); // Deep clone
    
    // Merge hero slides images
    if (merged.slides && Array.isArray(merged.slides) && sourceContent.slides && Array.isArray(sourceContent.slides)) {
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
  } catch (error) {
    console.error('Error merging images:', error);
    return targetContent; // Return original on error
  }
}

/**
 * Get content with image fallback from English
 * @param {Object} Model - Mongoose model
 * @param {String} language - Target language
 * @param {Object} query - Additional query parameters
 * @returns {Object} Content with merged images
 */
async function getContentWithImageFallback(Model, language, query = {}) {
  try {
    // Get content for requested language
    const content = await Model.find({
      language,
      isPublished: true,
      ...query
    }).select('-__v -updatedBy');

    // Transform to object
    const contentObj = {};
    content.forEach(item => {
      if (item && item.section && item.content) {
        contentObj[item.section] = item.content;
      }
    });

    // If language is English or no content found, return as is
    if (language === 'en') {
      return contentObj;
    }

    // Get English content as fallback for images
    const englishContent = await Model.find({
      language: 'en',
      isPublished: true,
      ...query
    }).select('-__v -updatedBy');

    // If no English content, return target language content as is
    if (!englishContent || englishContent.length === 0) {
      return contentObj;
    }

    // Transform English content to object
    const englishContentObj = {};
    englishContent.forEach(item => {
      if (item && item.section && item.content) {
        englishContentObj[item.section] = item.content;
      }
    });

    // Merge images from English content if missing in current language
    Object.keys(contentObj).forEach(section => {
      if (englishContentObj[section]) {
        contentObj[section] = mergeImages(contentObj[section], englishContentObj[section]);
      }
    });

    // If target language is missing sections that exist in English, add them with English content
    Object.keys(englishContentObj).forEach(section => {
      if (!contentObj[section]) {
        contentObj[section] = englishContentObj[section];
      }
    });

    return contentObj;
  } catch (error) {
    console.error('Error in getContentWithImageFallback:', error);
    // Return empty object on error to prevent API crash
    return {};
  }
}

/**
 * Get single section with image fallback from English
 * @param {Object} Model - Mongoose model
 * @param {String} language - Target language
 * @param {String} section - Section name
 * @returns {Object} Section content with merged images
 */
async function getSectionWithImageFallback(Model, language, section) {
  try {
    // Try to get content for requested language
    let content = await Model.findOne({
      language,
      section,
      isPublished: true
    }).select('-__v -updatedBy');

    // If not found and language is not English, try to get English content as fallback
    if (!content && language !== 'en') {
      const englishContent = await Model.findOne({
        language: 'en',
        section,
        isPublished: true
      }).select('-__v -updatedBy');

      if (englishContent) {
        return {
          data: englishContent.content,
          fallback: true
        };
      }
    }

    // If still no content found, return empty object
    if (!content) {
      return {
        data: {},
        fallback: false
      };
    }

    // If language is not English, merge images from English content
    if (language !== 'en') {
      const englishContent = await Model.findOne({
        language: 'en',
        section,
        isPublished: true
      }).select('-__v -updatedBy');

      if (englishContent && englishContent.content) {
        content.content = mergeImages(content.content, englishContent.content);
      }
    }

    return {
      data: content.content,
      fallback: false
    };
  } catch (error) {
    console.error('Error in getSectionWithImageFallback:', error);
    return {
      data: {},
      fallback: false
    };
  }
}

module.exports = {
  mergeImages,
  getContentWithImageFallback,
  getSectionWithImageFallback
};
