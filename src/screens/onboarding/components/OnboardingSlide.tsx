import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, AnimatedView } from '../../../components/common';
import { colors, spacing, typography } from '../../../theme';

interface OnboardingSlideProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  step: number;
  totalSteps: number;
  onContinue: () => void;
  onSignUp?: () => void;
  primaryLabel?: string;
}

const { height } = Dimensions.get('window');

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  image,
  step,
  totalSteps,
  onContinue,
  onSignUp,
  primaryLabel = 'Commencer',
}) => {
  const bottomOverlayHeight = height * 0.65;
  const progress = Math.min(Math.max(step / totalSteps, 0), 1);
  const progressWidth = `${progress * 100}%`;

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover">
        <LinearGradient
          colors={[
            'rgba(10, 10, 10, 0.65)',
            'rgba(20, 20, 20, 0.25)',
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
          style={[styles.bottomGradient, { height: bottomOverlayHeight }]}
        />

        <View style={styles.contentWrapper}>
          <AnimatedView style={styles.content} delay={200}>
            <AnimatedView delay={250}>
              <Text style={styles.title}>{title}</Text>
            </AnimatedView>

            <AnimatedView delay={300}>
              <Text style={styles.description}>{description}</Text>
            </AnimatedView>

            <AnimatedView delay={350}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: progressWidth }]} />
              </View>
            </AnimatedView>

            <AnimatedView delay={450}>
              <View style={styles.ctaSection}>
                <Button
                  title={primaryLabel}
                  onPress={onContinue}
                  variant="primary"
                  size="large"
                  fullWidth
                />
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Vous n&apos;avez pas de compte ? </Text>
                  <TouchableOpacity
                    onPress={() => onSignUp?.()}
                    activeOpacity={0.7}
                    disabled={!onSignUp}
                  >
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
    textTransform: 'none',
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  progressTrack: {
    width: 64,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.border.normal,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.normal,
    borderRadius: 999,
  },
  ctaSection: {
    gap: spacing.sm,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

