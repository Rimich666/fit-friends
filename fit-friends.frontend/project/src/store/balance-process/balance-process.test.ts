import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {ApiRoute} from '../../api-route';
import {fetchBalance, subBalance} from '../api-actions/balance-actions';
import {balanceProcess} from './balance.process';
import {BalanceState} from '../../types/states/balance-state';
import {createOrderAction} from '../api-actions/order.action';
import {createBalance, createOrder} from '../../mocks/orders/create-order';

describe('Reducer: user', () => {
  let state: BalanceState;
  const newBalance = 100;
  const id = 10;
  beforeEach(() => {
    state = {balance: 0};
  });

  describe('balance process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('test fetchBalance', () => {
      expect(balanceProcess.reducer(state, {type: fetchBalance.fulfilled.type, payload: newBalance}))
        .toEqual({balance: newBalance});
    });

    it('test createOrderAction', () => {
      expect(balanceProcess.reducer(state, {type: fetchBalance.fulfilled.type, payload: newBalance}))
        .toEqual({balance: newBalance});
    });

    it('test subBalance', () => {
      expect(balanceProcess.reducer(state, {type: fetchBalance.fulfilled.type, payload: newBalance}))
        .toEqual({balance: newBalance});
    });

    it('should dispatch Load_Balance when GET /balance/:id', async () => {
      mockAPI
        .onGet(`${ApiRoute.Balance}/${id}`)
        .reply(200, newBalance);

      const store = mockStore();

      await store.dispatch(fetchBalance(id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchBalance.pending.type,
        fetchBalance.fulfilled.type
      ]);
    });

    it('should dispatch Load_Balance when POST /order/create', async () => {
      mockAPI
        .onPost(ApiRoute.Order)
        .reply(201, newBalance);

      const store = mockStore();

      await store.dispatch(createOrderAction(createOrder));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        createOrderAction.pending.type,
        createOrderAction.fulfilled.type
      ]);
    });

    it('should dispatch Load_Balance when PATCH /balance', async () => {
      mockAPI
        .onPatch(`${ApiRoute.Balance}`)
        .reply(200, newBalance);

      const store = mockStore();

      await store.dispatch(subBalance(createBalance));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        subBalance.pending.type,
        subBalance.fulfilled.type
      ]);
    });
  });
});
