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

  // Full stars (active) - filled/solid
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Icon
        key={`star-${i}`}
        name="star"
        size={16}
        color={colors.star.active}
        family="fontawesome6"
        fa6Style="solid"
      />
    );
  }

  // Half star (if needed) - filled/solid
  if (hasHalfStar && fullStars < 5) {
    stars.push(
      <Icon
        key="star-half"
        name="star-half-stroke"
        size={16}
        color={colors.star.active}
        family="fontawesome6"
        fa6Style="solid"
      />
    );
  }

  // Empty stars (inactive) - filled/solid with inactive color
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon
        key={`star-empty-${i}`}
        name="star"
        size={16}
        color={colors.star.inactive}
        family="fontawesome6"
        fa6Style="solid"
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
      {/* Image on top with padding */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

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

        {/* Price - Right aligned */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {currency} {pricePerNight}
          </Text>
          <Text style={styles.priceUnit}> /une nuit</Text>
        </View>

        {/* Distance, Time and Address - Same row */}
        <View style={styles.infoAddressRow}>
          <View style={styles.infoRow}>
            <Icon
              name="route"
              size={14}
              color={colors.text.tertiary}
              family="fontawesome6"
              fa6Style="solid"
            />
            <Text style={styles.infoText}>
              {distance} {distanceUnit}
            </Text>
            <View style={styles.timeContainer}>
              <Icon
                name="time-outline"
                size={14}
                color={colors.text.secondary}
                family="ionicons"
              />
              <Text style={styles.infoSeparator}> à </Text>
              <Text style={styles.infoText}>{duration} min</Text>
            </View>
          </View>
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>

        {/* Reserve Button */}
        <Button
          title="Reserver"
          onPress={handleReserve}
          variant="primary"
          size="small"
          style={styles.reserveButton}
          textStyle={styles.reserveButtonText}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background.searhbarbg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.base,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: {
    padding: spacing.xs,
    paddingBottom: 0,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    ...typography.styles.bodyBold18,
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
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  priceUnit: {
    ...typography.styles.bodyRegular14,
    color: colors.text.primary,
  },
  infoAddressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 4,
  },
  infoText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  infoSeparator: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginHorizontal: 0,
  },
  address: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    textAlign: 'right',
    flex: 1,
    flexShrink: 0,
  },
  reserveButton: {
    width: '100%',
  },
  reserveButtonText: {
    ...typography.styles.bodyMedium18,
  },
});

