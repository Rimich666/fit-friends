import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import Header from './header';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {defaultState} from '../../mocks/default-state';
import thunk from 'redux-thunk';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../app-route';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Main} element={<h1>This is main page</h1>}/>
        <Route path={AppRoute.Office} element={<h1>This is office page</h1>}/>
        <Route path={AppRoute.Friends} element={<h1>This is friends page</h1>}/>
        <Route
          path='*'
          element={<Header />}
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: Header', () => {
  it('should render "Header"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByTestId('nav-item-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-user')).toBeInTheDocument();
    expect(screen.getByTestId('nav-item-friends')).toBeInTheDocument();
  });
});

describe('Component: Header redirect', () => {
  it('should redirect to root main when user clicked to home link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('nav-item-home'));
    await waitFor (() => {
      expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    });
  });
  it('should redirect to root office when user clicked to user link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('nav-item-user'));
    await waitFor (() => {
      expect(screen.getByText(/This is office page/i)).toBeInTheDocument();
    });
  });
  it('should redirect to root friends when user clicked to friends link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('nav-item-friends'));
    await waitFor (() => {
      expect(screen.getByText(/This is friends page/i)).toBeInTheDocument();
    });
  });
});
