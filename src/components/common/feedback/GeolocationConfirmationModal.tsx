/**
 * GeolocationConfirmationModal Component
 * Modal for confirming detected location/city
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Icon } from '../icons/Icon';
import { colors, typography, spacing, shadows } from '../../../theme';

interface GeolocationConfirmationModalProps {
  visible: boolean;
  cityName: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

export const GeolocationConfirmationModal: React.FC<GeolocationConfirmationModalProps> = ({
  visible,
  cityName,
  onConfirm,
  onCancel,
  onClose,
  style,
}) => {
  const { t } = useTranslation();

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
          {/* Header avec label "Verification" et bouton de fermeture */}
          <View style={styles.header}>
            <Text style={styles.label}>
              {t('geolocation.confirmation.label')}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose || onCancel}
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
            {t('geolocation.confirmation.title')}
          </Text>

          {/* Séparateur */}
          <View style={styles.separator} />

          {/* Message avec nom de la ville */}
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              {t('geolocation.confirmation.message', { city: cityName })}
            </Text>
          </View>

          {/* Boutons d'action */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>
                {t('geolocation.confirmation.confirmButton')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>
                {t('geolocation.confirmation.cancelButton')}
              </Text>
            </TouchableOpacity>
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
    gap: spacing.base,
    paddingHorizontal: spacing.xs,
  },
  confirmButton: {
    backgroundColor: colors.primary.normal,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width: '100%',
  },
  confirmButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width: '100%',
    borderWidth: 0,
  },
  cancelButtonText: {
    ...typography.styles.button,
    color: colors.primary.normal,
  },
});


