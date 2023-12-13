import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {ApiRoute} from '../../api-route';
import {OrdersState} from '../../types/states/orders-state';
import {makeInitialOrdersState} from '../../mocks/states/make-initial-orders-state';
import {ordersProcess} from './order.process';
import {fetchOrders} from '../api-actions/order.action';
import {makeOrdersRdo} from '../../mocks/orders/make-orders-rdo';
import {LIMIT} from '../../settings';
import {fillOrder} from '../../helpers/fill-order';

describe('Reducer: orders', () => {
  let state: OrdersState;

  beforeEach(() => {
    state = makeInitialOrdersState();
  });

  describe('orders process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const orders = makeOrdersRdo();
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('should update orders by load', () => {
      expect(ordersProcess.reducer(state, {type: fetchOrders.fulfilled.type, payload: orders}))
        .toEqual({...state, isOrdersLoading: false, isOrderLoaded: true,
          orders: orders.data.map((order) => fillOrder(order))});
    });
    it('should set isOrdersLoading to false', () => {
      expect(ordersProcess.reducer(state, {type: fetchOrders.rejected.type}))
        .toEqual({...state, isOrdersLoading: false});
    });

    it('should dispatch Load_Orders when GET /order', async () => {
      const options = `limit=${LIMIT}`;
      mockAPI
        .onGet(`${ApiRoute.Order}?${options}`)
        .reply(200, orders, '10');

      const store = mockStore();

      await store.dispatch(fetchOrders(options));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchOrders.pending.type,
        fetchOrders.fulfilled.type
      ]);
    });
  });
});
