import {makeOrdersRdo} from '../../mocks/orders/make-orders-rdo';
import {fetchOrders} from '../api-actions/order.action';
import {popupProcess, setBuy, setFeedback} from './popup.process';
import {PopupState} from '../../types/states/popup-state';
import {fakeBuyProps} from '../../mocks/fake-buy-props';
import {makeInitialPopupState} from '../../mocks/states/make-initial-popup-state';
import {fetchCatalogTrainings, fetchCoachTrainings, fetchPurchases} from '../api-actions/api-actions';

describe('Reducer: popup', () => {
  let state: PopupState;

  beforeEach(() => {
    state = makeInitialPopupState();
  });

  describe('popup process test', () => {
    const orders = makeOrdersRdo();

    it('setBuy test', () => {
      expect(popupProcess.reducer(state, setBuy(fakeBuyProps)))
        .toEqual({...makeInitialPopupState(), buy: fakeBuyProps});
    });

    it('setFeedback test', () => {
      expect(popupProcess.reducer(state, setFeedback({trainingId: 25})))
        .toEqual({...makeInitialPopupState(), feedback: {trainingId: 25}});
    });


    it('fetchCoachTrainings test', () => {
      expect(popupProcess.reducer(state, {type: fetchCoachTrainings.fulfilled.type, payload: {pages: 5}}))
        .toEqual({...state, pages: 5});
    });

    it('fetchCatalogTrainings test', () => {
      expect(popupProcess.reducer(state, {type: fetchCatalogTrainings.fulfilled.type, payload: {pages: 5}}))
        .toEqual({...state, pages: 5});
    });

    it('fetchPurchases test', () => {
      expect(popupProcess.reducer(state, {type: fetchPurchases.fulfilled.type, payload: {pages: 5}}))
        .toEqual({...state, pages: 5});
    });

    it('fetchOrders test', () => {
      expect(popupProcess.reducer(state, {type: fetchOrders.fulfilled.type, payload: orders}))
        .toEqual({...state, pages: orders.pages});
    });
  });
});
