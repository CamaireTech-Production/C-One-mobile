/**
 * Home Screen
 * Main screen displayed after successful authentication
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenBackground } from '../../components/common';
import { colors, typography, spacing } from '../../theme';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('home.title')}</Text>
          <Text style={styles.subtitle}>
            {t('home.subtitle')}
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('home.cards.main.title')}</Text>
            <Text style={styles.cardDescription}>
              {t('home.cards.main.description')}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('home.cards.upcoming.title')}</Text>
            <Text style={styles.cardDescription}>
              {t('home.cards.upcoming.description')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing['4xl'],
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});


