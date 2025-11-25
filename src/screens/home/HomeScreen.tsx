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
import { ScreenBackground } from '../../components/common';
import { colors, typography, spacing } from '../../theme';

export const HomeScreen: React.FC = () => {
  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.subtitle}>
            Vous êtes maintenant connecté à C-one
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Page d'accueil</Text>
            <Text style={styles.cardDescription}>
              Cette page sera développée avec les fonctionnalités principales de l'application.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Fonctionnalités à venir</Text>
            <Text style={styles.cardDescription}>
              • Navigation par onglets{'\n'}
              • Recherche{'\n'}
              • Réservations{'\n'}
              • Profil utilisateur
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

