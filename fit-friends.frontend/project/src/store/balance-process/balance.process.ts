import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {BalanceState} from '../../types/balance-state';
import {addBalance, fetchBalance, subBalance} from '../api-actions/api-actions';

const initialState: BalanceState = {
  balance: 0,
};

export const balanceProcess = createSlice({
  name: NameSpace.Orders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(addBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(subBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      });
  }
});

