import {UserInterface} from './user.interface';
import {FriendInterface} from './friend.interface';

export type UserState = {
  isUserLoaded: boolean;
  isUserLoading: boolean;
  user: UserInterface;
  isCompanyLoading: boolean;
  isCompanyLoaded: boolean;
  company: UserInterface[];
  friends: FriendInterface[];
};
