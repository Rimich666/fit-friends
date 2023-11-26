import {PersonalAccountLinkInterFace} from './personal-account-link.interface';


import {AppRoute} from '../../../app-route';

export const link: {[k: string]: PersonalAccountLinkInterFace} = {
  friends: {
    href: AppRoute.Friends,
    icon: '#icon-friends',
    text: 'Мои друзья'
  },
  shopping: {
    href: AppRoute.Purchases,
    icon: '#icon-shopping-cart',
    text: 'Мои покупки'
  },
  flash: {
    href: AppRoute.CoachTrainings,
    icon: '#icon-flash',
    text: 'Мои тренировки'
  },
  add: {
    href: AppRoute.CreateTraining,
    icon: '#icon-add',
    text: 'Создать тренировку'
  },
  bag: {
    href: AppRoute.CoachOrders,
    icon: '#icon-bag',
    text: 'Мои заказы'
  }
};

export const coachLinks = ['flash', 'add', 'friends', 'bag'];

export const userLinks = ['friends', 'shopping'];
