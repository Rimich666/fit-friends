import {decodeToken} from 'react-jwt';
import {TokenPayloadInterface} from "../types/token-payload.interface";

export const AUTH_TOKEN_KEY_NAME = 'guest-fit-friends-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getSelfId = () => {
  const payload = decodeToken(getToken()) as TokenPayloadInterface;
  return payload.userId;
};

export const getSelfRole = () => {
  const payload = decodeToken(getToken()) as TokenPayloadInterface;
  return payload.role;
};
