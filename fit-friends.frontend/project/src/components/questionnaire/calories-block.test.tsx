import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CaloriesBlock from './calories-block';

const callback = jest.fn();
const errors = {
  trainingCalories: '',
  daysCalories: ''
};
const values = {
  trainingCalories: '',
  daysCalories: ''
};

const mockStore = configureMockStore();
const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <CaloriesBlock {...{callback, errors, values}}/>
  </Provider>
);

describe('Component: ButtonBlock', () => {
  it('should render "ButtonBlock"', async () => {
    render(fakeApp(mockStore({})));
    expect(screen.getByTestId(/training-calories/i)).toBeInTheDocument();
    expect(screen.getByTestId(/days-calories/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId('training-calories'), '980');
    await waitFor (() => {
      expect(callback).toBeCalledWith('trainingCalories', 980);
    });
    userEvent.type(screen.getByTestId('days-calories'), '980');
    await waitFor (() => {
      expect(callback).toBeCalledWith('daysCalories', 980);
    });
  });
});
