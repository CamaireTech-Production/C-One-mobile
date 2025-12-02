/**
 * CategoryCard Component
 * Generic card displaying category with image, title, and optional description
 * Used for both Tourism and Restaurant categories
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

import { colors, spacing, typography } from '@theme';

export interface CategoryCardProps {
  id: string;
  title: string;
  description?: string; // Optional description
  imageUrl: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
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
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
          locations={[0, 1]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {description && (
              <Text style={styles.description} numberOfLines={3}>
                {description}
              </Text>
            )}
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
    justifyContent: 'flex-end',
    padding: spacing.base,
  },
  content: {
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  title: {
    ...typography.styles.bodyBold18,
    color: colors.text.inverse,
  },
  description: {
    ...typography.styles.bodyMedium16,
    color: colors.yellow.normal, // #CCB47B
  },
});

