/**
 * SuccessModal Component
 * Modal for password reset success confirmation
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
import { Icon } from './Icon';
import { colors, typography, spacing, shadows } from '../../theme';

interface SuccessModalProps {
  visible: boolean;
  message: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  message,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryPress,
  onSecondaryPress,
  onClose,
  style,
}) => {
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
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Icon
                name="task-alt"
                size={40}
                color={colors.success}
                family="material"
              />
            </View>
          </View>

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onPrimaryPress}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{primaryButtonLabel}</Text>
          </TouchableOpacity>

          {secondaryButtonLabel && onSecondaryPress && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onSecondaryPress}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>{secondaryButtonLabel}</Text>
            </TouchableOpacity>
          )}
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
    borderRadius: 16,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    ...shadows.large,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success + '20', // 20% opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.success,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginBottom: spacing.sm,
  },
  primaryButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
  secondaryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  secondaryButtonText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
});

