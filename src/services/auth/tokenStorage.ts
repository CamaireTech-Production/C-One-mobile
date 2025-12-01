import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = '@c-one/access-token';
const REFRESH_TOKEN_KEY = '@c-one/refresh-token';
const ACCESS_TOKEN_EXP_KEY = '@c-one/access-token-exp';

export type PersistedTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string | number | null; // Backend sends as string timestamp
};

export const saveTokens = async ({
  accessToken,
  refreshToken,
  expiresAt,
}: PersistedTokens) => {
  // Convert expiresAt to number if it's a string timestamp
  const expiryNumber =
    expiresAt === null || expiresAt === undefined
      ? null
      : typeof expiresAt === 'string'
        ? Number(expiresAt)
        : expiresAt;

  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
    [ACCESS_TOKEN_EXP_KEY, expiryNumber ? String(expiryNumber) : ''],
  ]);
};

export const getAccessToken = async () => AsyncStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = async () => AsyncStorage.getItem(REFRESH_TOKEN_KEY);

export const getAccessTokenExpiry = async () => {
  const storedValue = await AsyncStorage.getItem(ACCESS_TOKEN_EXP_KEY);
  return storedValue ? Number(storedValue) : null;
};

export const isAccessTokenExpired = async () => {
  const expiry = await getAccessTokenExpiry();
  if (!expiry) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  return expiry <= now;
};

export const clearTokens = async () => {
  await AsyncStorage.multiRemove([
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_EXP_KEY,
  ]);
};

