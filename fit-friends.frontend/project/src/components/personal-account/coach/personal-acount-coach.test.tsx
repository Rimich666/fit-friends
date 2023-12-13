import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import HistoryRouter from '../../history-route/history-route';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../../app-route';
import PersonalAccountCoach from './personal-account-coach';
import {defaultState} from '../../../mocks/states/default-state';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.CoachTrainings} element={<h1>This is coachTrainings page</h1>}/>
        <Route path={AppRoute.Friends} element={<h1>This is friends page</h1>}/>
        <Route path={AppRoute.CreateTraining} element={<h1>This is createTraining page</h1>}/>
        <Route path={AppRoute.CoachOrders} element={<h1>This is orders page</h1>}/>
        <Route
          path='*'
          element={<PersonalAccountCoach/>}
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: PersonalAccountCoach', () => {
  it('should render "PersonalAccountCoach"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByTestId('flash')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('friends')).toBeInTheDocument();
    expect(screen.getByTestId('bag')).toBeInTheDocument();
  });
});
describe('Component: PersonalAccountCoach redirect', () => {
  it('should redirect to root friends when user clicked to friends link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('friends'));
    await waitFor (() => {
      expect(screen.getByText(/This is friends page/i)).toBeInTheDocument();
    });
  });
  it('should redirect to root createTraining user clicked to add link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('add'));
    await waitFor (() => {
      expect(screen.getByText(/This is createTraining page/i)).toBeInTheDocument();
    });
  });
  it('should redirect to root coachTrainings when user clicked to trainings link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('flash'));
    await waitFor (() => {
      expect(screen.getByText(/This is coachTrainings page/i)).toBeInTheDocument();
    });
  });
  it('should redirect to root orders when user clicked to orders link', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.click(screen.getByTestId('bag'));
    await waitFor (() => {
      expect(screen.getByText(/This is orders page/i)).toBeInTheDocument();
    });
  });
});
