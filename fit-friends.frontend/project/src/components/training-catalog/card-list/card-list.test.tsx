import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../../mocks/states/default-state';
import React from 'react';
import CardList from './card.list';
import {ComponentVariant} from '../../../component-variant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore, variant: ComponentVariant) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CardList variant={variant}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: CardList', () => {
  it('should render "CardList"', () => {
    render(fakeApp(mockStore(defaultState), ComponentVariant.myTraining));
    expect(screen.getByText(/energy/i)).toBeInTheDocument();
    expect(screen.getByText(/antistress/i)).toBeInTheDocument();
    expect(screen.getByText(/run, forrest, run/i)).toBeInTheDocument();
  });
  it('should render "UserCardList"', () => {
    render(fakeApp(mockStore(defaultState), ComponentVariant.userCatalog));
    expect(screen.getByText(/Елизавета/i)).toBeInTheDocument();
    expect(screen.getByText(/Дарья/i)).toBeInTheDocument();
    expect(screen.getByText(/Наталья/i)).toBeInTheDocument();
  });
});
