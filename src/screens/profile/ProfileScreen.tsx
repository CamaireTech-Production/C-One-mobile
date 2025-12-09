/**
 * Profile Screen
 * Pixel perfect implementation matching Figma design
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenBackground, Icon, MenuItem } from '../../components/common';
import { OverlayHeader } from '../../components/transport/headers/OverlayHeader';
import { colors, typography, spacing } from '../../theme';
import { useAuth } from '../../services/auth/authContext';
import { MainTabParamList, HomeStackParamList } from '../../types';
import { images } from '../../config/images';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Profile'>,
  NativeStackNavigationProp<HomeStackParamList>
>;

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

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

  const handleMenuItemPress = (item: string) => {
    switch (item) {
      case 'personalInfo':
        // Navigate to personal information screen
        navigation.navigate('PersonalInformation' as any, {});
        break;
      case 'accountSecurity':
        // Navigate to account and security screen
        // TODO: Implement account and security screen
        break;
      case 'paymentMethod':
        // Navigate to payment method screen
        // TODO: Implement payment method screen
        break;
      case 'appLanguage':
        // Navigate to app language screen
        // TODO: Implement app language screen
        break;
      case 'helpSupport':
        // Navigate to help and support screen
        // TODO: Implement help and support screen
        break;
      case 'shareApp':
        // Share app functionality
        // TODO: Implement share app functionality
        break;
      default:
        break;
    }
  };

  // Create dotted pattern overlay component (world map pattern)
  const DottedPattern = () => {
    const dots = [];
    const rows = 12;
    const cols = 8;
    const dotSize = 3;
    const spacingX = 25;
    const spacingY = 25;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create a more organic pattern (not perfectly aligned)
        const offsetX = (row % 2 === 0 ? 0 : spacingX / 2);
        dots.push(
          <View
            key={`${row}-${col}`}
            style={[
              styles.dot,
              {
                left: col * spacingX + offsetX,
                top: row * spacingY,
                width: dotSize,
                height: dotSize,
              },
            ]}
          />
        );
      }
    }

    return <View style={styles.patternContainer}>{dots}</View>;
  };

  // Get avatar from user - backend returns it as 'avatar' in /me endpoint
  // For now, use default avatar if not available
  const profileImageUri = (user as any)?.avatar || images.defaultAvatar;
  const userName = user?.name || 'Danielle mckeny';

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <OverlayHeader
        title={t('navigation.tabs.profile', 'Profil')}
        onBack={handleBack}
        // Left icon - matching train screen style
        leftIconName="chevron-back"
        leftIconFamily="ionicons"
        leftIconSize={20}
        leftIconColor={colors.text.primary}
        leftIconWithContainer={true}
        // Right icon - matching train screen style
        rightIconName="smart-toy"
        rightIconFamily="material"
        rightIconSize={20}
        rightIconColor={colors.primary.normal}
        rightIconWithContainer={true}
        onRightIconPress={() => navigation.navigate('HomeMain')}
        backgroundColor={colors.primary.normal}
        backgroundImage={images.mapVector}
        backgroundImageOpacity={0.8}
        headerHeight={280}
        navBarPaddingTop={0}
        imageBackgroundStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        statusBarStyle="light-content"
      >
        {/* Dotted Pattern Overlay */}
        <DottedPattern />

        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {typeof profileImageUri === 'string' && profileImageUri.startsWith('http') ? (
              <Image
                source={{ uri: profileImageUri }}
                style={styles.avatarImage}
                defaultSource={images.defaultAvatar}
              />
            ) : (
              <Image
                source={images.defaultAvatar}
                style={styles.avatarImage}
              />
            )}
            {/* Camera Icon Overlay */}
            <TouchableOpacity
              style={styles.cameraIconContainer}
              activeOpacity={0.7}
              onPress={() => {
                // TODO: Implement image picker
              }}
            >
              <Icon
                name="camera"
                size={20}
                color={colors.text.inverse}
                family="ionicons"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </OverlayHeader>

      {/* Menu Items Section */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          <MenuItem
            title={t('profile.menu.personalInfo', 'Infos personnelles')}
            leftIconName="person-outline"
            leftIconFamily="ionicons"
            onPress={() => handleMenuItemPress('personalInfo')}
          />

          <MenuItem
            title={t('profile.menu.accountSecurity', 'comptes et sécurité')}
            leftIconName="eye-outline"
            leftIconFamily="ionicons"
            onPress={() => handleMenuItemPress('accountSecurity')}
          />

          <MenuItem
            title={t('profile.menu.paymentMethod', 'Méthode de paiement')}
            leftIconName="wallet-outline"
            leftIconFamily="ionicons"
            onPress={() => handleMenuItemPress('paymentMethod')}
          />

          <MenuItem
            title={t('profile.menu.appLanguage', 'App Language')}
            leftIconName="globe-outline"
            leftIconFamily="ionicons"
            onPress={() => handleMenuItemPress('appLanguage')}
          />

          <MenuItem
            title={t('profile.menu.helpSupport', 'Aide et Support')}
            leftIconName="thumbs-up-outline"
            leftIconFamily="ionicons"
            onPress={() => handleMenuItemPress('helpSupport')}
          />

          <MenuItem
            title={t('profile.menu.shareApp', 'Partager l\'application')}
            leftIconName="share-social-outline"
            leftIconFamily="ionicons"
            onPress={() => handleMenuItemPress('shareApp')}
          />

          <MenuItem
            title={t('profile.menu.logout', 'Deconnexion')}
            leftIconName="log-out-outline"
            leftIconFamily="ionicons"
            variant="danger"
            onPress={handleLogout}
            disabled={isLoggingOut || isLoading}
          />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.base,
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    backgroundColor: colors.text.inverse,
    borderRadius: 1.5,
    opacity: 0.4,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.base,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.light,
    borderWidth: 3,
    borderColor: colors.text.inverse,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.normal,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.text.inverse,
  },
  userName: {
    ...typography.styles.bodyBold18,
    color: colors.text.inverse,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: spacing.base,
  },
});
