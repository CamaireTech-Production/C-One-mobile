/**
 * FlightSearchHeader Component
 * Special header for flight search screen with background color + image
 * Extends to notification bar and includes title section
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

interface FlightSearchHeaderProps {
  title: string; // "Réservation - avion"
  subtitle?: string; // "Découvrez les meilleurs vol pour vous"
  onBack: () => void;
  onRightIconPress?: () => void;
  rightIconName?: string;
  rightIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  backgroundColor?: string;
  backgroundImage?: string; // Optional background image URL
  style?: ViewStyle;
}

export const FlightSearchHeader: React.FC<FlightSearchHeaderProps> = ({
  title,
  subtitle,
  onBack,
  onRightIconPress,
  rightIconName = 'home',
  rightIconFamily = 'ionicons',
  backgroundColor = colors.transport.flight.primary,
  backgroundImage,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const HeaderContent = (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon
            name="chevron-back"
            size={24}
            color={colors.text.inverse}
            family="ionicons"
          />
        </TouchableOpacity>

        <Text style={styles.navTitle} numberOfLines={1}>
          {title}
        </Text>

        {onRightIconPress && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconButton}
            activeOpacity={0.7}
          >
            <Icon
              name={rightIconName}
              size={24}
              color={colors.text.inverse}
              family={rightIconFamily}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Subtitle Section */}
      {subtitle && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );

  // If background image is provided, wrap in ImageBackground
  if (backgroundImage) {
    return (
      <>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <ImageBackground
          source={{ uri: backgroundImage }}
          style={[styles.imageBackground, { backgroundColor }]}
          imageStyle={styles.imageStyle}
        >
          {HeaderContent}
        </ImageBackground>
      </>
    );
  }

  // Otherwise, use solid color background
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={[styles.solidBackground, { backgroundColor }]}>
        {HeaderContent}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl, // Extra padding for subtitle section
  },
  imageBackground: {
    width: '100%',
    minHeight: 200, // Minimum height to ensure subtitle is visible
  },
  imageStyle: {
    opacity: 0.3, // Adjust opacity of background image
    resizeMode: 'cover',
  },
  solidBackground: {
    width: '100%',
    minHeight: 200, // Minimum height to ensure subtitle is visible
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  backButton: {
    marginRight: spacing.base,
    padding: spacing.xs,
  },
  navTitle: {
    flex: 1,
    ...typography.styles.h4,
    color: colors.text.inverse,
  },
  rightIconButton: {
    marginLeft: spacing.base,
    padding: spacing.xs,
  },
  subtitleContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
    paddingBottom: spacing.md,
  },
  subtitle: {
    ...typography.styles.h2,
    color: colors.text.inverse,
    fontWeight: '700',
  },
});

