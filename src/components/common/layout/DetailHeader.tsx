/**
 * DetailHeader Component
 * Header for detail screen (country or city) with back button, title, and right icon
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../../theme';
import { Icon } from '../icons/Icon';

interface DetailHeaderProps {
  title: string;
  onBack: () => void;
  onRightIconPress?: () => void;
  rightIconName?: string;
  rightIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
  style?: ViewStyle;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  onBack,
  onRightIconPress,
  rightIconName = 'smart-toy',
  rightIconFamily = 'material',
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, spacing.md),
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon
            name="chevron-back"
            size={24}
            color={colors.text.primary}
            family="ionicons"
          />
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>
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
              size={20}
              color={colors.primary.normal}
              family={rightIconFamily}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.tertiary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    marginRight: spacing.base,
  },
  title: {
    flex: 1,
    // Urbanist 18 semi bold
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.6, // 18 * 1.2
    color: colors.text.primary,
  },
  rightIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    marginLeft: spacing.base,
  },
});

