import axios from './axios';

/**
 * Sync images and icons from one language to all other languages
 * @param {string} contentType - 'home', 'academic', 'about', 'blog', 'careers', 'contact', or 'faq'
 * @param {string} sourceLanguage - Source language code (usually 'en')
 * @param {string} section - Section name
 * @param {object} imageFields - Object containing field paths to sync
 * @returns {Promise<object>} - Result of sync operation
 */
export async function syncImagesToAllLanguages(contentType, sourceLanguage, section, imageFields) {
  const targetLanguages = ['am', 'om'].filter(lang => lang !== sourceLanguage);
  const results = { success: [], failed: [] };

  try {
    // Get source content
    let apiPath;
    if (contentType === 'home') {
      apiPath = '/home';
    } else if (contentType === 'academic') {
      apiPath = '/academic-sections';
    } else if (contentType === 'about') {
      apiPath = '/about';
    } else if (contentType === 'blog') {
      apiPath = '/blog';
    } else if (contentType === 'careers') {
      apiPath = '/careers';
    } else if (contentType === 'contact') {
      apiPath = '/contact';
    } else if (contentType === 'faq') {
      apiPath = '/faq';
    } else {
      throw new Error(`Unknown content type: ${contentType}`);
    }
    
    const sourceResponse = await axios.get(`${apiPath}/${sourceLanguage}/${section}`);
    const sourceContent = sourceResponse.data.data;

    // For each target language
    for (const targetLang of targetLanguages) {
      try {
        // Get target content
        const targetResponse = await axios.get(`${apiPath}/${targetLang}/${section}`);
        const targetContent = targetResponse.data.data;

        // Update only image/icon fields
        const updatedContent = syncFields(targetContent, sourceContent, imageFields);

        // Save updated content
        let endpoint;
        if (contentType === 'home') {
          endpoint = '/home';
        } else if (contentType === 'academic') {
          endpoint = '/academic-sections/section';
        } else if (contentType === 'about') {
          endpoint = '/about';
        } else if (contentType === 'blog') {
          endpoint = '/blog';
        } else if (contentType === 'careers') {
          endpoint = '/careers';
        } else if (contentType === 'contact') {
          endpoint = '/contact';
        } else if (contentType === 'faq') {
          endpoint = '/faq';
        } else if (contentType === 'library') {
          endpoint = '/library';
        }
        
        await axios.post(endpoint, {
          language: targetLang,
          section,
          content: updatedContent
        });

        results.success.push(targetLang);
      } catch (error) {
        console.error(`Failed to sync to ${targetLang}:`, error);
        results.failed.push({ language: targetLang, error: error.message });
      }
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to sync images: ${error.message}`);
  }
}

/**
 * Recursively sync specific fields from source to target
 */
function syncFields(target, source, fields) {
  const updated = { ...target };

  fields.forEach(fieldPath => {
    const value = getNestedValue(source, fieldPath);
    if (value !== undefined) {
      setNestedValue(updated, fieldPath, value);
    }
  });

  return updated;
}

/**
 * Get nested object value by path (e.g., 'slides.0.image')
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    if (current === undefined || current === null) return undefined;
    
    // Handle array indices
    if (!isNaN(key) && Array.isArray(current)) {
      return current[parseInt(key)];
    }
    
    return current[key];
  }, obj);
}

/**
 * Set nested object value by path
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  const target = keys.reduce((current, key) => {
    if (!isNaN(key) && Array.isArray(current)) {
      return current[parseInt(key)];
    }
    return current[key];
  }, obj);

  if (target && lastKey) {
    target[lastKey] = value;
  }
}

/**
 * Sync all images in an array (like hero slides)
 */
export async function syncArrayImages(contentType, sourceLanguage, section, arrayPath, imageFieldName) {
  try {
    let apiPath;
    if (contentType === 'home') {
      apiPath = '/home';
    } else if (contentType === 'academic') {
      apiPath = '/academic-sections';
    } else if (contentType === 'about') {
      apiPath = '/about';
    } else if (contentType === 'blog') {
      apiPath = '/blog';
    } else if (contentType === 'careers') {
      apiPath = '/careers';
    } else if (contentType === 'contact') {
      apiPath = '/contact';
    } else if (contentType === 'faq') {
      apiPath = '/faq';
    } else if (contentType === 'library') {
      apiPath = '/library';
    } else {
      throw new Error(`Unknown content type: ${contentType}`);
    }
    
    const sourceResponse = await axios.get(`${apiPath}/${sourceLanguage}/${section}`);
    const sourceContent = sourceResponse.data.data;
    
    const sourceArray = getNestedValue(sourceContent, arrayPath);
    if (!Array.isArray(sourceArray)) {
      throw new Error('Source is not an array');
    }

    const targetLanguages = ['am', 'om'].filter(lang => lang !== sourceLanguage);
    const results = { success: [], failed: [] };

    for (const targetLang of targetLanguages) {
      try {
        const targetResponse = await axios.get(`${apiPath}/${targetLang}/${section}`);
        const targetContent = targetResponse.data.data;
        const targetArray = getNestedValue(targetContent, arrayPath);

        if (Array.isArray(targetArray)) {
          // Sync images for each item in array
          sourceArray.forEach((sourceItem, index) => {
            if (targetArray[index] && sourceItem[imageFieldName]) {
              targetArray[index][imageFieldName] = sourceItem[imageFieldName];
            }
          });

          setNestedValue(targetContent, arrayPath, targetArray);

          let endpoint;
          if (contentType === 'home') {
            endpoint = '/home';
          } else if (contentType === 'academic') {
            endpoint = '/academic-sections/section';
          } else if (contentType === 'about') {
            endpoint = '/about';
          } else if (contentType === 'blog') {
            endpoint = '/blog';
          } else if (contentType === 'careers') {
            endpoint = '/careers';
          } else if (contentType === 'contact') {
            endpoint = '/contact';
          } else if (contentType === 'faq') {
            endpoint = '/faq';
          } else if (contentType === 'library') {
            endpoint = '/library';
          }
          
          await axios.post(endpoint, {
            language: targetLang,
            section,
            content: targetContent
          });

          results.success.push(targetLang);
        }
      } catch (error) {
        results.failed.push({ language: targetLang, error: error.message });
      }
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to sync array images: ${error.message}`);
  }
}
