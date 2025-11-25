/**
 * Onboarding Screen 3 - Expertise locale
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Button, AppImage, AnimatedView } from '../../components/common';
import { colors, typography, spacing } from '../../theme';
import { images } from '../../assets/images';

interface OnboardingScreen3Props {
  onContinue: () => void;
}

const { width, height } = Dimensions.get('window');

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  onContinue,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AppImage
          source={images.onboarding.screen3}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <AnimatedView style={styles.content} delay={200}>
        <AnimatedView delay={300}>
          <Text style={styles.title}>Expertise locale</Text>
        </AnimatedView>
        <AnimatedView delay={400}>
          <Text style={styles.description}>
            Découvrez les meilleures expériences locales recommandées par nos
            experts. Profitez de votre destination comme un véritable local.
          </Text>
        </AnimatedView>
        <AnimatedView delay={500}>
          <Button
            title="Commencer"
            onPress={onContinue}
            variant="primary"
            size="large"
            fullWidth
          />
        </AnimatedView>
        <AnimatedView delay={600}>
          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </AnimatedView>
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  imageContainer: {
    height: height * 0.5,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
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
});

