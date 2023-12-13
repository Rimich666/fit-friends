import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../../mocks/states/default-state';
import React from 'react';
import SpecialForYouSection from './special-for-you.section';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <SpecialForYouSection />
    </HistoryRouter>
  </Provider>
);

describe('Component: SpecialForYouSection', () => {
  it('should render "SpecialForYouSection"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByText(/crossfit/i)).toBeInTheDocument();
    expect(screen.getByText(/pilates/i)).toBeInTheDocument();
    expect(screen.getByText(/box/i)).toBeInTheDocument();
  });
});
