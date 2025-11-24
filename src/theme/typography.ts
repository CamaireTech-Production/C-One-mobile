/**
 * Design System - Typography
 * Fonts: Urbanist (Titles), Satoshi Variable (Body, Forms, Buttons)
 */

export const typography = {
  // Font Families
  fonts: {
    urbanist: 'Urbanist',
    satoshi: 'Satoshi Variable',
  },

  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font Weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Typography Styles
  styles: {
    // Titles - Urbanist
    h1: {
      fontFamily: 'Urbanist-Bold',
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 43.2, // 36 * 1.2
    },
    h2: {
      fontFamily: 'Urbanist-Bold',
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 36, // 30 * 1.2
    },
    h3: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 28.8, // 24 * 1.2
    },
    h4: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 24, // 20 * 1.2
    },

    // Body Text - Satoshi Variable
    body: {
      fontFamily: 'Satoshi-Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24, // 16 * 1.5
    },
    bodyLarge: {
      fontFamily: 'Satoshi-Regular',
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 27, // 18 * 1.5
    },
    bodySmall: {
      fontFamily: 'Satoshi-Regular',
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 21, // 14 * 1.5
    },

    // Form Elements - Satoshi Variable
    input: {
      fontFamily: 'Satoshi-Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    inputLabel: {
      fontFamily: 'Satoshi-Medium',
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 21,
    },
    placeholder: {
      fontFamily: 'Satoshi-Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },

    // Buttons - Satoshi Variable
    button: {
      fontFamily: 'Satoshi-Medium',
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 24,
    },
    buttonLarge: {
      fontFamily: 'Satoshi-Bold',
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 27,
    },
    buttonSmall: {
      fontFamily: 'Satoshi-Medium',
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 21,
    },

    // Caption - Satoshi Variable
    caption: {
      fontFamily: 'Satoshi-Regular',
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 18, // 12 * 1.5
    },
  },
} as const;

export type Typography = typeof typography;

