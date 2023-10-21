import {RequestState} from '@project/shared-types';

export const createRequestNotification = (name: string) =>
  `Пользователь ${name} приглашает Вас на совместную тренировку.`;

export const changeStatusNotification = (name: string, state: RequestState) =>
  `Пользователь ${name} ${state === RequestState.accepted ? 'принял' : 'отклонил'} Ваше приглашение на совместную тренировку.`;

export const addedToFriendsNotification = (name: string) =>
  `Пользователь ${name} добавил Вас в список друзей.`;

export const removedFromFriendsNotification = (name: string) =>
  `Пользователь ${name} удалил Вас из списка друзей.`;
