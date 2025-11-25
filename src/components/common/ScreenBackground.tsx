/**
 * ScreenBackground Component
 * Reusable background component supporting colors, gradients, and images
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export type GradientConfig = {
  colors: string[];
  locations?: number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

export interface ScreenBackgroundProps {
  children?: React.ReactNode;
  // Color background
  backgroundColor?: string;
  // Gradient background
  gradient?: GradientConfig;
  // Image background
  image?: ImageSourcePropType;
  imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  // Image with gradient overlay
  imageGradient?: GradientConfig;
  imageGradientHeight?: number | string; // Height of gradient overlay (number or percentage)
  imageGradientPosition?: 'top' | 'bottom' | 'full'; // Position of gradient overlay
  // Style
  style?: ViewStyle;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  backgroundColor = colors.background.primary,
  gradient,
  image,
  imageResizeMode = 'cover',
  imageGradient,
  imageGradientHeight,
  imageGradientPosition = 'bottom',
  style,
}) => {
  // If image is provided
  if (image) {
    const gradientHeight = imageGradientHeight
      ? typeof imageGradientHeight === 'string'
        ? height * (parseFloat(imageGradientHeight) / 100)
        : imageGradientHeight
      : height * 0.65;

    const getGradientStyle = (): ViewStyle => {
      switch (imageGradientPosition) {
        case 'top':
          return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: gradientHeight,
          };
        case 'bottom':
          return {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: gradientHeight,
          };
        case 'full':
        default:
          return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          };
      }
    };

    return (
      <View style={[styles.container, style]}>
        <ImageBackground
          source={image}
          style={styles.imageBackground}
          resizeMode={imageResizeMode}
        >
          {imageGradient && (
            <LinearGradient
              colors={imageGradient.colors}
              locations={imageGradient.locations}
              start={imageGradient.start}
              end={imageGradient.end}
              style={getGradientStyle()}
            />
          )}
          {children}
        </ImageBackground>
      </View>
    );
  }

  // If gradient is provided
  if (gradient) {
    return (
      <LinearGradient
        colors={gradient.colors}
        locations={gradient.locations}
        start={gradient.start}
        end={gradient.end}
        style={[styles.container, { backgroundColor }, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  // Default: solid color background
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

