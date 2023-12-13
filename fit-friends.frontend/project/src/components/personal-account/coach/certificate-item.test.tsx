import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {defaultState} from '../../../mocks/states/default-state';
import React from 'react';
import CertificateItem from './certificate.item';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeApp = (store: MockStore, onDelete: jest.Mock) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CertificateItem index={1} deleteHandle={onDelete}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: CertificateItem', () => {
  it('should render "CertificateItem"', () => {
    const onDeleteHandle = jest.fn();
    render(fakeApp(mockStore(defaultState), onDeleteHandle));
    expect(screen.getByText(/Изменить/i)).toBeVisible();
    expect(screen.getByText(/Сохранить/i)).toBeVisible();
  });
});
