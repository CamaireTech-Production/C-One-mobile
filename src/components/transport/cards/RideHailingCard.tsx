/**
 * RideHailingCard Component
 * Card displaying ride-hailing service (Uber, Lyft, Yango, Bolt)
 * Shows logo, name, coverage, and download button
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Button } from '../../common/forms/Button';
import type { RideHailingService } from '../../../types/transport';

interface RideHailingCardProps {
  service: RideHailingService;
  onDownload?: () => void;
  style?: ViewStyle;
}

export const RideHailingCard: React.FC<RideHailingCardProps> = ({
  service,
  onDownload,
  style,
}) => {
  const getServiceColor = () => {
    if (service.color) {
      return service.color;
    }
    // Default colors by provider
    switch (service.provider) {
      case 'uber':
        return '#000000';
      case 'lyft':
        return '#FF00BF';
      case 'yango':
        return '#FFD700';
      case 'bolt':
        return '#00D2FF';
      default:
        return colors.primary.normal;
    }
  };

  const backgroundColor = getServiceColor();

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {/* Service Logo/Name */}
      <View style={styles.header}>
        <Text style={styles.serviceName}>{service.name}</Text>
      </View>

      {/* Coverage Text */}
      <Text style={styles.coverage}>{service.coverage}</Text>

      {/* Download Button */}
      <Button
        title="Télécharger"
        onPress={onDownload || (() => {})}
        variant="primary"
        size="medium"
        fullWidth
        style={styles.downloadButton}
        textStyle={styles.downloadButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.base,
    minHeight: 150,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: spacing.md,
  },
  serviceName: {
    ...typography.styles.h4,
    color: colors.text.inverse,
  },
  coverage: {
    ...typography.styles.bodyRegular16,
    color: colors.text.inverse,
    opacity: 0.9,
    marginBottom: spacing.base,
  },
  downloadButton: {
    backgroundColor: colors.transport.flight.primary,
  },
  downloadButtonText: {
    color: colors.text.inverse,
  },
});

