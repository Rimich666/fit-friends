import {UserState} from '../../types/states/user-state';
import {setIsUserLoading, userProcess} from './user-process';
import {fetchCompany, fetchUser, fetchUsers} from '../api-actions/users-actions';
import {makeInitialUserState} from '../../mocks/states/make-initial-user-state';
import {ApiRoute, EndPoints} from '../../api-route';
import {fakeUserRdo} from '../../mocks/users/fake-user-rdo';
import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {fillUser} from '../../helpers/fill-user';
import {makeFakeUsersRdo} from '../../mocks/users/make-fake-users-rdo';
import {fillUserCard} from '../../helpers/fill-user-card';
import {createFriend, deleteFriend} from '../api-actions/friends-actions';
import {checkSubscribe, createSubscribe, deleteSubscribe} from '../api-actions/subscribe-actions';
import {RootState} from '../index';
import {LIMIT} from '../../settings';

describe('Reducer: user', () => {
  let state: UserState;

  beforeEach(() => {
    state = makeInitialUserState();
  });

  describe('user process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    it('setIsUserLoading test', () => {
      expect(userProcess.reducer(state, setIsUserLoading(true)))
        .toEqual({...makeInitialUserState(), isUserLoading: true});
    });
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('should update user by load', () => {
      expect(userProcess.reducer(state, {type: fetchUser.fulfilled.type, payload: fakeUserRdo}))
        .toEqual({...state, isUserLoading: false, isUserLoaded: true, user: fillUser(fakeUserRdo), isFriend: fakeUserRdo.isFriend});
    });
    it('should set isUserLoading to false', () => {
      expect(userProcess.reducer(state, {type: fetchUser.rejected.type}))
        .toEqual({...state, isUserLoading: false});
    });

    it('should update company by load', () => {
      const payload = makeFakeUsersRdo();
      expect(userProcess.reducer(state, {type: fetchCompany.fulfilled.type, payload}))
        .toEqual({...state, isCompanyLoading: false, isCompanyLoaded: true, company: payload.map((item) => fillUser(item))});
    });
    it('should set isCompanyLoading to false', () => {
      expect(userProcess.reducer(state, {type: fetchCompany.rejected.type}))
        .toEqual({...state, isCompanyLoading: false});
    });

    it('should update catalog by load', () => {
      const payload = makeFakeUsersRdo();
      expect(userProcess.reducer(state, {type: fetchUsers.fulfilled.type, payload}))
        .toEqual({...state, isCatalogLoading: false, isCatalogLoaded: true, catalog: payload.map((item) => fillUserCard(item))});
    });
    it('should set isCatalogLoading to false', () => {
      expect(userProcess.reducer(state, {type: fetchUsers.rejected.type}))
        .toEqual({...state, isCatalogLoading: false});
    });

    it('should set isFriend', () => {
      const payload = true;
      expect(userProcess.reducer(state, {type: createFriend.fulfilled.type, payload: true}))
        .toEqual({...state, isFriend: payload});
    });

    it('should reset isFriend', () => {
      const payload = false;
      expect(userProcess.reducer(state, {type: deleteFriend.fulfilled.type, payload: false}))
        .toEqual({...state, isFriend: payload});
    });

    it('should set isSubscribe', () => {
      expect(userProcess.reducer(state, {type: createSubscribe.fulfilled.type, payload: true}))
        .toEqual({...state, isSubscribe: true});
    });

    it('should reset isSubscribe', () => {
      expect(userProcess.reducer(state, {type: deleteSubscribe.fulfilled.type, payload: false}))
        .toEqual({...state, isSubscribe: false});
    });

    it('should set isFriend by check', () => {
      const payload = true;
      expect(userProcess.reducer(state, {type: checkSubscribe.fulfilled.type, payload}))
        .toEqual({...state, isSubscribe: payload});
    });

    it('should dispatch Load_User when GET /user', async () => {
      mockAPI
        .onGet(`${ApiRoute.User}/id`)
        .reply(200, fakeUserRdo);

      const store = mockStore();

      await store.dispatch(fetchUser('id'));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchUser.pending.type,
        fetchUser.fulfilled.type
      ]);
    });

    it('should dispatch Load_Company when GET /users/company', async () => {
      mockAPI
        .onGet(`${ApiRoute.User}/${EndPoints.company}/${LIMIT}`)
        .reply(200, makeFakeUsersRdo());

      const store = mockStore();

      await store.dispatch(fetchCompany(LIMIT));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCompany.pending.type,
        fetchCompany.fulfilled.type
      ]);
    });

    it('should dispatch Load_Users Catalog when GET /users', async () => {
      const options = 'limit=6';
      mockAPI
        .onGet(`${ApiRoute.User}?${options}`)
        .reply(200, makeFakeUsersRdo());

      const store = mockStore();

      await store.dispatch(fetchUsers(options));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchUsers.pending.type,
        fetchUsers.fulfilled.type
      ]);
    });
  });
});
