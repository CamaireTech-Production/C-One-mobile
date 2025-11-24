/**
 * Onboarding Screen 2 - La Simplicité
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { Button } from '../../components/common';
import { colors, typography, spacing } from '../../theme';

interface OnboardingScreen2Props {
  onContinue: () => void;
}

const { width, height } = Dimensions.get('window');

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({
  onContinue,
}) => {
  const imageSource: ImageSourcePropType = require('../../../assets/icon.png');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>La Simplicité</Text>
        <Text style={styles.description}>
          Une interface intuitive et moderne pour une expérience de voyage
          fluide et agréable. Tout est conçu pour votre confort.
        </Text>
        <Button
          title="Continuer"
          onPress={onContinue}
          variant="primary"
          size="large"
          fullWidth
        />
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
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

