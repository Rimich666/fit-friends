import {GenderText, LevelText, UserLocationText} from '../../../enums';

export const selectors = {
  location: {
    title: 'Локация',
    options: UserLocationText,
  },
  gender: {
    title: 'Пол',
    options: GenderText,
  },
  level: {
    title: 'Уровень',
    options: LevelText,
  },
};
