import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {AppRoute} from '../../app-route';
import {BackState} from '../../types/back-state';

const initialState: BackState = {
  back: undefined as unknown as AppRoute
};

export const backProcess = createSlice({
  name: NameSpace.Back,
  initialState,
  reducers: {
    setBack: (state, action: PayloadAction<AppRoute>) => {
      state.back = action.payload;
    },
  },
});

export const {setBack} = backProcess.actions;
