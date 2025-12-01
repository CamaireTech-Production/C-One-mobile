/**
 * Profile Screen
 * Simple profile page with logout functionality
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, ScreenBackground, Icon } from '../../components/common';
import { colors, typography, spacing } from '../../theme';
import { useAuth } from '../../services/auth/authContext';

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      t('profile.logout.title', 'Déconnexion'),
      t('profile.logout.message', 'Êtes-vous sûr de vouloir vous déconnecter ?'),
      [
        {
          text: t('common.actions.cancel', 'Annuler'),
          style: 'cancel',
        },
        {
          text: t('profile.logout.confirm', 'Déconnexion'),
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await logout();
              // Navigation will be handled by AppNavigator when isAuthenticated becomes false
            } catch (error) {
              Alert.alert(
                t('profile.logout.error', 'Erreur'),
                t('profile.logout.errorMessage', 'Une erreur est survenue lors de la déconnexion.')
              );
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Icon 
              name="user" 
              size={64} 
              color={colors.primary.normal} 
              family="fontawesome6" 
              fa6Style="solid" 
            />
          </View>
          <Text style={styles.name}>{user?.name || 'Utilisateur'}</Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {t('profile.settings', 'Paramètres')}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon 
                name="user" 
                size={20} 
                color={colors.text.secondary} 
                family="fontawesome6" 
                fa6Style="regular" 
              />
              <Text style={styles.infoLabel}>
                {t('profile.role', 'Rôle')}
              </Text>
              <Text style={styles.infoValue}>
                {user?.role || 'CUSTOMER'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon 
                name="circle-check" 
                size={20} 
                color={colors.text.secondary} 
                family="fontawesome6" 
                fa6Style="solid" 
              />
              <Text style={styles.infoLabel}>
                {t('profile.status', 'Statut')}
              </Text>
              <Text style={styles.infoValue}>
                {user?.status || 'ACTIVE'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <Button
            title={t('profile.logout.button', 'Se déconnecter')}
            onPress={handleLogout}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoggingOut || isLoading}
            style={styles.logoutButton}
          />
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
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    gap: spacing.sm,
  },
  infoLabel: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    flex: 1,
  },
  infoValue: {
    ...typography.styles.bodyBold14,
    color: colors.text.primary,
  },
  logoutSection: {
    marginTop: spacing.xl,
    marginBottom: spacing['4xl'],
  },
  logoutButton: {
    backgroundColor: colors.error,
  },
});

