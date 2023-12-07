import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen, waitFor} from '@testing-library/react';
import {defaultState} from '../../../mocks/default-state';
import userEvent from '@testing-library/user-event';
import React from 'react';
import TrainingInfoForm from './training-info.form';
import {trainingData} from '../../../mocks/training-data';
import {Role} from '../../../enums';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const {coach, ...card} = {...trainingData, name: '', description: ''};
const role = Role.coach;
const callbacks = {
  onInputPrice: jest.fn(),
  onInputName: jest.fn(),
  onInputDescription: jest.fn(),
  onChangeDiscount: jest.fn(),
  onBuy: jest.fn(),
};
const isDisabled = false;
const isSpecialOffer = false;

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <TrainingInfoForm {...{...card, isDisabled, role, callbacks, isSpecialOffer}}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: TrainingInfoForm', () => {
  it('should render "TrainingInfoForm"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByTestId(/card-trainingName/i)).toBeInTheDocument();
    expect(screen.getByTestId(/text-area/i)).toBeInTheDocument();
    expect(screen.getByTestId(/price/i)).toBeInTheDocument();
    expect(screen.getByTestId(/training-info-discount-btn/i)).toBeInTheDocument();
  });
  it('should call a callback with name', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.type(screen.getByTestId('card-trainingName'), 'training name');
    await waitFor (() => {
      expect(callbacks.onInputName).toHaveBeenCalledWith('training name');
    });
  });
  it('should call a callback with description', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.type(screen.getByTestId('text-area'), 'description');
    await waitFor (() => {
      expect(callbacks.onInputDescription).toHaveBeenCalledWith('description');
    });
  });
});
