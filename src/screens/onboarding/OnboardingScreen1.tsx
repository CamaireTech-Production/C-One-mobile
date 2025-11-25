/**
 * Onboarding Screen 1 - La Centralisation
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, AnimatedView } from '../../components/common';
import { colors, typography, spacing } from '../../theme';
import { images } from '../../config/images';

interface OnboardingScreen1Props {
  onContinue: () => void;
  onSignUp?: () => void;
}

const { height } = Dimensions.get('window');

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({
  onContinue,
  onSignUp,
}) => {
  const gradientHeight = height * 0.65;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.onboardingScreen1}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(16,16,16,0.6)',
            'rgba(30,30,30,0.15)',
            'rgba(255,255,255,0)',
          ]}
          locations={[0, 0.25, 0.55]}
          style={styles.topGradient}
        />
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.85)',
            '#ffffff',
          ]}
          locations={[0, 0.35, 1]}
          style={[styles.bottomGradient, { height: gradientHeight }]}
        />

        <View style={styles.contentWrapper}>
          <AnimatedView style={styles.content} delay={200}>
            <AnimatedView delay={300}>
              <Text style={styles.title}>La Centralisation</Text>
            </AnimatedView>

            <AnimatedView delay={400}>
              <Text style={styles.description}>
                Mettez fin au casse-tête de la planification. Vols, hôtels, activités et plus.
                Tout est organisé pour vous.
              </Text>
            </AnimatedView>

            <AnimatedView delay={450}>
              <View style={styles.pagination}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </AnimatedView>

            <AnimatedView delay={500}>
              <View style={styles.ctaSection}>
                <Button
                  title="Commencer"
                  onPress={onContinue}
                  variant="primary"
                  size="large"
                  fullWidth
                />
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Vous n&apos;avez pas de compte ? </Text>
                  <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
                    <Text style={styles.signupLink}>Inscrivez-vous</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AnimatedView>
          </AnimatedView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  backgroundImage: {
    flex: 1,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border.normal,
  },
  dotActive: {
    backgroundColor: colors.primary.normal,
    width: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signupText: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
  },
  signupLink: {
    ...typography.styles.bodySmall,
    color: colors.primary.normal,
    fontWeight: '600',
  },
  ctaSection: {
    gap: spacing.sm,
  },
});

