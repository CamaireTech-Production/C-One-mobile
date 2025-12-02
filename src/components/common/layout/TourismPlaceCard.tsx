/**
 * TourismPlaceCard Component
 * Card displaying tourism place with image, title, optional price, distance, time, and address
 * Used in horizontal layout
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../icons/Icon';

export interface TourismPlaceCardProps {
  id: string;
  title: string;
  imageUrl: string;
  startingPrice?: number;
  currency?: string;
  distance: number;
  distanceUnit: string;
  duration: number; // in minutes
  address: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const TourismPlaceCard: React.FC<TourismPlaceCardProps> = ({
  title,
  imageUrl,
  startingPrice,
  currency,
  distance,
  distanceUnit,
  duration,
  address,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
              {startingPrice !== undefined && currency && (
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>À partir </Text>
                  <Text style={styles.price}>
                    {currency} {startingPrice}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Icon
                  name="location-outline"
                  size={14}
                  color={colors.text.inverse}
                  family="ionicons"
                />
                <Text style={styles.infoText}>
                  {distance} {distanceUnit}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Icon
                  name="time-outline"
                  size={14}
                  color={colors.text.inverse}
                  family="ionicons"
                />
                <Text style={styles.infoText}>{duration} min</Text>
              </View>
            </View>

            <Text style={styles.address} numberOfLines={1}>
              {address}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.base,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.base,
  },
  content: {
    gap: spacing.xs,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    ...typography.styles.bodyMedium18,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.xs,
  },
  priceLabel: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  price: {
    ...typography.styles.bodyMedium18,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  infoText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  address: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
});

