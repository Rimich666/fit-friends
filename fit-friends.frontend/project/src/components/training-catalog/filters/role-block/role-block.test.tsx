import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RoleBlock from './role-block';

const callback = jest.fn();

const mockStore = configureMockStore();
const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <RoleBlock callback={callback}/>
  </Provider>
);

describe('Component: ButtonBlock', () => {
  it('should render "ButtonBlock"', async () => {
    render(fakeApp(mockStore({})));
    expect(screen.getByTestId(/check-sort-coach/i)).toBeInTheDocument();
    expect(screen.getByTestId(/check-sort-sportsman/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('check-sort-coach'));
    await waitFor (() => {
      expect(callback).toBeCalledWith('coach');
    });
    userEvent.click(screen.getByTestId('check-sort-sportsman'));
    await waitFor (() => {
      expect(callback).toBeCalledWith('sportsman');
    });
  });
});
