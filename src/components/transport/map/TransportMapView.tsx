/**
 * TransportMapView Component
 * Map view with route and markers for stops
 * Note: This is a placeholder - in production, use react-native-maps or similar
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

interface TransportMapViewProps {
  origin?: { latitude: number; longitude: number; name?: string };
  destination?: { latitude: number; longitude: number; name?: string };
  stops?: Array<{ latitude: number; longitude: number; name: string; number?: number }>;
  style?: ViewStyle;
}

export const TransportMapView: React.FC<TransportMapViewProps> = ({
  origin,
  destination,
  stops = [],
  style,
}) => {
  // Placeholder implementation
  // In production, integrate with react-native-maps or expo-maps
  return (
    <View style={[styles.container, style]}>
      <View style={styles.mapPlaceholder}>
        <Icon name="map-outline" size={48} color={colors.text.secondary} family="ionicons" />
        <Text style={styles.placeholderText}>Map View</Text>
        <Text style={styles.placeholderSubtext}>
          {origin?.name && `From: ${origin.name}`}
          {destination?.name && ` To: ${destination.name}`}
        </Text>
        {stops.length > 0 && (
          <Text style={styles.placeholderSubtext}>
            {stops.length} stop{stops.length > 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.normal,
    borderStyle: 'dashed',
  },
  placeholderText: {
    ...typography.styles.bodyMedium18,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  placeholderSubtext: {
    ...typography.styles.bodyRegular14,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
});

