import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../mocks/default-state';
import React from 'react';
import MyOrders from '../../pages/my-orders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <MyOrders />
    </HistoryRouter>
  </Provider>
);

describe('Component: MyOrders', () => {
  it('should render "MyOrders"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByText(/Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию./i)).toBeInTheDocument();
    expect(screen.getByText(/Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений./i)).toBeInTheDocument();
    expect(screen.getByText(/В основе программы лежит работа с телом и с психо-эмоциональным состоянием./i)).toBeInTheDocument();
  });
});
