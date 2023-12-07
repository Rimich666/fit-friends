import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../../mocks/default-state';
import React from 'react';
import ReviewsSection from './reviews-section';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const onClickFeedback = jest.fn();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ReviewsSection onClickFeedback={onClickFeedback}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: ReviewsSection', () => {
  it('should render "ReviewsSection"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByText(/Дарья/i)).toBeInTheDocument();
    expect(screen.getByText(/Катерина/i)).toBeInTheDocument();
    expect(screen.getByText(/Регулярно выполняю эту тренировку дома/i)).toBeInTheDocument();
  });
});
