/**
 * RestaurantCard Component
 * Card displaying restaurant with image, title, subtitle, rating, price per table, distance, time, and address
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
import { Button } from '../forms/Button';

export interface RestaurantCardProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  rating: number; // 1-5
  pricePerTable: number;
  currency: string;
  distance: number;
  distanceUnit: string;
  duration: number; // in minutes
  address: string;
  onPress?: () => void;
  onReserve?: () => void;
  style?: ViewStyle;
}

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Icon
        key={`star-${i}`}
        name="star"
        size={14}
        color={colors.yellow.normal}
        family="ionicons"
      />
    );
  }

  if (hasHalfStar && fullStars < 5) {
    stars.push(
      <Icon
        key="star-half"
        name="star-half"
        size={14}
        color={colors.yellow.normal}
        family="ionicons"
      />
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon
        key={`star-empty-${i}`}
        name="star-outline"
        size={14}
        color={colors.text.tertiary}
        family="ionicons"
      />
    );
  }

  return stars;
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  title,
  subtitle,
  imageUrl,
  rating,
  pricePerTable,
  currency,
  distance,
  distanceUnit,
  duration,
  address,
  onPress,
  onReserve,
  style,
}) => {
  const handleReserve = (e: any) => {
    e.stopPropagation();
    onReserve?.();
  };

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
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                {subtitle && (
                  <Text style={styles.subtitle} numberOfLines={1}>
                    ({subtitle})
                  </Text>
                )}
              </View>
              {rating > 0 && (
                <View style={styles.ratingContainer}>
                  {renderStars(rating)}
                </View>
              )}
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {currency} {pricePerTable}
              </Text>
              <Text style={styles.priceUnit}> / table</Text>
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

            <View style={styles.buttonContainer}>
              <Button
                title="Reserver"
                onPress={handleReserve}
                variant="primary"
                size="small"
                style={styles.reserveButton}
              />
            </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  title: {
    ...typography.styles.bodyMedium18,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  subtitle: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.xs,
  },
  price: {
    ...typography.styles.bodyMedium18,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  priceUnit: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.9,
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
  buttonContainer: {
    marginTop: spacing.sm,
  },
  reserveButton: {
    minWidth: 120,
  },
});

