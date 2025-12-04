import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import Constants from 'expo-constants';

import { ENDPOINTS } from '@services/api/endpoints';
import { buildHeaders } from '@services/api/headers';
import type { ApiErrorResponse } from '@services/api/types';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '@services/auth/tokenStorage';

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

/**
 * API Base URL Configuration
 * 
 * Pour le développement local : Modifiez directement l'URL ci-dessous
 * Pour la production : Configurez dans app.json -> extra.apiUrl
 */
// const DEFAULT_API_URL = 'http://192.168.1.130:8000';
const DEFAULT_API_URL = 'http://192.168.1.140:8000';

// Utilise la config de app.json si disponible, sinon utilise la valeur par défaut
const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 
  process.env.EXPO_PUBLIC_API_URL ?? 
  DEFAULT_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: AxiosHeaders.from({
    Accept: 'application/json',
  }),
});

const attachAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  const headers = AxiosHeaders.from(config.headers ?? {});
  headers.set('Authorization', `Bearer ${token}`);
  config.headers = headers;
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      attachAuthorizationHeader(config, token);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await axios.post(
    `${API_BASE_URL}${ENDPOINTS.auth.refresh}`,
    {},
    {
      headers: buildHeaders({ token: refreshToken }),
    },
  );

  const tokens = response.data?.tokens;

  if (!tokens) {
    return null;
  }

  await saveTokens(tokens);

  return tokens.accessToken;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetriableRequestConfig;
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          attachAuthorizationHeader(originalRequest, newAccessToken);

          return apiClient(originalRequest as AxiosRequestConfig);
        }
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const extractApiError = (error: unknown) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      message:
        error.response?.data?.message ??
        error.message ??
        'Une erreur est survenue.',
      errors: error.response?.data?.errors,
      status: error.response?.status,
    };
  }

  return {
    message: 'Une erreur inattendue est survenue.',
    errors: null,
    status: undefined,
  };
};

export default apiClient;

