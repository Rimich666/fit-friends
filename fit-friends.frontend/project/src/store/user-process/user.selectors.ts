import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {UserInterface} from '../../types/user.interface';
import {FriendInterface} from '../../types/friend.interface';
import {UserCardInterface} from '../../types/user-card.interface';
import {fillUserCardCard} from '../../helpers/fill-user-card';
import {createSelector} from '@reduxjs/toolkit';

// export const selectIsUserLoading = (state: RootState): boolean => state[NameSpace.User].isUserLoading;
//
// export const selectIsUserLoaded = (state: RootState): boolean => state[NameSpace.User].isUserLoaded;

export const selectUser = (state: RootState): UserInterface => state[NameSpace.User].user;

export const selectUserIsLoading = (state: RootState): boolean => state[NameSpace.User].isUserLoading;

export const selectUserIsLoaded = (state: RootState): boolean => state[NameSpace.User].isUserLoaded;

export const selectUserId = (state: RootState): string => state[NameSpace.User].user.id;

export const selectIsCompanyLoading = (state: RootState): boolean => state[NameSpace.User].isCompanyLoading;

export const selectIsCompanyLoaded = (state: RootState): boolean => state[NameSpace.User].isCompanyLoaded;

export const selectCompany = (state: RootState): UserInterface[] => state[NameSpace.User].company;

export const selectFriends = (state: RootState): FriendInterface[] => state[NameSpace.User].friends;

export const selectUserCatalog = (state: RootState): UserCardInterface[] => state[NameSpace.User].catalog;

export const selectIsFriend = (state: RootState): boolean => state[NameSpace.User].isFriend;

export const selectUserCard = createSelector([selectUser, selectUserIsLoading, selectUserIsLoaded],
  (user, isLoading, isLoaded) =>
    isLoaded ? {isLoading, isLoaded, user: fillUserCardCard(user)} : {isLoading, isLoaded, user});

export const selectIsSubscribe = (state: RootState): boolean => state[NameSpace.User].isSubscribe;
