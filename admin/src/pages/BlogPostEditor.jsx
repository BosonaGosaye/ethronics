import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Globe, Image as ImageIcon, Plus, Trash2, Copy, Check } from 'lucide-react';
import axios from '../utils/axios';
import ImageField from '../components/ImageField';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', flag: '🇪🇹' }
];

const CATEGORIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'ai-ml', label: 'AI & Machine Learning' },
  { value: 'research', label: 'Research & Development' },
  { value: 'education', label: 'Education' },
  { value: 'innovation', label: 'Innovation' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'entrepreneurship', label: 'Entrepreneurship' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'community', label: 'Community' }
];

export default function BlogPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [copiedImageUrl, setCopiedImageUrl] = useState(null);
  
  const [formData, setFormData] = useState({
    slug: '',
    image: '',
    gallery: [],
    author: {
      name: '',
      role: '',
      avatar: ''
    },
    category: 'technology',
    publishDate: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    tags: [],
    stats: {
      views: 0,
      comments: 0,
      likes: 0
    },
    featured: false,
    isPublished: false,
    translations: {
      en: { title: '', excerpt: '', content: '' },
      am: { title: '', excerpt: '', content: '' },
      om: { title: '', excerpt: '', content: '' }
    }
  });
  
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/blog-posts/${id}`);
      const post = response.data.data;
      
      // Format date for input
      post.publishDate = new Date(post.publishDate).toISOString().split('T')[0];
      
      // Ensure gallery exists
      if (!post.gallery) {
        post.gallery = [];
      }
      
      setFormData(post);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      alert('Failed to load blog post');
      navigate('/blog-posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.slug) {
      alert('Please enter a slug');
      return;
    }
    if (!formData.translations.en.title) {
      alert('Please enter an English title');
      return;
    }
    if (!formData.translations.en.excerpt) {
      alert('Please enter an English excerpt');
      return;
    }
    if (!formData.translations.en.content) {
      alert('Please enter English content');
      return;
    }
    if (!formData.author.name) {
      alert('Please enter author name');
      return;
    }
    
    try {
      setSaving(true);
      
      if (isEditMode) {
        await axios.put(`/blog-posts/${id}`, formData);
        alert('Blog post updated successfully!');
      } else {
        await axios.post('/blog-posts', formData);
        alert('Blog post created successfully!');
      }
      
      navigate('/blog-posts');
    } catch (error) {
      console.error('Failed to save blog post:', error);
      alert(error.response?.data?.message || 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const handleTranslationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [currentLanguage]: {
          ...prev.translations[currentLanguage],
          [field]: value
        }
      }
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateSlug = () => {
    const title = formData.translations.en.title;
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Gallery management functions
  const handleAddGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { url: '', caption: '', alt: '' }]
    }));
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleGalleryImageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedImageUrl(url);
    setTimeout(() => setCopiedImageUrl(null), 2000);
  };

  const insertImageIntoContent = (url) => {
    const imageMarkdown = `\n![Image](${url})\n`;
    const currentContent = formData.translations[currentLanguage].content;
    handleTranslationChange('content', currentContent + imageMarkdown);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/blog-posts')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditMode ? 'Update blog post content' : 'Create a new blog post with multi-language support'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Blog Post'}</span>
        </button>
      </div>

      {/* Language Switcher */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-700">Content Language:</span>
          </div>
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            languages={LANGUAGES}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Translations */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Content ({LANGUAGES.find(l => l.code === currentLanguage)?.name})
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.translations[currentLanguage].title}
                  onChange={(e) => handleTranslationChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.translations[currentLanguage].excerpt}
                  onChange={(e) => handleTranslationChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Brief summary of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.translations[currentLanguage].content}
                  onChange={(e) => handleTranslationChange('content', e.target.value)}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                  placeholder="Full post content (supports Markdown)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can use Markdown formatting for rich text content. Click "Insert" on gallery images to add them to content.
                </p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Image Gallery</h2>
                  <p className="text-sm text-gray-600 mt-1">Upload multiple images for your blog post</p>
                </div>
                <button
                  onClick={handleAddGalleryImage}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
              </div>

              {formData.gallery.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">No images in gallery</p>
                  <p className="text-sm text-gray-500">Click "Add Image" to upload images</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.gallery.map((image, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Image {index + 1}</span>
                        <button
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <ImageField
                          label="Image URL"
                          value={image.url}
                          onChange={(url) => handleGalleryImageChange(index, 'url', url)}
                        />

                        {image.url && (
                          <div className="relative">
                            <img
                              src={image.url}
                              alt={image.alt || `Gallery image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2 flex space-x-2">
                              <button
                                onClick={() => copyImageUrl(image.url)}
                                className="px-3 py-1 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-sm flex items-center space-x-1"
                                title="Copy URL"
                              >
                                {copiedImageUrl === image.url ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy URL</span>
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => insertImageIntoContent(image.url)}
                                className="px-3 py-1 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors text-sm"
                                title="Insert into content"
                              >
                                Insert
                              </button>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Alt Text (for accessibility)
                          </label>
                          <input
                            type="text"
                            value={image.alt}
                            onChange={(e) => handleGalleryImageChange(index, 'alt', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Describe the image"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Caption (optional)
                          </label>
                          <input
                            type="text"
                            value={image.caption}
                            onChange={(e) => handleGalleryImageChange(index, 'caption', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Image caption"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Click "Insert" to add an image to your content at the cursor position. 
                  You can also copy the URL and manually insert it using Markdown: <code className="bg-blue-100 px-1 rounded">![Alt text](image-url)</code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug * (URL-friendly)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="post-url-slug"
                  />
                  <button
                    onClick={generateSlug}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="5 min read"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
              <ImageField
                label="Post Image (Shared across all languages)"
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              />
              <p className="text-xs text-gray-500 mt-2">
                This image will be used as the main thumbnail for the post
              </p>
            </div>
          )}

          {/* Author */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, name: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formData.author.role}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, role: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="AI Research Director"
                  />
                </div>

                <ImageField
                  label="Author Avatar"
                  value={formData.author.avatar}
                  onChange={(url) => setFormData(prev => ({
                    ...prev,
                    author: { ...prev.author, avatar: url }
                  }))}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          {currentLanguage === 'en' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-orange-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Post</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
