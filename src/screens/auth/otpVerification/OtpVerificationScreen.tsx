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
import { Button, AnimatedView, OtpInput, ScreenBackground, VerificationModal, LoadingOverlay } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';

interface OtpVerificationScreenProps {
  onComplete: (code: string) => void;
  onBack: () => void;
  email?: string;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  onComplete,
  onBack,
  email,
}) => {
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
    if (code.length !== 4) {
      setError('Le code doit contenir 4 chiffres');
      return;
    }

    setLoading(true);
    setError(undefined);
    try {
      // TODO: Call API to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Cas de test : si le code est "2002", afficher le modal d'échec
      // En production, cela dépendra de la réponse de l'API
      const isValid = code !== '2002';
      
      if (isValid) {
        setVerificationResult('success');
        setShowVerificationModal(true);
      } else {
        setVerificationResult('error');
        setError('Code invalide');
        setShowVerificationModal(true);
      }
    } catch (err: any) {
      setVerificationResult('error');
      setError(err.message || 'Code invalide');
      setShowVerificationModal(true);
    } finally {
      setLoading(false);
    }
  }, [code]);

  const handleCodeComplete = useCallback(async (value: string) => {
    // Auto-verify when code is complete
    await handleContinue();
  }, [handleContinue]);

  const handleResendCode = async () => {
    setCode('');
    setError(undefined);
    // TODO: Call API to resend code
  };

  const handleVerificationModalClose = () => {
    setShowVerificationModal(false);
    if (verificationResult === 'success') {
      onComplete(code);
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
              <Text style={styles.backLinkText}>Retourner</Text>
            </TouchableOpacity>

            <AnimatedView delay={100}>
              <Text style={styles.title}>Vérification</Text>
              <Text style={styles.subtitle}>
                Entrez le code envoyé à votre e-mail
              </Text>
            </AnimatedView>

            <AnimatedView style={styles.form} delay={200}>
              <OtpInput
                length={4}
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
                <Text style={styles.resendText}>Renvoyer le code</Text>
              </TouchableOpacity>

              <Button
                title="Continuer"
                onPress={handleContinue}
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                disabled={code.length !== 4}
              />
            </AnimatedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlay
        visible={loading}
        message="Vérification du code..."
      />
      <VerificationModal
        visible={showVerificationModal}
        variant={verificationResult}
        onClose={handleVerificationModalClose}
        onButtonPress={handleVerificationModalClose}
        buttonLabel={verificationResult === 'success' ? 'vérification terminée' : 'Échec de la vérification'}
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

