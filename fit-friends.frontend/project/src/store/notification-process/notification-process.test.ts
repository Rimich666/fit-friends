import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {ApiRoute} from '../../api-route';
import {NotificationState} from '../../types/states/notification-state';
import {makeInitialNotificationState} from '../../mocks/states/make-initial-notification-state';
import {notificationProcess} from './notification.process';
import {fetchNotifications} from '../api-actions/notification-action';
import { notifications } from '../../mocks/notifications';

describe('Reducer: notification', () => {
  let state: NotificationState;

  beforeEach(() => {
    state = makeInitialNotificationState();
  });

  describe('notification process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('should update notification by load', () => {
      expect(notificationProcess.reducer(state, {type: fetchNotifications.fulfilled.type, payload: notifications}))
        .toEqual({...state, isNotificationsLoading: false, isNotificationsLoaded: true, notifications});
    });
    it('should set isNotificationsLoading to false', () => {
      expect(notificationProcess.reducer(state, {type: fetchNotifications.rejected.type}))
        .toEqual({...state, isNotificationsLoading: false});
    });

    it('should dispatch Load_Notifications when GET /notification', async () => {
      mockAPI
        .onGet(`${ApiRoute.Notification}`)
        .reply(200, notifications);

      const store = mockStore();

      await store.dispatch(fetchNotifications());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchNotifications.pending.type,
        fetchNotifications.fulfilled.type
      ]);
    });
  });
});
