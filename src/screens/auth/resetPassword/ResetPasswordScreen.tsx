/**
 * Reset Password Screen
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
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Input, Button, AnimatedView, Icon, ScreenBackground, SuccessModal, LoadingOverlay } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { VALIDATION } from '../../../utils/constants';
import { RootStackParamList } from '../../../types';
import { authService } from '../../../services';
import { extractApiError } from '../../../services/api/apiClient';

type RouteProp = {
  params: {
    email: string;
    otp: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

interface ResetPasswordScreenProps {
  onBack: () => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
}) => {
  const { t } = useTranslation();
  const route = useRoute<RouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { email, otp } = route.params || { email: '', otp: '' };
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const clearFieldError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      return { ...prev, [field]: undefined };
    });
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    clearFieldError('newPassword');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    clearFieldError('confirmPassword');
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!newPassword) {
      newErrors.newPassword = t('validation.newPassword.required');
    } else if (newPassword.length < VALIDATION.passwordMinLength) {
      newErrors.newPassword = t('validation.newPassword.minLength');
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t('validation.confirmPassword.required');
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('validation.confirmPassword.mismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    try {
      await authService.resetPassword(email, otp, newPassword, confirmPassword);
      setShowSuccessModal(true);
    } catch (error: any) {
      const apiError = extractApiError(error);
      
      if (apiError.errors) {
        const fieldErrors: { newPassword?: string; confirmPassword?: string } = {};
        if (apiError.errors.password) {
          fieldErrors.newPassword = Array.isArray(apiError.errors.password)
            ? apiError.errors.password[0]
            : apiError.errors.password;
        }
        if (apiError.errors.password_confirmation) {
          fieldErrors.confirmPassword = Array.isArray(apiError.errors.password_confirmation)
            ? apiError.errors.password_confirmation[0]
            : apiError.errors.password_confirmation;
        }
        setErrors(fieldErrors);
      } else {
        setErrors({ general: apiError.message || t('auth.resetPassword.error') });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalPrimary = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
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
              <Text style={styles.backLinkText}>{t('common.actions.return')}</Text>
            </TouchableOpacity>

            <AnimatedView delay={100}>
              <Text style={styles.title}>{t('auth.resetPassword.title')}</Text>
            </AnimatedView>

            <AnimatedView style={styles.form} delay={200}>
              <Input
                label={t('common.labels.newPassword')}
                placeholder={t('common.placeholders.newPassword')}
                value={newPassword}
                onChangeText={handleNewPasswordChange}
                error={errors.newPassword}
                secureTextEntry
                autoCapitalize="none"
                showPasswordToggle
                leftIcon={<Icon name="eye-outline" size={20} color={colors.text.secondary} />}
                rightIcon={<Icon name="help-circle-outline" size={20} color={colors.text.secondary} />}
              />

              <Input
                label={t('common.labels.confirmPassword')}
                placeholder={t('common.placeholders.confirmPassword')}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                error={errors.confirmPassword}
                secureTextEntry
                autoCapitalize="none"
                showPasswordToggle
                leftIcon={<Icon name="eye-outline" size={20} color={colors.text.secondary} />}
                rightIcon={<Icon name="help-circle-outline" size={20} color={colors.text.secondary} />}
              />

              {errors.general && (
                <Text style={styles.errorMessage}>{errors.general}</Text>
              )}

              <Button
                title={t('auth.resetPassword.button')}
                onPress={handleResetPassword}
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                disabled={!newPassword || !confirmPassword}
              />
            </AnimatedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlay
        visible={loading}
        message={t('common.messages.loadingResetPassword')}
      />
      <SuccessModal
        visible={showSuccessModal}
        message={t('auth.resetPassword.successMessage')}
        primaryButtonLabel={t('auth.resetPassword.successPrimary')}
        secondaryButtonLabel={t('auth.resetPassword.successSecondary')}
        onPrimaryPress={handleSuccessModalPrimary}
        onSecondaryPress={handleSuccessModalClose}
        onClose={handleSuccessModalClose}
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

