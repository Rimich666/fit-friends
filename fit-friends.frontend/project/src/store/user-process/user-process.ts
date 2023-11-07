import {UserState} from '../../types/user-state';
import {UserInterface} from '../../types/user.interface';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {fetchCompany, fetchUser} from '../api-actions/api-actions';
import {fillUser} from '../../helpers/fill-user';

const initialState: UserState = {
  company: [],
  isCompanyLoaded: false,
  isCompanyLoading: false,
  isUserLoaded: false,
  user: undefined as unknown as UserInterface,
  isUserLoading: false
};

export const userProcess = createSlice({
  name: NameSpace.Register,
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
    ;

  }
});

export const {setIsUserLoading} = userProcess.actions;
