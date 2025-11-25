/**
 * Forgot Password Screen
 * 3-step flow: Email → Code Verification → Reset Password
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Input, Button } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import {
  forgotPasswordEmailSchema,
  forgotPasswordCodeSchema,
  resetPasswordSchema,
} from '../../../utils/validation';

interface ForgotPasswordScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

type Step = 1 | 2 | 3;

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const codeInputRefs = useRef<(TextInput | null)[]>([]);

  // Step 1: Email
  const handleSendCode = async () => {
    try {
      await forgotPasswordEmailSchema.validate({ email });
      setErrors({});
      // TODO: Call API to send code
      setStep(2);
    } catch (error: any) {
      setErrors({ email: error.message });
    }
  };

  // Step 2: Code verification
  const handleVerifyCode = async () => {
    const codeString = code.join('');
    try {
      await forgotPasswordCodeSchema.validate({ code: codeString });
      setErrors({});
      // TODO: Call API to verify code
      setStep(3);
    } catch (error: any) {
      setErrors({ code: error.message });
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async () => {
    try {
      await resetPasswordSchema.validate({ newPassword, confirmPassword });
      setErrors({});
      setLoading(true);
      // TODO: Call API to reset password
      setTimeout(() => {
        setLoading(false);
        onComplete();
      }, 1000);
    } catch (error: any) {
      setErrors({ [error.path]: error.message });
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setErrors({});

    // Auto-focus next input
    if (value && index < 3) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (key: string, index: number) => {
    // Handle backspace to go to previous input
    if (key === 'Backspace' && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const renderStep1 = () => (
    <>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={styles.subtitle}>
        Entrez votre adresse email et nous vous enverrons un code de vérification
      </Text>

      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Button
          title="Envoyer"
          onPress={handleSendCode}
          variant="primary"
          size="large"
          fullWidth
          disabled={!email}
        />
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.title}>Vérification</Text>
      <Text style={styles.subtitle}>
        Nous avons envoyé un code à 4 chiffres à {email}
      </Text>

      <View style={styles.form}>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (codeInputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handleCodeChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleCodeKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.codeInput,
                errors.code && styles.codeInputError,
              ]}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        {errors.code && (
          <Text style={styles.errorText}>{errors.code}</Text>
        )}

        <TouchableOpacity onPress={() => handleSendCode()} style={styles.resendCode}>
          <Text style={styles.resendCodeText}>Renvoyer le code</Text>
        </TouchableOpacity>

        <Button
          title="Continuer"
          onPress={handleVerifyCode}
          variant="primary"
          size="large"
          fullWidth
          disabled={code.some((c) => !c)}
        />
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.title}>Réinitialiser votre mot de passe</Text>
      <Text style={styles.subtitle}>
        Créez un nouveau mot de passe sécurisé
      </Text>

      <View style={styles.form}>
        <Input
          label="Nouveau mot de passe"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChangeText={setNewPassword}
          error={errors.newPassword}
          secureTextEntry
          autoCapitalize="none"
          hint="Minimum 8 caractères, 1 majuscule, 1 chiffre"
        />

        <Input
          label="Confirmer le mot de passe"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          title="Réinitialiser"
          onPress={handleResetPassword}
          variant="primary"
          size="large"
          fullWidth
          loading={loading}
          disabled={!newPassword || !confirmPassword}
        />
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>
              {step === 1 ? 'Retour' : 'Changer d\'email'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  form: {
    marginBottom: spacing.xl,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  codeInput: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border.normal,
    borderRadius: 8,
    backgroundColor: colors.background.primary,
    ...typography.styles.h2,
    color: colors.text.primary,
  },
  codeInputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.error,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  resendCode: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  resendCodeText: {
    ...typography.styles.bodySmall,
    color: colors.primary.normal,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
  backButtonText: {
    ...typography.styles.body,
    color: colors.primary.normal,
  },
});

