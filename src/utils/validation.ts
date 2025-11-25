/**
 * Validation Schemas with Yup
 * Centralized validation schemas for forms
 */

import * as yup from 'yup';
import { VALIDATION } from './constants';

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email requis')
    .email('Email invalide')
    .matches(VALIDATION.email, 'Format email invalide'),
  password: yup
    .string()
    .required('Mot de passe requis')
    .min(VALIDATION.passwordMinLength, `Minimum ${VALIDATION.passwordMinLength} caractères`),
});

// Signup validation schema
export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required('Nom d\'utilisateur requis')
    .min(2, 'Minimum 2 caractères')
    .max(30, 'Maximum 30 caractères'),
  email: yup
    .string()
    .required('Email requis')
    .email('Email invalide')
    .matches(VALIDATION.email, 'Format email invalide'),
  password: yup
    .string()
    .required('Mot de passe requis')
    .min(VALIDATION.passwordMinLength, `Minimum ${VALIDATION.passwordMinLength} caractères`)
    .matches(/[A-Z]/, 'Doit contenir au moins une majuscule')
    .matches(/[0-9]/, 'Doit contenir au moins un chiffre'),
  confirmPassword: yup
    .string()
    .required('Confirmation requise')
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});

// Forgot password - Step 1: Email
export const forgotPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email requis')
    .email('Email invalide')
    .matches(VALIDATION.email, 'Format email invalide'),
});

// Forgot password - Step 2: Code verification
export const forgotPasswordCodeSchema = yup.object().shape({
  code: yup
    .string()
    .required('Code requis')
    .length(4, 'Le code doit contenir 4 chiffres')
    .matches(/^[0-9]+$/, 'Le code doit contenir uniquement des chiffres'),
});

// Forgot password - Step 3: Reset password
export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Nouveau mot de passe requis')
    .min(VALIDATION.passwordMinLength, `Minimum ${VALIDATION.passwordMinLength} caractères`)
    .matches(/[A-Z]/, 'Doit contenir au moins une majuscule')
    .matches(/[0-9]/, 'Doit contenir au moins un chiffre'),
  confirmPassword: yup
    .string()
    .required('Confirmation requise')
    .oneOf([yup.ref('newPassword')], 'Les mots de passe ne correspondent pas'),
});

