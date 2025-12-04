/**
 * TransportInputField Component
 * Custom input field for transport forms with icon, label, and optional counter
 * Matches Figma design: colored rounded background, white rounded icon container, no border on input
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon, IconFamily } from '../../common/icons/Icon';

export type TransportInputType = 'text' | 'counter';

interface TransportInputFieldBaseProps {
  label: string;
  containerStyle?: ViewStyle;
  // Icon props
  iconName?: string;
  iconFamily?: IconFamily;
  iconColor?: string;
  // Background color for the container
  backgroundColor?: string;
  // Label style
  labelStyle?: TextStyle;
}

interface TransportInputFieldTextProps extends TransportInputFieldBaseProps {
  type?: 'text';
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
  textInputProps?: TextInputProps;
}

interface TransportInputFieldCounterProps extends TransportInputFieldBaseProps {
  type: 'counter';
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  formatValue?: (value: number) => string;
}

export type TransportInputFieldProps =
  | TransportInputFieldTextProps
  | TransportInputFieldCounterProps;

export const TransportInputField: React.FC<TransportInputFieldProps> = (props) => {
  const {
    label,
    containerStyle,
    iconName,
    iconFamily = 'ionicons',
    iconColor,
    backgroundColor = colors.secondary.light,
    labelStyle,
  } = props;

  const finalIconColor = iconColor || colors.transport.flight.primary;

  if (props.type === 'counter') {
    const { value, onChange, min = 1, max = 10, formatValue } = props;

    const handleDecrement = () => {
      if (value > min) {
        onChange(value - 1);
      }
    };

    const handleIncrement = () => {
      if (value < max) {
        onChange(value + 1);
      }
    };

    const displayValue = formatValue ? formatValue(value) : String(value).padStart(2, '0');

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.counterContainer, { backgroundColor }]}>
          {/* Label on the left */}
          <Text style={[styles.counterLabel, labelStyle]}>{label}</Text>
          
          {/* Counter controls on the right */}
          <View style={styles.counterControls}>
            <TouchableOpacity
              style={[styles.counterButton, value <= min && styles.counterButtonDisabled]}
              onPress={handleDecrement}
              disabled={value <= min}
              activeOpacity={0.7}
            >
              <Icon
                name="remove"
                size={20}
                color={value <= min ? colors.text.tertiary : colors.border.counter}
                family="ionicons"
              />
            </TouchableOpacity>

            <View style={styles.counterValueContainer}>
              <Text style={styles.counterValue}>{displayValue}</Text>
            </View>

            <TouchableOpacity
              style={[styles.counterButton, value >= max && styles.counterButtonDisabled]}
              onPress={handleIncrement}
              disabled={value >= max}
              activeOpacity={0.7}
            >
              <Icon
                name="add"
                size={20}
                color={value >= max ? colors.text.tertiary : colors.border.counter}
                family="ionicons"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Text input type
  const {
    value,
    placeholder,
    onChangeText,
    onPress,
    editable = true,
    textInputProps,
  } = props;

  const handlePress = () => {
    if (onPress && editable) {
      onPress();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, { backgroundColor }]}>
        {/* Icon on the left */}
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={20} color={finalIconColor} family={iconFamily} />
          </View>
        )}
        
        {/* Label and Input in a column on the right */}
        <View style={styles.labelInputColumn}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <TouchableOpacity
            onPress={handlePress}
            disabled={!onPress || !editable}
            activeOpacity={onPress ? 0.7 : 1}
            style={styles.inputWrapper}
          >
            <TextInput
              style={styles.input}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={colors.text.tertiary}
              onChangeText={onChangeText}
              editable={editable && !onPress}
              {...textInputProps}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  // Text input container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.base,
  },
  labelInputColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    ...typography.styles.input,
    color: colors.text.primary,
    paddingVertical: 0,
    paddingHorizontal: 0,
    // No border, no background - transparent
    borderWidth: 0,
    backgroundColor: 'transparent',
    minHeight: 20,
  },
  // Counter styles
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  counterLabel: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    flex: 1,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  counterButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: colors.background.primary,
    borderWidth: 0.8,
    borderColor: colors.border.counter,
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterValueContainer: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
  },
  counterValue: {
    ...typography.styles.bodyMedium18,
    color: colors.text.primary,
  },
});

