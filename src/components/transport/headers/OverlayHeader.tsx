/**
 * OverlayHeader Component
 * Generic header component with customizable background (color + image)
 * Supports custom children, styles, and can be used across different screens
 * (Flight, Train, Car, Detail, Profile, etc.)
 */

import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
  ImageStyle,
  StatusBar,
  ImageSourcePropType,
  StatusBarStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

export interface OverlayHeaderProps {
  // Navigation
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onRightIconPress?: () => void;
  
  // Left Icon (Back Button) customization
  leftIconName?: string;
  leftIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  leftIconSize?: number;
  leftIconColor?: string;
  leftIconButtonStyle?: ViewStyle;
  leftIconContainerStyle?: ViewStyle; // Style for the circular container around left icon
  leftIconComponent?: ReactNode; // Custom component to replace left icon
  leftIconWithContainer?: boolean; // Whether to wrap left icon in circular container (like DetailHeader)
  
  // Right Icon customization
  rightIconName?: string;
  rightIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  rightIconSize?: number;
  rightIconColor?: string;
  rightIconButtonStyle?: ViewStyle;
  rightIconContainerStyle?: ViewStyle; // Style for the circular container around right icon
  rightIconComponent?: ReactNode; // Custom component to replace right icon
  rightIconWithContainer?: boolean; // Whether to wrap right icon in circular container (like DetailHeader)
  
  // Background customization
  backgroundColor?: string;
  backgroundImage?: string | ImageSourcePropType;
  backgroundImageOpacity?: number; // 0-1, default 0.4
  
  // Custom content
  children?: ReactNode; // Allow custom components to be rendered inside header
  
  // Status bar
  statusBarStyle?: StatusBarStyle; // 'light-content' | 'dark-content' | 'default'
  statusBarTranslucent?: boolean;
  
  // Custom styles
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  imageBackgroundStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  navBarStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  
  // Layout
  minHeight?: number;
  headerHeight?: number; // Explicit header height - overrides minHeight if provided
  showBackButton?: boolean;
  navBarPaddingTop?: number; // Custom top padding for navigation bar
}

export const OverlayHeader: React.FC<OverlayHeaderProps> = ({
  title,
  subtitle,
  onBack,
  onRightIconPress,
  // Left icon props
  leftIconName = 'chevron-back',
  leftIconFamily = 'ionicons',
  leftIconSize = 24,
  leftIconColor,
  leftIconButtonStyle,
  leftIconContainerStyle,
  leftIconComponent,
  leftIconWithContainer = false,
  // Right icon props
  rightIconName = 'home',
  rightIconFamily = 'ionicons',
  rightIconSize = 24,
  rightIconColor,
  rightIconButtonStyle,
  rightIconContainerStyle,
  rightIconComponent,
  rightIconWithContainer = false,
  // Background props
  backgroundColor = colors.primary.normal,
  backgroundImage,
  backgroundImageOpacity = 0.6, // Increased default opacity for better visibility
  // Content props
  children,
  // Status bar props
  statusBarStyle = 'light-content',
  statusBarTranslucent = true,
  // Style props
  style,
  containerStyle,
  imageBackgroundStyle,
  imageStyle,
  navBarStyle,
  subtitleStyle,
  // Layout props
  minHeight = 240,
  headerHeight,
  showBackButton = true,
  navBarPaddingTop,
}) => {
  const insets = useSafeAreaInsets();
  
  // Use headerHeight if provided, otherwise use minHeight
  const finalHeight = headerHeight || minHeight;

  const HeaderContent = (
    <View style={[styles.container, { paddingTop: insets.top }, containerStyle, style]}>
      {/* Navigation Bar */}
      {(title || onBack || onRightIconPress || leftIconComponent || rightIconComponent) && (
        <View style={[
          styles.navBar, 
          navBarPaddingTop !== undefined && { paddingTop: navBarPaddingTop },
          navBarStyle
        ]}>
          {/* Left Icon / Back Button */}
          {showBackButton && (onBack || leftIconComponent) && (
            <TouchableOpacity
              onPress={onBack}
              style={[styles.backButton, leftIconButtonStyle]}
              activeOpacity={0.7}
              disabled={!onBack}
            >
              {leftIconComponent ? (
                leftIconComponent
              ) : leftIconWithContainer ? (
                <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
                  <Icon
                    name={leftIconName}
                    size={leftIconSize}
                    color={leftIconColor || colors.text.primary}
                    family={leftIconFamily}
                  />
                </View>
              ) : (
                <Icon
                  name={leftIconName}
                  size={leftIconSize}
                  color={leftIconColor || colors.text.inverse}
                  family={leftIconFamily}
                />
              )}
            </TouchableOpacity>
          )}

          {title && (
            <Text style={styles.navTitle} numberOfLines={1}>
              {title}
            </Text>
          )}

          {/* Right Icon */}
          {(onRightIconPress || rightIconComponent) && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={[
                rightIconWithContainer ? styles.rightIconButtonWithContainer : styles.rightIconButton,
                rightIconButtonStyle
              ]}
              activeOpacity={0.7}
              disabled={!onRightIconPress}
            >
              {rightIconComponent ? (
                rightIconComponent
              ) : rightIconWithContainer ? (
                <Icon
                  name={rightIconName}
                  size={rightIconSize}
                  color={rightIconColor || colors.primary.normal}
                  family={rightIconFamily}
                />
              ) : (
                <Icon
                  name={rightIconName}
                  size={rightIconSize}
                  color={rightIconColor || colors.text.inverse}
                  family={rightIconFamily}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Subtitle Section */}
      {subtitle && (
        <View style={[styles.subtitleContainer, subtitleStyle]}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}

      {/* Custom Children */}
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );

  // If background image is provided, wrap in ImageBackground
  if (backgroundImage) {
    // Handle both string URLs and require() images
    const imageSource = typeof backgroundImage === 'string'
      ? { uri: backgroundImage }
      : backgroundImage;

    return (
      <>
        <StatusBar 
          barStyle={statusBarStyle} 
          translucent={statusBarTranslucent} 
          backgroundColor="transparent" 
        />
        <ImageBackground
          source={imageSource}
          style={[
            styles.imageBackground, 
            { backgroundColor, minHeight: finalHeight },
            imageBackgroundStyle
          ]}
          imageStyle={[
            styles.imageStyle, 
            { opacity: backgroundImageOpacity },
            imageStyle
          ]}
        >
          {HeaderContent}
        </ImageBackground>
      </>
    );
  }

  // Otherwise, use solid color background
  return (
    <>
      <StatusBar 
        barStyle={statusBarStyle} 
        translucent={statusBarTranslucent} 
        backgroundColor="transparent" 
      />
      <View style={[
        styles.solidBackground, 
        { backgroundColor, minHeight: finalHeight },
        imageBackgroundStyle
      ]}>
        {HeaderContent}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.base,
  },
  imageBackground: {
    width: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  solidBackground: {
    width: '100%',
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
  },
  leftIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: colors.background.tertiary, // #F5F7F9
    justifyContent: 'center',
    alignItems: 'center',
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
  rightIconButtonWithContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    marginLeft: spacing.base,
  },
  subtitleContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.base,
    paddingTop: spacing.base,
  },
  subtitle: {
    ...typography.styles['h2-small'],
    color: colors.text.inverse,
  },
  childrenContainer: {
    paddingHorizontal: spacing.lg,
  },
});

