/**
 * Validation Schemas with Yup
 * Centralized validation schemas for forms
 */

import * as yup from 'yup';
import i18n from '../i18n';
import { VALIDATION } from './constants';

const t = (key: string, options?: Record<string, unknown>) => i18n.t(key, options);

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(t('validation.email.required'))
    .email(t('validation.email.invalid'))
    .matches(VALIDATION.email, t('validation.email.format')),
  password: yup
    .string()
    .required(t('validation.password.required'))
    .min(VALIDATION.passwordMinLength, t('validation.newPassword.minLength')),
});

// Signup validation schema
export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required(t('validation.username.required'))
    .min(2, t('validation.username.min'))
    .max(30, t('validation.username.max')),
  email: yup
    .string()
    .required(t('validation.email.required'))
    .email(t('validation.email.invalid'))
    .matches(VALIDATION.email, t('validation.email.format')),
  password: yup
    .string()
    .required(t('validation.password.required'))
    .min(VALIDATION.passwordMinLength, t('validation.newPassword.minLength'))
    .matches(/[A-Z]/, t('validation.password.uppercase'))
    .matches(/[0-9]/, t('validation.password.number')),
  confirmPassword: yup
    .string()
    .required(t('validation.confirmPassword.required'))
    .oneOf([yup.ref('password')], t('validation.confirmPassword.mismatch')),
});

// Forgot password - Step 1: Email
export const forgotPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required(t('validation.email.required'))
    .email(t('validation.email.invalid'))
    .matches(VALIDATION.email, t('validation.email.format')),
});

// Forgot password - Step 2: Code verification
export const forgotPasswordCodeSchema = yup.object().shape({
  code: yup
    .string()
    .required(t('validation.otp.required'))
    .length(4, t('validation.otp.length'))
    .matches(/^[0-9]+$/, t('validation.otp.digitsOnly')),
});

// Forgot password - Step 3: Reset password
export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(t('validation.newPassword.required'))
    .min(VALIDATION.passwordMinLength, t('validation.newPassword.minLength'))
    .matches(/[A-Z]/, t('validation.password.uppercase'))
    .matches(/[0-9]/, t('validation.password.number')),
  confirmPassword: yup
    .string()
    .required(t('validation.confirmPassword.required'))
    .oneOf([yup.ref('newPassword')], t('validation.confirmPassword.mismatch')),
});

