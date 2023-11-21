import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {BuyProps, FeedbackProps, PopupState} from '../../types/popup-state';

const initialState: PopupState = {
  buy: {
    src: '',
    name: '',
    price: 0,
    trainingId: 0,
  },
  feedback: {
    trainingId: 0,
  }
};

export const popupProcess = createSlice({
  name: NameSpace.Popup,
  initialState,
  reducers: {
    setBuy: (state, action: PayloadAction<BuyProps>) => {
      state.buy = action.payload;
    },
    setFeedback: (state, action: PayloadAction<FeedbackProps>) => {
      state.feedback = action.payload;
    }
  },
});

export const {setBuy, setFeedback} = popupProcess.actions;
