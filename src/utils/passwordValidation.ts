/**
 * Password Validation Utilities
 * Centralized password validation functions for signup and login
 */

import { VALIDATION } from './constants';
import i18n from '../i18n';

const t = (key: string, options?: Record<string, unknown>) => i18n.t(key, options);

export interface PasswordValidationResult {
  isValid: boolean;
  error?: string;
  errors?: string[];
}

/**
 * Validates password for signup (comprehensive validation)
 * Requirements:
 * - Minimum 8 characters
 * - Maximum 128 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const validatePasswordForSignup = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  // Required check
  if (!password || password.trim().length === 0) {
    return {
      isValid: false,
      error: t('validation.password.required'),
      errors: [t('validation.password.required')],
    };
  }

  // Minimum length
  if (password.length < VALIDATION.password.minLength) {
    errors.push(t('validation.password.minLength'));
  }

  // Maximum length
  if (password.length > VALIDATION.password.maxLength) {
    errors.push(t('validation.password.maxLength'));
  }

  // Uppercase letter
  if (!VALIDATION.password.uppercase.test(password)) {
    errors.push(t('validation.password.uppercase'));
  }

  // Lowercase letter
  if (!VALIDATION.password.lowercase.test(password)) {
    errors.push(t('validation.password.lowercase'));
  }

  // Number
  if (!VALIDATION.password.number.test(password)) {
    errors.push(t('validation.password.number'));
  }

  // Special character
  if (!VALIDATION.password.specialChar.test(password)) {
    errors.push(t('validation.password.specialChar'));
  }

  return {
    isValid: errors.length === 0,
    error: errors.length > 0 ? errors[0] : undefined,
    errors: errors.length > 0 ? errors : undefined,
  };
};

/**
 * Validates password for login (minimal validation)
 * Only checks if password is provided and meets minimum length
 * We don't want to reveal password requirements to potential attackers
 */
export const validatePasswordForLogin = (password: string): PasswordValidationResult => {
  // Required check
  if (!password || password.trim().length === 0) {
    return {
      isValid: false,
      error: t('validation.password.required'),
    };
  }

  // Basic minimum length check (don't reveal exact requirements)
  if (password.length < VALIDATION.password.minLength) {
    return {
      isValid: false,
      error: t('validation.password.minLength'),
    };
  }

  return {
    isValid: true,
  };
};

