import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SortBlock from './sort-block';

const callback = jest.fn();

const mockStore = configureMockStore();
const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <SortBlock callback={callback}/>
  </Provider>
);

describe('Component: SortBlock', () => {
  it('should render "SortBlock"', async () => {
    render(fakeApp(mockStore({})));
    expect(screen.getByTestId(/cheaper/i)).toBeInTheDocument();
    expect(screen.getByTestId(/expensive/i)).toBeInTheDocument();
    expect(screen.getByTestId(/freebie/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('cheaper'));
    await waitFor (() => {
      expect(callback).toBeCalledWith('cheaper');
    });
    userEvent.click(screen.getByTestId('expensive'));
    await waitFor (() => {
      expect(callback).toBeCalledWith('expensive');
    });
    userEvent.click(screen.getByTestId('freebie'));
    await waitFor (() => {
      expect(callback).toBeCalledWith('freebie');
    });
  });
});
