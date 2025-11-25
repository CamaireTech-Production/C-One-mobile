/**
 * Splash Screen
 * Pixel perfect implementation matching Figma design
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ImageStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from '../../components/media';
import { colors, typography, spacing } from '../../theme';
import { images } from '../../config/images';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [logoFadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Sequence: Background fade in → Logo fade in
    Animated.sequence([
      // Background image fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Wait a bit
      Animated.delay(300),
      // Logo fade in
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Calculate gradient overlay height (30-35% of screen)
  const gradientHeight = height * 0.45;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      {/* Full Screen Background Image */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={images.splashBackground}
          style={styles.backgroundImage}
          resizeMode="cover"
          showLoader={false}
        />
      </Animated.View>

      <LinearGradient
        colors={[
          'rgba(255,255,255,0.06)',
          'rgba(255,255,255,0.3)',
          'rgba(255,255,255,0.7)',
          '#ffffff',
        ]}
        locations={[0.2, 0.3, 0.5, 1]}
        style={[styles.gradientOverlay, { height: gradientHeight }]}
      />

      <View style={[styles.logoContainer, { height: gradientHeight }]}>
        <Animated.View
          style={[
            styles.logoContent,
            {
              opacity: logoFadeAnim,
            },
          ]}
        >
          {/* Logo Icon */}
          <Image
            source={images.splashLogo}
            style={styles.logoIcon}
            resizeMode="contain"
            showLoader={false}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  logoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  logoContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 200,
    height: 200,
  } as ImageStyle,
  logoText: {
    ...typography.styles.h1,
    color: colors.text.primary,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  tagline: {
    ...typography.styles.body,
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
