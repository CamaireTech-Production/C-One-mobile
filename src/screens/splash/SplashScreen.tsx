/**
 * Splash Screen
 * Initial loading screen with logo animation
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { AppImage } from '../../components/common';
import { colors, typography, spacing } from '../../theme';
import { images } from '../../assets/images';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [logoFadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Sequence: Background fade in → Logo fade in → Finish
    Animated.sequence([
      // Background image fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Wait a bit
      Animated.delay(500),
      // Logo fade in
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Wait before finishing
      Animated.delay(1000),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <AppImage
          source={images.auth.splash1}
          style={styles.image}
          resizeMode="cover"
          showLoader={false}
        />
      </Animated.View>

      {/* Bottom White Section with Logo */}
      <View style={styles.logoContainer}>
        <Animated.View
          style={[
            styles.logoContent,
            {
              opacity: logoFadeAnim,
            },
          ]}
        >
          {/* C-One Logo */}
          <View style={styles.logoWrapper}>
            <View style={styles.logoC}>
              <View style={styles.logoCInner} />
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoText}>{APP_NAME}</Text>
            </View>
          </View>
          <Text style={styles.tagline}>{APP_TAGLINE}</Text>
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
    height: height * 0.6,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContent: {
    alignItems: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoC: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: colors.primary.normal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    backgroundColor: 'transparent',
  },
  logoCInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.primary.light,
    backgroundColor: 'transparent',
  },
  logoTextContainer: {
    justifyContent: 'center',
  },
  logoText: {
    ...typography.styles.h1,
    color: colors.text.primary,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  tagline: {
    ...typography.styles.body,
    color: colors.text.secondary,
    fontSize: 14,
  },
});

