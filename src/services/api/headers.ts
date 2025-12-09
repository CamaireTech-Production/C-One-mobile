/**
 * Header helpers keep header-building logic in one place.
 * Other modules can import the specific helper they need.
 */

export type HeaderType = 'json' | 'multipart' | 'custom';

export type HeaderOptions = {
  token?: string | null;
  type?: HeaderType;
  extra?: Record<string, string>;
};

const getContentType = (type: HeaderType) => {
  switch (type) {
    case 'multipart':
      return 'multipart/form-data';
    case 'json':
      return 'application/json';
    default:
      return undefined;
  }
};

const baseHeaders = (type: HeaderType = 'json') => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  const contentType = getContentType(type);
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  return headers;
};

export const buildHeaders = ({
  token,
  type = 'json',
  extra,
}: HeaderOptions = {}) => {
  const headers: Record<string, string> = {
    ...baseHeaders(type),
    ...(extra ?? {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const jsonHeaders = (options?: Omit<HeaderOptions, 'type'>) =>
  buildHeaders({ ...options, type: 'json' });

export const multipartHeaders = (options?: Omit<HeaderOptions, 'type'>) =>
  buildHeaders({ ...options, type: 'multipart' });

