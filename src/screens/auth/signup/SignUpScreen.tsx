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
import { Input, Button, AnimatedView, SocialButton, Icon, ScreenBackground } from '../../../components/common';
import { colors, typography, spacing } from '../../../theme';
import { VALIDATION } from '../../../utils/constants';

interface SignUpScreenProps {
  onSignUp: (data: { username: string; email: string; password: string }) => void;
  onLogin: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUp,
  onLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
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
      newErrors.fullName = 'Nom complet requis (min. 2 caractères)';
    }

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

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await onSignUp({ username: fullName, email, password });
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
              <Text style={styles.loginLinkText}>Connexion</Text>
            </TouchableOpacity>

            <AnimatedView delay={100}>
              <Text style={styles.title}>Bienvenue sur C-one !</Text>
              <Text style={styles.subtitle}>
                Entrez vos informations pour l'inscription
              </Text>
            </AnimatedView>

            <AnimatedView style={styles.form} delay={200}>
              <Input
                label="Nom complet"
                placeholder="Danielle mckeny"
                value={fullName}
                onChangeText={handleFullNameChange}
                error={errors.fullName}
                autoCapitalize="words"
                leftIcon={<Icon name="person-outline" size={20} color={colors.text.secondary} />}
                rightIcon={<Icon name="help-circle-outline" size={20} color={colors.text.secondary} />}
              />

              <Input
                label="Email"
                placeholder="olivia@untitledui.com"
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
                label="Mot de passe"
                placeholder="Danielle 123"
                value={password}
                onChangeText={handlePasswordChange}
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                showPasswordToggle
                leftIcon={<Icon name="eye-outline" size={20} color={colors.text.secondary} />}
              />

              <Button
                title="S'inscrire"
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
                <Text style={styles.separatorText}>ou inscrivez-vous avec</Text>
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

