/**
 * Images - Central Export
 * Centralized image management with TypeScript types
 * 
 * Usage:
 * import { images } from '@assets/images';
 * <Image source={images.auth.splash1} />
 */

// Types for image sources
export type ImageSource = {
  uri?: string;
} | number;

export type ImageCategory = 'auth' | 'common' | 'onboarding';

// Image paths organized by category
export const images = {
  // Authentication & Onboarding images
  auth: {
    splash1: require('../../../assets/splash-icon.png'),
    splash2: require('../../../assets/icon.png'),
    // TODO: Add actual onboarding images when available
    onboarding1: require('../../../assets/icon.png'), // Placeholder
    onboarding2: require('../../../assets/icon.png'), // Placeholder
    onboarding3: require('../../../assets/icon.png'), // Placeholder
  },

  // Common images (placeholders, icons, etc.)
  common: {
    placeholder: require('../../../assets/icon.png'),
    logo: require('../../../assets/icon.png'),
    // TODO: Add more common images as needed
  },

  // Onboarding images (same as auth for now, can be separated later)
  onboarding: {
    screen1: require('../../../assets/icon.png'), // Placeholder
    screen2: require('../../../assets/icon.png'), // Placeholder
    screen3: require('../../../assets/icon.png'), // Placeholder
  },
} as const;

// Helper function to get image by category and name
export const getImage = (
  category: ImageCategory,
  name: string
): ImageSource => {
  const categoryImages = images[category] as Record<string, ImageSource>;
  return categoryImages[name] || images.common.placeholder;
};

// Type for the images object
export type Images = typeof images;

