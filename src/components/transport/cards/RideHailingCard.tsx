/**
 * RideHailingCard Component
 * Card displaying ride-hailing service (Uber, Lyft, Yango, Bolt)
 * Shows logo, name, coverage, and download button
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';
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
  const { t } = useTranslation();
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
        <View style={styles.logoContainer}>
          {service.logoUrl ? (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>{service.name.charAt(0)}</Text>
            </View>
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>{service.name.charAt(0)}</Text>
            </View>
          )}
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.coverage}>{service.coverage}</Text>
        </View>
      </View>

      {/* Download Button */}
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={onDownload || (() => {})}
        activeOpacity={0.8}
      >
        <Text style={styles.downloadButtonText}>
          {t('transport.common.download') || 'Télécharger'}
        </Text>
        <Icon
          name="download-outline"
          size={20}
          color={colors.text.inverse}
          family="ionicons"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.base,
    minHeight: 120,
    justifyContent: 'space-between',
    shadowColor: colors.shadow.card.shadowColor,
    shadowOffset: colors.shadow.card.shadowOffset,
    shadowOpacity: colors.shadow.card.shadowOpacity,
    shadowRadius: colors.shadow.card.shadowRadius,
    elevation: colors.shadow.card.elevation,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoContainer: {
    marginRight: spacing.md,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...typography.styles.h3,
    color: colors.text.inverse,
    fontWeight: 'bold',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...typography.styles.h4,
    color: colors.text.inverse,
    marginBottom: spacing.xs,
  },
  coverage: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  downloadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  downloadButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    marginRight: spacing.sm,
  },
});

