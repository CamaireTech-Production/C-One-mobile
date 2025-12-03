export type ImageSource = {
  uri?: string;
} | number | string;

/**
 * All app images - simple flat structure
 * Just add name: source pairs here
 */
export const images = {
  placeholder: require('../../assets/icon.png'),

  // Splash Screen
  splashBackground: require('../../assets/images/splash-screenBG.jpg'),
  splashLogo: require('../../assets/splash-icon.png'),

  // Onboarding
  onboardingScreen1: require('../../assets/images/onboarding-1-bg.png'),
  onboardingScreen2: require('../../assets/images/onboarding-2-bg.jpg'),
  onboardingScreen3: require('../../assets/images/onboarding-3-bg.png'),

  // Auth
  loginBackground: require('../../assets/icon.png'),
  signupBackground: require('../../assets/icon.png'),

  // Common
  logo: require('../../assets/icon.png'),
  defaultAvatar: require('../../assets/icon.png'),

  // Home
  worldMap: require('../../assets/images/map.png'),

  // Detail
  detailBackground: require('../../assets/images/detail_bg.jpg'),

  // Transport
  mapVector: require('../../assets/images/map-vector.png'),

  // Add more images here as needed
  // exampleImage: 'https://example.com/image.jpg',
  // or
  // exampleImage: require('../../assets/images/example.png'),
} as const;

// Type for the images object
export type Images = typeof images;

