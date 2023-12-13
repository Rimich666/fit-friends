import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../mocks/states/default-state';
import React from 'react';
import MyFriendsMain from './my-friends.main';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <MyFriendsMain />
    </HistoryRouter>
  </Provider>
);

describe('Component: MyFriendsMain', () => {
  it('should render "MyFriendsMain"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByText(/Виктория/i)).toBeInTheDocument();
    expect(screen.getByText(/Кристина/i)).toBeInTheDocument();
    expect(screen.getByText(/Алексей/i)).toBeInTheDocument();
  });
});
