/**
 * VerificationModal Component
 * Modal for OTP verification success/error states
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ViewStyle,
  Platform,
  StatusBar,
} from 'react-native';
import { Icon } from '../icons/Icon';
import { colors, typography, spacing, shadows } from '../../../theme';

export type VerificationVariant = 'success' | 'error';

interface VerificationModalProps {
  visible: boolean;
  variant: VerificationVariant;
  onClose: () => void;
  onButtonPress?: () => void;
  buttonLabel?: string;
  style?: ViewStyle;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  visible,
  variant,
  onClose,
  onButtonPress,
  buttonLabel,
  style,
}) => {
  const isSuccess = variant === 'success';
  const backgroundColor = isSuccess ? colors.success : colors.error;
  const iconBackgroundColor = isSuccess ? colors.successLight : colors.errorLight;
  // Icônes Material Icons pour le badge
  // task-alt pour succès, error pour erreur
  const iconName = isSuccess ? 'task-alt' : 'error';
  const iconFamily = 'material'; // Toutes les icônes utilisent Material Icons
  const defaultButtonLabel = isSuccess ? 'verification completed' : 'verification failed';

  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      onClose();
    }
  };

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
          {/* Header avec titre et bouton de fermeture sur la même ligne */}
          <View style={styles.header}>
            <Text style={styles.title}>Vérification</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Icon name="close-circle-outline" size={24} color={colors.text.secondary} family="ionicons" />
            </TouchableOpacity>
          </View>

          {/* Séparateur léger */}
          <View style={styles.separator} />

          {/* Bouton d'action avec badge */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor }]}
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.iconCircle, { backgroundColor: iconBackgroundColor }]}>
                <Icon
                  name={iconName}
                  size={16}
                  color={backgroundColor}
                  family={iconFamily}
                />
              </View>
              <Text style={styles.buttonText}>
                {buttonLabel || defaultButtonLabel}
              </Text>
            </View>
          </TouchableOpacity>
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
    paddingTop: 0, // Overlay couvre la barre de statut
  },
  modal: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...shadows.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.light,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    textTransform: 'capitalize',
  },
});

