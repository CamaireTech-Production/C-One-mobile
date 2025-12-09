/**
 * Login Screen
 * Pixel perfect implementation matching Figma design
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

import { Input, Button, AnimatedView, SocialButton, Icon, ScreenBackground } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { VALIDATION } from '../../../utils/constants';
import { validatePasswordForLogin } from '../../../utils/passwordValidation';
import { useAuth } from '../../../services/auth/authContext';
import { extractApiError } from '../../../services/api/apiClient';

interface LoginScreenProps {
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSignUp,
  onForgotPassword,
}) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    clearFieldError('password');
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = t('validation.email.required');
    } else if (!VALIDATION.email.test(email)) {
      newErrors.email = t('validation.email.invalid');
    }

    // Use minimal password validation for login (don't reveal requirements)
    const passwordValidation = validatePasswordForLogin(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error || t('validation.password.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    try {
      await login(email, password);
      // Navigation will be handled by AppNavigator when isAuthenticated changes
    } catch (error: any) {
      const apiError = extractApiError(error);
      
      // Handle field-specific errors
      if (apiError.errors) {
        const fieldErrors: { email?: string; password?: string } = {};
        if (apiError.errors.email) {
          fieldErrors.email = Array.isArray(apiError.errors.email) 
            ? apiError.errors.email[0] 
            : apiError.errors.email;
        }
        if (apiError.errors.password) {
          fieldErrors.password = Array.isArray(apiError.errors.password)
            ? apiError.errors.password[0]
            : apiError.errors.password;
        }
        setErrors(fieldErrors);
      } else {
        // General error message
        setErrors({ general: apiError.message || t('auth.login.error') });
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
          <TouchableOpacity onPress={onSignUp} style={styles.signUpLink}>
            <Text style={styles.signUpLinkText}>{t('auth.login.signupLink')}</Text>
          </TouchableOpacity>

          <AnimatedView delay={100}>
            <Text style={styles.title}>{t('auth.login.title')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.login.subtitle')}
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

            <Input
              label={t('common.labels.password')}
              placeholder={t('common.placeholders.password')}
              value={password}
              onChangeText={handlePasswordChange}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              showPasswordToggle
              leftIcon={<Icon name="eye-outline" size={20} color={colors.text.secondary} />}
            />

            {errors.general && (
              <Text style={styles.errorMessage}>{errors.general}</Text>
            )}

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={onForgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  {t('auth.login.forgotPassword')}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title={t('auth.login.button')}
              onPress={handleLogin}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              disabled={!email || !password}
            />
          </AnimatedView>

          <AnimatedView style={styles.socialSection} delay={300}>
            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>{t('auth.login.socialDivider')}</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.socialButtons}>
              <SocialButton
                provider="google"
                onPress={() => {}}
                style={styles.socialButton}
              />
              <SocialButton
                provider="facebook"
                onPress={() => {}}
                style={styles.socialButton}
              />
              <SocialButton
                provider="apple"
                onPress={() => {}}
                style={styles.socialButton}
              />
            </View>
          </AnimatedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  signUpLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  signUpLinkText: {
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    ...typography.styles.bodyBold16,
    color: colors.primary.normal,
    textDecorationLine: 'underline',
  },
  socialSection: {
    marginTop: spacing.md,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.normal,
    opacity: 0.5,
  },
  separatorText: {
    ...typography.styles.bodySmall,
    color: colors.text.tertiary,
    marginHorizontal: spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
  },
});

