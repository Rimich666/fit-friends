import {UserState} from '../../types/states/user-state';
import {UserInterface} from '../../types/user.interface';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {fillUser} from '../../helpers/fill-user';
import {fetchCompany, fetchUser, fetchUsers} from '../api-actions/users-actions';
import {fillUserCard} from '../../helpers/fill-user-card';
import {createFriend, deleteFriend} from '../api-actions/friends-actions';
import {checkSubscribe, createSubscribe, deleteSubscribe} from '../api-actions/subscribe-actions';

const initialState: UserState = {
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
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
        state.isUserLoaded = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isUserLoaded = true;
        state.user = fillUser(action.payload);
        state.isFriend = action.payload.isFriend as boolean;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(fetchCompany.pending, (state) => {
        state.isCompanyLoading = true;
        state.isCompanyLoaded = false;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.isCompanyLoading = false;
        state.isCompanyLoaded = true;
        state.company = action.payload.map((item) => fillUser(item));
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.isCompanyLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isCatalogLoading = true;
        state.isCatalogLoaded = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isCatalogLoading = false;
        state.isCatalogLoaded = true;
        state.catalog = action.payload.map((item) => fillUserCard(item));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isCatalogLoading = false;
      })
      .addCase(createFriend.fulfilled, (state, action) => {
        state.isFriend = action.payload;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        state.isFriend = action.payload;
      })
      .addCase(createSubscribe.fulfilled, (state, action) => {
        state.isSubscribe = true;
      })
      .addCase(deleteSubscribe.fulfilled, (state, action) => {
        state.isSubscribe = false;
      })
      .addCase(checkSubscribe.fulfilled, (state, action) => {
        state.isSubscribe = action.payload;
      });
  }
});

export const {setIsUserLoading} = userProcess.actions;
