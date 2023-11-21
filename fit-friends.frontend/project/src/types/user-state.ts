import {UserInterface} from './user.interface';
import {FriendInterface} from './friend.interface';
import {UserCardInterface} from './user-card.interface';

export type UserState = {
  isUserLoaded: boolean;
  isUserLoading: boolean;
  user: UserInterface;
  isCompanyLoading: boolean;
  isCompanyLoaded: boolean;
  company: UserInterface[];
  friends: FriendInterface[];
  catalog: UserCardInterface[];
  isCatalogLoaded: boolean;
  isCatalogLoading: boolean;
  isFriend: boolean;
  isSubscribe: boolean;
};
