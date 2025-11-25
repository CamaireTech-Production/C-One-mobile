
import { useFonts as useExpoFonts } from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded, fontError] = useExpoFonts({
    'Urbanist-Regular': require('../../assets/fonts/Urbanist/Urbanist-Regular.ttf'),
    'Urbanist-Medium': require('../../assets/fonts/Urbanist/Urbanist-Medium.ttf'),
    'Urbanist-SemiBold': require('../../assets/fonts/Urbanist/Urbanist-SemiBold.ttf'),
    'Urbanist-Bold': require('../../assets/fonts/Urbanist/Urbanist-Bold.ttf'),
    'Satoshi-Regular': require('../../assets/fonts/Satoshi Variable/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../../assets/fonts/Satoshi Variable/Satoshi-Medium.otf'),
    'Satoshi-Bold': require('../../assets/fonts/Satoshi Variable/Satoshi-Bold.otf'),
  });

  return { fontsLoaded, fontError };
};

