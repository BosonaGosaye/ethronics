import { useState, useMemo, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { ICON_LIST } from './iconList';
import * as LucideIcons from 'lucide-react';

export default function IconPicker({ value, onChange, label = 'Icon' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories - ensure we have valid data
  const categories = useMemo(() => {
    if (!ICON_LIST || ICON_LIST.length === 0) {
      console.warn('ICON_LIST is empty or undefined');
      return ['All'];
    }
    
    const uniqueCategories = new Set();
    ICON_LIST.forEach(icon => {
      if (icon && icon.category) {
        uniqueCategories.add(icon.category);
      }
    });
    
    const cats = ['All', ...Array.from(uniqueCategories)];
    return cats.sort();
  }, []);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    if (!ICON_LIST || ICON_LIST.length === 0) {
      return [];
    }

    return ICON_LIST.filter(icon => {
      if (!icon || !icon.name || !icon.category) {
        return false;
      }

      // Search filter
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = searchLower === '' || 
        icon.name.toLowerCase().includes(searchLower) ||
        icon.category.toLowerCase().includes(searchLower);
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || icon.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('IconPicker opened:', {
        totalIcons: ICON_LIST?.length || 0,
        filteredIcons: filteredIcons.length,
        searchTerm,
        selectedCategory,
        categories: categories.length
      });
    }
  }, [isOpen, filteredIcons.length, searchTerm, selectedCategory, categories.length]);

  const selectedIcon = ICON_LIST?.find(icon => icon.name === value);
  
  // Get the icon component dynamically with error handling
  const getIconComponent = (iconName) => {
    if (!iconName) return null;
    try {
      const IconComponent = LucideIcons[iconName];
      if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in lucide-react`);
      }
      return IconComponent;
    } catch (error) {
      console.error(`Error loading icon "${iconName}":`, error);
      return null;
    }
  };
  
  const SelectedIconComponent = selectedIcon ? getIconComponent(selectedIcon.name) : null;

  // Reset filters when modal closes
  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Selected Icon Display */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-purple-500"
        >
          {SelectedIconComponent ? (
            <>
              <SelectedIconComponent className="w-6 h-6" />
              <span className="text-sm">{selectedIcon.name}</span>
            </>
          ) : (
            <span className="text-sm text-gray-500">Choose Icon</span>
          )}
        </button>
        {selectedIcon && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 text-gray-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Icon Picker Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Choose an Icon
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredIcons.length} of {ICON_LIST.length} icons
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search and Filter */}
              <div className="space-y-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search icons by name or category..."
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    autoFocus
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="flex gap-2">
                    {categories.map((category) => {
                      // Count icons in this category
                      const categoryCount = category === 'All' 
                        ? ICON_LIST.length 
                        : ICON_LIST.filter(icon => icon.category === category).length;
                      
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                            selectedCategory === category
                              ? 'bg-purple-500 text-white shadow-md scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                          }`}
                        >
                          {category} ({categoryCount})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Icon Grid */}
            <div className="p-4 overflow-y-auto flex-1">
              {!ICON_LIST || ICON_LIST.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <X className="w-12 h-12 mb-3 text-red-300" />
                  <p className="text-lg font-medium">Error loading icons</p>
                  <p className="text-sm mt-1">Please refresh the page</p>
                </div>
              ) : filteredIcons.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {filteredIcons.map((icon, index) => {
                    const IconComponent = getIconComponent(icon.name);
                    
                    // Skip if icon component not found
                    if (!IconComponent) {
                      return null;
                    }
                    
                    return (
                      <button
                        key={`${icon.name}-${index}`}
                        type="button"
                        onClick={() => {
                          onChange(icon.name);
                          handleClose();
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group ${
                          value === icon.name
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'border-gray-200'
                        }`}
                        title={`${icon.name} - ${icon.category}`}
                      >
                        <IconComponent className="w-7 h-7 mb-1 transition-transform group-hover:scale-110" />
                        <span className="text-xs text-gray-600 text-center truncate w-full">
                          {icon.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Search className="w-12 h-12 mb-3 text-gray-300" />
                  <p className="text-lg font-medium">No icons found</p>
                  <p className="text-sm mt-1">
                    {searchTerm 
                      ? `No results for "${searchTerm}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}` 
                      : `No icons in ${selectedCategory} category`}
                  </p>
                  {(searchTerm || selectedCategory !== 'All') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                      }}
                      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer with keyboard shortcuts hint */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <p className="text-xs text-gray-500 text-center">
                💡 Tip: Use the search bar to quickly find icons by name or browse by category
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
