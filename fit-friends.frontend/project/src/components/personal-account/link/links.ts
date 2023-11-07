import {PersonalAccountLinkInterFace} from './personal-account-link.interface';

export const link: {[k: string]: PersonalAccountLinkInterFace} = {
  friends: {
    href: '#',
    icon: '#icon-friends',
    text: 'Мои друзья'
  },
  shopping: {
    href: '#',
    icon: '#icon-shopping-cart',
    text: 'Мои покупки'
  },
  flash: {
    href: '#',
    icon: '#icon-flash',
    text: 'Мои тренировки'
  },
  add: {
    href: '#',
    icon: '#icon-add',
    text: 'Создать тренировку'
  },
  bag: {
    href: '#',
    icon: '#icon-bag',
    text: 'Мои заказы'
  }
};

export const coachLinks = ['flash', 'add', 'friends', 'bag'];

export const userLinks = ['friends', 'shopping'];
