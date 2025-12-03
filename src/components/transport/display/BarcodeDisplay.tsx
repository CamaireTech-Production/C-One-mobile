/**
 * BarcodeDisplay Component
 * Displays barcode with number
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

interface BarcodeDisplayProps {
  barcode: string;
  style?: ViewStyle;
}

export const BarcodeDisplay: React.FC<BarcodeDisplayProps> = ({
  barcode,
  style,
}) => {
  // Generate barcode pattern (visual representation)
  const generateBarcodePattern = () => {
    // Simple visual representation using bars
    // In a real implementation, you would use a barcode library
    const bars = [];
    for (let i = 0; i < 20; i++) {
      const width = Math.random() * 3 + 1; // Random width between 1-4
      bars.push(
        <View
          key={i}
          style={[
            styles.bar,
            {
              width: width,
              height: 60,
            },
          ]}
        />
      );
    }
    return bars;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.barcodeContainer}>
        {generateBarcodePattern()}
      </View>
      <Text style={styles.barcodeNumber}>{barcode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: spacing.base,
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.background.primary,
    borderRadius: 4,
  },
  bar: {
    backgroundColor: colors.text.primary,
    marginHorizontal: 1,
  },
  barcodeNumber: {
    ...typography.styles.bodyRegular14,
    color: colors.text.primary,
    letterSpacing: 2,
  },
});

