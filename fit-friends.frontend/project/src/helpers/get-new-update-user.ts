import {UpdateUserInterface} from '../types/update-user.interface';
import {UpdateUserErrorsInterface} from '../types/update-user-errors.interface';
import {UserInterface} from '../types/user.interface';
import {Gender, Level, UserLocation} from "../enums";

export const getNewUpdateUser = (): UpdateUserInterface => <UpdateUserInterface>(
  {
    name: '',
    description: ''
  }
);

export const getEmptyUpdateUserErrors = (): UpdateUserErrorsInterface => (
  {
    name: '',
    description: '',
    trainingType: '',
    level: '',
    gender: '',
    location: ''
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
  avatarPath: ''
})


export const fillUpdateUser = (user: UserInterface): UpdateUserInterface => ({
  name: user.name,
  description: user.description,
  trainingType: [...user.trainingType],
  level: user.level,
  gender: user.gender,
  location: user.location,
  isReady: user.isReady,
  avatarPath: user.avatarPath
});
