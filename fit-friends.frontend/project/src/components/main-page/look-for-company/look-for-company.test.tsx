import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../../mocks/states/default-state';
import React from 'react';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import LookForCompanySection from './look-for-company.section';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <LookForCompanySection />
    </HistoryRouter>
  </Provider>
);

describe('Component: LookForCompanySection', () => {
  it('should render "LookForCompanySection"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByText('Елизавета')).toBeInTheDocument();
    expect(screen.getByText('Дарья')).toBeInTheDocument();
    expect(screen.getByText('Наталья')).toBeInTheDocument();
  });
});
