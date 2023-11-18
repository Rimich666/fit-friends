import {UpdateUserInterface} from '../types/update-user.interface';
import {UpdateUserErrorsInterface} from '../types/update-user-errors.interface';
import {UserInterface} from '../types/user.interface';
import {Gender, Level, UserLocation} from '../enums';

export const getEmptyUpdateUserErrors = (): UpdateUserErrorsInterface => (
  {
    name: '',
    description: '',
    trainingType: '',
    level: '',
    gender: '',
    location: '',
    avatar: ''
  }
);

export const getEmptyUpdateUser = (): UpdateUserInterface => ({
  name: '',
  description: '',
  trainingType: [],
  level: undefined as unknown as Level,
  gender: undefined as unknown as Gender,
  location: undefined as unknown as UserLocation,
  isReady: false,
  avatarPath: '',
  avatar: undefined as unknown as File,
});


export const fillUpdateUser = (user: UserInterface): UpdateUserInterface => ({
  name: user.name,
  description: user.description,
  trainingType: [...user.trainingType],
  level: user.level,
  gender: user.gender,
  location: user.location,
  isReady: user.isReady,
  avatarPath: user.avatarPath,
  avatar: undefined as unknown as File,
});

export const fillUpdateUserErrors = (errors: {[k: string]: string}): UpdateUserErrorsInterface => ({
  name: errors.name ? errors.name : '',
  description: errors.description ? errors.description : '',
  gender: errors.gender ? errors.gender : '',
  location: errors.location ? errors.location : '',
  avatar: errors.avatar ? errors.avatar : '',
  trainingType: errors.trainingType ? errors.trainingType : '',
  level: errors.level ? errors.level : '',
});
