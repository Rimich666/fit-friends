import {RegisterUserInterface} from '../types/register-user.interface';
import {Gender, Role, UserLocation} from '../enums';
import {RegisterErrorsInterface} from '../types/register-errors.interface';

export const getNewRegisterUser = (): RegisterUserInterface => (
  {
    password: '',
    email: '',
    name: '',
    gender: Gender.all,
    birthDate: new Date(),
    location: undefined as unknown as UserLocation,
    avatar: undefined as unknown as File,
    role: Role.sportsman
  }
);

export const getEmptyRegisterErrors = (): RegisterErrorsInterface => (
  {
    password: '',
    email: '',
    name: '',
    gender: '',
    birthDate: '',
    location: '',
    avatar: '',
    role: ''
  }
);


export const fillRegisterErrors = (errors: {[k: string]: string}): RegisterErrorsInterface => ({
  password: errors.password ? errors.password : '',
  email: errors.email ? errors.email : '',
  name: errors.name ? errors.name : '',
  gender: errors.gender ? errors.gender : '',
  birthDate: errors.birthDate ? errors.birthDate : '',
  location: errors.location ? errors.location : '',
  avatar: errors.avatar ? errors.avatar : '',
  role: errors.role ? errors.role : '',
});
