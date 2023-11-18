import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {OrdersState} from '../../types/orders-state';
import {MyOrderInterface} from '../../types/card-interface';

const initialState: OrdersState = {
  orders: [],
};

export const ordersProcess = createSlice({
  name: NameSpace.Orders,
  initialState,
  reducers: {
    loadOrders: (state, action: PayloadAction<MyOrderInterface[]>) => {
      state.orders = action.payload;
    }
  },
});

export const {loadOrders} = ordersProcess.actions;
