import {AppRoute} from '../../app-route';

export enum HeaderPoint {
  home = 'home',
  user = 'user',
  friends = 'friends',
}

export enum HeaderTitle {
  home = 'На главную',
  user = 'Личный кабинет',
  friends = 'Друзья',
}

export const HeaderLink = {
  home: AppRoute.Main,
  user: AppRoute.Office,
  friends: AppRoute.Friends,
};

export const getActivePoint = (path: string) => {
  if (path.toLowerCase().includes('friends')) {
    return HeaderPoint.friends;
  }
  if (path.toLowerCase().includes('office')) {
    return HeaderPoint.user;
  }
  if (path.toLowerCase().includes('main')) {
    return HeaderPoint.home;
  }
  return undefined as unknown as AppRoute;
};
