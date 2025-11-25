/**
 * AppImage Component
 * Centralized image component with placeholder, cache, and optimizations
 * 
 * Features:
 * - Automatic placeholder while loading
 * - Error handling with fallback image
 * - Fade in animation
 * - Optimized rendering
 */

import React, { useState } from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { colors, spacing } from '../../theme';
import { images } from '../../assets/images';

interface AppImageProps extends Omit<ImageProps, 'source'> {
  source: ImageSourcePropType | string;
  placeholder?: ImageSourcePropType;
  fallback?: ImageSourcePropType;
  showLoader?: boolean;
  containerStyle?: ImageProps['style'];
}

export const AppImage: React.FC<AppImageProps> = ({
  source,
  placeholder = images.common.placeholder,
  fallback = images.common.placeholder,
  showLoader = true,
  containerStyle,
  style,
  onLoad,
  onError,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Convert string URL to proper source format
  const imageSource: ImageSourcePropType =
    typeof source === 'string'
      ? { uri: source }
      : (source as ImageSourcePropType);

  const handleLoad = (event: any) => {
    setIsLoading(false);
    setHasError(false);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onLoad?.(event);
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };

  const displaySource = hasError ? fallback : imageSource;
  const showPlaceholder = isLoading && !hasError;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Placeholder/Background */}
      {showPlaceholder && (
        <Image
          source={placeholder}
          style={[styles.image, styles.placeholder, style]}
          resizeMode="cover"
        />
      )}

      {/* Loading Indicator */}
      {isLoading && showLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={colors.primary.normal} />
        </View>
      )}

      {/* Main Image */}
      <Animated.Image
        source={displaySource}
        style={[
          styles.image,
          style,
          {
            opacity: fadeAnim,
          },
        ]}
        onLoad={handleLoad}
        onError={handleError}
        {...imageProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    position: 'absolute',
    opacity: 0.3,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },
});

