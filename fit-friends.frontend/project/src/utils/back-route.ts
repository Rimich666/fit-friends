import {AppRoute} from '../app-route';

export const BACK_ROUTE = 'guest-fit-friends-back-route-for-cards';

export type Token = string;

export const getBackRoute = (): Token => {
  const token = localStorage.getItem(BACK_ROUTE);
  return token ?? '';
};

export const setBackRoute = (route: AppRoute): void => {
  localStorage.setItem(BACK_ROUTE, route);
};
