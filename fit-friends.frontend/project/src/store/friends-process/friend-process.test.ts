import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {makeFakeUsersRdo} from '../../mocks/users/make-fake-users-rdo';
import {fetchFriends} from '../api-actions/friends-actions';
import {ApiRoute} from '../../api-route';
import {changeStateQuestion} from '../api-actions/join-actions';
import {friendProcess} from './friends.process';
import {FriendState} from '../../types/states/friend-state';
import {makeInitialFriendsState} from '../../mocks/states/make-initial-friends-state';
import {fillFriends} from '../../helpers/fill-friends';
import {fakeRequest} from '../../mocks/fake-request';

describe('Reducer: friends', () => {
  let state: FriendState;

  beforeEach(() => {
    state = makeInitialFriendsState();
  });

  describe('friends process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('should update friends by load', () => {
      const payload = makeFakeUsersRdo();
      expect(friendProcess.reducer(state, {type: fetchFriends.fulfilled.type, payload}))
        .toEqual({...state, isFriendsLoading: false, isFriendsLoaded: true, friends: payload.map((item) => fillFriends(item))});
    });
    it('should set isFriendsLoading to false', () => {
      expect(friendProcess.reducer(state, {type: fetchFriends.rejected.type}))
        .toEqual({...state, isFriendsLoading: false});
    });

    it('should update friend isRequest', () => {
      const friends = makeFakeUsersRdo().map((item) => fillFriends(item));
      state.friends = [...friends];
      const friend = friends.find((item) =>
        item.idRequest === fakeRequest.id);
      if (friend) {
        friend.isRequest = false;
      }
      expect(friendProcess.reducer(state, {type: changeStateQuestion.fulfilled.type, payload: fakeRequest}))
        .toEqual({...state, friends});
    });

    it('should dispatch Load_Friends when GET /friends', async () => {
      mockAPI
        .onGet(`${ApiRoute.Friend}`)
        .reply(200, makeFakeUsersRdo());

      const store = mockStore();

      await store.dispatch(fetchFriends());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFriends.pending.type,
        fetchFriends.fulfilled.type
      ]);
    });

    it('changeStateQuestion test', async () => {
      mockAPI
        .onPatch(`${ApiRoute.Join}`)
        .reply(200, fakeRequest);

      const store = mockStore();

      await store.dispatch(changeStateQuestion(fakeRequest));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        changeStateQuestion.pending.type,
        changeStateQuestion.fulfilled.type
      ]);
    });
  });
});
