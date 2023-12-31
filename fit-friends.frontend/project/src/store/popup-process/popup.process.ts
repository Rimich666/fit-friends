import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {BuyProps, FeedbackProps, PopupState} from '../../types/states/popup-state';
import {fetchCatalogTrainings, fetchCoachTrainings, fetchPurchases} from '../api-actions/api-actions';
import {fetchOrders} from '../api-actions/order.action';

const initialState: PopupState = {
  buy: {
    src: '',
    name: '',
    price: 0,
    trainingId: 0,
  },
  feedback: {
    trainingId: 0,
  },
  pages: 0
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
  extraReducers(builder) {
    builder
      .addCase(fetchCoachTrainings.fulfilled, (state, action) => {
        state.pages = action.payload.pages;
      })
      .addCase(fetchCatalogTrainings.fulfilled, (state, action) => {
        state.pages = action.payload.pages;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.pages = action.payload.pages;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.pages = action.payload.pages;
      });
  }
});

export const {setBuy, setFeedback} = popupProcess.actions;
