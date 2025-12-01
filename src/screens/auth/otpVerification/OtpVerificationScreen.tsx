/**
 * OTP Verification Screen
 * Pixel perfect implementation matching Figma design
 */

import React, { useState, useCallback } from 'react';
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

import { Button, AnimatedView, OtpInput, ScreenBackground, VerificationModal, LoadingOverlay } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { RootStackParamList } from '../../../types';
import { useAuth } from '../../../services/auth/authContext';
import { authService } from '../../../services';
import { extractApiError } from '../../../services/api/apiClient';

type RouteProp = {
  params: {
    email: string;
    type: 'email-verification' | 'password-reset';
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpVerification'>;

interface OtpVerificationScreenProps {
  onBack: () => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  onBack,
}) => {
  const { t } = useTranslation();
  const route = useRoute<RouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { verifyEmail } = useAuth();
  const { email, type } = route.params || { email: '', type: 'email-verification' as const };
  
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'error'>('success');

  const handleCodeChange = (value: string) => {
    setCode(value);
    setError(undefined);
  };

  const handleContinue = useCallback(async () => {
    if (code.length !== 6) {
      setError(t('validation.otp.length'));
      return;
    }

    setLoading(true);
    setError(undefined);
    try {
      if (type === 'email-verification') {
        // Email verification after signup
        await verifyEmail(email, code);
        setVerificationResult('success');
        setShowVerificationModal(true);
      } else {
        // Password reset OTP verification
        await authService.verifyOtp({ email, otp: code });
        // Navigate to reset password screen
        navigation.navigate('ResetPassword', { email, otp: code });
      }
    } catch (err: any) {
      const apiError = extractApiError(err);
      setVerificationResult('error');
      setError(apiError.message || t('validation.otp.invalid'));
      setShowVerificationModal(true);
    } finally {
      setLoading(false);
    }
  }, [code, email, type, t, verifyEmail, navigation]);

  const handleCodeComplete = useCallback(async (value: string) => {
    // Auto-verify when code is complete
    await handleContinue();
  }, [handleContinue]);

  const handleResendCode = async () => {
    setCode('');
    setError(undefined);
    try {
      if (type === 'email-verification') {
        // Resend email verification OTP - would need a resend endpoint
        // For now, just clear the code
      } else {
        // Resend password reset OTP
        await authService.forgotPassword({ email });
      }
    } catch (err: any) {
      const apiError = extractApiError(err);
      setError(apiError.message || t('auth.otp.resendError'));
    }
  };

  const handleVerificationModalClose = () => {
    setShowVerificationModal(false);
    if (verificationResult === 'success' && type === 'email-verification') {
      // Navigation will be handled by AppNavigator when isAuthenticated changes
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
              <Text style={styles.backLinkText}>{t('common.actions.return')}</Text>
            </TouchableOpacity>

            <AnimatedView delay={100}>
              <Text style={styles.title}>{t('auth.otp.title')}</Text>
              <Text style={styles.subtitle}>
                {t('auth.otp.subtitle')}
              </Text>
            </AnimatedView>

            <AnimatedView style={styles.form} delay={200}>
              <OtpInput
                length={6}
                type="number"
                value={code}
                onChangeText={handleCodeChange}
                onComplete={handleCodeComplete}
                error={error}
                autoFocus
              />

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <TouchableOpacity onPress={handleResendCode} style={styles.resendContainer}>
                <Text style={styles.resendText}>{t('auth.otp.resend')}</Text>
              </TouchableOpacity>

              <Button
                title={t('auth.otp.button')}
                onPress={handleContinue}
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                disabled={code.length !== 6}
              />
            </AnimatedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlay
        visible={loading}
        message={t('common.messages.loadingVerifyCode')}
      />
      <VerificationModal
        visible={showVerificationModal}
        variant={verificationResult}
        onClose={handleVerificationModalClose}
        onButtonPress={handleVerificationModalClose}
        buttonLabel={verificationResult === 'success' ? t('auth.otp.modalSuccessButton') : t('auth.otp.modalErrorButton')}
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
  errorText: {
    ...typography.styles.caption,
    color: colors.error,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  resendContainer: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  resendText: {
    ...typography.styles.bodyBold16,
    color: colors.primary.normal,
  },
});

