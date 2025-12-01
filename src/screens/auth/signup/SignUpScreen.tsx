/**
 * Sign Up Screen
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Input, Button, AnimatedView, SocialButton, Icon, ScreenBackground } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { VALIDATION } from '../../../utils/constants';
import { RootStackParamList } from '../../../types';
import { useAuth } from '../../../services/auth/authContext';
import { extractApiError } from '../../../services/api/apiClient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  onLogin: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onLogin,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const clearFieldError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      return { ...prev, [field]: undefined };
    });
  };

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    clearFieldError('fullName');
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
    const newErrors: typeof errors = {};

    if (!fullName || fullName.length < 2) {
      newErrors.fullName = t('auth.signup.fullNameError');
    }

    if (!email) {
      newErrors.email = t('validation.email.required');
    } else if (!VALIDATION.email.test(email)) {
      newErrors.email = t('validation.email.invalid');
    }

    if (!password) {
      newErrors.password = t('validation.password.required');
    } else if (password.length < VALIDATION.passwordMinLength) {
      newErrors.password = t('validation.newPassword.minLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    try {
      await register(fullName, email, password);
      // After successful registration, navigate to OTP verification
      navigation.navigate('OtpVerification', {
        email,
        type: 'email-verification',
      });
    } catch (error: any) {
      const apiError = extractApiError(error);
      
      // Handle field-specific errors
      if (apiError.errors) {
        const fieldErrors: { fullName?: string; email?: string; password?: string } = {};
        if (apiError.errors.name) {
          fieldErrors.fullName = Array.isArray(apiError.errors.name)
            ? apiError.errors.name[0]
            : apiError.errors.name;
        }
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
        setErrors({ general: apiError.message || t('auth.signup.error') });
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
            <TouchableOpacity onPress={onLogin} style={styles.loginLink}>
              <Text style={styles.loginLinkText}>{t('auth.signup.loginLink')}</Text>
            </TouchableOpacity>

            <AnimatedView delay={100}>
              <Text style={styles.title}>{t('auth.signup.title')}</Text>
              <Text style={styles.subtitle}>
                {t('auth.signup.subtitle')}
              </Text>
            </AnimatedView>

            <AnimatedView style={styles.form} delay={200}>
              <Input
                label={t('common.labels.fullName')}
                placeholder={t('common.placeholders.fullName')}
                value={fullName}
                onChangeText={handleFullNameChange}
                error={errors.fullName}
                autoCapitalize="words"
                leftIcon={<Icon name="person-outline" size={20} color={colors.text.secondary} />}
                rightIcon={<Icon name="help-circle-outline" size={20} color={colors.text.secondary} />}
              />

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

              <Button
                title={t('auth.signup.button')}
                onPress={handleSignUp}
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                disabled={!fullName || !email || !password}
              />
            </AnimatedView>

            <AnimatedView style={styles.socialSection} delay={300}>
              <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>{t('auth.signup.socialDivider')}</Text>
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
  loginLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  loginLinkText: {
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

