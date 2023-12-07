import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../../app-route';
import {render, screen, waitFor} from '@testing-library/react';
import {defaultState} from '../../../mocks/default-state';
import React from 'react';
import PersonalAccountUser from './personal-account-user';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Purchases} element={<h1>This is purchases page</h1>}/>
        <Route path={AppRoute.Friends} element={<h1>This is friends page</h1>}/>
        <Route
          path='*'
          element={<PersonalAccountUser caloriesCount={1200}/>}
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: PersonalAccountUser', () => {
  it('should render "PersonalAccountUser"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByTestId('friends')).toBeInTheDocument();
    expect(screen.getByTestId('shopping')).toBeInTheDocument();
  });
});
describe('Component: PersonalAccountUser redirect', () => {
  it('should redirect to root friends when user clicked to friends link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('friends'));
    await waitFor (() => {
      expect(screen.getByText(/This is friends page/i)).toBeInTheDocument();
    });
  });
  it('should redirect to root shopping when user clicked to shopping link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('shopping'));
    await waitFor (() => {
      expect(screen.getByText(/This is purchases page/i)).toBeInTheDocument();
    });
  });
});
