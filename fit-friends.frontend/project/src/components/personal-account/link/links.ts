import {PersonalAccountLinkInterFace} from './personal-account-link.interface';


import {AppRoute} from '../../../app-route';

export const link: {[k: string]: PersonalAccountLinkInterFace} = {
  friends: {
    href: AppRoute.Friends,
    icon: '#icon-friends',
    text: 'Мои друзья',
    id: 'friends'
  },
  shopping: {
    href: AppRoute.Purchases,
    icon: '#icon-shopping-cart',
    text: 'Мои покупки',
    id: 'shopping'
  },
  flash: {
    href: AppRoute.CoachTrainings,
    icon: '#icon-flash',
    text: 'Мои тренировки',
    id: 'flash'
  },
  add: {
    href: AppRoute.CreateTraining,
    icon: '#icon-add',
    text: 'Создать тренировку',
    id: 'add'
  },
  bag: {
    href: AppRoute.CoachOrders,
    icon: '#icon-bag',
    text: 'Мои заказы',
    id: 'bag'
  }
};

export const coachLinks = ['flash', 'add', 'friends', 'bag'];

export const userLinks = ['friends', 'shopping'];
