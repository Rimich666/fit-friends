import {UserInterface} from './user.interface';

export type UserState = {
  isUserLoaded: boolean;
  isUserLoading: boolean;
  user: UserInterface;
  isCompanyLoading: boolean;
  isCompanyLoaded: boolean;
  company: UserInterface[];
};
