export const REFRESH_TOKEN_KEY_NAME = 'refresh-fit-friends-token';

export type Refresh = string;

export const getRefresh = (): Refresh => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveRefresh = (token: Refresh): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const dropRefresh = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};
