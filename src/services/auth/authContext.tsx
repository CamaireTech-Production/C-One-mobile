/**
 * Auth Context - Global authentication state management
 * Provides user data, auth status, and auth methods throughout the app
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { AuthUser, LoginRequest, RegisterRequest, VerifyEmailRequest } from '../api/types';
import { authService } from '../api/auth/authService';
import { getAccessToken, clearTokens } from './tokenStorage';

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = !!user;

  /**
   * Check if user is authenticated on app start
   */
  const checkAuth = useCallback(async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        console.log('[AuthContext] No token found, user not authenticated');
        setUser(null);
        setIsInitializing(false);
        return;
      }

      console.log('[AuthContext] Token found, fetching user profile...');
      // Token exists, try to fetch user profile
      const userData = await authService.me();
      
      if (userData && userData.email) {
        console.log('[AuthContext] User authenticated:', userData.email);
        setUser(userData);
      } else {
        console.log('[AuthContext] Invalid user data received');
        setUser(null);
        await clearTokens();
      }
    } catch (error: any) {
      console.error('[AuthContext] checkAuth error:', error?.message || error);
      // Token invalid or expired, clear state
      setUser(null);
      await clearTokens();
    } finally {
      setIsInitializing(false);
    }
  }, []);

  /**
   * Login user and save tokens
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      // Tokens are automatically saved by authService
      setUser(response.authUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register new user (no tokens yet - email must be verified)
   */
  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.register({ name, email, password });
      // Don't set user yet - they need to verify email first
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verify email and get tokens
   */
  const verifyEmail = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyEmail({ email, otp });
      // Tokens are automatically saved by authService
      if (response.data?.authUser) {
        setUser(response.data.authUser);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user and clear tokens
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      // Tokens are automatically cleared by authService
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh user profile data
   */
  const refreshUser = useCallback(async () => {
    try {
      const userData = await authService.me();
      setUser(userData);
    } catch (error) {
      // If refresh fails, user might be logged out
      setUser(null);
      await clearTokens();
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    isInitializing,
    login,
    register,
    verifyEmail,
    logout,
    refreshUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 * Must be used within AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

