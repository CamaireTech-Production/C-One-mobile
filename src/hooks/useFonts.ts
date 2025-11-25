/**
 * Custom Hook for Loading Fonts
 * Loads Urbanist and Satoshi Variable fonts
 * 
 * NOTE: Font files must be added to assets/fonts/ directory
 * - Urbanist-Regular.ttf, Urbanist-Medium.ttf, Urbanist-SemiBold.ttf, Urbanist-Bold.ttf
 * - Satoshi-Regular.otf, Satoshi-Medium.otf, Satoshi-Bold.otf
 * 
 * For now, uses system fonts as fallback until custom fonts are added
 * When font files are added, uncomment the useExpoFonts code below
 */

import { useFonts as useExpoFonts } from 'expo-font';

export const useFonts = () => {
  // TODO: Uncomment when font files are added to assets/fonts/
  // const [fontsLoaded, fontError] = useExpoFonts({
  //   'Urbanist-Regular': require('../../assets/fonts/Urbanist-Regular.ttf'),
  //   'Urbanist-Medium': require('../../assets/fonts/Urbanist-Medium.ttf'),
  //   'Urbanist-SemiBold': require('../../assets/fonts/Urbanist-SemiBold.ttf'),
  //   'Urbanist-Bold': require('../../assets/fonts/Urbanist-Bold.ttf'),
  //   'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf'),
  //   'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
  //   'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
  // });

  // Temporary: Return true to allow app to load with system fonts
  // The typography system will use system fonts as fallback
  // Remove this once custom fonts are added and uncomment above
  return { fontsLoaded: true, fontError: null };
};

