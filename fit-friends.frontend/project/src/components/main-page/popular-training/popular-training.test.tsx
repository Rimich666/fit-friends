import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../../mocks/default-state';
import React from 'react';
import PopularTrainingSection from './popular-training.section';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <PopularTrainingSection />
    </HistoryRouter>
  </Provider>
);

describe('Component: PopularTrainingSection', () => {
  it('should render "PopularTrainingSection"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByText('antistress')).toBeInTheDocument();
    expect(screen.getByText(/power/i)).toBeInTheDocument();
    expect(screen.getByText(/boxing/i)).toBeInTheDocument();
  });
});
