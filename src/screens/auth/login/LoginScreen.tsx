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
import { Input, Button, AnimatedView, SocialButton } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { VALIDATION } from '../../../utils/constants';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSignUp,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email requis';
    } else if (!VALIDATION.email.test(email)) {
      newErrors.email = 'Email invalide';
    }

    if (!password) {
      newErrors.password = 'Mot de passe requis';
    } else if (password.length < VALIDATION.passwordMinLength) {
      newErrors.password = `Minimum ${VALIDATION.passwordMinLength} caractères`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <TouchableOpacity onPress={onSignUp} style={styles.signUpLink}>
            <Text style={styles.signUpLinkText}>S'inscrire</Text>
          </TouchableOpacity>

          <AnimatedView delay={100}>
            <Text style={styles.title}>Bienvenue de nouveau!</Text>
            <Text style={styles.subtitle}>
              Entrez vos informations pour vous connecter
            </Text>
          </AnimatedView>

          <AnimatedView style={styles.form} delay={200}>
            <Input
              label="Email"
              placeholder="olivia@untitledui.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={<Text style={styles.iconText}>✉️</Text>}
              rightIcon={<Text style={styles.iconText}>❓</Text>}
            />

            <Input
              label="Mot de passe"
              placeholder="Danielle 123"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              showPasswordToggle
              leftIcon={<Text style={styles.iconText}>👁️</Text>}
              rightIcon={
                errors.password ? (
                  <View style={styles.errorIconContainer}>
                    <Text style={styles.errorIcon}>!</Text>
                  </View>
                ) : null
              }
            />

            {errors.password && (
              <Text style={styles.errorMessage}>
                Ceci est un mot de passe incorrect
              </Text>
            )}

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={onForgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Se connecter"
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
              <Text style={styles.separatorText}>ou connexion avec</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.light,
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
    ...typography.styles.bodyBold18,
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
  iconText: {
    fontSize: 18,
  },
  errorIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.inverse,
    lineHeight: 14,
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
    ...typography.styles.bodySmall,
    color: colors.primary.normal,
  },
  socialSection: {
    marginTop: spacing.xl,
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

