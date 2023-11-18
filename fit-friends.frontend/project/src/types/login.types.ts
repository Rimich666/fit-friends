import {UserRdo} from './user.rdo';

export type LoginType = {
  email: string;
  password: string;
}

export type TokenType = {
  accessToken: string;
  refreshToken: string;
  user: UserRdo;
}
