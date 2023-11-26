import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {OrdersState} from '../../types/states/orders-state';
import {MyOrderInterface} from '../../types/card-interface';
import {fetchOrders} from '../api-actions/order.action';
import {fillOrder} from '../../helpers/fill-order';

const initialState: OrdersState = {
  isOrdersLoading: false,
  isOrderLoaded: false,
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
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.isOrdersLoading = true;
        state.isOrderLoaded = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.isOrderLoaded = true;
        state.orders = action.payload.data.map((order) => fillOrder(order));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
      });
  }
});

export const {loadOrders} = ordersProcess.actions;
