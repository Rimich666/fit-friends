import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {BalanceState} from '../../types/states/balance-state';
import {fetchBalance, subBalance} from '../api-actions/balance-actions';
import {createOrderAction} from '../api-actions/order.action';

const initialState: BalanceState = {
  balance: 0,
};

export const balanceProcess = createSlice({
  name: NameSpace.Balance,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(createOrderAction.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(subBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      });
  }
});

