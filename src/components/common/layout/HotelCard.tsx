/**
 * HotelCard Component
 * Card displaying hotel with image on top, text content below
 * Used in horizontal scrollable layout
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';

import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../icons/Icon';
import { Button } from '../forms/Button';

export interface HotelCardProps {
  id: string;
  title: string;
  imageUrl: string;
  rating: number; // 1-5
  pricePerNight: number;
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
        size={16}
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
        size={16}
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
        size={16}
        color={colors.text.tertiary}
        family="ionicons"
      />
    );
  }

  return stars;
};

export const HotelCard: React.FC<HotelCardProps> = ({
  title,
  imageUrl,
  rating,
  pricePerNight,
  currency,
  distance,
  distanceUnit,
  duration,
  address,
  onPress,
  onReserve,
  style,
}) => {
  const handleReserve = () => {
    onReserve?.();
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Image on top */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content below image */}
      <View style={styles.content}>
        {/* Title and Rating row */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {rating > 0 && (
            <View style={styles.ratingContainer}>
              {renderStars(rating)}
            </View>
          )}
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {currency} {pricePerNight}
          </Text>
          <Text style={styles.priceUnit}> /une nuit</Text>
        </View>

        {/* Distance and Time */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            {distance} {distanceUnit}
          </Text>
          <Text style={styles.infoSeparator}> à </Text>
          <Text style={styles.infoText}>{duration} min</Text>
        </View>

        {/* Address */}
        <Text style={styles.address} numberOfLines={1}>
          {address}
        </Text>

        {/* Reserve Button */}
        <Button
          title="Reserver"
          onPress={handleReserve}
          variant="primary"
          size="small"
          style={styles.reserveButton}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.base,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  content: {
    padding: spacing.base,
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.styles.bodySemibold18,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.styles.bodySemibold18,
    color: colors.text.primary,
  },
  priceUnit: {
    ...typography.styles.bodyRegular14,
    color: colors.text.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  infoSeparator: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginHorizontal: spacing.xs,
  },
  address: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  reserveButton: {
    width: '100%',
  },
});

