/**
 * RatingSelector Component
 * Star rating selector for filtering by rating
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export interface RatingSelectorProps {
  label: string;
  selectedRating: number; // 0-5 (0 = no filter, 1-5 = minimum rating)
  onRatingChange: (rating: number) => void;
  containerStyle?: ViewStyle;
}

export const RatingSelector: React.FC<RatingSelectorProps> = ({
  label,
  selectedRating,
  onRatingChange,
  containerStyle,
}) => {
  const handleStarPress = (rating: number) => {
    // If clicking the same rating, deselect (set to 0)
    if (selectedRating === rating) {
      onRatingChange(0);
    } else {
      onRatingChange(rating);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((rating) => {
          const isSelected = selectedRating >= rating;
          return (
            <TouchableOpacity
              key={rating}
              style={styles.starButton}
              onPress={() => handleStarPress(rating)}
              activeOpacity={0.7}
            >
              <Icon
                name={isSelected ? 'star' : 'star-outline'}
                size={32}
                color={isSelected ? colors.yellow.normal : colors.border.normal}
                family="ionicons"
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {selectedRating > 0 && (
        <Text style={styles.selectedText}>
          {selectedRating} étoile{selectedRating > 1 ? 's' : ''} et plus
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.styles.bodyMedium16,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  starButton: {
    padding: spacing.xs,
  },
  selectedText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
});

