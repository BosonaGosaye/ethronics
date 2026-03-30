import * as LucideIcons from 'lucide-react';

// Component to render dynamic icons from Lucide React library
// Supports all 2478+ icons available in the admin IconPicker
export default function DynamicIcon({ iconName, className = "w-8 h-8" }) {
  // Get the icon component dynamically from Lucide
  const IconComponent = iconName ? LucideIcons[iconName] : null;

  // If icon not found, use Lightbulb as fallback
  if (!IconComponent) {
    const FallbackIcon = LucideIcons.Lightbulb;
    return <FallbackIcon className={className} />;
  }

  return <IconComponent className={className} />;
}
