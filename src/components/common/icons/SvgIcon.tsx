/**
 * SvgIcon Component
 * Loads and displays SVG icons from assets
 * Uses react-native-svg-transformer to convert SVG to React components
 */

import React from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';

interface SvgIconProps {
  source: any; // SVG component from require() - can be component or { default: component }
  width?: number;
  height?: number;
  style?: ViewStyle;
  color?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  source,
  width = 24,
  height = 24,
  style,
  color,
}) => {
  if (!source) {
    return null;
  }

  // Handle both cases: direct component or { default: component }
  const SvgComponent = source.default || source;

  if (!SvgComponent || typeof SvgComponent !== 'function') {
    return null;
  }

  return (
    <View style={[styles.container, { width, height }, style]}>
      <SvgComponent
        width={width}
        height={height}
        fill={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

