/**
 * App Constants
 */

export const APP_NAME = 'C-One';
export const APP_TAGLINE = 'Votre compagnon de voyage';

// Animation Durations
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Input Validation
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordMinLength: 8,
} as const;

