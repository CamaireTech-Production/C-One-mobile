/**
 * PasswordScreen
 * 4 circular inputs with numeric keypad 3x4
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  DetailHeader,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';

interface PasswordScreenParams {
  purpose?: 'payment' | 'verification';
  onSuccess?: () => void;
}

type PasswordScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Password'
>;

export const PasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<PasswordScreenNavigationProp>();
  const params = route.params as PasswordScreenParams;

  const [password, setPassword] = useState<string>('');
  const PASSWORD_LENGTH = 4;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNumberPress = (number: string) => {
    if (password.length < PASSWORD_LENGTH) {
      setPassword(password + number);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handleClear = () => {
    setPassword('');
  };

  // Auto-submit when password is complete
  React.useEffect(() => {
    if (password.length === PASSWORD_LENGTH) {
      // Simulate verification delay
      setTimeout(() => {
        if (params.onSuccess) {
          params.onSuccess();
        } else {
          navigation.goBack();
        }
      }, 500);
    }
  }, [password, params.onSuccess, navigation]);

  const renderPasswordDots = () => {
    return Array.from({ length: PASSWORD_LENGTH }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.passwordDot,
          index < password.length && styles.passwordDotFilled,
        ]}
      />
    ));
  };

  const renderKeypad = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'delete'],
    ];

    return keys.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.keypadRow}>
        {row.map((key, keyIndex) => {
          if (key === '') {
            return <View key={keyIndex} style={styles.keypadKey} />;
          }
          if (key === 'delete') {
            return (
              <TouchableOpacity
                key={keyIndex}
                style={styles.keypadKey}
                onPress={handleDelete}
                activeOpacity={0.7}
              >
                <Text style={styles.keypadKeyText}>⌫</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={keyIndex}
              style={styles.keypadKey}
              onPress={() => handleNumberPress(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.keypadKeyText}>{key}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={
          params.purpose === 'payment'
            ? 'Confirmer le paiement'
            : 'Vérification'
        }
        onBack={handleBack}
      />

      <View style={styles.container}>
        {/* Password Dots */}
        <View style={styles.passwordContainer}>
          {renderPasswordDots()}
        </View>

        {/* Keypad */}
        <View style={styles.keypadContainer}>{renderKeypad()}</View>

        {/* Clear Button */}
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
          activeOpacity={0.7}
        >
          <Text style={styles.clearButtonText}>Effacer</Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.base,
    marginBottom: spacing['4xl'],
  },
  passwordDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border.normal,
    backgroundColor: 'transparent',
  },
  passwordDotFilled: {
    backgroundColor: colors.primary.normal,
    borderColor: colors.primary.normal,
  },
  keypadContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  keypadKey: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    ...colors.shadow.card,
  },
  keypadKeyText: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  clearButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  clearButtonText: {
    ...typography.styles.bodyMedium16,
    color: colors.text.secondary,
  },
});

