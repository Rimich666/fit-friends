import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {UserInterface} from '../../types/user.interface';

export const selectIsUserLoading = (state: RootState): boolean => state[NameSpace.User].isUserLoading;

export const selectIsUserLoaded = (state: RootState): boolean => state[NameSpace.User].isUserLoaded;

export const selectUser = (state: RootState): UserInterface => state[NameSpace.User].user;

export const selectIsCompanyLoading = (state: RootState): boolean => state[NameSpace.User].isCompanyLoading;

export const selectIsCompanyLoaded = (state: RootState): boolean => state[NameSpace.User].isCompanyLoaded;

export const selectCompany = (state: RootState): UserInterface[] => state[NameSpace.User].company;
