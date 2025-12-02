/**
 * Design System - Colors
 * Extracted from Figma design system
 */

export const colors = {
  // Primary Blue Palette
  primary: {
    normal: '#288cbe',
    normalHover: '#247eab',
    normalActive: '#207098',
    light: '#eaf4f9',
    lightHover: '#dfeef5',
    lightActive: '#bcdbeb',
    dark: '#1e698f',
    darkHover: '#185472',
    darkActive: '#123155',
    darker: '#0e3143',
  },

  // Grey Palette (Text, Borders, Backgrounds)
  grey: {
    lighter: '#a3a4a5',
    light: '#919294',
    lightActive: '#7a7c7e',
    normal: '#333538',
    normalHover: '#2b2d30',
    normalActive: '#252729',
    dark: '#121314',
    darkHover: '#0d0d0e',
    darkActive: '#060606',
    darker: '#060606',
  },

  // Secondary Blue (Backgrounds)
  secondary: {
    white: '#FFFFFF',
    whiteHover: '#fcfdfd',
    whiteActive: '#f5f7f9',
    light: '#f9fafb',
    lightHover: '#f2f4f7',
    lightActive: '#ebeef2',
    dark: '#f6f8f9',
  },

  // Yellow Accent
  yellow: {
    light: '#faf8f2',
    lightHover: '#f7f4eb',
    lightActive: '#efebde',
    normal: '#ccb47b',
    normalHover: '#b8a26f',
    normalActive: '#a39062',
    dark: '#99875c',
    darkHover: '#7a6c4a',
    darkActive: '#5c5137',
    darker: '#473f2b',
    starActive: '#FFCC00', // Active star color
  },
  // Star Colors
  star: {
    active: '#FFCC00', // Active star color
    inactive: '#DFEEF5', // Inactive star color
  },

  // Semantic Colors
  success: '#10b981', // Green for success states
  successLight: '#D1FADF', // Light green background for success icons
  error: '#ef4444', // Red for error states
  errorLight: '#FEE4E2', // Light red background for error icons
  warning: '#f59e0b', // Orange for warnings
  info: '#3b82f6', // Blue for info

  // Backgrounds
  background: {
    primary: '#FFFFFF',
    secondary: '#f9fafb',
    tertiary: '#f5f7f9',
    searhbarbg: '#F7F7FA',
  },

  // Text Colors
  text: {
    primary: '#333538',
    secondary: '#7a7c7e',
    tertiary: '#a3a4a5',
    disabled: '#a3a4a5',
    inverse: '#FFFFFF',
    map: '#373B51', // Text color for map overlays
  },

  // Border Colors
  border: {
    light: '#e5e7eb',
    normal: '#d1d5db',
    dark: '#9ca3af',
  },
} as const;

export type Colors = typeof colors;

