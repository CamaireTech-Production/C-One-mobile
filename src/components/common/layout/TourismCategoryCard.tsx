/**
 * TourismCategoryCard Component
 * Card displaying tourism category with image, title, and description
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

export interface TourismCategoryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const TourismCategoryCard: React.FC<TourismCategoryCardProps> = ({
  title,
  description,
  imageUrl,
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
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {description}
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
    height: 160,
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
    justifyContent: 'center',
    padding: spacing.base,
  },
  content: {
    gap: spacing.xs,
  },
  title: {
    ...typography.styles.bodyMedium18,
    color: colors.text.inverse,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.styles.bodyRegular14,
    color: colors.text.inverse,
    opacity: 0.9,
    lineHeight: 20,
  },
});

