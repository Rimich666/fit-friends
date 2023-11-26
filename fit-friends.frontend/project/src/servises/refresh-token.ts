import {publicApi} from './public.api';
import {EndPoints} from '../api-route';
import {dropToken, getToken, saveToken} from './token';
import {TokenType} from '../types/auth/login.types';
import mem from 'mem';

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

const refreshTokenFn = async () => {
  try {
    const {data} = await publicApi.post<TokenType>(`/${EndPoints.refresh}`, {},{
      headers: {
        'Authorization': `Bearer ${getRefresh()}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(data);
    const { accessToken, refreshToken} = data;

    saveToken(accessToken);
    saveRefresh(refreshToken);

  } catch (error) {
    dropRefresh();
    dropToken();
  }
  return getToken();
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
