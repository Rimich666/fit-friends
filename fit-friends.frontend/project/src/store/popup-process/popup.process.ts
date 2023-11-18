import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {BuyProps, PopupState} from '../../types/popup-state';

const initialState: PopupState = {
  buy: {
    src: '',
    name: '',
    price: 0,
    trainingId: 0,
  },
};

export const popupProcess = createSlice({
  name: NameSpace.Orders,
  initialState,
  reducers: {
    setBuy: (state, action: PayloadAction<BuyProps>) => {
      state.buy = action.payload;
    }
  },
});

export const {setBuy} = popupProcess.actions;
