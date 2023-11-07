import {Gender, Level, UserLocation} from '../../../enums';

export const selectors = {
  location: {
    title: 'Локация',
    options: UserLocation,
  },
  gender: {
    title: 'Пол',
    options: Gender,
  },
  level: {
    title: 'Уровень',
    options: Level,
  }
};
