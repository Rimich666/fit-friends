import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonBlock from './button-block';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import {NameSpace} from '../../../settings';

const onPageClick = jest.fn();
const mockStore = configureMockStore();
const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <ButtonBlock onPageClick={onPageClick} page={1}/>
  </Provider>
);

describe('Component: ButtonBlock', () => {
  it('should render "ButtonBlock"', async () => {
    render(fakeApp(mockStore({[NameSpace.Popup]: {pages: 3}})));
    const next = screen.getByText(/Показать еще/i);
    const back = screen.getByText(/Вернуться в начало/i);
    expect(next).toBeInTheDocument();
    expect(back).toBeInTheDocument();
    userEvent.click(next);
    await waitFor (() => {
      expect(onPageClick).toBeCalledWith(2);
    });
    userEvent.click(back);
    await waitFor (() => {
      expect(onPageClick).toBeCalledWith(1);
    });
  });
});
