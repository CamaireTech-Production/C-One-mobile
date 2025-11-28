/**
 * GeolocationAlertModal Component
 * Modal for geolocation errors and permission issues
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ViewStyle,
  Linking,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Icon } from '../icons/Icon';
import { colors, typography, spacing, shadows } from '../../../theme';

export type GeolocationAlertType = 
  | 'permissionDenied' 
  | 'locationDisabled' 
  | 'networkError' 
  | 'timeout' 
  | 'unknown';

interface GeolocationAlertModalProps {
  visible: boolean;
  alertType: GeolocationAlertType;
  onClose: () => void;
  onOpenSettings?: () => void;
  style?: ViewStyle;
}

export const GeolocationAlertModal: React.FC<GeolocationAlertModalProps> = ({
  visible,
  alertType,
  onClose,
  onOpenSettings,
  style,
}) => {
  const { t } = useTranslation();

  const handleOpenSettings = async () => {
    if (onOpenSettings) {
      onOpenSettings();
    } else {
      // Ouvrir les paramètres système par défaut
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
    }
    onClose();
  };

  const getAlertConfig = () => {
    switch (alertType) {
      case 'permissionDenied':
        return {
          title: t('geolocation.alert.permissionDenied.title'),
          message: t('geolocation.alert.permissionDenied.message'),
          showSettingsButton: true,
          icon: 'location-off-outline',
          iconColor: colors.error,
        };
      case 'locationDisabled':
        return {
          title: t('geolocation.alert.locationDisabled.title'),
          message: t('geolocation.alert.locationDisabled.message'),
          showSettingsButton: true,
          icon: 'location-off-outline',
          iconColor: colors.error,
        };
      case 'networkError':
        return {
          title: t('geolocation.alert.networkError.title'),
          message: t('geolocation.alert.networkError.message'),
          showSettingsButton: false,
          icon: 'cloud-offline-outline',
          iconColor: colors.warning,
        };
      case 'timeout':
        return {
          title: t('geolocation.alert.timeout.title'),
          message: t('geolocation.alert.timeout.message'),
          showSettingsButton: false,
          icon: 'time-outline',
          iconColor: colors.warning,
        };
      case 'unknown':
      default:
        return {
          title: t('geolocation.alert.unknown.title'),
          message: t('geolocation.alert.unknown.message'),
          showSettingsButton: false,
          icon: 'alert-circle-outline',
          iconColor: colors.error,
        };
    }
  };

  const config = getAlertConfig();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, style]}>
          {/* Header avec label "Alerte" et bouton de fermeture */}
          <View style={styles.header}>
            <Text style={styles.label}>
              {t('geolocation.alert.label')}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Icon 
                name="close-circle-outline" 
                size={24} 
                color={colors.text.secondary} 
                family="ionicons" 
              />
            </TouchableOpacity>
          </View>

          {/* Titre */}
          <Text style={styles.title}>
            {config.title}
          </Text>

          {/* Séparateur */}
          <View style={styles.separator} />

          {/* Message */}
          <View style={styles.messageContainer}>
            {config.message.includes('•') ? (
              <Text style={styles.message}>
                {config.message.split('•').map((line, index) => {
                  if (index === 0) return line.trim();
                  return `\n• ${line.trim()}`;
                }).join('')}
              </Text>
            ) : (
              <Text style={styles.message}>{config.message}</Text>
            )}
          </View>

          {/* Boutons d'action */}
          <View style={styles.buttonsContainer}>
            {config.showSettingsButton && (
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={handleOpenSettings}
                activeOpacity={0.8}
              >
                <Text style={styles.settingsButtonText}>
                  {t('geolocation.alert.openSettings')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: 0,
  },
  modal: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...shadows.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  label: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 19.5, // 13 * 1.5
    color: colors.text.secondary,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.light,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  messageContainer: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  message: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
    textAlign: 'left',
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 0,
    paddingHorizontal: spacing.xs,
  },
  settingsButton: {
    backgroundColor: colors.primary.normal,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width: '100%',
  },
  settingsButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
});


