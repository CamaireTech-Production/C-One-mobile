/**
 * Forgot Password Screen
 * Pixel perfect implementation matching Figma design
 * Step 1: Email entry (as shown in screenshot)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Input, Button, AnimatedView, Icon, ScreenBackground, LoadingOverlay } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { VALIDATION } from '../../../utils/constants';
import { RootStackParamList } from '../../../types';
import { authService } from '../../../services';
import { extractApiError } from '../../../services/api/apiClient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const clearFieldError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      return { ...prev, [field]: undefined };
    });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    clearFieldError('email');
  };

  const validate = () => {
    const newErrors: { email?: string } = {};

    if (!email) {
      newErrors.email = t('validation.email.required');
    } else if (!VALIDATION.email.test(email)) {
      newErrors.email = t('validation.email.invalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    try {
      await authService.forgotPassword(email);
      // Navigate to OTP verification screen with email and type
      navigation.navigate('OtpVerification', { 
        email, 
        type: 'password-reset' 
      });
    } catch (error: any) {
      const apiError = extractApiError(error);
      
      if (apiError.errors?.email) {
        setErrors({ 
          email: Array.isArray(apiError.errors.email)
            ? apiError.errors.email[0]
            : apiError.errors.email 
        });
      } else {
        setErrors({ general: apiError.message || t('auth.forgotPassword.error') });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <TouchableOpacity onPress={onBack} style={styles.backLink}>
              <Text style={styles.backLinkText}>{t('common.actions.back')}</Text>
            </TouchableOpacity>

            <AnimatedView delay={100}>
              <Text style={styles.title}>{t('auth.forgotPassword.title')}</Text>
              <Text style={styles.subtitle}>
                {t('auth.forgotPassword.subtitle')}
              </Text>
            </AnimatedView>

            <AnimatedView style={styles.form} delay={200}>
              <Input
                label={t('common.labels.email')}
                placeholder={t('common.placeholders.email')}
                value={email}
                onChangeText={handleEmailChange}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Icon name="mail-outline" size={20} color={colors.text.secondary} />}
                rightIcon={<Icon name="help-circle-outline" size={20} color={colors.text.secondary} />}
              />

              {errors.general && (
                <Text style={styles.errorMessage}>{errors.general}</Text>
              )}

              <Button
                title={t('auth.forgotPassword.button')}
                onPress={handleContinue}
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                disabled={!email}
              />
            </AnimatedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlay
        visible={loading}
        message={t('common.messages.loadingSendCode')}
      />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing['4xl'],
  },
  backLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  backLinkText: {
    ...typography.styles.bodyBold16,
    color: colors.primary.normal,
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  form: {
    marginBottom: spacing.xl,
  },
  errorMessage: {
    ...typography.styles.caption,
    color: colors.error,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});

