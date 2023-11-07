import {LoginType} from '../types/login.types';

export const getNewLogin = (): LoginType => (
  {
    email: '',
    password: ''
  }
);
