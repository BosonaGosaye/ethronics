/**
 * Validation utilities for content structure
 * Ensures data matches the expected structure from home.js
 */

const VALID_LANGUAGES = ['en', 'am', 'om'];
const PREDEFINED_SECTIONS = ['hero', 'features', 'solutions', 'gallery', 'partnerships', 'cta'];

/**
 * Validate language code
 */
const validateLanguage = (language) => {
  if (!language) {
    return { valid: false, error: 'Language is required' };
  }
  if (!VALID_LANGUAGES.includes(language)) {
    return { 
      valid: false, 
      error: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}` 
    };
  }
  return { valid: true };
};

/**
 * Validate section name
 */
const validateSection = (section) => {
  if (!section) {
    return { valid: false, error: 'Section is required' };
  }
  
  // Allow any alphanumeric section name with hyphens and underscores
  const sectionRegex = /^[a-z0-9_-]+$/i;
  if (!sectionRegex.test(section)) {
    return { 
      valid: false, 
      error: 'Section name must contain only letters, numbers, hyphens, and underscores' 
    };
  }
  
  return { valid: true };
};

/**
 * Validate hero section structure
 */
const validateHeroContent = (content) => {
  const required = ['badge', 'slide1', 'buttons', 'floatingPromo'];
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    return { 
      valid: false, 
      error: `Hero section missing required fields: ${missing.join(', ')}` 
    };
  }

  // Validate slide structure
  const slides = ['slide1', 'slide2', 'slide3'].filter(s => content[s]);
  for (const slide of slides) {
    const slideData = content[slide];
    if (!slideData.line1 || !slideData.line2 || !slideData.line3) {
      return { 
        valid: false, 
        error: `${slide} must have line1, line2, and line3` 
      };
    }
  }

  return { valid: true };
};

/**
 * Validate features section structure
 */
const validateFeaturesContent = (content) => {
  const required = ['title', 'subtitle', 'items'];
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    return { 
      valid: false, 
      error: `Features section missing required fields: ${missing.join(', ')}` 
    };
  }

  if (!Array.isArray(content.items)) {
    return { valid: false, error: 'Features items must be an array' };
  }

  return { valid: true };
};

/**
 * Validate solutions section structure
 */
const validateSolutionsContent = (content) => {
  const required = ['title', 'subtitle', 'categories', 'items'];
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    return { 
      valid: false, 
      error: `Solutions section missing required fields: ${missing.join(', ')}` 
    };
  }

  // Validate categories
  const requiredCategories = ['education', 'research', 'manufacturing'];
  const missingCategories = requiredCategories.filter(cat => !content.categories[cat]);
  
  if (missingCategories.length > 0) {
    return { 
      valid: false, 
      error: `Solutions categories missing: ${missingCategories.join(', ')}` 
    };
  }

  return { valid: true };
};

/**
 * Validate gallery section structure
 */
const validateGalleryContent = (content) => {
  const required = ['title', 'subtitle', 'categories', 'items'];
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    return { 
      valid: false, 
      error: `Gallery section missing required fields: ${missing.join(', ')}` 
    };
  }

  if (!Array.isArray(content.items)) {
    return { valid: false, error: 'Gallery items must be an array' };
  }

  return { valid: true };
};

/**
 * Validate partnerships section structure
 */
const validatePartnershipsContent = (content) => {
  const required = ['title', 'subtitle', 'cta', 'types', 'keyPartnerships'];
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    return { 
      valid: false, 
      error: `Partnerships section missing required fields: ${missing.join(', ')}` 
    };
  }

  if (!Array.isArray(content.types)) {
    return { valid: false, error: 'Partnership types must be an array' };
  }

  if (!Array.isArray(content.keyPartnerships)) {
    return { valid: false, error: 'Key partnerships must be an array' };
  }

  return { valid: true };
};

/**
 * Validate CTA section structure
 */
const validateCTAContent = (content) => {
  const required = ['title', 'description', 'buttons', 'features'];
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    return { 
      valid: false, 
      error: `CTA section missing required fields: ${missing.join(', ')}` 
    };
  }

  if (!Array.isArray(content.features)) {
    return { valid: false, error: 'CTA features must be an array' };
  }

  return { valid: true };
};

/**
 * Validate content structure based on section
 */
const validateContent = (section, content) => {
  if (!content || typeof content !== 'object') {
    return { valid: false, error: 'Content must be an object' };
  }

  switch (section) {
    case 'hero':
      return validateHeroContent(content);
    case 'features':
      return validateFeaturesContent(content);
    case 'solutions':
      return validateSolutionsContent(content);
    case 'gallery':
      return validateGalleryContent(content);
    case 'partnerships':
      return validatePartnershipsContent(content);
    case 'cta':
      return validateCTAContent(content);
    default:
      return { valid: true }; // Allow any structure for unknown sections
  }
};

module.exports = {
  VALID_LANGUAGES,
  PREDEFINED_SECTIONS,
  validateLanguage,
  validateSection,
  validateContent
};
