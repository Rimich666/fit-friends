import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {makeOrdersRdo} from '../../mocks/orders/make-orders-rdo';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchOrders} from '../api-actions/order.action';
import {popupProcess, setBuy, setFeedback} from './popup.process';
import {PopupState} from '../../types/states/popup-state';
import {fakeBuyProps} from '../../mocks/fake-buy-props';
import {makeInitialPopupState} from '../../mocks/states/make-initial-popup-state';

describe('Reducer: popup', () => {
  let state: PopupState;

  beforeEach(() => {
    state = makeInitialPopupState();
  });

  describe('popup process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const orders = makeOrdersRdo();
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('setBuy test', () => {
      expect(popupProcess.reducer(state, setBuy(fakeBuyProps)))
        .toEqual({...makeInitialPopupState(), buy: fakeBuyProps});
    });

    it('setFeedback test', () => {
      expect(popupProcess.reducer(state, setFeedback({trainingId: 25})))
        .toEqual({...makeInitialPopupState(), feedback: {trainingId: 25}});
    });


    // it('fetchCoachTrainings test', () => {
    //   expect(popupProcess.reducer(state, {type: fetchCoachTrainings.fulfilled.type, payload: orders}))
    //     .toEqual({...state, isOrdersLoading: false, isOrderLoaded: true,
    //       orders: orders.data.map((order) => fillOrder(order))});
    // });
    //
    // it('fetchCatalogTrainings test', () => {
    //   expect(popupProcess.reducer(state, {type: fetchCatalogTrainings.fulfilled.type, payload: orders}))
    //     .toEqual({...state, isOrdersLoading: false, isOrderLoaded: true,
    //       orders: orders.data.map((order) => fillOrder(order))});
    // });
    //
    // it('fetchPurchases test', () => {
    //   expect(popupProcess.reducer(state, {type: fetchPurchases.fulfilled.type, payload: orders}))
    //     .toEqual({...state, isOrdersLoading: false, isOrderLoaded: true,
    //       orders: orders.data.map((order) => fillOrder(order))});
    // });

    it('fetchOrders test', () => {
      expect(popupProcess.reducer(state, {type: fetchOrders.fulfilled.type, payload: orders}))
        .toEqual({...state, pages: orders.pages});
    });
  });
});
