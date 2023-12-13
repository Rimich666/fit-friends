import {UserInterface} from '../../types/user.interface';
import {UserState} from '../../types/states/user-state';

export const makeInitialUserState = (): UserState => ({
  company: [],
  isCompanyLoaded: false,
  isCompanyLoading: false,
  isUserLoaded: false,
  user: undefined as unknown as UserInterface,
  isFriend: false,
  isSubscribe: false,
  isUserLoading: false,
  friends: [],
  catalog: [],
  isCatalogLoaded: false,
  isCatalogLoading: false,
});
