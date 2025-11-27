/**
 * LoadingOverlay Component
 * Full-screen loading overlay with spinner and optional message
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ViewStyle,
  Animated,
} from 'react-native';
import { Spinner } from './Spinner';
import { colors, typography, spacing } from '../../../theme';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  spinnerColor?: string;
  overlayOpacity?: number;
  style?: ViewStyle;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  spinnerColor = colors.primary.normal,
  overlayOpacity = 0.7,
  style,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={[styles.overlay, { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }, style]}>
        <View style={styles.content}>
          <Spinner size="large" color={spinnerColor} />
          {message && (
            <Text style={styles.message}>{message}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    ...typography.styles.bodyRegular16,
    color: colors.text.inverse,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

