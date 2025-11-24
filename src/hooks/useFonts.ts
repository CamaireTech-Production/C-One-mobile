/**
 * Custom Hook for Loading Fonts
 * Loads Urbanist and Satoshi Variable fonts
 * 
 * NOTE: Font files must be added to assets/fonts/ directory
 * - Urbanist-Regular.ttf, Urbanist-Medium.ttf, Urbanist-SemiBold.ttf, Urbanist-Bold.ttf
 * - Satoshi-Regular.otf, Satoshi-Medium.otf, Satoshi-Bold.otf
 */

import { useFonts as useExpoFonts } from 'expo-font';

export const useFonts = () => {
  // TODO: Uncomment and update paths once font files are added
  // const [fontsLoaded, fontError] = useExpoFonts({
  //   'Urbanist-Regular': require('../../assets/fonts/Urbanist-Regular.ttf'),
  //   'Urbanist-Medium': require('../../assets/fonts/Urbanist-Medium.ttf'),
  //   'Urbanist-SemiBold': require('../../assets/fonts/Urbanist-SemiBold.ttf'),
  //   'Urbanist-Bold': require('../../assets/fonts/Urbanist-Bold.ttf'),
  //   'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf'),
  //   'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
  //   'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
  // });

  // Temporary: Return true to allow app to load without fonts
  // Remove this once fonts are added
  return { fontsLoaded: true, fontError: null };
};

