/**
 * SearchBar Component
 * Reusable search bar component with customizable design
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../icons/Icon';

export interface SearchBarStyleConfig {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  iconColor?: string;
  iconSize?: number;
  separatorColor?: string;
  placeholderColor?: string;
  textColor?: string;
  textStyle?: TextStyle;
  dotColor?: string;
  dotSize?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  gap?: number;
  minHeight?: number;
}

export interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  placeholder?: string;
  styleConfig?: SearchBarStyleConfig;
  containerStyle?: ViewStyle;
  showSeparator?: boolean;
  showDot?: boolean;
  leftIconName?: string;
  leftIconFamily?: 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
}

const defaultStyleConfig: Required<SearchBarStyleConfig> = {
  backgroundColor: colors.background.primary,
  borderColor: colors.border.light,
  borderWidth: 1,
  borderRadius: 16,
  iconColor: colors.grey.normal,
  iconSize: 20,
  separatorColor: colors.border.light,
  placeholderColor: colors.text.tertiary,
  textColor: colors.text.primary,
  textStyle: typography.styles.bodyRegular16,
  dotColor: colors.text.tertiary,
  dotSize: 4,
  paddingHorizontal: spacing.base,
  paddingVertical: spacing.sm,
  gap: spacing.sm,
  minHeight: 48,
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  styleConfig = {},
  containerStyle,
  showSeparator = true,
  showDot = true,
  leftIconName = 'search',
  leftIconFamily = 'ionicons',
  value,
  onChangeText,
  ...textInputProps
}) => {
  const config = { ...defaultStyleConfig, ...styleConfig };
  const [inputValue, setInputValue] = useState(value || '');
  const isEmpty = !inputValue || inputValue.length === 0;

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  // Sync with external value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
          borderWidth: config.borderWidth,
          borderRadius: config.borderRadius,
          paddingHorizontal: config.paddingHorizontal,
          paddingVertical: config.paddingVertical,
          minHeight: config.minHeight,
        },
        containerStyle,
      ]}
    >
      <View style={[styles.iconContainer, { gap: config.gap }]}>
        <Icon
          name={leftIconName}
          size={config.iconSize}
          color={config.iconColor}
          family={leftIconFamily}
        />
        {showSeparator && (
          <View
            style={[
              styles.separator,
              {
                backgroundColor: config.separatorColor,
                marginLeft: config.gap,
              },
            ]}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        {isEmpty && placeholder && (
          <View style={styles.placeholderContainer}>
            <Text
              style={[
                styles.placeholderText,
                config.textStyle,
                {
                  color: config.placeholderColor,
                },
              ]}
            >
              {placeholder}
            </Text>
            {showDot && (
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: config.dotColor,
                    width: config.dotSize,
                    height: config.dotSize,
                    borderRadius: config.dotSize / 2,
                    marginLeft: spacing.xs,
                  },
                ]}
              />
            )}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            config.textStyle,
            {
              color: config.textColor,
              backgroundColor: 'transparent',
            },
            textInputProps.style,
          ]}
          value={inputValue}
          onChangeText={handleChangeText}
          placeholder=""
          placeholderTextColor="transparent"
          {...textInputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: 20,
  },
  inputContainer: {
    flex: 1,
    marginLeft: spacing.sm,
    position: 'relative',
    justifyContent: 'center',
  },
  placeholderContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 0,
  },
  placeholderText: {
    padding: 0,
  },
  input: {
    flex: 1,
    padding: 0,
    zIndex: 1,
  },
  dot: {
    // Styles applied inline
  },
});

