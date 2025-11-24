/**
 * Modal Component
 * Modal overlay with fade animation
 */

import React, { useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, shadows } from '../../theme';

export type ModalVariant = 'success' | 'error' | 'info';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  variant?: ModalVariant;
  primaryButton?: {
    label: string;
    onPress: () => void;
  };
  secondaryButton?: {
    label: string;
    onPress: () => void;
  };
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  message,
  variant = 'info',
  primaryButton,
  secondaryButton,
}) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      default:
        return colors.info;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ scale: scaleAnim }],
            },
            shadows.large,
          ]}
        >
          {title && (
            <Text style={[styles.title, { color: getVariantColor() }]}>
              {title}
            </Text>
          )}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            {secondaryButton && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={secondaryButton.onPress}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryButton.label}
                </Text>
              </TouchableOpacity>
            )}
            {primaryButton && (
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, { backgroundColor: getVariantColor() }]}
                onPress={primaryButton.onPress}
              >
                <Text style={styles.primaryButtonText}>
                  {primaryButton.label}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: spacing.lg,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    ...typography.styles.h3,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    ...typography.styles.body,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary.normal,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.normal,
  },
  primaryButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
  secondaryButtonText: {
    ...typography.styles.button,
    color: colors.text.primary,
  },
});

