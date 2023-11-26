import {LoginType} from '../types/auth/login.types';

export const getNewLogin = (): LoginType => (
  {
    email: '',
    password: ''
  }
);
