/**
 * OtpInput Component
 * Reusable OTP input component with customizable boxes, colors, and styles
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export type OtpInputType = 'number' | 'string';

interface OtpInputProps {
  length?: number;
  type?: OtpInputType;
  value: string;
  onChangeText: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  // Colors
  activeBorderColor?: string;
  filledBorderColor?: string;
  unfilledBorderColor?: string;
  activeBackgroundColor?: string;
  filledBackgroundColor?: string;
  unfilledBackgroundColor?: string;
  textColor?: string;
  errorBorderColor?: string;
  // Styles
  containerStyle?: ViewStyle;
  boxStyle?: ViewStyle;
  textStyle?: TextStyle;
  // Other props
  autoFocus?: boolean;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  type = 'number',
  value,
  onChangeText,
  onComplete,
  error,
  activeBorderColor = colors.primary.normal,
  filledBorderColor = colors.primary.normal,
  unfilledBorderColor = colors.border.normal,
  activeBackgroundColor = colors.background.primary,
  filledBackgroundColor = colors.background.primary,
  unfilledBackgroundColor = colors.background.primary,
  textColor = colors.text.primary,
  errorBorderColor = colors.error,
  containerStyle,
  boxStyle,
  textStyle,
  autoFocus = false,
  disabled = false,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(autoFocus ? 0 : null);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto-focus first input if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus]);

  // Auto-complete callback
  const hasCalledOnComplete = useRef(false);
  useEffect(() => {
    if (value.length === length && onComplete && !hasCalledOnComplete.current) {
      hasCalledOnComplete.current = true;
      onComplete(value);
    }
    // Reset when value changes (user clears or changes input)
    if (value.length < length) {
      hasCalledOnComplete.current = false;
    }
  }, [value, length, onComplete]);

  const handleChange = (text: string, index: number) => {
    // Filter input based on type
    let filteredText = text;
    if (type === 'number') {
      filteredText = text.replace(/[^0-9]/g, '');
    }

    // Handle paste: if multiple characters, distribute across boxes
    if (filteredText.length > 1) {
      // Get current value as array
      const newValue = value.split('');
      
      // Distribute pasted characters starting from current index
      for (let i = 0; i < filteredText.length && (index + i) < length; i++) {
        newValue[index + i] = filteredText[i];
      }
      
      const updatedValue = newValue.join('').slice(0, length);
      onChangeText(updatedValue);

      // Focus the next empty box or the last box if all are filled
      const nextEmptyIndex = Math.min(index + filteredText.length, length - 1);
      if (nextEmptyIndex < length) {
        setTimeout(() => {
          inputRefs.current[nextEmptyIndex]?.focus();
          setFocusedIndex(nextEmptyIndex);
        }, 0);
      } else {
        // All boxes filled, blur
        setTimeout(() => {
          inputRefs.current[length - 1]?.blur();
          setFocusedIndex(null);
        }, 0);
      }
      return;
    }

    // Single character input (normal typing)
    const newValue = value.split('');
    newValue[index] = filteredText;
    const updatedValue = newValue.join('').slice(0, length);
    onChangeText(updatedValue);

    // Auto-focus next input if text was entered
    if (filteredText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    } else if (filteredText && index === length - 1) {
      // Last box filled, blur
      inputRefs.current[index]?.blur();
      setFocusedIndex(null);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace
    if (key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Current box is empty, focus previous
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else if (value[index]) {
        // Current box has value, clear it
        const newValue = value.split('');
        newValue[index] = '';
        onChangeText(newValue.join(''));
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const getBoxStyle = (index: number): ViewStyle => {
    const isFocused = focusedIndex === index;
    const isFilled = value[index] !== undefined && value[index] !== '';
    const hasError = !!error;

    let borderColor = unfilledBorderColor;
    let backgroundColor = unfilledBackgroundColor;
    let borderWidth = 1;

    if (hasError) {
      borderColor = errorBorderColor;
    } else if (isFocused) {
      borderColor = activeBorderColor;
      backgroundColor = activeBackgroundColor;
      borderWidth = 2; // Extra outline for active
    } else if (isFilled) {
      borderColor = filledBorderColor;
      backgroundColor = filledBackgroundColor;
    }

    return {
      borderColor,
      backgroundColor,
      borderWidth,
    };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.box,
            getBoxStyle(index),
            boxStyle,
            {
              color: textColor,
            },
            textStyle,
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          keyboardType={type === 'number' ? 'number-pad' : 'default'}
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  box: {
    flex: 1,
    height: 56,
    borderRadius: 8,
    ...typography.styles.h2,
    textAlign: 'center',
  },
});

